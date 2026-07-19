import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./components/Navigation";
import CaseStudyView from "./components/CaseStudyView";
import InteractiveBlueprint from "./components/InteractiveBlueprint";
import InteractiveVectorGrid from "./components/InteractiveVectorGrid";
import { PROJECTS } from "./data/projects";
import { Project } from "./types";
import {
  Terminal, Shield, Cpu, Code, Database, Mail, ExternalLink,
  Activity, ArrowUpRight, Sparkles, Compass, Layers, Zap,
  Play, Volume2, VolumeX, Eye, Laptop, ShieldCheck, ChevronRight,
  RefreshCw, MousePointer, Info, Maximize2, Type
} from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "blueprint" | "case-study">("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("booktodrive");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [liveFps, setLiveFps] = useState<number>(60);
  const [activeBentoTab, setActiveBentoTab] = useState<string>("systems");

  // Custom visual theme adjusters
  const [themeGlow, setThemeGlow] = useState<string>("#5B7FFF"); // Default slate-blue (BookToDrive theme)
  const [letterSpacing, setLetterSpacing] = useState<string>("tracking-tight");

  // Cursor Spotlight Position setter
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // Bento Product Logs State
  const [systemsLogs, setSystemsLogs] = useState<string[]>([
    "AUDIT: Mapping clinical user personas & journey maps...",
    "KPI: Patient triage speed boosted by 42% on CalmCamp",
    "UX_METRIC: Shrunk booking scheduling errors to 0.2% on BookToDrive",
  ]);

  // Procedural audio synthesizer for UI feedback
  const playBeep = (freq = 800, duration = 0.05, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignore browser autoplay blocks
    }
  };

  const handleSelectProject = (pId: string) => {
    playBeep(900, 0.08, "triangle");
    setSelectedProjectId(pId);
  };

  const handleOpenCaseStudy = (pId: string) => {
    playBeep(1100, 0.12, "sine");
    setSelectedProjectId(pId);
    setActiveView("case-study");
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  // Dynamically update the theme accent glow based on the active project
  useEffect(() => {
    setThemeGlow(selectedProject.accentHex);
  }, [selectedProjectId, selectedProject]);

  // Live FPS simulator
  useEffect(() => {
    const fpsInterval = setInterval(() => {
      setLiveFps(Math.floor(58.5 + Math.random() * 3.1));
    }, 1500);
    return () => clearInterval(fpsInterval);
  }, []);

  // Simulating real product metrics audits for Product bento box
  const simulateLivePacket = () => {
    playBeep(1200, 0.04, "sine");
    const kpis = [
      "RETENTION: Premium user daily active ratio rose by 18%",
      "ACCESSIBILITY: Contrast checks verified for WCAG 2.2 AA standards",
      "LOAD_TIME: First Contentful Paint optimized to 0.4s",
      "CONVERSION: Checkout funnel drop-off decreased by 14.2%",
      "USABILITY: Average task completion rate reached 98.4% globally"
    ];
    const kpi = kpis[Math.floor(Math.random() * kpis.length)];
    const time = new Date().toLocaleTimeString();
    const newLog = `[${time}] METRIC: ${kpi}`;
    setSystemsLogs(prev => [newLog, ...prev.slice(0, 4)]);
  };

  // Sound Dial-Up simulation for Museum
  const triggerMuseumDialupSound = () => {
    playBeep(350, 0.3, "sine");
    setTimeout(() => playBeep(440, 0.3, "sine"), 300);
    setTimeout(() => playBeep(697, 0.15, "sawtooth"), 600);
    setTimeout(() => playBeep(1477, 0.15, "sawtooth"), 750);
    setTimeout(() => playBeep(941, 0.15, "triangle"), 900);
  };

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-200 selection:bg-white/10 selection:text-white transition-all duration-700">
      {/* Dynamic ambient backdrop glowing spot */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] rounded-full blur-[200px] opacity-[0.06] pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundColor: themeGlow }}
      />

      {/* Visual noise overlay for high-end cinematic grain */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation
        onNavigateHome={() => {
          playBeep(700, 0.05);
          setActiveView("home");
        }}
        onNavigateBlueprint={() => {
          playBeep(850, 0.05);
          setActiveView("blueprint");
        }}
        activeSection={activeView}
      />

      {activeView === "home" && (
        <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 space-y-44 md:space-y-56 overflow-hidden">
          
          {/* =========================================================================
             HERO SECTION (PREMIUM EDITORIAL PRODUCT DESIGN SPREAD)
             ========================================================================= */}
          <section className="relative min-h-[520px] flex flex-col justify-center">
            
            {/* Elegant, subtle background mesh grid (fade out edges, no harsh borders) */}
            <div className="absolute inset-0 -mx-12 rounded-3xl overflow-hidden pointer-events-none z-0 opacity-40">
              <InteractiveVectorGrid accentColorHex={themeGlow} />
              <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-transparent to-[#060913]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-transparent to-[#060913]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
              {/* Left Column: Majestic Editorial Statement with premium typography */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-8 space-y-8"
              >
                <div className="inline-flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.05] px-4 py-2 rounded-full font-mono text-[9px] uppercase font-black tracking-widest text-slate-300 backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: themeGlow }} />
                  <span>AWARDS-CLASS PRODUCT PORTFOLIO</span>
                </div>

                <div className="space-y-5">
                  <h2 className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.25em] font-black opacity-80">
                    Ameer Hamza // Design Engineer & Product Architect
                  </h2>
                  <h1 className={`text-5xl sm:text-7xl md:text-8xl font-display font-black text-text-primary tracking-tight leading-[0.95] ${letterSpacing} transition-all duration-500`}>
                    Where complex SaaS becomes <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-400">pure clarity.</span>
                  </h1>
                </div>

                <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed font-light">
                  I design and prototype high-performance digital products, interactive dashboards, and scalable design systems. Bridging user research, interaction engineering, and production code to ship world-class software.
                </p>

                {/* Minimalist Control Switches */}
                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[9px] text-text-secondary">
                  <button
                    onClick={() => {
                      const next = letterSpacing === "tracking-tight" ? "tracking-widest" : "tracking-tight";
                      playBeep(950, 0.04);
                      setLetterSpacing(next);
                    }}
                    className="bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] px-3.5 py-2 rounded-full transition-premium flex items-center gap-1.5 hover:text-white"
                  >
                    <Type className="h-3 w-3 text-slate-400" />
                    <span>KERNING: {letterSpacing.toUpperCase()}</span>
                  </button>

                  <button
                    onClick={() => {
                      playBeep(800, 0.05);
                      setSoundEnabled(!soundEnabled);
                    }}
                    className="bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] px-3.5 py-2 rounded-full transition-premium flex items-center gap-1.5 hover:text-white"
                  >
                    {soundEnabled ? (
                      <>
                        <Volume2 className="h-3 w-3 text-emerald-400" />
                        <span>SOUNDS ON</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-3 w-3 text-rose-400" />
                        <span>MUTED</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href="#exhibits-sequence"
                    className="bg-text-primary text-bg-navy hover:bg-white hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full shadow-xl flex items-center gap-2"
                    onClick={() => playBeep(1000, 0.06)}
                  >
                    <span>Selected Case Studies</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveView("blueprint")}
                    className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full text-text-primary"
                  >
                    Design Systems Lab
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Beautiful Design Philosophy Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.2 }}
                onMouseMove={handleMouseMove}
                className="lg:col-span-4 glass-panel spotlight-card p-8 rounded-3xl relative overflow-hidden transition-all duration-500 hover:border-white/10"
                style={{
                  boxShadow: `0 30px 60px -15px rgba(0,0,0,0.85), 0 0 40px -10px ${themeGlow}10`
                }}
              >
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-emerald-400 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-300">Design Engineering Pillars</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs font-light text-slate-300 leading-relaxed">
                    <div className="flex gap-3">
                      <span className="font-mono text-[9px] text-text-secondary mt-0.5">01 //</span>
                      <p><strong className="text-text-primary font-medium">SaaS Complexity Simplification:</strong> Re-architecting legacy workflows into friction-free, single-screen dashboards.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono text-[9px] text-text-secondary mt-0.5">02 //</span>
                      <p><strong className="text-text-primary font-medium">60 FPS Interaction:</strong> Developing custom spring physics and fluid micro-transitions natively in React.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-mono text-[9px] text-text-secondary mt-0.5">03 //</span>
                      <p><strong className="text-text-primary font-medium">Production-Grade Tokens:</strong> Ensuring every pixel perfectly matches live UI frameworks and guidelines.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* =========================================================================
             PREMIUM CASE STUDY SEQUENCE (STAGGERED, VARIED, HIGH-CONTRAST SPREADS)
             ========================================================================= */}
          <section id="exhibits-sequence" className="space-y-36 md:space-y-48">
            
            {/* Section Header with generous negative space */}
            <div className="space-y-2 max-w-2xl relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-400 to-transparent" />
              <h2 className="font-mono text-[10px] text-text-secondary uppercase tracking-[0.25em] font-black">
                Featured Work // 2024 - 2026
              </h2>
              <h3 className="font-display text-2xl md:text-4xl font-black text-text-primary tracking-tight">
                Case Studies & Live Interactive Prototypes
              </h3>
              <p className="text-xs text-text-secondary font-light">
                Every project features its live, high-fidelity production sandbox alongside standard documentation.
              </p>
            </div>

            {/* STAGGERED LIST OF THE THREE MAJESTIC CASE STUDY CARDS */}
            <div className="space-y-32 md:space-y-48">

              {/* CARD 1: CALMCAMP (01) - HERO CLINICAL LAYOUT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Side: Product Details (Compact, High Contrast, Sterile clinical spacing) */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-emerald-400 font-bold tracking-wider">01 // CLINICAL PRECISION</span>
                      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/20 px-3 py-1 rounded-full">
                        {PROJECTS[0].category}
                      </span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl font-black text-text-primary tracking-tight leading-none">
                      {PROJECTS[0].title}
                    </h3>
                    
                    {/* Tag Classification Row */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                      <span>Enterprise</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Healthcare</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>SaaS</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Patient Navigation</span>
                    </div>
                    
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      ROLE: {PROJECTS[0].role} // {PROJECTS[0].year}
                    </p>

                    <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-light max-w-lg">
                      An intuitive, paperless SaaS for high-volume medical camps. Translates complex diagnostics into plain-language, eliminates physical clipboards, and guides anxious patients through clinics seamlessly.
                    </p>

                    {/* Highly Targeted Clinical Stats Metric Panel */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block border-b border-white/[0.04] pb-1.5 font-bold">
                        Core Clinical Outcomes:
                      </span>
                      <div className="grid grid-cols-2 gap-4">
                        {PROJECTS[0].stats.slice(0, 2).map(st => (
                          <div key={st.label} className="bg-emerald-500/[0.01] border border-emerald-500/10 p-4 rounded-xl hover:border-emerald-500/25 transition-all">
                            <span className="text-[7.5px] font-mono text-text-secondary block uppercase tracking-wider">{st.label}</span>
                            <strong className="text-[20px] font-mono font-black text-emerald-400 mt-1 block">{st.value}</strong>
                            <span className="text-[7.5px] font-mono text-slate-500 block mt-0.5">{st.change}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleOpenCaseStudy("calmcamp")}
                      className="bg-text-primary text-bg-navy hover:bg-white hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Inspect Case Study</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        playBeep(1000, 0.1, "sine");
                        setSelectedProjectId("calmcamp");
                        setActiveView("case-study");
                        setTimeout(() => {
                          const event = new CustomEvent("toggle-tab", { detail: "LIVE_DEMO" });
                          window.dispatchEvent(event);
                        }, 100);
                      }}
                      className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full text-text-primary flex items-center gap-2"
                    >
                      <Activity className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Enter Live Workspace</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Interactive Clinical Workspace (Large focus, fully interactive) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div 
                    onMouseMove={handleMouseMove}
                    className="glass-panel spotlight-card p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-emerald-500/10 min-h-[420px]"
                    style={{
                      boxShadow: `0 35px 70px -15px rgba(0,0,0,0.95), 0 0 50px -20px ${PROJECTS[0].accentHex}15`
                    }}
                  >
                    <CalmMiniLiveCockpit accentHex={PROJECTS[0].accentHex} playBeep={playBeep} />
                  </div>
                </div>
              </motion.div>


              {/* CARD 2: BOOKTODRIVE (02) - ASYMMETRIC ALTERNATING LAYOUT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Side: Interactive Operations Cockpit (Landscape, occupies more visual space) */}
                <div className="lg:col-span-7 lg:order-1 order-2 flex flex-col justify-center">
                  <div 
                    onMouseMove={handleMouseMove}
                    className="glass-panel spotlight-card p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-sky-500/10 min-h-[420px]"
                    style={{
                      boxShadow: `0 35px 70px -15px rgba(0,0,0,0.95), 0 0 50px -20px ${PROJECTS[1].accentHex}15`
                    }}
                  >
                    <BookToDriveMiniLiveCockpit accentHex={PROJECTS[1].accentHex} playBeep={playBeep} />
                  </div>
                </div>

                {/* Right Side: Product Details (Rugged, Automotive theme) */}
                <div className="lg:col-span-5 lg:order-2 order-1 flex flex-col justify-between py-2 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-sky-400 font-bold tracking-wider">02 // OPERATIONS ENGINE</span>
                      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest bg-sky-500/5 border border-sky-500/20 px-3 py-1 rounded-full">
                        {PROJECTS[1].category}
                      </span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl font-black text-text-primary tracking-tight leading-none">
                      {PROJECTS[1].title}
                    </h3>
                    
                    {/* Tag Classification Row */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] text-sky-400 font-bold uppercase tracking-wider">
                      <span>Enterprise</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Automotive</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>SaaS</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Workflow Automation</span>
                    </div>
                    
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      ROLE: {PROJECTS[1].role} // {PROJECTS[1].year}
                    </p>

                    <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-light max-w-lg">
                      An integrated CRM and logistics cockpit enabling high-volume dealerships to manage test-drive pipelines, trace real-time fleet asset telemetry, and automate secure key handoffs in under 30 seconds.
                    </p>

                    {/* DMS & GPS Workflow indicators to make the process understandable */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[8px] font-mono text-sky-400 uppercase tracking-widest block border-b border-white/[0.04] pb-1.5 font-bold">
                        Dealership Operations Workflow:
                      </span>
                      <div className="flex items-center gap-3 text-slate-400 text-[10px] font-mono">
                        <div className="flex-1 bg-white/[0.01] border border-white/[0.03] px-3 py-2.5 rounded-lg text-center">
                          <span className="text-sky-400 block text-[8px] font-bold">01 / DISPATCH</span>
                          <span className="text-[8px]">DMS Match</span>
                        </div>
                        <span className="text-slate-600">→</span>
                        <div className="flex-1 bg-white/[0.01] border border-white/[0.03] px-3 py-2.5 rounded-lg text-center">
                          <span className="text-sky-400 block text-[8px] font-bold">02 / UNLOCK</span>
                          <span className="text-[8px]">Key Secured</span>
                        </div>
                        <span className="text-slate-600">→</span>
                        <div className="flex-1 bg-white/[0.01] border border-white/[0.03] px-3 py-2.5 rounded-lg text-center">
                          <span className="text-sky-400 block text-[8px] font-bold">03 / TRACK</span>
                          <span className="text-[8px]">GPS Active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleOpenCaseStudy("booktodrive")}
                      className="bg-text-primary text-bg-navy hover:bg-white hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Inspect Case Study</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        playBeep(1000, 0.1, "sine");
                        setSelectedProjectId("booktodrive");
                        setActiveView("case-study");
                        setTimeout(() => {
                          const event = new CustomEvent("toggle-tab", { detail: "LIVE_DEMO" });
                          window.dispatchEvent(event);
                        }, 100);
                      }}
                      className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full text-text-primary flex items-center gap-2"
                    >
                      <Activity className="h-3.5 w-3.5" style={{ color: PROJECTS[1].accentHex }} />
                      <span>Enter Live Workspace</span>
                    </button>
                  </div>
                </div>
              </motion.div>


              {/* CARD 3: MUSEUM OF THE INTERNET (03) - EDITORIAL ART EXHIBITION */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Left Side: Product Details (Editorial spacing, serif typography styling, wide tracking) */}
                <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-purple-400 font-bold tracking-wider">03 // CULTURAL ARCHIVE</span>
                      <span className="font-mono text-[9px] text-text-secondary uppercase tracking-widest bg-purple-500/5 border border-purple-500/20 px-3 py-1 rounded-full">
                        {PROJECTS[2].category}
                      </span>
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl font-black text-text-primary tracking-tight leading-none">
                      {PROJECTS[2].title}
                    </h3>
                    
                    {/* Tag Classification Row */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] text-purple-400 font-bold uppercase tracking-wider">
                      <span>Editorial</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Storytelling</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Interactive Exhibition</span>
                      <span className="text-slate-600 font-normal">•</span>
                      <span>Digital Culture</span>
                    </div>
                    
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      ROLE: {PROJECTS[2].role} // {PROJECTS[2].year}
                    </p>

                    <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed font-light max-w-lg">
                      A highly immersive spatial archive cataloging the ephemeral history, early communication protocols, memes, and design movements of the web in a museum-grade virtual exhibition.
                    </p>

                    {/* Minimalist Exhibition Stats plate */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[8px] font-mono text-purple-400 uppercase tracking-[0.2em] block border-b border-white/[0.04] pb-1.5 font-bold">
                        Exhibition Curator Metrics:
                      </span>
                      <div className="grid grid-cols-2 gap-4 text-left">
                        <div>
                          <span className="text-[7.5px] font-mono text-slate-500 block uppercase tracking-wider">Monthly Visitors</span>
                          <strong className="text-[20px] font-sans font-light text-text-primary tracking-tight">320,000+</strong>
                        </div>
                        <div>
                          <span className="text-[7.5px] font-mono text-slate-500 block uppercase tracking-wider">Average Session</span>
                          <strong className="text-[20px] font-sans font-light text-text-primary tracking-tight">14.2 Min</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleOpenCaseStudy("museum")}
                      className="bg-text-primary text-bg-navy hover:bg-white hover:-translate-y-0.5 active:scale-95 transition-premium font-mono text-[10px] uppercase font-bold px-6 py-3.5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Explore Premium 10-Exhibit Journey</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Interactive Exhibition Catalogue Preview (Exhibition feeling, generous spacing) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <div 
                    onMouseMove={handleMouseMove}
                    className="glass-panel spotlight-card p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-purple-500/10 min-h-[420px]"
                    style={{
                      boxShadow: `0 35px 70px -15px rgba(0,0,0,0.95), 0 0 50px -20px ${PROJECTS[2].accentHex}15`
                    }}
                  >
                    <MuseumCataloguePreview
                      accentHex={PROJECTS[2].accentHex}
                      playBeep={playBeep}
                      onExplore={() => handleOpenCaseStudy("museum")}
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* =========================================================================
             INTERACTIVE CAPABILITY BENTO MATRIX (ASYMMETRIC, LUXURIOUS GRID SPREAD)
             ========================================================================= */}
          <section className="space-y-12">
            <div className="space-y-1.5 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5B7FFF] to-transparent" />
              <h2 className="font-mono text-[10px] text-text-secondary uppercase tracking-[0.25em] font-black">
                Interactive Capability Bento Matrix
              </h2>
              <p className="text-xs text-text-secondary font-light">
                Live interactive modules demonstrating product strategy, math-based micro-interactions, and color Customizers.
              </p>
            </div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              
              {/* Box 1: Product Strategy (2-Span Wide, Translucent Glass, High Contrast) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 80, damping: 15 }
                  }
                }}
                onMouseMove={handleMouseMove}
                className="md:col-span-2 glass-panel spotlight-card hover-elevate p-8 rounded-3xl flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden"
              >
                <div className="space-y-4 md:w-1/2 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Database className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-mono text-[8px] text-emerald-400 uppercase tracking-widest">
                        01 // PRODUCT STRATEGY
                      </span>
                    </div>
                    <h4 className="font-display font-black text-text-primary text-xl">Product Strategy & Architecture</h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-light">
                      Structuring intuitive user pathways, data-rich information hierarchies, and tight SaaS loops that align user needs with business KPIs. Run a design audit below.
                    </p>
                  </div>

                  <button
                    onClick={simulateLivePacket}
                    className="bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-emerald-500/20 active:scale-95 text-text-primary font-mono text-[9px] uppercase font-bold py-3 px-4 rounded-full transition-premium text-center flex items-center justify-center gap-1.5 w-fit mt-4"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "6s" }} />
                    <span>Audit Live Product KPIs</span>
                  </button>
                </div>

                {/* Simulated Audit Console */}
                <div className="md:w-1/2 flex flex-col bg-black/40 border border-white/[0.03] p-4 rounded-2xl font-mono text-[8.5px] text-emerald-400/90 overflow-y-auto space-y-1.5 select-none min-h-[160px] md:min-h-0">
                  <div className="flex items-center justify-between text-[7.5px] text-slate-500 border-b border-white/[0.04] pb-2 mb-2">
                    <span>PRODUCT COMPREHENSION MONITOR</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"/> RUNNING</span>
                  </div>
                  {systemsLogs.map((log, index) => (
                    <div key={index} className="truncate">
                      <span className="text-slate-500 mr-1.5">&gt;</span>
                      {log}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Box 2: Interaction Design (1-Span, Waveform Simulator) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 80, damping: 15 }
                  }
                }}
                onMouseMove={handleMouseMove}
                className="md:col-span-1 glass-panel spotlight-card hover-elevate p-8 rounded-3xl flex flex-col justify-between h-[360px] relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-7 w-7 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <Cpu className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-[8px] text-sky-400 uppercase tracking-widest">
                      02 // INTERACTION
                    </span>
                  </div>
                  <h4 className="font-display font-black text-text-primary text-xl">Interaction Sandbox</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    Fluid, math-driven transitions and gesture curves. Hover and slide across the box to deform the spring wave.
                  </p>
                </div>

                {/* Spline Wave Canvas Simulator container */}
                <div className="my-4 flex-1 bg-black/40 border border-white/[0.03] rounded-2xl relative overflow-hidden min-h-[120px]">
                  <SplineWaveSimulator accentHex={themeGlow} playBeep={playBeep} />
                </div>
              </motion.div>

              {/* Box 3: Design Systems (3-Span Full Width, Spacious Customizer) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: "spring", stiffness: 80, damping: 15 }
                  }
                }}
                onMouseMove={handleMouseMove}
                className="md:col-span-3 glass-panel spotlight-card hover-elevate p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden"
              >
                <div className="space-y-4 md:w-1/2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Code className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-[8px] text-purple-400 uppercase tracking-widest">
                      03 // DESIGN SYSTEMS
                    </span>
                  </div>
                  <h4 className="font-display font-black text-text-primary text-xl">Custom Design Systems Customizer</h4>
                  <p className="text-xs text-text-secondary leading-relaxed font-light">
                    Adjust the active theme spotlight and kerning to dynamically warp UI tokens across full-screen components instantly.
                  </p>
                </div>

                {/* Interactive customize controls */}
                <div className="md:w-1/2 w-full bg-black/30 border border-white/[0.03] p-6 rounded-2xl flex flex-col sm:flex-row gap-6 justify-between items-center">
                  
                  {/* Spotlights */}
                  <div className="space-y-2.5 w-full sm:w-1/2">
                    <label className="font-mono text-[8px] text-slate-400 uppercase tracking-wider block">SELECT COMPONENT ACCENT COLOR:</label>
                    <div className="flex gap-3">
                      {[
                        { hex: "#10B981", name: "Emerald" },
                        { hex: "#5B7FFF", name: "Electric Blue" },
                        { hex: "#5B2A86", name: "Retro Plum" },
                        { hex: "#F59E0B", name: "Amber Alert" },
                      ].map(sw => (
                        <button
                          key={sw.hex}
                          onClick={() => {
                            playBeep(900, 0.05, "sine");
                            setThemeGlow(sw.hex);
                          }}
                          className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center relative transition-transform hover:scale-110 active:scale-95"
                          style={{ backgroundColor: sw.hex }}
                          title={sw.name}
                        >
                          {themeGlow === sw.hex && (
                            <span className="h-2 w-2 rounded-full bg-white shadow-md animate-ping" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Kerning Slider */}
                  <div className="space-y-2.5 w-full sm:w-1/2">
                    <label className="font-mono text-[8px] text-slate-400 uppercase tracking-wider block">LETTER TRACKING KERNING:</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        defaultValue="1"
                        onChange={(e) => {
                          playBeep(850, 0.03);
                          const val = e.target.value;
                          if (val === "1") setLetterSpacing("tracking-tight");
                          else if (val === "2") setLetterSpacing("tracking-normal");
                          else setLetterSpacing("tracking-widest");
                        }}
                        className="w-full h-1 bg-white/[0.04] border border-white/[0.06] rounded-lg appearance-none cursor-pointer accent-white"
                      />
                    </div>
                    <span className="font-mono text-[7px] text-slate-500 block">ACTIVE CLASS: <strong className="text-slate-300 font-mono">{letterSpacing}</strong></span>
                  </div>

                </div>
              </motion.div>

            </motion.div>
          </section>

        </main>
      )}

      {activeView === "blueprint" && (
        <main className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-20 space-y-12 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
              Design Systems Lab
            </h1>
            <p className="text-xs md:text-sm text-text-secondary max-w-2xl">
              Exploring granular design tokens, color space matrices, layout variables, and custom typography frameworks styled for mission-critical digital products.
            </p>
          </div>

          <InteractiveBlueprint />
        </main>
      )}

      {activeView === "case-study" && (
        <CaseStudyView
          project={selectedProject}
          onBack={() => {
            playBeep(700, 0.06);
            setActiveView("home");
          }}
        />
      )}

      {/* Global Systems Footer */}
      <footer className="border-t border-white/[0.04] bg-[#060913]/40 backdrop-blur-xl py-14 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: themeGlow }} />
              <span className="font-mono text-[9px] text-text-secondary uppercase">Secure Tunnel Operational // {liveFps} FPS SECURE</span>
            </div>
            <h4 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider">AH // SYSTEMS INTERFACE LABS</h4>
            <p className="text-[10px] font-mono text-text-secondary">© 2026 // ALL CODES COMPILED AND VETTED SECURELY.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-[10px] font-mono text-text-secondary w-full md:w-auto">
            
            <a
              href="mailto:ameerhamzalodhi09@gmail.com"
              className="bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 active:scale-95 text-text-primary px-5 py-3 rounded-full flex items-center justify-center gap-2 transition-premium"
              onClick={() => playBeep(950, 0.05)}
            >
              <Mail className="h-3.5 w-3.5 text-emerald-400" />
              <span>Contact secure: ameerhamzalodhi09@gmail.com</span>
            </a>

            <div className="bg-[#111521]/50 px-5 py-3 rounded-full border border-white/[0.04] flex items-center justify-center gap-2 text-text-secondary">
              <Shield className="h-3.5 w-3.5 text-sky-400" />
              <span>SHA-256: 7f83ad...91e3</span>
            </div>

          </div>

        </div>
      </footer>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENTS: GORGEOUS MINI COCKPIT PLAYGROUND SIMULATORS
   ========================================================================= */

// 1. CalmCamp Mini Live Cockpit Component (Medical Camp SaaS & Patient Navigator)
function CalmMiniLiveCockpit({ accentHex, playBeep }: { accentHex: string; playBeep: (f?: number, d?: number, t?: OscillatorType) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStation, setActiveStation] = useState<number>(0);
  const [isTranslating, setIsTranslating] = useState<boolean>(true);

  const STATIONS = [
    {
      name: "Station 1: Qr Scan",
      jargon: "Token scanned. Demographics and baseline medical ID synced from secure digital vault.",
      plain: "Welcome to the camp! Your secure check-in QR code is scanned, and your basic details are successfully loaded.",
      x: 0.15,
      y: 0.65,
      paperwork: "0% Physical (QR Code Checked-in)"
    },
    {
      name: "Station 2: Registration",
      jargon: "Triage checklist complete. Mild essential hypertension with transient tachycardia. BP 138/88, HR 72bpm.",
      plain: "Registered! Your vitals check is complete. Heart rate is great, and blood pressure is slightly elevated but stable.",
      x: 0.38,
      y: 0.45,
      paperwork: "0% Physical (Synced to cloud EHR)"
    },
    {
      name: "Station 3: Journey",
      jargon: "Consultation complete. Dx: Viral rhinopharyngitis. Rx: Administer Acetaminophen 500mg tid pc for transient cephalalgia.",
      plain: "Doctor's consultation complete. Diagnosis: Common cold/sore throat. Prescription: Take 1 Paracetamol 3 times a day after meals.",
      x: 0.62,
      y: 0.75,
      paperwork: "0% Physical (Digital Prescription Active)"
    },
    {
      name: "Station 4: Discharge",
      jargon: "Dispensed 15 tab Acetaminophen. Digital exit clearance completed. Complete medication compliance patient education.",
      plain: "Discharge complete! Your medicine is collected (15 pain-relief tablets). Take with food as labeled. Safe travels!",
      x: 0.85,
      y: 0.5,
      paperwork: "0% Physical (Digital Receipt Cleared)"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const draw = () => {
      ctx.fillStyle = "#0B1020";
      ctx.fillRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const step = 15;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Camp Station Route (Smooth Bezier Curve Pathway)
      ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      
      const points = STATIONS.map(st => ({
        x: st.x * width,
        y: st.y * height
      }));

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Draw Camp Station Nodes
      STATIONS.forEach((st, idx) => {
        const px = st.x * width;
        const py = st.y * height;
        const isActive = activeStation === idx;

        // Draw pulsing halo for active station
        if (isActive) {
          ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, 12 + Math.sin(Date.now() * 0.008) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw outer node border
        ctx.strokeStyle = isActive ? accentHex : "rgba(255, 255, 255, 0.2)";
        ctx.fillStyle = isActive ? accentHex : "#171B26";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py, isActive ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node Title Text
        ctx.fillStyle = isActive ? "#FFFFFF" : "#94A3B8";
        ctx.font = "bold 8px font-mono, JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.fillText(st.name.split(": ")[1].toUpperCase(), px, py - 12);
      });

      // Draw flowing patient tracking token (glowing marker)
      const activePoint = points[activeStation];
      ctx.shadowColor = accentHex;
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(activePoint.x, activePoint.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [accentHex, activeStation]);

  const advancePatient = () => {
    playBeep(950, 0.06, "sine");
    setActiveStation(prev => (prev + 1) % STATIONS.length);
  };

  const toggleTranslation = () => {
    playBeep(1100, 0.04, "sine");
    setIsTranslating(prev => !prev);
  };

  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">PATIENT NAVIGATION Companion SaaS</span>
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Camp KPIs readout */}
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
        <div className="bg-bg-charcoal/40 p-2 border border-border-subtle rounded">
          <span className="text-slate-500 block text-[7.5px] uppercase">CAMP PAPERWORK</span>
          <strong className="text-[11px] block font-bold text-emerald-400">0% Physical Forms</strong>
        </div>
        <div className="bg-bg-charcoal/40 p-2 border border-border-subtle rounded">
          <span className="text-slate-500 block text-[7.5px] uppercase">ACTIVE STATION</span>
          <strong className="text-[11px] block font-bold text-sky-400 truncate">{STATIONS[activeStation].name.split(": ")[1]}</strong>
        </div>
        <div className="bg-bg-charcoal/40 p-2 border border-border-subtle rounded">
          <span className="text-slate-500 block text-[7.5px] uppercase">TRANSLATION INDEX</span>
          <strong className="text-[11px] block text-purple-400 font-bold truncate">Plain Lang Active</strong>
        </div>
      </div>

      {/* Dynamic Journey Steps Indicator */}
      <div className="text-center font-mono text-[8px] sm:text-[9.5px] text-slate-400 bg-black/40 border border-white/5 py-1.5 px-3 rounded flex items-center justify-center gap-1 sm:gap-2 font-semibold">
        <span className={activeStation === 0 ? "text-emerald-400 font-black" : "text-slate-400"}>Qr Scan</span>
        <span className="text-white/20">:-:</span>
        <span className={activeStation === 1 ? "text-emerald-400 font-black" : "text-slate-400"}>Registration</span>
        <span className="text-white/20">:-:</span>
        <span className={activeStation === 2 ? "text-emerald-400 font-black" : "text-slate-400"}>Journey</span>
        <span className="text-white/20">:-:</span>
        <span className={activeStation === 3 ? "text-emerald-400 font-black" : "text-slate-400"}>Discharge</span>
      </div>

      {/* Camp station route 2D Map */}
      <div className="relative border border-border-subtle rounded h-24 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute top-2 left-2 font-mono text-[7px] text-white/30 tracking-wider">
          CAMP_LAYOUT_FLOW_MAP: // {STATIONS[activeStation].paperwork}
        </div>
      </div>

      {/* Plain Language Translation Panel */}
      <div className="bg-bg-charcoal/50 border border-border-subtle p-2.5 rounded font-mono text-[9px] space-y-1.5 min-h-[58px]">
        {isTranslating ? (
          <div>
            <span className="text-[7px] text-emerald-400 block uppercase tracking-widest font-bold">PATIENT VIEW (PLAIN ENGLISH TRANSLATION):</span>
            <p className="text-slate-200 leading-relaxed text-[10px] mt-0.5">"{STATIONS[activeStation].plain}"</p>
          </div>
        ) : (
          <div>
            <span className="text-[7px] text-red-400 block uppercase tracking-widest font-bold">PHYSICIAN CLERICAL RECORD (COMPLEX JARGON):</span>
            <p className="text-slate-400 leading-relaxed text-[10px] mt-0.5">"{STATIONS[activeStation].jargon}"</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={advancePatient}
          className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-border-subtle hover:border-white/15 px-3 py-1.5 rounded transition-all font-mono text-[8px] uppercase tracking-widest font-black text-center"
        >
          Route Patient To Next Tent
        </button>
        <button
          onClick={toggleTranslation}
          className={`px-3 py-1.5 rounded border font-mono text-[8px] uppercase tracking-widest transition-all ${
            isTranslating
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-white/5 border-border-subtle text-slate-400 hover:text-white"
          }`}
        >
          {isTranslating ? "Show Technical" : "Translate To Plain"}
        </button>
      </div>
    </div>
  );
}
// 2. BookToDrive Mini Live Cockpit Component (High-fidelity Product Showcase)
function BookToDriveMiniLiveCockpit({ accentHex, playBeep }: { accentHex: string; playBeep: (f?: number, d?: number, t?: OscillatorType) => void }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "showroom" | "finance" | "testdrive">("dashboard");

  const TABS = [
    { id: "dashboard" as const, label: "Operations Dashboard", path: "/Dashboard_page.png", url: "booktodrive.io/ops-dashboard" },
    { id: "showroom" as const, label: "Showroom Traffic", path: "/Showroom_traffic.png", url: "booktodrive.io/showroom-vitals" },
    { id: "finance" as const, label: "Finance Engine", path: "/Finance_calculator.png", url: "booktodrive.io/deal-calculator" },
    { id: "testdrive" as const, label: "Test Drive Scheduler", path: "/Test_drive.png", url: "booktodrive.io/schedule-testdrive" },
  ];

  const handleTabClick = (tabId: "dashboard" | "showroom" | "finance" | "testdrive") => {
    setActiveTab(tabId);
    playBeep(950, 0.05, "sine");
  };

  const activeTabObj = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      {/* Mini Title/Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Interactive SaaS Live Preview</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-[8px] text-sky-400 uppercase tracking-widest font-bold">PROTOTYPE ONLINE</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1">
        {/* Left Column: Subtle spec-sheet metadata panel (4 Columns) */}
        <div className="md:col-span-4 flex flex-col justify-between bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4 space-y-4">
          <div className="space-y-3">
            <span className="text-[8px] font-mono text-sky-400 uppercase tracking-wider block font-bold border-b border-white/5 pb-1">
              Project Snapshot
            </span>
            <ul className="space-y-2.5">
              {[
                { label: "Market", value: "Enterprise Automotive SaaS" },
                { label: "Core Scope", value: "CRM + Fleet Management" },
                { label: "Engine", value: "Test Drive Scheduling" },
                { label: "Fintech", value: "Finance Workflow" },
                { label: "Automation", value: "Document Automation" },
                { label: "Capacity", value: "9 Connected Modules" },
                { label: "Workflow", value: "7-Step Customer Journey" },
              ].map((item, idx) => (
                <li key={idx} className="flex flex-col space-y-0.5">
                  <span className="font-mono text-[7px] text-slate-500 uppercase tracking-wider">{item.label}</span>
                  <span className="font-sans text-[10px] text-text-primary font-medium tracking-tight flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-sky-500/60" />
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-white/5">
            <span className="font-mono text-[6.5px] text-slate-500 block leading-normal uppercase">
              * Click tabs to inspect live high-fidelity interface layouts
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Browser Preview showcasing actual high-fidelity screens (8 Columns) */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-3">
          {/* Browser Chrome Shell */}
          <div className="relative bg-[#070913] border border-white/[0.08] rounded-2xl overflow-hidden flex-1 flex flex-col shadow-lg transition-all duration-300 hover:border-sky-500/20">
            {/* Browser Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#0a0d18] border-b border-white/[0.04]">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/30" />
                <span className="w-2 h-2 rounded-full bg-amber-500/30" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/30" />
              </div>
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest bg-white/[0.02] px-3 py-0.5 rounded border border-white/5">
                {activeTabObj.url}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            </div>

            {/* Screen Content Frame */}
            <div className="relative flex-1 aspect-[16/10] sm:aspect-auto sm:min-h-[170px] bg-[#020306] overflow-hidden group">
              <img
                src={activeTabObj.path}
                alt={activeTabObj.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded border border-white/5 font-mono text-[6.5px] text-sky-400 tracking-wider uppercase font-bold">
                {activeTabObj.label} // HIGH-FIDELITY SCREEN
              </div>
            </div>
          </div>

          {/* Interactive Navigation tab list inside card */}
          <div className="flex flex-wrap gap-1.5">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 min-w-[75px] font-mono text-[7px] sm:text-[7.5px] uppercase py-2 px-1 rounded transition-all text-center border font-bold ${
                  activeTab === tab.id
                    ? "bg-sky-500/10 border-sky-500/30 text-sky-400 shadow-md shadow-sky-500/5"
                    : "bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {tab.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Museum of the Internet Editorial Catalogue Preview Component
function MuseumCataloguePreview({
  accentHex,
  playBeep,
  onExplore
}: {
  accentHex: string;
  playBeep: (f?: number, d?: number, t?: OscillatorType) => void;
  onExplore: () => void;
}) {
  const rooms = [
    { num: "01", name: "Arrival Portal" },
    { num: "02", name: "Grand Entrance Lobby" },
    { num: "03", name: "Museum Directory" },
    { num: "04", name: "Gallery Hall" },
    { num: "05", name: "Artifact Chamber" },
    { num: "06", name: "First Tweet" },
    { num: "07", name: "Nyan Cat" },
    { num: "08", name: "Rickroll Story" },
    { num: "09", name: "Connection Chamber" },
    { num: "10", name: "Final Exploration Room" },
  ];

  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      {/* Editorial Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">EXHIBITION CATALOGUE PREVIEW</span>
        <span className="font-mono text-[8px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded uppercase font-bold tracking-wider animate-pulse">
          Curated Exhibition
        </span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1">
        {/* Left Column: Exhibition Rooms Catalogue List (5 Columns) */}
        <div className="md:col-span-5 flex flex-col justify-between bg-white/[0.01] border border-white/[0.04] rounded-2xl p-4 space-y-3">
          <div className="space-y-2">
            <span className="text-[8px] font-mono text-purple-400 uppercase tracking-widest block font-bold border-b border-white/5 pb-1">
              10 Interactive Exhibition Rooms
            </span>
            <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
              {rooms.map((rm) => (
                <div key={rm.num} className="flex items-center justify-between border-b border-white/[0.03] py-1 font-mono text-[8px]">
                  <span className="text-slate-500 font-bold">{rm.num}</span>
                  <span className="text-text-primary font-medium tracking-tight text-right">{rm.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 border-t border-white/5">
            <p className="font-sans text-[7.5px] italic text-slate-500 leading-normal">
              A chronological digital chronicle of net folklore, memes, and ephemeral design movements.
            </p>
          </div>
        </div>

        {/* Right Column: High-fidelity Gallery Artwork Frame (7 Columns) */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#030406]/50 border border-white/[0.03] rounded-2xl p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent pointer-events-none" />
          
          <div className="relative p-1.5 bg-[#030407] border border-white/10 rounded-xl shadow-2xl transition-all duration-500 hover:border-purple-400/30">
            {/* Fine structural corners */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-purple-500/40" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-purple-500/40" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-purple-500/40" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-purple-500/40" />

            {/* Frame inner content with active visual highlight */}
            <div className="relative aspect-[4/3] bg-[#020306] rounded-lg overflow-hidden ring-2 ring-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
              <img
                src="/input_file_4.png"
                alt="Museum of the Internet Grand Arrival Portal"
                className="w-full h-full object-cover transition-transform duration-700 scale-[1.01] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Highlight Overlay Focus Badge */}
              <div className="absolute top-3 left-3 bg-purple-600/95 backdrop-blur-md text-white font-mono text-[8px] px-2.5 py-1 rounded-md shadow-lg font-bold tracking-wider animate-pulse flex items-center gap-1.5 border border-purple-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                ACTIVE FOCUS TARGET
              </div>

              <div className="absolute inset-0 bg-scanlines opacity-[0.02] pointer-events-none" />
            </div>
          </div>

          {/* Classic Gallery Plaque Plate underneath */}
          <div className="text-center mt-3 select-none">
            <h5 className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-white font-semibold">
              PLATE 01: THE ARRIVAL PORTAL
            </h5>
            <p className="font-sans text-[7px] italic text-slate-500 mt-0.5">
              High-fidelity virtual archive projection, chronologically curated.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => {
          playBeep(1100, 0.08, "sine");
          onExplore();
        }}
        className="w-full bg-white/5 hover:bg-purple-500/10 text-white border border-white/10 hover:border-purple-400/20 px-3 py-2 rounded transition-all font-mono text-[8px] uppercase tracking-widest font-bold text-center cursor-pointer shadow-lg"
      >
        Explore the Premium 10-Exhibit Journey
      </button>
    </div>
  );
}

// Draggable Math Spline wave simulator component for Interaction Bento Box
function SplineWaveSimulator({ accentHex, playBeep }: { accentHex: string; playBeep: (f?: number, d?: number, t?: OscillatorType) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [waveType, setWaveType] = useState<"sine" | "damped">("sine");
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let phase = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.fillStyle = "#0B1020";
      ctx.fillRect(0, 0, width, height);

      // Grid coordinate axis
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Render math wave
      ctx.strokeStyle = accentHex;
      ctx.lineWidth = 2;
      ctx.beginPath();

      phase += 0.05;
      const mouse = mouseRef.current;

      for (let x = 0; x < width; x++) {
        let y = height / 2;

        // Base wave frequency calculation
        const angle = (x / width) * Math.PI * 4 + phase;
        let amplitude = 20;

        // Deform wave if mouse is active (interactive physics!)
        if (mouse.x !== -1000) {
          const dx = Math.abs(x - mouse.x);
          if (dx < 100) {
            // Apply Gaussian push towards mouse position y coord
            const factor = (1 - dx / 100);
            amplitude += (mouse.y - height / 2) * factor * 0.8;
          }
        }

        if (waveType === "sine") {
          y += Math.sin(angle) * amplitude;
        } else {
          // Damped harmonics wave formula
          const dampFactor = Math.exp(-x / 150);
          y += Math.sin(angle) * amplitude * dampFactor;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Mouse interactive spot highlight
      if (mouse.x !== -1000) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = accentHex + "44";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [accentHex, waveType]);

  const toggleWaveType = () => {
    playBeep(700, 0.05, "sine");
    setWaveType(prev => (prev === "sine" ? "damped" : "sine"));
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <button
        onClick={toggleWaveType}
        className="absolute bottom-2 right-2 bg-bg-navy/90 hover:bg-hover-subtle border border-border-subtle hover:border-white/25 text-white font-mono text-[7px] uppercase font-bold py-1 px-2 rounded transition-all select-none"
      >
        WAVEFORM: {waveType.toUpperCase()}
      </button>
    </div>
  );
}
