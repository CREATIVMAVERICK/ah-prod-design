import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft, Info, Calendar, ShieldAlert, Zap, TrendingUp, HelpCircle,
  LayoutGrid, CheckCircle, Smartphone, Monitor, Database, Terminal, Shield,
  Layers, Copy, Check, Eye, Play, Sparkles, Users, ArrowUpRight,
  Clock, Heart, ShieldCheck, Filter, FileText, ArrowRight, Video, Download, Car, Gauge, Pause, Volume2, VolumeX, Maximize,
  Sliders, Key, Cpu, Award, RefreshCw, AlertCircle, Sparkle, Settings, Fuel, MapPin
} from "lucide-react";

interface BookToDriveCaseStudyProps {
  onBack: () => void;
}

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

function SafeImage({ src, alt, className = "" }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-6 px-4 text-center border border-dashed border-slate-blue/20 bg-slate-blue/5 rounded p-4 relative z-10 w-full min-h-[220px]">
        <div className="h-8 w-8 rounded-full bg-slate-blue/10 border border-slate-blue/20 flex items-center justify-center text-slate-blue mb-2">
          <Car className="h-4 w-4" />
        </div>
        <p className="text-[10px] font-mono text-slate-blue font-bold uppercase tracking-wider">
          Screenshot Placeholder
        </p>
        <p className="text-[9px] font-mono text-text-secondary mt-1 max-w-md break-all leading-relaxed">
          File path: <span className="text-text-primary font-bold">{src}</span> is ready for your real screenshot.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full min-h-[60px] bg-black/10 flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-charcoal/20 backdrop-blur-sm py-8 z-20">
          <div className="flex items-center gap-2 font-mono text-[8px] text-text-secondary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-blue animate-pulse" />
            <span>Loading interface view...</span>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

const ALL_SCREENS = [
  {
    id: "crm-cockpit",
    path: "/Dashboard_page.png",
    title: "01 // Central Sales CRM Cockpit",
    desc: "The primary dealer control room, coupling client profiles directly with test-drive logistics and lead scoring algorithms."
  },
  {
    id: "fleet-telematics",
    path: "/Powered_by_Ai.png",
    title: "02 // Real-Time AI Telematics",
    desc: "A high-frequency tracking panel displaying real-time vehicle metrics, charge percentages, GPS telemetry, and lot locations."
  },
  {
    id: "enquiry-manager",
    path: "/Leads_management.png",
    title: "03 // Predictive Lead Management",
    desc: "Sorts incoming vehicle inquiries and prioritizes active, high-intent buyers using automated interaction loggers."
  },
  {
    id: "scheduler",
    path: "/Test_drive.png",
    title: "04 // Smart Test Drive Scheduler",
    desc: "A calendar system that prevents overlap by cross-checking active sales representatives with vehicle key availability."
  },
  {
    id: "finance-underwriting",
    path: "/Finance_calculator.png",
    title: "05 // Finance Approval & Underwriting Portal",
    desc: "Connects dealership deals with integrated lenders to calculate monthly loan quotas and clear background checks in seconds."
  },
  {
    id: "pipeline-kanban",
    path: "/Sales_pipeline.png",
    title: "06 // Dealership Sales Pipeline",
    desc: "A custom kanban tracker outlining clear milestone phases from initially discovered vehicle leads to physical keys handed over."
  },
  {
    id: "doc-management",
    path: "/Service_record.png",
    title: "07 // Service Record Hub",
    desc: "A secure signing workspace generating custom test-drive liability waivers and sales agreements with automated driver's license parsing."
  },
  {
    id: "delivery-console",
    path: "/Showroom_traffic.png",
    title: "08 // Showroom Traffic System",
    desc: "Coordinates final detailed cleaning logs, battery recharging checklists, and customer hand-off times to guarantee a pristine client experience."
  }
];

export default function BookToDriveCaseStudy({ onBack }: BookToDriveCaseStudyProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>("/BTD_video.mp4");
  
  // Interactive Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto-play the video on source change or mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, [videoSrc]);
  
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    showToast(`HEX COPIED: ${text}`);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Video Drag-and-Drop and Manual Upload Handlers
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsVideoPlaying(false);
      showToast(`VIDEO LOADED: ${file.name}`);
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setIsVideoPlaying(false);
      showToast(`VIDEO DROPPED: ${file.name}`);
      if (videoRef.current) {
        videoRef.current.load();
      }
    } else if (file) {
      showToast("INVALID FILE: PLEASE DROP A VALID MP4 VIDEO FILE");
    }
  };

  // Stagger variants for elegant animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-bg-navy pb-32 text-slate-200 selection:bg-slate-blue/30 selection:text-white relative overflow-hidden">
      
      {/* Toast Alert Banner */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-bg-charcoal border border-border-subtle shadow-2xl p-3.5 rounded font-mono text-[9.5px] uppercase flex items-center gap-2 animate-fadeIn max-w-sm">
          <span className="h-2 w-2 rounded-full animate-ping bg-[#FF3B30]" />
          <span className="text-text-primary font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Dynamic Background Grid and Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[850px] rounded-full blur-[240px] opacity-[0.06] pointer-events-none bg-[#FF3B30] z-0" />
      <div className="absolute top-[1800px] right-10 w-[700px] h-[700px] rounded-full blur-[240px] opacity-[0.04] pointer-events-none bg-emerald-500 z-0" />
      <div className="absolute bottom-[1200px] left-10 w-[800px] h-[800px] rounded-full blur-[260px] opacity-[0.04] pointer-events-none bg-slate-blue z-0" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 space-y-36 relative z-10">

        {/* Back navigation & breadcrumb */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-mono text-[10px] uppercase tracking-widest border border-border-subtle bg-bg-charcoal/40 px-3.5 py-2 rounded"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform text-slate-400" /> 
            <span>Return to Portfolio</span>
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase">
            <span>DEALER ENGINE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
            <span className="font-bold text-text-primary">CASE STUDY // BOOKTODRIVE</span>
          </div>
        </div>

        {/* =========================================================================
           01 — PROJECT OVERVIEW
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <motion.div variants={elementVariants} className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded font-mono text-[9px] uppercase tracking-widest font-bold bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30]">
              <Award className="h-3.5 w-3.5" />
              <span>SELECTED WORKS // PRODUCT DESIGN</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-display font-black text-text-primary tracking-tighter leading-[0.85] uppercase">
              BookToDrive
            </h1>
            
            <h3 className="font-display font-bold text-xl md:text-2xl text-slate-300 tracking-tight leading-tight uppercase">
              UNIFYING AUTOMOTIVE FLEET LOGISTICS WITH HIGH-SPEED TRANSACTIONS.
            </h3>
            
            <p className="text-sm md:text-base text-text-secondary leading-relaxed font-sans max-w-2xl font-light">
              Dealership consultants operate in high-stress, fast-paced showrooms where speed is everything. We engineered BookToDrive as a high-throughput, latency-free iPad and desktop cockpit to unify live GPS lot coordinates, lender credit checks, and paperless liability waivers into a single, seamless interaction point.
            </p>
          </motion.div>

          <motion.div variants={elementVariants} className="lg:col-span-4 bg-bg-charcoal/20 border border-border-subtle p-6 rounded-2xl space-y-6">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400 border-b border-white/5 pb-2 font-black">
              METADATA SCHEMA
            </span>
            
            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="block text-slate-500 text-[8.5px] uppercase">My Role</span>
                <strong className="block text-text-primary mt-1 text-[11px] font-bold">Lead Product Designer & Interaction Engineer</strong>
              </div>
              
              <div>
                <span className="block text-slate-500 text-[8.5px] uppercase">Timeline</span>
                <strong className="block text-text-primary mt-1 text-[11px] font-bold">4 Months // Production Shipped</strong>
              </div>
              
              <div>
                <span className="block text-slate-500 text-[8.5px] uppercase">Target Platform</span>
                <strong className="block text-text-primary mt-1 text-[11px] font-bold">iPad OS, Desktop CRM Engine</strong>
              </div>

              <div>
                <span className="block text-slate-500 text-[8.5px] uppercase">Design Stack</span>
                <strong className="block text-text-primary mt-1 text-[11px] font-bold text-[#FF3B30]">React, TypeScript, Tailwind, Figma</strong>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* =========================================================================
           02 — HERO PRODUCT PREVIEW (LARGE HIGH-QUALITY SCREENSHOT FIRST)
           ========================================================================= */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="relative border border-border-subtle bg-bg-charcoal/20 rounded-2xl overflow-hidden p-2 md:p-3 shadow-2xl">
            <div className="absolute inset-0 opacity-[0.06] grid-lines pointer-events-none" />
            
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 px-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/40" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/40" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/40" />
                </div>
                <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wide">PRIMARY_SALES_COCKPIT_Live.PNG</span>
              </div>
              <span className="font-mono text-[9px] text-slate-500 font-bold">1920 X 1080 PX</span>
            </div>

            {/* Main Hero Image */}
            <div className="bg-[#060913]/90 rounded-lg overflow-hidden mt-2 relative aspect-[1.6/1]">
              <SafeImage 
                src="/Home_page.png" 
                alt="BookToDrive Main Dashboard Cockpit View" 
                className="w-full h-full object-cover rounded shadow-md border border-white/5"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-[9px] font-mono text-text-secondary px-2">
            <span className="font-bold text-[#FF3B30]">FIGURE 1.0 // UNIFIED DIGITAL SHOWROOM COMMAND CENTER</span>
            <span>STATUS: VERIFIED PRODUCTION RENDER</span>
          </div>
        </motion.section>

        {/* =========================================================================
           03 — THE PROBLEM (IMAGE LEFT, TEXT RIGHT)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-border-subtle pt-20"
        >
          {/* Left Column: Real screenshot representing showroom complexity */}
          <motion.div variants={elementVariants} className="lg:col-span-6">
            <div className="border border-border-subtle bg-bg-charcoal/20 p-2 rounded-2xl shadow-xl">
              <div className="aspect-[2/1] rounded-xl overflow-hidden bg-black/40">
                <SafeImage 
                  src="/The_problem.png" 
                  alt="Showroom Traffic Complexity Screen" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-3 text-[9px] font-mono text-text-secondary text-left pl-2">
              <span>FIGURE 2.1 // TRACING HIGH-VOLUME WALK-IN CONFLICTS</span>
            </div>
          </motion.div>

          {/* Right Column: Concise Problem explanation */}
          <motion.div variants={elementVariants} className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">02 // THE PROBLEM</span>
              <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight leading-tight">
                Notebooks, Social Leaks, & Key-Cabinet Bottlenecks
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              Despite processing hundreds of high-value vehicle consultations, dealership managers have historically relied on disjointed spreadsheets, personal WhatsApp groups, and physical clipboards to run their operations.
            </p>

            <div className="space-y-4">
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider flex items-center gap-2 mb-1">
                  <ShieldAlert className="h-4 w-4 text-[#FF3B30]" />
                  Leakage of Social Leads
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Inquiries streaming in from WhatsApp, Facebook, or phone calls are siloed on reps' personal screens, leading to slow response times and zero executive accountability.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-[#FF3B30]" />
                  Key Retrieval Bottlenecks
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Reps walk excited customers out to test drive, only to waste up to 20 minutes searching for the car's key fob, checking if another rep booked it, or finding the battery sits dead on the far lot.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* =========================================================================
           04 — THE SOLUTION (IMAGE RIGHT, TEXT LEFT)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-border-subtle pt-20"
        >
          {/* Left Column: Solution description */}
          <motion.div variants={elementVariants} className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">03 // THE SOLUTION</span>
              <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight leading-tight">
                A Single Unified Transaction Console
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              BookToDrive solves these friction points by marrying physical asset tracking with full-stack customer relationship management, bringing physical keys and credit profiles onto the same digital board.
            </p>

            <div className="space-y-4">
              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider flex items-center gap-2 mb-1">
                  <Database className="h-4 w-4 text-[#FF3B30]" />
                  Telemetry Integration
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Real-time OBD-II vehicle logs are synced to the sales pipeline, instantly displaying fuel levels, precise parking slot numbers, and battery status of each model.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.01] p-4 rounded-xl">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider flex items-center gap-2 mb-1">
                  <ShieldCheck className="h-4 w-4 text-[#FF3B30]" />
                  Frictionless Paperwork
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  Salespeople scan driver's licenses with an iPad camera to auto-parse details, instantly populating legal liability waivers and dispatching key container release signals.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High Quality Product Screen */}
          <motion.div variants={elementVariants} className="lg:col-span-6 order-1 lg:order-2">
            <div className="border border-border-subtle bg-bg-charcoal/20 p-2 rounded-2xl shadow-xl">
              <div className="aspect-[2/1] rounded-xl overflow-hidden bg-black/40">
                <SafeImage 
                  src="/Business_dashboard.png" 
                  alt="Telemetry Integration and AI Solutions Screen" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-3 text-[9px] font-mono text-text-secondary text-right pr-2">
              <span>FIGURE 3.1 // DYNAMIC TELEMETRY SYNCHRONIZER</span>
            </div>
          </motion.div>
        </motion.section>

        {/* =========================================================================
           05 — DESIGN PROCESS (CENTERED SHOWCASE)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="border-t border-border-subtle pt-20 space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">04 // DESIGN PROCESS</span>
            <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
              A Human-Centered Engineering Cycle
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              We designed and iteratively audited the platform based on direct showroom observations, refining heavy enterprise data into rapid, sunlight-legible tactile targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Field Research",
                desc: "We shadowed sales reps on physical showroom floors to map key-cabinet bottlenecks and document data loss during walk-ins."
              },
              {
                num: "02",
                title: "Wireframing",
                desc: "Translated chaotic physical checklists into streamlined, screen-dense CRM wireframes optimized for fast handheld taps."
              },
              {
                num: "03",
                title: "Tactile Auditing",
                desc: "Tested visual button hitboxes and contrast variables directly on iPad screens under extreme outdoor dealership glare."
              },
              {
                num: "04",
                title: "React Delivery",
                desc: "Synthesized the layouts into responsive React modules with low latency, optimistic UI states, and robust local caching."
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                variants={elementVariants}
                className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded-xl space-y-4 hover:border-[#FF3B30]/30 transition-all duration-300"
              >
                <span className="font-mono text-2xl font-black text-[#FF3B30]/30 block">{step.num}</span>
                <h4 className="font-display font-bold text-text-primary text-sm uppercase tracking-wider">{step.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-sans font-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={elementVariants} className="border border-border-subtle bg-bg-charcoal/20 p-2 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="aspect-[1.8/1] rounded-xl overflow-hidden bg-black/40">
              <SafeImage 
                src="/design_system.png" 
                alt="Designing the Sales Pipeline Interface" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* =========================================================================
           06 — KEY FEATURES (BENTO GRID DESIGN)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
          className="border-t border-border-subtle pt-20 space-y-12"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">05 // CORE FEATURES</span>
            <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
              Highly Scalable Automotive Modules
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              Designed as connected system tiles, each module solves a targeted dealer friction point while maintaining a cohesive layout rhythm.
            </p>
          </div>

          {/* Elegant Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div variants={elementVariants} className="md:col-span-2 border border-border-subtle bg-bg-charcoal/15 p-6 rounded-2xl flex flex-col justify-between space-y-8 hover:border-white/10 transition-colors">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30]">
                  <Car className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-base uppercase tracking-wider">Personal AI Concierge</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-md">
                  Our AI Concierge acts as the intelligent heartbeat of the showroom, seamlessly linking real-time vehicle telemetry with lead management. It autonomously monitors inventory health and suggests the best-fit models for every enquiry, allowing consultants to focus entirely on closing deals rather than manual status checks.
                </p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-lg overflow-hidden p-1.5 h-32 md:h-44">
                <SafeImage src="/Powered_by_Ai.png" alt="Diagnostics telemetry feed screen" className="w-full h-full object-cover rounded animate-pulse" />
              </div>
            </motion.div>

            <motion.div variants={elementVariants} className="border border-border-subtle bg-bg-charcoal/15 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-white/10 transition-colors">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30]">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-base uppercase tracking-wider">Lender API calculator</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Fetches real-time bureau credit details and calculated APR quotas instantly, locking deal approvals in-showroom.
                </p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-lg overflow-hidden p-1">
                <SafeImage src="/Finance_calculator.png" alt="Dynamic finance quota panel" className="w-full h-full object-cover rounded animate-pulse" />
              </div>
            </motion.div>

            <motion.div variants={elementVariants} className="border border-border-subtle bg-bg-charcoal/15 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-white/10 transition-colors">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30]">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-base uppercase tracking-wider">Unified Maintenance Ledger</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  AInstantly digitizes physical mechanic invoices and inspection sheets, converting analog maintenance history into a structured, searchable digital ledger in seconds.
                </p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-lg overflow-hidden p-1">
                <SafeImage src="/Service_record.png" alt="Document OCR parser dashboard" className="w-full h-full object-cover rounded animate-pulse" />
              </div>
            </motion.div>

            <motion.div variants={elementVariants} className="md:col-span-2 border border-border-subtle bg-bg-charcoal/15 p-6 rounded-2xl flex flex-col justify-between space-y-8 hover:border-white/10 transition-colors">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-center justify-center text-[#FF3B30]">
                  <Calendar className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-base uppercase tracking-wider">Smart Test Drive Scheduler</h3>
                <p className="text-xs text-text-secondary leading-relaxed max-w-md">
                  A high-occupancy calendar interface tracking staff shift variables, vehicle usage profiles, and key lock allocations to prevent double-bookings.
                </p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-lg overflow-hidden p-1.5 h-32 md:h-44">
                <SafeImage src="/Test_drive.png" alt="Scheduler timeline calendar interface" className="w-full h-full object-contain rounded animate-pulse" />
              </div>
            </motion.div>

          </div>
        </motion.section>

        {/* =========================================================================
           07 — USER JOURNEY (ALTERNATING VISUAL CARDS)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={containerVariants}
          className="border-t border-border-subtle pt-20 space-y-12"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">06 // USER JOURNEY MAP</span>
            <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
              A Zero-Friction Showroom Journey
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              We mapped the step-by-step physical transaction flow of the buyer, ensuring that software telemetry always supports rather than disrupts the human connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01 // DISCOVER", title: "Select Inventory", desc: "Prospect browses active real-time lot models either on a tablet or mobile showroom kiosk." },
              { step: "02 // RESERVE", title: "Smart Scheduling", desc: "Consultant checks calendar grids, automatically reserving keys and physical plates." },
              { step: "03 // AUDIT", title: "License License OCR", desc: "ID is scanned to run Equifax verification while auto-signing a test drive safety waiver." },
              { step: "04 // DISPATCH", title: "Telemetry Check", desc: "Key cabinet safely unlocks, streaming mechanical battery status right onto the console." },
              { step: "05 // HANDOVER", title: "Pristine Delivery", desc: "The vehicle detailed list clears, completing physical keys hand-off with clean audit logs." }
            ].map((j, idx) => (
              <motion.div 
                key={idx}
                variants={elementVariants}
                className="bg-bg-charcoal/20 border border-border-subtle p-5 rounded-xl flex flex-col justify-between min-h-[170px] hover:border-[#FF3B30]/20 transition-all duration-300"
              >
                <div>
                  <span className="block font-mono text-[8px] font-bold text-[#FF3B30] tracking-widest mb-2">{j.step}</span>
                  <h4 className="font-display font-bold text-text-primary text-[12px] uppercase tracking-wider">{j.title}</h4>
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed font-sans font-light mt-4">{j.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =========================================================================
           08 — FINAL INTERFACE GALLERY (WIDE SHOWCASE GRID)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="border-t border-border-subtle pt-20 space-y-12"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">07 // INTERFACE GALLERY</span>
            <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
              Unified UI Spread Canvas
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              Explore the core pixel-perfect responsive layouts designed for the BookToDrive transaction network. No placeholders—only verified production screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALL_SCREENS.map((screen) => (
              <motion.div 
                key={screen.id} 
                variants={elementVariants}
                className="flex flex-col h-[520px] md:h-[640px] p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-[#0A0D1A]/50 hover:bg-[#0E1224]/70 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.02)] group relative overflow-hidden"
              >
                {/* Dynamic Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[120px] opacity-[0.03] bg-[#FF3B30] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" />
                
                {/* 1. Header Area (Name, Badges, & Short Explanation) */}
                <div className="mb-6 space-y-2 flex-shrink-0">
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-500">
                    <span className="text-[#FF3B30] font-black tracking-widest bg-[#FF3B30]/5 px-2 py-0.5 rounded border border-[#FF3B30]/10">
                      {screen.title.split(" // ")[0] || "SCREEN"}
                    </span>
                    <span className="text-slate-400 font-bold bg-white/[0.02] border border-white/5 px-2.5 py-0.5 rounded">
                      PRODUCTION UI
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-text-primary group-hover:text-white transition-colors uppercase tracking-tight">
                    {screen.title.split(" // ")[1] || screen.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans font-light line-clamp-2">
                    {screen.desc}
                  </p>
                </div>

                {/* 2. Hero Screenshot Frame Container (Occupies ~65-75% height) */}
                <div className="flex-1 min-h-0 flex items-center justify-center bg-black/40 border border-white/5 rounded-xl p-4 md:p-6 relative group/screen overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/[0.01] to-transparent pointer-events-none" />
                  
                  {/* Sleek Browser Window Frame */}
                  <div className="w-full h-full flex flex-col bg-[#070913] border border-white/[0.08] rounded-lg overflow-hidden shadow-2xl transition-all duration-500 group-hover/screen:border-white/20">
                    {/* Browser Control Bar */}
                    <div className="flex items-center justify-between px-3 py-2 bg-[#0C0F1D] border-b border-white/[0.06] flex-shrink-0 select-none">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="font-mono text-[8px] text-slate-500 bg-black/40 px-3 py-0.5 rounded border border-white/5 truncate max-w-[120px] md:max-w-[200px]">
                        {screen.path.substring(1)}
                      </div>
                      <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest hidden sm:inline">HTTPS</span>
                    </div>

                    {/* Screenshot Viewport (Original Aspect Ratio, No Crop, Generous Padding) */}
                    <div className="flex-1 min-h-0 w-full p-4 md:p-6 flex items-center justify-center bg-[#020306]/80 overflow-hidden">
                      <SafeImage 
                        src={screen.path} 
                        alt={screen.title} 
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded transition-transform duration-700 group-hover/screen:scale-[1.015]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =========================================================================
           09 — INTERACTIVE PROTOTYPE VIDEO (HIGH FI VIDEO WALKTHROUGH)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="border-t border-border-subtle pt-20 space-y-12"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">08 // INTERACTIVE WALKTHROUGH</span>
            <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
              Tactile Prototype Video reel
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              Watch a compiled high-fidelity walk-through of the main iPad CRM flow. Drag and drop your own MP4 screen capture below to immediately test custom interactions.
            </p>
          </div>

          <motion.div 
            variants={elementVariants}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border rounded-2xl p-2 md:p-3 aspect-[16/9] relative overflow-hidden flex flex-col justify-between group transition-all shadow-2xl ${
              isDragging ? "border-[#FF3B30]/60 bg-[#FF3B30]/10 scale-[0.995]" : "border-border-subtle bg-bg-charcoal/30"
            }`}
          >
            <div className="absolute inset-0 opacity-[0.03] grid-lines pointer-events-none z-0" />
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleVideoFileChange}
              accept="video/*"
              className="hidden"
            />

            {isDragging && (
              <div className="absolute inset-0 bg-slate-blue/85 backdrop-blur-md z-30 flex flex-col items-center justify-center border-2 border-dashed border-white/20 m-2 rounded-xl animate-pulse pointer-events-none">
                <Video className="h-10 w-10 text-white mb-2" />
                <span className="font-display font-black text-white text-sm uppercase tracking-widest">Drop MP4 Video File Here</span>
                <span className="font-mono text-[10px] text-white/80 mt-1">To instantly play it in this viewport</span>
              </div>
            )}
            
            {/* HTML5 Video player */}
            <div className="absolute inset-0 bg-black flex items-center justify-center z-0">
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted={isMuted}
                playsInline
                loop
                className="w-full h-full object-cover"
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setVideoCurrentTime(videoRef.current.currentTime);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    setVideoDuration(videoRef.current.duration);
                  }
                }}
              />
            </div>

            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 px-3 relative z-10 bg-gradient-to-b from-black/90 to-transparent pt-1">
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF3B30] animate-pulse" />
                <span className="font-mono text-[9px] text-slate-300 font-bold tracking-wider uppercase">
                  {videoSrc.startsWith("blob:") ? "LOCAL_USER_UPLOAD.MP4" : "BOOKTODRIVE_DEMO_REEL.MP4"}
                </span>
              </div>
              <span className="font-mono text-[9px] text-slate-400">
                {formatTime(videoCurrentTime)} // {formatTime(videoDuration || 180)}
              </span>
            </div>

            {/* Micro Controls Overlay */}
            <div className="relative z-10 bg-gradient-to-t from-black/95 to-transparent pb-2 px-3 pt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (isVideoPlaying) {
                        videoRef.current.pause();
                        setIsVideoPlaying(false);
                      } else {
                        videoRef.current.play();
                        setIsVideoPlaying(true);
                      }
                    }
                  }}
                  className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isVideoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-mono text-[8.5px] uppercase rounded transition-colors"
                >
                  Upload Reel
                </button>
              </div>
            </div>

          </motion.div>
        </motion.section>

        {/* =========================================================================
           10 — DESIGN SYSTEM (VISUAL SPECIFICATIONS)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="border-t border-border-subtle pt-20 space-y-12"
        >
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">09 // DESIGN SYSTEM RULES</span>
            <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
              Engineered Precision Standards
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              Coordinated and aligned on a clean 4px mathematical layout grid, reflecting high-end European performance engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Palette */}
            <div className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded-2xl space-y-4">
              <h4 className="font-mono text-[9px] text-text-primary uppercase tracking-wider border-b border-white/5 pb-1.5 font-bold flex items-center justify-between">
                <span>01 // CHROMATIC TOKENS</span>
                <Sparkles className="h-3.5 w-3.5 text-[#FF3B30]" />
              </h4>
              
              <div className="space-y-2.5 font-mono text-[10px]">
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-sm bg-[#FF3B30] border border-white/10" />
                    <div>
                      <span className="block text-text-primary font-bold">Guards Red</span>
                      <span className="block text-[8px] text-slate-500">#FF3B30</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("#FF3B30", "Guards Red")}
                    className="hover:text-text-primary transition-colors p-1"
                  >
                    {copiedToken === "Guards Red" ? <Check className="h-3.5 w-3.5 text-[#FF3B30]" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-sm bg-[#10B981] border border-white/10" />
                    <div>
                      <span className="block text-text-primary font-bold">Active Emerald</span>
                      <span className="block text-[8px] text-slate-500">#10B981</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("#10B981", "Active Emerald")}
                    className="hover:text-text-primary transition-colors p-1"
                  >
                    {copiedToken === "Active Emerald" ? <Check className="h-3.5 w-3.5 text-slate-blue" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-sm bg-[#171B26] border border-white/10" />
                    <div>
                      <span className="block text-text-primary font-bold">Space Charcoal</span>
                      <span className="block text-[8px] text-slate-500">#171B26</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("#171B26", "Space Charcoal")}
                    className="hover:text-text-primary transition-colors p-1"
                  >
                    {copiedToken === "Space Charcoal" ? <Check className="h-3.5 w-3.5 text-slate-blue" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded-2xl space-y-4">
              <h4 className="font-mono text-[9px] text-text-primary uppercase tracking-wider border-b border-white/5 pb-1.5 font-bold flex items-center justify-between">
                <span>02 // TYPOGRAPHY SPECS</span>
                <FileText className="h-3.5 w-3.5 text-[#FF3B30]" />
              </h4>
              
              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1 border-l-2 border-[#FF3B30]/30 pl-2">
                  <span className="block font-mono text-[7px] text-slate-500">DISPLAY TITLES // SPACE GROTESK</span>
                  <span className="block font-bold text-xs text-text-primary tracking-tight font-display uppercase">BookToDrive Bold</span>
                  <span className="block text-[9px] text-text-secondary font-light">Used for primary KPI scores and title layouts.</span>
                </div>

                <div className="space-y-1 border-l-2 border-slate-500/20 pl-2">
                  <span className="block font-mono text-[7px] text-slate-500">TELEMETRY DATA // JETBRAINS MONO</span>
                  <span className="block font-mono text-[10px] text-slate-blue font-bold">Odometer: 4,210 mi</span>
                  <span className="block text-[9px] text-text-secondary font-light">Used for real-time diagnostic parameters and charts.</span>
                </div>
              </div>
            </div>

            {/* Layout Rules */}
            <div className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded-2xl space-y-4">
              <h4 className="font-mono text-[9px] text-text-primary uppercase tracking-wider border-b border-white/5 pb-1.5 font-bold flex items-center justify-between">
                <span>03 // GEOMETRIC PRINCIPLES</span>
                <LayoutGrid className="h-3.5 w-3.5 text-[#FF3B30]" />
              </h4>
              
              <div className="space-y-3 text-[10px] font-mono text-text-secondary leading-relaxed">
                <div className="flex gap-2 border-l border-[#FF3B30]/30 pl-2">
                  <div>
                    <strong className="block text-text-primary text-[10px]">Sharp Corner Radius (8px)</strong>
                    <span className="text-[9px] text-slate-400 font-light block">Recreates the mechanical visual alignment of high-end motorsport.</span>
                  </div>
                </div>
                <div className="flex gap-2 border-l border-[#FF3B30]/30 pl-2">
                  <div>
                    <strong className="block text-text-primary text-[10px]">Information Density</strong>
                    <span className="text-[9px] text-slate-400 font-light block">Saves screen real estate to prevent scroll bloat during sales client intake.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* =========================================================================
           11 — RESULTS & KEY LEARNINGS (IMAGE LEFT, TEXT RIGHT)
           ========================================================================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-border-subtle pt-20"
        >
          {/* Left Column: Key Screenshot */}
          <motion.div variants={elementVariants} className="lg:col-span-6">
            <div className="border border-border-subtle bg-bg-charcoal/20 p-2 rounded-2xl shadow-xl">
              <div className="aspect-[1.5/1] rounded-xl overflow-hidden bg-black/40">
                <SafeImage 
                  src="/Finance_calculator.png" 
                  alt="Dynamic Underwriting Results screen" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="mt-3 text-[9px] font-mono text-text-secondary text-left pl-2">
              <span>FIGURE 11.1 // LENDER APPROVAL PIPELINE DATA MATRIX</span>
            </div>
          </motion.div>

          {/* Right Column: Outcomes list */}
          <motion.div variants={elementVariants} className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#FF3B30]">10 // RESULTS & KEY LEARNINGS</span>
              <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight leading-tight">
                Reflections & Business Outcomes
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-sans font-light">
              Coupling real-world physical dealership assets with a high-performance software wrapper solved deep infrastructural problems while delivering concrete business value.
            </p>

            <div className="grid grid-cols-1 gap-4 text-xs">
              <div className="border-l-2 border-[#FF3B30]/40 pl-4 py-1">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider mb-1">
                  Eliminated Key-Cabinets Bottleneck
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed font-light">
                  Direct live OBD-II coordinate streams reduced key searching and vehicle preparation intervals from an average of 20 minutes to under 10 seconds.
                </p>
              </div>

              <div className="border-l-2 border-emerald-500/40 pl-4 py-1">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider mb-1">
                  85% Reduction in Registration Latency
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed font-light">
                  Replacing manual paperwork runs with local driver's license scans compressed customer check-in delays by 85%, preventing dealership walk-outs.
                </p>
              </div>

              <div className="border-l-2 border-slate-blue/40 pl-4 py-1">
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider mb-1">
                  Showroom Ergonomics Matter
                </h4>
                <p className="text-[12px] text-text-secondary leading-relaxed font-light">
                  Designing for competitive, high-frequency work environments means building for speed. If a transactional system delays a rep even five seconds, they will bypass it for paper. Optimistic states and raw speed are core usability pillars.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
