import axios from 'axios';

// Travelpayouts API Token - .env dosyasından çekilecek
const API_TOKEN = import.meta.env.VITE_TRAVELPAYOUTS_TOKEN;

const api = axios.create({
    // Vite proxy'sini kullanıyoruz (CORS hatasını önlemek için)
    baseURL: '/api-travel/aviasales/v3',
});

/**
 * Havayolu logolarını getiren yardımcı fonksiyon
 */
export const getAirlineLogo = (code) => `https://pics.avs.io/200/80/${code}.png`;

/**
 * Şehir isimlerini Türkçeleştirme haritası
 */
const CITY_MAP = {
    'PAR': 'Paris', 'LON': 'Londra', 'NYC': 'New York', 'TYO': 'Tokyo',
    'BCN': 'Barselona', 'DXB': 'Dubai', 'BER': 'Berlin', 'ROM': 'Roma',
    'AMS': 'Amsterdam', 'MIL': 'Milano', 'MAD': 'Madrid', 'IST': 'İstanbul',
    'AYT': 'Antalya', 'ADB': 'İzmir', 'ESB': 'Ankara', 'BJV': 'Bodrum'
};

/**
 * Travelpayouts üzerinden gerçek uçuş fırsatlarını çeker
 */
export const fetchFlightDeals = async (origin = 'IST') => {
    if (!API_TOKEN || API_TOKEN === 'YOUR_TOKEN') {
        throw new Error('TOKEN_MISSING');
    }

    try {
        // /prices_for_dates endpoint'i en güncel ve ucuz fiyatları getirir
        const response = await api.get('/prices_for_dates', {
            params: {
                origin: origin,
                currency: 'try',
                unique: 'true', // Her varış noktası için tek (en ucuz) fiyat
                sorting: 'price',
                direct: 'false',
                limit: 15,
                token: API_TOKEN
            }
        });

        if (!response.data || !response.data.data) return [];

        return response.data.data.map((deal, idx) => {
            const durationHours = Math.floor(deal.duration / 60);
            const durationMinutes = deal.duration % 60;
            const durationStr = deal.duration ? `${durationHours}s ${durationMinutes}dk` : 'Bilgi Yok';

            return {
                id: `${deal.destination}-${idx}`,
                destination: deal.destination,
                city: CITY_MAP[deal.destination] || deal.destination,
                airline: deal.airline,
                price: {
                    amount: new Intl.NumberFormat('tr-TR').format(deal.price),
                    currency: '₺',
                    raw: deal.price
                },
                departureDate: deal.departure_at.split('T')[0],
                departureTime: deal.departure_at.split('T')[1]?.substring(0, 5),
                returnDate: deal.return_at ? deal.return_at.split('T')[0] : null,
                origin: deal.origin,
                flightNumber: deal.flight_number,
                transfers: deal.transfers,
                duration: durationStr,
                discount: 0, // Mock veriyi kaldırıyoruz
                oldPrice: null, // Mock veriyi kaldırıyoruz
                tag: deal.price < 5000 ? 'UCUZ BİLET' : 'Popüler Rota',
                link: `https://www.aviasales.com${deal.link}`
            };
        });

    } catch (error) {
        console.error('Travelpayouts API Hatası:', error);
        throw error;
    }
};
