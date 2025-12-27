
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, useContact, usePage } from '../App';
import '../types';

const SECTIONS = [
  { id: 'hero', name: { en: 'Rebuild', fr: 'Reconstruction' }, color: '#000000', icon: 'ph:rocket-launch-bold' },
  { id: 'infrastructure', name: { en: 'Engine', fr: 'Moteur' }, color: '#1A1815', icon: 'ph:cpu-bold' },
  { id: 'services', name: { en: 'Services', fr: 'Services' }, color: '#404040', icon: 'ph:grid-four-bold' },
  { id: 'capabilities', name: { en: 'Arsenal', fr: 'Arsenal' }, color: '#A3A3A3', icon: 'ph:shield-check-bold' },
  { id: 'approach', name: { en: 'Lifecycle', fr: 'Cycle de vie' }, color: '#808080', icon: 'ph:recycle-bold' },
  { id: 'cta', name: { en: 'Protocol', fr: 'Protocole' }, color: '#666666', icon: 'ph:lock-key-bold' },
];

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { openContact } = useContact();
  const { setPage } = usePage();

  // Initialize Google Translate
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const scrollRoot = document.getElementById('scroll-root');
    if (!scrollRoot) return;

    const observerOptions = {
      root: scrollRoot,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = SECTIONS.findIndex(s => s.id === id);
          if (index !== -1 && index !== activeIndex) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeIndex, t]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const toggleTranslate = () => {
    setShowTranslate(!showTranslate);
  };

  const handleAuthNav = (page: 'login' | 'signup') => {
    setPage(page);
    setAuthMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Global Translate Widget Container */}
      <div 
        className={`fixed z-[120] transition-all duration-300 ease-in-out origin-bottom-left ${
          showTranslate 
            ? 'opacity-100 translate-y-0 scale-100 visible' 
            : 'opacity-0 translate-y-4 scale-95 invisible pointer-events-none'
        }`}
        style={{
          bottom: window.innerWidth >= 1280 ? '100px' : '100px',
          left: window.innerWidth >= 1280 ? '60px' : '50%',
          transformOrigin: window.innerWidth >= 1280 ? 'bottom left' : 'bottom center',
          transform: window.innerWidth >= 1280 
              ? (showTranslate ? 'translateY(0)' : 'translateY(10px)') 
              : (showTranslate ? 'translate(-50%, 0)' : 'translate(-50%, 10px)'),
        }}
      >
        <div className="relative p-1 rounded-2xl glass-dark border border-white/10 shadow-2xl backdrop-blur-2xl">
           <div className="absolute -top-3 left-4 px-2 py-0.5 bg-brand-accent text-white text-[8px] font-bold uppercase tracking-widest rounded-sm shadow-sm z-20">
             System Lang
           </div>
           
           <div className="bg-[#F0EEE9]/80 dark:bg-[#0c0c0c]/80 rounded-xl p-3 w-[180px] relative overflow-hidden">
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
             <div className="relative z-10">
               <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-accent">
                 <iconify-icon icon="ph:caret-down-bold" width="12" />
               </div>
               <div id="google_translate_element" className="w-full relative z-0 min-h-[30px] flex items-center" />
             </div>
             <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[8px] text-gray-500 font-mono">
               <span>AUTO_DETECT</span>
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             </div>
           </div>
        </div>
      </div>

      {/* Desktop Sidebar (Left side vertical nav) */}
      <nav aria-label="Desktop Navigation" className="sticky top-0 h-0 z-[70] hidden xl:block overflow-visible">
        <div className="absolute left-6 top-[20vh] flex flex-col gap-2">
          
          {/* Top Logo / Home Button */}
          <button 
            onClick={() => scrollTo('hero')}
            aria-label="Back to top"
            className="mb-8 w-12 h-12 glass rounded-[20px] flex items-center justify-center font-bold italic text-lg border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-transform bg-brand-dancer dark:bg-black/40 text-black dark:text-white"
          >
            KX
          </button>

          {/* Navigation Items Wrapper with Sliding Indicator */}
          <div className="relative flex flex-col gap-2">
              {/* Smooth Sliding Indicator */}
              <div
                  className="absolute left-0 w-12 h-12 rounded-[20px] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) z-0"
                  style={{
                      transform: `translateY(${activeIndex * 56}px)`, // 48px height + 8px gap
                      backgroundColor: SECTIONS[activeIndex].color,
                      boxShadow: `0 0 30px -5px ${SECTIONS[activeIndex].color}80`
                  }}
              />

              {SECTIONS.map((section, idx) => {
                const isActive = activeIndex === idx;
                const stepNumber = (idx + 1).toString().padStart(2, '0');
                const sectionName = t(section.name);
                
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    aria-label={`Go to ${sectionName}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`sidebar-tab group relative z-10 flex items-center gap-4 px-2 py-2 rounded-[20px] transition-all duration-500 ease-out outline-none overflow-hidden w-12 hover:w-56 ${
                      isActive 
                        ? 'bg-transparent' // Transparent to show indicator behind
                        : 'bg-white/30 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10'
                    }`}
                  >
                    {/* Icon Container */}
                    <div className={`w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center text-[10px] font-bold tracking-tighter transition-all duration-300 ${
                      isActive ? 'text-white' : 'bg-white/80 dark:bg-black/40 text-gray-400'
                    }`}>
                      {isActive ? <iconify-icon icon={section.icon} width="18" /> : stepNumber}
                    </div>

                    {/* Expandable Text */}
                    <div className="flex flex-col text-left transition-all duration-500 overflow-hidden opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 absolute left-14 top-2 bottom-2 right-2 flex justify-center">
                      <div className="absolute inset-0 bg-white/20 dark:bg-black/40 rounded-lg -z-10 backdrop-blur-sm" />
                      <span className={`text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {sectionName}
                      </span>
                    </div>

                    {isActive && (
                      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </div>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Controls Container */}
          <div className="mt-8 flex flex-col items-center gap-6">
            
            {/* Profile / Auth Menu */}
            <div className="relative" onMouseLeave={() => setAuthMenuOpen(false)}>
                <button
                    onMouseEnter={() => setAuthMenuOpen(true)}
                    className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${authMenuOpen ? 'bg-brand-accent/20 text-brand-accent ring-2 ring-brand-accent/20' : 'text-gray-500 dark:text-gray-300 hover:text-brand-accent'}`}
                >
                    <iconify-icon icon="ph:user-circle-bold" width="20" />
                </button>
                
                {/* Popover */}
                <div className={`absolute left-full bottom-0 ml-4 w-48 glass bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/5 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-left ${authMenuOpen ? 'opacity-100 scale-100 translate-x-0 visible' : 'opacity-0 scale-95 -translate-x-2 invisible pointer-events-none'}`}>
                   <div className="p-1 flex flex-col gap-1">
                        <button 
                            onClick={() => handleAuthNav('login')}
                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200"
                        >
                            <iconify-icon icon="ph:sign-in-bold" width="14" />
                            {t({ en: 'Log In', fr: 'Connexion' })}
                        </button>
                        <button 
                            onClick={() => handleAuthNav('signup')}
                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200"
                        >
                            <iconify-icon icon="ph:user-plus-bold" width="14" />
                            {t({ en: 'Sign Up', fr: 'S\'inscrire' })}
                        </button>
                    </div>
                </div>
            </div>

            {/* Language Switcher */}
            <button 
              onClick={toggleTranslate} 
              aria-label="Translate"
              className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${showTranslate ? 'text-brand-accent bg-brand-accent/10 ring-2 ring-brand-accent/20' : 'text-gray-500 dark:text-gray-300 hover:text-brand-accent'}`}
            >
              <iconify-icon icon="ph:globe-simple-bold" width="18" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Trigger (Bottom floating system) */}
      <div className="fixed bottom-8 right-6 z-[110] xl:hidden flex flex-col items-end gap-4">
        {/* Mobile Toggle Row */}
        <div className={`flex items-center gap-3 transition-all duration-500 ${mobileMenuOpen ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100'}`}>
           <button 
             onClick={toggleTranslate}
             className={`glass w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${showTranslate ? 'text-brand-accent bg-brand-accent/10 ring-2 ring-brand-accent/20' : 'text-gray-600 dark:text-gray-300'}`}
           >
              <iconify-icon icon="ph:globe-simple-bold" width="18" />
           </button>
        </div>

        {/* Main Floating Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className={`w-14 h-14 rounded-full glass shadow-2xl border-black/5 flex items-center justify-center transition-all duration-500 active:scale-90 ${mobileMenuOpen ? 'rotate-90 bg-brand-black text-white' : 'bg-white dark:bg-white/10 text-gray-900 dark:text-white'}`}
        >
          <iconify-icon icon={mobileMenuOpen ? "ph:x-bold" : "ph:list-bold"} width="24" />
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      <div className={`fixed inset-0 z-[105] xl:hidden transition-all duration-700 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        {/* Enhanced Glass Texture Background */}
        <div className="absolute inset-0 bg-brand-dancer/30 dark:bg-black/60 backdrop-blur-xl border-l border-white/20" onClick={() => setMobileMenuOpen(false)} />
        
        {/* Side Nav List (Vertical on Right) */}
        <div className={`absolute bottom-28 right-6 w-[260px] flex flex-col gap-2 transition-all duration-500 transform ${mobileMenuOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95 opacity-0'} max-h-[75vh] overflow-y-auto scrollbar-hide`}>
          
          {/* Mobile Auth Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-2">
             <button onClick={() => handleAuthNav('login')} className="bg-white/60 dark:bg-white/10 text-gray-800 dark:text-gray-200 py-3 rounded-xl font-bold uppercase tracking-wider text-[9px] hover:bg-white/80 transition-colors">
                {t({ en: 'Log In', fr: 'Connexion' })}
             </button>
             <button onClick={() => handleAuthNav('signup')} className="bg-white/60 dark:bg-white/10 text-gray-800 dark:text-gray-200 py-3 rounded-xl font-bold uppercase tracking-wider text-[9px] hover:bg-white/80 transition-colors">
                {t({ en: 'Sign Up', fr: 'S\'inscrire' })}
             </button>
          </div>

          {SECTIONS.map((section, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-black text-white border-brand-black shadow-xl scale-105' 
                    : 'bg-white/60 dark:bg-white/10 text-gray-700 dark:text-gray-200 border-black/5 dark:border-white/5 hover:bg-white/80 dark:hover:bg-white/20'
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-brand-dancer dark:bg-black/40 shadow-inner'}`}>
                  <iconify-icon icon={section.icon} width="18" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest">{t(section.name)}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />}
              </button>
            );
          })}
          
          {/* Quick Contact / Action Button in Mobile Side Nav */}
          <button 
            onClick={() => {
                openContact();
                setMobileMenuOpen(false);
            }}
            className="mt-2 bg-brand-accent text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg flex-shrink-0"
          >
             {t({ en: 'Start Project', fr: 'Lancer un Projet' })}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
