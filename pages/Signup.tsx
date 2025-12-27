
import React, { useState } from 'react';
import { useLanguage, usePage } from '../App';

const Signup: React.FC = () => {
  const { t } = useLanguage();
  const { setPage } = usePage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        // Mock success - redirect to login
        setPage('login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative pt-24 pb-20">
       <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px]" />
       </div>

       <div className="glass w-full max-w-lg p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden animate-window-pop z-10">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-white to-brand-accent opacity-50" />
           
           <div className="text-center mb-10 space-y-2">
               <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 dark:text-white">
                   {t({ en: 'Initialize Protocol', fr: 'Initialiser le Protocole' })}
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-300 font-antonio tracking-wide uppercase">
                   {t({ en: 'Create your operator identity to access the lab.', fr: 'Créez votre identité d\'opérateur pour accéder au laboratoire.' })}
               </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-5">
               <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2 group">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                           {t({ en: 'First Name', fr: 'Prénom' })}
                       </label>
                       <input 
                         type="text" 
                         required
                         className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
                         placeholder="Ada"
                       />
                   </div>
                   <div className="space-y-2 group">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                           {t({ en: 'Last Name', fr: 'Nom' })}
                       </label>
                       <input 
                         type="text" 
                         required
                         className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
                         placeholder="Lovelace"
                       />
                   </div>
               </div>

               <div className="space-y-2 group">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                       {t({ en: 'Organization / Unit', fr: 'Organisation / Unité' })}
                   </label>
                   <div className="relative">
                       <input 
                         type="text" 
                         className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
                         placeholder="Analytical Engine Corp"
                       />
                       <iconify-icon icon="ph:buildings-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
               </div>

               <div className="space-y-2 group">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                       {t({ en: 'Comms Address', fr: 'Adresse Comms' })}
                   </label>
                   <div className="relative">
                       <input 
                         type="email" 
                         required
                         className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
                         placeholder="ada@history.com"
                       />
                       <iconify-icon icon="ph:envelope-simple-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
               </div>

               <div className="space-y-2 group">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
                       {t({ en: 'Security Key', fr: 'Clé de Sécurité' })}
                   </label>
                   <div className="relative">
                       <input 
                         type="password" 
                         required
                         className="w-full bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500/70 dark:placeholder:text-gray-400/70 text-gray-900 dark:text-gray-100 shadow-sm hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
                         placeholder="••••••••••••"
                       />
                       <iconify-icon icon="ph:lock-key-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                   </div>
                   <div className="flex gap-2 items-center mt-2">
                       <div className="h-1 flex-1 bg-green-500/50 rounded-full"></div>
                       <div className="h-1 flex-1 bg-green-500/50 rounded-full"></div>
                       <div className="h-1 flex-1 bg-green-500/50 rounded-full"></div>
                       <div className="h-1 flex-1 bg-black/10 dark:bg-white/10 rounded-full"></div>
                       <span className="text-[9px] uppercase font-bold text-green-500">Strong</span>
                   </div>
               </div>

               <div className="pt-4">
                   <button 
                     type="submit"
                     disabled={loading}
                     className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(163,163,163,0.5)] relative overflow-hidden group"
                   >
                       <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                           {t({ en: 'Register Operator', fr: 'Enregistrer Opérateur' })}
                           <iconify-icon icon="ph:check-bold" />
                       </span>
                       {loading && (
                           <div className="absolute inset-0 flex items-center justify-center">
                               <iconify-icon icon="ph:spinner-gap-bold" className="animate-spin text-xl text-black" />
                           </div>
                       )}
                   </button>
               </div>
           </form>

           <div className="mt-8 text-center">
               <p className="text-[10px] text-gray-600 dark:text-gray-400">
                   {t({ en: 'Already credentialed?', fr: 'Déjà accrédité ?' })}{' '}
                   <button onClick={() => setPage('login')} className="font-bold text-brand-accent hover:underline uppercase tracking-wider">
                       {t({ en: 'Access System', fr: 'Accéder au Système' })}
                   </button>
               </p>
           </div>
       </div>
    </div>
  );
};

export default Signup;
