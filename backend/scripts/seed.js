import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";
import FAQ from "../models/FAQ.js";
import Testimonial from "../models/Testimonial.js";
import Job from "../models/Job.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI not found in environment variables");
  process.exit(1);
}

const servicesData = [
  {
    id: "web-development",
    order: 0,
    title: "Web Development",
    shortTitle: "Web Dev",
    tagline: "Code That Converts.",
    headline: "High-Performance Web Applications Built to Scale",
    description: "We design and develop high-performance web applications with seamless user experiences, robust security, and scalable architectures, tailored to meet your business's growth demands.",
    longDescription: "At CodeNap, web development is not just about writing code — it's about engineering digital experiences that perform under real-world conditions. We architect products from the ground up using modern frameworks, serverless infrastructure, and component-driven design systems that your team can own and scale confidently.",
    icon: "Code2",
    accentColor: "orange",
    image: "/web_dev.png",
    techStack: ["React", "Next.js", "Tailwind v4", "Node.js", "TypeScript", "PostgreSQL"],
    bulletPoints: [
      "Custom SPAs and SaaS dashboards",
      "Serverless & Headless architectures",
      "SEO-optimized static frameworks",
    ],
    features: [
      { title: "Custom SPA & SaaS Dashboards", desc: "We build single-page applications and admin dashboards with real-time data flows, role-based access control, and intuitive UX — fully responsive across devices." },
      { title: "Serverless & Headless Architecture", desc: "Deploy on edge networks with serverless functions and headless CMS integrations. Pay only for compute you use. Scale to millions without infrastructure bottlenecks." },
      { title: "SEO-Optimized Static Frameworks", desc: "Core Web Vitals-focused builds using Next.js and Astro. Pre-rendering, lazy loading, and structured metadata — built-in from day one, not bolted on later." },
      { title: "E-Commerce & Marketplace Solutions", desc: "Full-featured storefronts with Stripe, Razorpay, and PayPal integrations. Inventory management, cart, wishlists, and analytics dashboards — all custom." },
      { title: "API Design & Backend Systems", desc: "RESTful and GraphQL API development with authentication layers (JWT, OAuth 2.0), rate limiting, caching, and comprehensive Swagger documentation." },
      { title: "Ongoing Maintenance & Support", desc: "We don't disappear post-launch. Monthly retainer options include performance monitoring, dependency updates, bug fixes, and feature expansions." }
    ],
    process: [
      { step: "01", title: "Discovery & Scoping", desc: "We understand your business, users, and technical requirements through structured workshops." },
      { step: "02", title: "Architecture & Design", desc: "Wireframes, design systems, and technical blueprints are created and approved before a single line of code is written." },
      { step: "03", title: "Development & Sprints", desc: "Agile sprint cycles with live previews. You see progress weekly, not monthly." },
      { step: "04", title: "QA & Performance Audit", desc: "Cross-browser testing, load testing, Lighthouse audits, and security scans before every release." },
      { step: "05", title: "Launch & Handover", desc: "Smooth deployment with DNS management, monitoring setup, and full documentation handed to your team." }
    ],
    stats: [
      { value: "120+", label: "Web Projects Delivered" },
      { value: "99.9%", label: "Average Uptime" },
      { value: "< 2s", label: "Avg Load Time" },
      { value: "8+", label: "Years Experience" }
    ],
    tags: ["React", "Next.js", "Node.js"],
    accent: "from-orange-500 to-amber-500",
    accentShadow: "group-hover:shadow-orange-500/10",
    accentBadge: "text-orange-400"
  },
  {
    id: "app-development",
    order: 1,
    title: "App Development",
    shortTitle: "Mobile Apps",
    tagline: "Your Brand in Every Pocket.",
    headline: "Premium iOS & Android Apps That Users Love",
    description: "Expand your reach with custom iOS and Android mobile solutions built to deliver premium user experiences. From concept design to App Store submissions, we handle the full life-cycle.",
    longDescription: "Mobile is where your users live. We build cross-platform and native mobile applications that feel intuitive, perform flawlessly, and represent your brand at the highest level. From the first wireframe to the App Store listing, CodeNap owns the full pipeline.",
    icon: "Network",
    accentColor: "blue",
    image: "/app_dev.png",
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    bulletPoints: [
      "Cross-platform Native apps",
      "Offline-first synchronization",
      "Secure biometric integrations",
    ],
    features: [
      { title: "Cross-Platform Development", desc: "One codebase, two platforms. We use React Native and Flutter to ship pixel-perfect iOS and Android apps simultaneously — cutting time-to-market in half." },
      { title: "Offline-First Architecture", desc: "Apps that work without internet. Local SQLite and Redux Persist layers sync automatically when connectivity is restored — critical for field and enterprise apps." },
      { title: "Secure Biometric Authentication", desc: "Face ID, Touch ID, and device PIN integrations backed by secure keychain storage. Enterprise-grade security baked into the authentication layer." },
      { title: "Push Notifications & Messaging", desc: "FCM and APNs-powered push notification systems with deep link routing, user segmentation, and delivery analytics." },
      { title: "App Store Submission & ASO", desc: "We prepare your App Store and Google Play listings: screenshots, metadata, rating strategies, and keyword optimization for maximum organic visibility." },
      { title: "Performance & Crash Monitoring", desc: "Sentry, Firebase Crashlytics, and custom telemetry dashboards ensure you know about issues before your users do." }
    ],
    process: [
      { step: "01", title: "UX Research & Prototyping", desc: "User journey mapping and interactive prototypes validated with real user feedback before development begins." },
      { step: "02", title: "UI Design System", desc: "Platform-specific design systems (HIG for iOS, Material 3 for Android) ensuring native feel with your brand identity." },
      { step: "03", title: "Agile Development", desc: "Two-week sprints with TestFlight and Play Console beta builds so you can test on real devices continuously." },
      { step: "04", title: "QA & Device Testing", desc: "Manual and automated testing across 20+ device/OS combinations to catch edge cases before release." },
      { step: "05", title: "Store Submission & Launch", desc: "End-to-end submission management, review communication, and post-launch monitoring for the first 30 days." }
    ],
    stats: [
      { value: "40+", label: "Apps Launched" },
      { value: "4.8★", label: "Avg App Rating" },
      { value: "2M+", label: "Total Downloads" },
      { value: "< 48h", label: "Crash Response Time" }
    ],
    tags: ["React Native", "Flutter", "Swift"],
    accent: "from-blue-500 to-cyan-500",
    accentShadow: "group-hover:shadow-blue-500/10",
    accentBadge: "text-blue-400"
  },
  {
    id: "ai-development",
    order: 2,
    title: "AI Development",
    shortTitle: "AI & ML",
    tagline: "Intelligence, Engineered.",
    headline: "Custom AI Systems That Automate and Reason",
    description: "Integrate intelligence into your products. We design custom generative models, vector semantic search pipelines, and agentic workflows to automate reasoning and operations.",
    longDescription: "Artificial intelligence is no longer a competitive advantage — it's a requirement. CodeNap builds production-ready AI systems: from fine-tuned LLMs and RAG pipelines to autonomous agents that handle complex multi-step reasoning. We make AI work for your specific business context, not a generic demo.",
    icon: "BrainCircuit",
    accentColor: "violet",
    image: "/ai_dev.png",
    techStack: ["Python", "OpenAI API", "Pinecone", "LangChain", "HuggingFace", "FastAPI"],
    bulletPoints: [
      "LLM fine-tuning & RAG pipelines",
      "Vector search databases",
      "Agentic reasoning automation",
    ],
    features: [
      { title: "LLM Fine-Tuning & RAG Pipelines", desc: "We fine-tune foundation models on your proprietary data and build Retrieval-Augmented Generation pipelines that answer questions with your knowledge base — accurately." },
      { title: "Vector Search & Semantic Retrieval", desc: "Pinecone, Weaviate, and pgvector-powered search systems that understand meaning, not just keywords. Deploy semantic search, recommendation engines, and document Q&A." },
      { title: "Agentic Workflow Automation", desc: "Multi-step AI agents that browse, reason, and execute. LangChain and AutoGen-powered systems that automate complex operations end-to-end without human bottlenecks." },
      { title: "AI Chatbots & Virtual Assistants", desc: "Context-aware chatbots with memory, tool use, and personality. Integrates with Slack, WhatsApp, and your product — trained on your specific domain." },
      { title: "Computer Vision Solutions", desc: "Object detection, image classification, document OCR, and video analysis pipelines built with PyTorch and deployed on cloud GPU infrastructure." },
      { title: "ML Model APIs & Deployment", desc: "Production-grade ML model serving with FastAPI, Docker, and cloud deployment. Rate-limited, authenticated, and monitored endpoints ready for scale." }
    ],
    process: [
      { step: "01", title: "Use-Case Definition", desc: "We map your business problem to AI capabilities — identifying where AI adds real ROI vs. where simpler solutions suffice." },
      { step: "02", title: "Data Assessment & Prep", desc: "Audit your existing data, identify gaps, and build preprocessing pipelines for training and evaluation datasets." },
      { step: "03", title: "Model Development", desc: "Fine-tuning, prompt engineering, and pipeline construction with evaluation metrics agreed upfront." },
      { step: "04", title: "Integration & Testing", desc: "API integration into your product stack with hallucination testing, safety filters, and edge-case evaluation." },
      { step: "05", title: "Monitoring & Improvement", desc: "Ongoing model drift monitoring, user feedback loops, and iterative improvement cycles post-deployment." }
    ],
    stats: [
      { value: "25+", label: "AI Systems Shipped" },
      { value: "85%", label: "Avg Automation Rate" },
      { value: "3x", label: "Avg Efficiency Gain" },
      { value: "< 500ms", label: "Avg API Latency" }
    ],
    tags: ["Python", "OpenAI", "LangChain"],
    accent: "from-violet-600 to-purple-500",
    accentShadow: "group-hover:shadow-violet-500/10",
    accentBadge: "text-violet-400"
  },
  {
    id: "digital-marketing",
    order: 3,
    title: "Digital Marketing",
    shortTitle: "Marketing",
    tagline: "Data Over Guesswork.",
    headline: "Performance Marketing That Actually Converts",
    description: "Translate code into conversions. We build data-driven SEO campaigns, funnel configurations, and social media frameworks to scale customer acquisition channels with zero vanity metrics.",
    longDescription: "Marketing without data is guessing. At CodeNap, our digital marketing practice is run by engineers — people who understand tracking, attribution, and funnel mathematics. Every campaign is measurable, every decision is data-backed, and every rupee of ad spend is accountable.",
    icon: "LineChart",
    accentColor: "emerald",
    image: "/dig_mktg.png",
    techStack: ["Meta Pixel", "Google Analytics", "Semrush", "Google Ads", "Hotjar", "HubSpot"],
    bulletPoints: [
      "Technical SEO audits",
      "Conversion analytical funnels",
      "Lead generation campaigns",
    ],
    features: [
      { title: "Technical SEO Audits", desc: "We dig into Core Web Vitals, crawl efficiency, structured data, canonical issues, and backlink profiles — then build a prioritized remediation roadmap." },
      { title: "Performance & Paid Advertising", desc: "Google Search, Display, and Meta Ads campaigns built on conversion-optimized landing pages. ROAS-focused bid strategies with weekly performance reviews." },
      { title: "Conversion Funnel Analytics", desc: "Heatmap analysis, session recordings, A/B test frameworks, and funnel drop-off identification using Hotjar and GA4 to systematically improve conversion rates." },
      { title: "Lead Generation Systems", desc: "End-to-end lead gen: from ad creative to CRM pipeline. We configure Meta Lead Forms, Google Lead Extensions, and automated nurture sequences in HubSpot." },
      { title: "Content & Social Strategy", desc: "Editorial calendars, LinkedIn thought leadership, and platform-specific content strategies designed to build organic authority alongside paid acquisition." },
      { title: "Marketing Analytics Dashboards", desc: "Custom Looker Studio dashboards that unify your Google, Meta, email, and CRM data into a single source of truth — with automated weekly reporting." }
    ],
    process: [
      { step: "01", title: "Audit & Baseline", desc: "Full technical SEO audit, analytics configuration review, and current campaign performance baseline." },
      { step: "02", title: "Strategy & KPI Definition", desc: "Custom growth strategy with specific KPIs — CPL, ROAS, keyword rankings — agreed before any spend." },
      { step: "03", title: "Campaign Launch", desc: "Creative production, ad setup, pixel configuration, and landing page optimization launched in parallel." },
      { step: "04", title: "Optimize & Scale", desc: "Weekly bid adjustments, A/B test iterations, and audience refinement to progressively improve performance." },
      { step: "05", title: "Report & Expand", desc: "Monthly performance reviews with clear attribution reporting. Successful channels are scaled, underperformers cut." }
    ],
    stats: [
      { value: "3.8x", label: "Avg ROAS Delivered" },
      { value: "60%", label: "Avg CPL Reduction" },
      { value: "200+", label: "SEO Keywords Ranked" },
      { value: "50+", label: "Campaigns Managed" }
    ],
    tags: ["SEO", "Google Ads", "Meta Ads"],
    accent: "from-emerald-500 to-teal-500",
    accentShadow: "group-hover:shadow-emerald-500/10",
    accentBadge: "text-emerald-400"
  },
  {
    id: "hosting",
    order: 4,
    title: "Cloud Hosting",
    shortTitle: "Hosting",
    tagline: "Always On. Always Fast.",
    headline: "Managed Cloud Infrastructure Built for Uptime",
    description: "High-uptime, auto-scaling hosting environments designed to protect business-critical data. We configure secure server firewalls, CDN delivery, and routine backups.",
    longDescription: "Your product is only as good as its infrastructure. CodeNap designs, deploys, and manages cloud environments on AWS and GCP that handle real traffic spikes without sweating. Zero-downtime deployments, automated backups, DDoS protection, and 24/7 monitoring — so you can sleep.",
    icon: "Cloud",
    accentColor: "cyan",
    image: "/cloud_hosting.png",
    techStack: ["AWS", "Docker", "Cloudflare", "Linux", "Nginx", "Terraform"],
    bulletPoints: [
      "Auto-scaling AWS & GCP setups",
      "Cloudflare CDN & DDoS protection",
      "Automated daily backup systems",
    ],
    features: [
      { title: "Auto-Scaling Cloud Infrastructure", desc: "AWS EC2 Auto Scaling Groups and GCP Managed Instance Groups that expand during traffic peaks and contract during quiet periods — you pay only for what you use." },
      { title: "Cloudflare CDN & DDoS Protection", desc: "Edge network caching through Cloudflare's global PoP network. Layer 7 DDoS mitigation, WAF rules, and Bot Management protect your origin servers." },
      { title: "Zero-Downtime Deployments", desc: "Blue/green and rolling deployment strategies with automated health checks ensure your users never experience an outage during an update." },
      { title: "Automated Backup Systems", desc: "Daily automated snapshots of databases and file systems with cross-region replication. Point-in-time recovery tested monthly — your data is never truly at risk." },
      { title: "SSL & Security Hardening", desc: "End-to-end SSL termination, HTTP to HTTPS redirects, HSTS headers, and server hardening checklists aligned with CIS benchmarks." },
      { title: "24/7 Uptime Monitoring", desc: "UptimeRobot and AWS CloudWatch alerting with PagerDuty escalation. You're notified of issues in under 60 seconds — our response time is under 15 minutes." }
    ],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Review current hosting setup, identify bottlenecks, security gaps, and cost optimization opportunities." },
      { step: "02", title: "Architecture Design", desc: "Design target-state cloud architecture with redundancy, scalability, and cost efficiency at its core." },
      { step: "03", title: "Migration & Setup", desc: "Zero-downtime migration with parallel-run validation before DNS cutover. Full infrastructure as code via Terraform." },
      { step: "04", title: "Security Hardening", desc: "Server hardening, firewall rules, SSL configuration, and vulnerability scans before go-live." },
      { step: "05", title: "Monitoring & Ongoing Management", desc: "Monthly reporting, proactive optimization, security patch management, and 24/7 on-call support." }
    ],
    stats: [
      { value: "99.97%", label: "Avg Uptime SLA" },
      { value: "< 15min", label: "Incident Response" },
      { value: "40%", label: "Avg Cost Reduction" },
      { value: "200+", label: "Servers Managed" }
    ],
    tags: ["AWS", "Cloudflare", "Docker"],
    accent: "from-cyan-500 to-sky-500",
    accentShadow: "group-hover:shadow-cyan-500/10",
    accentBadge: "text-cyan-400"
  },
  {
    id: "project-onboard",
    order: 5,
    title: "Project Onboarding",
    shortTitle: "Onboarding",
    tagline: "From Idea to Sprint in Days.",
    headline: "Structured Onboarding for Seamless Project Kickoff",
    description: "Ready to launch? Our transparent project onboarding system transitions your goals into structured sprints. We map your ideas to concrete milestones with direct developer Slack access.",
    longDescription: "Great software starts with great planning. CodeNap's onboarding process eliminates the chaos of starting a new project — unclear scopes, misaligned expectations, and missed deadlines. We invest deeply upfront in discovery so every sprint has a clear goal and every week has visible progress.",
    icon: "Workflow",
    accentColor: "amber",
    image: "/project_onboard.png",
    techStack: ["Figma", "Slack", "Jira", "Notion", "Loom", "GitHub"],
    bulletPoints: [
      "Interactive strategy workshop",
      "Milestone roadmap wireframing",
      "Direct developer Slack channel",
    ],
    features: [
      { title: "Interactive Strategy Workshop", desc: "A structured 2-hour discovery call with your stakeholders and our leads. We map business goals, user personas, feature priorities, and non-negotiables in a shared Notion doc." },
      { title: "Milestone Roadmap & Wireframing", desc: "After discovery, we deliver a phased milestone roadmap with effort estimates, dependencies, and Figma wireframes for every key screen — before development begins." },
      { title: "Direct Developer Slack Channel", desc: "You get a private Slack channel with your dedicated dev team. No account managers in the middle — direct, async access to the people building your product." },
      { title: "Transparent Sprint Planning", desc: "Two-week sprints with public Jira boards. You see every task, its status, and its ETA. Sprint review calls every fortnight keep all stakeholders aligned." },
      { title: "Design-First Approval Flow", desc: "All UI designs are signed off in Figma before development. Loom screen recordings explain every design decision — no surprises when the build is complete." },
      { title: "Risk & Scope Management", desc: "Every project has a documented change request process. Scope creep is identified early, impact is communicated, and decisions are made jointly — never unilaterally." }
    ],
    process: [
      { step: "01", title: "Intake Form & NDA", desc: "Quick intake form captures your goals, timeline, and budget. NDA signed within 24 hours." },
      { step: "02", title: "Strategy Workshop", desc: "2-hour structured video call: goals, user stories, feature priorities, and technical requirements documented live." },
      { step: "03", title: "Proposal & Roadmap", desc: "Detailed scope-of-work, milestone roadmap, payment schedule, and Figma wireframes delivered within 3 business days." },
      { step: "04", title: "Team Assignment & Kickoff", desc: "Dedicated team assembled, Slack channel created, Jira board set up, and Sprint 1 planning session completed." },
      { step: "05", title: "Sprint 1 Begins", desc: "Development starts with a clear backlog, daily standups, and your first demo delivered within 2 weeks." }
    ],
    stats: [
      { value: "3 Days", label: "Avg Proposal Turnaround" },
      { value: "100%", label: "Clients See Week-1 Progress" },
      { value: "< 5%", label: "Scope Overrun Rate" },
      { value: "NPS 72", label: "Client Satisfaction Score" }
    ],
    tags: ["Agile", "Slack/Jira", "Discovery"],
    accent: "from-amber-500 to-orange-500",
    accentShadow: "group-hover:shadow-amber-500/10",
    accentBadge: "text-amber-400"
  }
];

const faqsData = [
  // Home FAQs
  {
    question: "What mobile app development services do you offer?",
    answer: "We design and build custom iOS and Android mobile solutions built to deliver premium user experiences. From concept design to App Store submissions, we handle the full life-cycle, including offline-first sync, secure biometric login, and secure cloud integrations.",
    page: "home"
  },
  {
    question: "What is the average cost and timeline for developing software?",
    answer: "Every project is unique, but our average timeline is 6 to 12 weeks. We transition your goals into structured sprints, mapping your ideas to concrete milestones with direct developer Slack access and transparent reporting.",
    page: "home"
  },
  {
    question: "Do you offer ongoing maintenance and support services?",
    answer: "Yes, we provide comprehensive project maintenance and support services post-launch. Our services include:",
    bullets: [
      "Regular app updates and feature enhancements",
      "Bug fixing and performance optimization",
      "Security patches and data backup",
      "User feedback analysis and implementation of improvements"
    ],
    page: "home"
  },
  // Careers FAQs
  {
    question: "Can I work remotely?",
    answer: "Yes — many roles are fully remote or hybrid. Each listing specifies the location type. We prioritise output and results over physical presence.",
    page: "careers"
  },
  {
    question: "What is your full interview process?",
    answer: "4 steps: application → resume review (48h) → technical/skill round → final discussion with the founding team. The entire process takes about 2 weeks.",
    page: "careers"
  },
  {
    question: "Do you hire freshers and recent graduates?",
    answer: "Absolutely. Our Internship Program is specifically designed for freshers. High-performing interns receive Pre-Placement Offers (PPOs) to join as full-time employees.",
    page: "careers"
  },
  {
    question: "What technologies does CodeNap work with?",
    answer: "Our core stack is React, Next.js, Node.js, Express, MongoDB, React Native, and AWS. We're also actively building with AI tools — LangChain, OpenAI APIs, Pinecone, and vector databases.",
    page: "careers"
  },
  {
    question: "Can I apply for multiple roles at the same time?",
    answer: "Yes, but please only apply for roles that genuinely align with your skills. We review every application carefully and will recommend the best fit if you're unsure which to choose.",
    page: "careers"
  },
  {
    question: "How quickly do you respond to applications?",
    answer: "We review applications within 48 hours and send a response either way — accepted or not. We respect your time and won't leave you hanging with silence.",
    page: "careers"
  }
];

const testimonialsData = [
  // Home Testimonials
  {
    name: "David Chen",
    role: "CTO",
    company: "FinSphere",
    rating: 5,
    text: "CodeNap delivered our SaaS platform in record time. Their architectural planning and direct developer Slack access kept our dev sprints extremely efficient.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    category: "home"
  },
  {
    name: "Sarah Jenkins",
    role: "Founder",
    company: "Olive Retail",
    rating: 5,
    text: "Our organic search traffic increased by 140% after CodeNap rebuilt our web app with headless Shopify. Their attention to performance optimization is world-class.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    category: "home"
  },
  {
    name: "Marcus Thorne",
    role: "VP of Product",
    company: "NexaCloud",
    rating: 5,
    text: "The team didn't just write code; they collaborated on our cloud security and high-availability configuration. Outstanding engineering partnership.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    category: "home"
  },
  // Careers Testimonials
  {
    name: "Rahul Sharma",
    role: "Senior Frontend Developer",
    tenure: "2 years at CodeNap",
    initials: "RS",
    color: "blue",
    text: "CodeNap gave me real ownership from day one. The mentorship from senior engineers accelerated my growth faster than any previous role. I shipped to production in my first week.",
    category: "careers"
  },
  {
    name: "Priya Mehta",
    role: "UI/UX Designer",
    tenure: "1.5 years at CodeNap",
    initials: "PM",
    color: "purple",
    text: "The design culture here is exceptional. I own full product design decisions and the engineering team genuinely values and implements design feedback. It's rare in a dev-heavy company.",
    category: "careers"
  },
  {
    name: "Arjun Patel",
    role: "Business Development",
    tenure: "1 year at CodeNap",
    initials: "AP",
    color: "green",
    text: "Leadership is transparent and trusting. I closed ₹50L+ in deals in my first year because they gave me real responsibility and the tools to succeed. The growth here is real.",
    category: "careers"
  }
];

const jobsData = [
  {
    id: "senior-frontend",
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    locationType: "Remote",
    location: "Remote / Faridabad",
    experience: "3–5 Years",
    salary: "₹10L – ₹18L / year",
    badge: "Hot 🔥",
    badgeColor: "orange",
    techStack: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    description: "Lead frontend architecture for complex client products. You'll own component systems, performance optimization, and cross-team collaboration.",
    responsibilities: [
      "Architect and build scalable React / Next.js applications",
      "Own Core Web Vitals and performance optimization",
      "Mentor junior developers and lead code reviews",
      "Collaborate closely with designers and backend engineers"
    ],
    requirements: [
      "3+ years of production experience with React",
      "Strong TypeScript and modern JS ecosystem skills",
      "Experience with performance profiling and optimization"
    ]
  },
  {
    id: "fullstack-mern",
    title: "Full-Stack Developer (MERN)",
    department: "Engineering",
    type: "Full-time",
    locationType: "Hybrid",
    location: "Hybrid — Faridabad",
    experience: "2–4 Years",
    salary: "₹8L – ₹15L / year",
    badge: "Urgent",
    badgeColor: "red",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST", "JWT"],
    description: "Own features end-to-end — from MongoDB schema to responsive UI. Design scalable APIs and ship production features for high-growth clients.",
    responsibilities: [
      "Design and implement RESTful APIs with Node.js / Express",
      "Build React components and manage state effectively",
      "Write optimized Mongoose schemas and database queries",
      "Participate in sprint planning and peer code reviews"
    ],
    requirements: [
      "2+ years with the MERN stack in production",
      "Strong REST API design principles",
      "Experience with JWT auth and security best practices"
    ]
  },
  {
    id: "react-native",
    title: "React Native Developer",
    department: "Mobile",
    type: "Full-time",
    locationType: "Hybrid",
    location: "Hybrid — Faridabad",
    experience: "1–3 Years",
    salary: "₹7L – ₹13L / year",
    badge: "New",
    badgeColor: "blue",
    techStack: ["React Native", "Expo", "TypeScript", "Firebase", "REST APIs"],
    description: "Build smooth cross-platform apps for iOS and Android. Own the full mobile product lifecycle from wireframes to App Store submission.",
    responsibilities: [
      "Build and maintain iOS & Android apps with React Native / Expo",
      "Integrate push notifications, maps, and third-party SDKs",
      "Optimise app performance and fix platform-specific issues",
      "Collaborate with designers to implement polished, native-feeling UIs"
    ],
    requirements: [
      "1+ year of production React Native experience",
      "At least one published app on App Store or Google Play",
      "Strong JavaScript / TypeScript fundamentals"
    ]
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    locationType: "Remote",
    location: "Remote",
    experience: "2–4 Years",
    salary: "₹7L – ₹14L / year",
    badge: "Open",
    badgeColor: "green",
    techStack: ["Figma", "Prototyping", "Design Systems", "User Research", "Framer"],
    description: "Design intuitive, beautiful digital products. Lead UX from research to high-fidelity prototypes and partner with engineers for pixel-perfect delivery.",
    responsibilities: [
      "Own end-to-end UX for web and mobile products",
      "Create wireframes, prototypes, and scalable design systems",
      "Conduct user research and usability testing sessions",
      "Ensure pixel-perfect implementation with engineering partners"
    ],
    requirements: [
      "2+ years of product design experience",
      "Strong Figma skills and design systems thinking",
      "Portfolio demonstrating clean, user-centred design decisions"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Manager",
    department: "Marketing",
    type: "Full-time",
    locationType: "On-site",
    location: "Faridabad, Haryana",
    experience: "2–4 Years",
    salary: "₹6L – ₹12L / year",
    badge: "Open",
    badgeColor: "green",
    techStack: ["Google Ads", "Meta Ads", "SEO", "Analytics", "Content"],
    description: "Drive qualified leads and brand visibility for CodeNap and our clients through data-driven campaigns across paid and organic channels.",
    responsibilities: [
      "Plan and manage Google Ads and Meta Ads campaigns",
      "Own SEO strategy and monthly content calendar",
      "Analyse performance data and optimise campaigns",
      "Present insights and growth reports to stakeholders"
    ],
    requirements: [
      "2+ years of digital marketing experience",
      "Hands-on with Google Ads Manager and Meta Business Suite",
      "Data-driven mindset with strong analytics proficiency"
    ]
  },
  {
    id: "business-dev",
    title: "Business Development Executive",
    department: "Sales",
    type: "Full-time",
    locationType: "On-site",
    location: "Faridabad, Haryana",
    experience: "1–3 Years",
    salary: "₹5L – ₹10L + Commission",
    badge: "Open",
    badgeColor: "green",
    techStack: ["CRM", "Lead Generation", "LinkedIn", "Proposals", "Client Management"],
    description: "Identify, pitch, and close new business for CodeNap. Be the first touchpoint for clients and play a central role in our growth story.",
    responsibilities: [
      "Generate B2B leads via LinkedIn, cold outreach, and referrals",
      "Conduct discovery calls and present service offerings",
      "Prepare customised proposals and follow up diligently",
      "Maintain CRM pipeline health and weekly reporting"
    ],
    requirements: [
      "1+ year in B2B sales or business development",
      "Excellent communication and negotiation skills",
      "Strong understanding of digital/software service offerings"
    ]
  },
  {
    id: "frontend-intern",
    title: "Frontend Development Intern",
    department: "Internship",
    type: "Internship",
    locationType: "Hybrid",
    location: "Hybrid — Faridabad",
    experience: "0–1 Year",
    salary: "₹10K – ₹15K / month",
    badge: "Intern",
    badgeColor: "purple",
    techStack: ["React.js", "HTML/CSS", "JavaScript", "Tailwind CSS", "Git"],
    description: "Kickstart your career building real production UIs alongside senior engineers. Ship live features and deep-dive into modern frontend development.",
    responsibilities: [
      "Build UI components under senior developer guidance",
      "Fix bugs and write basic unit tests",
      "Participate in daily standups and code reviews",
      "Learn React, Tailwind CSS, and modern frontend tooling"
    ],
    requirements: [
      "Basic HTML, CSS, and JavaScript knowledge",
      "Familiarity with React or strong willingness to learn fast",
      "Problem-solving attitude and curiosity"
    ]
  },
  {
    id: "backend-intern",
    title: "Backend Development Intern",
    department: "Internship",
    type: "Internship",
    locationType: "Hybrid",
    location: "Hybrid — Faridabad",
    experience: "0–1 Year",
    salary: "₹10K – ₹15K / month",
    badge: "Intern",
    badgeColor: "purple",
    techStack: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Git"],
    description: "Learn backend development by building real client APIs and working with production databases, guided by experienced engineers.",
    responsibilities: [
      "Build and test REST API endpoints",
      "Work with MongoDB and Mongoose schema design",
      "Debug and resolve backend issues",
      "Learn deployment and DevOps basics"
    ],
    requirements: [
      "Basic JavaScript knowledge",
      "Interest in server-side development",
      "Eagerness to learn and grow fast"
    ]
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGO_URI);
    console.log("Database connected. Seeding starting...");

    // Clear existing
    await Service.deleteMany({});
    console.log("Cleared Services collection.");
    await FAQ.deleteMany({});
    console.log("Cleared FAQs collection.");
    await Testimonial.deleteMany({});
    console.log("Cleared Testimonials collection.");
    await Job.deleteMany({});
    console.log("Cleared Jobs collection.");

    // Seed
    await Service.insertMany(servicesData);
    console.log("Seeded Services successfully!");
    await FAQ.insertMany(faqsData);
    console.log("Seeded FAQs successfully!");
    await Testimonial.insertMany(testimonialsData);
    console.log("Seeded Testimonials successfully!");
    await Job.insertMany(jobsData);
    console.log("Seeded Jobs successfully!");

    console.log("All data seeded successfully! Disconnecting...");
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
