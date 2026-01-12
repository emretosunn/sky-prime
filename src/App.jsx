import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DealCard from './components/DealCard';
import AirportComboBox from './components/AirportComboBox';
import FlightDetail from './components/FlightDetail';
import LandingPage from './components/LandingPage';
import { fetchFlightDeals } from './services/travelpayouts';
import { Search, Loader2, Sparkles, TrendingDown, Clock, Globe } from 'lucide-react';

function Dashboard({ deals, loading, error, origin, setOrigin, getDeals, filter, setFilter }) {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="relative z-10 pt-32 pb-40 container mx-auto px-6">
        {/* Modern Hero Section */}
        <section className="max-w-5xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-bold mb-10 backdrop-blur-md shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="tracking-[0.15em] uppercase">Dünya Çapında Fırsat Takibi</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Gökyüzünü <span className="text-brand">Lüks</span> <br className="hidden md:block" /> Değil, Şans Yapın.
          </motion.h1>

          <motion.p
            className="text-white/40 text-lg md:text-xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Gerçek zamanlı uçuş radarı ile batan fiyatları, teknik hataları ve
            gizli indirimleri sizin için yakalıyoruz.
          </motion.p>

          <motion.div
            className="max-w-2xl mx-auto group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-brand/20 blur-[40px] rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
            <div className="relative flex flex-col sm:flex-row items-center bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-3 shadow-2xl transition-all group-focus-within:border-brand/40 group-focus-within:ring-1 ring-brand/20">

              <AirportComboBox value={origin} onChange={setOrigin} />

              <div className="flex-1 px-8 text-left hidden sm:block">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Varış</span>
                <span className="text-sm font-bold text-white uppercase opacity-40">Tüm Dünya</span>
              </div>

              <button
                onClick={() => getDeals()}
                disabled={loading}
                className="w-full sm:w-auto bg-brand mt-4 sm:mt-0 hover:scale-105 transform active:scale-95 text-white font-black px-10 py-5 rounded-[1.5rem] sm:rounded-[1.8rem] transition-all shadow-[0_15px_30px_rgba(0,112,242,0.4)] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>KEŞFET</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Dynamic Filters Bar */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
                Bugünün Fırsatları
                <div className="flex -space-x-1.5 translate-y-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-950 bg-brand/20" />)}
                </div>
              </h2>
              <p className="text-white/40 font-semibold uppercase tracking-[0.2em] text-xs">
                {origin} Çıkışlı En İyi Rotalar
              </p>
            </div>

            <div className="flex items-center gap-2 p-1.5 bg-zinc-900/50 rounded-2xl border border-white/5 backdrop-blur-xl overflow-x-auto custom-scrollbar w-full md:w-auto">
              <button
                onClick={() => setFilter('all')}
                className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${filter === 'all' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                Tümü
              </button>
              <button
                onClick={() => setFilter('drops')}
                className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${filter === 'drops' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                <TrendingDown className="w-3 md:w-4 h-3 md:h-4" />
                Düşenler
              </button>
              <button
                onClick={() => setFilter('last')}
                className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${filter === 'last' ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}
              >
                <Clock className="w-3 md:w-4 h-3 md:h-4" />
                Son Dakika
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-40 rounded-[3rem] bg-zinc-900/20 border border-white/5"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
                  <Globe className="absolute inset-0 m-auto w-8 h-8 text-brand animate-pulse" />
                </div>
                <p className="text-white font-black tracking-widest uppercase text-sm animate-pulse">Küresel Veritabanı Taranıyor</p>
                <p className="text-white/20 text-[10px] mt-2 font-bold uppercase tracking-widest">Lütfen bekleyin...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 px-6 rounded-[3rem] bg-red-500/5 border border-red-500/20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{error}</h3>
                <p className="text-white/40 max-w-md mx-auto mb-8">Uçuş verilerini çekmek için geçerli bir Travelpayouts API anahtarına ihtiyacınız var.</p>
                <button
                  onClick={getDeals}
                  className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-xl text-sm font-bold border border-white/10 transition-all"
                >
                  Yeniden Dene
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {deals.map((deal, idx) => (
                  <DealCard key={deal.id || idx} deal={deal} index={idx} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Global Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 border-t border-white/5 mt-20">
          {[
            { label: 'Aktif Kullanıcı', val: '12.4K+', color: 'text-brand' },
            { label: 'Günlük Fırsat', val: '840+', color: 'text-emerald-500' },
            { label: 'Yakalama Oranı', val: '%98', color: 'text-amber-500' },
            { label: 'Ort. Tasarruf', val: '₺2.100', color: 'text-rose-500' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl font-black text-white mb-2">{stat.val}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{stat.label}</span>
            </div>
          ))}
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/20 text-xs font-bold tracking-widest uppercase items-center flex gap-4">
            <span>© 2026 SKYPRIME</span>
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <span>PREMIUM FLIGHT DEALS</span>
          </div>
          <div className="flex gap-8">
            {['Instagram', 'Twitter', 'TikTok'].map(s => (
              <a key={s} href="#" className="text-white/30 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">{s}</a>
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
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getDeals();
  }, [origin]);

  const getDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFlightDeals(origin);
      if (data.length === 0) {
        setError(`${origin} çıkışlı güncel fırsat bulunamadı. Lütfen başka bir şehir deneyin.`);
      } else {
        setDeals(data);
      }
    } catch (err) {
      console.error("Veri çekme hatası", err);
      if (err.message === 'TOKEN_MISSING') {
        setError('Travelpayouts API Token Eksik! Lütfen .env dosyasını güncelleyin.');
      } else {
        setError('Gerçek zamanlı uçuş verilerine şu an ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      }
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <Router>
      <div className="min-h-screen relative noise-bg-container">
        {/* Persistent Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/10 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-20 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
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
