import axios from 'axios';

// Production'da Vercel Serverless Functions kullanılacak
// Development'ta Vite proxy kullanılacak
const isDev = import.meta.env.DEV;
const API_TOKEN = import.meta.env.VITE_TRAVELPAYOUTS_TOKEN;

const api = axios.create({
    // Development: Vite proxy, Production: Vercel Serverless Functions
    baseURL: isDev ? '/api-travel/aviasales/v3' : '/api',
});

/**
 * Havayolu logolarını getiren yardımcı fonksiyon
 */
export const getAirlineLogo = (code) => `https://pics.avs.io/200/80/${code}.png`;

/**
 * Havalimanı kodlarına göre şehir ve ülke bilgileri
 */
const AIRPORT_DATA = {
    // ============ TÜRKİYE - TÜM HAVAALANLARI ============
    // Marmara Bölgesi
    'IST': { city: 'İstanbul', country: 'Türkiye', airport: 'İstanbul Havalimanı' },
    'SAW': { city: 'İstanbul', country: 'Türkiye', airport: 'Sabiha Gökçen' },
    'EDO': { city: 'Balıkesir', country: 'Türkiye', airport: 'Koca Seyit Havalimanı' },
    'BZI': { city: 'Balıkesir', country: 'Türkiye', airport: 'Balıkesir Merkez' },
    'BTZ': { city: 'Bursa', country: 'Türkiye', airport: 'Yenişehir Havalimanı' },
    'CKZ': { city: 'Çanakkale', country: 'Türkiye', airport: 'Çanakkale Havalimanı' },
    'TEQ': { city: 'Tekirdağ', country: 'Türkiye', airport: 'Çorlu Havalimanı' },
    
    // İç Anadolu Bölgesi
    'ESB': { city: 'Ankara', country: 'Türkiye', airport: 'Esenboğa' },
    'ANK': { city: 'Ankara', country: 'Türkiye', airport: 'Ankara (Genel)' },
    'ASR': { city: 'Kayseri', country: 'Türkiye', airport: 'Erkilet Havalimanı' },
    'KYA': { city: 'Konya', country: 'Türkiye', airport: 'Konya Havalimanı' },
    'VAS': { city: 'Sivas', country: 'Türkiye', airport: 'Nuri Demirağ' },
    'OGU': { city: 'Ordu-Giresun', country: 'Türkiye', airport: 'Ordu-Giresun Havalimanı' },
    'NAV': { city: 'Nevşehir', country: 'Türkiye', airport: 'Kapadokya Havalimanı' },
    'KZR': { city: 'Kütahya', country: 'Türkiye', airport: 'Zafer Havalimanı' },
    'AFY': { city: 'Afyon', country: 'Türkiye', airport: 'Afyon Havalimanı' },
    'YKO': { city: 'Yozgat', country: 'Türkiye', airport: 'Yozgat Havalimanı' },
    'KCM': { city: 'Kahramanmaraş', country: 'Türkiye', airport: 'Kahramanmaraş Havalimanı' },
    
    // Ege Bölgesi
    'ADB': { city: 'İzmir', country: 'Türkiye', airport: 'Adnan Menderes' },
    'DNZ': { city: 'Denizli', country: 'Türkiye', airport: 'Çardak Havalimanı' },
    'USQ': { city: 'Uşak', country: 'Türkiye', airport: 'Uşak Havalimanı' },
    
    // Akdeniz Bölgesi
    'AYT': { city: 'Antalya', country: 'Türkiye', airport: 'Antalya Havalimanı' },
    'GZP': { city: 'Alanya', country: 'Türkiye', airport: 'Gazipaşa-Alanya' },
    'ADA': { city: 'Adana', country: 'Türkiye', airport: 'Şakirpaşa' },
    'BJV': { city: 'Bodrum', country: 'Türkiye', airport: 'Milas-Bodrum' },
    'DLM': { city: 'Dalaman', country: 'Türkiye', airport: 'Dalaman Havalimanı' },
    'ISE': { city: 'Isparta', country: 'Türkiye', airport: 'Süleyman Demirel' },
    'HTY': { city: 'Hatay', country: 'Türkiye', airport: 'Hatay Havalimanı' },
    'MZH': { city: 'Mersin', country: 'Türkiye', airport: 'Çukurova Bölgesel' },
    
    // Karadeniz Bölgesi
    'TZX': { city: 'Trabzon', country: 'Türkiye', airport: 'Trabzon Havalimanı' },
    'SZF': { city: 'Samsun', country: 'Türkiye', airport: 'Çarşamba Havalimanı' },
    'ONQ': { city: 'Zonguldak', country: 'Türkiye', airport: 'Zonguldak Havalimanı' },
    'KCO': { city: 'Rize', country: 'Türkiye', airport: 'Rize-Artvin Havalimanı' },
    'SIC': { city: 'Sinop', country: 'Türkiye', airport: 'Sinop Havalimanı' },
    'KFS': { city: 'Kastamonu', country: 'Türkiye', airport: 'Kastamonu Havalimanı' },
    'AOE': { city: 'Eskişehir', country: 'Türkiye', airport: 'Anadolu Havalimanı' },
    'CMH': { city: 'Çorum', country: 'Türkiye', airport: 'Çorum Havalimanı' },
    'TOW': { city: 'Tokat', country: 'Türkiye', airport: 'Tokat Havalimanı' },
    'AMC': { city: 'Amasya', country: 'Türkiye', airport: 'Merzifon Havalimanı' },
    
    // Doğu Anadolu Bölgesi
    'ERZ': { city: 'Erzurum', country: 'Türkiye', airport: 'Erzurum Havalimanı' },
    'ERC': { city: 'Erzincan', country: 'Türkiye', airport: 'Erzincan Havalimanı' },
    'VAN': { city: 'Van', country: 'Türkiye', airport: 'Ferit Melen' },
    'MLX': { city: 'Malatya', country: 'Türkiye', airport: 'Erhaç Havalimanı' },
    'EZS': { city: 'Elazığ', country: 'Türkiye', airport: 'Elazığ Havalimanı' },
    'MQM': { city: 'Mardin', country: 'Türkiye', airport: 'Mardin Havalimanı' },
    'AJI': { city: 'Ağrı', country: 'Türkiye', airport: 'Ahmed-i Hani' },
    'IGD': { city: 'Iğdır', country: 'Türkiye', airport: 'Şehit Bülent Aydın' },
    'KSY': { city: 'Kars', country: 'Türkiye', airport: 'Harakani Havalimanı' },
    'MSR': { city: 'Muş', country: 'Türkiye', airport: 'Sultan Alparslan' },
    'BGG': { city: 'Bingöl', country: 'Türkiye', airport: 'Bingöl Havalimanı' },
    'TJK': { city: 'Tunceli', country: 'Türkiye', airport: 'Tunceli Havalimanı' },
    
    // Güneydoğu Anadolu Bölgesi
    'GZT': { city: 'Gaziantep', country: 'Türkiye', airport: 'Oğuzeli Havalimanı' },
    'DIY': { city: 'Diyarbakır', country: 'Türkiye', airport: 'Diyarbakır Havalimanı' },
    'GNY': { city: 'Şanlıurfa', country: 'Türkiye', airport: 'GAP Havalimanı' },
    'SFQ': { city: 'Şanlıurfa', country: 'Türkiye', airport: 'Şanlıurfa GAP' },
    'NKT': { city: 'Şırnak', country: 'Türkiye', airport: 'Şerafettin Elçi' },
    'SXZ': { city: 'Siirt', country: 'Türkiye', airport: 'Siirt Havalimanı' },
    'BAL': { city: 'Batman', country: 'Türkiye', airport: 'Batman Havalimanı' },
    'YKS': { city: 'Hakkari', country: 'Türkiye', airport: 'Yüksekova Selahaddin Eyyubi' },
    'ADY': { city: 'Adıyaman', country: 'Türkiye', airport: 'Adıyaman Havalimanı' },
    
    // ============ KKTC ============
    'ECN': { city: 'Lefkoşa', country: 'KKTC', airport: 'Ercan Havalimanı' },
    'GEC': { city: 'Lefkoşa', country: 'KKTC', airport: 'Geçitkale Havalimanı' },
    
    // ============ AVRUPA ============
    // Fransa
    'PAR': { city: 'Paris', country: 'Fransa', airport: 'Charles de Gaulle' },
    'CDG': { city: 'Paris', country: 'Fransa', airport: 'Charles de Gaulle' },
    'ORY': { city: 'Paris', country: 'Fransa', airport: 'Orly' },
    'NCE': { city: 'Nice', country: 'Fransa', airport: 'Côte d\'Azur' },
    'LYS': { city: 'Lyon', country: 'Fransa', airport: 'Saint-Exupéry' },
    'MRS': { city: 'Marsilya', country: 'Fransa', airport: 'Provence' },
    'TLS': { city: 'Toulouse', country: 'Fransa', airport: 'Blagnac' },
    'BOD': { city: 'Bordeaux', country: 'Fransa', airport: 'Mérignac' },
    'NTE': { city: 'Nantes', country: 'Fransa', airport: 'Atlantique' },
    
    // İngiltere
    'LON': { city: 'Londra', country: 'İngiltere', airport: 'Heathrow' },
    'LHR': { city: 'Londra', country: 'İngiltere', airport: 'Heathrow' },
    'LGW': { city: 'Londra', country: 'İngiltere', airport: 'Gatwick' },
    'STN': { city: 'Londra', country: 'İngiltere', airport: 'Stansted' },
    'LTN': { city: 'Londra', country: 'İngiltere', airport: 'Luton' },
    'MAN': { city: 'Manchester', country: 'İngiltere', airport: 'Manchester' },
    'BHX': { city: 'Birmingham', country: 'İngiltere', airport: 'Birmingham' },
    'EDI': { city: 'Edinburgh', country: 'İskoçya', airport: 'Edinburgh' },
    'GLA': { city: 'Glasgow', country: 'İskoçya', airport: 'Glasgow' },
    'BRS': { city: 'Bristol', country: 'İngiltere', airport: 'Bristol' },
    'NCL': { city: 'Newcastle', country: 'İngiltere', airport: 'Newcastle' },
    'LBA': { city: 'Leeds', country: 'İngiltere', airport: 'Leeds Bradford' },
    'EMA': { city: 'East Midlands', country: 'İngiltere', airport: 'East Midlands' },
    
    // İspanya
    'BCN': { city: 'Barselona', country: 'İspanya', airport: 'El Prat' },
    'MAD': { city: 'Madrid', country: 'İspanya', airport: 'Barajas' },
    'PMI': { city: 'Mallorca', country: 'İspanya', airport: 'Palma de Mallorca' },
    'AGP': { city: 'Malaga', country: 'İspanya', airport: 'Costa del Sol' },
    'ALC': { city: 'Alicante', country: 'İspanya', airport: 'Alicante-Elche' },
    'IBZ': { city: 'İbiza', country: 'İspanya', airport: 'Ibiza' },
    'VLC': { city: 'Valencia', country: 'İspanya', airport: 'Valencia' },
    'SVQ': { city: 'Sevilla', country: 'İspanya', airport: 'San Pablo' },
    'TFS': { city: 'Tenerife', country: 'İspanya', airport: 'Tenerife South' },
    'LPA': { city: 'Gran Canaria', country: 'İspanya', airport: 'Las Palmas' },
    'BIO': { city: 'Bilbao', country: 'İspanya', airport: 'Bilbao' },
    'GRX': { city: 'Granada', country: 'İspanya', airport: 'Federico García Lorca' },
    
    // İtalya
    'ROM': { city: 'Roma', country: 'İtalya', airport: 'Fiumicino' },
    'FCO': { city: 'Roma', country: 'İtalya', airport: 'Fiumicino' },
    'CIA': { city: 'Roma', country: 'İtalya', airport: 'Ciampino' },
    'MIL': { city: 'Milano', country: 'İtalya', airport: 'Malpensa' },
    'MXP': { city: 'Milano', country: 'İtalya', airport: 'Malpensa' },
    'LIN': { city: 'Milano', country: 'İtalya', airport: 'Linate' },
    'BGY': { city: 'Bergamo', country: 'İtalya', airport: 'Orio al Serio' },
    'VCE': { city: 'Venedik', country: 'İtalya', airport: 'Marco Polo' },
    'NAP': { city: 'Napoli', country: 'İtalya', airport: 'Capodichino' },
    'FLR': { city: 'Floransa', country: 'İtalya', airport: 'Peretola' },
    'BLQ': { city: 'Bologna', country: 'İtalya', airport: 'Guglielmo Marconi' },
    'PSA': { city: 'Pisa', country: 'İtalya', airport: 'Galileo Galilei' },
    'CTA': { city: 'Catania', country: 'İtalya', airport: 'Fontanarossa' },
    'PMO': { city: 'Palermo', country: 'İtalya', airport: 'Falcone Borsellino' },
    'TRN': { city: 'Torino', country: 'İtalya', airport: 'Caselle' },
    'VRN': { city: 'Verona', country: 'İtalya', airport: 'Villafranca' },
    'BRI': { city: 'Bari', country: 'İtalya', airport: 'Karol Wojtyła' },
    
    // Almanya
    'BER': { city: 'Berlin', country: 'Almanya', airport: 'Brandenburg' },
    'FRA': { city: 'Frankfurt', country: 'Almanya', airport: 'Frankfurt' },
    'MUC': { city: 'Münih', country: 'Almanya', airport: 'Franz Josef Strauss' },
    'DUS': { city: 'Düsseldorf', country: 'Almanya', airport: 'Düsseldorf' },
    'HAM': { city: 'Hamburg', country: 'Almanya', airport: 'Hamburg' },
    'CGN': { city: 'Köln', country: 'Almanya', airport: 'Köln/Bonn' },
    'STR': { city: 'Stuttgart', country: 'Almanya', airport: 'Stuttgart' },
    'HAJ': { city: 'Hannover', country: 'Almanya', airport: 'Hannover' },
    'NUE': { city: 'Nürnberg', country: 'Almanya', airport: 'Nürnberg' },
    'LEJ': { city: 'Leipzig', country: 'Almanya', airport: 'Leipzig/Halle' },
    'DTM': { city: 'Dortmund', country: 'Almanya', airport: 'Dortmund' },
    'FMO': { city: 'Münster', country: 'Almanya', airport: 'Münster/Osnabrück' },
    
    // Hollanda & Belçika
    'AMS': { city: 'Amsterdam', country: 'Hollanda', airport: 'Schiphol' },
    'RTM': { city: 'Rotterdam', country: 'Hollanda', airport: 'The Hague' },
    'EIN': { city: 'Eindhoven', country: 'Hollanda', airport: 'Eindhoven' },
    'BRU': { city: 'Brüksel', country: 'Belçika', airport: 'Zaventem' },
    'CRL': { city: 'Charleroi', country: 'Belçika', airport: 'Brussels South' },
    
    // İsviçre & Avusturya
    'ZRH': { city: 'Zürih', country: 'İsviçre', airport: 'Zürich Airport' },
    'GVA': { city: 'Cenevre', country: 'İsviçre', airport: 'Geneva' },
    'BSL': { city: 'Basel', country: 'İsviçre', airport: 'EuroAirport' },
    'VIE': { city: 'Viyana', country: 'Avusturya', airport: 'Wien-Schwechat' },
    'SZG': { city: 'Salzburg', country: 'Avusturya', airport: 'W. A. Mozart' },
    'INN': { city: 'Innsbruck', country: 'Avusturya', airport: 'Kranebitten' },
    'GRZ': { city: 'Graz', country: 'Avusturya', airport: 'Thalerhof' },
    
    // Portekiz
    'LIS': { city: 'Lizbon', country: 'Portekiz', airport: 'Humberto Delgado' },
    'OPO': { city: 'Porto', country: 'Portekiz', airport: 'Francisco Sá Carneiro' },
    'FAO': { city: 'Faro', country: 'Portekiz', airport: 'Faro' },
    'FNC': { city: 'Funchal', country: 'Portekiz', airport: 'Madeira' },
    
    // Yunanistan
    'ATH': { city: 'Atina', country: 'Yunanistan', airport: 'Eleftherios Venizelos' },
    'SKG': { city: 'Selanik', country: 'Yunanistan', airport: 'Makedonia' },
    'HER': { city: 'Heraklion', country: 'Yunanistan', airport: 'Nikos Kazantzakis' },
    'RHO': { city: 'Rodos', country: 'Yunanistan', airport: 'Diagoras' },
    'JMK': { city: 'Mikonos', country: 'Yunanistan', airport: 'Mykonos' },
    'JTR': { city: 'Santorini', country: 'Yunanistan', airport: 'Thira' },
    'CFU': { city: 'Korfu', country: 'Yunanistan', airport: 'Ioannis Kapodistrias' },
    'KGS': { city: 'Kos', country: 'Yunanistan', airport: 'Hippocrates' },
    'CHQ': { city: 'Hanya', country: 'Yunanistan', airport: 'Daskalogiannis' },
    'ZTH': { city: 'Zakynthos', country: 'Yunanistan', airport: 'Zakynthos' },
    
    // Kuzey Avrupa
    'CPH': { city: 'Kopenhag', country: 'Danimarka', airport: 'Kastrup' },
    'BLL': { city: 'Billund', country: 'Danimarka', airport: 'Billund' },
    'OSL': { city: 'Oslo', country: 'Norveç', airport: 'Gardermoen' },
    'BGO': { city: 'Bergen', country: 'Norveç', airport: 'Flesland' },
    'TRD': { city: 'Trondheim', country: 'Norveç', airport: 'Værnes' },
    'ARN': { city: 'Stockholm', country: 'İsveç', airport: 'Arlanda' },
    'GOT': { city: 'Göteborg', country: 'İsveç', airport: 'Landvetter' },
    'MMX': { city: 'Malmö', country: 'İsveç', airport: 'Sturup' },
    'HEL': { city: 'Helsinki', country: 'Finlandiya', airport: 'Vantaa' },
    'KEF': { city: 'Reykjavik', country: 'İzlanda', airport: 'Keflavik' },
    
    // Doğu Avrupa & Balkanlar
    'PRG': { city: 'Prag', country: 'Çekya', airport: 'Václav Havel' },
    'BRQ': { city: 'Brno', country: 'Çekya', airport: 'Tuřany' },
    'BUD': { city: 'Budapeşte', country: 'Macaristan', airport: 'Ferenc Liszt' },
    'WAW': { city: 'Varşova', country: 'Polonya', airport: 'Chopin' },
    'KRK': { city: 'Krakow', country: 'Polonya', airport: 'John Paul II' },
    'GDN': { city: 'Gdansk', country: 'Polonya', airport: 'Lech Walesa' },
    'WRO': { city: 'Wroclaw', country: 'Polonya', airport: 'Copernicus' },
    'POZ': { city: 'Poznan', country: 'Polonya', airport: 'Lawica' },
    'KTW': { city: 'Katowice', country: 'Polonya', airport: 'Pyrzowice' },
    'OTP': { city: 'Bükreş', country: 'Romanya', airport: 'Henri Coandă' },
    'CLJ': { city: 'Cluj-Napoca', country: 'Romanya', airport: 'Avram Iancu' },
    'TSR': { city: 'Timișoara', country: 'Romanya', airport: 'Traian Vuia' },
    'IAS': { city: 'Iași', country: 'Romanya', airport: 'Iași' },
    'SOF': { city: 'Sofya', country: 'Bulgaristan', airport: 'Sofia' },
    'VAR': { city: 'Varna', country: 'Bulgaristan', airport: 'Varna' },
    'BOJ': { city: 'Burgaz', country: 'Bulgaristan', airport: 'Burgas' },
    'ZAG': { city: 'Zagreb', country: 'Hırvatistan', airport: 'Franjo Tuđman' },
    'DBV': { city: 'Dubrovnik', country: 'Hırvatistan', airport: 'Dubrovnik' },
    'SPU': { city: 'Split', country: 'Hırvatistan', airport: 'Split' },
    'PUY': { city: 'Pula', country: 'Hırvatistan', airport: 'Pula' },
    'ZAD': { city: 'Zadar', country: 'Hırvatistan', airport: 'Zadar' },
    'RJK': { city: 'Rijeka', country: 'Hırvatistan', airport: 'Rijeka' },
    'BEG': { city: 'Belgrad', country: 'Sırbistan', airport: 'Nikola Tesla' },
    'INI': { city: 'Niş', country: 'Sırbistan', airport: 'Constantine the Great' },
    'LJU': { city: 'Ljubljana', country: 'Slovenya', airport: 'Jože Pučnik' },
    'SKP': { city: 'Üsküp', country: 'Kuzey Makedonya', airport: 'Üsküp' },
    'OHD': { city: 'Ohrid', country: 'Kuzey Makedonya', airport: 'St. Paul the Apostle' },
    'TIA': { city: 'Tiran', country: 'Arnavutluk', airport: 'Nënë Tereza' },
    'SJJ': { city: 'Saraybosna', country: 'Bosna Hersek', airport: 'Sarajevo' },
    'TZL': { city: 'Tuzla', country: 'Bosna Hersek', airport: 'Tuzla' },
    'BNX': { city: 'Banja Luka', country: 'Bosna Hersek', airport: 'Banja Luka' },
    'TGD': { city: 'Podgorica', country: 'Karadağ', airport: 'Podgorica' },
    'TIV': { city: 'Tivat', country: 'Karadağ', airport: 'Tivat' },
    'PRN': { city: 'Priştine', country: 'Kosova', airport: 'Adem Jashari' },
    
    // İrlanda
    'DUB': { city: 'Dublin', country: 'İrlanda', airport: 'Dublin Airport' },
    'SNN': { city: 'Shannon', country: 'İrlanda', airport: 'Shannon' },
    'ORK': { city: 'Cork', country: 'İrlanda', airport: 'Cork' },
    
    // Orta Doğu
    'DXB': { city: 'Dubai', country: 'BAE', airport: 'Dubai International' },
    'AUH': { city: 'Abu Dabi', country: 'BAE', airport: 'Zayed International' },
    'DOH': { city: 'Doha', country: 'Katar', airport: 'Hamad International' },
    'TLV': { city: 'Tel Aviv', country: 'İsrail', airport: 'Ben Gurion' },
    'AMM': { city: 'Amman', country: 'Ürdün', airport: 'Queen Alia' },
    'BEY': { city: 'Beyrut', country: 'Lübnan', airport: 'Rafic Hariri' },
    'RUH': { city: 'Riyad', country: 'Suudi Arabistan', airport: 'King Khalid' },
    'JED': { city: 'Cidde', country: 'Suudi Arabistan', airport: 'King Abdulaziz' },
    'KWI': { city: 'Kuveyt', country: 'Kuveyt', airport: 'Kuwait International' },
    'BAH': { city: 'Manama', country: 'Bahreyn', airport: 'Bahrain International' },
    'MCT': { city: 'Maskat', country: 'Umman', airport: 'Muscat International' },
    
    // Amerika
    'NYC': { city: 'New York', country: 'ABD', airport: 'JFK' },
    'JFK': { city: 'New York', country: 'ABD', airport: 'John F. Kennedy' },
    'EWR': { city: 'New York', country: 'ABD', airport: 'Newark' },
    'LAX': { city: 'Los Angeles', country: 'ABD', airport: 'LAX' },
    'MIA': { city: 'Miami', country: 'ABD', airport: 'Miami International' },
    'SFO': { city: 'San Francisco', country: 'ABD', airport: 'SFO' },
    'ORD': { city: 'Chicago', country: 'ABD', airport: "O'Hare" },
    'BOS': { city: 'Boston', country: 'ABD', airport: 'Logan' },
    'ATL': { city: 'Atlanta', country: 'ABD', airport: 'Hartsfield-Jackson' },
    'DFW': { city: 'Dallas', country: 'ABD', airport: 'DFW' },
    'IAD': { city: 'Washington', country: 'ABD', airport: 'Dulles' },
    'YYZ': { city: 'Toronto', country: 'Kanada', airport: 'Pearson' },
    'YVR': { city: 'Vancouver', country: 'Kanada', airport: 'Vancouver International' },
    'MEX': { city: 'Mexico City', country: 'Meksika', airport: 'Benito Juárez' },
    'GRU': { city: 'Sao Paulo', country: 'Brezilya', airport: 'Guarulhos' },
    'EZE': { city: 'Buenos Aires', country: 'Arjantin', airport: 'Ezeiza' },
    
    // Asya
    'TYO': { city: 'Tokyo', country: 'Japonya', airport: 'Narita' },
    'NRT': { city: 'Tokyo', country: 'Japonya', airport: 'Narita' },
    'HND': { city: 'Tokyo', country: 'Japonya', airport: 'Haneda' },
    'ICN': { city: 'Seul', country: 'Güney Kore', airport: 'Incheon' },
    'PEK': { city: 'Pekin', country: 'Çin', airport: 'Capital' },
    'PVG': { city: 'Şanghay', country: 'Çin', airport: 'Pudong' },
    'HKG': { city: 'Hong Kong', country: 'Hong Kong', airport: 'Hong Kong International' },
    'SIN': { city: 'Singapur', country: 'Singapur', airport: 'Changi' },
    'BKK': { city: 'Bangkok', country: 'Tayland', airport: 'Suvarnabhumi' },
    'KUL': { city: 'Kuala Lumpur', country: 'Malezya', airport: 'KLIA' },
    'DEL': { city: 'Delhi', country: 'Hindistan', airport: 'Indira Gandhi' },
    'BOM': { city: 'Mumbai', country: 'Hindistan', airport: 'Chhatrapati Shivaji' },
    'CGK': { city: 'Cakarta', country: 'Endonezya', airport: 'Soekarno-Hatta' },
    'MNL': { city: 'Manila', country: 'Filipinler', airport: 'Ninoy Aquino' },
    'SGN': { city: 'Ho Chi Minh', country: 'Vietnam', airport: 'Tan Son Nhat' },
    'HAN': { city: 'Hanoi', country: 'Vietnam', airport: 'Noi Bai' },
    
    // Afrika
    'CAI': { city: 'Kahire', country: 'Mısır', airport: 'Cairo International' },
    'JNB': { city: 'Johannesburg', country: 'Güney Afrika', airport: 'O.R. Tambo' },
    'CPT': { city: 'Cape Town', country: 'Güney Afrika', airport: 'Cape Town International' },
    'CMN': { city: 'Kazablanka', country: 'Fas', airport: 'Mohammed V' },
    'ALG': { city: 'Cezayir', country: 'Cezayir', airport: 'Houari Boumediene' },
    'TUN': { city: 'Tunus', country: 'Tunus', airport: 'Tunis–Carthage' },
    'NBO': { city: 'Nairobi', country: 'Kenya', airport: 'Jomo Kenyatta' },
    'ADD': { city: 'Addis Ababa', country: 'Etiyopya', airport: 'Bole International' },
    
    // Okyanusya
    'SYD': { city: 'Sidney', country: 'Avustralya', airport: 'Kingsford Smith' },
    'MEL': { city: 'Melbourne', country: 'Avustralya', airport: 'Tullamarine' },
    'AKL': { city: 'Auckland', country: 'Yeni Zelanda', airport: 'Auckland Airport' },
    
    // ============ RUSYA VE BDT ============
    // Rusya
    'SVO': { city: 'Moskova', country: 'Rusya', airport: 'Sheremetyevo' },
    'DME': { city: 'Moskova', country: 'Rusya', airport: 'Domodedovo' },
    'VKO': { city: 'Moskova', country: 'Rusya', airport: 'Vnukovo' },
    'MOW': { city: 'Moskova', country: 'Rusya', airport: 'Moskova (Genel)' },
    'LED': { city: 'St. Petersburg', country: 'Rusya', airport: 'Pulkovo' },
    'AER': { city: 'Soçi', country: 'Rusya', airport: 'Sochi' },
    'KZN': { city: 'Kazan', country: 'Rusya', airport: 'Kazan' },
    'SVX': { city: 'Yekaterinburg', country: 'Rusya', airport: 'Koltsovo' },
    'OVB': { city: 'Novosibirsk', country: 'Rusya', airport: 'Tolmachevo' },
    'KRR': { city: 'Krasnodar', country: 'Rusya', airport: 'Pashkovsky' },
    'ROV': { city: 'Rostov-on-Don', country: 'Rusya', airport: 'Platov' },
    'UFA': { city: 'Ufa', country: 'Rusya', airport: 'Ufa' },
    'KUF': { city: 'Samara', country: 'Rusya', airport: 'Kurumoch' },
    'GOJ': { city: 'Nizhny Novgorod', country: 'Rusya', airport: 'Strigino' },
    'VVO': { city: 'Vladivostok', country: 'Rusya', airport: 'Vladivostok' },
    'IKT': { city: 'Irkutsk', country: 'Rusya', airport: 'Irkutsk' },
    'KJA': { city: 'Krasnoyarsk', country: 'Rusya', airport: 'Yemelyanovo' },
    'MRV': { city: 'Mineralnye Vody', country: 'Rusya', airport: 'Mineralnye Vody' },
    
    // Kafkasya
    'GYD': { city: 'Bakü', country: 'Azerbaycan', airport: 'Haydar Aliyev' },
    'GBB': { city: 'Gence', country: 'Azerbaycan', airport: 'Ganja' },
    'TBS': { city: 'Tiflis', country: 'Gürcistan', airport: 'Tbilisi International' },
    'BUS': { city: 'Batum', country: 'Gürcistan', airport: 'Batumi' },
    'KUT': { city: 'Kutaisi', country: 'Gürcistan', airport: 'David the Builder' },
    'EVN': { city: 'Erivan', country: 'Ermenistan', airport: 'Zvartnots' },
    'GYU': { city: 'Gyumri', country: 'Ermenistan', airport: 'Shirak' },
    
    // Ukrayna
    'KBP': { city: 'Kiev', country: 'Ukrayna', airport: 'Boryspil' },
    'IEV': { city: 'Kiev', country: 'Ukrayna', airport: 'Zhuliany' },
    'ODS': { city: 'Odessa', country: 'Ukrayna', airport: 'Odessa' },
    'LWO': { city: 'Lviv', country: 'Ukrayna', airport: 'Danylo Halytskyi' },
    'HRK': { city: 'Kharkiv', country: 'Ukrayna', airport: 'Kharkiv' },
    'DNK': { city: 'Dnipro', country: 'Ukrayna', airport: 'Dnipropetrovsk' },
    
    // Orta Asya
    'TSE': { city: 'Astana', country: 'Kazakistan', airport: 'Nursultan Nazarbayev' },
    'ALA': { city: 'Almatı', country: 'Kazakistan', airport: 'Almaty International' },
    'CIT': { city: 'Şımkent', country: 'Kazakistan', airport: 'Shymkent' },
    'GUW': { city: 'Atırau', country: 'Kazakistan', airport: 'Atyrau' },
    'TAS': { city: 'Taşkent', country: 'Özbekistan', airport: 'Tashkent International' },
    'SKD': { city: 'Semerkand', country: 'Özbekistan', airport: 'Samarkand' },
    'BHK': { city: 'Buhara', country: 'Özbekistan', airport: 'Bukhara' },
    'FRU': { city: 'Bişkek', country: 'Kırgızistan', airport: 'Manas' },
    'OSS': { city: 'Oş', country: 'Kırgızistan', airport: 'Osh' },
    'DYU': { city: 'Duşanbe', country: 'Tacikistan', airport: 'Dushanbe' },
    'ASB': { city: 'Aşkabat', country: 'Türkmenistan', airport: 'Ashgabat' },
    
    // ============ EK KODLAR ============
    // Kıbrıs (Güney)
    'LCA': { city: 'Larnaka', country: 'Kıbrıs', airport: 'Larnaka' },
    'PFO': { city: 'Paphos', country: 'Kıbrıs', airport: 'Paphos' },
    
    // Malta
    'MLA': { city: 'Malta', country: 'Malta', airport: 'Malta International' },
    
    // Lüksemburg
    'LUX': { city: 'Lüksemburg', country: 'Lüksemburg', airport: 'Findel' },
    
    // Monako (helikopter)
    'MCM': { city: 'Monako', country: 'Monako', airport: 'Monaco Heliport' },
};


/**
 * Havalimanı bilgilerini getir
 */
export const getAirportInfo = (code) => {
    return AIRPORT_DATA[code] || { city: code, country: 'Bilinmiyor', airport: code };
};

/**
 * Travelpayouts üzerinden gerçek uçuş fırsatlarını çeker
 * @param {string} origin - Kalkış havalimanı kodu (örn: IST)
 * @param {string} destination - Varış havalimanı kodu (boş = tüm dünya)
 * @param {string} departureDate - Gidiş tarihi (YYYY-MM-DD formatında)
 * @param {string} returnDate - Dönüş tarihi (YYYY-MM-DD formatında)
 */
export const fetchFlightDeals = async (origin = 'IST', destination = '', departureDate = '', returnDate = '') => {
    try {
        // Production'da farklı endpoint, development'ta farklı
        const endpoint = isDev ? 'prices_for_dates' : 'travelpayouts';
        
        // Development'ta token ekle, production'da serverless function ekliyor
        const params = {
                origin: origin,
                currency: 'try',
            limit: 30
        };

        // Varış noktası belirtilmişse ekle
        if (destination) {
            params.destination = destination;
        }

        // Tarih parametreleri
        if (departureDate) {
            params.departure_at = departureDate;
        }
        if (returnDate) {
            params.return_at = returnDate;
        }

        // Sadece development'ta token ekle (frontend'de görünür)
        if (isDev) {
            params.unique = 'true';
            params.sorting = 'price';
            params.direct = 'false';
            params.token = API_TOKEN;
        }

        const response = await api.get(endpoint, { params });

        if (!response.data || !response.data.data) return [];

        return response.data.data.map((deal, idx) => {
            const durationHours = Math.floor(deal.duration / 60);
            const durationMinutes = deal.duration % 60;
            const durationStr = deal.duration ? `${durationHours}s ${durationMinutes}dk` : 'Bilgi Yok';
            
            // Havalimanı bilgilerini al
            const airportInfo = getAirportInfo(deal.destination);

            return {
                id: `${deal.destination}-${idx}`,
                destination: deal.destination, // Havalimanı kodu (örn: AYT)
                city: airportInfo.city,        // Şehir adı (örn: Antalya)
                country: airportInfo.country,  // Ülke adı (örn: Türkiye)
                airportName: airportInfo.airport, // Havalimanı adı
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
                discount: 0,
                oldPrice: null,
                tag: deal.price < 5000 ? 'UCUZ BİLET' : 'Popüler Rota',
                link: `https://www.aviasales.com${deal.link}`
            };
        });

    } catch (error) {
        // Hata detaylarını sadece development'ta logla
        if (isDev) {
            console.error('Uçuş verileri alınamadı:', error.message);
        }
        
        throw new Error('FETCH_FAILED');
    }
};
