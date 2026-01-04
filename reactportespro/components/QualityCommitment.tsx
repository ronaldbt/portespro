
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Zap } from 'lucide-react';

export const QualityCommitment: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-600/5 -skew-y-3 origin-center scale-110" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Nuestra obsesión: <br />
              <span className="text-teal-400">La Perfección en el Trato.</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="bg-teal-500/10 p-3 rounded-xl h-fit">
                  <ShieldCheck className="text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Seguro a Todo Riesgo</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Pólizas exclusivas para objetos de valor y antigüedades sin letra pequeña.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-teal-500/10 p-3 rounded-xl h-fit">
                  <Zap className="text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Eficiencia Digital</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Inventarios en la nube para que sepa dónde está cada caja en todo momento.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl relative"
          >
            <Heart className="text-teal-600 mb-6 w-12 h-12" />
            <h3 className="text-2xl font-black text-slate-950 mb-4 tracking-tight">Cuidado Artesanal</h3>
            <p className="text-slate-600 mb-8 font-medium leading-relaxed">
              Tratamos sus pertenencias como si fueran obras de arte. Nuestros operarios son formados en el manejo de materiales nobles y montajes complejos.
            </p>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-colors">
              Conoce al equipo
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
