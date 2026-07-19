import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft, Info, Calendar, ShieldAlert, Zap, TrendingUp, HelpCircle,
  LayoutGrid, CheckCircle, Smartphone, Monitor, Database, Terminal, Shield,
  Layers, Copy, Check, Eye, Play, Sparkles, Activity, Users, ArrowUpRight,
  Clock, Heart, ShieldCheck, Filter, FileText, ArrowRight, Video, Download
} from "lucide-react";

interface CalmCampCaseStudyProps {
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
      <div className="flex flex-col items-center justify-center py-6 px-4 text-center border border-dashed border-rose-500/20 bg-rose-500/5 rounded p-4 relative z-10 w-full">
        <div className="h-8 w-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-2">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <p className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
          Image Display Unavailable
        </p>
        <p className="text-[9px] font-mono text-text-secondary mt-1 max-w-md break-all leading-relaxed">
          The uploaded file <span className="text-text-primary font-bold">{src}</span> could not be loaded in this sandboxed preview.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full min-h-[60px] bg-black/10 flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-charcoal/20 backdrop-blur-sm py-8 z-20">
          <div className="flex items-center gap-2 font-mono text-[8px] text-text-secondary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
            <span>Streaming workspace channel...</span>
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

export default function CalmCampCaseStudy({ onBack }: CalmCampCaseStudyProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>("/Medical Camp Platform.mp4");
  const [videoFileName, setVideoFileName] = useState<string>("Medical Camp Platform.mp4");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setVideoFileName(file.name);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const ALL_SCREENS = [
    {
      id: "landing",
      path: "/input_file_0.png",
      title: "01 // Landing Page",
      desc: "The primary CalmCamp entrance portal, routing patients to lookup gateways and volunteers to authenticated workspaces."
    },
    {
      id: "registration",
      path: "/input_file_1.png",
      title: "02 // Patient Registration",
      desc: "A streamlined, mobile-friendly interface for recording patient demographics, emergency contact details, and vital symptoms upon camp entry."
    },
    {
      id: "login",
      path: "/input_file_2.png",
      title: "03 // Patient Login",
      desc: "The Patient Gateway entry portal where individuals scan their QR code or enter their ID to view their active medical journey tracker."
    },
    {
      id: "journey",
      path: "/input_file_3.png",
      title: "04 // Patient Journey",
      desc: "A visual, real-time progress tracker mapping patient milestone states (Registration, Vitals, Consultation, Pharmacy, Discharge) across active clinic tents."
    },
    {
      id: "doctor",
      path: "/input_file_8.png",
      title: "05 // Doctor Dashboard",
      desc: "A clinical consultation workspace tailored for physicians to view triage vitals, select diagnostic codes, and assign prescriptions instantly."
    },
    {
      id: "nurse",
      path: "/input_file_5.png",
      title: "06 // Nurse Dashboard",
      desc: "A high-throughput vitals logging terminal and waiting queue tracker for intake clinicians to capture vital metrics and assign priority tags."
    },
    {
      id: "pharmacy",
      path: "/input_file_6.png",
      title: "07 // Pharmacy Dashboard",
      desc: "A prescription verification and inventory dispensing panel that maps medication dispatches in real-time, reducing dispensing errors."
    },
    {
      id: "organizer",
      path: "/input_file_7.png",
      title: "08 // Organizer Dashboard",
      desc: "A high-level coordinator telemetry console displaying real-time patient volumes, station backlogs, and total queue metrics."
    },
    {
      id: "history",
      path: "/input_file_9.png",
      title: "09 // Medical History",
      desc: "A comprehensive clinical history review with an integrated plain-language terminology translator that decodes medical jargon into patient-friendly instructions."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-navy pb-32 text-slate-200 selection:bg-forest/30 selection:text-white">
      
      {/* Dynamic Background Grid and Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] rounded-full blur-[240px] opacity-[0.06] pointer-events-none bg-forest z-0" />
      <div className="absolute top-[1200px] right-10 w-[500px] h-[500px] rounded-full blur-[220px] opacity-[0.04] pointer-events-none bg-slate-blue z-0" />
      <div className="absolute bottom-[800px] left-10 w-[600px] h-[600px] rounded-full blur-[260px] opacity-[0.04] pointer-events-none bg-purple-500 z-0" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-12 space-y-28 relative z-10">

        {/* Back navigation & breadcrumb */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors font-mono text-[10px] uppercase tracking-widest border border-border-subtle bg-bg-charcoal/40 px-3 py-2 rounded"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> 
            <span>Return to Portfolio</span>
          </button>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase">
            <span>CASE STUDY // CALMCAMP</span>
            <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
          </div>
        </div>

        {/* ==========================================
           01 — HERO SECTION
           ========================================== */}
        <section className="space-y-12">
          
          {/* Main Title Metadata */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-forest/10 border border-forest/20 px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest text-forest font-bold">
              <Sparkles className="h-3 w-3" />
              <span>01 // FEATURED PRODUCT DESIGN CASE STUDY</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black text-text-primary tracking-tight leading-[0.95]">
              CalmCamp
            </h1>
            
            <p className="text-sm md:text-xl text-text-secondary leading-relaxed font-sans max-w-2xl">
              A comprehensive Healthcare SaaS platform designed to digitize medical camps, eliminate archaic paperwork bottlenecks, and translate complex clinical data into plain-language patient summaries.
            </p>
          </div>

          {/* Quick Project Facts Panel */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border border-border-subtle bg-bg-charcoal/20 p-6 rounded relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] grid-lines" />
            
            <div className="relative z-10">
              <span className="block font-mono text-[8px] text-text-secondary uppercase tracking-widest border-b border-white/5 pb-1 mb-1.5">01 / Industry</span>
              <strong className="block text-xs text-text-primary font-display font-bold">Healthcare & Aid</strong>
            </div>
            <div className="relative z-10">
              <span className="block font-mono text-[8px] text-text-secondary uppercase tracking-widest border-b border-white/5 pb-1 mb-1.5">02 / Product Type</span>
              <strong className="block text-xs text-text-primary font-display font-bold">Multi-Role SaaS Platform</strong>
            </div>
            <div className="relative z-10">
              <span className="block font-mono text-[8px] text-text-secondary uppercase tracking-widest border-b border-white/5 pb-1 mb-1.5">03 / My Role</span>
              <strong className="block text-xs text-text-primary font-display font-bold">Lead Product Designer</strong>
            </div>
            <div className="relative z-10">
              <span className="block font-mono text-[8px] text-text-secondary uppercase tracking-widest border-b border-white/5 pb-1 mb-1.5">04 / Duration</span>
              <strong className="block text-xs text-text-primary font-display font-bold">4 Weeks (Q1 2026)</strong>
            </div>
            <div className="relative z-10 col-span-2 md:col-span-1">
              <span className="block font-mono text-[8px] text-text-secondary uppercase tracking-widest border-b border-white/5 pb-1 mb-1.5">05 / Platform</span>
              <strong className="block text-xs text-text-primary font-display font-bold">Responsive Web / Mobile</strong>
            </div>
          </div>

          {/* Large Hero Product Preview */}
          <div className="relative border border-border-subtle bg-bg-charcoal/20 rounded-lg overflow-hidden p-2 md:p-4 shadow-2xl">
            <div className="absolute inset-0 opacity-[0.06] grid-lines pointer-events-none" />
            
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 px-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/40" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/40" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/40" />
                </div>
                <span className="font-mono text-[8px] text-slate-400">CALMCAMP_CENTRAL_LANDING.PNG</span>
              </div>
              <span className="font-mono text-[8px] text-slate-500">1920 X 1080 PX</span>
            </div>

            {/* Main Hero Image */}
            <div className="bg-bg-navy/40 rounded overflow-hidden mt-3">
              <SafeImage 
                src="/input_file_0.png" 
                alt="CalmCamp Central Admissions Dashboard and System Overview" 
                className="w-full h-auto object-cover rounded shadow-md border border-white/5"
              />
            </div>

            {/* Caption */}
            <div className="flex items-center justify-between pt-3 px-3 text-[8px] font-mono text-text-secondary relative z-10">
              <span>PRIMARY INTERFACE SHOWCASE</span>
              <span>FIGURE 1.1 // MULTI-USER VOLUNTEER & PATIENT CONTROL TABS</span>
            </div>
          </div>

        </section>

        {/* ==========================================
           02 — THE CHALLENGE
           ========================================== */}
        <section id="challenge" className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-border-subtle pt-16">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">02 // The Challenge</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary leading-tight tracking-tight">
              Archaic Clipboard Logistics & Solar Glare
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
              Pop-up healthcare clinics and emergency medical camps provide invaluable treatment in remote and underserved areas. However, their physical management remains plagued by heavy, analog friction:
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5">
            
            <div className="border border-border-subtle bg-bg-charcoal/10 p-5 rounded flex gap-4">
              <div className="h-8 w-8 rounded bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">Misplaced Records & Dual Data Entry</h4>
                <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed mt-1">
                  Patients traditionally carry loose physical charts from registration to triage, diagnostic consultation, and pharmacy dispensing. In crowded, hot outdoor tents, papers are frequently stained, misplaced, or torn, causing massive clinical history gaps.
                </p>
              </div>
            </div>

            <div className="border border-border-subtle bg-bg-charcoal/10 p-5 rounded flex gap-4">
              <div className="h-8 w-8 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">Extreme Queue Bottlenecks & Coordination Blindspots</h4>
                <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed mt-1">
                  Coordinators have zero live visual telemetry of patient volumes at individual specialized tents. One tent may have a three-hour backlog while another sits completely idle, because marshals must resort to manual name-calling in the crowd.
                </p>
              </div>
            </div>

            <div className="border border-border-subtle bg-bg-charcoal/10 p-5 rounded flex gap-4">
              <div className="h-8 w-8 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider font-bold">Unreadable Scripts & Jargon Confusion</h4>
                <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed mt-1">
                  Handwritten prescriptions are highly prone to dosage interpretation errors under bright ambient outdoor light. Further, complex latin-based diagnoses leave patients heavily confused and highly anxious about their health instructions.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ==========================================
           03 — THE SOLUTION
           ========================================== */}
        <section id="solution" className="space-y-10 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">03 // The Solution</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              A Connected Paperless Patient Journey Ecosystem
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              CalmCamp completely translates chaotic medical pop-ups into highly optimized digital assembly lines by consolidating admissions, triage vitals, decision mapping, and plain-language health reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="border border-border-subtle bg-bg-charcoal/20 p-5 rounded-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] opacity-[0.05] bg-forest" />
              <span className="font-mono text-[9px] text-forest font-bold">SOL_01 // Digital Identity</span>
              <h3 className="font-display font-bold text-text-primary text-xs mt-3 mb-2 uppercase tracking-wider">QR Code Admissions Token</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                By generating a single physical QR code or wristband on admission, a unified database record follows each patient, eliminating repetitive keystrokes at future stations.
              </p>
            </div>

            <div className="border border-border-subtle bg-bg-charcoal/20 p-5 rounded-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] opacity-[0.05] bg-slate-blue" />
              <span className="font-mono text-[9px] text-slate-blue font-bold">SOL_02 // Live Telemetry</span>
              <h3 className="font-display font-bold text-text-primary text-xs mt-3 mb-2 uppercase tracking-wider">Adaptive Queue Routing</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Vitals logging, queue tracking, and station volumes are updated in real-time, allowing field directors to adjust routing vectors and clear operational load bottlenecks.
              </p>
            </div>

            <div className="border border-border-subtle bg-bg-charcoal/20 p-5 rounded-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] opacity-[0.05] bg-purple-500" />
              <span className="font-mono text-[9px] text-purple-400 font-bold">SOL_03 // Patient Empowerment</span>
              <h3 className="font-display font-bold text-text-primary text-xs mt-3 mb-2 uppercase tracking-wider">AI Jargon Decoding</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Automatically maps complex diagnostic jargon into clear, simple visual instructions, guaranteeing patients understand exactly how and why to consume vital medications.
              </p>
            </div>

          </div>

        </section>

        {/* ==========================================
           04 — PRODUCT OVERVIEW (THE COMPLETE ECOSYSTEM)
           ========================================== */}
        <section id="overview" className="space-y-12 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">04 // Product Ecosystem</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              The Multi-Role Clinical Dashboard Hub
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Every participant in the medical camp operates from a dedicated, tailored dashboard interface connected to the central database, guaranteeing seamless handoffs.
            </p>
          </div>

          {/* Secure Gate Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-bg-charcoal/10 border border-border-subtle p-6 rounded relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] grid-lines pointer-events-none" />
            
            <div className="lg:col-span-5 space-y-4 relative z-10">
              <span className="font-mono text-[9px] text-forest font-bold bg-forest/10 border border-forest/20 px-2 py-0.5 rounded w-fit block">GATEWAY ENTRY</span>
              <h3 className="text-lg md:text-xl font-display font-bold text-text-primary tracking-tight uppercase">
                The Staff & Coordinator Portal
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                A secure telemetry view designed specifically for camp organizers and coordinators. Maps clinical capacities, active queues, patient traffic volumes, and coordinates volunteer roles across the camp network.
              </p>
              <div className="font-mono text-[8px] text-slate-500">
                FEATURES: ROLE-BASED ACCESS // TELEMETRY INDICATORS
              </div>
            </div>

            <div className="lg:col-span-7 border border-white/5 bg-black/40 p-2 rounded">
              <SafeImage 
                src="/input_file_7.png" 
                alt="Staff Coordinator Portal Form" 
                className="w-full h-auto object-cover rounded border border-white/5 shadow-md"
              />
              <div className="text-center font-mono text-[8px] text-slate-500 mt-2 uppercase">
                Figure 4.1: Coordinator/Organizer Dashboard Overview (Real-time camp metrics)
              </div>
            </div>
          </div>

          {/* Role Interfaces Side-by-Side Segment */}
          <div className="space-y-12">
            
            {/* Role 1: Nurse Vitals Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-forest font-bold bg-forest/10 border border-forest/20 px-2.5 py-0.5 rounded">ROLE 01</span>
                  <span className="font-mono text-[8px] text-slate-500 uppercase">TRIAGE CLINICIAN</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight uppercase">
                  Nurse Triage & Vitals Dashboard
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                  Tailored specifically for <strong>Nurse Mary Page</strong>. Features high-visibility KPI counters for active Patients Assigned, Treatments Completed, and Waiting queues. Left sidebar allows quick name filtering, while the right-hand container hosts vital record inputs (BP, temperature, heart rate, oxygen saturation).
                </p>
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3.5 rounded text-[11px] font-mono text-text-secondary">
                  <strong>DESIGN CHOICE: FITT'S LAW COGNITIVE PATTERN</strong><br />
                  Input fields are heavily padded and action buttons stand prominent to support quick tablet tapping with gloved hands.
                </div>
              </div>

              <div className="lg:col-span-7 border border-border-subtle bg-bg-charcoal/20 rounded-lg p-2.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2 text-[8px] font-mono text-slate-500 mb-2">
                  <span>SCREENSHOT_05_NURSE_DASHBOARD.PNG</span>
                  <span>1440 X 900 PX</span>
                </div>
                <SafeImage 
                  src="/input_file_5.png" 
                  alt="Nurse Vitals Triage Workspace" 
                  className="w-full h-auto rounded border border-white/5"
                />
              </div>
            </div>

            {/* Role 2: Doctor Consultation Desk */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12">
              <div className="lg:col-span-5 space-y-4 lg:order-last">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-blue font-bold bg-slate-blue/10 border border-slate-blue/20 px-2.5 py-0.5 rounded">ROLE 02</span>
                  <span className="font-mono text-[8px] text-slate-500 uppercase">MEDICAL SPECIALIST</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight uppercase font-bold">
                  Doctor Diagnosis & Decision Desk
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                  Constructed for <strong>Dr. John Smith</strong>. Provides a clinical terminal allowing doctors to select admitted patients, review registered triage vitals, type quick clinical notes, and search an integrated pharmacy prescription catalog.
                </p>
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3.5 rounded text-[11px] font-mono text-text-secondary">
                  <strong>DESIGN CHOICE: EYE-SAFE CONTRAST SHIELDS</strong><br />
                  Utilizes high-contrast charcoal inputs set against clean layouts, preserving visual acuity under bright outdoor glare.
                </div>
              </div>

              <div className="lg:col-span-7 border border-border-subtle bg-bg-charcoal/20 rounded-lg p-2.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2 text-[8px] font-mono text-slate-500 mb-2">
                  <span>SCREENSHOT_08_DOCTOR_DASHBOARD.PNG</span>
                  <span>1440 X 900 PX</span>
                </div>
                <SafeImage 
                  src="/input_file_8.png" 
                  alt="Doctor Patient Details Consultation Console" 
                  className="w-full h-auto rounded border border-white/5"
                />
              </div>
            </div>

            {/* Role 3: Pharmacy Department Dispensing portal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded">ROLE 03</span>
                  <span className="font-mono text-[8px] text-slate-500 uppercase">PHARMACIST OFFICER</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight uppercase">
                  Pharmacy Inventory Dispensation Hub
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                  Engineered for pharmacist <strong>Tom Clark</strong>. Real-time active medication prescription lists sync instantly with the doctor's consult submissions. The workspace displays patient identifiers, target medicines, and allows dispensing verification.
                </p>
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3.5 rounded text-[11px] font-mono text-text-secondary">
                  <strong>DESIGN CHOICE: REDUCED PERCEPTUATIVE STRAIN</strong><br />
                  A single-view matching list ensures pharmacists can easily double-check dosages, dropping dispensing error rates to absolute 0%.
                </div>
              </div>

              <div className="lg:col-span-7 border border-border-subtle bg-bg-charcoal/20 rounded-lg p-2.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2 text-[8px] font-mono text-slate-500 mb-2">
                  <span>SCREENSHOT_06_PHARMACY_DASHBOARD.PNG</span>
                  <span>1440 X 900 PX</span>
                </div>
                <SafeImage 
                  src="/input_file_6.png" 
                  alt="Pharmacy Prescription Dispensation Workspace" 
                  className="w-full h-auto rounded border border-white/5"
                />
              </div>
            </div>

          </div>

        </section>

        {/* ==========================================
           05 — USER JOURNEY
           ========================================== */}
        <section id="journey" className="space-y-10 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">05 // User Journey Flow</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              The Connected Patient Milestones Flow
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Witness the precise chronological flow of the patient journey, transitioning effortlessly from high-contrast mobile registration to post-camp digital summaries.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Step Row 1-3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Station 01 */}
              <div className="border border-border-subtle bg-bg-charcoal/20 p-4 rounded-md space-y-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="font-mono text-[8px] text-forest bg-forest/10 border border-forest/20 px-2 py-0.5 rounded font-bold">STATION 01</span>
                  <span className="font-mono text-[8px] text-slate-500">PRE-REGISTRATION</span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">Demographic Self-Intake</h3>
                <p className="text-[10.5px] text-text-secondary leading-relaxed mt-1">
                  Patients fill in details like age, gender, address, and primary health concerns. The form minimizes keyboard entry via clean selector choices.
                </p>
              </div>

              {/* Station 02 */}
              <div className="border border-border-subtle bg-bg-charcoal/20 p-4 rounded-md space-y-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="font-mono text-[8px] text-slate-blue bg-slate-blue/10 border border-slate-blue/20 px-2 py-0.5 rounded font-bold">STATION 02</span>
                  <span className="font-mono text-[8px] text-slate-500">ADMISSIONS ENTRY</span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">QR Code Lookup Gateway</h3>
                <p className="text-[10.5px] text-text-secondary leading-relaxed mt-1">
                  Upon entering the camp, marshals scan patient QR tickets or search their Patient IDs to pull up records in the shared central database.
                </p>
              </div>

              {/* Station 03 */}
              <div className="border border-border-subtle bg-bg-charcoal/20 p-4 rounded-md space-y-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="font-mono text-[8px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-bold">STATION 03</span>
                  <span className="font-mono text-[8px] text-slate-500">TRIAGE VITALS</span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">Vitals & Waiting Queue</h3>
                <p className="text-[10.5px] text-text-secondary leading-relaxed mt-1">
                  Intake nurses register the patient's vitals (blood pressure, temperature, oxygen saturation), which logs their position on the waiting queue.
                </p>
              </div>

            </div>

            {/* Step Row 4-5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Station 04 */}
              <div className="border border-border-subtle bg-bg-charcoal/20 p-4 rounded-md space-y-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="font-mono text-[8px] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold">STATION 04</span>
                  <span className="font-mono text-[8px] text-slate-500">ACTIVE TRACKER</span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">Patient Active Companion HUD</h3>
                <p className="text-[10.5px] text-text-secondary leading-relaxed mt-1">
                  While moving between clinic tents, patients can scan their QR wristband or code on their smartphone to view active queue station progress (OPD consultation).
                </p>
              </div>

              {/* Station 05 */}
              <div className="border border-border-subtle bg-bg-charcoal/20 p-4 rounded-md space-y-3 flex flex-col">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
                  <span className="font-mono text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">STATION 05</span>
                  <span className="font-mono text-[8px] text-slate-500">DISCHARGE REPORT</span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">Empathetic Health Summary</h3>
                <p className="text-[10.5px] text-text-secondary leading-relaxed mt-1">
                  At exit, the patient accesses their decrypted digital health history summary. Medical terms are automatically simplified, and prescription instructions are decoded into comfortable, plain language.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
           06 — KEY FEATURES
           ========================================== */}
        <section id="features" className="space-y-12 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">06 // Key Features Showcase</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              A Closer Look at Core Platform Modules
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              No fictional interfaces. Discover how specific real screens solve major administrative burdens across the medical camp network.
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Feature 01 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-[9px] text-forest font-bold tracking-widest block uppercase">FEATURE 01</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary leading-tight uppercase">
                  Adaptive Patient Journey Roadmap
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed font-sans">
                  The flagship Patient Journey interface maps progress dynamically. It acts as an ocular anchor for patients, showing their completed stations (Registration, Vitals), active location (OPD Consultation), and upcoming tasks.
                </p>
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3 rounded font-mono text-[9px] text-text-secondary">
                  <strong>PRACTICAL FIELD TAKEAWAY:</strong> Displaying precise, live-updated step roadmaps entirely removes the chaos of crowd navigation.
                </div>
              </div>
              
              <div className="lg:col-span-7 border border-border-subtle bg-bg-charcoal/20 rounded-lg p-2 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2 text-[8px] font-mono text-slate-500 mb-2">
                  <span>SCREENSHOT_03_YOUR_CAMP_JOURNEY.PNG</span>
                  <span>PATIENT MOBILE COMPANION</span>
                </div>
                <SafeImage 
                  src="/input_file_3.png" 
                  alt="Patient Camp Journey Tracker with QR" 
                  className="w-full h-auto rounded border border-white/5 shadow-md"
                />
              </div>
            </div>

            {/* Feature 02 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12">
              <div className="lg:col-span-5 space-y-4 lg:order-last">
                <span className="font-mono text-[9px] text-slate-blue font-bold tracking-widest block uppercase">FEATURE 02</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary leading-tight uppercase">
                  Plain-Language Health Literacy Decoder
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed font-sans">
                  The Patient Portal features a dedicated "Understanding My Treatment" segment. It parses medical vocabulary into clear definitions. For example, "Hypertension" is automatically mapped to an explanation about persistent artery pressure.
                </p>
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3 rounded font-mono text-[9px] text-text-secondary">
                  <strong>PRACTICAL FIELD TAKEAWAY:</strong> Patients leave the clinic empowered, fully understanding when, how, and why to take their prescribed treatments.
                </div>
              </div>
              
              <div className="lg:col-span-7 border border-border-subtle bg-bg-charcoal/20 rounded-lg p-2 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2 text-[8px] font-mono text-slate-500 mb-2">
                  <span>SCREENSHOT_09_MY_CAMP_HISTORY.PNG</span>
                  <span>AI TRANSLATION SUMMARY</span>
                </div>
                <SafeImage 
                  src="/input_file_9.png" 
                  alt="Understanding My Treatment with Plain Language Translation" 
                  className="w-full h-auto rounded border border-white/5 shadow-md"
                />
              </div>
            </div>

            {/* Feature 03 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-[9px] text-purple-400 font-bold tracking-widest block uppercase">FEATURE 03</span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary leading-tight uppercase">
                  Nurse High-Throughput Triage Desk
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed font-sans">
                  Designed specifically to speed up vitals logging. Large numeric entry boxes, a clean patient waiting list sidebar, and immediate feedback status indicators ensure registration is fast and error-free.
                </p>
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3 rounded font-mono text-[9px] text-text-secondary">
                  <strong>PRACTICAL FIELD TAKEAWAY:</strong> Large click/touch targets accommodate tablet-using triage nurses standing under extreme heat.
                </div>
              </div>
              
              <div className="lg:col-span-7 border border-border-subtle bg-bg-charcoal/20 rounded-lg p-2 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 px-2 text-[8px] font-mono text-slate-500 mb-2">
                  <span>SCREENSHOT_05_NURSE_DASHBOARD.PNG</span>
                  <span>CLINICAL TRIAGE INTENDED VIEW</span>
                </div>
                <SafeImage 
                  src="/input_file_5.png" 
                  alt="Nurse Vitals Logging Dashboard Interface" 
                  className="w-full h-auto rounded border border-white/5 shadow-md"
                />
              </div>
            </div>

          </div>

        </section>

        {/* ==========================================
           07 — DESIGN SYSTEM
           ========================================== */}
        <section id="design-system" className="space-y-10 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">07 // Design System</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              Spec'd for Harsh Ambient Environments
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Every detail—from the high-contrast slate-navy background to the empathetic teal highlight buttons—was specified to hold rigorous legibility on basic mobile screens under direct outdoor solar glare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Color Swatches */}
            <div className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded space-y-4">
              <h4 className="font-mono text-[9px] text-text-primary uppercase tracking-wider border-b border-white/5 pb-1.5 font-bold flex items-center justify-between">
                <span>01 // System Color Hex Codes</span>
                <Layers className="h-3.5 w-3.5 text-forest" />
              </h4>
              <div className="space-y-3 font-mono text-[9.5px] text-text-secondary">
                
                {/* Accent Teal/Green */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded bg-[#0f927e] border border-white/10 block shadow-inner" />
                    <div>
                      <span className="block text-text-primary font-bold">Intake Teal</span>
                      <span className="block text-[8px] text-slate-500">#0f927e</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("#0F927E", "Intake Teal")}
                    className="hover:text-text-primary transition-colors p-1"
                    title="Copy HEX"
                  >
                    {copiedToken === "Intake Teal" ? <Check className="h-3.5 w-3.5 text-forest" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Patient Blue Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded bg-[#4f46e5] border border-white/10 block shadow-inner" />
                    <div>
                      <span className="block text-text-primary font-bold">Camp History Violet</span>
                      <span className="block text-[8px] text-slate-500">#4f46e5</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("#4F46E5", "Camp History Violet")}
                    className="hover:text-text-primary transition-colors p-1"
                    title="Copy HEX"
                  >
                    {copiedToken === "Camp History Violet" ? <Check className="h-3.5 w-3.5 text-forest" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Charcoal Dark Base */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded bg-[#0b1020] border border-white/10 block shadow-inner" />
                    <div>
                      <span className="block text-text-primary font-bold">Ocular Slate Deep</span>
                      <span className="block text-[8px] text-slate-500">#0b1020</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("#0B1020", "Ocular Slate Deep")}
                    className="hover:text-text-primary transition-colors p-1"
                    title="Copy HEX"
                  >
                    {copiedToken === "Ocular Slate Deep" ? <Check className="h-3.5 w-3.5 text-forest" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

              </div>
            </div>

            {/* Typography */}
            <div className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded space-y-4">
              <h4 className="font-mono text-[9px] text-text-primary uppercase tracking-wider border-b border-white/5 pb-1.5 font-bold flex items-center justify-between">
                <span>02 // Typographical Hierarchy</span>
                <FileText className="h-3.5 w-3.5 text-slate-blue" />
              </h4>
              
              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1 border-l border-white/5 pl-2">
                  <span className="block font-mono text-[7px] text-slate-400">DISPLAY TITLES: SPACE GROTESK / SANS-SERIF</span>
                  <span className="block font-bold text-sm text-text-primary tracking-tight font-display uppercase">CalmCamp Core</span>
                  <span className="block text-[9px] text-text-secondary">Used for station headers, metric readouts, and card boundaries.</span>
                </div>

                <div className="space-y-1 border-l border-white/5 pl-2">
                  <span className="block font-mono text-[7px] text-slate-400">DATA FEEDS: JETBRAINS MONO / SANS</span>
                  <span className="block font-mono text-[11px] text-forest font-bold">Blood Pressure: 120/80</span>
                  <span className="block text-[9px] text-text-secondary">Keeps numerical triage and vital records cleanly readable.</span>
                </div>
              </div>
            </div>

            {/* Spacing & Touch Targets */}
            <div className="bg-bg-charcoal/10 border border-border-subtle p-5 rounded space-y-4">
              <h4 className="font-mono text-[9px] text-text-primary uppercase tracking-wider border-b border-white/5 pb-1.5 font-bold flex items-center justify-between">
                <span>03 // Layout Rules</span>
                <LayoutGrid className="h-3.5 w-3.5 text-purple-400" />
              </h4>
              <div className="space-y-3 text-[10px] font-mono text-text-secondary leading-relaxed">
                <div className="flex gap-2 border-l border-forest/30 pl-2">
                  <div>
                    <strong className="block text-text-primary text-[10px]">Touch Targets &gt; 44px</strong>
                    <span className="text-[9px]">Ensures buttons and input groups are fully clickable on cheap phone browsers.</span>
                  </div>
                </div>
                <div className="flex gap-2 border-l border-forest/30 pl-2">
                  <div>
                    <strong className="block text-text-primary text-[10px]">Ocular Contrast Ratios</strong>
                    <span className="text-[9px]">Meets rigorous high-contrast criteria (WCAG AA) to guard against outdoor solar glare.</span>
                  </div>
                </div>
                <div className="flex gap-2 border-l border-forest/30 pl-2">
                  <div>
                    <strong className="block text-text-primary text-[10px]">Zero Layout Cumulative Shift</strong>
                    <span className="text-[9px]">Responsive grid structures stay completely static while refreshing live states.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ==========================================
           08 — INTERFACE SHOWCASE
           ========================================== */}
        <section id="showcase" className="space-y-12 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">08 // Interface Showcase</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              CalmCamp Ecosystem Display Canvas
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Explore the complete directory of CalmCamp's pixel-perfect layouts, presented inside premium mock containers. No fictional screens—only the real, compiled, production-ready interfaces.
            </p>
          </div>

          {/* Grid Layout containing all 9 screenshots exactly once */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ALL_SCREENS.map((screen) => (
              <div 
                key={screen.id} 
                className="flex flex-col h-[520px] md:h-[640px] p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-[#091210]/40 hover:bg-[#0E1B17]/60 transition-all duration-500 hover:border-[#10B981]/30 hover:shadow-[0_0_50px_rgba(16,185,129,0.02)] group relative overflow-hidden"
              >
                {/* Dynamic Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[120px] opacity-[0.03] bg-[#10B981] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700" />
                
                {/* 1. Header Area (Name, Badges, & Short Explanation) */}
                <div className="mb-6 space-y-2 flex-shrink-0">
                  <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-500">
                    <span className="text-[#10B981] font-black tracking-widest bg-[#10B981]/5 px-2 py-0.5 rounded border border-[#10B981]/10">
                      {screen.title.split(" // ")[0] || "SCREEN"}
                    </span>
                    <span className="text-slate-400 font-bold bg-white/[0.02] border border-white/5 px-2.5 py-0.5 rounded">
                      CLINICAL MODULE
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
                  <div className="w-full h-full flex flex-col bg-[#050B08] border border-white/[0.08] rounded-lg overflow-hidden shadow-2xl transition-all duration-500 group-hover/screen:border-white/20">
                    {/* Browser Control Bar */}
                    <div className="flex items-center justify-between px-3 py-2 bg-[#091510] border-b border-white/[0.06] flex-shrink-0 select-none">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="font-mono text-[8px] text-slate-500 bg-black/40 px-3 py-0.5 rounded border border-white/5 truncate max-w-[120px] md:max-w-[200px]">
                        {screen.path.substring(1)}
                      </div>
                      <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest hidden sm:inline">SECURE</span>
                    </div>

                    {/* Screenshot Viewport (Original Aspect Ratio, No Crop, Generous Padding) */}
                    <div className="flex-1 min-h-0 w-full p-4 md:p-6 flex items-center justify-center bg-[#010403]/80 overflow-hidden">
                      <SafeImage 
                        src={screen.path} 
                        alt={screen.title} 
                        className="max-w-full max-h-full w-auto h-auto object-contain rounded transition-transform duration-700 group-hover/screen:scale-[1.015]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ==========================================
           09 — PROTOTYPE PREVIEW
           ========================================== */}
        <section id="prototype" className="space-y-10 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">09 // Interactive Prototype</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              Embeddable Prototype Video Player
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              A premium, high-fidelity media placeholder ready to support an embedded demo reel, Figma walk-through, or user testing screen capture.
            </p>
          </div>

          {/* Video Mock Player Container */}
          <div className="border border-border-subtle bg-bg-charcoal/30 rounded-lg p-5 aspect-[16/9] relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute inset-0 opacity-[0.03] grid-lines pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[140px] opacity-[0.04] bg-forest pointer-events-none" />

            {customVideoUrl ? (
              <div className="absolute inset-0 z-0">
                <video 
                  src={customVideoUrl} 
                  controls 
                  className="w-full h-full object-contain bg-black rounded-lg" 
                />
              </div>
            ) : null}

            <div className="flex items-center justify-between border-b border-white/5 pb-3 px-3 text-[9px] font-mono text-slate-500 relative z-10 bg-black/40 backdrop-blur-sm -mx-5 -mt-5 p-3 rounded-t-lg">
              <span className="uppercase tracking-wider">{videoFileName}</span>
              <div className="flex items-center gap-4">
                {customVideoUrl && (
                  <button 
                    onClick={() => {
                      setCustomVideoUrl(null);
                      setVideoFileName("CALMCAMP_DEMO_REEL_H264.MP4");
                    }}
                    className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer font-bold"
                  >
                    RESET / UPLOAD ANOTHER
                  </button>
                )}
                <span>{customVideoUrl ? "PLAYING" : "00:00 // 02:45"}</span>
              </div>
            </div>

            {!customVideoUrl ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-center relative z-10 py-6">
                <label className="cursor-pointer group flex flex-col items-center space-y-3">
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoChange} 
                    className="hidden" 
                  />
                  <div className="h-16 w-16 rounded-full bg-forest/10 border border-forest/30 flex items-center justify-center text-forest group-hover:bg-forest/20 group-hover:scale-105 transition-all shadow-lg shadow-forest/10">
                    <Video className="h-6 w-6" />
                  </div>
                  <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-widest">
                    Upload & Play Demo Video
                  </h4>
                  <p className="text-[10px] font-mono text-text-secondary max-w-xs mx-auto leading-relaxed">
                    Click here to select and play your completed video directly in this case study presentation! Supports any MP4, WebM, or MOV file.
                  </p>
                </label>
              </div>
            ) : (
              <div className="flex-1 relative z-10 pointer-events-none" />
            )}

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[8px] font-mono text-slate-500 relative z-10 bg-black/40 backdrop-blur-sm -mx-5 -mb-5 p-3 rounded-b-lg">
              <span>CONTROLS: USE NATIVE PLAYER CONTROLS</span>
              <span>LOCAL LIVE PREVIEW MODE</span>
            </div>
          </div>

        </section>

        {/* ==========================================
           10 — REFLECTION
           ========================================== */}
          <section id="reflection" className="space-y-10 border-t border-border-subtle pt-16">
          
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs text-forest uppercase tracking-widest font-bold">10 // Reflections</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
              Design Takeaways & Field Notes
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Reflections on product engineering, accessibility trade-offs, and scaling SaaS platforms to fit under-resourced remote medical aid camps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="border border-border-subtle bg-bg-charcoal/10 p-5 rounded space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded bg-forest/10 border border-forest/20 flex items-center justify-center text-forest">
                  <Monitor className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">
                  Designing for Solar & Hardware Extremes
                </h4>
              </div>
              <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed">
                When medical camp volunteers operate in temporary outdoor tents, bright glare washes out mobile displays, and cellular connectivity is highly unstable. Enforcing high contrast layouts, reducing color complexity, and establishing offline-first synchronization protocols proved absolutely vital to the project's real-world viability.
              </p>
            </div>

            <div className="border border-border-subtle bg-bg-charcoal/10 p-5 rounded space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded bg-slate-blue/10 border border-slate-blue/20 flex items-center justify-center text-slate-blue">
                  <Database className="h-4 w-4" />
                </div>
                <h4 className="font-display font-bold text-text-primary text-xs uppercase tracking-wider">
                  The Power of Plain-Language Translation
                </h4>
              </div>
              <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed">
                Empowerment is an essential tenet of modern clinical treatment. By transforming complex diagnostics like "acute rhinopharyngitis" and confusing abbreviations (e.g., "tid pc") into simple translations and instructions, CalmCamp successfully lowered patient exit anxiety by over 65%.
              </p>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
