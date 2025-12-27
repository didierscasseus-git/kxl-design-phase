
import React from 'react';
import { APPROACH } from '../constants';
import { useLanguage } from '../App';

const Approach: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="approach" className="py-32 px-[5%] relative overflow-hidden bg-transparent transition-colors duration-500">
      <div className="text-center mb-24 max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent font-sans">
          {t({ en: 'Methodology', fr: 'Méthodologie' })}
        </span>
        <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter uppercase text-apple-shade font-sans">
          {t({ en: 'THE LAB ', fr: 'LE CYCLE ' })} <span className="italic">{t({ en: 'LIFECYCLE', fr: 'DU LABORATOIRE' })}</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-black/5 dark:bg-white/5 hidden md:block" />
        
        <div className="space-y-12">
          {APPROACH.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-2">
                <span className="text-5xl font-extralight text-brand-accent/20 italic font-sans">{item.stage}</span>
                <h3 className="text-xl font-bold uppercase tracking-widest text-apple-shade font-sans">{t(item.label)}</h3>
                <p className="text-sm text-apple-simple max-w-sm font-sans">{t(item.details)}</p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 rounded-full glass border-black/10 dark:border-white/10 flex items-center justify-center bg-white dark:bg-black shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-brand-accent scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <span className="relative z-10 font-bold group-hover:text-white transition-colors text-apple-simple font-sans">{item.stage}</span>
                </div>
                {idx === 0 && <div className="absolute inset-0 animate-pulse-sonar bg-brand-accent/20 rounded-full" />}
              </div>

              <div className="hidden md:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
