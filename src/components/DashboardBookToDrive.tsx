import React, { useState, useEffect } from "react";
import { 
  Car, MapPin, Compass, Shield, Users, ArrowRight, Gauge, Layers, 
  RefreshCw, Sparkles, CheckCircle, FileText, CreditCard, ShieldCheck, 
  UserCheck, Check 
} from "lucide-react";

interface FleetVehicle {
  id: string;
  model: string;
  status: "LOT" | "DRIVE" | "MAINTENANCE";
  charge: number; // percentage
  location: string; // row or route
  consultant?: string;
  odometer: string;
}

interface Lead {
  id: string;
  name: string;
  vehicleOfInterest: string;
  score: number; // 0-100 predictive lead scoring
  stage: "Inbound" | "Contacted" | "Test Drive" | "Contract";
  phone: string;
}

export default function DashboardBookToDrive() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([
    { id: "V-901", model: "Porsche Taycan 4S", status: "LOT", charge: 92, location: "Grid-A3", odometer: "4,210 mi" },
    { id: "V-902", model: "Tesla Model S Plaid", status: "DRIVE", charge: 64, location: "I-285 Loop", consultant: "Lucas K.", odometer: "12,450 mi" },
    { id: "V-903", model: "Audi e-tron GT", status: "LOT", charge: 88, location: "Grid-B1", odometer: "1,890 mi" },
    { id: "V-904", model: "Porsche 911 GT3", status: "DRIVE", charge: 45, location: "State Route 9", consultant: "Sarah J.", odometer: "840 mi" },
    { id: "V-905", model: "BMW i7 M70", status: "MAINTENANCE", charge: 31, location: "Bay 3", odometer: "6,720 mi" }
  ]);

  const [leads, setLeads] = useState<Lead[]>([
    { id: "L-501", name: "Alexander Vance", vehicleOfInterest: "Porsche Taycan 4S", score: 94, stage: "Test Drive", phone: "+1 (555) 902-1244" },
    { id: "L-502", name: "Katherine Sterling", vehicleOfInterest: "Audi e-tron GT", score: 87, stage: "Contacted", phone: "+1 (555) 341-9871" },
    { id: "L-503", name: "Reginald Pierce", vehicleOfInterest: "Porsche 911 GT3", score: 62, stage: "Inbound", phone: "+1 (555) 762-2110" },
    { id: "L-504", name: "Sophia Martinez", vehicleOfInterest: "Tesla Model S Plaid", score: 98, stage: "Contract", phone: "+1 (555) 890-4432" },
    { id: "L-505", name: "David Thorne", vehicleOfInterest: "BMW i7 M70", score: 48, stage: "Inbound", phone: "+1 (555) 412-8821" }
  ]);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("V-901");
  const [activeTab, setActiveTab] = useState<"CRM" | "FLEET_MAP" | "UNDERWRITING" | "DOCS">("CRM");
  const [toast, setToast] = useState<string | null>(null);

  // Underwriting Simulator States
  const [underwriteLeadId, setUnderwriteLeadId] = useState<string>("L-501");
  const [underwriteVehicleId, setUnderwriteVehicleId] = useState<string>("V-901");
  const [isUnderwriting, setIsUnderwriting] = useState<boolean>(false);
  const [underwriteStep, setUnderwriteStep] = useState<string>("");
  const [underwriteProgress, setUnderwriteProgress] = useState<number>(0);
  const [underwriteResult, setUnderwriteResult] = useState<{
    score: number;
    decision: string;
    dti: number;
    approvedApr: number;
    termMonths: number;
    downPayment: number;
    monthlyPayment: string;
    carPrice: number;
  } | null>(null);

  // Document Signing States
  const [scanLeadId, setScanLeadId] = useState<string>("L-501");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scannedData, setScannedData] = useState<{
    licenseNo: string;
    expDate: string;
    dob: string;
    address: string;
    status: string;
  } | null>(null);
  const [signatureData, setSignatureData] = useState<string>("");
  const [isSigned, setIsSigned] = useState<boolean>(false);

  // Triggering visual feedback Toast
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Simulate vehicle telematics updates in the background
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev =>
        prev.map(v => {
          if (v.status === "DRIVE") {
            const chargeDrop = Math.random() > 0.6 ? 1 : 0;
            return {
              ...v,
              charge: Math.max(10, v.charge - chargeDrop)
            };
          }
          return v;
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const moveLeadStage = (leadId: string) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          let nextStage: Lead["stage"] = "Inbound";
          if (l.stage === "Inbound") nextStage = "Contacted";
          else if (l.stage === "Contacted") nextStage = "Test Drive";
          else if (l.stage === "Test Drive") nextStage = "Contract";
          else if (l.stage === "Contract") nextStage = "Inbound"; // wrap around for loop
          
          showToast(`Lead ${l.name} updated to stage [${nextStage.toUpperCase()}]`);
          return { ...l, stage: nextStage };
        }
        return l;
      })
    );
  };

  const dispatchTestDrive = (vId: string, leadName: string) => {
    setVehicles(prev =>
      prev.map(v => {
        if (v.id === vId) {
          if (v.status !== "LOT") {
            showToast(`Vehicle ${v.model} is currently unavailable.`);
            return v;
          }
          showToast(`SUCCESS: ${v.model} dispatched with client ${leadName}`);
          return {
            ...v,
            status: "DRIVE",
            location: "Pre-Route Alfa",
            consultant: "Alex V."
          };
        }
        return v;
      })
    );
  };

  const returnVehicle = (vId: string) => {
    setVehicles(prev =>
      prev.map(v => {
        if (v.id === vId && v.status === "DRIVE") {
          showToast(`SUCCESS: ${v.model} safely checked back into primary lot grid.`);
          return {
            ...v,
            status: "LOT",
            location: "Grid-A3",
            consultant: undefined
          };
        }
        return v;
      })
    );
  };

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div id="booktodrive-live-crm" className="w-full text-xs font-sans text-slate-200 bg-bg-navy border border-border-subtle rounded-md shadow-2xl overflow-hidden">
      
      {/* Interactive Toast Alert */}
      {toast && (
        <div className="bg-bg-charcoal border-l-2 border-slate-blue text-text-primary px-4 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider absolute bottom-5 right-5 z-50 rounded shadow-2xl animate-bounce">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-slate-blue" />
            <span>{toast}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border-subtle bg-bg-charcoal px-5 py-4 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-blue/20 text-slate-blue border border-slate-blue/30">
            <Car className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-text-primary uppercase tracking-wider">BookToDrive Dealership Cockpit</h4>
            <p className="text-[10px] font-mono text-text-secondary">CRM V6.2 // REAL-TIME FLEET TELEMETRICS</p>
          </div>
        </div>

        <div className="flex bg-bg-navy border border-border-subtle p-0.5 rounded overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab("CRM")}
            className={`px-2.5 py-1.5 font-mono text-[9px] rounded uppercase transition-all whitespace-nowrap ${
              activeTab === "CRM" ? "bg-slate-blue text-white font-bold" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Lead CRM Pipeline
          </button>
          <button
            onClick={() => setActiveTab("FLEET_MAP")}
            className={`px-2.5 py-1.5 font-mono text-[9px] rounded uppercase transition-all whitespace-nowrap ${
              activeTab === "FLEET_MAP" ? "bg-slate-blue text-white font-bold" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Live Lot Map
          </button>
          <button
            onClick={() => setActiveTab("UNDERWRITING")}
            className={`px-2.5 py-1.5 font-mono text-[9px] rounded uppercase transition-all whitespace-nowrap ${
              activeTab === "UNDERWRITING" ? "bg-slate-blue text-white font-bold" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Lender Underwriter
          </button>
          <button
            onClick={() => setActiveTab("DOCS")}
            className={`px-2.5 py-1.5 font-mono text-[9px] rounded uppercase transition-all whitespace-nowrap ${
              activeTab === "DOCS" ? "bg-slate-blue text-white font-bold" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            E-Sign Waivers
          </button>
        </div>
      </div>

      {activeTab === "CRM" && (
        /* TAB 1: CRM LEAD PIPELINE & DISPATCH ENGINE */
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Kanban CRM Pipeline (Left 7 Columns) */}
          <div className="lg:col-span-7 p-4 border-r border-border-subtle bg-bg-navy h-[480px] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
              <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-slate-blue" />
                Active Sales Prospects
              </h5>
              <span className="font-mono text-[9px] text-text-secondary uppercase">Click Card To Advance Stage</span>
            </div>

            {/* Pipeline Columns */}
            <div className="grid grid-cols-4 gap-2 flex-1">
              {(["Inbound", "Contacted", "Test Drive", "Contract"] as const).map(colStage => {
                const stageLeads = leads.filter(l => l.stage === colStage);
                return (
                  <div key={colStage} className="flex flex-col bg-bg-charcoal/50 border border-border-subtle p-2 rounded min-h-[340px]">
                    <div className="flex items-center justify-between border-b border-border-subtle/50 pb-1.5 mb-2">
                      <span className="font-mono text-[9px] font-bold text-text-primary uppercase truncate">{colStage}</span>
                      <span className="h-4 w-4 flex items-center justify-center rounded bg-bg-navy border border-border-subtle text-[8px] font-mono text-text-secondary">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {stageLeads.map(lead => (
                        <div
                          key={lead.id}
                          onClick={() => moveLeadStage(lead.id)}
                          className="bg-bg-card border border-border-subtle hover:border-slate-blue/40 p-2.5 rounded cursor-pointer transition-all hover:translate-y-[-2px]"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[8px] font-mono text-text-secondary">{lead.id}</span>
                            <div className={`px-1 rounded-full text-[8px] font-mono ${
                              lead.score > 85 ? "bg-forest/10 text-forest" : "bg-text-secondary/10 text-text-secondary"
                            }`}>
                              Score: {lead.score}
                            </div>
                          </div>
                          <h6 className="font-display font-bold text-text-primary mb-1">{lead.name}</h6>
                          <div className="flex items-center gap-1 text-[9px] text-text-secondary">
                            <Car className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lead.vehicleOfInterest}</span>
                          </div>
                          
                          <div className="mt-2 pt-1.5 border-t border-border-subtle/40 flex items-center justify-between text-[8px] font-mono text-text-secondary">
                            <span>Phone Logged</span>
                            <ArrowRight className="h-2.5 w-2.5 text-slate-blue" />
                          </div>
                        </div>
                      ))}

                      {stageLeads.length === 0 && (
                        <div className="text-center text-[9px] text-text-secondary p-4 border border-dashed border-border-subtle/40 rounded flex flex-col items-center justify-center h-full">
                          Empty Stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fleet Manager / Telemetry Detail (Right 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col bg-bg-charcoal h-[480px]">
            <div className="p-4 border-b border-border-subtle bg-bg-navy">
              <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2 mb-1">
                <Gauge className="h-3.5 w-3.5 text-slate-blue" />
                Fleet Telematics Terminal
              </h5>
              <p className="text-[9px] font-mono text-text-secondary">Select physical fleet asset to view telematics</p>
            </div>

            {/* Vehicle Selection list */}
            <div className="p-3 border-b border-border-subtle bg-bg-navy flex gap-2 overflow-x-auto">
              {vehicles.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`px-3 py-2 border rounded font-mono text-[9px] flex-shrink-0 text-left transition-all ${
                    v.id === selectedVehicleId
                      ? "bg-slate-blue/15 text-slate-blue border-slate-blue font-bold"
                      : "bg-bg-charcoal text-text-secondary border-border-subtle hover:text-text-primary"
                  }`}
                >
                  <div className="font-bold">{v.model}</div>
                  <div className="text-[8px] text-text-secondary flex items-center gap-1.5 mt-0.5">
                    <span className={`h-1 w-1 rounded-full ${
                      v.status === "LOT" ? "bg-forest" : v.status === "DRIVE" ? "bg-amber-400" : "bg-red-400"
                    }`} />
                    {v.status} // {v.charge}%
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Vehicle detailed telematics card */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-text-secondary">ASSET CODE: {selectedVehicle.id}</span>
                  <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                    selectedVehicle.status === "LOT"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : selectedVehicle.status === "DRIVE"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {selectedVehicle.status}
                  </span>
                </div>

                <h3 className="font-display text-sm font-bold text-text-primary mb-3">{selectedVehicle.model}</h3>

                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-bg-navy/50 border border-border-subtle p-3 rounded mb-4">
                  <div className="space-y-1.5">
                    <div className="text-text-secondary">Location Coordinate</div>
                    <div className="font-bold text-text-primary flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-blue" />
                      {selectedVehicle.location}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-text-secondary">Power Status</div>
                    <div className="font-bold text-text-primary flex items-center gap-1">
                      <Gauge className="h-3 w-3 text-forest" />
                      {selectedVehicle.charge}% SoC
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-2 pt-2 border-t border-border-subtle/50">
                    <div className="text-text-secondary">Odometer (Lifetime)</div>
                    <div className="font-bold text-text-primary">{selectedVehicle.odometer}</div>
                  </div>
                  <div className="space-y-1.5 mt-2 pt-2 border-t border-border-subtle/50">
                    <div className="text-text-secondary">Assigned Consultant</div>
                    <div className="font-bold text-text-primary">{selectedVehicle.consultant || "NONE - IN LOT"}</div>
                  </div>
                </div>

                {selectedVehicle.status === "DRIVE" && (
                  <div className="p-3 border border-amber-500/20 bg-amber-500/5 text-[10px] rounded leading-relaxed text-amber-300 flex items-start gap-2 mb-2">
                    <Compass className="h-4 w-4 flex-shrink-0 text-amber-500 animate-spin" />
                    <div>
                      <strong>TELEMETRY WARNING:</strong> Asset currently on public trial loop. Dynamic geofencing is <strong>active</strong>. Maximum speed restricted to 85mph.
                    </div>
                  </div>
                )}
              </div>

              {/* CRM Actions */}
              <div className="space-y-2 mt-4">
                {selectedVehicle.status === "LOT" ? (
                  <div className="space-y-2 bg-bg-navy border border-border-subtle p-3 rounded">
                    <div className="text-[9px] font-mono text-text-secondary uppercase mb-1">Dispatch Core Loop</div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => dispatchTestDrive(selectedVehicle.id, "Alexander Vance")}
                        className="flex-1 bg-slate-blue text-white hover:bg-slate-blue/90 font-mono text-[9px] py-2 rounded text-center font-bold tracking-wider uppercase transition-colors"
                      >
                        Dispatch Alex Vance
                      </button>
                      <button
                        onClick={() => dispatchTestDrive(selectedVehicle.id, "Katherine Sterling")}
                        className="flex-1 bg-transparent border border-border-subtle text-text-primary hover:bg-hover-subtle font-mono text-[9px] py-2 rounded text-center transition-colors"
                      >
                        Dispatch Katherine
                      </button>
                    </div>
                  </div>
                ) : selectedVehicle.status === "DRIVE" ? (
                  <button
                    onClick={() => returnVehicle(selectedVehicle.id)}
                    className="w-full bg-forest text-bg-navy hover:bg-forest/90 font-mono text-[9px] py-2.5 rounded text-center font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="h-4 w-4" /> SECURE RETRIEVAL & KEY CHECK-IN
                  </button>
                ) : (
                  <div className="p-2 border border-red-500/20 bg-red-500/5 text-center text-red-400 font-mono rounded text-[10px]">
                    ASSET CURRENTLY LOCKED IN WORKSHOP BAY
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "FLEET_MAP" && (
        /* TAB 2: LIVE LOT MAP GEOLOCATION VISUALIZER */
        <div className="p-4 bg-bg-navy h-[480px] flex flex-col justify-between">
          <div className="border-b border-border-subtle pb-3">
            <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-slate-blue" />
              Dealership Spatial Grid Map
            </h5>
            <p className="text-[10px] text-text-secondary mt-0.5">Real-time GPS coordinates of fleet vehicles inside dealership sector grids and active trial routes.</p>
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <div className="w-full max-w-lg aspect-[16/9] border border-border-subtle rounded-md bg-bg-charcoal/40 p-4 relative overflow-hidden">
              {/* Dynamic Coordinate Grid lines */}
              <div className="absolute inset-0 opacity-[0.15] grid-lines" />
              
              {/* Plot Map SVGs */}
              <svg className="w-full h-full" viewBox="0 0 600 300" fill="none">
                {/* Dealer Lot Boundary */}
                <rect x="20" y="20" width="380" height="260" rx="4" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="30" y="38" fill="rgba(255,255,255,0.25)" className="font-mono text-[8px] uppercase">DEALER PHYSICAL GRID</text>
                
                {/* Lot parking stalls lines */}
                <line x1="50" y1="60" x2="350" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="50" y1="120" x2="350" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="50" y1="180" x2="350" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                {/* Road Outbound Route representation */}
                <path d="M 400 150 Q 480 80 560 150 T 480 260" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                <text x="440" y="100" fill="rgba(255,255,255,0.2)" className="font-mono text-[8px] uppercase">PRE-ROUTE ALFA (ON ROAD)</text>

                {/* Stalls markers */}
                <rect x="60" y="75" width="40" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
                <text x="65" y="93" fill="rgba(255,255,255,0.15)" className="font-mono text-[7px]">GRID_A1</text>

                <rect x="120" y="75" width="40" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
                <text x="125" y="93" fill="rgba(255,255,255,0.15)" className="font-mono text-[7px]">GRID_A2</text>

                <rect x="180" y="75" width="40" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
                <text x="185" y="93" fill="rgba(255,255,255,0.15)" className="font-mono text-[7px]">GRID_A3</text>

                <rect x="60" y="135" width="40" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
                <text x="65" y="153" fill="rgba(255,255,255,0.15)" className="font-mono text-[7px]">GRID_B1</text>

                <rect x="120" y="135" width="40" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
                <text x="125" y="153" fill="rgba(255,255,255,0.15)" className="font-mono text-[7px]">GRID_B2</text>

                <rect x="180" y="135" width="40" height="30" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
                <text x="185" y="153" fill="rgba(255,255,255,0.15)" className="font-mono text-[7px]">GRID_B3</text>

                {/* Plot physical vehicle coordinate dots with real-time names */}
                
                {/* V-901 in Lot (Grid-A3, Stall 180, 75) */}
                <g className="cursor-pointer" onClick={() => setSelectedVehicleId("V-901")}>
                  <circle cx="200" cy="90" r="14" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" />
                  <circle cx="200" cy="90" r="5" fill="#10B981" />
                  <text x="220" y="93" fill="#F8FAFC" className="font-mono text-[8px] font-bold">V-901 (Taycan)</text>
                </g>

                {/* V-903 in Lot (Grid-B1, Stall 60, 135) */}
                <g className="cursor-pointer" onClick={() => setSelectedVehicleId("V-903")}>
                  <circle cx="80" cy="150" r="14" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" />
                  <circle cx="80" cy="150" r="5" fill="#10B981" />
                  <text x="100" y="153" fill="#F8FAFC" className="font-mono text-[8px] font-bold">V-903 (Audi)</text>
                </g>

                {/* V-902 on Drive (On Alpha pre-route x:460 y:100) */}
                <g className="cursor-pointer" onClick={() => setSelectedVehicleId("V-902")}>
                  <circle cx="460" cy="110" r="20" fill="rgba(91,127,255,0.15)" stroke="rgba(91,127,255,0.4)" className="animate-pulse" />
                  <circle cx="460" cy="110" r="6" fill="#5B7FFF" />
                  <text x="485" y="113" fill="#5B7FFF" className="font-mono text-[8px] font-bold">V-902 ACTIVE (Tesla)</text>
                </g>

                {/* V-904 on Drive (x: 520, y:180) */}
                <g className="cursor-pointer" onClick={() => setSelectedVehicleId("V-904")}>
                  <circle cx="510" cy="190" r="20" fill="rgba(91,127,255,0.15)" stroke="rgba(91,127,255,0.4)" className="animate-pulse" />
                  <circle cx="510" cy="190" r="6" fill="#5B7FFF" />
                  <text x="535" y="193" fill="#5B7FFF" className="font-mono text-[8px] font-bold">V-904 ACTIVE (911)</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="p-3 bg-bg-charcoal border border-border-subtle rounded flex items-center justify-between text-[10px] font-mono text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-forest animate-ping" />
              SYSTEM OK // GPS TELEMETRY BEACONS ONLINE
            </span>
            <span>TOTAL FLEET: 5 VEHICLES // 2 ACTIVE DRIVES // 1 WORKSHOP</span>
          </div>
        </div>
      )}

      {activeTab === "UNDERWRITING" && (
        /* TAB 3: FINANCE APPROVAL & UNDERWRITING PORTAL */
        <div className="p-5 bg-bg-navy min-h-[480px] flex flex-col justify-between">
          <div>
            <div className="border-b border-border-subtle pb-3 mb-4">
              <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5 text-slate-blue" />
                Real-Time Credit Score & Finance Underwriter
              </h5>
              <p className="text-[10px] text-text-secondary mt-0.5">Automated integration to core consumer credit databases & franchise lending pools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Selectors column */}
              <div className="bg-bg-charcoal/30 border border-border-subtle p-4 rounded space-y-3">
                <span className="block font-mono text-[9px] text-slate-blue font-bold uppercase tracking-wider">Configure Credit Request</span>
                
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-text-secondary uppercase">Select Prospect Lead</label>
                  <select 
                    value={underwriteLeadId} 
                    onChange={(e) => {
                      setUnderwriteLeadId(e.target.value);
                      setUnderwriteResult(null);
                    }}
                    className="w-full bg-bg-navy border border-border-subtle rounded px-2.5 py-1.5 font-mono text-slate-200 focus:outline-none focus:border-slate-blue"
                  >
                    {leads.map(l => (
                      <option key={l.id} value={l.id}>{l.name} ({l.id})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono text-text-secondary uppercase">Vehicle of Interest</label>
                  <select 
                    value={underwriteVehicleId} 
                    onChange={(e) => {
                      setUnderwriteVehicleId(e.target.value);
                      setUnderwriteResult(null);
                    }}
                    className="w-full bg-bg-navy border border-border-subtle rounded px-2.5 py-1.5 font-mono text-slate-200 focus:outline-none focus:border-slate-blue"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.model} ({v.id})</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    if (isUnderwriting) return;
                    setIsUnderwriting(true);
                    setUnderwriteResult(null);
                    setUnderwriteProgress(0);
                    setUnderwriteStep("Initializing credit bureau connections...");

                    let progress = 0;
                    const interval = setInterval(() => {
                      progress += 10;
                      setUnderwriteProgress(progress);

                      if (progress === 20) {
                        setUnderwriteStep("Contacting Equifax, Experian & TransUnion...");
                      } else if (progress === 40) {
                        setUnderwriteStep("Analyzing client Debt-to-Income (DTI) logs...");
                      } else if (progress === 60) {
                        setUnderwriteStep("Retrieving franchise auto-financing rate sheets...");
                      } else if (progress === 80) {
                        setUnderwriteStep("Calculating prime & subprime interest quotas...");
                      } else if (progress === 100) {
                        clearInterval(interval);
                        
                        const selectedLead = leads.find(l => l.id === underwriteLeadId) || leads[0];
                        const selectedVeh = vehicles.find(v => v.id === underwriteVehicleId) || vehicles[0];
                        
                        let price = 109000;
                        if (selectedVeh.id === "V-902") price = 89990;
                        else if (selectedVeh.id === "V-903") price = 104900;
                        else if (selectedVeh.id === "V-904") price = 182900;
                        else if (selectedVeh.id === "V-905") price = 168500;

                        const score = Math.floor(620 + (selectedLead.score / 100) * 230);
                        const decision = score >= 680 ? "PRE-APPROVED PRIME" : "CONDITIONAL APPROVAL";
                        const dti = Math.floor(18 + Math.random() * 15);
                        const approvedApr = score >= 750 ? 4.99 : score >= 685 ? 5.85 : 7.25;
                        const termMonths = 60;
                        const downPayment = Math.floor(price * 0.1);
                        
                        const principal = price - downPayment;
                        const monthlyRate = (approvedApr / 100) / 12;
                        const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);

                        setUnderwriteResult({
                          score,
                          decision,
                          dti,
                          approvedApr,
                          termMonths,
                          downPayment,
                          monthlyPayment: payment.toFixed(2),
                          carPrice: price
                        });
                        setIsUnderwriting(false);
                        showToast(`FINANCIAL UNDERWRITE COMPLETE FOR ${selectedLead.name.toUpperCase()}`);
                      }
                    }, 150);
                  }}
                  disabled={isUnderwriting}
                  className="w-full bg-slate-blue hover:bg-slate-blue/90 text-white font-mono text-[9px] py-2 rounded text-center font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isUnderwriting ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Processing... {underwriteProgress}%</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Run Credit Check & Pre-approve</span>
                    </>
                  )}
                </button>
              </div>

              {/* Outputs column */}
              <div className="bg-bg-charcoal/20 border border-border-subtle rounded p-4 flex flex-col justify-center min-h-[180px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] grid-lines" />
                {isUnderwriting ? (
                  <div className="text-center space-y-2 relative z-10 animate-pulse">
                    <RefreshCw className="h-8 w-8 text-slate-blue animate-spin mx-auto" />
                    <p className="text-[10px] font-mono text-slate-blue uppercase font-bold">{underwriteStep}</p>
                    <div className="w-full bg-bg-navy h-1.5 rounded-full overflow-hidden max-w-xs mx-auto border border-white/5">
                      <div className="bg-slate-blue h-full transition-all duration-300" style={{ width: `${underwriteProgress}%` }} />
                    </div>
                  </div>
                ) : underwriteResult ? (
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="font-mono text-[9px] text-slate-500">UNDERWRITE VERDICT</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[8.5px] font-bold border border-emerald-500/20 uppercase">
                        {underwriteResult.decision}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 font-mono text-[10px]">
                      <div>
                        <span className="text-slate-500 block">FICO Score</span>
                        <strong className="block text-text-primary text-xs font-black">{underwriteResult.score} / 850</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">DTI Ratio</span>
                        <strong className="block text-text-primary text-xs font-black">{underwriteResult.dti}% (Healthy)</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Approved Rate (APR)</span>
                        <strong className="block text-emerald-400 text-xs font-black">{underwriteResult.approvedApr}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Term / Down Payment</span>
                        <strong className="block text-text-primary text-xs font-bold">{underwriteResult.termMonths} Mo / ${underwriteResult.downPayment.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="mt-3 p-2.5 bg-bg-navy border border-border-subtle rounded text-center">
                      <span className="block font-mono text-[8px] text-slate-400 uppercase">Estimated Monthly Installment</span>
                      <strong className="text-lg font-display font-black text-text-primary">${underwriteResult.monthlyPayment}</strong>
                      <span className="block text-[7.5px] font-mono text-slate-500 mt-0.5">SUBJECT TO SUB-VENTED FRANCHISE REBATES (Price: ${underwriteResult.carPrice.toLocaleString()})</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-text-secondary space-y-1.5 py-6">
                    <CreditCard className="h-7 w-7 mx-auto text-slate-600" />
                    <h6 className="font-display font-bold text-text-primary text-[10px] uppercase">Telemetry Idle</h6>
                    <p className="text-[9px] font-mono max-w-xs mx-auto">Select a prospect and click the button to trigger a live automated credit inquiry sequence.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 bg-bg-charcoal border border-border-subtle rounded text-[9.5px] font-mono text-text-secondary flex justify-between items-center mt-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
              LENDER POOL ACTIVE: CHASE // ALLY // PORSCHE_FINANCIAL
            </span>
            <span className="uppercase text-slate-500">API_VER: v5.2_SECURE</span>
          </div>
        </div>
      )}

      {activeTab === "DOCS" && (
        /* TAB 4: ELECTRONIC DOCUMENT SIGNING HUB */
        <div className="p-5 bg-bg-navy min-h-[480px] flex flex-col justify-between">
          <div>
            <div className="border-b border-border-subtle pb-3 mb-4">
              <h5 className="font-display text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-slate-blue" />
                OCR License Parsing & Digital Waiver Hub
              </h5>
              <p className="text-[10px] text-text-secondary mt-0.5">Simulate scanning a physical driver's license to auto-populate legally binding test-drive liability agreements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: ID Scanner Stage */}
              <div className="space-y-3">
                <div className="bg-bg-charcoal/30 border border-border-subtle p-3 rounded space-y-2">
                  <span className="block font-mono text-[9px] text-slate-blue font-bold uppercase tracking-wider">01 // Identity Capture Stage</span>
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono text-text-secondary uppercase">Active Driver Profile</label>
                    <select 
                      value={scanLeadId} 
                      onChange={(e) => {
                        setScanLeadId(e.target.value);
                        setScannedData(null);
                        setIsSigned(false);
                        setSignatureData("");
                      }}
                      className="w-full bg-bg-navy border border-border-subtle rounded px-2.5 py-1.5 font-mono text-slate-200 focus:outline-none focus:border-slate-blue"
                    >
                      {leads.map(l => (
                        <option key={l.id} value={l.id}>{l.name} ({l.id})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Simulated License Scanner Scanner Panel */}
                <div className="border border-border-subtle bg-bg-charcoal/20 rounded aspect-[1.58/1] overflow-hidden relative flex flex-col items-center justify-center p-3">
                  <div className="absolute inset-0 opacity-[0.05] grid-lines" />
                  {isScanning ? (
                    <div className="text-center relative z-10 w-full">
                      {/* Laser Line sweep */}
                      <div className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-md shadow-emerald-400/50 animate-bounce top-1/3" />
                      <RefreshCw className="h-7 w-7 text-emerald-400 animate-spin mx-auto mb-2" />
                      <p className="text-[8.5px] font-mono text-emerald-400 uppercase tracking-widest font-black animate-pulse">Scanning license barcodes... {scanProgress}%</p>
                    </div>
                  ) : scannedData ? (
                    <div className="w-full font-mono text-[8.5px] space-y-1 relative z-10 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="font-bold text-text-primary">DRIVER'S LICENSE // STATE OF TEXAS</span>
                        <span className="text-emerald-400 font-bold font-mono">OCR_OK</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1.5">
                        <div>
                          <span className="text-slate-500 block">LICENSE NO</span>
                          <span className="text-text-primary font-bold">{scannedData.licenseNo}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">EXP DATE</span>
                          <span className="text-text-primary font-bold">{scannedData.expDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">DATE OF BIRTH</span>
                          <span className="text-text-primary font-bold">{scannedData.dob}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">COMPLIANCE CODE</span>
                          <span className="text-text-primary font-bold">{scannedData.status}</span>
                        </div>
                      </div>
                      <div className="pt-1.5 border-t border-white/5">
                        <span className="text-slate-500 block">ADDRESS</span>
                        <span className="text-text-primary truncate block">{scannedData.address}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-1 py-4">
                      <UserCheck className="h-6 w-6 text-slate-500 mx-auto" />
                      <button
                        onClick={() => {
                          if (isScanning) return;
                          setIsScanning(true);
                          setScannedData(null);
                          setScanProgress(0);

                          let p = 0;
                          const i = setInterval(() => {
                            p += 20;
                            setScanProgress(p);

                            if (p === 100) {
                              clearInterval(i);
                              const selectedLead = leads.find(l => l.id === scanLeadId) || leads[0];
                              const hash = Math.floor(1000 + Math.random() * 9000);
                              setScannedData({
                                licenseNo: `TX-DL-${hash}${selectedLead.id.replace("L-", "")}`,
                                expDate: "08/14/2031",
                                dob: "04/12/1988",
                                address: "1208 Congress Ave, Austin, TX 78701",
                                status: "VALID / UNRESTRICTED"
                              });
                              setIsScanning(false);
                              showToast(`OCR LICENSE COMPLIANCE PARSE COMPLETED`);
                            }
                          }, 150);
                        }}
                        className="bg-white/5 hover:bg-white/10 text-white border border-border-subtle px-3 py-1 rounded transition-all font-mono text-[8.5px] uppercase tracking-wider font-bold"
                      >
                        Initiate Scanner OCR
                      </button>
                      <p className="text-[7.5px] font-mono text-slate-500 mt-1 uppercase">REQUIRES VALID DMV DATABASE LINK</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Digital Liability Signer */}
              <div className="bg-bg-charcoal/20 border border-border-subtle p-4 rounded flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] grid-lines" />
                <div className="space-y-2 relative z-10">
                  <span className="block font-mono text-[9px] text-slate-blue font-bold uppercase tracking-wider">02 // Test-Drive Legal Agreement</span>
                  
                  <div className="p-2 border border-border-subtle/50 bg-bg-navy/70 rounded h-24 overflow-y-auto text-[7.5px] text-slate-400 font-mono leading-relaxed select-none">
                    <p className="font-bold text-text-primary uppercase mb-1">DEALER AGREEMENT & LIABILITY WAIVER</p>
                    <p>
                      The undersigned ("Operator") represents that they are at least 21 years of age and possess a valid, unexpired US driver's license. Operator agrees to indemnify and hold harmless BookToDrive franchises from all liabilities, claims, and property damages arising during the trial period on public roads. Maximum driving time restricted to 30 minutes. Operator agrees to return keys immediately upon completion of the route.
                    </p>
                  </div>

                  {scannedData ? (
                    <div className="space-y-2 pt-1 animate-fadeIn">
                      <label className="block text-[8px] font-mono text-slate-400 uppercase">Signee Initials / Full Name</label>
                      <div className="flex gap-1.5">
                        <input 
                          type="text" 
                          placeholder="Type name or initials to sign" 
                          value={signatureData}
                          onChange={(e) => setSignatureData(e.target.value)}
                          className="flex-1 bg-bg-navy border border-border-subtle rounded px-2.5 py-1 font-mono text-[9.5px] text-slate-200 focus:outline-none focus:border-slate-blue"
                          disabled={isSigned}
                        />
                        <button
                          onClick={() => {
                            if (!signatureData.trim()) {
                              showToast("Please enter initials to sign agreement.");
                              return;
                            }
                            setIsSigned(true);
                            showToast("DIGITAL AGREEMENT COMPLETED & LOGGED TO SECURE EHR");
                          }}
                          disabled={isSigned || !signatureData.trim()}
                          className="bg-emerald-500 hover:bg-emerald-400 text-bg-navy font-mono text-[8px] px-3 py-1 rounded font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {isSigned ? "SIGNED" : "SIGN"}
                        </button>
                      </div>

                      {isSigned && (
                        <div className="border border-emerald-500/10 bg-emerald-500/5 p-2 rounded text-[8.5px] font-mono text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                          <Check className="h-3.5 w-3.5" />
                          <span>Waiver locked. SHA-256 Signature generated.</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-slate-600 font-mono text-[8.5px] py-6">
                      Pending driver's license OCR parsing before document signing can unlock.
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-slate-500">
                  <span>COMPLIANCE STATUS:</span>
                  <span className={isSigned ? "text-emerald-400 font-bold animate-pulse" : "text-amber-500"}>
                    {isSigned ? "FULLY SECURED" : "PENDING AGREEMENT"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-bg-charcoal border border-border-subtle rounded text-[9.5px] font-mono text-text-secondary flex justify-between items-center mt-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
              INTEGRATION STABLE: REVENUE_COCKPIT_E-SIGN_v3
            </span>
            <span className="uppercase text-slate-500">SECURE LOGGED: TRUE</span>
          </div>
        </div>
      )}
    </div>
  );
}
