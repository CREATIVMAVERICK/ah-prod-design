import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Landmark, Upload, ArrowDown } from "lucide-react";

interface MuseumCaseStudyProps {
  onBack: () => void;
}

interface Exhibit {
  id: string;
  number: string;
  title: string;
  historicalContext: string;
  supportingTitle: string;
  supportingContext: string;
  reflectionTitle: string;
  reflection: string;
  layout: "centered" | "editorial-left" | "editorial-right" | "full-width" | "magazine" | "left-heavy" | "right-heavy" | "editorial-finale";
  aspectRatio: string;
}

const EXHIBITS: Exhibit[] = [
  {
    id: "exhibit_1",
    number: "01",
    title: "The Arrival Portal",
    historicalContext: "The first point of contact with any digital archive is the gateway itself. In the early days of the web, splash pages served as transitionary thresholds—warm invitations that requested visitors to pause, adjust their display resolution, and prepare for a different pace of exploration.",
    supportingTitle: "Curator's Observation",
    supportingContext: "The design uses generous negative space and deep, light-absorbing backdrops to establish a quiet atmosphere. It acts as an acoustic baffle, dampening the high-frequency noise of the modern web before the visitor proceeds.",
    reflectionTitle: "Lessons Learned",
    reflection: "Slowing down the user journey is a powerful design device. By intentionally introducing a gateway, we create anticipation and shift the user's mental model from passive consumption to active, respectful viewing.",
    layout: "centered",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_2",
    number: "02",
    title: "The Grand Entrance Lobby",
    historicalContext: "Entering a physical archive gives an immediate sense of scale and permanence. The Grand Entrance translates this physical architecture into a digital viewport, using clean structural guides, quiet margins, and persistent anchor points to organize decades of fragmented culture into a single, cohesive narrative.",
    supportingTitle: "Historical Importance",
    supportingContext: "Early online spaces were often hyper-dense and cluttered. The Grand Entrance lobby demonstrates how a highly disciplined, asymmetric grid system can organize high-value editorial imagery and text without feeling overwhelming.",
    reflectionTitle: "Creative Reflection",
    reflection: "Structural balance does not require perfect symmetry. By aligning elements with an off-center visual weight, the interface feels dynamic yet secure, drawing the eye naturally down the timeline.",
    layout: "editorial-left",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_3",
    number: "03",
    title: "The Museum Directory",
    historicalContext: "A directory is more than a list of secondary pages; it is a conceptual map of a digital civilization. It cataloges the transition of human networks from raw, physical text protocols into rich, emotional cultural centers.",
    supportingTitle: "Why It Matters",
    supportingContext: "The directory was designed with extreme typographic restraint, letting structural numbers and fine grid lines do the work. It reads like a luxury exhibition brochure rather than an interactive utility console.",
    reflectionTitle: "Design Decisions",
    reflection: "By treating navigation as high-end editorial content, the user interface remains integrated and calm, preventing secondary menus from competing with primary gallery exhibits.",
    layout: "editorial-right",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_4",
    number: "04",
    title: "The Gallery Hall",
    historicalContext: "Physical museums use transitionary corridors to let the visitor's eyes rest between intense visual displays. The Gallery Hall represents this clean, quiet corridor—a space of pure negative space designed to let the mind digest the previous story before entering dense thematic rooms.",
    supportingTitle: "Editorial Notes",
    supportingContext: "This section expands across the full container width, centering a magnificent, tall portrait canvas. Spacing is intentionally vast, allowing the screenshot's architectural proportions to command the entire visual field.",
    reflectionTitle: "Lessons Learned",
    reflection: "Blank space is not wasted space; it is the frame that gives value to the painting. Embracing empty canvas allows complex screens to feel manageable, deliberate, and exceptionally premium.",
    layout: "full-width",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_5",
    number: "05",
    title: "The Artifact Exhibit",
    historicalContext: "Before the web became abstract and cloud-hosted, it was physical. Floppy disks, external modems, and printed user manuals carried the early data packets. This room honors the tangible artifacts that made our digital culture possible.",
    supportingTitle: "Curator's Observation",
    supportingContext: "The layout pairs dense descriptive columns alongside the portrait frame, mimicking the pacing of an art magazine. Bold serif numbers and offset text blocks create a rich, tactile rhythm.",
    reflectionTitle: "Creative Reflection",
    reflection: "Integrating hardware history into a digital museum grounds the experience, reminding visitors that every byte we see was once physically pushed through real copper wires.",
    layout: "magazine",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_6",
    number: "06",
    title: "The First Tweet",
    historicalContext: "On March 21, 2006, co-founder Jack Dorsey typed and published the world's first tweet: 'just setting up my twttr.' This marked the beginning of microblogging, compressing human communication into rigid, urgent 140-character packets.",
    supportingTitle: "Historical Importance",
    supportingContext: "This exhibit isolates that single status line, removing the modern feed wrapper, ads, and engagement counters to focus strictly on the raw moment of digital broadcast.",
    reflectionTitle: "Why It Matters",
    reflection: "Isolating a single digital relic allows us to appreciate its cultural gravity. When stripped of noise, simple text updates carry the weight of an archaeological inscription.",
    layout: "centered",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_7",
    number: "07",
    title: "Nyan Cat & Digital Folklore",
    historicalContext: "In April 2011, a simple 8-bit animation of a pixelated cat flying through space became a global viral sensation. It illustrated the rise of community-driven folklore and shared humor, transforming raw utility networks into human neighborhoods.",
    supportingTitle: "Design Decisions",
    supportingContext: "A left-heavy layout presents the screenshot as the anchor on the left, with details of community-led digital art and looping animation mechanics floating gracefully on the right.",
    reflectionTitle: "Editorial Notes",
    reflection: "Memes are the hieroglyphs of our modern era. Highlighting them with premium typography and editorial structure treats digital vernacular with the academic respect it deserves.",
    layout: "left-heavy",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_8",
    number: "08",
    title: "The Rickroll Link",
    historicalContext: "The bait-and-switch trick of redirecting users to Rick Astley's music video created a permanent monument to internet playfulness. It established the hyperlink as a tool for shared humor and community bonding.",
    supportingTitle: "Lessons Learned",
    supportingContext: "We frame the historical link mechanics and early video stills on the right side of the screen, creating a visual progression that builds anticipation before the visitor interacts.",
    reflectionTitle: "Creative Reflection",
    reflection: "Trust and surprise are core components of interactive storytelling. The Rickroll is a beautiful reminder that the web is a living, human space built on collective participation.",
    layout: "right-heavy",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_9",
    number: "09",
    title: "The Connection Chamber",
    historicalContext: "The early web was a loose constellation of isolated, quirky bulletin boards and forums. Over three decades, these separate islands consolidated into a continuous, hyper-connected global canvas.",
    supportingTitle: "Historical Importance",
    supportingContext: "To represent this vast network, the connection chamber layout is expansive. The screenshot spans the full page, mapping out the connections that joined separate human nodes together.",
    reflectionTitle: "Design Decisions",
    reflection: "Visualizing abstract structures requires massive scales. The full-screen viewport provides the necessary breathing room to trace complex relational pathways without feeling cramped.",
    layout: "full-width",
    aspectRatio: "aspect-[3/4.2]"
  },
  {
    id: "exhibit_10",
    number: "10",
    title: "Final Exploration Room",
    historicalContext: "The Final Exploration Room is not the end of the museum—it is an invitation to continue discovering the ever-evolving history of the internet. After exploring the defining moments, artifacts, and cultural milestones of the digital age, visitors are encouraged to look beyond this exhibition and recognize that the story of the internet is still being written.",
    supportingTitle: "Curator's Reflection",
    supportingContext: "The internet is a living archive. Technologies evolve, platforms change, and communities transform, but their influence continues to shape how we communicate, create, and connect. This final space reminds visitors that every digital innovation has the potential to become tomorrow's history.",
    reflectionTitle: "Design Reflection",
    reflection: "This final exhibit was intentionally designed as an open, spacious environment that slows the pace of the journey. Generous spacing, restrained typography, and a single visual focal point create a calm conclusion, allowing visitors to reflect on the exhibition before continuing their own exploration.",
    layout: "editorial-finale",
    aspectRatio: "aspect-[3/4.2]"
  }
];

function ExhibitScreenshotSlot({
  exhibitId,
  title,
  imgSrc,
  onUpload,
  onClear
}: {
  exhibitId: string;
  title: string;
  imgSrc: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="relative w-full group/slot z-10 transition-all duration-500 max-w-3xl mx-auto">
      {/* Exquisite minimal border framing */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-white/20 pointer-events-none group-hover/slot:border-purple-400/40 transition-colors duration-300" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-white/20 pointer-events-none group-hover/slot:border-purple-400/40 transition-colors duration-300" />
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-white/20 pointer-events-none group-hover/slot:border-purple-400/40 transition-colors duration-300" />
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-white/20 pointer-events-none group-hover/slot:border-purple-400/40 transition-colors duration-300" />

      {/* Frame Container */}
      <div className="relative w-full rounded bg-[#040508] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/10">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id={`upload-${exhibitId}`}
        />

        {imgSrc ? (
          <div className="relative w-full bg-[#020204] flex flex-col items-center">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-auto object-contain select-none block"
              referrerPolicy="no-referrer"
            />
            {/* Minimal overlay to swap or clear */}
            <div className="absolute inset-0 bg-black/95 opacity-0 hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-all duration-300 p-6 text-center z-20">
              <Upload className="h-5 w-5 text-purple-400" />
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white block mb-1">Replace Screenshot</span>
                <span className="font-mono text-[8px] text-slate-400 block max-w-xs leading-relaxed">Select a new vertical screenshot to swap this slot.</span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-[8px] font-mono uppercase bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded transition-colors cursor-pointer"
                >
                  Choose File
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  className="px-3 py-1.5 text-[8px] font-mono uppercase bg-red-950/20 border border-red-500/20 text-red-400 rounded hover:bg-red-950/40 transition-colors cursor-pointer"
                >
                  Clear Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[3/4.2] flex flex-col justify-between p-6 select-none">
            {/* Top Label */}
            <div className="flex items-center justify-between font-mono text-[8px] text-slate-500 tracking-widest uppercase">
              <span>Exhibit {exhibitId.replace("exhibit_", "")}</span>
              <span>Awaiting Portrait Screenshot</span>
            </div>

            {/* Centered Placeholder Copy */}
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="h-10 w-10 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]">
                <Landmark className="h-4 w-4 text-slate-500 group-hover/slot:text-purple-400 transition-colors duration-500" />
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.15em] font-medium block">
                  Exhibition Screenshot Slot
                </span>
                <p className="font-mono text-[8px] text-slate-600 uppercase tracking-wide max-w-xs mx-auto leading-normal">
                  Proportion preserved container (70-80% viewport weight). Click below to overlay your designed portrait screen.
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-[8px] font-mono tracking-widest uppercase text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="h-3 w-3 text-purple-400" />
                Upload Screenshot
              </button>
            </div>

            {/* Empty footer to keep the design clean and unadorned */}
            <div className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MuseumCaseStudy({ onBack }: MuseumCaseStudyProps) {
  // State for all 10 images, pre-loaded from localStorage for client persistence
  const [images, setImages] = useState<Record<string, string>>(() => {
    const saved: Record<string, string> = {};
    for (let i = 1; i <= 10; i++) {
      const img = localStorage.getItem(`museum_exhibit_img_${i}`);
      if (img) {
        saved[`exhibit_${i}`] = img;
      }
    }
    return saved;
  });

  const handleUpload = (exhibitId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setImages(prev => ({ ...prev, [exhibitId]: dataUrl }));
        try {
          localStorage.setItem(`museum_exhibit_img_${exhibitId.replace("exhibit_", "")}`, dataUrl);
        } catch (err) {
          console.warn("Could not save to localStorage (probably quota exceeded).", err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = (exhibitId: string) => {
    setImages(prev => {
      const updated = { ...prev };
      delete updated[exhibitId];
      return updated;
    });
    localStorage.removeItem(`museum_exhibit_img_${exhibitId.replace("exhibit_", "")}`);
  };

  const clearAllScreenshots = () => {
    if (window.confirm("Are you sure you want to clear all uploaded screenshots from this gallery?")) {
      for (let i = 1; i <= 10; i++) {
        localStorage.removeItem(`museum_exhibit_img_${i}`);
      }
      setImages({});
    }
  };

  return (
    <div className="min-h-screen bg-[#030407] pb-40 text-slate-300 relative font-sans overflow-x-hidden selection:bg-purple-900/30 selection:text-white">
      {/* Ultra-subtle, slow ambient lighting to simulate physical lights focusing on artwork */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1000px] rounded-full blur-[250px] opacity-[0.03] pointer-events-none bg-purple-900 z-0" />
      <div className="absolute top-[35%] right-20 w-[600px] h-[600px] rounded-full blur-[220px] opacity-[0.02] pointer-events-none bg-indigo-950 z-0" />
      <div className="absolute bottom-[25%] left-20 w-[700px] h-[700px] rounded-full blur-[260px] opacity-[0.03] pointer-events-none bg-purple-950 z-0" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 pt-10">
        
        {/* =========================================================================
           TOP CONTROL BAR
           ========================================================================= */}
        <div className="flex items-center justify-between border-b border-white/5 pb-8 gap-4 mb-24">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-[9px] uppercase tracking-widest border border-white/5 bg-[#080B12]/40 px-3.5 py-1.5 rounded"
          >
            <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
            Back to Index
          </button>

          <div className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-slate-500 font-medium">
            Exhibition Catalogue
          </div>

          <div className="flex items-center gap-3">
            {Object.keys(images).length > 0 && (
              <button
                onClick={clearAllScreenshots}
                className="px-2.5 py-1.5 bg-red-950/10 hover:bg-red-900/20 border border-red-500/15 text-red-400 hover:text-red-300 transition-all rounded font-mono text-[8px] uppercase tracking-wider cursor-pointer"
              >
                Clear Catalogue
              </button>
            )}
            <div className="bg-[#080B12]/40 border border-white/5 rounded px-3 py-1.5 font-mono text-[8.5px] text-slate-400">
              <span className="text-purple-400 font-bold tracking-normal">{Object.keys(images).length} / 10</span> CAPTURES LOADED
            </div>
          </div>
        </div>

        {/* =========================================================================
           CURATOR'S NOTE (INTRODUCTION)
           ========================================================================= */}
        <div className="max-w-3xl mx-auto space-y-12 mb-36 py-12 text-center sm:text-left">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-purple-400 uppercase tracking-[0.25em] block">
              Curator's Note
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-light text-white tracking-tight leading-none uppercase">
              The Internet changes faster <br className="hidden sm:inline" />
              <span className="font-normal text-slate-400">than history can preserve it.</span>
            </h1>
          </div>
          
          <div className="w-16 h-[1px] bg-white/10 mx-auto sm:mx-0" />

          <div className="text-base sm:text-lg text-slate-400 leading-relaxed font-sans font-light space-y-6 max-w-2xl">
            <p className="first-letter:text-3xl first-letter:font-light first-letter:text-white first-letter:float-left first-letter:mr-2">
              Websites disappear. Communities fade. Platforms evolve. Digital memories quietly vanish.
            </p>
            <p>
              The Museum of the Internet reimagines the web as a curated exhibition preserving the moments, interfaces and cultural artifacts that shaped our online lives.
            </p>
          </div>
        </div>

        {/* =========================================================================
           10 EXHIBIT SECTIONS (ALTERNATNG LAYOUT RHYTHM)
           ========================================================================= */}
        <div className="space-y-44">
          {EXHIBITS.map((exhibit, index) => {
            const isLoaded = !!images[exhibit.id];
            
            return (
              <div key={exhibit.id} id={exhibit.id} className="scroll-mt-24 space-y-12">
                
                {/* 1. CENTERED LAYOUT (Exhibit 01, Exhibit 06) */}
                {exhibit.layout === "centered" && (
                  <div className="w-full">
                    {/* Header text blocks */}
                    <div className="max-w-2xl mx-auto text-center space-y-6 mb-16">
                      <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                        EXHIBIT {exhibit.number}
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-display font-normal text-white uppercase tracking-tight">
                        {exhibit.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light max-w-xl mx-auto">
                        {exhibit.historicalContext}
                      </p>
                    </div>

                    {/* Screenshot Hero container (Takes 70-80% content width) */}
                    <div className="w-full max-w-2xl mx-auto mb-16">
                      <ExhibitScreenshotSlot
                        exhibitId={exhibit.id}
                        title={exhibit.title}
                        imgSrc={images[exhibit.id] || null}
                        onUpload={(file) => handleUpload(exhibit.id, file)}
                        onClear={() => handleClear(exhibit.id)}
                      />
                    </div>

                    {/* Footer supporting/reflection text blocks */}
                    <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/5 pt-8 text-left">
                      <div className="space-y-2">
                        <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                          {exhibit.supportingTitle}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.supportingContext}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                          {exhibit.reflectionTitle}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.reflection}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. EDITORIAL LEFT LAYOUT (Exhibit 02) */}
                {exhibit.layout === "editorial-left" && (
                  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Hero Screenshot Frame on Left (7 Columns) */}
                    <div className="lg:col-span-8 w-full max-w-2xl mx-auto">
                      <ExhibitScreenshotSlot
                        exhibitId={exhibit.id}
                        title={exhibit.title}
                        imgSrc={images[exhibit.id] || null}
                        onUpload={(file) => handleUpload(exhibit.id, file)}
                        onClear={() => handleClear(exhibit.id)}
                      />
                    </div>

                    {/* Story Editorial on Right (4 Columns) */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                      <div className="space-y-3">
                        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                          EXHIBIT {exhibit.number}
                        </span>
                        <h2 className="text-3xl font-display font-normal text-white uppercase tracking-tight">
                          {exhibit.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                        {exhibit.historicalContext}
                      </p>

                      <div className="border-t border-white/5 pt-6 space-y-2">
                        <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                          {exhibit.supportingTitle}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.supportingContext}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-6 space-y-2">
                        <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                          {exhibit.reflectionTitle}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.reflection}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. EDITORIAL RIGHT LAYOUT (Exhibit 03) */}
                {exhibit.layout === "editorial-right" && (
                  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Story Editorial on Left (4 Columns) */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 order-last lg:order-first">
                      <div className="space-y-3">
                        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                          EXHIBIT {exhibit.number}
                        </span>
                        <h2 className="text-3xl font-display font-normal text-white uppercase tracking-tight">
                          {exhibit.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                        {exhibit.historicalContext}
                      </p>

                      <div className="border-t border-white/5 pt-6 space-y-2">
                        <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                          {exhibit.supportingTitle}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.supportingContext}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-6 space-y-2">
                        <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                          {exhibit.reflectionTitle}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.reflection}
                        </p>
                      </div>
                    </div>

                    {/* Hero Screenshot Frame on Right (7 Columns) */}
                    <div className="lg:col-span-8 w-full max-w-2xl mx-auto">
                      <ExhibitScreenshotSlot
                        exhibitId={exhibit.id}
                        title={exhibit.title}
                        imgSrc={images[exhibit.id] || null}
                        onUpload={(file) => handleUpload(exhibit.id, file)}
                        onClear={() => handleClear(exhibit.id)}
                      />
                    </div>
                  </div>
                )}

                {/* 4. FULL WIDTH LAYOUT (Exhibit 04, Exhibit 09) */}
                {exhibit.layout === "full-width" && (
                  <div className="w-full space-y-12">
                    <div className="max-w-4xl mx-auto border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                      <div className="space-y-3 max-w-xl">
                        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                          EXHIBIT {exhibit.number}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-normal text-white uppercase tracking-tight">
                          {exhibit.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.historicalContext}
                        </p>
                      </div>
                      
                      <div className="space-y-4 max-w-xs">
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.supportingTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.supportingContext}
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.reflectionTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.reflection}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full max-w-3xl mx-auto">
                      <ExhibitScreenshotSlot
                        exhibitId={exhibit.id}
                        title={exhibit.title}
                        imgSrc={images[exhibit.id] || null}
                        onUpload={(file) => handleUpload(exhibit.id, file)}
                        onClear={() => handleClear(exhibit.id)}
                      />
                    </div>
                  </div>
                )}

                {/* 5. MAGAZINE LAYOUT (Exhibit 05) */}
                {exhibit.layout === "magazine" && (
                  <div className="w-full space-y-12">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-white/5 pb-8">
                      <div className="md:col-span-8 space-y-4">
                        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                          EXHIBIT {exhibit.number}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-normal text-white uppercase tracking-tight leading-none">
                          {exhibit.title}
                        </h2>
                      </div>
                      <div className="md:col-span-4 text-left md:text-right">
                        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-medium">
                          MAGAZINE SPECS // 10 CHRONICLES
                        </span>
                      </div>
                    </div>

                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                      {/* Left: Two columns of sophisticated narrative text */}
                      <div className="lg:col-span-5 space-y-8">
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                          {exhibit.historicalContext}
                        </p>
                        
                        <div className="border-t border-white/5 pt-6 space-y-2">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.supportingTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.supportingContext}
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-6 space-y-2">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.reflectionTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.reflection}
                          </p>
                        </div>
                      </div>

                      {/* Right: Frame Container */}
                      <div className="lg:col-span-7 w-full max-w-2xl mx-auto">
                        <ExhibitScreenshotSlot
                          exhibitId={exhibit.id}
                          title={exhibit.title}
                          imgSrc={images[exhibit.id] || null}
                          onUpload={(file) => handleUpload(exhibit.id, file)}
                          onClear={() => handleClear(exhibit.id)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. LEFT HEAVY LAYOUT (Exhibit 07) */}
                {exhibit.layout === "left-heavy" && (
                  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Screenshot dominates Left (8 Columns) */}
                    <div className="lg:col-span-8 w-full max-w-2xl mx-auto">
                      <ExhibitScreenshotSlot
                        exhibitId={exhibit.id}
                        title={exhibit.title}
                        imgSrc={images[exhibit.id] || null}
                        onUpload={(file) => handleUpload(exhibit.id, file)}
                        onClear={() => handleClear(exhibit.id)}
                      />
                    </div>

                    {/* Concise text on Right (4 Columns) */}
                    <div className="lg:col-span-4 space-y-6">
                      <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                        EXHIBIT {exhibit.number}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-normal text-white uppercase tracking-tight">
                        {exhibit.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                        {exhibit.historicalContext}
                      </p>

                      <div className="border-t border-white/5 pt-6 space-y-4">
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.supportingTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.supportingContext}
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.reflectionTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.reflection}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. RIGHT HEAVY LAYOUT (Exhibit 08) */}
                {exhibit.layout === "right-heavy" && (
                  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Concise text on Left (4 Columns) */}
                    <div className="lg:col-span-4 space-y-6 order-last lg:order-first">
                      <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                        EXHIBIT {exhibit.number}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-normal text-white uppercase tracking-tight">
                        {exhibit.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                        {exhibit.historicalContext}
                      </p>

                      <div className="border-t border-white/5 pt-6 space-y-4">
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.supportingTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.supportingContext}
                          </p>
                        </div>
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-slate-500 font-bold block uppercase tracking-widest">
                            {exhibit.reflectionTitle}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
                            {exhibit.reflection}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot dominates Right (8 Columns) */}
                    <div className="lg:col-span-8 w-full max-w-2xl mx-auto">
                      <ExhibitScreenshotSlot
                        exhibitId={exhibit.id}
                        title={exhibit.title}
                        imgSrc={images[exhibit.id] || null}
                        onUpload={(file) => handleUpload(exhibit.id, file)}
                        onClear={() => handleClear(exhibit.id)}
                      />
                    </div>
                  </div>
                )}

                {/* 8. EDITORIAL FINALE LAYOUT (Exhibit 10) */}
                {exhibit.layout === "editorial-finale" && (
                  <div className="w-full py-6">
                    <div className="max-w-3xl mx-auto space-y-8">
                      <div className="border-l border-white/10 pl-6 sm:pl-10 space-y-4">
                        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] font-medium block">
                          EXHIBIT {exhibit.number} // FINAL EXPLORATION ROOM
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-display font-light text-white uppercase tracking-tight leading-none">
                          {exhibit.title}
                        </h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                        <p>{exhibit.historicalContext}</p>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[8px] text-slate-500 font-bold uppercase tracking-widest block">
                              {exhibit.supportingTitle}
                            </span>
                            <p className="text-xs leading-relaxed font-sans text-slate-400 font-light">
                              {exhibit.supportingContext}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="font-mono text-[8px] text-slate-500 font-bold uppercase tracking-widest block">
                              {exhibit.reflectionTitle}
                            </span>
                            <p className="text-xs leading-relaxed font-sans text-slate-400 font-light">
                              {exhibit.reflection}
                            </p>
                          </div>
                          {exhibit.id === "exhibit_10" && (
                            <div className="space-y-1 pt-2 border-t border-white/5">
                              <span className="font-mono text-[8px] text-slate-500 font-bold uppercase tracking-widest block">
                                Curator's Closing Note
                              </span>
                              <p className="text-xs leading-relaxed font-sans text-slate-400 font-light">
                                The Museum of the Internet has no true ending. As long as people continue to create, share, and connect online, new stories will emerge, new artifacts will appear, and this collection will continue to grow.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full max-w-2xl mx-auto pt-4">
                        <ExhibitScreenshotSlot
                          exhibitId={exhibit.id}
                          title={exhibit.title}
                          imgSrc={images[exhibit.id] || null}
                          onUpload={(file) => handleUpload(exhibit.id, file)}
                          onClear={() => handleClear(exhibit.id)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Minimal, beautiful progress transition line (Exhibit XX / 10) */}
                {index < EXHIBITS.length - 1 && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <span className="font-mono text-[8px] text-slate-600 uppercase tracking-[0.25em] mb-4">
                      Exhibit {exhibit.number} / 10
                    </span>
                    <div className="h-12 w-[1px] bg-gradient-to-b from-white/10 to-transparent relative">
                      <ArrowDown className="h-3 w-3 text-slate-600 absolute -bottom-4 -left-[5px] stroke-[1px]" />
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* =========================================================================
           MEMORABLE EMOTIONAL CLOSING (THANK YOU FOR VISITING)
           ========================================================================= */}
        <div className="border-t border-white/5 bg-gradient-to-b from-[#06080E]/40 to-transparent rounded-lg p-10 md:p-16 text-center max-w-4xl mx-auto mt-40 relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="relative w-12 h-12 mx-auto flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-full">
              <Landmark className="h-5 w-5 text-purple-400" />
            </div>
            
            <div className="space-y-4 max-w-xl mx-auto">
              <h3 className="font-display font-light text-3xl sm:text-4xl text-white uppercase tracking-tight">
                Thank You For Visiting
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-light">
                Every website eventually changes. Every platform evolves. Every digital artifact becomes history. This museum exists to preserve those moments before they disappear.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-6 font-mono text-[8px] text-slate-500 uppercase tracking-[0.25em] font-medium">
              <span>Portrait Exhibit Grid</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span>Aspect-Ratio Preservation</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span>10 Cultural Chapters</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
