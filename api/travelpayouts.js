// Vercel Serverless Function - Travelpayouts API Proxy
// Bu fonksiyon CORS sorunlarını çözer ve API token'ını sunucu tarafında güvenli tutar

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS request için (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sadece GET isteklerini kabul et
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API Token - Vercel Dashboard'dan Environment Variables olarak eklenmeli
  // NOT: VITE_ prefix'i olmadan sadece "TRAVELPAYOUTS_TOKEN" olarak ekleyin
  const API_TOKEN = process.env.TRAVELPAYOUTS_TOKEN || process.env.VITE_TRAVELPAYOUTS_TOKEN;

  if (!API_TOKEN) {
    console.error('API Token bulunamadı. Environment variables:', Object.keys(process.env).filter(k => k.includes('TRAVEL')));
    return res.status(500).json({ 
      error: 'API token yapılandırılmamış',
      hint: 'Vercel Dashboard > Settings > Environment Variables bölümünden TRAVELPAYOUTS_TOKEN ekleyin'
    });
  }

  try {
    // Query parameters'ı al
    const { origin = 'IST', destination, currency = 'try', limit = '30', departure_at, return_at } = req.query;

    // API URL'ini oluştur
    const params = new URLSearchParams({
      origin,
      currency,
      unique: 'true',
      sorting: 'price',
      direct: 'false',
      limit,
      token: API_TOKEN
    });

    // Varış noktası belirtilmişse ekle
    if (destination) {
      params.append('destination', destination);
    }

    // Tarih parametreleri
    if (departure_at) {
      params.append('departure_at', departure_at);
    }
    if (return_at) {
      params.append('return_at', return_at);
    }

    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?${params.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Travelpayouts API Hatası:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'API isteği başarısız', 
        status: response.status,
        details: errorText 
      });
    }

    const data = await response.json();

    // Cache header ekle (5 dakika)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Travelpayouts Proxy Hatası:', error);
    return res.status(500).json({ 
      error: 'Sunucu hatası', 
      details: error.message 
    });
  }
}
