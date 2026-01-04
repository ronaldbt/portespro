
import React from 'react';
import { Package, Truck, Ruler, Shield, Clock, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Languages,
    title: 'Conductores Trilingües',
    desc: 'Hablamos Español, Inglés y Sueco para tu comodidad y tranquilidad.',
    color: 'bg-teal-600 text-white'
  },
  {
    icon: Truck,
    title: 'Mudanzas de Lujo',
    desc: 'Especialistas en Marbella, Puerto Banús y Cala de Mijas. Servicio VIP.',
    color: 'bg-slate-900 text-white'
  },
  {
    icon: Package,
    title: 'Embalaje Superior',
    desc: 'Protección máxima para antigüedades, arte y mobiliario delicado.',
    color: 'bg-teal-50 text-teal-600'
  },
  {
    icon: Ruler,
    title: 'Capacidad Flexible',
    desc: 'Desde pequeños bultos hasta villas de gran tamaño con la misma eficiencia.',
    color: 'bg-slate-100 text-slate-600'
  },
  {
    icon: Shield,
    title: 'Seguro Premium',
    desc: 'Cobertura total de mercancías. Tu patrimonio está en buenas manos.',
    color: 'bg-teal-100 text-teal-700'
  },
  {
    icon: Clock,
    title: 'Puntualidad Marbellí',
    desc: 'Sabemos que tu tiempo es valioso. Servicio puntual y discreto.',
    color: 'bg-slate-200 text-slate-900'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-slate-900 mb-4"
          >
            La Diferencia PortesPro
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            className="h-1.5 bg-teal-500 mx-auto rounded-full" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group"
            >
              <div className={`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md`}>
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
