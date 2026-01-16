import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DealCard from './components/DealCard';
import AirportComboBox from './components/AirportComboBox';
import DestinationComboBox from './components/DestinationComboBox';
import DatePicker from './components/DatePicker';
import FlightDetail from './components/FlightDetail';
import LandingPage from './components/LandingPage';
import { fetchFlightDeals } from './services/travelpayouts';
import { Search, Loader2, Sparkles, TrendingDown, Clock, Globe, Calendar } from 'lucide-react';

function Dashboard({ 
  deals, 
  loading, 
  error, 
  origin, 
  setOrigin, 
  destination, 
  setDestination, 
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  getDeals, 
  filter, 
  setFilter 
}) {
  // Varış noktası adını bul
  const getDestinationLabel = () => {
    if (!destination) return 'Tüm Dünya';
    return destination;
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="relative z-10 pt-24 sm:pt-32 pb-20 sm:pb-40 container mx-auto px-4 sm:px-6">
        {/* Modern Hero Section */}
        <section className="max-w-5xl mx-auto text-center mb-16 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] sm:text-xs font-bold mb-6 sm:mb-10 backdrop-blur-md shadow-xl"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-brand" />
            <span className="tracking-[0.1em] sm:tracking-[0.15em] uppercase">Dünya Çapında Fırsat Takibi</span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 sm:mb-8 leading-[1.1] sm:leading-[0.95] text-gradient px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Gökyüzünü <span className="text-brand">Lüks</span> <br className="hidden sm:block" /> Değil, Şans Yapın.
          </motion.h1>

          <motion.p
            className="text-white/40 text-sm sm:text-lg md:text-xl font-medium mb-8 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Gerçek zamanlı uçuş radarı ile batan fiyatları, teknik hataları ve
            gizli indirimleri sizin için yakalıyoruz.
          </motion.p>

          {/* Arama Kutusu - Mobil Uyumlu */}
          <motion.div
            className="max-w-4xl mx-auto group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-brand/20 blur-[40px] rounded-[2rem] sm:rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative flex flex-col bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] p-3 sm:p-3 shadow-2xl transition-all group-focus-within:border-brand/40 group-focus-within:ring-1 ring-brand/20">
              
              {/* Mobil: Dikey düzen, Desktop: Yatay düzen */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                {/* Kalkış */}
                <AirportComboBox value={origin} onChange={setOrigin} />
                
                {/* Ayırıcı */}
                <div className="hidden sm:block w-px h-12 bg-white/10 mx-1" />
                <div className="sm:hidden h-px w-full bg-white/10 my-1" />
                
                {/* Varış */}
                <DestinationComboBox value={destination} onChange={setDestination} />
                
                {/* Ayırıcı */}
                <div className="hidden sm:block w-px h-12 bg-white/10 mx-1" />
                <div className="sm:hidden h-px w-full bg-white/10 my-1" />
                
                {/* Tarih */}
                <DatePicker 
                  departureDate={departureDate}
                  setDepartureDate={setDepartureDate}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                />
              </div>

              {/* Arama Butonu */}
              <button
                onClick={() => getDeals()}
                disabled={loading}
                className="w-full sm:w-auto bg-brand mt-3 sm:mt-3 sm:ml-auto hover:scale-[1.02] transform active:scale-[0.98] text-white font-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-[1.8rem] transition-all shadow-[0_15px_30px_rgba(0,112,242,0.4)] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="text-sm sm:text-base">KEŞFET</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Filtreler */}
        <section className="mb-8 sm:mb-16">
          <div className="flex flex-col gap-4 sm:gap-8 mb-6 sm:mb-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 sm:gap-4">
                Bugünün Fırsatları
                <div className="hidden sm:flex -space-x-1.5 translate-y-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-zinc-950 bg-brand/20" />)}
                </div>
              </h2>
              <p className="text-white/40 font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs">
                {origin} → {getDestinationLabel()} Rotaları
                {departureDate && ` • ${departureDate}`}
              </p>
            </div>

            {/* Filtre Butonları - Yatay kaydırılabilir */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-zinc-900/50 rounded-xl sm:rounded-2xl border border-white/5 backdrop-blur-xl overflow-x-auto custom-scrollbar w-full sm:w-auto sm:self-end">
              <button
                onClick={() => setFilter('all')}
                className={`flex-shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                Tümü
              </button>
              <button
                onClick={() => setFilter('drops')}
                className={`flex-shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${filter === 'drops' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                Düşenler
              </button>
              <button
                onClick={() => setFilter('last')}
                className={`flex-shrink-0 px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${filter === 'last' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                Son Dakika
              </button>
            </div>
          </div>

          {/* Sonuçlar */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 sm:py-40 rounded-2xl sm:rounded-[3rem] bg-zinc-900/20 border border-white/5"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
                  <Globe className="absolute inset-0 m-auto w-6 h-6 sm:w-8 sm:h-8 text-brand animate-pulse" />
                </div>
                <p className="text-white font-black tracking-widest uppercase text-xs sm:text-sm animate-pulse">Küresel Veritabanı Taranıyor</p>
                <p className="text-white/20 text-[10px] mt-2 font-bold uppercase tracking-widest">Lütfen bekleyin...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 rounded-2xl sm:rounded-[3rem] bg-amber-500/5 border border-amber-500/20 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white mb-2">{error.title}</h3>
                <p className="text-white/40 text-sm max-w-md mx-auto mb-6 sm:mb-8">{error.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {error.showFlexibleHint && (
                    <button
                      onClick={() => {
                        setDepartureDate('');
                        setReturnDate('');
                        setTimeout(() => getDeals(), 100);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Esnek Tarih ile Ara
                    </button>
                  )}
                  <button
                    onClick={getDeals}
                    className="bg-white/10 hover:bg-white/20 text-white px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border border-white/10"
                  >
                    Tekrar Dene
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
                {deals.map((deal, idx) => (
                  <DealCard key={deal.id || idx} deal={deal} index={idx} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* İstatistikler */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 py-12 sm:py-20 border-t border-white/5 mt-12 sm:mt-20">
          {[
            { label: 'Aktif Kullanıcı', val: '12.4K+', color: 'text-brand' },
            { label: 'Günlük Fırsat', val: '840+', color: 'text-emerald-500' },
            { label: 'Yakalama Oranı', val: '%98', color: 'text-amber-500' },
            { label: 'Ort. Tasarruf', val: '₺2.100', color: 'text-rose-500' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">{stat.val}</span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/30 text-center">{stat.label}</span>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
          <div className="text-white/20 text-[10px] sm:text-xs font-bold tracking-widest uppercase items-center flex gap-2 sm:gap-4">
            <span>© 2026 SKYPRIME</span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span>PREMIUM FLIGHT DEALS</span>
          </div>
          <div className="flex gap-4 sm:gap-8">
            {['Instagram', 'Twitter', 'TikTok'].map(s => (
              <a key={s} href="#" className="text-white/30 hover:text-white text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [origin, setOrigin] = useState('IST');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getDeals();
  }, [origin, destination]);

  // Tarihi kullanıcı dostu formata çevir
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFlightDeals(origin, destination, departureDate, returnDate);
      if (data.length === 0) {
        const destLabel = destination || 'Tüm Dünya';
        
        // Tarih seçilmişse özel mesaj göster
        if (departureDate || returnDate) {
          const dateRange = departureDate && returnDate 
            ? `${formatDateForDisplay(departureDate)} - ${formatDateForDisplay(returnDate)}`
            : formatDateForDisplay(departureDate || returnDate);
          
          setError({
            title: 'Seçilen Tarihlerde Fırsat Yok',
            description: `${origin} → ${destLabel} rotasında ${dateRange} tarihleri arasında uygun fırsat bulunamadı. "Esnek Tarih" seçeneğini deneyerek tüm tarihlerdeki fırsatları görebilirsiniz.`,
            showFlexibleHint: true
          });
        } else {
          setError({
            title: 'Bu Rotada Fırsat Bulunamadı',
            description: `${origin} → ${destLabel} rotası için şu an aktif bir fırsat yok. Farklı rotalar deneyebilirsiniz.`
          });
        }
      } else {
        setDeals(data);
      }
    } catch (err) {
      console.error("Veri çekme hatası", err);
      setError({
        title: 'Fırsatlar Yüklenemedi',
        description: 'Şu an uçuş fırsatlarını getirirken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.'
      });
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <Router>
      <div className="min-h-screen relative noise-bg-container">
        {/* Arka plan efektleri */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-brand/10 blur-[80px] sm:blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-600/5 blur-[80px] sm:blur-[120px] rounded-full" />
          <div className="noise-bg absolute inset-0 opacity-[0.05]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/deals" element={
            <Dashboard
              deals={deals}
              loading={loading}
              error={error}
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              getDeals={getDeals}
              filter={filter}
              setFilter={setFilter}
            />
          } />
          <Route path="/flight/:id" element={<FlightDetail deals={deals} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
