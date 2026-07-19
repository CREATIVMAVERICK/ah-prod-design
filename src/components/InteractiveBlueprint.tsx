import React, { useState } from "react";
import { Copy, Layers, Type, Move, ToggleLeft, Check, Compass, Eye, Terminal } from "lucide-react";

export default function InteractiveBlueprint() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const colors = [
    { name: "Primary Background", hex: "#0B1020", utility: "bg-bg-navy", desc: "Deep dark navy canvas minimizing night shift fatigue" },
    { name: "Secondary Surface", hex: "#171B26", utility: "bg-bg-charcoal", desc: "Structured panel surface for tabular navigation feeds" },
    { name: "Card Surface", hex: "#1D2433", utility: "bg-bg-card", desc: "High contrast canvas grouping telemetry parameters" },
    { name: "Primary Accent", hex: "#10B981", utility: "text-forest", desc: "Signal green indicating stable physiological trends" },
    { name: "Secondary Accent", hex: "#5B7FFF", utility: "text-slate-blue", desc: "Electric blue indicating energetic test-drive operations" },
    { name: "Highlight Accent", hex: "#5B2A86", utility: "text-plum", desc: "Nostalgic deep plum reflecting digital internet heritage" }
  ];

  const fonts = [
    { role: "Display Headings", family: "Space Grotesk", weight: "700 Bold", tracking: "-0.02em", css: "font-display font-bold tracking-tight text-text-primary" },
    { role: "General Reading", family: "Inter", weight: "400 Normal", tracking: "0", css: "font-sans font-normal text-text-secondary leading-relaxed" },
    { role: "Technical Telemetry", family: "JetBrains Mono", weight: "500 Medium", tracking: "0", css: "font-mono font-medium text-text-secondary" }
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div 
      id="interactive-design-blueprint" 
      onMouseMove={handleMouseMove}
      className="w-full text-xs font-sans text-slate-200 glass-panel spotlight-card rounded-2xl shadow-2xl overflow-hidden border border-white/[0.04]"
    >
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/[0.04] bg-white/[0.01] px-6 py-5 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-forest/20 text-forest border border-forest/30">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-text-primary uppercase tracking-wider">SYSTEMS ARCHITECTURE: DESIGN TOKENS</h4>
            <p className="text-[10px] font-mono text-text-secondary">DESIGN_MANUAL_V2.1 // COPYS HEX VALUE ON SWATCH CLICK</p>
          </div>
        </div>

        <span className="font-mono text-[9px] text-forest bg-forest/10 border border-forest/20 px-2.5 py-1 rounded">
          SYSTEM: STRICT_GRID_12
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.04]">
        
        {/* Left Column: Color and Type Tokens */}
        <div className="p-5 space-y-6">
          
          {/* Colors */}
          <div>
            <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-3">
              <Compass className="h-3.5 w-3.5 text-forest" />
              1. Color Palette Matrix
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {colors.map(col => (
                <div
                  key={col.hex}
                  onClick={() => handleCopy(col.hex)}
                  className="group bg-white/[0.02] border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.04] p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-premium"
                >
                  <div className={`h-8 w-8 rounded flex-shrink-0 border border-white/5`} style={{ backgroundColor: col.hex }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-text-primary text-[11px] truncate">{col.name}</span>
                      {copiedToken === col.hex ? (
                        <Check className="h-3 w-3 text-forest" />
                      ) : (
                        <Copy className="h-3 w-3 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[8px] font-mono text-text-secondary">
                      <span>{col.hex}</span>
                      <span>•</span>
                      <span>{col.utility}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-3">
              <Type className="h-3.5 w-3.5 text-forest" />
              2. Typographic Pairings
            </h5>

            <div className="space-y-3">
              {fonts.map(font => (
                <div key={font.role} className="bg-[#060913]/40 border border-white/[0.03] p-4 rounded-xl">
                  <div className="flex items-center justify-between font-mono text-[8px] text-text-secondary uppercase mb-2">
                    <span>{font.role}</span>
                    <span>{font.family} // {font.weight} // Track: {font.tracking}</span>
                  </div>
                  
                  <div className={`${font.css} text-sm`}>
                    {font.family === "JetBrains Mono" ? "1024_BYTE_SYSTEM_OK" : "Designing complex software pipelines."}
                  </div>
                  <div className="mt-1 text-[8px] font-mono text-text-secondary">
                    CLASS: {font.css}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Spacing and UI Element Blueprints */}
        <div className="p-5 space-y-6">
          
          {/* Spacing & Rhythm */}
          <div>
            <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-3">
              <Move className="h-3.5 w-3.5 text-forest" />
              3. Spacing Grid & Rhythm
            </h5>

            <div className="bg-[#060913]/30 border border-white/[0.03] p-4 rounded-xl space-y-2">
              <p className="text-[10px] text-text-secondary mb-3 leading-relaxed">
                Consistent structural grid layout based on a standard 4px pixel increment scale. This maintains flawless vertical and horizontal alignment ratios across full-screen dashboards.
              </p>

              <div className="space-y-2">
                {[
                  { size: "2px", label: "0.5 // Minimalist Separation", px: 2, barW: "w-2" },
                  { size: "4px", label: "1 // Badge Internal Pad", px: 4, barW: "w-4" },
                  { size: "8px", label: "2 // Component Spacing", px: 8, barW: "w-8" },
                  { size: "16px", label: "4 // Card Inner Margin", px: 16, barW: "w-16" },
                  { size: "32px", label: "8 // Section Division", px: 32, barW: "w-32" }
                ].map(sp => (
                  <div key={sp.size} className="flex items-center gap-3">
                    <span className="w-20 font-mono text-[9px] text-text-secondary">{sp.size} ({sp.label})</span>
                    <div className="flex-1 bg-white/[0.01] border border-white/[0.04] h-5 rounded overflow-hidden flex items-center px-1">
                      <div className={`h-3 bg-forest/30 border border-forest/40 ${sp.barW} rounded-sm`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive UI States Blueprints */}
          <div>
            <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-3">
              <ToggleLeft className="h-3.5 w-3.5 text-forest" />
              4. Interactive Component States
            </h5>

            <div className="grid grid-cols-2 gap-2">
              
              <div className="p-4 border border-white/[0.03] bg-white/[0.01] rounded-xl flex flex-col justify-between h-24">
                <div className="font-mono text-[8px] text-text-secondary uppercase">Button: Standard</div>
                <button className="bg-white/[0.03] hover:bg-white/[0.08] text-text-primary border border-white/[0.06] px-3.5 py-2 rounded-full transition-premium font-mono text-[9px] uppercase font-black text-left">
                  EXECUTE TASK
                </button>
              </div>

              <div className="p-4 border border-white/[0.03] bg-white/[0.01] rounded-xl flex flex-col justify-between h-24">
                <div className="font-mono text-[8px] text-text-secondary uppercase">Button: Highlight</div>
                <button className="bg-forest text-bg-navy hover:bg-emerald-400 px-3.5 py-2 rounded-full transition-premium font-mono text-[9px] uppercase font-black text-left">
                  DISPATCH PIPELINE
                </button>
              </div>

              <div className="p-4 border border-white/[0.03] bg-white/[0.01] rounded-xl flex flex-col justify-between h-24">
                <div className="font-mono text-[8px] text-text-secondary uppercase">Telemetry Badge</div>
                <div className="flex">
                  <span className="inline-flex items-center gap-1 bg-forest/10 border border-forest/30 text-forest px-2.5 py-1 rounded-full font-mono text-[9px] font-black uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
                    LIVE_FEED_OK
                  </span>
                </div>
              </div>

              <div className="p-4 border border-white/[0.03] bg-white/[0.01] rounded-xl flex flex-col justify-between h-24">
                <div className="font-mono text-[8px] text-text-secondary uppercase">Diagnostic Console</div>
                <div className="font-mono text-[8px] text-forest flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-forest animate-pulse" />
                  <span>SYS_STABLE_VER_8.1</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
