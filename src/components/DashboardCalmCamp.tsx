import React, { useState, useEffect, useRef } from "react";
import { Activity, Bell, BellOff, Users, Clock, Flame, ShieldAlert, Heart, Brain, Wind, Plus, Trash2 } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  triageCategory: "CRITICAL" | "SERIOUS" | "STABLE";
  condition: string;
  hr: number;
  bp: string;
  spO2: number;
  temp: string;
  bed: string;
  admittedAt: string;
}

export default function DashboardCalmCamp() {
  const [patients, setPatients] = useState<Patient[]>([
    { id: "P-101", name: "Marcus Thorne", age: 54, gender: "M", triageCategory: "CRITICAL", condition: "Acute STEMI Trend", hr: 114, bp: "158/98", spO2: 91, temp: "37.4°C", bed: "Resus-01", admittedAt: "05:12" },
    { id: "P-102", name: "Elena Rostova", age: 31, gender: "F", triageCategory: "CRITICAL", condition: "Severe Respiratory Distress", hr: 122, bp: "110/68", spO2: 88, temp: "38.9°C", bed: "Resus-02", admittedAt: "05:28" },
    { id: "P-103", name: "Jonathan Wu", age: 42, gender: "M", triageCategory: "SERIOUS", condition: "Subdural Hematoma Observation", hr: 58, bp: "134/82", spO2: 97, temp: "36.8°C", bed: "Bed-09", admittedAt: "05:35" },
    { id: "P-104", name: "Clara Mendoza", age: 67, gender: "F", triageCategory: "SERIOUS", condition: "Decompensated Heart Failure", hr: 96, bp: "142/90", spO2: 94, temp: "37.1°C", bed: "Bed-12", admittedAt: "05:15" },
    { id: "P-105", name: "Devon Vance", age: 24, gender: "M", triageCategory: "STABLE", condition: "Suspected Distal Radius Fracture", hr: 78, bp: "122/80", spO2: 99, temp: "36.6°C", bed: "Waiting-04", admittedAt: "05:40" }
  ]);

  const [selectedPatientId, setSelectedPatientId] = useState<string>("P-101");
  const [filter, setFilter] = useState<"ALL" | "CRITICAL" | "SERIOUS" | "STABLE">("ALL");
  const [mutedAlarms, setMutedAlarms] = useState<Record<string, boolean>>({ "P-101": false, "P-102": true });
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientCondition, setNewPatientCondition] = useState("");
  const [newPatientSeverity, setNewPatientSeverity] = useState<"CRITICAL" | "SERIOUS" | "STABLE">("SERIOUS");
  
  // Real-time Waveform Rendering via canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  useEffect(() => {
    // Vital fluctuation simulator
    const interval = setInterval(() => {
      setPatients(prev =>
        prev.map(p => {
          const hrDelta = Math.floor(Math.random() * 5) - 2;
          const spO2Delta = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          return {
            ...p,
            hr: Math.max(40, Math.min(180, p.hr + hrDelta)),
            spO2: Math.max(75, Math.min(100, p.spO2 + spO2Delta))
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Telemetry Waveform Animation (ECG & Respiration)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.fillStyle = "#1D2433";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vital wave calculation based on selected patient's heart rate
      const currentPatient = selectedPatient;
      const hr = currentPatient ? currentPatient.hr : 80;
      const criticalState = currentPatient && currentPatient.triageCategory === "CRITICAL";

      // 1. ECG Signal (Channel 1)
      ctx.strokeStyle = criticalState ? "#F43F5E" : "#10B981";
      ctx.lineWidth = 2;
      ctx.beginPath();

      const cycleLength = (60 / hr) * 200; // how many pixels per beat
      for (let i = 0; i < canvas.width; i++) {
        const x = i;
        let y = canvas.height * 0.35; // base level for channel 1

        const localOffset = (i + offset) % cycleLength;
        // Construct standard PQRST complex
        if (localOffset > 0 && localOffset < 10) {
          // P Wave
          y -= Math.sin((localOffset / 10) * Math.PI) * 8;
        } else if (localOffset >= 15 && localOffset < 20) {
          // Q Wave (slight dip)
          y += ((localOffset - 15) / 5) * 6;
        } else if (localOffset >= 20 && localOffset < 26) {
          // R Wave (tall spike)
          const pct = (localOffset - 20) / 6;
          y -= Math.sin(pct * Math.PI) * 55;
        } else if (localOffset >= 26 && localOffset < 30) {
          // S Wave (deep dip)
          const pct = (localOffset - 26) / 4;
          y += Math.sin(pct * Math.PI) * 14;
        } else if (localOffset >= 40 && localOffset < 55) {
          // T Wave (broad recovery)
          const pct = (localOffset - 40) / 15;
          y -= Math.sin(pct * Math.PI) * 12;
        }

        // Add minor telemetry jitter
        y += (Math.random() - 0.5) * 1.5;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // 2. Respiratory Pleth wave (Channel 2)
      ctx.strokeStyle = "#5B7FFF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i++) {
        const x = i;
        const respFreq = 0.015;
        const baseHeight = canvas.height * 0.75;
        let y = baseHeight + Math.sin((i + offset) * respFreq) * 25;
        y += Math.sin((i + offset) * 0.05) * 2.5; // additive respiratory noise

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Titles for channels
      ctx.font = "10px JetBrains Mono";
      ctx.fillStyle = "#94A3B8";
      ctx.fillText(`CH1: Telemetry (ECG) - Live HR: ${hr} BPM`, 15, 25);
      ctx.fillStyle = "#5B7FFF";
      ctx.fillText(`CH2: SpO2 Pleth wave - Pulse Amplitude`, 15, canvas.height * 0.58);

      offset += 3.5;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedPatientId, selectedPatient]);

  const toggleMute = (pId: string) => {
    setMutedAlarms(prev => ({ ...prev, [pId]: !prev[pId] }));
  };

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName) return;

    const newPatient: Patient = {
      id: `P-${100 + patients.length + 1}`,
      name: newPatientName,
      age: Math.floor(Math.random() * 60) + 18,
      gender: Math.random() > 0.5 ? "M" : "F",
      triageCategory: newPatientSeverity,
      condition: newPatientCondition || "General Observation",
      hr: newPatientSeverity === "CRITICAL" ? 115 : (newPatientSeverity === "SERIOUS" ? 95 : 72),
      bp: newPatientSeverity === "CRITICAL" ? "150/95" : "120/80",
      spO2: newPatientSeverity === "CRITICAL" ? 90 : 98,
      temp: "37.0°C",
      bed: newPatientSeverity === "CRITICAL" ? `Resus-0${Math.floor(Math.random() * 3) + 3}` : `Bed-${Math.floor(Math.random() * 10) + 15}`,
      admittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    };

    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);
    setNewPatientName("");
    setNewPatientCondition("");
  };

  const handleDeletePatient = (pId: string) => {
    setPatients(prev => prev.filter(p => p.id !== pId));
    if (selectedPatientId === pId) {
      const remaining = patients.filter(p => p.id !== pId);
      if (remaining.length > 0) {
        setSelectedPatientId(remaining[0].id);
      }
    }
  };

  const filteredPatients = patients.filter(
    p => filter === "ALL" || p.triageCategory === filter
  );

  return (
    <div id="calmcamp-live-dashboard" className="w-full text-xs font-sans text-slate-200 bg-bg-navy border border-border-subtle rounded-md shadow-2xl overflow-hidden">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border-subtle bg-bg-charcoal px-5 py-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-forest/20 text-forest border border-forest/30 animate-pulse">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-text-primary uppercase tracking-wider">CalmCamp Enterprise Workspace</h4>
            <p className="text-[10px] font-mono text-text-secondary">EHR V3.8 // SECURE CHANNEL // FHIR-READY</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] bg-bg-navy border border-border-subtle px-3 py-1.5 rounded text-text-secondary">
          <Clock className="h-3 w-3 text-forest animate-pulse" />
          <span>STATION MONITOR: SECTOR_7_ER</span>
        </div>
      </div>

      {/* Grid Layout of the Clinical Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Patient Feed / List */}
        <div className="lg:col-span-5 border-r border-border-subtle flex flex-col h-[520px]">
          <div className="p-3 border-b border-border-subtle bg-bg-charcoal flex items-center justify-between gap-2">
            <div className="flex gap-1">
              {(["ALL", "CRITICAL", "SERIOUS", "STABLE"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-2 py-1 text-[9px] font-mono rounded border transition-all ${
                    filter === cat
                      ? "bg-text-primary text-bg-navy border-text-primary font-bold"
                      : "bg-transparent text-text-secondary border-border-subtle hover:bg-hover-subtle"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-text-secondary">Count: {filteredPatients.length}</span>
          </div>

          {/* Patient Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-border-subtle">
            {filteredPatients.map(p => {
              const isSelected = p.id === selectedPatientId;
              const isMuted = mutedAlarms[p.id];
              const isCritical = p.triageCategory === "CRITICAL";

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`group p-3 flex items-start justify-between gap-3 cursor-pointer transition-all ${
                    isSelected ? "bg-hover-subtle border-l-2 border-forest" : "hover:bg-hover-subtle/50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-1.5 py-0.5 text-[9px] font-mono rounded font-bold ${
                        p.triageCategory === "CRITICAL"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : p.triageCategory === "SERIOUS"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        {p.triageCategory}
                      </span>
                      <span className="font-mono text-text-secondary text-[10px]">{p.id}</span>
                      <span className="font-mono text-text-secondary text-[10px]">Bed {p.bed}</span>
                    </div>

                    <h5 className="font-display text-xs font-bold text-text-primary truncate">{p.name}, {p.age}{p.gender}</h5>
                    <p className="text-[10px] text-text-secondary truncate mt-0.5">{p.condition}</p>
                  </div>

                  {/* Vitals snapshot on list item */}
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 font-mono font-bold text-text-primary">
                        <Heart className={`h-3 w-3 ${isCritical && !isMuted ? "text-red-500 animate-bounce" : "text-emerald-400"}`} />
                        <span>{p.hr}</span>
                      </div>
                      <div className="text-[9px] font-mono text-text-secondary">SpO2: {p.spO2}%</div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute(p.id);
                        }}
                        className={`p-1.5 rounded border transition-colors ${
                          isMuted
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-bg-charcoal text-text-secondary border-border-subtle hover:text-text-primary"
                        }`}
                        title={isMuted ? "Alarm Muted" : "Mute Alarm"}
                      >
                        {isMuted ? <BellOff className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePatient(p.id);
                        }}
                        className="p-1.5 rounded border border-border-subtle bg-bg-charcoal text-text-secondary hover:text-red-400 hover:border-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                        title="Discharge Patient"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredPatients.length === 0 && (
              <div className="p-8 text-center text-text-secondary">
                No telemetry streams matching filter criteria.
              </div>
            )}
          </div>

          {/* Quick Add Patient Panel */}
          <form onSubmit={handleCreatePatient} className="p-3 border-t border-border-subtle bg-bg-charcoal flex flex-col gap-2">
            <h6 className="font-mono text-[9px] text-text-secondary uppercase tracking-widest font-bold">Fast-Inbound Registration</h6>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={newPatientName}
                onChange={e => setNewPatientName(e.target.value)}
                placeholder="Patient Name"
                className="bg-bg-navy border border-border-subtle rounded px-2.5 py-1.5 text-[10px] text-text-primary focus:outline-none focus:border-forest"
              />
              <input
                type="text"
                value={newPatientCondition}
                onChange={e => setNewPatientCondition(e.target.value)}
                placeholder="Principal Complaint"
                className="bg-bg-navy border border-border-subtle rounded px-2.5 py-1.5 text-[10px] text-text-primary focus:outline-none focus:border-forest"
              />
            </div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <div className="flex gap-1">
                {(["CRITICAL", "SERIOUS", "STABLE"] as const).map(sev => (
                  <button
                    type="button"
                    key={sev}
                    onClick={() => setNewPatientSeverity(sev)}
                    className={`px-1.5 py-0.5 text-[8px] font-mono rounded border ${
                      newPatientSeverity === sev
                        ? "bg-white text-bg-navy border-white font-bold"
                        : "bg-transparent text-text-secondary border-border-subtle"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="flex items-center gap-1 bg-forest/20 text-forest border border-forest/30 hover:bg-forest/30 transition-colors px-2.5 py-1 rounded font-mono text-[9px] font-bold"
              >
                <Plus className="h-3 w-3" /> REGISTER
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: High Fidelity Patient Detail & Telemetry Display */}
        <div className="lg:col-span-7 flex flex-col h-[520px] bg-bg-navy">
          {selectedPatient ? (
            <div className="flex-1 flex flex-col">
              
              {/* Telemetry Header */}
              <div className="p-4 border-b border-border-subtle bg-bg-charcoal flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-text-secondary">WAVEFORM MONITOR</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-forest animate-ping" />
                    <span className="font-mono text-[9px] text-forest">ECG_CH1_ACTIVE</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-text-primary">{selectedPatient.name}</h3>
                  <p className="text-[10px] text-text-secondary mt-0.5">
                    ID: {selectedPatient.id} // Sex: {selectedPatient.gender} // Age: {selectedPatient.age} // Loc: Bed {selectedPatient.bed}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-text-secondary">EST. DISPATCH LATENCY</span>
                  <div className="text-sm font-mono font-bold text-text-primary mt-1">
                    {selectedPatient.triageCategory === "CRITICAL" ? "04:12 min" : "11:45 min"}
                  </div>
                  <span className="text-[8px] font-mono text-text-secondary uppercase">Priority Redundant Triage</span>
                </div>
              </div>

              {/* Dynamic Canvas Area */}
              <div className="p-3 bg-bg-navy border-b border-border-subtle flex-1 flex flex-col justify-center relative">
                {mutedAlarms[selectedPatient.id] && (
                  <div className="absolute top-2 right-2 bg-red-500/15 border border-red-500/30 text-red-400 px-2 py-1 rounded font-mono text-[8px] tracking-wider z-10">
                    ALARMS SILENCED
                  </div>
                )}
                <div className="w-full h-full min-h-[220px] rounded border border-border-subtle overflow-hidden">
                  <canvas ref={canvasRef} width={460} height={240} className="w-full h-full" />
                </div>
              </div>

              {/* Patient Physiological Parameters Grid */}
              <div className="grid grid-cols-4 border-b border-border-subtle bg-bg-charcoal text-center divide-x divide-border-subtle">
                <div className="p-3">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-text-secondary font-mono mb-1">
                    <Heart className="h-3 w-3 text-red-500" /> HR
                  </div>
                  <div className="text-sm font-mono font-bold text-text-primary">
                    {selectedPatient.hr} <span className="text-[9px] text-text-secondary font-normal">BPM</span>
                  </div>
                  <div className="text-[8px] font-mono text-emerald-400">STABLE</div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-text-secondary font-mono mb-1">
                    <ShieldAlert className="h-3 w-3 text-amber-500" /> BLOOD PRESSURE
                  </div>
                  <div className="text-sm font-mono font-bold text-text-primary">
                    {selectedPatient.bp}
                  </div>
                  <div className="text-[8px] font-mono text-text-secondary">SYS/DIA</div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-text-secondary font-mono mb-1">
                    <Wind className="h-3 w-3 text-slate-blue" /> SpO2
                  </div>
                  <div className="text-sm font-mono font-bold text-text-primary">
                    {selectedPatient.spO2}%
                  </div>
                  <div className="text-[8px] font-mono text-red-400">{selectedPatient.spO2 < 93 ? "HYPOXIC WARNING" : "OPTIMAL"}</div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-text-secondary font-mono mb-1">
                    <Brain className="h-3 w-3 text-purple-400" /> TEMPERATURE
                  </div>
                  <div className="text-sm font-mono font-bold text-text-primary">
                    {selectedPatient.temp}
                  </div>
                  <div className="text-[8px] font-mono text-text-secondary">TYMPANIC</div>
                </div>
              </div>

              {/* Bottom Operational Intelligence panel */}
              <div className="p-3.5 bg-bg-navy flex items-center justify-between text-[10px] font-mono text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-forest" />
                  <span>INTEGRATION STATUS: <strong>FHIR CLIENT SYNC OK</strong></span>
                </div>
                <span>EMERGENCY SEVERITY INDEX (ESI): {selectedPatient.triageCategory === "CRITICAL" ? "LEVEL 1" : "LEVEL 2"}</span>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-secondary p-8">
              <Activity className="h-10 w-10 text-border-subtle mb-3 animate-pulse" />
              <span>Select a patient stream to mount high-fidelity vital telemetry telemetry.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
