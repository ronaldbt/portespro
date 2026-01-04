
import React from 'react';
import { Truck, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Truck className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                PORTES<span className="text-teal-400">PRO</span>.es
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Servicios exclusivos de mudanzas y logística en Marbella, Cala de Mijas y toda la Costa del Sol. Compromiso y elegancia en cada porte.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-teal-600 transition-all shadow-lg"><Instagram size={20} /></a>
              <a href="#" className="bg-slate-900 p-2 rounded-full hover:bg-teal-600 transition-all shadow-lg"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">Servicios</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Villas y Mansiones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Traslado de Negocios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portes de Lujo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custodia Segura</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">Zonas VIP</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Milla de Oro (Marbella)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">La Cala de Mijas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sotogrande / Estepona</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Malaga Capital</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">Contacto Directo</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-teal-500" />
                <span className="font-bold text-white">+34 600 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-teal-500" />
                <span>hola@portespro.es</span>
              </li>
              <li className="pt-4">
                <button className="bg-teal-600 text-white w-full py-4 rounded-2xl font-black shadow-xl hover:bg-teal-700 transition-all transform hover:scale-[1.02]">
                  SOLICITAR LLAMADA
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© 2024 PortesPro.es - Servicio de Mudanzas de Calidad.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal-400 transition-colors">Legal</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
