
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Features } from './components/Features';
import { Calculator } from './components/Calculator';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { OnlineAdvisor } from './components/OnlineAdvisor';
import { Stats } from './components/Stats';
import { Process } from './components/Process';
import { QualityCommitment } from './components/QualityCommitment';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [lang, setLang] = useState('es');

  const scrollToCalc = () => {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
      <Navbar onGetQuote={scrollToCalc} />
      
      {/* Floating Elements */}
      <LanguageSwitcher currentLang={lang} onLangChange={setLang} />
      <OnlineAdvisor />

      <main className="flex-grow">
        {/* Hero Section with Integrated Calculator */}
        <section id="hero-calculator" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-50">
          <div className="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200"
              >
                Logística de Mudanzas de Alto Standing
              </motion.span>
              <h1 className="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
                Mudanzas con <span className="text-teal-600">cuidado artesanal</span> <br />
                <span className="text-slate-400">&</span> precisión tecnológica.
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium"
              >
                Especialistas en la Costa del Sol. Conductores trilingües que entienden la importancia de cada detalle en su nuevo hogar.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Calculator isHero={true} />
            </motion.div>
          </div>
        </section>
        
        {/* Stats Section (New Widget) */}
        <Stats />

        <div className="bg-slate-100 py-24">
           <Features />
        </div>

        {/* Process Section (New Widget) */}
        <Process />
        
        <QualityCommitment />
        
        <Testimonials />
      </main>

      <Footer />

      {/* Modern Dynamic Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full -z-40 pointer-events-none opacity-30 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 80, -40, 0], 
            y: [0, -40, 80, 0],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-teal-200/20 rounded-full blur-[180px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 100, 0], 
            y: [0, 100, -60, 0],
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-slate-300/40 rounded-full blur-[180px]" 
        />
      </div>
    </div>
  );
};

export default App;
