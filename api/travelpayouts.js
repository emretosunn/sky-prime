// Vercel Serverless Function - Travelpayouts API Proxy
// Node.js 18+ native fetch kullanılıyor

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

  // API Token
  const API_TOKEN = process.env.TRAVELPAYOUTS_TOKEN;

  if (!API_TOKEN) {
    console.error('TRAVELPAYOUTS_TOKEN bulunamadı');
    return res.status(500).json({ 
      error: 'Sunucu yapılandırma hatası',
      data: []
    });
  }

  try {
    // Query parameters'ı al
    const { 
      origin = 'IST', 
      destination, 
      currency = 'try', 
      limit = '50',  // Daha fazla sonuç
      departure_at, 
      return_at,
      one_way = 'false'  // Varsayılan: gidiş-dönüş
    } = req.query;

    // API URL'ini oluştur
    const params = new URLSearchParams({
      origin,
      currency,
      unique: 'false',  // Tüm fırsatları getir, unique olmasın
      sorting: 'price',
      direct: 'false',
      limit,
      one_way,  // Gidiş-dönüş veya tek yön
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

    console.log('API isteği:', origin, '->', destination || 'tüm dünya');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('API hatası:', response.status);
      return res.status(200).json({ 
        success: false,
        data: []
      });
    }

    const data = await response.json();

    // Cache header ekle (3 dakika - daha güncel fiyatlar için)
    res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Sunucu hatası:', error.message);
    return res.status(200).json({ 
      success: false,
      data: []
    });
  }
}
