import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, ArrowRight, Shield, Zap, Globe, Star, Users, Briefcase } from 'lucide-react';
import Header from './Header';

const LandingPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-brand/30">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-28 sm:pt-36 md:pt-48 pb-16 sm:pb-24 md:pb-32 overflow-hidden">
                {/* Arka Plan Efektleri */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] sm:h-[800px] pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[50%] h-[50%] bg-brand/10 blur-[100px] sm:blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[20%] right-[-5%] w-[50%] sm:w-[40%] h-[40%] bg-purple-600/5 blur-[80px] sm:blur-[120px] rounded-full" />
                    <div className="noise-bg absolute inset-0 opacity-[0.03]" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-5xl mx-auto text-center"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-brand text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-12 backdrop-blur-md"
                        >
                            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-brand" />
                            Yapay Zeka Destekli Uçuş Radarı
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-12 text-gradient px-2"
                        >
                            BİLETİNİZİ <br /> <span className="text-brand">ŞANSA</span> <br /> BIRAKMAYIN.
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-white/40 text-base sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-8 sm:mb-16 leading-relaxed px-4"
                        >
                            SkyPrime, 7/24 global havayolu sistemlerini tarayarak batan fiyatları, teknik hatalı biletleri ve gizli indirimleri sizin için yakalar.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-4"
                        >
                            <Link
                                to="/deals"
                                className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-brand text-white font-black rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,112,242,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden text-sm sm:text-base"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                    FIRSATLARI KEŞFET <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <button className="w-full sm:w-auto px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-white/5 border border-white/10 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all text-sm sm:text-base">
                                Nasıl Çalışır?
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* İstatistikler */}
            <section className="py-12 sm:py-16 md:py-20 border-y border-white/5 bg-white/[0.01]">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-12">
                        {[
                            { label: 'Yıllık Tasarruf', val: '₺45M+', icon: Zap },
                            { label: 'Aktif Kullanıcı', val: '120K+', icon: Users },
                            { label: 'Global Havayolu', val: '800+', icon: Globe },
                            { label: 'Premium Destek', val: '7/24', icon: Shield },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center text-center group cursor-default">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:bg-brand/10 group-hover:border-brand/30 transition-all duration-500">
                                    <stat.icon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-brand" />
                                </div>
                                <span className="text-lg sm:text-xl md:text-3xl font-black text-white mb-0.5 sm:mb-1 md:mb-2">{stat.val}</span>
                                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-wider sm:tracking-widest">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Özellikler */}
            <section className="py-20 sm:py-28 md:py-40 container mx-auto px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-24">
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-tight px-2">Akıllı Takip Teknolojisi</h2>
                    <p className="text-white/40 font-medium text-sm sm:text-base md:text-lg px-4">Seyahatlerinizi daha ucuz değil, daha zeki planlayın.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {[
                        {
                            title: 'Glitch Fare Yakalayıcı',
                            desc: 'Sistem hatalarından kaynaklanan komik rakamlardaki biletleri saniyeler içinde haber veriyoruz.',
                            icon: Zap
                        },
                        {
                            title: 'AI Fiyat Tahmini',
                            desc: 'Yapay zekamız biletin daha da düşüp düşmeyeceğini analiz ederek en doğru alım zamanını söyler.',
                            icon: BrainCircuit
                        },
                        {
                            title: 'Özel VIP Transfer',
                            desc: 'SkyPrime üyelerine her uçuş sonrasında VIP transfer hizmetinde %30 indirim sağlanır.',
                            icon: Briefcase
                        }
                    ].map((feat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="premium-card rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border-white/5 hover:border-brand/30 transition-all group"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
                                {i === 1 ? <Globe className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand" /> : <feat.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-brand" />}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{feat.title}</h3>
                            <p className="text-white/40 leading-relaxed text-xs sm:text-sm">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 sm:py-24 md:py-40 container mx-auto px-4 sm:px-6">
                <div className="premium-glass rounded-2xl sm:rounded-[2rem] md:rounded-[4rem] p-6 sm:p-10 md:p-20 text-center relative overflow-hidden border-brand/20">
                    <div className="absolute top-0 left-0 w-full h-full bg-brand/5 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 sm:mb-8 md:mb-10 tracking-tight leading-tight">
                            Bir Sonraki <br /> <span className="text-brand text-glow">Maceranız</span> Sizi Bekliyor.
                        </h2>
                        <Link
                            to="/deals"
                            className="inline-flex items-center gap-2 sm:gap-4 bg-white text-black font-black px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl hover:scale-105 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.1)] text-sm sm:text-base"
                        >
                            ÜCRETSİZ BAŞLA <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                        <p className="mt-6 sm:mt-8 text-white/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest leading-loose">
                            Kredi Kartı Gerekmez • 14 Gün Deneme <br className="sm:hidden" /> • İstediğin Zaman İptal Et
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 sm:py-16 md:py-20 border-t border-white/5">
                <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
                    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
                        <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-brand" />
                        <span className="text-xl sm:text-2xl font-black tracking-tighter">SKYPRIME</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mb-6 sm:mb-10 text-white/30 font-bold uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px]">
                        {['Hakkımızda', 'Güvenlik', 'API', 'Blog', 'İletişim'].map(l => (
                            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                        ))}
                    </div>
                    <p className="text-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">© 2026 SKYPRIME GLOBAL NETWORKS</p>
                </div>
            </footer>
        </div>
    );
};

// Brain icon
const BrainCircuit = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.125A9 9 0 1 0 12 5Z" /><path d="M9 13a4.5 4.5 0 0 0 3-4" /><path d="M6.003 5.125A3 3 0 1 0 12 5" /><path d="M12 16a5 5 0 0 1-4-2" /><path d="M12 21a9 9 0 0 1-9-9" /><path d="M3.477 10.895a4 4 0 0 1 2.526-5.77" /></svg>
);

export default LandingPage;
