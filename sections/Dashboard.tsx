
import React, { useRef, useState, useEffect } from 'react';
import { useLanguage, useContact } from '../App';
import '../types';

// --- Types & Data ---

const PILLARS = [
  {
    id: 'clarity',
    title: { en: 'Clarity', fr: 'Clarté' },
    desc: { 
      en: 'Your brand is refined so it clearly communicates who you are, what you stand for, and why you are distinct—without chasing trends or compromising values.', 
      fr: 'Votre marque est affinée pour communiquer clairement qui vous êtes et pourquoi vous êtes distinct, sans compromis.' 
    },
    icon: 'ph:lighthouse-bold'
  },
  {
    id: 'structure',
    title: { en: 'Structure', fr: 'Structure' },
    desc: { 
      en: 'Your digital presence is reorganized to support how the business actually operates, removing friction between intention and execution.', 
      fr: 'Votre présence numérique est réorganisée pour soutenir le fonctionnement réel de l\'entreprise, éliminant les frictions.' 
    },
    icon: 'ph:graph-bold'
  },
  {
    id: 'efficiency',
    title: { en: 'Efficiency', fr: 'Efficacité' },
    desc: { 
      en: 'Unnecessary manual work is reduced, allowing systems to carry routine load so growth does not require constant intervention or expanding overhead.', 
      fr: 'Le travail manuel inutile est réduit, permettant aux systèmes de porter la charge routinière.' 
    },
    icon: 'ph:lightning-bold'
  }
];

const SYMPTOMS = [
  { en: "Your brand no longer communicates the depth or direction of the business", fr: "Votre marque ne communique plus la profondeur ou la direction de l'entreprise" },
  { en: "Your website exists, but does not actively support operations, sales, or decision-making", fr: "Votre site web existe mais ne soutient pas activement les opérations" },
  { en: "Growth has introduced manual effort, oversight, and unnecessary complexity", fr: "La croissance a introduit des efforts manuels et une complexité inutile" },
  { en: "Progress feels possible, but increasingly costly in time, energy, and resources", fr: "Le progrès semble possible, mais de plus en plus coûteux" }
];

const PROCESS = [
  { 
    step: '01', 
    title: { en: 'Diagnose', fr: 'Diagnostiquer' }, 
    detail: { en: 'Deep analysis of current operational bottlenecks and brand disconnects.', fr: 'Analyse approfondie des goulots d\'étranglement opérationnels actuels.' }, 
    icon: 'ph:scan-bold' 
  },
  { 
    step: '02', 
    title: { en: 'Rebuild', fr: 'Reconstruire' }, 
    detail: { en: 'Architecting the deterministic foundation and visual identity system.', fr: 'Architecture de la fondation déterministe et du système d\'identité visuelle.' }, 
    icon: 'ph:hammer-bold' 
  },
  { 
    step: '03', 
    title: { en: 'Activate', fr: 'Activer' }, 
    detail: { en: 'Deploying the new ecosystem with full operational training and handoff.', fr: 'Déploiement du nouvel écosystème avec formation opérationnelle complète.' }, 
    icon: 'ph:lightning-bold' 
  }
];

const OUTCOMES = [
  { en: 'Greater clarity and consistency', fr: 'Plus grande clarté et cohérence' },
  { en: 'Fewer points of friction', fr: 'Moins de points de friction' },
  { en: 'Reduced operational strain', fr: 'Réduction de la tension opérationnelle' },
  { en: 'Stronger confidence in ability to grow', fr: 'Confiance renforcée dans la capacité de croissance' }
];

// --- Components ---

const RevealCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const InteractivePillar: React.FC<{ 
  item: typeof PILLARS[0]; 
  t: (v: any) => string; 
  isActive: boolean; 
  onHover: (id: string | null) => void 
}> = ({ item, t, isActive, onHover }) => {
  return (
    <div 
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      className={`relative group p-8 rounded-3xl border transition-all duration-500 overflow-hidden cursor-crosshair
        ${isActive 
          ? 'bg-white/10 border-brand-accent scale-105 shadow-2xl z-10' 
          : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100 hover:bg-white/10'
        }
      `}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <iconify-icon icon={item.icon} width="48" />
      </div>
      
      <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3 font-sans text-apple-shade">
        {t(item.title)}
        {isActive && <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />}
      </h3>
      
      <p className={`text-sm leading-relaxed transition-colors duration-300 font-sans text-apple-simple`}>
        {t(item.desc)}
      </p>

      {/* Interactive visual element */}
      <div className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-500 ${isActive ? 'bg-brand-accent' : 'bg-transparent'}`} />
    </div>
  );
};

const ProcessCard: React.FC<{ step: typeof PROCESS[0]; index: number; t: (v: any) => string }> = ({ step, index, t }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <RevealCard delay={index * 150} className="relative group w-full">
      {/* Connector Dot (Desktop) */}
      <div className={`hidden md:block absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-black transition-all duration-500 z-20 ${isHovered ? 'bg-brand-accent scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-[#1A1815]'}`} />
      
      {/* Card Body */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative mt-8 p-8 rounded-[32px] border transition-all duration-700 overflow-hidden h-full flex flex-col justify-between group
          ${isHovered 
            ? 'bg-[#1A1815]/90 border-brand-accent/30 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] -translate-y-2 backdrop-blur-xl' 
            : 'bg-white/5 border-white/5 hover:border-white/10 backdrop-blur-sm'
          }
        `}
      >
         
         {/* --- ANIMATED BACKGROUNDS --- */}
         
         {/* 1. DIAGNOSE: Radar Scan */}
         {index === 0 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
               <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'}`} 
                    style={{ 
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                        backgroundSize: '24px 24px' 
                    }} 
               />
               {/* Scanning Line */}
               <div className={`absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-brand-accent/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-scan-vertical' : 'opacity-0'}`} />
               {/* Data Points */}
               <div className={`absolute top-4 right-4 text-[8px] font-mono text-brand-accent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                 <span className="block">CPU: 42%</span>
                 <span className="block">MEM: 12GB</span>
               </div>
            </div>
         )}

         {/* 2. REBUILD: Construction Grid / Blueprint */}
         {index === 1 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
               {/* Grid Lines */}
               <div className={`absolute inset-0 grid grid-cols-6 grid-rows-6 transition-all duration-1000 ${isHovered ? 'opacity-30 gap-[1px]' : 'opacity-0 gap-0'}`}>
                  {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="bg-white/10 transition-colors duration-500 hover:bg-brand-accent/50" />
                  ))}
               </div>
               {/* Blueprint Overlay */}
               <div className={`absolute inset-0 border-[0.5px] border-brand-accent/20 m-2 rounded-[28px] transition-all duration-700 ${isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} />
            </div>
         )}

         {/* 3. ACTIVATE: Energy Pulse / Circuit */}
         {index === 2 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
               <div className={`absolute inset-0 bg-gradient-to-tr from-brand-accent/0 via-brand-accent/5 to-brand-accent/0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
               <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-accent/10 rounded-full blur-[60px] transition-all duration-700 ${isHovered ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`} />
               {/* Particles */}
               <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-0'}`} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>
         )}

         {/* Content */}
         <div className="relative z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 shadow-inner ${isHovered ? 'bg-brand-accent text-black rotate-3 scale-110' : 'bg-white/5 text-gray-400'}`}>
               <iconify-icon icon={step.icon} width="28" />
            </div>
            
            <h4 className="text-xl font-bold uppercase tracking-widest mb-3 font-sans text-apple-shade">
               <span className="text-brand-accent/50 mr-3 text-sm font-mono block mb-1">{step.step}</span>
               {t(step.title)}
            </h4>
            
            <p className={`text-sm leading-relaxed transition-colors duration-300 font-sans text-apple-simple`}>
               {t(step.detail)}
            </p>
         </div>

         {/* Bottom Action Hint */}
         <div className={`mt-8 pt-6 border-t border-white/5 flex items-center justify-between transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-accent font-bold">
               {index === 0 ? 'Initialize Scan' : index === 1 ? 'View Architecture' : 'System Online'}
            </span>
            <iconify-icon icon="ph:arrow-right-bold" className="text-white animate-pulse" />
         </div>

      </div>
    </RevealCard>
  );
};

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { openContact } = useContact();
  const [activePillar, setActivePillar] = useState<string | null>(null);
  
  return (
    <section id="rebuild-message" className="relative min-h-screen bg-transparent py-32 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Global Style for Keyframes */}
      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(50%); }
        }
        .animate-scan-vertical {
          animation: scan-vertical 2s linear infinite;
        }
      `}</style>

      <div className="w-full flex flex-col items-center justify-center px-[5%] relative z-10">
         
         {/* 1. HERO STATEMENT */}
         <div className="mb-32 text-center max-w-5xl">
            <RevealCard>
              <h2 className="text-3xl md:text-5xl font-extralight tracking-tighter leading-tight drop-shadow-md mb-8 font-sans text-apple-shade">
                  {t({ en: 'A complete ', fr: 'Une ' })} 
                  <span className="font-bold uppercase text-apple-shade">
                    {t({ en: 'Brand & Systems Rebuild', fr: 'Reconstruction de Marque & Systèmes' })}
                  </span>
                  {t({ 
                    en: ' that aligns brand, operations, and digital tools for long-term growth.', 
                    fr: ' qui aligne marque, opérations et outils numériques pour une croissance à long terme.' 
                  })}
              </h2>
            </RevealCard>

            <RevealCard delay={200}>
              <p className="glass-panel text-sm md:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
                {t({
                  en: "A focused engagement for businesses that intend to grow without losing clarity, identity, or momentum. As businesses scale, complexity increases. What once worked begins to strain. This engagement aligns your foundation with your ambition.",
                  fr: "Un engagement ciblé pour les entreprises qui souhaitent se développer sans perdre leur clarté ou leur identité. À mesure que les entreprises grandissent, la complexité augmente. Cet engagement aligne vos fondations avec votre ambition."
                })}
              </p>
            </RevealCard>
         </div>

         {/* 2. THE NECESSITY (Symptoms) */}
         <div className="w-full max-w-6xl mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealCard className="space-y-6">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent flex items-center gap-2 font-sans">
                 <span className="w-8 h-[1px] bg-brand-accent" />
                 {t({ en: 'Diagnostics', fr: 'Diagnostics' })}
              </span>
              <h3 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-apple-shade font-sans">
                {t({ en: 'When this becomes necessary', fr: 'Quand cela devient nécessaire' })}
              </h3>
              <p className="glass-panel text-sm font-sans">
                {t({
                  en: "This engagement is designed for businesses that are functioning, growing, and ambitious—but constrained by structures built for an earlier stage.",
                  fr: "Cet engagement est conçu pour des entreprises fonctionnelles et ambitieuses, mais contraintes par des structures conçues pour une étape antérieure."
                })}
              </p>
            </RevealCard>

            <div className="grid grid-cols-1 gap-4">
              {SYMPTOMS.map((symptom, idx) => (
                <RevealCard key={idx} delay={idx * 100} className="group">
                  <div className="glass-panel compact p-6 transition-all duration-300 cursor-default hover:scale-[1.02]">
                    <div className="flex items-start gap-4">
                       <div className="mt-1 w-2 h-2 rounded-full bg-red-500/50 group-hover:bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-colors" />
                       <p className="text-sm leading-relaxed font-sans">
                         {t(symptom)}
                       </p>
                    </div>
                  </div>
                </RevealCard>
              ))}
            </div>
         </div>

         {/* 3. THE CORE PILLARS */}
         <div className="w-full max-w-7xl mb-32">
            <RevealCard className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-apple-shade mb-4 font-sans">
                {t({ en: 'What the rebuild does', fr: 'Ce que fait la reconstruction' })}
              </h3>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto" />
            </RevealCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((pillar) => (
                <InteractivePillar 
                  key={pillar.id}
                  item={pillar}
                  t={t}
                  isActive={activePillar === pillar.id}
                  onHover={setActivePillar}
                />
              ))}
            </div>
         </div>

         {/* 4. THE PROCESS (Timeline) - UPDATED INTERACTIVE CARDS */}
         <div className="w-full max-w-6xl mb-32 mx-auto">
            <RevealCard className="mb-12 text-center">
               <h3 className="text-2xl font-light uppercase tracking-widest text-apple-shade mb-2 font-sans">
                 {t({ en: 'How it works', fr: 'Comment ça marche' })}
               </h3>
               <p className="text-xs text-brand-accent uppercase tracking-widest font-sans">
                 {t({ en: 'Deliberate Pace. Goal: Stability.', fr: 'Rythme délibéré. But : Stabilité.' })}
               </p>
            </RevealCard>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16">
               {/* Connector Line (Desktop) */}
               <div className="hidden md:block absolute top-0 left-[16%] right-[16%] h-[1px] bg-white/10" />

               {PROCESS.map((step, idx) => (
                 <ProcessCard key={idx} step={step} index={idx} t={t} />
               ))}
            </div>
         </div>

         {/* 5. THE OUTCOME & CTA */}
         <RevealCard className="w-full max-w-4xl glass-panel text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-white to-brand-accent opacity-50" />
             
             <div className="mb-12 space-y-4">
                <h3 className="text-2xl md:text-4xl font-light uppercase tracking-tight text-apple-shade font-sans">
                  {t({ en: 'The Outcome', fr: 'Le Résultat' })}
                </h3>
                <p className="text-apple-simple max-w-xl mx-auto text-sm md:text-base font-sans">
                  {t({
                    en: "The result is not just efficiency, but position—standing out clearly in the market as a brand that cannot be easily replicated.",
                    fr: "Le résultat n'est pas seulement l'efficacité, mais la position : se démarquer clairement sur le marché."
                  })}
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
                {OUTCOMES.map((outcome, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left">
                    <iconify-icon icon="ph:check-circle-fill" className="text-brand-accent shrink-0" width="20" />
                    <span className="text-xs font-bold uppercase tracking-wider text-apple-simple font-sans">
                      {t(outcome)}
                    </span>
                  </div>
                ))}
             </div>

             <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-apple-simple font-sans">
                  {t({ en: 'How to begin', fr: 'Comment commencer' })}
                </h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto mb-6 font-sans">
                  {t({ 
                    en: "Not every business is ready for a full rebuild. We are deliberate about when it makes sense to proceed.", 
                    fr: "Toutes les entreprises ne sont pas prêtes pour une reconstruction complète. Nous sommes délibérés quant au moment opportun." 
                  })}
                </p>
                <button 
                  onClick={openContact}
                  className="px-10 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] font-sans"
                >
                   {t({ en: 'Request a Conversation', fr: 'Demander une Conversation' })}
                </button>
             </div>

             {/* Animated noise/grain overlay */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
         </RevealCard>

      </div>
    </section>
  );
};

export default Dashboard;
