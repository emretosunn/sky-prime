import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Calendar, MapPin, Sparkles, Plane } from 'lucide-react';
import { getAirlineLogo } from '../services/travelpayouts';

const DealCard = ({ deal, index }) => {
    const navigate = useNavigate();
    const { 
        city, 
        country, 
        destination, 
        price, 
        discount, 
        departureDate, 
        tag, 
        airline, 
        id, 
        duration, 
        transfers 
    } = deal;
    
    const cityName = city || destination;
    const countryName = country || '';
    const airportCode = destination;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate(`/flight/${id}`)}
            className="group relative flex flex-col premium-card rounded-2xl sm:rounded-[2.5rem] overflow-hidden cursor-pointer h-auto"
        >
            {/* Şehir Görseli */}
            <div className="relative h-44 sm:h-56 md:h-64 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={`https://source.unsplash.com/800x600/?${cityName},city,architecture`}
                    alt={cityName}
                    className="w-full h-full object-cover transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
                <div className="absolute inset-0 mesh-glow opacity-60 z-10" />

                {/* Üst Badges */}
                <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 z-20 flex justify-between items-start">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                        <div className="bg-brand px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-[0_10px_20px_var(--color-brand-glow)]">
                            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider sm:tracking-widest">{tag || 'FIRSAT'}</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center justify-center w-12 sm:w-14 h-6 sm:h-8">
                            <img src={getAirlineLogo(airline)} alt={airline} className="max-h-full max-w-full object-contain brightness-0 invert" />
                        </div>
                    </div>
                    {discount > 0 && (
                        <div className="bg-red-500 text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xl">
                            -%{discount}
                        </div>
                    )}
                </div>

                {/* Varış Noktası - Alt */}
                <div className="absolute bottom-3 sm:bottom-6 left-4 sm:left-8 z-20">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand" />
                        <span className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                            {transfers === 0 ? 'DİREKT UÇUŞ' : `${transfers} AKTARMALI`}
                        </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-brand transition-colors duration-500">
                        {cityName}{countryName && <span className="text-white/40">, {countryName}</span>}
                    </h3>
                    
                    <div className="mt-1 sm:mt-2 flex items-center gap-1.5 sm:gap-2">
                        <Plane className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand/60" />
                        <span className="text-[10px] sm:text-xs font-black text-brand/80 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{airportCode}</span>
                    </div>
                </div>
            </div>

            {/* Kart İçeriği */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between relative">
                <div className="flex justify-between items-start">
                    <div className="space-y-0.5 sm:space-y-1">
                        <span className="text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-[0.15em] sm:tracking-[0.2em] block">FIRSAT FİYATI</span>
                        <div className="flex items-baseline gap-1.5 sm:gap-2">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter glow-price tabular-nums">{price.amount}</span>
                            <span className="text-base sm:text-lg md:text-xl font-bold text-brand uppercase">{price.currency}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <span className="text-[9px] sm:text-[10px] font-bold text-white/50 uppercase tracking-wider sm:tracking-widest">{duration}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full hidden sm:block" />
                            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-wider sm:tracking-widest">En İyi Fiyat</span>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:bg-brand group-hover:text-white transition-all duration-500"
                    >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.div>
                </div>

                {/* Kart Alt Bilgi */}
                <div className="pt-4 sm:pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between mt-4 sm:mt-6">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white/30" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] sm:text-[8px] font-black text-white/20 uppercase tracking-[0.15em] sm:tracking-[0.2em]">TARİH</span>
                            <span className="text-[10px] sm:text-xs font-bold text-white/60 tracking-tight">{departureDate}</span>
                        </div>
                    </div>

                    <div className="flex -space-x-1.5 sm:-space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 overflow-hidden shadow-xl">
                                <img src={`https://i.pravatar.cc/100?u=${i + index}`} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#0a0a0a] bg-zinc-900 flex items-center justify-center">
                            <span className="text-[7px] sm:text-[8px] font-black text-white/40">+12</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

export default DealCard;
