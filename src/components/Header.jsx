import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Bell, Menu, X, Home, Search, Compass, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/deals', label: 'Fırsatlar', icon: Search },
        { path: '/', label: 'Keşfet', icon: Compass },
    ];

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 py-3 sm:py-4"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between premium-glass rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 border border-white/5">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-brand rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_20px_var(--color-brand-glow)]">
                            <Plane className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight text-white leading-none">
                            SKY<span className="text-brand">PRIME</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                className={`text-sm font-semibold transition-colors ${
                                    isActivePath(link.path) 
                                        ? 'text-brand' 
                                        : 'text-white/90 hover:text-brand'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a href="#" className="text-sm font-semibold text-white/90 hover:text-brand transition-colors">Yolculuklarım</a>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                        {/* Bildirim */}
                        <button className="relative text-white/60 hover:text-white transition-colors p-1.5 sm:p-2">
                            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border border-[#050505]"></span>
                        </button>

                        {/* Mobil Menü Butonu */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-1.5 sm:p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobil Menü */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] md:hidden"
                        />
                        
                        {/* Menü Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-zinc-950 border-l border-white/10 z-[46] md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                {/* Menü Header */}
                                <div className="flex items-center justify-between p-4 border-b border-white/5">
                                    <span className="text-sm font-black text-white uppercase tracking-wider">Menü</span>
                                    <button 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-4 h-4 text-white/50" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 p-4 space-y-2">
                                    <Link 
                                        to="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                                            isActivePath('/') 
                                                ? 'bg-brand/20 text-white' 
                                                : 'hover:bg-white/5 text-white/70'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            isActivePath('/') ? 'bg-brand' : 'bg-white/5'
                                        }`}>
                                            <Home className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold">Ana Sayfa</span>
                                            <span className="text-[11px] text-white/40">Başlangıç noktası</span>
                                        </div>
                                    </Link>

                                    <Link 
                                        to="/deals"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                                            isActivePath('/deals') 
                                                ? 'bg-brand/20 text-white' 
                                                : 'hover:bg-white/5 text-white/70'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                            isActivePath('/deals') ? 'bg-brand' : 'bg-white/5'
                                        }`}>
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold">Fırsatlar</span>
                                            <span className="text-[11px] text-white/40">Ucuz uçuşları keşfet</span>
                                        </div>
                                    </Link>

                                    <Link 
                                        to="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/70 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                            <Compass className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold">Keşfet</span>
                                            <span className="text-[11px] text-white/40">Yeni rotalar bul</span>
                                        </div>
                                    </Link>

                                    <Link 
                                        to="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-white/70 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold">Yolculuklarım</span>
                                            <span className="text-[11px] text-white/40">Geçmiş seyahatler</span>
                                        </div>
                                    </Link>
                                </nav>

                                {/* Footer */}
                                <div className="p-4 border-t border-white/5">
                                    <p className="text-[10px] text-white/20 text-center font-medium uppercase tracking-wider">
                                        © 2026 SkyPrime
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
