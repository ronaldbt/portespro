
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alejandro Ruiz",
    role: "Mudanza en Marbella",
    content: "Excelente trato y cuidado con los muebles. Un servicio de 10 en Puerto Banús.",
    rating: 5
  },
  {
    name: "Marta Sánchez",
    role: "Mudanza Cala de Mijas",
    content: "La web es súper dinámica y la calculadora me dio el precio exacto que pagué. Muy profesionales.",
    rating: 5
  },
  {
    name: "David Smith",
    role: "Porte de Muebles",
    content: "Punctual and very efficient. The team handled everything with care. Highly recommend.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-slate-900 text-center mb-16">Opiniones de Nuestros Clientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-teal-400 text-teal-400" />)}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">"{t.content}"</p>
              <div>
                <p className="font-black text-slate-900">{t.name}</p>
                <p className="text-sm text-teal-600 font-bold uppercase tracking-wider">{t.role}</p>
              </div>
              <div className="absolute top-8 right-8 opacity-10">
                <span className="text-6xl font-serif text-teal-900">“</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
