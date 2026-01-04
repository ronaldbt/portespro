
import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLangChange }) => {
  return (
    <div className="fixed bottom-8 left-8 z-[80] hidden md:block">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 flex items-center gap-2"
      >
        <div className="bg-slate-900 text-teal-400 p-2 rounded-xl">
          <Globe size={18} />
        </div>
        <div className="flex gap-1 pr-2">
          {['ES', 'EN', 'SV'].map((lang) => (
            <button
              key={lang}
              onClick={() => onLangChange(lang.toLowerCase())}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                currentLang.toUpperCase() === lang 
                  ? 'bg-teal-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
