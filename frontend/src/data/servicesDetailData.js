import { Code2, Network, BrainCircuit, LineChart, Cloud, Workflow } from 'lucide-react'

export const servicesDetailData = [
  {
    id: "web-development",
    title: "Web Development",
    shortTitle: "Web Dev",
    tagline: "Code That Converts.",
    headline: "High-Performance Web Applications Built to Scale",
    description:
      "We design and develop high-performance web applications with seamless user experiences, robust security, and scalable architectures, tailored to meet your business's growth demands.",
    longDescription:
      "At CodeNap, web development is not just about writing code — it's about engineering digital experiences that perform under real-world conditions. We architect products from the ground up using modern frameworks, serverless infrastructure, and component-driven design systems that your team can own and scale confidently.",
    icon: Code2,
    accentColor: "orange",
    image: "/web_dev.png",
    techStack: ["React", "Next.js", "Tailwind v4", "Node.js", "TypeScript", "PostgreSQL"],
    bulletPoints: [
      "Custom SPAs and SaaS dashboards",
      "Serverless & Headless architectures",
      "SEO-optimized static frameworks",
    ],
    features: [
      {
        title: "Custom SPA & SaaS Dashboards",
        desc: "We build single-page applications and admin dashboards with real-time data flows, role-based access control, and intuitive UX — fully responsive across devices.",
      },
      {
        title: "Serverless & Headless Architecture",
        desc: "Deploy on edge networks with serverless functions and headless CMS integrations. Pay only for compute you use. Scale to millions without infrastructure bottlenecks.",
      },
      {
        title: "SEO-Optimized Static Frameworks",
        desc: "Core Web Vitals-focused builds using Next.js and Astro. Pre-rendering, lazy loading, and structured metadata — built-in from day one, not bolted on later.",
      },
      {
        title: "E-Commerce & Marketplace Solutions",
        desc: "Full-featured storefronts with Stripe, Razorpay, and PayPal integrations. Inventory management, cart, wishlists, and analytics dashboards — all custom.",
      },
      {
        title: "API Design & Backend Systems",
        desc: "RESTful and GraphQL API development with authentication layers (JWT, OAuth 2.0), rate limiting, caching, and comprehensive Swagger documentation.",
      },
      {
        title: "Ongoing Maintenance & Support",
        desc: "We don't disappear post-launch. Monthly retainer options include performance monitoring, dependency updates, bug fixes, and feature expansions.",
      },
    ],
    process: [
      { step: "01", title: "Discovery & Scoping", desc: "We understand your business, users, and technical requirements through structured workshops." },
      { step: "02", title: "Architecture & Design", desc: "Wireframes, design systems, and technical blueprints are created and approved before a single line of code is written." },
      { step: "03", title: "Development & Sprints", desc: "Agile sprint cycles with live previews. You see progress weekly, not monthly." },
      { step: "04", title: "QA & Performance Audit", desc: "Cross-browser testing, load testing, Lighthouse audits, and security scans before every release." },
      { step: "05", title: "Launch & Handover", desc: "Smooth deployment with DNS management, monitoring setup, and full documentation handed to your team." },
    ],
    stats: [
      { value: "120+", label: "Web Projects Delivered" },
      { value: "99.9%", label: "Average Uptime" },
      { value: "< 2s", label: "Avg Load Time" },
      { value: "8+", label: "Years Experience" },
    ],
  },
  {
    id: "app-development",
    title: "App Development",
    shortTitle: "Mobile Apps",
    tagline: "Your Brand in Every Pocket.",
    headline: "Premium iOS & Android Apps That Users Love",
    description:
      "Expand your reach with custom iOS and Android mobile solutions built to deliver premium user experiences. From concept design to App Store submissions, we handle the full life-cycle.",
    longDescription:
      "Mobile is where your users live. We build cross-platform and native mobile applications that feel intuitive, perform flawlessly, and represent your brand at the highest level. From the first wireframe to the App Store listing, CodeNap owns the full pipeline.",
    icon: Network,
    accentColor: "blue",
    image: "/app_dev.png",
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Expo"],
    bulletPoints: [
      "Cross-platform Native apps",
      "Offline-first synchronization",
      "Secure biometric integrations",
    ],
    features: [
      {
        title: "Cross-Platform Development",
        desc: "One codebase, two platforms. We use React Native and Flutter to ship pixel-perfect iOS and Android apps simultaneously — cutting time-to-market in half.",
      },
      {
        title: "Offline-First Architecture",
        desc: "Apps that work without internet. Local SQLite and Redux Persist layers sync automatically when connectivity is restored — critical for field and enterprise apps.",
      },
      {
        title: "Secure Biometric Authentication",
        desc: "Face ID, Touch ID, and device PIN integrations backed by secure keychain storage. Enterprise-grade security baked into the authentication layer.",
      },
      {
        title: "Push Notifications & Messaging",
        desc: "FCM and APNs-powered push notification systems with deep link routing, user segmentation, and delivery analytics.",
      },
      {
        title: "App Store Submission & ASO",
        desc: "We prepare your App Store and Google Play listings: screenshots, metadata, rating strategies, and keyword optimization for maximum organic visibility.",
      },
      {
        title: "Performance & Crash Monitoring",
        desc: "Sentry, Firebase Crashlytics, and custom telemetry dashboards ensure you know about issues before your users do.",
      },
    ],
    process: [
      { step: "01", title: "UX Research & Prototyping", desc: "User journey mapping and interactive prototypes validated with real user feedback before development begins." },
      { step: "02", title: "UI Design System", desc: "Platform-specific design systems (HIG for iOS, Material 3 for Android) ensuring native feel with your brand identity." },
      { step: "03", title: "Agile Development", desc: "Two-week sprints with TestFlight and Play Console beta builds so you can test on real devices continuously." },
      { step: "04", title: "QA & Device Testing", desc: "Manual and automated testing across 20+ device/OS combinations to catch edge cases before release." },
      { step: "05", title: "Store Submission & Launch", desc: "End-to-end submission management, review communication, and post-launch monitoring for the first 30 days." },
    ],
    stats: [
      { value: "40+", label: "Apps Launched" },
      { value: "4.8★", label: "Avg App Rating" },
      { value: "2M+", label: "Total Downloads" },
      { value: "< 48h", label: "Crash Response Time" },
    ],
  },
  {
    id: "ai-development",
    title: "AI Development",
    shortTitle: "AI & ML",
    tagline: "Intelligence, Engineered.",
    headline: "Custom AI Systems That Automate and Reason",
    description:
      "Integrate intelligence into your products. We design custom generative models, vector semantic search pipelines, and agentic workflows to automate reasoning and operations.",
    longDescription:
      "Artificial intelligence is no longer a competitive advantage — it's a requirement. CodeNap builds production-ready AI systems: from fine-tuned LLMs and RAG pipelines to autonomous agents that handle complex multi-step reasoning. We make AI work for your specific business context, not a generic demo.",
    icon: BrainCircuit,
    accentColor: "violet",
    image: "/ai_dev.png",
    techStack: ["Python", "OpenAI API", "Pinecone", "LangChain", "HuggingFace", "FastAPI"],
    bulletPoints: [
      "LLM fine-tuning & RAG pipelines",
      "Vector search databases",
      "Agentic reasoning automation",
    ],
    features: [
      {
        title: "LLM Fine-Tuning & RAG Pipelines",
        desc: "We fine-tune foundation models on your proprietary data and build Retrieval-Augmented Generation pipelines that answer questions with your knowledge base — accurately.",
      },
      {
        title: "Vector Search & Semantic Retrieval",
        desc: "Pinecone, Weaviate, and pgvector-powered search systems that understand meaning, not just keywords. Deploy semantic search, recommendation engines, and document Q&A.",
      },
      {
        title: "Agentic Workflow Automation",
        desc: "Multi-step AI agents that browse, reason, and execute. LangChain and AutoGen-powered systems that automate complex operations end-to-end without human bottlenecks.",
      },
      {
        title: "AI Chatbots & Virtual Assistants",
        desc: "Context-aware chatbots with memory, tool use, and personality. Integrates with Slack, WhatsApp, and your product — trained on your specific domain.",
      },
      {
        title: "Computer Vision Solutions",
        desc: "Object detection, image classification, document OCR, and video analysis pipelines built with PyTorch and deployed on cloud GPU infrastructure.",
      },
      {
        title: "ML Model APIs & Deployment",
        desc: "Production-grade ML model serving with FastAPI, Docker, and cloud deployment. Rate-limited, authenticated, and monitored endpoints ready for scale.",
      },
    ],
    process: [
      { step: "01", title: "Use-Case Definition", desc: "We map your business problem to AI capabilities — identifying where AI adds real ROI vs. where simpler solutions suffice." },
      { step: "02", title: "Data Assessment & Prep", desc: "Audit your existing data, identify gaps, and build preprocessing pipelines for training and evaluation datasets." },
      { step: "03", title: "Model Development", desc: "Fine-tuning, prompt engineering, and pipeline construction with evaluation metrics agreed upfront." },
      { step: "04", title: "Integration & Testing", desc: "API integration into your product stack with hallucination testing, safety filters, and edge-case evaluation." },
      { step: "05", title: "Monitoring & Improvement", desc: "Ongoing model drift monitoring, user feedback loops, and iterative improvement cycles post-deployment." },
    ],
    stats: [
      { value: "25+", label: "AI Systems Shipped" },
      { value: "85%", label: "Avg Automation Rate" },
      { value: "3x", label: "Avg Efficiency Gain" },
      { value: "< 500ms", label: "Avg API Latency" },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Marketing",
    tagline: "Data Over Guesswork.",
    headline: "Performance Marketing That Actually Converts",
    description:
      "Translate code into conversions. We build data-driven SEO campaigns, funnel configurations, and social media frameworks to scale customer acquisition channels with zero vanity metrics.",
    longDescription:
      "Marketing without data is guessing. At CodeNap, our digital marketing practice is run by engineers — people who understand tracking, attribution, and funnel mathematics. Every campaign is measurable, every decision is data-backed, and every rupee of ad spend is accountable.",
    icon: LineChart,
    accentColor: "emerald",
    image: "/dig_mktg.png",
    techStack: ["Meta Pixel", "Google Analytics", "Semrush", "Google Ads", "Hotjar", "HubSpot"],
    bulletPoints: [
      "Technical SEO audits",
      "Conversion analytical funnels",
      "Lead generation campaigns",
    ],
    features: [
      {
        title: "Technical SEO Audits",
        desc: "We dig into Core Web Vitals, crawl efficiency, structured data, canonical issues, and backlink profiles — then build a prioritized remediation roadmap.",
      },
      {
        title: "Performance & Paid Advertising",
        desc: "Google Search, Display, and Meta Ads campaigns built on conversion-optimized landing pages. ROAS-focused bid strategies with weekly performance reviews.",
      },
      {
        title: "Conversion Funnel Analytics",
        desc: "Heatmap analysis, session recordings, A/B test frameworks, and funnel drop-off identification using Hotjar and GA4 to systematically improve conversion rates.",
      },
      {
        title: "Lead Generation Systems",
        desc: "End-to-end lead gen: from ad creative to CRM pipeline. We configure Meta Lead Forms, Google Lead Extensions, and automated nurture sequences in HubSpot.",
      },
      {
        title: "Content & Social Strategy",
        desc: "Editorial calendars, LinkedIn thought leadership, and platform-specific content strategies designed to build organic authority alongside paid acquisition.",
      },
      {
        title: "Marketing Analytics Dashboards",
        desc: "Custom Looker Studio dashboards that unify your Google, Meta, email, and CRM data into a single source of truth — with automated weekly reporting.",
      },
    ],
    process: [
      { step: "01", title: "Audit & Baseline", desc: "Full technical SEO audit, analytics configuration review, and current campaign performance baseline." },
      { step: "02", title: "Strategy & KPI Definition", desc: "Custom growth strategy with specific KPIs — CPL, ROAS, keyword rankings — agreed before any spend." },
      { step: "03", title: "Campaign Launch", desc: "Creative production, ad setup, pixel configuration, and landing page optimization launched in parallel." },
      { step: "04", title: "Optimize & Scale", desc: "Weekly bid adjustments, A/B test iterations, and audience refinement to progressively improve performance." },
      { step: "05", title: "Report & Expand", desc: "Monthly performance reviews with clear attribution reporting. Successful channels are scaled, underperformers cut." },
    ],
    stats: [
      { value: "3.8x", label: "Avg ROAS Delivered" },
      { value: "60%", label: "Avg CPL Reduction" },
      { value: "200+", label: "SEO Keywords Ranked" },
      { value: "50+", label: "Campaigns Managed" },
    ],
  },
  {
    id: "hosting",
    title: "Cloud Hosting",
    shortTitle: "Hosting",
    tagline: "Always On. Always Fast.",
    headline: "Managed Cloud Infrastructure Built for Uptime",
    description:
      "High-uptime, auto-scaling hosting environments designed to protect business-critical data. We configure secure server firewalls, CDN delivery, and routine backups.",
    longDescription:
      "Your product is only as good as its infrastructure. CodeNap designs, deploys, and manages cloud environments on AWS and GCP that handle real traffic spikes without sweating. Zero-downtime deployments, automated backups, DDoS protection, and 24/7 monitoring — so you can sleep.",
    icon: Cloud,
    accentColor: "cyan",
    image: "/cloud_hosting.png",
    techStack: ["AWS", "Docker", "Cloudflare", "Linux", "Nginx", "Terraform"],
    bulletPoints: [
      "Auto-scaling AWS & GCP setups",
      "Cloudflare CDN & DDoS protection",
      "Automated daily backup systems",
    ],
    features: [
      {
        title: "Auto-Scaling Cloud Infrastructure",
        desc: "AWS EC2 Auto Scaling Groups and GCP Managed Instance Groups that expand during traffic peaks and contract during quiet periods — you pay only for what you use.",
      },
      {
        title: "Cloudflare CDN & DDoS Protection",
        desc: "Edge network caching through Cloudflare's global PoP network. Layer 7 DDoS mitigation, WAF rules, and Bot Management protect your origin servers.",
      },
      {
        title: "Zero-Downtime Deployments",
        desc: "Blue/green and rolling deployment strategies with automated health checks ensure your users never experience an outage during an update.",
      },
      {
        title: "Automated Backup Systems",
        desc: "Daily automated snapshots of databases and file systems with cross-region replication. Point-in-time recovery tested monthly — your data is never truly at risk.",
      },
      {
        title: "SSL & Security Hardening",
        desc: "End-to-end SSL termination, HTTP to HTTPS redirects, HSTS headers, and server hardening checklists aligned with CIS benchmarks.",
      },
      {
        title: "24/7 Uptime Monitoring",
        desc: "UptimeRobot and AWS CloudWatch alerting with PagerDuty escalation. You're notified of issues in under 60 seconds — our response time is under 15 minutes.",
      },
    ],
    process: [
      { step: "01", title: "Infrastructure Audit", desc: "Review current hosting setup, identify bottlenecks, security gaps, and cost optimization opportunities." },
      { step: "02", title: "Architecture Design", desc: "Design target-state cloud architecture with redundancy, scalability, and cost efficiency at its core." },
      { step: "03", title: "Migration & Setup", desc: "Zero-downtime migration with parallel-run validation before DNS cutover. Full infrastructure as code via Terraform." },
      { step: "04", title: "Security Hardening", desc: "Server hardening, firewall rules, SSL configuration, and vulnerability scans before go-live." },
      { step: "05", title: "Monitoring & Ongoing Management", desc: "Monthly reporting, proactive optimization, security patch management, and 24/7 on-call support." },
    ],
    stats: [
      { value: "99.97%", label: "Avg Uptime SLA" },
      { value: "< 15min", label: "Incident Response" },
      { value: "40%", label: "Avg Cost Reduction" },
      { value: "200+", label: "Servers Managed" },
    ],
  },
  {
    id: "project-onboard",
    title: "Project Onboarding",
    shortTitle: "Onboarding",
    tagline: "From Idea to Sprint in Days.",
    headline: "Structured Onboarding for Seamless Project Kickoff",
    description:
      "Ready to launch? Our transparent project onboarding system transitions your goals into structured sprints. We map your ideas to concrete milestones with direct developer Slack access.",
    longDescription:
      "Great software starts with great planning. CodeNap's onboarding process eliminates the chaos of starting a new project — unclear scopes, misaligned expectations, and missed deadlines. We invest deeply upfront in discovery so every sprint has a clear goal and every week has visible progress.",
    icon: Workflow,
    accentColor: "amber",
    image: "/project_onboard.png",
    techStack: ["Figma", "Slack", "Jira", "Notion", "Loom", "GitHub"],
    bulletPoints: [
      "Interactive strategy workshop",
      "Milestone roadmap wireframing",
      "Direct developer Slack channel",
    ],
    features: [
      {
        title: "Interactive Strategy Workshop",
        desc: "A structured 2-hour discovery call with your stakeholders and our leads. We map business goals, user personas, feature priorities, and non-negotiables in a shared Notion doc.",
      },
      {
        title: "Milestone Roadmap & Wireframing",
        desc: "After discovery, we deliver a phased milestone roadmap with effort estimates, dependencies, and Figma wireframes for every key screen — before development begins.",
      },
      {
        title: "Direct Developer Slack Channel",
        desc: "You get a private Slack channel with your dedicated dev team. No account managers in the middle — direct, async access to the people building your product.",
      },
      {
        title: "Transparent Sprint Planning",
        desc: "Two-week sprints with public Jira boards. You see every task, its status, and its ETA. Sprint review calls every fortnight keep all stakeholders aligned.",
      },
      {
        title: "Design-First Approval Flow",
        desc: "All UI designs are signed off in Figma before development. Loom screen recordings explain every design decision — no surprises when the build is complete.",
      },
      {
        title: "Risk & Scope Management",
        desc: "Every project has a documented change request process. Scope creep is identified early, impact is communicated, and decisions are made jointly — never unilaterally.",
      },
    ],
    process: [
      { step: "01", title: "Intake Form & NDA", desc: "Quick intake form captures your goals, timeline, and budget. NDA signed within 24 hours." },
      { step: "02", title: "Strategy Workshop", desc: "2-hour structured video call: goals, user stories, feature priorities, and technical requirements documented live." },
      { step: "03", title: "Proposal & Roadmap", desc: "Detailed scope-of-work, milestone roadmap, payment schedule, and Figma wireframes delivered within 3 business days." },
      { step: "04", title: "Team Assignment & Kickoff", desc: "Dedicated team assembled, Slack channel created, Jira board set up, and Sprint 1 planning session completed." },
      { step: "05", title: "Sprint 1 Begins", desc: "Development starts with a clear backlog, daily standups, and your first demo delivered within 2 weeks." },
    ],
    stats: [
      { value: "3 Days", label: "Avg Proposal Turnaround" },
      { value: "100%", label: "Clients See Week-1 Progress" },
      { value: "< 5%", label: "Scope Overrun Rate" },
      { value: "NPS 72", label: "Client Satisfaction Score" },
    ],
  },
]

export default servicesDetailData
