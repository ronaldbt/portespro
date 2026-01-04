
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Mudanzas Realizadas', value: '12k+' },
  { label: 'Años de Experiencia', value: '15+' },
  { label: 'Clientes VIP', value: '4k+' },
  { label: 'Zonas Cubiertas', value: '100%' },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
                {stat.value}
              </p>
              <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
