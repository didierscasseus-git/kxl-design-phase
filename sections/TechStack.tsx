
import React from 'react';
import { useLanguage } from '../App';
import '../types';

const TECH_LOGOS = [
  { icon: "simple-icons:react", name: "React" },
  { icon: "simple-icons:typescript", name: "TypeScript" },
  { icon: "simple-icons:tailwindcss", name: "Tailwind" },
  { icon: "simple-icons:googlecloud", name: "GCP" },
  { icon: "simple-icons:postgresql", name: "PostgreSQL" },
  { icon: "simple-icons:openai", name: "OpenAI" },
  { icon: "simple-icons:framer", name: "Framer" },
  { icon: "simple-icons:vercel", name: "Vercel" },
  { icon: "simple-icons:rust", name: "Rust" },
  { icon: "simple-icons:docker", name: "Docker" },
  { icon: "simple-icons:amazonwebservices", name: "AWS" },
  { icon: "simple-icons:figma", name: "Figma" },
];

const TechStack: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="capabilities" className="py-32 px-[5%] border-t border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent font-sans">
              {t({ en: 'Capabilities', fr: 'Capacités' })}
            </span>
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter uppercase text-apple-shade font-sans">
              {t({ en: 'OUR ', fr: 'NOTRE ' })} <span className="italic">{t({ en: 'ARSENAL', fr: 'ARSENAL' })}</span>
            </h2>
          </div>
          <p className="glass-panel leading-relaxed font-light max-w-xl font-sans">
            {t({ 
              en: "We don't play favorites with tooling. We select the specific deterministic stack that solves for scale, safety, and speed. Our engineers operate across the full spectrum of modern development paradigms.", 
              fr: "Nous ne favorisons pas un outil en particulier. Nous sélectionnons la pile déterministe spécifique qui répond aux besoins d'échelle, de sécurité et de rapidité. Nos ingénieurs interviennent sur tout le spectre des paradigmes de développement modernes." 
            })}
          </p>
          <div className="flex flex-wrap gap-4">
            {['Cloud-Native', 'Type-Safe', 'Edge-Optimized', 'AI-First'].map(tag => (
              <div key={tag} className="glass px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border-black/5 dark:border-white/5 text-gray-800 dark:text-gray-200 hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-default font-sans">
                {t({
                  en: tag,
                  fr: tag === 'Cloud-Native' ? 'Cloud-Natif' : 
                      tag === 'Type-Safe' ? 'Type-Sûr' : 
                      tag === 'Edge-Optimized' ? 'Optimisé Edge' : 'Priorité IA'
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 p-10 glass rounded-[40px] border-white/50 dark:border-white/10 shadow-2xl relative overflow-hidden bg-white/40 dark:bg-black/40">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/10 blur-[80px] rounded-full" />
          {TECH_LOGOS.map((tech, i) => (
            <div 
              key={i} 
              className="aspect-square glass bg-white/40 dark:bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 group hover:bg-white dark:hover:bg-white/10 transition-all hover:scale-110 hover:-translate-y-2 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] duration-300"
            >
              <iconify-icon icon={tech.icon} width="36" height="36" className="text-gray-400 group-hover:text-brand-accent transition-colors" />
              <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 font-sans">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
