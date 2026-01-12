import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Plane, ShieldCheck, Clock, Luggage, Wallet, Share2, Heart, ExternalLink } from 'lucide-react';
import Header from './Header';
import { getAirlineLogo } from '../services/travelpayouts';

const FlightDetail = ({ deals }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the deal from the list or fallback to dummy if refreshed (ideally would fetch specifically)
    const deal = deals.find(d => d.id === id);

    if (!deal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Uçuş Bulunamadı</h2>
                    <button onClick={() => navigate('/')} className="text-brand font-bold flex items-center gap-2 mx-auto">
                        <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full" />
            </div>

            <Header />

            <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 group"
                >
                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand group-hover:border-brand transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Geri Dön</span>
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Flight Info */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="premium-card rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-5 hidden md:block">
                                <Plane className="w-64 h-64 -rotate-45" />
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-2xl border border-white/20">
                                        <img src={getAirlineLogo(deal.airline)} alt={deal.airline} className="w-12 h-6 md:w-16 md:h-8 object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">{deal.city || deal.destination}</h1>
                                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs mt-1">{deal.airline} Havayolları</p>
                                    </div>
                                </div>
                                <div className="bg-brand/10 border border-brand/20 px-6 py-2 rounded-2xl flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-brand" />
                                    <span className="text-brand font-bold text-sm tracking-tight">Onaylı Fiyat</span>
                                </div>
                            </div>

                            {/* Route Visualization */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 py-8 md:py-10 border-y border-white/5 relative">
                                <div className="text-center md:text-left flex-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 md:mb-3 block">Kalkış</span>
                                    <h3 className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">{deal.origin}</h3>
                                    <p className="text-white/40 text-[10px] md:text-sm font-bold uppercase tracking-widest">{deal.departureTime || 'Saat Bilgisi Yok'}</p>
                                </div>

                                <div className="flex flex-col items-center gap-3 md:gap-4 flex-1 w-full">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-brand to-transparent relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-brand/30">
                                            <Plane className="w-4 md:w-5 h-4 md:h-5 text-brand" />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-brand uppercase tracking-widest">
                                        {deal.transfers === 0 ? 'Direkt Uçuş' : `${deal.transfers} Aktarma`}
                                    </span>
                                    <div className="flex items-center gap-2 text-white/30 text-[10px]">
                                        <Clock className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                        <span>~ {deal.duration}</span>
                                    </div>
                                </div>

                                <div className="text-center md:text-right flex-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 md:mb-3 block">Varış</span>
                                    <h3 className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2">{deal.destination}</h3>
                                    <p className="text-white/40 text-[10px] md:text-sm font-bold uppercase tracking-widest">{deal.city}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
                                {[
                                    { icon: Calendar, label: 'Tarih', val: deal.departureDate },
                                    { icon: Plane, label: 'Uçuş No', val: deal.flightNumber },
                                    { icon: Wallet, label: 'Sınıf', val: 'Ekonomi' },
                                    { icon: ShieldCheck, label: 'Koltuk', val: 'Standart' },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-white/30">
                                            <item.icon className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Features Detail */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="premium-card rounded-[2rem] p-8">
                                <h4 className="text-lg font-bold text-white mb-6">Uçuş Özellikleri</h4>
                                <ul className="space-y-4">
                                    {[
                                        'Standart Kabin Bagajı',
                                        'Havalimanı Check-in',
                                        'Güvenli Ödeme Altaypısı',
                                        '7/24 Müşteri Desteği'
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-4 text-white/60 text-sm font-medium">
                                            <div className="w-2 h-2 rounded-full bg-brand" />
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="premium-card rounded-[2rem] p-8">
                                <h4 className="text-lg font-bold text-white mb-6">Önemli Bilgilendirme</h4>
                                <p className="text-white/50 text-sm leading-relaxed italic">
                                    "Bu bilet fiyatı {deal.airline} tarafından sağlanan gerçek zamanlı veridir. Son fiyata tüm zorunlu vergiler dahildir."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Pricing & Action */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="premium-glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border-brand/20 relative"
                        >
                            <div className="mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-4">Toplam Tutar</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums">{deal.price.amount}</span>
                                    <span className="text-xl md:text-2xl font-bold text-brand">{deal.price.currency}</span>
                                </div>
                                <p className="text-white/40 font-bold mt-2 text-sm uppercase tracking-widest">Her Şey Dahil Fiyat</p>
                            </div>

                            <a
                                href={deal.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-brand hover:scale-[1.02] active:scale-[0.98] text-white font-black py-6 rounded-2xl shadow-[0_20px_40px_rgba(0,112,242,0.3)] transition-all flex items-center justify-center gap-3"
                            >
                                REZERVASYON YAP <ExternalLink className="w-5 h-5" />
                            </a>

                            <div className="flex items-center justify-center gap-6 mt-10">
                                <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                    <Heart className="w-4 h-4" /> Kaydet
                                </button>
                                <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                                    <Share2 className="w-4 h-4" /> Paylaş
                                </button>
                            </div>
                        </motion.div>

                        <div className="premium-card rounded-[2rem] p-8 border-white/5 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-brand" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-sm">Transfer Hizmeti</h5>
                                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">VIP Araçlarla Ulaşım</p>
                                </div>
                            </div>
                            <p className="text-white/50 text-xs leading-relaxed">
                                Bu uçuş için özel SkyPrime transfer hizmetinden %20 indirimle faydalanabilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FlightDetail;
