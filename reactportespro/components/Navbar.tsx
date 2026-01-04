
import React, { useState, useEffect } from 'react';
import { Truck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onGetQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Reseñas', href: '#testimonios' },
  ];

  return (
    <nav className={`fixed w-full z-[70] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-teal-600 transition-all duration-300 transform group-hover:rotate-12 shadow-lg">
            <Truck className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            PORTES<span className="text-teal-600">PRO</span>.es
          </span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetQuote}
            className="bg-teal-600 hover:bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-100 transition-all"
          >
            Presupuesto
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b absolute top-full w-full px-6 py-8 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-900 font-black text-xl uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-100" />
              <button 
                onClick={() => { onGetQuote(); setIsOpen(false); }}
                className="bg-teal-600 text-white py-4 rounded-2xl font-black text-sm uppercase shadow-lg shadow-teal-100"
              >
                Calculadora Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
