import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Calendar, MapPin, Sparkles, Plane, Info } from 'lucide-react';
import { getAirlineLogo } from '../services/travelpayouts';

const DealCard = ({ deal, index }) => {
    const navigate = useNavigate();
    const { city, destination, price, discount, oldPrice, departureDate, tag, airline, id, duration, transfers } = deal;
    const cityName = city || destination;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate(`/flight/${id}`)}
            className="group relative flex flex-col premium-card rounded-[2.5rem] overflow-hidden cursor-pointer h-auto md:h-[540px]"
        >
            {/* City Image with Mesh Gradient Overlay */}
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={`https://source.unsplash.com/800x600/?${cityName},city,architecture`}
                    alt={cityName}
                    className="w-full h-full object-cover transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
                <div className="absolute inset-0 mesh-glow opacity-60 z-10" />

                {/* Header Badges */}
                <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <div className="bg-brand px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_10px_20px_var(--color-brand-glow)]">
                            <Sparkles className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{tag || 'FIRSAT'}</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl flex items-center justify-center w-14 h-8">
                            <img src={getAirlineLogo(airline)} alt={airline} className="max-h-full max-w-full object-contain brightness-0 invert" />
                        </div>
                    </div>
                    {discount > 0 && (
                        <div className="bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl">
                            -%{discount}
                        </div>
                    )}
                </div>

                {/* Destination Name Overlay */}
                <div className="absolute bottom-6 left-8 z-20">
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3 h-3 text-brand" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{transfers === 0 ? 'DİREKT UÇUŞ' : `${transfers} AKTARMALI`}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-brand transition-colors duration-500">
                        {cityName}
                    </h3>
                </div>
            </div>

            {/* Card Content */}
            <div className="flex-1 p-8 flex flex-col justify-between relative">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block">FIRSAT FİYATI</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter glow-price tabular-nums">{price.amount}</span>
                            <span className="text-lg md:text-xl font-bold text-brand uppercase">{price.currency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{duration}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">En İyi Fiyat</span>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:bg-brand group-hover:text-white transition-all duration-500"
                    >
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                </div>

                {/* Card Footer Info */}
                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                            <Calendar className="w-4 h-4 text-white/30" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">TARİH</span>
                            <span className="text-xs font-bold text-white/60 tracking-tight">{departureDate}</span>
                        </div>
                    </div>

                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 overflow-hidden shadow-xl">
                                <img src={`https://i.pravatar.cc/100?u=${i + index}`} alt="User" />
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-900 flex items-center justify-center">
                            <span className="text-[8px] font-black text-white/40">+12</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Background Glow */}
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

export default DealCard;
