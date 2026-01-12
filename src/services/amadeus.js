import axios from 'axios';

// Amadeus API Credentials - Bunlar .env dosyasından çekilecek
const CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

const BASE_URL = 'https://test.api.amadeus.com/v1';

let accessToken = null;
let tokenExpiry = null;

const api = axios.create({
    baseURL: BASE_URL,
});

/**
 * IATA kodlarını Türkçe şehir isimlerine çeviren yardımcı harita
 */
const IATA_TO_CITY = {
    'PAR': 'Paris', 'LON': 'Londra', 'NYC': 'New York', 'TYO': 'Tokyo',
    'BCN': 'Barselona', 'DXB': 'Dubai', 'BER': 'Berlin', 'ROM': 'Roma',
    'AMS': 'Amsterdam', 'MIL': 'Milano', 'MAD': 'Madrid', 'FRA': 'Frankfurt',
    'ATH': 'Atina', 'IST': 'İstanbul', 'SAW': 'İstanbul', 'AYT': 'Antalya',
    'BJV': 'Bodrum', 'DLM': 'Dalaman', 'ESB': 'Ankara', 'ADB': 'İzmir',
    'VIE': 'Viyana', 'PRG': 'Prag', 'BUD': 'Budapeşte', 'WAW': 'Varşova'
};

const authenticate = async () => {
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
        return accessToken;
    }

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error('API_KEYS_MISSING');
    }

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', CLIENT_ID);
        params.append('client_secret', CLIENT_SECRET);

        const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params);

        accessToken = response.data.access_token;
        tokenExpiry = new Date(new Date().getTime() + (response.data.expires_in - 60) * 1000);

        return accessToken;
    } catch (error) {
        console.error('Amadeus Auth Hatası:', error.response?.data || error.message);
        throw error;
    }
};

api.interceptors.request.use(async (config) => {
    if (config.url?.includes('oauth2/token')) return config;

    try {
        const token = await authenticate();
        config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
        // Auth hatası durumunda isteği iptal etmiyoruz, catch içinde handle edilecek
    }
    return config;
});

/**
 * Uçuş fırsatlarını API'den çeker
 */
export const searchFlightDeals = async (origin = 'IST') => {
    if (!CLIENT_ID || CLIENT_ID === 'YOUR_CLIENT_ID') {
        console.error("Amadeus API Key eksik! Lütfen .env dosyasını kontrol edin.");
        throw new Error('CONFIG_ERROR');
    }

    try {
        // Flight Inspiration Search Endpoint
        const response = await api.get('/shopping/flight-destinations', {
            params: {
                origin: origin,
                oneWay: false,
                nonStop: false
            }
        });

        if (!response.data.data) return [];

        return response.data.data.map(deal => {
            const basePrice = parseFloat(deal.price.total);
            // Test ortamı genellikle EUR döner, bunu TRY simülasyonu yapıyoruz (Gerçek prod API'de TRY seçilebilir)
            const tryPrice = (basePrice * 35.8).toFixed(0);

            return {
                id: deal.destination,
                destination: deal.destination,
                city: IATA_TO_CITY[deal.destination] || deal.destination,
                country: 'Yurt Dışı',
                price: {
                    amount: new Intl.NumberFormat('tr-TR').format(tryPrice),
                    currency: 'TL'
                },
                departureDate: deal.departureDate,
                returnDate: deal.returnDate,
                origin: deal.origin,
                discount: Math.floor(Math.random() * 20) + 10, // API bazen indirim verisi sunmaz, simüle ediyoruz
                oldPrice: new Intl.NumberFormat('tr-TR').format((parseFloat(tryPrice) * 1.25).toFixed(0)),
                tag: basePrice < 200 ? 'Kaçmaz Fırsat' : 'Popüler Rota'
            };
        });

    } catch (error) {
        console.error('Amadeus API Veri Çekme Hatası:', error.response?.data || error.message);
        throw error;
    }
};

export default api;
