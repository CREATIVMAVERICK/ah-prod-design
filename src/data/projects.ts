import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "calmcamp",
    title: "CalmCamp",
    subtitle: "Medical Camp SaaS",
    category: "Patient Navigator & Paperless Intake Platform",
    role: "Lead Product Designer & Design Engineer",
    year: "2025 - 2026",
    summary: "An intuitive healthcare SaaS designed for high-throughput medical camps. It translates complex diagnostics into clear plain language, eliminates 100% of physical paper clipboards, and enables friction-free tent-to-tent patient routing.",
    accentColor: "text-forest",
    accentHex: "#10B981",
    secondaryColorHex: "#5B7FFF",
    stats: [
      { label: "Paperwork Eliminated", value: "100%", change: "Zero clipboard friction", trend: "up" },
      { label: "Patient Flow Bottlenecks", value: "-65%", change: "Friction-free routing", trend: "up" },
      { label: "Treatment Understanding", value: "98%", change: "Plain language translation", trend: "up" },
    ],
    caseStudy: {
      heroTagline: "Eradicating chaotic clipboards and medical jargon to guide camp patients through their care journey in plain language.",
      overview: "CalmCamp is a specialized mobile-first SaaS designed for temporary medical camps and remote clinical pop-ups. Built to handle intense, high-volume patient intake, the platform replaces traditional, manual paper charts with automated digital pathways. It translates complicated diagnostic medical jargon into clear, plain language for patients, while visually routing them through specialized camp tents (triage, general medicine, diagnostics, pharmacy) without physical friction.",
      problem: "Remote medical camps are notoriously chaotic and stressful. Patients are often overwhelmed by dense medical terminology they cannot comprehend, face massive bottleneck delays waiting on physical paper handoffs, and have no clear direction on which specialized tent to visit next. Over 70% of patient time is spent standing in wrong queues, while doctors struggle with messy, uncollated paper intake charts.",
      opportunity: "By establishing a centralized, single-token digital identity for each patient, CalmCamp automates the handoff queue from tent to tent, eliminating paper loss. Coupled with an AI-assisted plain language translation module, patients receive immediate clarity on their diagnoses, prescriptions, and next steps in simple, jargon-free terminology.",
      researchInsights: [
        "Over 76% of camp patients struggle to understand basic doctor prescriptions due to technical medical terminology.",
        "Physical paper chart misplacement accounts for up to 30 minutes of delay per patient visit in busy camps.",
        "Providing real-time, highly visible stage maps reduces queue navigation anxiety and camp-wide bottlenecks by 65%."
      ],
      userPersonas: [
        {
          role: "Camp Field Coordinator",
          frustrations: [
            "Manually filing hundreds of physical intake clipboards.",
            "Wasting valuable clinical time shouting patient names to direct them to the next tent."
          ],
          needs: [
            "A bird's-eye view of active patient volume per camp station.",
            "Instant paperless intake with automatic sequential digital routing."
          ]
        },
        {
          role: "Camp Patient / Caregiver",
          frustrations: [
            "Confused and anxious about complex medical diagnostics and prescriptions.",
            "Getting lost in crowded, unlabeled, multi-tent camp layouts."
          ],
          needs: [
            "Clear, simple translations of treatment and drug instructions.",
            "Real-time visibility into their next station queue and directions."
          ]
        }
      ],
      architectureNodes: [
        { id: "1", label: "Paperless QR Intake Scan", type: "input" },
        { id: "2", label: "Plain-Language Translation Engine", type: "process" },
        { id: "3", label: "Sequential Queue Router", type: "process" },
        { id: "4", label: "Durable Offline-First Local Cache", type: "storage" },
        { id: "5", label: "Simplified Patient Companion UI", type: "output" }
      ],
      designTokens: [
        { name: "Empathetic Green", value: "#10B981", description: "Soft, comforting primary hue instilling calm and confidence in medical settings.", type: "color" },
        { name: "Intake Card Bg", value: "#0B1020", description: "Eye-soothing dark container optimizing readability under harsh outdoor camp light.", type: "color" },
        { name: "Clear Display Font", value: "Space Grotesk", description: "Aggressive legibility for large-format directional headers and queue numbers.", type: "typography" },
        { name: "Layout Bounds", value: "Frictionless Single Screen", description: "Eliminates all nested navigation so patients can view all info in one click.", type: "border" }
      ],
      impactMetrics: [
        { label: "Paperwork Bottlenecks", value: "0%", change: "100% paperless digitized logs", trend: "up" },
        { label: "Camp Throughput Speed", value: "+55%", change: "Optimized tent station routing", trend: "up" },
        { label: "Patient Treatment Clarity", value: "98.7%", change: "Measured by plain language exit audits", trend: "up" }
      ],
      reflection: "Designing for pop-up medical camps requires radical simplification. Access to internet is unstable, screens are viewed under glare, and users are highly anxious. We learned that the most powerful design system is one that deletes features. By replacing medical jargon with plain words and complex layouts with simple camp routing circles, we created a tool that heals rather than confuses.",
      timeline: [
        {
          phase: "Phase 1: Camp Ethnography & Journey Auditing",
          duration: "2 Weeks",
          deliverables: ["Patient movement logs", "Paper bottleneck diagnostic reports", "Friction site mapping"],
          status: "completed"
        },
        {
          phase: "Phase 2: Plain Language Interface Prototyping",
          duration: "3 Weeks",
          deliverables: ["Glossary translations", "Two-tap intake wireframes", "Tent queue mapping concepts"],
          status: "completed"
        },
        {
          phase: "Phase 3: High-Fidelity App & Navigation Board",
          duration: "4 Weeks",
          deliverables: ["Tailwind component libraries", "Interactive patient companion prototype", "Offline-sync database testbed"],
          status: "completed"
        },
        {
          phase: "Phase 4: Pop-up Camp Pilots",
          duration: "3 Weeks",
          deliverables: ["500-patient camp field pilots", "Patient comprehension feedback survey", "Paperless integration review"],
          status: "active"
        }
      ]
    }
  },
  {
    id: "booktodrive",
    title: "BookToDrive",
    subtitle: "Automotive CRM Platform",
    category: "High-Throughput Sales & Fleet Logistics Engine",
    role: "Principal Interaction Designer",
    year: "2024 - 2025",
    summary: "An integrated CRM and logistics cockpit enabling high-volume automotive dealerships to manage test-drive pipelines, trace real-time fleet asset telemetry, and leverage predictive lead scoring.",
    accentColor: "text-slate-blue",
    accentHex: "#5B7FFF",
    secondaryColorHex: "#10B981",
    stats: [
      { label: "Booking Overlap", value: "0.2%", change: "Down from 14.8%", trend: "up" },
      { label: "Leads to Test Drive", value: "+54%", change: "Shorter booking friction", trend: "up" },
      { label: "Fleet Maintenance Cost", value: "-18%", change: "With automatic logging", trend: "up" },
    ],
    caseStudy: {
      heroTagline: "Accelerating automotive dealership CRM performance via spatial fleet maps and low-friction lead pipelines.",
      overview: "BookToDrive is a comprehensive, enterprise-tier CRM and fleet coordination engine. Designed for multi-franchise dealership networks, it replaces legacy spreadsheet-based scheduling and fragmented client records with a unified, high-speed dispatch board. The platform couples client pipelines directly with real-time dealership vehicle keys and location trackers, guaranteeing seamless operation.",
      problem: "Dealership sales floors are chaotic. Sales agents frequently double-book high-demand vehicles, locate physical car keys late, or fail to track which specific prospect is driving which vehicle. Legacy CRMs do not bridge the physical fleet inventory with digital customer profiles, leading to lost sales, unauthorized vehicle use, and client frustration.",
      opportunity: "By marrying dynamic fleet inventory tracking with a highly optimized, single-screen scheduling table, BookToDrive enables sales reps to check car availability, verify customer driver licenses, and assign keys in under 30 seconds. Integrating this with a predictive lead scoring engine lets dealerships prioritize ready-to-buy customers.",
      researchInsights: [
        "A 10-minute delay in locating a vehicle's keys during a client visit reduces the likelihood of a closed sale by 28%.",
        "Dealerships lose an average of $2,400 annually per lot due to unregistered vehicle damage during test drives.",
        "Sales reps spend over 40% of their day manually updating CRM notes instead of engaging in active client consultations."
      ],
      userPersonas: [
        {
          role: "Dealership Sales Consultant",
          frustrations: [
            "Runs out to the lot only to find the vehicle is already out with another customer.",
            "Wastes precious face-to-face time filling out tedious 20-field test-drive agreements."
          ],
          needs: [
            "Instant, reliable mobile/desktop view of live vehicle location and booking status.",
            "Quick license scanning to auto-populate prospect profiles."
          ]
        },
        {
          role: "Fleet Operations Manager",
          frustrations: [
            "No automated record of mileage or fuel depletion per test-drive session.",
            "Delayed scheduled maintenance alerts leading to engine damage on customer vehicles."
          ],
          needs: [
            "Centralized dashboard with odometer and diagnostic trouble code (DTC) logs.",
            "Automated vehicle rotation rules based on usage patterns."
          ]
        }
      ],
      architectureNodes: [
        { id: "1", label: "Dealer Management System (DMS) API", type: "input" },
        { id: "2", label: "OBD-II Fleet GPS Streamer", type: "input" },
        { id: "3", label: "Test-Drive State Machine", type: "process" },
        { id: "4", label: "Lead Scoring Pipeline", type: "process" },
        { id: "5", label: "Postgres Database", type: "storage" },
        { id: "6", label: "Automated SMS/Email Notification Worker", type: "output" }
      ],
      designTokens: [
        { name: "Surface Charcoal", value: "#171B26", description: "Sturdy slate-charcoal interface reflecting structural automotive chassis.", type: "color" },
        { name: "Slate Accent", value: "#5B7FFF", description: "Dynamic blue signaling high-tech electric vehicle dominance.", type: "color" },
        { name: "Visual Radius", value: "4px - Sharp", description: "Expresses modern, sharp, engineered precision matching automotive panel gaps.", type: "border" },
        { name: "Heading Style", value: "Space Grotesk Bold", description: "Aggressive geometric lettering designed to convey power and motion.", type: "typography" }
      ],
      impactMetrics: [
        { label: "Monthly Test Drives Booked", value: "1,240+", change: "+42% year-over-year", trend: "up" },
        { label: "CRM Engagement Rate", value: "94%", change: "Sales agents prefer it over Salesforce", trend: "up" },
        { label: "Key Retrieval Time", value: "14s", change: "Down from 4 minutes on average", trend: "up" }
      ],
      reflection: "Building a CRM for retail car sales meant competing with high-pressure, fast-moving habits. If a screen takes more than 2 seconds to load, agents will bypass it and use paper. We had to implement absolute optimistic UI updates and local-first data syncing so that the UI is always responsive even when walking through steel-cladded dealership lots with weak Wi-Fi.",
      timeline: [
        {
          phase: "Phase 1: Dealership Lot Auditing",
          duration: "3 Weeks",
          deliverables: ["Key cabinet physical flow maps", "Dealer CRM friction diagnostics", "Vehicle key tracking audit"],
          status: "completed"
        },
        {
          phase: "Phase 2: Fleet Telemetry Design",
          duration: "4 Weeks",
          deliverables: ["OBD-II telemetry parser schema", "High-frequency dashboard wireframes", "Real-time lot map prototype"],
          status: "completed"
        },
        {
          phase: "Phase 3: High-Fidelity Pipeline & Scheduler",
          duration: "6 Weeks",
          deliverables: ["React test-drive kanban board", "Automated SMS alert templates", "Stripe payment integration UI"],
          status: "completed"
        },
        {
          phase: "Phase 4: Multi-Lot Pilots",
          duration: "5 Weeks",
          deliverables: ["3-dealership pilot rollouts", "Agent latency speed tests", "Live vehicle tracking hardware compliance report"],
          status: "completed"
        }
      ]
    }
  },
  {
    id: "museum",
    title: "Museum of the Internet",
    subtitle: "Interactive Digital Experience",
    category: "Curated Virtual Heritage & Custom WebGL Exhibition",
    role: "Art Director & Design Engineer",
    year: "2024",
    summary: "A highly immersive, interactive archiving space capturing and cataloging the ephemeral history, memes, protocol shifts, and artistic design movements of the early web in a museum-grade virtual exhibition.",
    accentColor: "text-plum",
    accentHex: "#5B2A86",
    secondaryColorHex: "#5B7FFF",
    stats: [
      { label: "Monthly Exhibitors", value: "320k", change: "Pure organic reach", trend: "up" },
      { label: "Average Session", value: "14.2m", change: "Unprecedented for text archives", trend: "up" },
      { label: "Historical Nodes Saved", value: "14,500+", change: "Community curated", trend: "up" },
    ],
    caseStudy: {
      heroTagline: "Building a living spatial encyclopedia dedicated to preserving the golden era of web culture.",
      overview: "Museum of the Internet is a high-end cultural archive and interactive virtual experience. It stands as a digital monument to early web protocols (FTP, IRC, Gopher), net art, seminal memes, and browser-war typography. Designed with custom WebGL, the gallery allows users to traverse web milestones chronologically or via thematic networks.",
      problem: "The internet has no memory. Seminal websites, user forums, and net-art installations disappear daily as hosting accounts expire and platforms deprecate. Standard archive tools (like the Wayback Machine) are functional databases but lack the artistic curation, spatial context, and interactive joy that defined early web communities.",
      opportunity: "By combining chronological curation with rich interactive simulators (such as live emulation of classic browsers, dial-up sounds, and IRC chats), we can transform a cold museum archive into an emotive, nostalgic journey. It serves as both an educational resource for modern designers and a nostalgic playground for veterans.",
      researchInsights: [
        "Over 92% of websites active in 1999 are completely offline with no archival traces remaining.",
        "Interactive emulators have a 780% higher user-retention rate than simple static reading pages.",
        "The primary audience (digital designers, tech workers) has a deep craving for nostalgic, raw, high-contrast early web aesthetics."
      ],
      userPersonas: [
        {
          role: "Digital Design Student",
          frustrations: [
            "Struggles to find primary sources of early net-art design movements.",
            "Tired of flat, uninspiring standard Web portfolio grid layouts."
          ],
          needs: [
            "Accurate, interactive timelines of web layout trends.",
            "Downloadable high-fidelity retro asset packages."
          ]
        },
        {
          role: "Veteran Web Engineer",
          frustrations: [
            "Watches the modern web become highly uniform, commoditized, and clinical.",
            "Nostalgic for the chaotic, creative freedom of early Geocities/MySpace days."
          ],
          needs: [
            "A high-fidelity space to read, write, and archive early web artifacts.",
            "Interactive audio simulators of classic tech hardware."
          ]
        }
      ],
      architectureNodes: [
        { id: "1", label: "Community Curation Hub", type: "input" },
        { id: "2", label: "Media Parser & Archiver", type: "input" },
        { id: "3", label: "Interactive Emulator Engine", type: "process" },
        { id: "4", label: "WebGL Particle Graph Resolver", type: "process" },
        { id: "5", label: "Decentralized IPFS Storage", type: "storage" },
        { id: "6", label: "Immersive Web Audio Synthesizer", type: "output" }
      ],
      designTokens: [
        { name: "Core Terminal Black", value: "#0B1020", description: "Immersive cosmic black resembling early CRT terminals.", type: "color" },
        { name: "Electric Plum", value: "#5B2A86", description: "Deep nostalgic violet channeling late-night IRC terminal hues.", type: "color" },
        { name: "Terminal Font", value: "JetBrains Mono Bold", description: "Raw, unpolished tech typography highlighting raw bytes and terminal logs.", type: "typography" },
        { name: "CRT Grid Scanlines", value: "1px Overlay", description: "Faint horizontal scanlines recreating classic vacuum-tube monitor textures.", type: "border" }
      ],
      impactMetrics: [
        { label: "Community Submissions", value: "85,000+", change: "Vetted by curation board", trend: "up" },
        { label: "Educational Citations", value: "142", change: "Used in design curricula globally", trend: "up" },
        { label: "Net Promoter Score", value: "+88", change: "Highly praised by designer community", trend: "up" }
      ],
      reflection: "The primary challenge was balancing historical accuracy with modern front-end performance. Early web pages were chaotic and slow, but our portfolio needs to be butter-smooth. We chose to wrap emulated retro experiences inside clean, isolated containers, giving users a direct sensory contrast between modern system precision and vintage digital chaos.",
      timeline: [
        {
          phase: "Phase 1: Internet Archaeology",
          duration: "4 Weeks",
          deliverables: ["FTP directory index scrapings", "Geocities layout pattern audits", "Visual style guides"],
          status: "completed"
        },
        {
          phase: "Phase 2: Audio & Video Synthesis",
          duration: "3 Weeks",
          deliverables: ["Web Audio API dial-up synth", "CRT display shader prototype", "Nostalgic video streams"],
          status: "completed"
        },
        {
          phase: "Phase 3: Interactive Node Navigation",
          duration: "5 Weeks",
          deliverables: ["Chronological network grid UX", "Interactive IRC chat emulator", "Retro HTML converter"],
          status: "completed"
        },
        {
          phase: "Phase 4: Exhibition Launch",
          duration: "3 Weeks",
          deliverables: ["IPFS metadata publishing", "Community exhibition open-call", "Performance stress testing"],
          status: "completed"
        }
      ]
    }
  }
];
