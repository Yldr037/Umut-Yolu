import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, 
  Activity, 
  Leaf, 
  Disc,
  ArrowDown,
  Wind,
  Droplets,
  Zap,
  Radio,
  User, 
  Briefcase, 
  HeartPulse, 
  Wrench,
  Orbit,
  ShieldCheck, // For military role
  PlaneLanding // Another option for pilot or commander
} from 'lucide-react';

/* --- 1. VERİ YAPILARI (DATA STRUCTURES) --- */
/* Düzenlenebilir Alanlar */

const TIMELINE_DATA = [
  {
    year: "2185",
    title: "IKS KURULUŞU",
    desc: "Eski hükümetlerin çöküşüyle İnsan Koloni Sistemi (IKS) küresel yönetimi devraldı. Kaos sona erdi, Düzen Çağı başladı."
  },
  {
    year: "2200",
    title: "KOVANLARA GEÇİŞ",
    desc: "Atmosferik çöküş nedeniyle nüfus, tam korumalı Kovan şehirlerine taşındı. Dışarısı ölüm, içerisi yaşamdır."
  },
  {
    year: "2237",
    title: "UMUT YOLU ONAYI",
    desc: "Yüce Meclis, Miredax gezegenine yapılacak kolonizasyon projesini onayladı."
  },
  {
    year: "2240",
    title: "KALKIŞ (BUGÜN)",
    desc: "IKS'nin eseri Aeterna gemisi, insanlığın genetik mirasını taşımak üzere fırlatılıyor. Gelecek artık gökyüzünde."
  }
];

const DECK_DATA = [
    { id: 1, name: "GÜVERTE 1: KOMUTA", role: "BEYİN", details: "Komuta odası ve navigasyon sistemleri." },
  { id: 2, name: "GÜVERTE 2: YAŞAM ALANI", role: "KALP", details: "Kamaralar, yemekhane ve spor salonu." },
  { id: 3, name: "GÜVERTE 3: BİLİM & MEDİKAL", role: "RUH", details: "Biyolaboratuvar, revir ve bahçe." },
  { id: 4, name: "GÜVERTE 4: TEKNİK", role: "KAS", details: "Krono-Metrik Sürücü çekirdeği ve enerji dağıtım ağları." },
  { id: 5, name: "GÜVERTE 5: HANGAR", role: "DEPO", details: "Koloni inşaat malzemeleri ve yüzey keşif araçları." },
];

const CREW_DATA = [
  { name: "GİZEM", role: "DOKTOR", icon: HeartPulse },
  { name: "POYRAZ", role: "PİLOT", icon: Rocket },
  { name: "ARDA", role: "BAŞ MÜHENDİS", icon: Wrench },
  { name: "MERYEM", role: "BOTANİST", icon: Leaf },
  { name: "EMRE", role: "TEKNİSYEN", icon:  Briefcase},
  { name: "ALYA", role: "GEZEGEN BİLİMCİ", icon: Orbit}, 
  { name: "ALPER", role: "ASKER", icon: ShieldCheck},
];

/* --- 2. YARDIMCI BİLEŞENLER (UTILITIES) --- */

const Section = ({ children, className = "" }) => (
  <section className={`min-h-screen w-full relative overflow-hidden ${className}`}>
    {children}
  </section>
);

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay">
    <svg className='w-full h-full'>
      <filter id='noiseFilter'>
        <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)' />
    </svg>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

/* --- 3. ANA BÖLÜMLER (MAIN SECTIONS) --- */

// HERO: Solemn & Majestic
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    // FIX: Removed `mt-12 sm:mt-16` from main and added padding-top to Hero
    <Section className="flex flex-col items-center justify-center bg-slate-950 text-white border-b border-slate-900 pt-20 sm:pt-24"> 
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black z-0" />
      
      {/* Stars */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <motion.div style={{ y }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-6 md:mb-8"
        >
          <span className="text-emerald-500 font-mono text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase border-b border-emerald-500/30 pb-2">
            Yeni Bir Gelecek İçin
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-4 md:mb-6 drop-shadow-2xl font-sans">
          UMUT YOLU<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            PROJESİ
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 font-light tracking-wide uppercase max-w-2xl mx-auto"
        >
          "IKS Rehberliğinde İnsanlık Yenileniyor"
        </motion.p>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-8 sm:bottom-12 z-10"
      >
        <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
      </motion.div>
    </Section>
  );
};

// HISTORY: Process Timeline
const Timeline = () => (
  <Section className="bg-black py-16 sm:py-24 px-4 sm:px-6 flex items-center min-h-[50vh]">
    <div className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-widest uppercase mb-2">Kurtuluş Takvimi</h2>
        <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full" />
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-10 space-y-8 sm:space-y-12">
        {TIMELINE_DATA.map((item, index) => (
          <FadeIn key={index} delay={index * 0.1} className="relative pl-6 sm:pl-8 md:pl-12">
            <span className="absolute -left-[9px] top-2 w-4 h-4 bg-slate-950 border-2 border-emerald-500 rounded-full" />
            <span className="text-5xl sm:text-6xl font-black text-slate-900 absolute -top-4 right-0 z-0 opacity-80 select-none hidden md:block">
              {item.year}
            </span>
            <div className="relative z-10 bg-slate-900/50 p-4 sm:p-6 rounded-r-xl border-l-4 border-emerald-500/50 hover:border-emerald-500 transition-colors">
              <h4 className="text-lg sm:text-xl font-bold text-emerald-100 flex flex-wrap items-center gap-3">
                {item.title}
                <span className="text-xs font-mono text-emerald-500 px-2 py-1 bg-emerald-950 rounded border border-emerald-900/50 md:hidden">{item.year}</span>
              </h4>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </Section>
);

// THE VESSEL: Minimalist SVG & Interactive Data
const MinimalShip = ({ activeDeck }) => (
  <div className="relative w-full h-80 sm:h-96 md:h-[500px] flex items-center justify-center">
    <svg viewBox="0 0 200 400" className="h-full w-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
      <defs>
        <linearGradient id="shipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      
      {/* The Ship: Inverted Triangle / Dagger */}
      <motion.path 
        d="M 100 10 L 170 380 L 100 360 L 30 380 Z" 
        fill="url(#shipGrad)"
        stroke="#10b981"
        strokeWidth="1"
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Center Pulse Line */}
      <motion.line 
        x1="100" y1="20" x2="100" y2="350" 
        stroke="#10b981" 
        strokeWidth="1"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Deck Indicator Nodes */}
      {[60, 130, 200, 270, 340].map((yPos, i) => (
        <motion.circle
          key={i}
          cx="100" cy={yPos}
          r={activeDeck === i + 1 ? 6 : 2}
          fill={activeDeck === i + 1 ? "#10b981" : "#334155"}
          animate={{ scale: activeDeck === i + 1 ? 1.5 : 1 }}
          className="transition-all duration-300"
        />
      ))}
    </svg>
    
    {/* Engine Glow */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4 h-20 bg-emerald-500 blur-2xl opacity-60 animate-pulse" />
  </div>
);

const Vessel = () => {
  const [activeDeck, setActiveDeck] = useState(1);

  return (
    <Section className="bg-slate-900 py-16 sm:py-24 px-4 sm:px-6 text-slate-200">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl">
        
        {/* Ship SVG (Order 1 on Mobile) */}
        <FadeIn className="order-1 flex flex-col items-center justify-center bg-slate-950/50 rounded-lg sm:rounded-full aspect-square lg:aspect-auto lg:h-full border border-slate-800/50 relative p-4">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent opacity-50" />
           <MinimalShip activeDeck={activeDeck} />
           <span className="absolute bottom-4 sm:bottom-8 font-mono text-[10px] text-slate-600 tracking-[0.3em] uppercase">Sistemler Aktif</span>
        </FadeIn>

        {/* Deck List (Order 2 on Mobile) */}
        <div className="order-2">
          <FadeIn>
            <div className="mb-6 sm:mb-8">
              <span className="text-emerald-500 font-mono text-xs tracking-widest">GEMİ ÖZELLİKLERİ</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">IKS AETERNA</h2>
              <p className="text-slate-400 font-mono text-sm mt-2 opacity-70">Sınıf: Uzun Menzil Koloni Gemisi</p>
            </div>
          </FadeIn>

          <div className="space-y-3 sm:space-y-4">
            {DECK_DATA.map((deck) => (
              <div 
                key={deck.id}
                onMouseEnter={() => setActiveDeck(deck.id)}
                onTouchStart={() => setActiveDeck(deck.id)} 
                className={`group relative p-4 sm:p-6 border transition-all duration-500 cursor-pointer overflow-hidden rounded-sm ${
                  activeDeck === deck.id 
                    ? "bg-slate-800 border-emerald-500" 
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-600"
                }`}
              >
                {activeDeck === deck.id && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />
                )}
                
                <div className="flex justify-between items-center relative z-10">
                  <span className={`font-bold uppercase tracking-wider text-sm ${activeDeck === deck.id ? "text-white" : "text-slate-500"}`}>
                    {deck.name}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-1 rounded border ${activeDeck === deck.id ? "border-emerald-500/50 text-emerald-400 bg-emerald-950" : "border-slate-700 text-slate-600"}`}>
                    {deck.role}
                  </span>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ height: activeDeck === deck.id ? "auto" : 0, opacity: activeDeck === deck.id ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-400 text-sm mt-3 font-light leading-relaxed border-t border-slate-700/50 pt-3">
                    {deck.details}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
};

// DESTINATION: The Heaven (Full Height & Responsive Fix)
const Destination = () => (
  <Section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-emerald-950 via-teal-900 to-emerald-950 relative border-y-4 border-emerald-600 py-16 sm:py-24">
    {/* Animated Particles/Orbs */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-emerald-400 mix-blend-screen"
        initial={{ 
          x: Math.random() * 100 + "vw", 
          y: Math.random() * 100 + "vh",
          opacity: 0,
          scale: 0
        }}
        animate={{ 
          y: [null, Math.random() * -100],
          opacity: [0, 0.4, 0],
          scale: [0, Math.random() * 2, 0]
        }}
        transition={{ 
          duration: 5 + Math.random() * 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{ width: Math.random() * 100, height: Math.random() * 100, filter: 'blur(20px)' }}
      />
    ))}
    
    <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <span className="block text-emerald-300 font-mono text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-4">HEDEF GEZEGEN</span>
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-100 to-teal-500 mb-6 sm:mb-8 drop-shadow-lg">
          MIREDAX
        </h2>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12 text-emerald-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="flex flex-col items-center p-4 sm:p-6 bg-emerald-800/20 backdrop-blur-md rounded-xl border border-emerald-500/20">
          <Wind className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4 text-emerald-400" />
          <h3 className="text-2xl sm:text-3xl font-bold">%23-25</h3>
          <p className="text-xs sm:text-sm font-mono opacity-80 mt-1 uppercase tracking-widest">Saf Oksijen</p>
        </div>
        
        <div className="flex flex-col items-center p-4 sm:p-6 bg-emerald-800/20 backdrop-blur-md rounded-xl border border-emerald-500/20">
          <Droplets className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4 text-cyan-400" />
          <h3 className="text-2xl sm:text-3xl font-bold">SINIRSIZ</h3>
          <p className="text-xs sm:text-sm font-mono opacity-80 mt-1 uppercase tracking-widest">Tatlı Su</p>
        </div>

        <div className="flex flex-col items-center p-4 sm:p-6 bg-emerald-800/20 backdrop-blur-md rounded-xl border border-emerald-500/20">
          <Leaf className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-4 text-green-400" />
          <h3 className="text-2xl sm:text-3xl font-bold">%100</h3>
          <p className="text-xs sm:text-sm font-mono opacity-80 mt-1 uppercase tracking-widest">Yaşam Durumu</p>
        </div>
      </motion.div>

      <motion.p 
        className="mt-12 sm:mt-16 text-emerald-200 text-base sm:text-lg md:text-xl font-light tracking-wider italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        "Dünya'dan 14 Işık Yılı Uzakta. Umut Burada Yeşerecek."
      </motion.p>
    </div>
  </Section>
);

// CREW: The Heroes (No Photos, Abstract Icons)
const Crew = () => (
  <Section className="bg-slate-950 py-16 sm:py-24 px-4 sm:px-6 text-center min-h-[50vh]">
    <div className="max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">Kahraman Mürettebat</h2>
        <div className="h-0.5 w-24 bg-slate-800 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {CREW_DATA.map((member, idx) => {
          const IconComponent = member.icon; 
          return (
            <FadeIn key={idx} delay={idx * 0.1} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-slate-900 border border-slate-800 relative overflow-hidden mb-2 sm:mb-4 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-emerald-500/50">
                {/* Replaced img with Lucide icon */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.5, duration: 0.5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-600 mb-4 transition-transform group-hover:scale-110"
                >
                  {IconComponent && <IconComponent className="w-full h-full" />}
                </motion.div>
                
                {/* Overlay info - adjusted for new content flow */}
                <div className="p-3 sm:p-4 text-center">
                  <p className="text-emerald-500 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-0 sm:mb-1">{member.role}</p>
                  <p className="text-white font-bold text-sm sm:text-lg">{member.name}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  </Section>
);

// FOOTER: Simple & Official
const Footer = () => (
  <footer className="bg-black text-slate-500 py-6 sm:py-8 px-4 sm:px-6 border-t border-slate-900 font-mono text-[10px] sm:text-xs text-center flex flex-col gap-2">
    <div className="flex justify-center items-center gap-2 mb-2">
      <Rocket size={14} sm:size={16} />
      <span className="uppercase tracking-widest">IKS Havacılık ve Uzay Dairesi</span>
    </div>
    <p>© 2240. Tüm Hakları Saklıdır. Proje Umut Yolu.</p>
  </footer>
);

/* --- APP MAIN --- */

export default function UmutYoluProjectApp() {
  return (
    <div className="bg-black min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <GrainOverlay />
      
      {/* Navbar: Fixed at top, overlays content */}
      <nav className="fixed top-0 w-full z-40 bg-black/50 backdrop-blur-sm border-b border-white/5 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-300">
        <div className="flex items-center gap-2 text-white font-bold">
          <Disc className="text-emerald-500 animate-spin-slow" size={14} />
          <span>IKS</span>
        </div>
        <div className="flex items-center gap-2">
          <Radio size={12} className="text-emerald-500 animate-pulse" />
          <span>CANLI YAYIN</span>
        </div>
      </nav>

      {/* Main content starts immediately, Hero section has padding to offset navbar */}
      <main>
        <Hero />
        <Timeline />
        <Vessel />
        <Destination />
        <Crew />
      </main>

      <Footer />
    </div>
  );
}