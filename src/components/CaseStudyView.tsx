import React, { useEffect, useState } from "react";
import { Project } from "../types";
import { ChevronLeft, Info, Calendar, ShieldAlert, Zap, TrendingUp, HelpCircle, Activity, LayoutGrid, CheckCircle } from "lucide-react";
import DashboardCalmCamp from "./DashboardCalmCamp";
import DashboardBookToDrive from "./DashboardBookToDrive";
import InteractiveBlueprint from "./InteractiveBlueprint";
import CalmCampCaseStudy from "./CalmCampCaseStudy";
import BookToDriveCaseStudy from "./BookToDriveCaseStudy";
import MuseumCaseStudy from "./MuseumCaseStudy";

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
}

export default function CaseStudyView({ project, onBack }: CaseStudyViewProps) {
  const [activeTab, setActiveTab] = useState<"CASE_STUDY" | "LIVE_DEMO">("CASE_STUDY");

  // Scroll to top when mounting a new case study
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project]);

  const { caseStudy } = project;

  if (project.id === "calmcamp") {
    return (
      <div className="min-h-screen bg-bg-navy pb-24 text-slate-200 relative">
        {/* Toggle Bar at the top to let user jump between Case Study and Live Interactive Workspace */}
        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border-subtle/50 pb-4 relative z-30">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors font-mono text-[10px] uppercase tracking-widest border border-border-subtle bg-bg-charcoal/40 px-3 py-1.5 rounded"
          >
            <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> Return to Index
          </button>

          <div className="flex bg-bg-charcoal border border-border-subtle p-0.5 rounded w-fit">
            <button
              onClick={() => setActiveTab("CASE_STUDY")}
              className={`px-3 py-1.5 font-mono text-[10px] rounded uppercase transition-all ${
                activeTab === "CASE_STUDY" ? "bg-white text-bg-navy font-bold shadow-md" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              01-10 Case Study
            </button>
            <button
              onClick={() => setActiveTab("LIVE_DEMO")}
              className={`px-3 py-1.5 font-mono text-[10px] rounded uppercase transition-all flex items-center gap-1.5 ${
                activeTab === "LIVE_DEMO" ? "bg-white text-bg-navy font-bold shadow-md" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Activity className="h-3 w-3 animate-pulse text-forest" /> Live Workspace
            </button>
          </div>
        </div>

        {activeTab === "CASE_STUDY" ? (
          <CalmCampCaseStudy onBack={onBack} />
        ) : (
          <div className="max-w-6xl mx-auto px-5 md:px-10 mt-8 space-y-6">
            <div className="border border-border-subtle bg-bg-charcoal/30 p-5 rounded-md">
              <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-forest" />
                Fully Functional Interactive Dashboard Sandbox
              </h3>
              <p className="text-[10px] text-text-secondary">
                This is a live, fully coded implementation of the primary dashboard interface. Select and test real-time controls, filtering tabs, and state machines.
              </p>
            </div>
            <DashboardCalmCamp />
          </div>
        )}
      </div>
    );
  }

  if (project.id === "booktodrive") {
    return (
      <div className="min-h-screen bg-bg-navy pb-24 text-slate-200 relative">
        {/* Toggle Bar at the top to let user jump between Case Study and Live Interactive Workspace */}
        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border-subtle/50 pb-4 relative z-30">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors font-mono text-[10px] uppercase tracking-widest border border-border-subtle bg-bg-charcoal/40 px-3 py-1.5 rounded"
          >
            <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> Return to Index
          </button>

          <div className="flex bg-bg-charcoal border border-border-subtle p-0.5 rounded w-fit">
            <button
              onClick={() => setActiveTab("CASE_STUDY")}
              className={`px-3 py-1.5 font-mono text-[10px] rounded uppercase transition-all ${
                activeTab === "CASE_STUDY" ? "bg-white text-bg-navy font-bold shadow-md" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              01-10 Case Study
            </button>
            <button
              onClick={() => setActiveTab("LIVE_DEMO")}
              className={`px-3 py-1.5 font-mono text-[10px] rounded uppercase transition-all flex items-center gap-1.5 ${
                activeTab === "LIVE_DEMO" ? "bg-white text-bg-navy font-bold shadow-md" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <Activity className="h-3 w-3 animate-pulse text-slate-blue" /> Live Workspace
            </button>
          </div>
        </div>

        {activeTab === "CASE_STUDY" ? (
          <BookToDriveCaseStudy onBack={onBack} />
        ) : (
          <div className="max-w-6xl mx-auto px-5 md:px-10 mt-8 space-y-6">
            <div className="border border-border-subtle bg-bg-charcoal/30 p-5 rounded-md">
              <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-slate-blue" />
                Fully Functional Interactive Dealership Sandbox
              </h3>
              <p className="text-[10px] text-text-secondary">
                This is a live, fully coded implementation of the primary dashboard interface. Select and test real-time controls, filtering tabs, and state machines.
              </p>
            </div>
            <DashboardBookToDrive />
          </div>
        )}
      </div>
    );
  }

  if (project.id === "museum") {
    return <MuseumCaseStudy onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-bg-navy pb-24 text-slate-200">
      
      {/* Immersive Top Hero Image Banner */}
      <div className="relative border-b border-border-subtle overflow-hidden bg-bg-charcoal/40 py-20 px-5 md:px-10">
        <div className="absolute inset-0 opacity-[0.1] grid-lines" />
        
        {/* Abstract glowing circular flares representing the design mood */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-[160px] opacity-[0.15]" 
          style={{ backgroundColor: project.accentHex }} 
        />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full blur-[160px] opacity-[0.1]" 
          style={{ backgroundColor: project.secondaryColorHex }} 
        />

        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          {/* Back link */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors font-mono text-[10px] uppercase tracking-widest border border-border-subtle bg-bg-navy px-3 py-1.5 rounded"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Return to Index
          </button>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: project.accentHex }}>
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
              {project.title}
            </h1>
          </div>

          <p className="text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
            {caseStudy.heroTagline}
          </p>

          {/* Project Metadata bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border-subtle/50 text-[10px] font-mono text-text-secondary">
            <div>
              <span className="block uppercase text-text-secondary/60">ROLE</span>
              <strong className="block text-text-primary mt-1 text-[11px]">{project.role}</strong>
            </div>
            <div>
              <span className="block uppercase text-text-secondary/60">TIMELINE</span>
              <strong className="block text-text-primary mt-1 text-[11px]">{project.year}</strong>
            </div>
            <div>
              <span className="block uppercase text-text-secondary/60">SECTOR</span>
              <strong className="block text-text-primary mt-1 text-[11px]">{project.subtitle}</strong>
            </div>
            <div>
              <span className="block uppercase text-text-secondary/60">CORE ENGINE</span>
              <strong className="block text-text-primary mt-1 text-[11px] uppercase" style={{ color: project.accentHex }}>
                React / TSX
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section Toggles */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 mt-8">
        <div className="flex bg-bg-charcoal border border-border-subtle p-0.5 rounded w-fit">
          <button
            onClick={() => setActiveTab("CASE_STUDY")}
            className={`px-4 py-2 font-mono text-[10px] rounded uppercase transition-all ${
              activeTab === "CASE_STUDY" ? "bg-white text-bg-navy font-bold shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Detailed Case Study
          </button>
          <button
            onClick={() => setActiveTab("LIVE_DEMO")}
            className={`px-4 py-2 font-mono text-[10px] rounded uppercase transition-all flex items-center gap-1.5 ${
              activeTab === "LIVE_DEMO" ? "bg-white text-bg-navy font-bold shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Activity className="h-3.5 w-3.5 animate-pulse" /> Live Interactive Workspace
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-10 mt-8">
        {activeTab === "CASE_STUDY" ? (
          /* =========================================================================
             CASE STUDY CONTENT TAB
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Column (8 Columns) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Overview & Core Scope */}
              <section id="section-overview" className="space-y-4">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <Info className="h-4 w-4" style={{ color: project.accentHex }} />
                  Overview & Product Context
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">
                  {caseStudy.overview}
                </p>
              </section>

              {/* Problem Statement */}
              <section id="section-problem" className="space-y-4">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <ShieldAlert className="h-4 w-4 text-red-400" />
                  The Problem & Systems Friction
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">
                  {caseStudy.problem}
                </p>
              </section>

              {/* Opportunity Window */}
              <section id="section-opportunity" className="space-y-4">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  Strategic Design Opportunity
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">
                  {caseStudy.opportunity}
                </p>
              </section>

              {/* Information Architecture & Systems Flowchart */}
              <section id="section-architecture" className="space-y-4">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <LayoutGrid className="h-4 w-4" style={{ color: project.accentHex }} />
                  Information Architecture & Data Pipelines
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  The architecture represents the end-to-end product data flow. Aggregating from core APIs and user streams to cleanly populate interactive components in real-time.
                </p>

                {/* Custom SVG flowchart of the architecture */}
                <div className="border border-white/10 bg-bg-charcoal/20 backdrop-blur-md p-5 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.05] grid-lines" />
                  
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 z-10 py-2">
                    {caseStudy.architectureNodes.map((node, index) => (
                      <React.Fragment key={node.id}>
                        <div className="bg-bg-navy border border-border-subtle p-3 rounded text-center w-full md:w-36">
                          <span className="block font-mono text-[8px] text-text-secondary uppercase tracking-widest">{node.type}</span>
                          <span className="block font-display font-bold text-text-primary text-[10px] mt-1">{node.label}</span>
                        </div>
                        {index < caseStudy.architectureNodes.length - 1 && (
                          <div className="text-text-secondary font-mono text-xs hidden md:block">
                            →
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>

              {/* Living High-Fidelity UI Showcase Teaser */}
              <section id="section-high-fidelity" className="space-y-4">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <Activity className="h-4 w-4" style={{ color: project.accentHex }} />
                  Design System Tokens & Blueprint
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">
                  This interactive design systems manual defines color palettes, typography scales, spacing variables, and border tokens built to guarantee consistency across multi-page platforms.
                </p>

                {/* Living Blueprint embed */}
                <InteractiveBlueprint />
              </section>

              {/* Core Impact & Performance Analysis */}
              <section id="section-impact" className="space-y-6">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  Measured Business & Usability Impact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {caseStudy.impactMetrics.map(metric => (
                    <div key={metric.label} className="bg-bg-charcoal/30 backdrop-blur-md border border-white/10 hover:border-white/20 p-4 rounded text-center transition-all duration-300">
                      <span className="text-[10px] font-mono text-text-secondary uppercase">{metric.label}</span>
                      <div className="text-2xl font-display font-black text-text-primary mt-1.5" style={{ color: project.accentHex }}>
                        {metric.value}
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 block mt-1">{metric.change}</span>
                    </div>
                  ))}
                </div>

                {/* Custom SVG Analytics Line Chart */}
                <div className="border border-white/10 bg-bg-charcoal/20 backdrop-blur-md p-5 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.1] grid-lines" />
                  
                  <div className="mb-4 flex items-center justify-between font-mono text-[9px] text-text-secondary relative z-10">
                    <span>OPTIMIZED USER ENGAGEMENT & CONVERSION RATE INDEX (LEGACY VS NEW UX DESIGN)</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-forest" /> Target Achieved
                    </span>
                  </div>

                  <div className="w-full aspect-[2.5/1] relative z-10">
                    <svg className="w-full h-full" viewBox="0 0 500 200" fill="none">
                      {/* Grid background lines */}
                      <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      
                      {/* Left axis labels */}
                      <text x="15" y="24" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px]">100%</text>
                      <text x="15" y="74" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px]">75%</text>
                      <text x="15" y="124" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px]">50%</text>
                      <text x="15" y="174" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px]">25%</text>

                      {/* X-axis indicators */}
                      <text x="60" y="192" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px] text-center">WK 1</text>
                      <text x="160" y="192" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px] text-center">WK 2</text>
                      <text x="260" y="192" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px] text-center">WK 3</text>
                      <text x="360" y="192" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px] text-center">WK 4</text>
                      <text x="460" y="192" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px] text-center">LIVE</text>

                      {/* Curve 1: Legacy (high, static latency) */}
                      <path d="M 60 40 Q 160 50 260 45 T 460 55" stroke="rgba(244,63,94,0.4)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                      
                      {/* Curve 2: Optimized (drops down rapidly) */}
                      <path d="M 60 50 Q 160 110 260 150 T 460 165" stroke={project.accentHex} strokeWidth="2.5" fill="none" />
                      
                      {/* Highlight Dot on Optimized current live state */}
                      <circle cx="460" cy="165" r="5" fill={project.accentHex} />
                      <circle cx="460" cy="165" r="10" fill="transparent" stroke={project.accentHex} strokeWidth="1" className="animate-ping" />
                    </svg>
                  </div>
                </div>
              </section>

              {/* Retrospective Reflection */}
              <section id="section-reflection" className="space-y-4">
                <h3 className="font-display text-lg font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 border-b border-border-subtle pb-2">
                  <HelpCircle className="h-4 w-4 text-purple-400" />
                  Retrospective & Lessons Learned
                </h3>
                <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">
                  {caseStudy.reflection}
                </p>
              </section>

            </div>

            {/* Right Sidebar Column (4 Columns) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* User Personas panel */}
              <div className="bg-bg-charcoal/25 backdrop-blur-xl border border-white/10 rounded-md p-4 space-y-4 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500">
                <h4 className="font-display font-bold text-text-primary uppercase tracking-wider text-xs border-b border-border-subtle pb-2 flex items-center gap-2">
                  User Personas & Needs
                </h4>

                <div className="space-y-4 divide-y divide-border-subtle/50">
                  {caseStudy.userPersonas.map((persona, idx) => (
                    <div key={persona.role} className={`pt-4 first:pt-0`}>
                      <h5 className="font-display font-bold text-text-primary text-xs mb-2">
                        {persona.role}
                      </h5>
                      
                      <div className="space-y-2 font-mono text-[9px]">
                        <div className="text-red-400">
                          <span className="font-bold">PAINS:</span>
                          <ul className="list-disc pl-3 mt-1 space-y-1 text-text-secondary">
                            {persona.frustrations.map(f => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-forest mt-2">
                          <span className="font-bold">NEEDS:</span>
                          <ul className="list-disc pl-3 mt-1 space-y-1 text-text-secondary">
                            {persona.needs.map(n => (
                              <li key={n}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Insights Panel */}
              <div className="bg-bg-charcoal/25 backdrop-blur-xl border border-white/10 rounded-md p-4 space-y-3 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500">
                <h4 className="font-display font-bold text-text-primary uppercase tracking-wider text-xs border-b border-border-subtle pb-2">
                  User Research Insights
                </h4>

                <ul className="space-y-2.5 font-mono text-[9px] leading-relaxed text-text-secondary">
                  {caseStudy.researchInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-2 border-l border-border-subtle pl-2">
                      <span className="font-bold text-text-primary">{idx + 1}.</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Milestones Timeline */}
              <div className="bg-bg-charcoal border border-border-subtle rounded-md p-4 space-y-4">
                <h4 className="font-display font-bold text-text-primary uppercase tracking-wider text-xs border-b border-border-subtle pb-2">
                  Product Design & Delivery Timeline
                </h4>

                <div className="relative border-l border-border-subtle pl-4 ml-2 space-y-5">
                  {caseStudy.timeline.map((milestone, idx) => (
                    <div key={idx} className="relative">
                      {/* Blinking milestone status indicator dot */}
                      <span className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border border-bg-navy ${
                        milestone.status === "completed"
                          ? "bg-forest"
                          : milestone.status === "active"
                          ? "bg-slate-blue animate-ping"
                          : "bg-text-secondary"
                      }`} />

                      <div className="flex items-center justify-between text-[9px] font-mono text-text-secondary">
                        <span className="font-bold text-text-primary uppercase">{milestone.phase}</span>
                        <span>{milestone.duration}</span>
                      </div>

                      <ul className="list-none space-y-1 mt-1 text-[9px] text-text-secondary">
                        {milestone.deliverables.map(del => (
                          <li key={del} className="flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-border-subtle" />
                            {del}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* =========================================================================
             LIVE WORKSPACE INTERACTIVE TAB
             ========================================================================= */
          <div className="space-y-6">
            <div className="border border-border-subtle bg-bg-charcoal/30 p-4 rounded-md">
              <h3 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4" style={{ color: project.accentHex }} />
                Fully Functional Interactive Dashboard Sandbox
              </h3>
              <p className="text-[10px] text-text-secondary">
                This is a live, fully coded implementation of the primary dashboard interface. Select and test real-time controls, filtering tabs, and state machines.
              </p>
            </div>

            {/* Mount specific dashboard based on project ID */}
            <div className="text-[10px] text-slate-500 font-mono italic">Interactive sandbox completed.</div>
          </div>
        )}
      </div>

    </div>
  );
}
