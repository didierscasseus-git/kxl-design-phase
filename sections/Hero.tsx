
import React, { useEffect, useRef, useMemo } from 'react';
import { useLanguage, useContact } from '../App';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { openContact } = useContact();
  
  // Parallax Refs
  const textRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  // Generate particles for ethereal effect
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1, // 1px to 4px
      opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5 opacity
      duration: Math.random() * 15 + 10 + 's', // 10s to 25s duration
      delay: Math.random() * -20 + 's', // Start at random offset
    }));
  }, []);

  // Text content - Structure: Line 1 (1 word), Line 2 (3 words) - UPPERCASE
  const titleLine1 = t({ en: 'CREATIVITY', fr: 'CRÉATIVITÉ' });
  const titleLine2 = t({ en: 'ENGINEERED TO SCALE', fr: 'CONÇUE POUR L\'ÉCHELLE' });

  useEffect(() => {
    const scrollRoot = document.getElementById('scroll-root');
    if (!scrollRoot) return;

    let requestId: number;

    const handleScroll = () => {
      requestId = requestAnimationFrame(() => {
        const scrollY = scrollRoot.scrollTop;
        
        // Parallax calculations (subtle movements)
        if (textRef.current) {
          textRef.current.style.transform = `translateY(${scrollY * 0.15}px)`; 
        }
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translateY(${scrollY * 0.25}px)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
      });
    };

    scrollRoot.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollRoot.removeEventListener('scroll', handleScroll);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <section aria-labelledby="hero-heading" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-[5%] overflow-hidden">
      {/* Background Parallax Elements */}
      
      {/* Particles Layer */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bg-white rounded-full animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: p.duration,
              animationDelay: p.delay,
              boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, 0.4)`
            }}
          />
        ))}
      </div>

      {/* 01 Text */}
      <div 
        ref={textRef}
        className="absolute top-24 left-[5%] text-[25vw] md:text-[120px] font-bold text-white/10 select-none pointer-events-none will-change-transform font-sans transition-colors duration-500 z-0"
      >
        01
      </div>
      
      {/* Blob 1 Wrapper - Wraps animation to allow separate parallax transform */}
      <div 
        ref={blob1Ref}
        className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] pointer-events-none will-change-transform z-0"
      >
        <div className="w-full h-full bg-brand-accent/10 blur-[130px] rounded-full animate-float opacity-30" />
      </div>

      {/* Blob 2 Wrapper */}
      <div 
        ref={blob2Ref}
        className="absolute bottom-[10%] right-[15%] w-[30vw] h-[30vw] pointer-events-none will-change-transform z-0"
      >
         <div className="w-full h-full bg-brand-accent/5 blur-[100px] rounded-full animate-float opacity-20" style={{ animationDelay: '3s' }} />
      </div>

      {/* Intro and Status - Aligned Left along with title */}
      <div className="hero-clip-intro relative z-10 w-full max-w-7xl mx-auto space-y-6 flex flex-col items-start text-left">
        
        {/* Updated Title - Apple Style Gradient & Soft Shadow */}
        <h1 id="hero-heading" className="text-6xl md:text-8xl lg:text-[140px] font-sans font-black tracking-tighter leading-[0.9] text-left my-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/70 drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
          <span className="block">
            {titleLine1}
          </span>
          <span className="block mt-2 md:mt-0">
            {titleLine2}
          </span>
        </h1>

        {/* Updated Text Container with Glass Effect */}
        <div className="max-w-2xl mt-8">
          <p className="glass-panel text-lg md:text-2xl leading-relaxed font-light font-sans text-left tracking-wide">
            {t({ 
              en: 'reimagine your brand and let it reach its full potential. high-performance digital ecosystems that come together and power your ambitions.', 
              fr: 'Architecturer des écosystèmes numériques haute performance par la cartographie systémique, les interfaces fluides et l\'ingénierie agentique.' 
            })}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-start gap-6 mt-12 w-full">
          {/* Button 1: Primary White Glow */}
          <button 
            onClick={openContact}
            className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[14px] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] group relative overflow-hidden"
          >
            <span className="relative z-10">{t({ en: 'Start Rebuild', fr: 'Lancer Reconstruction' })}</span>
            <div className="absolute inset-0 bg-brand-accent/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </button>
          
          {/* Button 2: Glass Glow */}
          <button className="w-full sm:w-auto glass px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[14px] hover:scale-105 active:scale-95 transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] text-white border border-white/10">
            {t({ en: 'View Case Files', fr: 'Dossiers de Cas' })}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
