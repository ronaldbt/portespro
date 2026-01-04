
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';

export const OnlineAdvisor: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[80] flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip Label */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black shadow-2xl flex items-center gap-2 border border-slate-800"
      >
        <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_8px_#14b8a6]" />
        Hablamos Español, Inglés y Sueco
      </motion.div>

      {/* Main Floating Button */}
      <motion.button
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-teal-600 text-white rounded-[2.2rem] shadow-[0_25px_60px_rgba(13,148,136,0.4)] flex items-center justify-center border-4 border-white relative group pointer-events-auto"
      >
        <div className="absolute -inset-1 bg-teal-400/20 blur-xl group-hover:bg-teal-400/40 transition-all rounded-full" />
        
        <MessageCircle size={28} className="relative z-10 group-hover:scale-0 transition-all duration-300" />
        <PhoneCall size={28} className="absolute z-10 scale-0 group-hover:scale-100 transition-all duration-300" />
        
        {/* Sparkle effects on hover */}
        <div className="absolute top-1 right-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-all">
          <Sparkles size={14} className="text-teal-200 animate-bounce" />
        </div>
        
        {/* Notification Dot */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full border-4 border-white shadow-sm" />
      </motion.button>
    </div>
  );
};
