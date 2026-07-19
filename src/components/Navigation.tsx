import React, { useState, useEffect } from "react";
import { Terminal, Shield, RefreshCw } from "lucide-react";

interface NavigationProps {
  onNavigateHome: () => void;
  onNavigateBlueprint: () => void;
  activeSection: string;
}

export default function Navigation({ onNavigateHome, onNavigateBlueprint, activeSection }: NavigationProps) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#060913]/70 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
        
        {/* Identity & Status */}
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="font-display font-black text-sm tracking-widest text-text-primary hover:text-white transition-colors uppercase flex items-center gap-2"
          >
            <span className="h-6 w-6 bg-white text-black rounded-lg flex items-center justify-center text-[10px] font-mono font-black shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              Ω
            </span>
            <span className="font-bold tracking-widest">AH // PROD.DESIGN</span>
          </button>

          <span className="h-4 w-px bg-white/[0.06] hidden sm:inline-block" />

          {/* Availability Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-wider shadow-[0_2px_10px_rgba(16,185,129,0.02)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AVAILABLE FOR CONTRACTS
          </div>
        </div>

        {/* Global Live Ticker Clock */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-2 font-mono text-[9px] text-text-secondary bg-white/[0.02] px-3.5 py-1.5 border border-white/[0.04] rounded-full">
            <Terminal className="h-3 w-3 text-emerald-400" />
            <span className="tracking-widest uppercase opacity-60">CURRENT TIME (UTC):</span>
            <span className="text-text-primary font-bold">{timeStr}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.01] border border-white/[0.03] p-1 rounded-full">
            <button
              onClick={onNavigateHome}
              className={`px-3.5 py-1.5 font-mono text-[9px] rounded-full uppercase transition-premium tracking-wider ${
                activeSection === "home"
                  ? "bg-white/[0.08] text-white font-bold border border-white/10 shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
              }`}
            >
              Projects
            </button>
            <button
              onClick={onNavigateBlueprint}
              className={`px-3.5 py-1.5 font-mono text-[9px] rounded-full uppercase transition-premium tracking-wider ${
                activeSection === "blueprint"
                  ? "bg-white/[0.08] text-white font-bold border border-white/10 shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
              }`}
            >
              Design Tokens
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
