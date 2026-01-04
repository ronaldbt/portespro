
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, PackageSearch, Truck, Key } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Auditoría Digital',
    desc: 'Calculamos el volumen exacto con nuestra tecnología de precisión para un precio sin sorpresas.'
  },
  {
    icon: PackageSearch,
    title: 'Embalaje Artesanal',
    desc: 'Protección multicapa específica para cada objeto, desde arte hasta tecnología delicada.'
  },
  {
    icon: Truck,
    title: 'Tránsito Premium',
    desc: 'Conductores trilingües y vehículos monitorizados por GPS en tiempo real por toda la costa.'
  },
  {
    icon: Key,
    title: 'Entrega en Mano',
    desc: 'Colocamos cada mueble en su ubicación final. Su hogar listo para vivir desde el primer minuto.'
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-teal-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Metodología PortesPro</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-none">
              El estándar de oro en <br /> logística de mudanza.
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm lg:text-right">
            Combinamos la tecnología de vanguardia con el trato personalizado de los artesanos de antaño.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 text-slate-200/50 font-black text-9xl group-hover:text-teal-500/10 transition-colors">
                {i + 1}
              </div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-all">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
