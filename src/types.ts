export interface KeyMetric {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "stable";
}

export interface DesignToken {
  name: string;
  value: string;
  description: string;
  type: "color" | "spacing" | "typography" | "border";
}

export interface TimelineMilestone {
  phase: string;
  duration: string;
  deliverables: string[];
  status: "completed" | "active" | "planned";
}

export interface UserPersona {
  role: string;
  frustrations: string[];
  needs: string[];
}

export interface CaseStudyData {
  heroTagline: string;
  overview: string;
  problem: string;
  opportunity: string;
  researchInsights: string[];
  userPersonas: UserPersona[];
  architectureNodes: { id: string; label: string; type: "input" | "process" | "output" | "storage" }[];
  designTokens: DesignToken[];
  impactMetrics: KeyMetric[];
  reflection: string;
  timeline: TimelineMilestone[];
}

export interface Project {
  id: "calmcamp" | "booktodrive" | "museum";
  title: string;
  subtitle: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  accentColor: string; // Tailwind class like "text-forest" or "bg-forest"
  accentHex: string;   // Hex string like "#10B981"
  secondaryColorHex: string;
  stats: KeyMetric[];
  caseStudy: CaseStudyData;
}
