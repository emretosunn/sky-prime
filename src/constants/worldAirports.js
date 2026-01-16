// Dünya genelindeki popüler havalimanları
// Şehir ve ülke bazında arama yapılabilir

export const WORLD_AIRPORTS = [
    // ============ TÜRKİYE ============
    { code: 'IST', city: 'İstanbul', country: 'Türkiye', airport: 'İstanbul Havalimanı', region: 'europe' },
    { code: 'SAW', city: 'İstanbul', country: 'Türkiye', airport: 'Sabiha Gökçen', region: 'europe' },
    { code: 'AYT', city: 'Antalya', country: 'Türkiye', airport: 'Antalya Havalimanı', region: 'europe' },
    { code: 'ADB', city: 'İzmir', country: 'Türkiye', airport: 'Adnan Menderes', region: 'europe' },
    { code: 'ESB', city: 'Ankara', country: 'Türkiye', airport: 'Esenboğa', region: 'europe' },
    { code: 'ANK', city: 'Ankara', country: 'Türkiye', airport: 'Ankara (Genel)', region: 'europe' },
    { code: 'BJV', city: 'Bodrum', country: 'Türkiye', airport: 'Milas-Bodrum', region: 'europe' },
    { code: 'DLM', city: 'Dalaman', country: 'Türkiye', airport: 'Dalaman Havalimanı', region: 'europe' },
    { code: 'TZX', city: 'Trabzon', country: 'Türkiye', airport: 'Trabzon Havalimanı', region: 'europe' },
    { code: 'GZT', city: 'Gaziantep', country: 'Türkiye', airport: 'Oğuzeli', region: 'europe' },
    { code: 'ADA', city: 'Adana', country: 'Türkiye', airport: 'Şakirpaşa', region: 'europe' },
    { code: 'GZP', city: 'Alanya', country: 'Türkiye', airport: 'Gazipaşa-Alanya', region: 'europe' },
    { code: 'VAN', city: 'Van', country: 'Türkiye', airport: 'Ferit Melen', region: 'europe' },
    { code: 'ERZ', city: 'Erzurum', country: 'Türkiye', airport: 'Erzurum Havalimanı', region: 'europe' },
    { code: 'ASR', city: 'Kayseri', country: 'Türkiye', airport: 'Erkilet', region: 'europe' },
    { code: 'DIY', city: 'Diyarbakır', country: 'Türkiye', airport: 'Diyarbakır Havalimanı', region: 'europe' },
    { code: 'KYA', city: 'Konya', country: 'Türkiye', airport: 'Konya Havalimanı', region: 'europe' },
    { code: 'SZF', city: 'Samsun', country: 'Türkiye', airport: 'Çarşamba', region: 'europe' },
    { code: 'NAV', city: 'Nevşehir', country: 'Türkiye', airport: 'Kapadokya', region: 'europe' },
    { code: 'OGU', city: 'Ordu-Giresun', country: 'Türkiye', airport: 'Ordu-Giresun', region: 'europe' },
    { code: 'MLX', city: 'Malatya', country: 'Türkiye', airport: 'Erhaç', region: 'europe' },
    { code: 'EZS', city: 'Elazığ', country: 'Türkiye', airport: 'Elazığ', region: 'europe' },
    { code: 'MQM', city: 'Mardin', country: 'Türkiye', airport: 'Mardin', region: 'europe' },
    { code: 'KCO', city: 'Rize', country: 'Türkiye', airport: 'Rize-Artvin', region: 'europe' },
    
    // ============ KKTC ============
    { code: 'ECN', city: 'Lefkoşa', country: 'KKTC', airport: 'Ercan Havalimanı', region: 'europe' },
    { code: 'GEC', city: 'Lefkoşa', country: 'KKTC', airport: 'Geçitkale', region: 'europe' },
    
    // ============ KIBRIS (Güney) ============
    { code: 'LCA', city: 'Larnaka', country: 'Kıbrıs', airport: 'Larnaka', region: 'europe' },
    { code: 'PFO', city: 'Paphos', country: 'Kıbrıs', airport: 'Paphos', region: 'europe' },

    // ============ AVRUPA ============
    // İngiltere
    { code: 'LHR', city: 'Londra', country: 'İngiltere', airport: 'Heathrow', region: 'europe' },
    { code: 'LGW', city: 'Londra', country: 'İngiltere', airport: 'Gatwick', region: 'europe' },
    { code: 'STN', city: 'Londra', country: 'İngiltere', airport: 'Stansted', region: 'europe' },
    { code: 'LTN', city: 'Londra', country: 'İngiltere', airport: 'Luton', region: 'europe' },
    { code: 'MAN', city: 'Manchester', country: 'İngiltere', airport: 'Manchester', region: 'europe' },
    { code: 'BHX', city: 'Birmingham', country: 'İngiltere', airport: 'Birmingham', region: 'europe' },
    { code: 'EDI', city: 'Edinburgh', country: 'İngiltere', airport: 'Edinburgh', region: 'europe' },
    { code: 'GLA', city: 'Glasgow', country: 'İngiltere', airport: 'Glasgow', region: 'europe' },
    { code: 'BRS', city: 'Bristol', country: 'İngiltere', airport: 'Bristol', region: 'europe' },

    // Fransa
    { code: 'CDG', city: 'Paris', country: 'Fransa', airport: 'Charles de Gaulle', region: 'europe' },
    { code: 'ORY', city: 'Paris', country: 'Fransa', airport: 'Orly', region: 'europe' },
    { code: 'NCE', city: 'Nice', country: 'Fransa', airport: 'Côte d\'Azur', region: 'europe' },
    { code: 'LYS', city: 'Lyon', country: 'Fransa', airport: 'Saint-Exupéry', region: 'europe' },
    { code: 'MRS', city: 'Marsilya', country: 'Fransa', airport: 'Provence', region: 'europe' },
    { code: 'TLS', city: 'Toulouse', country: 'Fransa', airport: 'Blagnac', region: 'europe' },
    { code: 'BOD', city: 'Bordeaux', country: 'Fransa', airport: 'Mérignac', region: 'europe' },

    // Almanya
    { code: 'FRA', city: 'Frankfurt', country: 'Almanya', airport: 'Frankfurt', region: 'europe' },
    { code: 'MUC', city: 'Münih', country: 'Almanya', airport: 'Franz Josef Strauss', region: 'europe' },
    { code: 'BER', city: 'Berlin', country: 'Almanya', airport: 'Brandenburg', region: 'europe' },
    { code: 'DUS', city: 'Düsseldorf', country: 'Almanya', airport: 'Düsseldorf', region: 'europe' },
    { code: 'HAM', city: 'Hamburg', country: 'Almanya', airport: 'Hamburg', region: 'europe' },
    { code: 'CGN', city: 'Köln', country: 'Almanya', airport: 'Köln/Bonn', region: 'europe' },
    { code: 'STR', city: 'Stuttgart', country: 'Almanya', airport: 'Stuttgart', region: 'europe' },
    { code: 'HAJ', city: 'Hannover', country: 'Almanya', airport: 'Hannover', region: 'europe' },

    // İspanya
    { code: 'MAD', city: 'Madrid', country: 'İspanya', airport: 'Barajas', region: 'europe' },
    { code: 'BCN', city: 'Barselona', country: 'İspanya', airport: 'El Prat', region: 'europe' },
    { code: 'PMI', city: 'Mallorca', country: 'İspanya', airport: 'Palma de Mallorca', region: 'europe' },
    { code: 'AGP', city: 'Malaga', country: 'İspanya', airport: 'Costa del Sol', region: 'europe' },
    { code: 'ALC', city: 'Alicante', country: 'İspanya', airport: 'Alicante-Elche', region: 'europe' },
    { code: 'IBZ', city: 'İbiza', country: 'İspanya', airport: 'Ibiza', region: 'europe' },
    { code: 'VLC', city: 'Valencia', country: 'İspanya', airport: 'Valencia', region: 'europe' },
    { code: 'SVQ', city: 'Sevilla', country: 'İspanya', airport: 'San Pablo', region: 'europe' },
    { code: 'TFS', city: 'Tenerife', country: 'İspanya', airport: 'Tenerife South', region: 'europe' },
    { code: 'LPA', city: 'Gran Canaria', country: 'İspanya', airport: 'Las Palmas', region: 'europe' },

    // İtalya
    { code: 'FCO', city: 'Roma', country: 'İtalya', airport: 'Fiumicino', region: 'europe' },
    { code: 'MXP', city: 'Milano', country: 'İtalya', airport: 'Malpensa', region: 'europe' },
    { code: 'LIN', city: 'Milano', country: 'İtalya', airport: 'Linate', region: 'europe' },
    { code: 'VCE', city: 'Venedik', country: 'İtalya', airport: 'Marco Polo', region: 'europe' },
    { code: 'NAP', city: 'Napoli', country: 'İtalya', airport: 'Capodichino', region: 'europe' },
    { code: 'FLR', city: 'Floransa', country: 'İtalya', airport: 'Peretola', region: 'europe' },
    { code: 'BLQ', city: 'Bologna', country: 'İtalya', airport: 'Guglielmo Marconi', region: 'europe' },
    { code: 'PSA', city: 'Pisa', country: 'İtalya', airport: 'Galileo Galilei', region: 'europe' },
    { code: 'CTA', city: 'Catania', country: 'İtalya', airport: 'Fontanarossa', region: 'europe' },

    // Hollanda
    { code: 'AMS', city: 'Amsterdam', country: 'Hollanda', airport: 'Schiphol', region: 'europe' },
    { code: 'RTM', city: 'Rotterdam', country: 'Hollanda', airport: 'The Hague', region: 'europe' },
    { code: 'EIN', city: 'Eindhoven', country: 'Hollanda', airport: 'Eindhoven', region: 'europe' },

    // Belçika
    { code: 'BRU', city: 'Brüksel', country: 'Belçika', airport: 'Zaventem', region: 'europe' },
    { code: 'CRL', city: 'Charleroi', country: 'Belçika', airport: 'Brussels South', region: 'europe' },

    // İsviçre
    { code: 'ZRH', city: 'Zürih', country: 'İsviçre', airport: 'Zürich Airport', region: 'europe' },
    { code: 'GVA', city: 'Cenevre', country: 'İsviçre', airport: 'Geneva', region: 'europe' },
    { code: 'BSL', city: 'Basel', country: 'İsviçre', airport: 'EuroAirport', region: 'europe' },

    // Avusturya
    { code: 'VIE', city: 'Viyana', country: 'Avusturya', airport: 'Wien-Schwechat', region: 'europe' },
    { code: 'SZG', city: 'Salzburg', country: 'Avusturya', airport: 'W. A. Mozart', region: 'europe' },
    { code: 'INN', city: 'Innsbruck', country: 'Avusturya', airport: 'Kranebitten', region: 'europe' },

    // Portekiz
    { code: 'LIS', city: 'Lizbon', country: 'Portekiz', airport: 'Humberto Delgado', region: 'europe' },
    { code: 'OPO', city: 'Porto', country: 'Portekiz', airport: 'Francisco Sá Carneiro', region: 'europe' },
    { code: 'FAO', city: 'Faro', country: 'Portekiz', airport: 'Faro', region: 'europe' },

    // Yunanistan
    { code: 'ATH', city: 'Atina', country: 'Yunanistan', airport: 'Eleftherios Venizelos', region: 'europe' },
    { code: 'SKG', city: 'Selanik', country: 'Yunanistan', airport: 'Makedonia', region: 'europe' },
    { code: 'HER', city: 'Heraklion', country: 'Yunanistan', airport: 'Nikos Kazantzakis', region: 'europe' },
    { code: 'RHO', city: 'Rodos', country: 'Yunanistan', airport: 'Diagoras', region: 'europe' },
    { code: 'JMK', city: 'Mikonos', country: 'Yunanistan', airport: 'Mykonos', region: 'europe' },
    { code: 'JTR', city: 'Santorini', country: 'Yunanistan', airport: 'Thira', region: 'europe' },
    { code: 'CFU', city: 'Korfu', country: 'Yunanistan', airport: 'Ioannis Kapodistrias', region: 'europe' },

    // Kuzey Avrupa
    { code: 'CPH', city: 'Kopenhag', country: 'Danimarka', airport: 'Kastrup', region: 'europe' },
    { code: 'OSL', city: 'Oslo', country: 'Norveç', airport: 'Gardermoen', region: 'europe' },
    { code: 'BGO', city: 'Bergen', country: 'Norveç', airport: 'Flesland', region: 'europe' },
    { code: 'ARN', city: 'Stockholm', country: 'İsveç', airport: 'Arlanda', region: 'europe' },
    { code: 'GOT', city: 'Göteborg', country: 'İsveç', airport: 'Landvetter', region: 'europe' },
    { code: 'HEL', city: 'Helsinki', country: 'Finlandiya', airport: 'Vantaa', region: 'europe' },
    { code: 'KEF', city: 'Reykjavik', country: 'İzlanda', airport: 'Keflavik', region: 'europe' },

    // Doğu Avrupa
    { code: 'PRG', city: 'Prag', country: 'Çekya', airport: 'Václav Havel', region: 'europe' },
    { code: 'BUD', city: 'Budapeşte', country: 'Macaristan', airport: 'Ferenc Liszt', region: 'europe' },
    { code: 'WAW', city: 'Varşova', country: 'Polonya', airport: 'Chopin', region: 'europe' },
    { code: 'KRK', city: 'Krakow', country: 'Polonya', airport: 'John Paul II', region: 'europe' },
    { code: 'OTP', city: 'Bükreş', country: 'Romanya', airport: 'Henri Coandă', region: 'europe' },
    { code: 'SOF', city: 'Sofya', country: 'Bulgaristan', airport: 'Sofia', region: 'europe' },
    { code: 'VAR', city: 'Varna', country: 'Bulgaristan', airport: 'Varna', region: 'europe' },
    { code: 'ZAG', city: 'Zagreb', country: 'Hırvatistan', airport: 'Franjo Tuđman', region: 'europe' },
    { code: 'DBV', city: 'Dubrovnik', country: 'Hırvatistan', airport: 'Dubrovnik', region: 'europe' },
    { code: 'SPU', city: 'Split', country: 'Hırvatistan', airport: 'Split', region: 'europe' },
    { code: 'PUY', city: 'Pula', country: 'Hırvatistan', airport: 'Pula', region: 'europe' },
    { code: 'ZAD', city: 'Zadar', country: 'Hırvatistan', airport: 'Zadar', region: 'europe' },
    { code: 'RJK', city: 'Rijeka', country: 'Hırvatistan', airport: 'Rijeka', region: 'europe' },
    { code: 'BEG', city: 'Belgrad', country: 'Sırbistan', airport: 'Nikola Tesla', region: 'europe' },
    { code: 'INI', city: 'Niş', country: 'Sırbistan', airport: 'Constantine the Great', region: 'europe' },
    { code: 'LJU', city: 'Ljubljana', country: 'Slovenya', airport: 'Jože Pučnik', region: 'europe' },
    
    // Balkanlar
    { code: 'SKP', city: 'Üsküp', country: 'Kuzey Makedonya', airport: 'Üsküp Havalimanı', region: 'europe' },
    { code: 'OHD', city: 'Ohrid', country: 'Kuzey Makedonya', airport: 'St. Paul the Apostle', region: 'europe' },
    { code: 'TIA', city: 'Tiran', country: 'Arnavutluk', airport: 'Nënë Tereza', region: 'europe' },
    { code: 'SJJ', city: 'Saraybosna', country: 'Bosna Hersek', airport: 'Sarajevo', region: 'europe' },
    { code: 'TZL', city: 'Tuzla', country: 'Bosna Hersek', airport: 'Tuzla', region: 'europe' },
    { code: 'BNX', city: 'Banja Luka', country: 'Bosna Hersek', airport: 'Banja Luka', region: 'europe' },
    { code: 'TGD', city: 'Podgorica', country: 'Karadağ', airport: 'Podgorica', region: 'europe' },
    { code: 'TIV', city: 'Tivat', country: 'Karadağ', airport: 'Tivat', region: 'europe' },
    { code: 'PRN', city: 'Priştine', country: 'Kosova', airport: 'Adem Jashari', region: 'europe' },

    // İrlanda
    { code: 'DUB', city: 'Dublin', country: 'İrlanda', airport: 'Dublin Airport', region: 'europe' },
    { code: 'SNN', city: 'Shannon', country: 'İrlanda', airport: 'Shannon', region: 'europe' },
    { code: 'ORK', city: 'Cork', country: 'İrlanda', airport: 'Cork', region: 'europe' },

    // ============ ORTA DOĞU ============
    { code: 'DXB', city: 'Dubai', country: 'BAE', airport: 'Dubai International', region: 'middle_east' },
    { code: 'AUH', city: 'Abu Dabi', country: 'BAE', airport: 'Zayed International', region: 'middle_east' },
    { code: 'SHJ', city: 'Sharjah', country: 'BAE', airport: 'Sharjah', region: 'middle_east' },
    { code: 'DOH', city: 'Doha', country: 'Katar', airport: 'Hamad International', region: 'middle_east' },
    { code: 'RUH', city: 'Riyad', country: 'Suudi Arabistan', airport: 'King Khalid', region: 'middle_east' },
    { code: 'JED', city: 'Cidde', country: 'Suudi Arabistan', airport: 'King Abdulaziz', region: 'middle_east' },
    { code: 'DMM', city: 'Dammam', country: 'Suudi Arabistan', airport: 'King Fahd', region: 'middle_east' },
    { code: 'MED', city: 'Medine', country: 'Suudi Arabistan', airport: 'Prince Mohammad', region: 'middle_east' },
    { code: 'TLV', city: 'Tel Aviv', country: 'İsrail', airport: 'Ben Gurion', region: 'middle_east' },
    { code: 'AMM', city: 'Amman', country: 'Ürdün', airport: 'Queen Alia', region: 'middle_east' },
    { code: 'BEY', city: 'Beyrut', country: 'Lübnan', airport: 'Rafic Hariri', region: 'middle_east' },
    { code: 'KWI', city: 'Kuveyt', country: 'Kuveyt', airport: 'Kuwait International', region: 'middle_east' },
    { code: 'BAH', city: 'Manama', country: 'Bahreyn', airport: 'Bahrain International', region: 'middle_east' },
    { code: 'MCT', city: 'Maskat', country: 'Umman', airport: 'Muscat International', region: 'middle_east' },
    { code: 'IKA', city: 'Tahran', country: 'İran', airport: 'Imam Khomeini', region: 'middle_east' },
    { code: 'BGW', city: 'Bağdat', country: 'Irak', airport: 'Baghdad International', region: 'middle_east' },
    { code: 'EBL', city: 'Erbil', country: 'Irak', airport: 'Erbil International', region: 'middle_east' },

    // ============ ASYA ============
    // Japonya
    { code: 'NRT', city: 'Tokyo', country: 'Japonya', airport: 'Narita', region: 'asia' },
    { code: 'HND', city: 'Tokyo', country: 'Japonya', airport: 'Haneda', region: 'asia' },
    { code: 'KIX', city: 'Osaka', country: 'Japonya', airport: 'Kansai', region: 'asia' },
    { code: 'NGO', city: 'Nagoya', country: 'Japonya', airport: 'Chubu Centrair', region: 'asia' },
    { code: 'FUK', city: 'Fukuoka', country: 'Japonya', airport: 'Fukuoka', region: 'asia' },
    { code: 'CTS', city: 'Sapporo', country: 'Japonya', airport: 'New Chitose', region: 'asia' },

    // Güney Kore
    { code: 'ICN', city: 'Seul', country: 'Güney Kore', airport: 'Incheon', region: 'asia' },
    { code: 'GMP', city: 'Seul', country: 'Güney Kore', airport: 'Gimpo', region: 'asia' },
    { code: 'PUS', city: 'Busan', country: 'Güney Kore', airport: 'Gimhae', region: 'asia' },
    { code: 'CJU', city: 'Jeju', country: 'Güney Kore', airport: 'Jeju', region: 'asia' },

    // Çin
    { code: 'PEK', city: 'Pekin', country: 'Çin', airport: 'Capital', region: 'asia' },
    { code: 'PKX', city: 'Pekin', country: 'Çin', airport: 'Daxing', region: 'asia' },
    { code: 'PVG', city: 'Şanghay', country: 'Çin', airport: 'Pudong', region: 'asia' },
    { code: 'SHA', city: 'Şanghay', country: 'Çin', airport: 'Hongqiao', region: 'asia' },
    { code: 'CAN', city: 'Guangzhou', country: 'Çin', airport: 'Baiyun', region: 'asia' },
    { code: 'SZX', city: 'Shenzhen', country: 'Çin', airport: 'Bao\'an', region: 'asia' },
    { code: 'CTU', city: 'Chengdu', country: 'Çin', airport: 'Shuangliu', region: 'asia' },
    { code: 'CKG', city: 'Chongqing', country: 'Çin', airport: 'Jiangbei', region: 'asia' },
    { code: 'XIY', city: 'Xi\'an', country: 'Çin', airport: 'Xianyang', region: 'asia' },
    { code: 'HGH', city: 'Hangzhou', country: 'Çin', airport: 'Xiaoshan', region: 'asia' },

    // Hong Kong & Makao & Tayvan
    { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong', airport: 'Hong Kong International', region: 'asia' },
    { code: 'MFM', city: 'Makao', country: 'Makao', airport: 'Macau International', region: 'asia' },
    { code: 'TPE', city: 'Taipei', country: 'Tayvan', airport: 'Taoyuan', region: 'asia' },
    { code: 'KHH', city: 'Kaohsiung', country: 'Tayvan', airport: 'Kaohsiung', region: 'asia' },

    // Güneydoğu Asya
    { code: 'SIN', city: 'Singapur', country: 'Singapur', airport: 'Changi', region: 'asia' },
    { code: 'BKK', city: 'Bangkok', country: 'Tayland', airport: 'Suvarnabhumi', region: 'asia' },
    { code: 'DMK', city: 'Bangkok', country: 'Tayland', airport: 'Don Mueang', region: 'asia' },
    { code: 'HKT', city: 'Phuket', country: 'Tayland', airport: 'Phuket', region: 'asia' },
    { code: 'CNX', city: 'Chiang Mai', country: 'Tayland', airport: 'Chiang Mai', region: 'asia' },
    { code: 'KUL', city: 'Kuala Lumpur', country: 'Malezya', airport: 'KLIA', region: 'asia' },
    { code: 'PEN', city: 'Penang', country: 'Malezya', airport: 'Penang', region: 'asia' },
    { code: 'LGK', city: 'Langkawi', country: 'Malezya', airport: 'Langkawi', region: 'asia' },
    { code: 'CGK', city: 'Cakarta', country: 'Endonezya', airport: 'Soekarno-Hatta', region: 'asia' },
    { code: 'DPS', city: 'Bali', country: 'Endonezya', airport: 'Ngurah Rai', region: 'asia' },
    { code: 'SUB', city: 'Surabaya', country: 'Endonezya', airport: 'Juanda', region: 'asia' },
    { code: 'MNL', city: 'Manila', country: 'Filipinler', airport: 'Ninoy Aquino', region: 'asia' },
    { code: 'CEB', city: 'Cebu', country: 'Filipinler', airport: 'Mactan-Cebu', region: 'asia' },
    { code: 'SGN', city: 'Ho Chi Minh', country: 'Vietnam', airport: 'Tan Son Nhat', region: 'asia' },
    { code: 'HAN', city: 'Hanoi', country: 'Vietnam', airport: 'Noi Bai', region: 'asia' },
    { code: 'DAD', city: 'Da Nang', country: 'Vietnam', airport: 'Da Nang', region: 'asia' },
    { code: 'PNH', city: 'Phnom Penh', country: 'Kamboçya', airport: 'Phnom Penh', region: 'asia' },
    { code: 'REP', city: 'Siem Reap', country: 'Kamboçya', airport: 'Angkor', region: 'asia' },
    { code: 'RGN', city: 'Yangon', country: 'Myanmar', airport: 'Yangon', region: 'asia' },

    // Hindistan
    { code: 'DEL', city: 'Delhi', country: 'Hindistan', airport: 'Indira Gandhi', region: 'asia' },
    { code: 'BOM', city: 'Mumbai', country: 'Hindistan', airport: 'Chhatrapati Shivaji', region: 'asia' },
    { code: 'BLR', city: 'Bangalore', country: 'Hindistan', airport: 'Kempegowda', region: 'asia' },
    { code: 'MAA', city: 'Chennai', country: 'Hindistan', airport: 'Chennai', region: 'asia' },
    { code: 'CCU', city: 'Kalküta', country: 'Hindistan', airport: 'Netaji Subhas Chandra', region: 'asia' },
    { code: 'HYD', city: 'Hyderabad', country: 'Hindistan', airport: 'Rajiv Gandhi', region: 'asia' },
    { code: 'COK', city: 'Kochi', country: 'Hindistan', airport: 'Cochin', region: 'asia' },
    { code: 'GOI', city: 'Goa', country: 'Hindistan', airport: 'Dabolim', region: 'asia' },
    { code: 'AMD', city: 'Ahmedabad', country: 'Hindistan', airport: 'Sardar Vallabhbhai Patel', region: 'asia' },

    // Diğer Asya
    { code: 'CMB', city: 'Kolombo', country: 'Sri Lanka', airport: 'Bandaranaike', region: 'asia' },
    { code: 'MLE', city: 'Male', country: 'Maldivler', airport: 'Velana', region: 'asia' },
    { code: 'KTM', city: 'Katmandu', country: 'Nepal', airport: 'Tribhuvan', region: 'asia' },
    { code: 'DAC', city: 'Dakka', country: 'Bangladeş', airport: 'Hazrat Shahjalal', region: 'asia' },
    { code: 'ISB', city: 'İslamabad', country: 'Pakistan', airport: 'Islamabad', region: 'asia' },
    { code: 'KHI', city: 'Karaçi', country: 'Pakistan', airport: 'Jinnah', region: 'asia' },
    { code: 'LHE', city: 'Lahor', country: 'Pakistan', airport: 'Allama Iqbal', region: 'asia' },

    // ============ AMERİKA ============
    // ABD - Doğu
    { code: 'JFK', city: 'New York', country: 'ABD', airport: 'John F. Kennedy', region: 'america' },
    { code: 'EWR', city: 'Newark', country: 'ABD', airport: 'Newark Liberty', region: 'america' },
    { code: 'LGA', city: 'New York', country: 'ABD', airport: 'LaGuardia', region: 'america' },
    { code: 'BOS', city: 'Boston', country: 'ABD', airport: 'Logan', region: 'america' },
    { code: 'PHL', city: 'Philadelphia', country: 'ABD', airport: 'Philadelphia', region: 'america' },
    { code: 'IAD', city: 'Washington', country: 'ABD', airport: 'Dulles', region: 'america' },
    { code: 'DCA', city: 'Washington', country: 'ABD', airport: 'Reagan National', region: 'america' },
    { code: 'ATL', city: 'Atlanta', country: 'ABD', airport: 'Hartsfield-Jackson', region: 'america' },
    { code: 'MIA', city: 'Miami', country: 'ABD', airport: 'Miami International', region: 'america' },
    { code: 'FLL', city: 'Fort Lauderdale', country: 'ABD', airport: 'Hollywood', region: 'america' },
    { code: 'MCO', city: 'Orlando', country: 'ABD', airport: 'Orlando International', region: 'america' },
    { code: 'TPA', city: 'Tampa', country: 'ABD', airport: 'Tampa', region: 'america' },
    { code: 'CLT', city: 'Charlotte', country: 'ABD', airport: 'Douglas', region: 'america' },

    // ABD - Orta
    { code: 'ORD', city: 'Chicago', country: 'ABD', airport: 'O\'Hare', region: 'america' },
    { code: 'MDW', city: 'Chicago', country: 'ABD', airport: 'Midway', region: 'america' },
    { code: 'DTW', city: 'Detroit', country: 'ABD', airport: 'Detroit Metro', region: 'america' },
    { code: 'MSP', city: 'Minneapolis', country: 'ABD', airport: 'Saint Paul', region: 'america' },
    { code: 'DFW', city: 'Dallas', country: 'ABD', airport: 'Dallas/Fort Worth', region: 'america' },
    { code: 'IAH', city: 'Houston', country: 'ABD', airport: 'George Bush', region: 'america' },
    { code: 'DEN', city: 'Denver', country: 'ABD', airport: 'Denver International', region: 'america' },
    { code: 'PHX', city: 'Phoenix', country: 'ABD', airport: 'Sky Harbor', region: 'america' },

    // ABD - Batı
    { code: 'LAX', city: 'Los Angeles', country: 'ABD', airport: 'LAX', region: 'america' },
    { code: 'SFO', city: 'San Francisco', country: 'ABD', airport: 'San Francisco', region: 'america' },
    { code: 'SJC', city: 'San Jose', country: 'ABD', airport: 'Norman Y. Mineta', region: 'america' },
    { code: 'SAN', city: 'San Diego', country: 'ABD', airport: 'San Diego', region: 'america' },
    { code: 'SEA', city: 'Seattle', country: 'ABD', airport: 'Seattle-Tacoma', region: 'america' },
    { code: 'PDX', city: 'Portland', country: 'ABD', airport: 'Portland', region: 'america' },
    { code: 'LAS', city: 'Las Vegas', country: 'ABD', airport: 'Harry Reid', region: 'america' },
    { code: 'HNL', city: 'Honolulu', country: 'ABD', airport: 'Daniel K. Inouye', region: 'america' },

    // Kanada
    { code: 'YYZ', city: 'Toronto', country: 'Kanada', airport: 'Pearson', region: 'america' },
    { code: 'YVR', city: 'Vancouver', country: 'Kanada', airport: 'Vancouver', region: 'america' },
    { code: 'YUL', city: 'Montreal', country: 'Kanada', airport: 'Pierre Elliott Trudeau', region: 'america' },
    { code: 'YYC', city: 'Calgary', country: 'Kanada', airport: 'Calgary', region: 'america' },
    { code: 'YEG', city: 'Edmonton', country: 'Kanada', airport: 'Edmonton', region: 'america' },
    { code: 'YOW', city: 'Ottawa', country: 'Kanada', airport: 'Ottawa', region: 'america' },

    // Latin Amerika
    { code: 'MEX', city: 'Mexico City', country: 'Meksika', airport: 'Benito Juárez', region: 'america' },
    { code: 'CUN', city: 'Cancun', country: 'Meksika', airport: 'Cancún', region: 'america' },
    { code: 'GDL', city: 'Guadalajara', country: 'Meksika', airport: 'Miguel Hidalgo', region: 'america' },
    { code: 'GRU', city: 'Sao Paulo', country: 'Brezilya', airport: 'Guarulhos', region: 'america' },
    { code: 'GIG', city: 'Rio de Janeiro', country: 'Brezilya', airport: 'Galeão', region: 'america' },
    { code: 'BSB', city: 'Brasilia', country: 'Brezilya', airport: 'Presidente Juscelino', region: 'america' },
    { code: 'EZE', city: 'Buenos Aires', country: 'Arjantin', airport: 'Ezeiza', region: 'america' },
    { code: 'AEP', city: 'Buenos Aires', country: 'Arjantin', airport: 'Jorge Newbery', region: 'america' },
    { code: 'SCL', city: 'Santiago', country: 'Şili', airport: 'Arturo Merino Benítez', region: 'america' },
    { code: 'LIM', city: 'Lima', country: 'Peru', airport: 'Jorge Chávez', region: 'america' },
    { code: 'BOG', city: 'Bogota', country: 'Kolombiya', airport: 'El Dorado', region: 'america' },
    { code: 'MDE', city: 'Medellin', country: 'Kolombiya', airport: 'José María Córdova', region: 'america' },
    { code: 'PTY', city: 'Panama City', country: 'Panama', airport: 'Tocumen', region: 'america' },
    { code: 'SJO', city: 'San Jose', country: 'Kosta Rika', airport: 'Juan Santamaría', region: 'america' },
    { code: 'HAV', city: 'Havana', country: 'Küba', airport: 'José Martí', region: 'america' },
    { code: 'SDQ', city: 'Santo Domingo', country: 'Dominik Cumh.', airport: 'Las Américas', region: 'america' },
    { code: 'PUJ', city: 'Punta Cana', country: 'Dominik Cumh.', airport: 'Punta Cana', region: 'america' },

    // ============ AFRİKA ============
    { code: 'CAI', city: 'Kahire', country: 'Mısır', airport: 'Cairo International', region: 'africa' },
    { code: 'HRG', city: 'Hurghada', country: 'Mısır', airport: 'Hurghada', region: 'africa' },
    { code: 'SSH', city: 'Şarm El Şeyh', country: 'Mısır', airport: 'Sharm el-Sheikh', region: 'africa' },
    { code: 'LXR', city: 'Luksor', country: 'Mısır', airport: 'Luxor', region: 'africa' },
    { code: 'JNB', city: 'Johannesburg', country: 'Güney Afrika', airport: 'O.R. Tambo', region: 'africa' },
    { code: 'CPT', city: 'Cape Town', country: 'Güney Afrika', airport: 'Cape Town', region: 'africa' },
    { code: 'DUR', city: 'Durban', country: 'Güney Afrika', airport: 'King Shaka', region: 'africa' },
    { code: 'CMN', city: 'Kazablanka', country: 'Fas', airport: 'Mohammed V', region: 'africa' },
    { code: 'RAK', city: 'Marakeş', country: 'Fas', airport: 'Menara', region: 'africa' },
    { code: 'TNG', city: 'Tanca', country: 'Fas', airport: 'Ibn Battouta', region: 'africa' },
    { code: 'ALG', city: 'Cezayir', country: 'Cezayir', airport: 'Houari Boumediene', region: 'africa' },
    { code: 'TUN', city: 'Tunus', country: 'Tunus', airport: 'Tunis–Carthage', region: 'africa' },
    { code: 'NBO', city: 'Nairobi', country: 'Kenya', airport: 'Jomo Kenyatta', region: 'africa' },
    { code: 'MBA', city: 'Mombasa', country: 'Kenya', airport: 'Moi', region: 'africa' },
    { code: 'ADD', city: 'Addis Ababa', country: 'Etiyopya', airport: 'Bole', region: 'africa' },
    { code: 'LOS', city: 'Lagos', country: 'Nijerya', airport: 'Murtala Muhammed', region: 'africa' },
    { code: 'ABV', city: 'Abuja', country: 'Nijerya', airport: 'Nnamdi Azikiwe', region: 'africa' },
    { code: 'ACC', city: 'Accra', country: 'Gana', airport: 'Kotoka', region: 'africa' },
    { code: 'DSS', city: 'Dakar', country: 'Senegal', airport: 'Blaise Diagne', region: 'africa' },
    { code: 'MRU', city: 'Mauritius', country: 'Mauritius', airport: 'Sir Seewoosagur', region: 'africa' },
    { code: 'SEZ', city: 'Seyşeller', country: 'Seyşeller', airport: 'Seychelles', region: 'africa' },
    { code: 'TNR', city: 'Antananarivo', country: 'Madagaskar', airport: 'Ivato', region: 'africa' },
    { code: 'ZNZ', city: 'Zanzibar', country: 'Tanzanya', airport: 'Abeid Amani Karume', region: 'africa' },
    { code: 'DAR', city: 'Dar es Salaam', country: 'Tanzanya', airport: 'Julius Nyerere', region: 'africa' },
    { code: 'EBB', city: 'Kampala', country: 'Uganda', airport: 'Entebbe', region: 'africa' },

    // ============ OKYANUSYA ============
    { code: 'SYD', city: 'Sidney', country: 'Avustralya', airport: 'Kingsford Smith', region: 'oceania' },
    { code: 'MEL', city: 'Melbourne', country: 'Avustralya', airport: 'Tullamarine', region: 'oceania' },
    { code: 'BNE', city: 'Brisbane', country: 'Avustralya', airport: 'Brisbane', region: 'oceania' },
    { code: 'PER', city: 'Perth', country: 'Avustralya', airport: 'Perth', region: 'oceania' },
    { code: 'ADL', city: 'Adelaide', country: 'Avustralya', airport: 'Adelaide', region: 'oceania' },
    { code: 'CNS', city: 'Cairns', country: 'Avustralya', airport: 'Cairns', region: 'oceania' },
    { code: 'OOL', city: 'Gold Coast', country: 'Avustralya', airport: 'Gold Coast', region: 'oceania' },
    { code: 'AKL', city: 'Auckland', country: 'Yeni Zelanda', airport: 'Auckland', region: 'oceania' },
    { code: 'CHC', city: 'Christchurch', country: 'Yeni Zelanda', airport: 'Christchurch', region: 'oceania' },
    { code: 'WLG', city: 'Wellington', country: 'Yeni Zelanda', airport: 'Wellington', region: 'oceania' },
    { code: 'ZQN', city: 'Queenstown', country: 'Yeni Zelanda', airport: 'Queenstown', region: 'oceania' },
    { code: 'NAN', city: 'Nadi', country: 'Fiji', airport: 'Nadi', region: 'oceania' },
    { code: 'PPT', city: 'Tahiti', country: 'Fransız Polinezyası', airport: 'Fa\'a\'ā', region: 'oceania' },

    // ============ RUSYA VE BDT ============
    { code: 'SVO', city: 'Moskova', country: 'Rusya', airport: 'Sheremetyevo', region: 'europe' },
    { code: 'DME', city: 'Moskova', country: 'Rusya', airport: 'Domodedovo', region: 'europe' },
    { code: 'VKO', city: 'Moskova', country: 'Rusya', airport: 'Vnukovo', region: 'europe' },
    { code: 'LED', city: 'St. Petersburg', country: 'Rusya', airport: 'Pulkovo', region: 'europe' },
    { code: 'AER', city: 'Soçi', country: 'Rusya', airport: 'Sochi', region: 'europe' },
    { code: 'KZN', city: 'Kazan', country: 'Rusya', airport: 'Kazan', region: 'europe' },
    { code: 'SVX', city: 'Yekaterinburg', country: 'Rusya', airport: 'Koltsovo', region: 'europe' },
    { code: 'OVB', city: 'Novosibirsk', country: 'Rusya', airport: 'Tolmachevo', region: 'asia' },
    { code: 'VVO', city: 'Vladivostok', country: 'Rusya', airport: 'Vladivostok', region: 'asia' },
    { code: 'GYD', city: 'Bakü', country: 'Azerbaycan', airport: 'Haydar Aliyev', region: 'europe' },
    { code: 'TBS', city: 'Tiflis', country: 'Gürcistan', airport: 'Tbilisi', region: 'europe' },
    { code: 'BUS', city: 'Batum', country: 'Gürcistan', airport: 'Batumi', region: 'europe' },
    { code: 'EVN', city: 'Erivan', country: 'Ermenistan', airport: 'Zvartnots', region: 'europe' },
    { code: 'KBP', city: 'Kiev', country: 'Ukrayna', airport: 'Boryspil', region: 'europe' },
    { code: 'TSE', city: 'Astana', country: 'Kazakistan', airport: 'Nursultan Nazarbayev', region: 'asia' },
    { code: 'ALA', city: 'Almatı', country: 'Kazakistan', airport: 'Almaty', region: 'asia' },
    { code: 'TAS', city: 'Taşkent', country: 'Özbekistan', airport: 'Tashkent', region: 'asia' },
    { code: 'SKD', city: 'Semerkand', country: 'Özbekistan', airport: 'Samarkand', region: 'asia' },
    { code: 'FRU', city: 'Bişkek', country: 'Kırgızistan', airport: 'Manas', region: 'asia' },
    { code: 'DYU', city: 'Duşanbe', country: 'Tacikistan', airport: 'Dushanbe', region: 'asia' },
    { code: 'ASB', city: 'Aşkabat', country: 'Türkmenistan', airport: 'Ashgabat', region: 'asia' },
];

// "Tüm Dünya" seçeneği için özel değer
export const ALL_DESTINATIONS = { code: '', city: 'Tüm Dünya', country: '', airport: 'Herhangi Bir Yer', region: 'all' };

// Bölge isimleri
export const REGION_NAMES = {
    'all': 'Tümü',
    'europe': 'Avrupa',
    'asia': 'Asya',
    'middle_east': 'Orta Doğu',
    'america': 'Amerika',
    'africa': 'Afrika',
    'oceania': 'Okyanusya'
};
