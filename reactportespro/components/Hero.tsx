
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onGetQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetQuote }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/5 skew-x-[-15deg] origin-top translate-x-20 hidden lg:block" />
      <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-slate-900 skew-x-[15deg] origin-bottom translate-x-40 hidden lg:block opacity-[0.03]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
              Servicio Premium en la Costa del Sol
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
              Tu Mudanza,<br />
              <span className="text-teal-600">Nuestra Prioridad.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Expertos en portes y mudanzas desde Marbella hasta Cala de Mijas. Elegancia, cuidado y puntualidad garantizada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onGetQuote}
                className="group flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-teal-200 transition-all hover:-translate-y-1"
              >
                Calcula tu flete gratis
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-100 hover:border-teal-200 text-slate-900 font-bold px-8 py-4 rounded-2xl transition-all">
                Ver Servicios
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <ShieldCheck className="text-teal-500 w-5 h-5" />
                <span className="text-sm font-semibold">Garantía Total</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="text-slate-500 w-5 h-5" />
                <span className="text-sm font-semibold">Disponibilidad 24h</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="text-teal-600 w-5 h-5" />
                <span className="text-sm font-semibold">Toda la Costa del Sol</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <img 
              src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=800" 
              alt="Servicio Profesional PortesPro" 
              className="rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
            />
            {/* Overlay Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -right-4 md:-right-10 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4"
            >
              <div className="bg-teal-100 p-3 rounded-2xl">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="font-black text-slate-900">Premium</p>
                <p className="text-xs text-slate-500">Calidad Marbella</p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Background Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-200/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};
