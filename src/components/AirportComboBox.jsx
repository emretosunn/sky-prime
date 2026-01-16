import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronUp, Check, Plane } from 'lucide-react';
import { TURKISH_AIRPORTS } from '../constants/airports';

const AirportComboBox = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const wrapperRef = useRef(null);
    const triggerRef = useRef(null);
    const inputRef = useRef(null);

    const selectedAirport = TURKISH_AIRPORTS.find(a => a.code === value);

    const filteredAirports = TURKISH_AIRPORTS.filter(airport =>
        airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dropdown pozisyonunu hesapla
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 12,
                left: rect.left,
                width: Math.max(rect.width, 360)
            });
        }
    }, [isOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSelect = (code) => {
        onChange(code);
        setIsOpen(false);
        setSearchTerm('');
    };

    // Dropdown içeriği
    const dropdownContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9998]"
                        onClick={() => {
                            setIsOpen(false);
                            setSearchTerm('');
                        }}
                    />
                    
                    <motion.div
                        ref={wrapperRef}
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                            width: dropdownPosition.width,
                            maxWidth: 'calc(100vw - 32px)'
                        }}
                        className="bg-zinc-950 rounded-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-[9999] overflow-hidden"
                    >
                        {/* Search Header */}
                        <div className="p-4 border-b border-white/5 bg-zinc-900/80">
                            <div className="flex items-center gap-3 mb-3">
                                <Plane className="w-5 h-5 text-brand" />
                                <span className="text-sm font-black text-white uppercase tracking-wider">Kalkış Noktası Seçin</span>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Şehir veya havalimanı ara..."
                                    className="w-full bg-black/60 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/20 transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        {/* Airport List */}
                        <div className="max-h-[320px] overflow-y-auto overscroll-contain">
                            {filteredAirports.length > 0 ? (
                                <div className="p-2">
                                    {filteredAirports.map((airport) => (
                                        <motion.div
                                            key={airport.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelect(airport.code);
                                            }}
                                            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                                                value === airport.code 
                                                    ? 'bg-brand/20 border border-brand/30' 
                                                    : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs ${
                                                    value === airport.code 
                                                        ? 'bg-brand text-white' 
                                                        : 'bg-white/5 text-white/40'
                                                }`}>
                                                    {airport.code}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-bold ${value === airport.code ? 'text-white' : 'text-white/80'}`}>
                                                        {airport.city}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-white/40 mt-0.5">
                                                        {airport.name}
                                                    </span>
                                                </div>
                                            </div>
                                            {value === airport.code && (
                                                <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-white" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-5 h-5 text-white/20" />
                                    </div>
                                    <span className="text-sm font-bold text-white/30">Sonuç bulunamadı</span>
                                    <p className="text-xs text-white/20 mt-1">Farklı bir arama yapın</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-white/5 bg-zinc-900/50">
                            <p className="text-[10px] text-white/20 text-center font-medium">
                                {filteredAirports.length} havalimanı listeleniyor
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative w-full sm:w-auto sm:flex-1">
            {/* Trigger Button */}
            <div
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 px-6 sm:border-r border-white/10 cursor-pointer group/item py-3 sm:py-0 hover:bg-white/5 rounded-xl sm:rounded-none transition-colors"
            >
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div className="flex flex-col items-start leading-none flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Nereden?</span>
                    <span className="text-sm font-bold text-white uppercase flex items-center gap-2 truncate">
                        {selectedAirport ? (
                            <>
                                <span className="truncate">{selectedAirport.city}</span>
                                <span className="text-brand font-black">({selectedAirport.code})</span>
                            </>
                        ) : (
                            'Şehir Seçin'
                        )}
                        <ChevronUp className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
                    </span>
                </div>
            </div>

            {/* Portal ile dropdown render et */}
            {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
        </div>
    );
};

export default AirportComboBox;
