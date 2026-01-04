
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
// Added Truck to the imports
import { Plus, Minus, Trash2, MapPin, Box, ArrowRight, Wallet, Sparkles, CheckCircle2, Truck } from 'lucide-react';
import { InventoryItem, LocationType } from '../types';

const PRESETS: Omit<InventoryItem, 'id' | 'quantity'>[] = [
  { name: 'Caja Pequeña', category: 'Pequeño', volume: 0.1 },
  { name: 'Caja Grande', category: 'Mediano', volume: 0.3 },
  { name: 'Sofá 3 Plazas', category: 'Grande', volume: 2.5 },
  { name: 'Nevera', category: 'Grande', volume: 1.5 },
  { name: 'Lavadora', category: 'Mediano', volume: 0.8 },
  { name: 'Cama Matrimonio', category: 'Especial', volume: 3.0 },
  { name: 'Mesa Comedor', category: 'Mediano', volume: 1.2 },
  { name: 'Silla', category: 'Pequeño', volume: 0.2 },
];

interface CalculatorProps {
  isHero?: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ isHero }) => {
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState<LocationType>(LocationType.MARBELLA);
  const [destination, setDestination] = useState<LocationType>(LocationType.CALA_DE_MIJAS);
  const [items, setItems] = useState<InventoryItem[]>([]);

  const addItem = (preset: typeof PRESETS[0]) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === preset.name);
      if (existing) {
        return prev.map(i => i.name === preset.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...preset, id: Math.random().toString(), quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const calculation = useMemo(() => {
    const totalVolume = items.reduce((acc, item) => acc + (item.volume * item.quantity), 0);
    const zoneMultipliers: Record<LocationType, number> = {
      [LocationType.MARBELLA]: 1.3,
      [LocationType.CALA_DE_MIJAS]: 1.0,
      [LocationType.FUENGIROLA]: 1.0,
      [LocationType.ESTEPONA]: 1.5,
      [LocationType.MALAGA]: 1.4,
      [LocationType.BENALMADENA]: 1.1,
      [LocationType.TORREMOLINOS]: 1.1,
      [LocationType.OTHER]: 2.0
    };
    const baseDistancePrice = 45;
    const volumeRate = 18;
    const subtotal = baseDistancePrice + (totalVolume * volumeRate);
    const multiplier = (zoneMultipliers[origin] + zoneMultipliers[destination]) / 2;
    return {
      totalVolume,
      price: Math.round(subtotal * multiplier),
      itemCount: items.reduce((acc, i) => acc + i.quantity, 0)
    };
  }, [items, origin, destination]);

  return (
    <div className={`max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row transition-all duration-700 ${isHero ? 'ring-[16px] ring-slate-200/40' : ''}`}>
      {/* Left Panel */}
      <div className="lg:w-2/3 p-6 md:p-10 bg-white">
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                step === s ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center border-2 ${step === s ? 'border-teal-500' : 'border-slate-300'}`}>
                {s}
              </span>
              {s === 1 ? 'Ruta' : s === 2 ? 'Carga' : 'Finalizar'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600" /> Origen
                  </label>
                  <select 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value as LocationType)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm cursor-pointer"
                  >
                    {Object.values(LocationType).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-900" /> Destino
                  </label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value as LocationType)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 font-bold text-slate-900 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm cursor-pointer"
                  >
                    {Object.values(LocationType).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>

              <div className="relative aspect-[21/9] bg-slate-900 rounded-[2.5rem] overflow-hidden group border border-slate-800 shadow-inner">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
                  src="https://images.unsplash.com/photo-1512413316925-fd4b93f31521?auto=format&fit=crop&q=80&w=1200" 
                  alt="Costa del Sol" 
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <div className="w-full h-1 bg-white/10 relative rounded-full">
                      <motion.div 
                        initial={{ left: "10%" }}
                        animate={{ left: ["10%", "85%", "10%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-3 w-10 h-6 bg-teal-500 rounded-full border-2 border-white shadow-[0_0_25px_rgba(20,184,166,0.6)] flex items-center justify-center"
                      >
                         <Truck className="text-white w-3 h-3" />
                      </motion.div>
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[9px] text-white font-black tracking-widest uppercase">
                  Logística optimizada: {origin} ➔ {destination}
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 hover:bg-teal-600 transition-all"
              >
                Configurar Carga <ArrowRight />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black text-slate-900">Inventario Digital</h3>
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg uppercase tracking-widest">Precisión Técnica</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESETS.map((preset) => (
                  <motion.button
                    key={preset.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addItem(preset)}
                    className="p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] hover:border-teal-500 hover:bg-white hover:shadow-xl transition-all text-left flex flex-col gap-3 group"
                  >
                    <Box className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors" />
                    <span className="font-bold text-[11px] text-slate-700 leading-tight tracking-tight">{preset.name}</span>
                  </motion.button>
                ))}
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-6 h-[260px] overflow-y-auto space-y-3 border border-slate-200 shadow-inner custom-scrollbar">
                <LayoutGroup>
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-40">
                      <Box className="w-10 h-10" />
                      <p className="font-black text-xs uppercase tracking-widest">Selecciona tus pertenencias</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                            <Box className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-xs">{item.name}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.volume}m³</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 px-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:text-teal-600 transition-colors">
                              <Minus size={14} />
                            </button>
                            <span className="px-2 font-black text-xs w-6 text-center text-slate-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:text-teal-600 transition-colors">
                              <Plus size={14} />
                            </button>
                          </div>
                          <button onClick={() => updateQuantity(item.id, -999)} className="text-slate-300 hover:text-red-500 transition-all p-1.5">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </LayoutGroup>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="px-10 bg-slate-100 text-slate-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">
                  Atrás
                </button>
                <motion.button 
                  whileHover={items.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={items.length > 0 ? { scale: 0.98 } : {}}
                  onClick={() => setStep(3)}
                  disabled={items.length === 0}
                  className={`flex-grow py-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${
                    items.length > 0 ? 'bg-slate-900 text-white shadow-slate-200 hover:bg-teal-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Finalizar Presupuesto <ArrowRight />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div 
                initial={{ rotate: -20, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-100"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>
              <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Presupuesto Finalizado</h3>
              <p className="text-slate-500 text-sm mb-10 font-medium tracking-tight">Cuidado artesanal garantizado en toda la Costa del Sol.</p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-slate-950 p-12 rounded-[3rem] max-w-sm mx-auto shadow-2xl relative overflow-hidden group border border-slate-800"
              >
                <div className="absolute top-0 right-0 p-6">
                   <Sparkles className="text-teal-500/20 w-10 h-10 group-hover:text-teal-500 transition-colors" />
                </div>
                <p className="text-[10px] font-black text-teal-500 uppercase tracking-[0.4em] mb-4">Total Estimado PortesPro</p>
                <div className="flex items-center justify-center gap-1">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-black text-white tracking-tighter"
                  >
                    {calculation.price}
                  </motion.span>
                  <span className="text-3xl font-bold text-teal-500">€</span>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-800 flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                  <span>VILLA CARE</span>
                  <span>PREMIUM</span>
                </div>
              </motion.div>

              <div className="mt-12 space-y-5">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-teal-600 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-teal-500/30 hover:bg-teal-500 transition-all"
                >
                  RESERVAR MI MUDANZA
                </motion.button>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Confirmación inmediata • Soporte 24/7</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Panel (Summary) */}
      <div className="lg:w-1/3 bg-slate-950 p-8 md:p-12 text-white flex flex-col justify-between border-l border-slate-900 relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-600/10 rounded-full blur-[80px] -z-10" />
        
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b border-slate-900 pb-8">
            <h4 className="text-xl font-black text-white tracking-tight">Resumen Ejecutivo</h4>
            <div className="flex gap-2">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 bg-teal-500 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="w-2 h-2 bg-teal-500 rounded-full" />
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-xl group">
                <MapPin className="text-teal-400 w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Planificación de Ruta</p>
                <p className="font-black text-lg leading-none text-white">{origin} <span className="text-teal-500 px-2">➔</span> {destination}</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 shadow-xl">
                <Box className="text-teal-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Estimación de Carga</p>
                <motion.p key={calculation.totalVolume} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-black text-xl leading-none text-white">{calculation.totalVolume.toFixed(2)} m³</motion.p>
              </div>
            </div>

            <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
              <p className="text-teal-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6 text-center">Protocolo de Atención</p>
              <div className="grid grid-cols-3 gap-3">
                {['ES', 'EN', 'SV'].map(l => (
                  <div key={l} className="flex flex-col items-center gap-2">
                    <span className="text-xs font-black bg-slate-900 w-full text-center py-2.5 rounded-xl border border-slate-800 text-slate-300">
                      {l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white/[0.05] p-10 rounded-[3rem] border border-white/5 space-y-4 shadow-2xl">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">Cotización Premium</span>
            <motion.span 
              key={calculation.price}
              initial={{ scale: 1.1, color: '#14b8a6' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="text-5xl font-black text-white tracking-tighter"
            >
              {calculation.price}€
            </motion.span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
             <motion.div 
               animate={{ x: ["-100%", "300%"] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="h-full w-1/4 bg-teal-500/60 shadow-[0_0_15px_rgba(20,184,166,0.5)]"
             />
          </div>
          <p className="text-[9px] text-slate-600 font-black text-center pt-3 tracking-[0.3em] uppercase">Marbella • Sotogrande • Mijas</p>
        </div>
      </div>
    </div>
  );
};
