import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Bell, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between premium-glass rounded-2xl px-4 md:px-6 py-3 border border-white/5">
                <Link to="/" className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-brand rounded-lg md:rounded-xl flex items-center justify-center shadow-[0_0_20px_var(--color-brand-glow)]">
                        <Plane className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-lg md:text-xl font-extrabold tracking-tight text-white leading-none">
                        SKY<span className="text-brand">PRIME</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-10">
                    <Link to="/deals" className="text-sm font-semibold text-white/90 hover:text-brand transition-colors">Fırsatlar</Link>
                    <Link to="/" className="text-sm font-semibold text-white/90 hover:text-brand transition-colors">Keşfet</Link>
                    <a href="#" className="text-sm font-semibold text-white/90 hover:text-brand transition-colors">Yolculuklarım</a>
                </nav>

                <div className="flex items-center gap-4 md:gap-6">
                    <button className="relative text-white/60 hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]"></span>
                    </button>

                    <button className="md:hidden text-white p-1">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
