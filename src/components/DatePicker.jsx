import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronUp, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

const PRESET_OPTIONS = [
    { id: 'flexible', label: 'Esnek Tarih', description: 'Tüm tarihler', days: null },
    { id: '1week', label: '1 Hafta İçinde', description: 'Yakın tarihler', days: 7 },
    { id: '1month', label: '1 Ay İçinde', description: '30 gün içinde', days: 30 },
    { id: '3months', label: '3 Ay İçinde', description: '90 gün içinde', days: 90 },
    { id: 'custom', label: 'Özel Tarih', description: 'Kendin seç', days: -1 },
];

const MONTHS = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

const DatePicker = ({ departureDate, setDepartureDate, returnDate, setReturnDate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState('flexible');
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectingReturn, setSelectingReturn] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef(null);
    const wrapperRef = useRef(null);

    // Dropdown pozisyonunu hesapla
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            
            let left = rect.left;
            const dropdownWidth = Math.min(380, windowWidth - 32);
            if (left + dropdownWidth > windowWidth - 16) {
                left = windowWidth - dropdownWidth - 16;
            }
            
            setDropdownPosition({
                top: rect.bottom + 12,
                left: Math.max(16, left),
                width: dropdownWidth
            });
        }
    }, [isOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && 
                triggerRef.current && !triggerRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowCalendar(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePresetSelect = (preset) => {
        setSelectedPreset(preset.id);
        
        if (preset.id === 'custom') {
            setShowCalendar(true);
            setSelectingReturn(false);
        } else if (preset.days === null) {
            // Esnek tarih - tarihleri sıfırla
            setDepartureDate('');
            setReturnDate('');
            setShowCalendar(false);
            setIsOpen(false);
        } else {
            // Preset seçildi - otomatik tarih hesapla
            const today = new Date();
            const endDate = new Date();
            endDate.setDate(today.getDate() + preset.days);
            
            setDepartureDate(formatDate(today));
            setReturnDate(formatDate(endDate));
            setShowCalendar(false);
            setIsOpen(false);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
    };

    const handleDateClick = (date) => {
        const dateStr = formatDate(date);
        
        if (!selectingReturn) {
            setDepartureDate(dateStr);
            setSelectingReturn(true);
        } else {
            if (new Date(dateStr) >= new Date(departureDate)) {
                setReturnDate(dateStr);
                setIsOpen(false);
                setShowCalendar(false);
            }
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        
        // Haftanın başlangıcını Pazartesi yap
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;
        
        // Önceki ayın günleri
        for (let i = startDay - 1; i >= 0; i--) {
            const prevDate = new Date(year, month, -i);
            days.push({ date: prevDate, isCurrentMonth: false });
        }
        
        // Bu ayın günleri
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
        
        // Sonraki ayın günleri
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
        }
        
        return days;
    };

    const isDateInRange = (date) => {
        if (!departureDate || !returnDate) return false;
        const d = new Date(formatDate(date));
        return d > new Date(departureDate) && d < new Date(returnDate);
    };

    const isDateSelected = (date) => {
        const dateStr = formatDate(date);
        return dateStr === departureDate || dateStr === returnDate;
    };

    const isDateDisabled = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const getDisplayLabel = () => {
        if (selectedPreset === 'flexible' || (!departureDate && !returnDate)) {
            return 'Esnek Tarih';
        }
        if (departureDate && returnDate) {
            return `${formatDisplayDate(departureDate)} - ${formatDisplayDate(returnDate)}`;
        }
        if (departureDate) {
            return formatDisplayDate(departureDate);
        }
        const preset = PRESET_OPTIONS.find(p => p.id === selectedPreset);
        return preset?.label || 'Tarih Seç';
    };

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
                            setShowCalendar(false);
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
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 bg-zinc-900/80">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-amber-500" />
                                    <span className="text-sm font-black text-white uppercase tracking-wider">
                                        {showCalendar ? (selectingReturn ? 'Dönüş Tarihi' : 'Gidiş Tarihi') : 'Tarih Seçin'}
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setShowCalendar(false);
                                    }}
                                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-white/50" />
                                </button>
                            </div>
                            
                            {/* Seçilen tarihler gösterimi */}
                            {(departureDate || returnDate) && (
                                <div className="flex items-center gap-2 mt-3 p-2 bg-amber-500/10 rounded-xl">
                                    <span className="text-xs font-bold text-amber-500">
                                        {departureDate && formatDisplayDate(departureDate)}
                                        {departureDate && returnDate && ' → '}
                                        {returnDate && formatDisplayDate(returnDate)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {!showCalendar ? (
                            /* Preset seçenekleri */
                            <div className="p-2 max-h-[50vh] overflow-y-auto">
                                {PRESET_OPTIONS.map((preset) => (
                                    <motion.div
                                        key={preset.id}
                                        onClick={() => handlePresetSelect(preset)}
                                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                                            selectedPreset === preset.id 
                                                ? 'bg-amber-500/20 border border-amber-500/30' 
                                                : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex flex-col">
                                            <span className={`text-sm font-bold ${selectedPreset === preset.id ? 'text-white' : 'text-white/80'}`}>
                                                {preset.label}
                                            </span>
                                            <span className="text-[11px] font-medium text-white/40 mt-0.5">
                                                {preset.description}
                                            </span>
                                        </div>
                                        {selectedPreset === preset.id && preset.id !== 'custom' && (
                                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 text-white" />
                                            </div>
                                        )}
                                        {preset.id === 'custom' && (
                                            <ChevronRight className="w-4 h-4 text-white/30" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            /* Takvim */
                            <div className="p-4">
                                {/* Ay navigasyonu */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-white/50" />
                                    </button>
                                    <span className="text-sm font-bold text-white">
                                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                    </span>
                                    <button
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-white/50" />
                                    </button>
                                </div>

                                {/* Gün başlıkları */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {DAYS.map(day => (
                                        <div key={day} className="text-center text-[10px] font-bold text-white/30 py-1">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Günler */}
                                <div className="grid grid-cols-7 gap-1">
                                    {getDaysInMonth(currentMonth).map((day, idx) => {
                                        const disabled = isDateDisabled(day.date);
                                        const selected = isDateSelected(day.date);
                                        const inRange = isDateInRange(day.date);
                                        
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => !disabled && day.isCurrentMonth && handleDateClick(day.date)}
                                                disabled={disabled || !day.isCurrentMonth}
                                                className={`
                                                    h-9 rounded-lg text-xs font-bold transition-all
                                                    ${!day.isCurrentMonth ? 'text-white/10' : ''}
                                                    ${disabled ? 'text-white/20 cursor-not-allowed' : ''}
                                                    ${selected ? 'bg-amber-500 text-white' : ''}
                                                    ${inRange ? 'bg-amber-500/20 text-amber-500' : ''}
                                                    ${!selected && !inRange && day.isCurrentMonth && !disabled ? 'text-white/60 hover:bg-white/10' : ''}
                                                `}
                                            >
                                                {day.date.getDate()}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Geri butonu */}
                                <button
                                    onClick={() => setShowCalendar(false)}
                                    className="mt-4 w-full py-2 text-xs font-bold text-white/50 hover:text-white transition-colors"
                                >
                                    ← Hızlı seçime dön
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative w-full sm:w-auto">
            {/* Trigger */}
            <div
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 cursor-pointer py-3 sm:py-0 hover:bg-white/5 rounded-xl sm:rounded-none transition-colors sm:border-l border-white/10"
            >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                </div>
                <div className="flex flex-col items-start leading-none flex-1 min-w-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Ne Zaman?</span>
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 truncate">
                        <span className="truncate">{getDisplayLabel()}</span>
                        <ChevronUp className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
                    </span>
                </div>
            </div>

            {/* Portal ile dropdown */}
            {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
        </div>
    );
};

export default DatePicker;
