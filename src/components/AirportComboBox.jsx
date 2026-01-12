import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown, Check } from 'lucide-react';
import { TURKISH_AIRPORTS } from '../constants/airports';

const AirportComboBox = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef(null);

    const selectedAirport = TURKISH_AIRPORTS.find(a => a.code === value);

    const filteredAirports = TURKISH_AIRPORTS.filter(airport =>
        airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex-1" ref={wrapperRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 pl-6 sm:border-r border-white/10 pr-6 cursor-pointer group/item py-2 sm:py-0"
            >
                <MapPin className="w-6 h-6 text-brand" />
                <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Nereden?</span>
                    <span className="text-sm font-bold text-white uppercase flex items-center gap-2">
                        {selectedAirport ? `${selectedAirport.city} (${selectedAirport.code})` : 'Şehir Seçin'}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-full sm:w-[320px] min-w-[300px] premium-glass rounded-2xl border border-white/10 shadow-2xl z-[60] overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/5 bg-white/5">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Şehir veya Havalimanı Ara..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-white/20 outline-none focus:border-brand/50 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
                            {filteredAirports.length > 0 ? (
                                filteredAirports.map((airport) => (
                                    <div
                                        key={airport.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChange(airport.code);
                                            setIsOpen(false);
                                            setSearchTerm('');
                                        }}
                                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${value === airport.code ? 'bg-brand/20 text-white' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{airport.city}</span>
                                            <span className="text-[10px] font-medium opacity-50">{airport.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-black uppercase tracking-widest opacity-40">{airport.code}</span>
                                            {value === airport.code && <Check className="w-4 h-4 text-brand" />}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center">
                                    <span className="text-xs font-bold text-white/20 uppercase tracking-widest">Sonuç Bulunamadı</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AirportComboBox;
