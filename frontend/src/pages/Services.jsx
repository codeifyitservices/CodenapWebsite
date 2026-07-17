import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Network,
  BrainCircuit,
  LineChart,
  Cloud,
  Workflow,
} from "lucide-react";

const services = [
  {
    id: "web-development",
    title: "Web Development",
    tagline: "Code That Converts.",
    description:
      "High-performance SPAs, SaaS dashboards, serverless APIs, and SEO-optimized websites — built to scale with your business.",
    icon: Code2,
    tags: ["React", "Next.js", "Node.js"],
    accent: "from-orange-500 to-amber-500",
    accentShadow: "group-hover:shadow-orange-500/10",
    accentBadge: "text-orange-400",
  },
  {
    id: "app-development",
    title: "App Development",
    tagline: "Your Brand in Every Pocket.",
    description:
      "Cross-platform iOS & Android apps with offline sync, biometric auth, and seamless App Store submission handling.",
    icon: Network,
    tags: ["React Native", "Flutter", "Swift"],
    accent: "from-blue-500 to-cyan-500",
    accentShadow: "group-hover:shadow-blue-500/10",
    accentBadge: "text-blue-400",
  },
  {
    id: "ai-development",
    title: "AI Development",
    tagline: "Intelligence, Engineered.",
    description:
      "Custom LLM fine-tuning, RAG pipelines, agentic automation, and AI chatbots trained on your domain-specific data.",
    icon: BrainCircuit,
    tags: ["Python", "OpenAI", "LangChain"],
    accent: "from-violet-600 to-purple-500",
    accentShadow: "group-hover:shadow-violet-500/10",
    accentBadge: "text-violet-400",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Data Over Guesswork.",
    description:
      "Technical SEO, Google & Meta ad campaigns, conversion funnels, and analytics dashboards — all measured, no vanity metrics.",
    icon: LineChart,
    tags: ["SEO", "Meta Ads", "Google Analytics"],
    accent: "from-emerald-600 to-green-500",
    accentShadow: "group-hover:shadow-emerald-500/10",
    accentBadge: "text-emerald-400",
  },
  {
    id: "hosting",
    title: "Cloud Hosting",
    tagline: "Always On. Always Fast.",
    description:
      "Auto-scaling AWS & GCP infrastructure, Cloudflare CDN with DDoS protection, automated daily backups, and 99.97% uptime SLA.",
    icon: Cloud,
    tags: ["AWS", "Cloudflare", "Docker"],
    accent: "from-cyan-500 to-sky-500",
    accentShadow: "group-hover:shadow-cyan-500/10",
    accentBadge: "text-cyan-400",
  },
  {
    id: "project-onboard",
    title: "Project Onboarding",
    tagline: "From Idea to Sprint in Days.",
    description:
      "Structured discovery, milestone roadmapping, Figma wireframes, and a direct Slack channel with your dedicated dev team.",
    icon: Workflow,
    tags: ["Figma", "Jira", "Slack"],
    accent: "from-amber-500 to-yellow-500",
    accentShadow: "group-hover:shadow-amber-500/10",
    accentBadge: "text-amber-400",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-orange-500/10 via-orange-500/5 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Grid texture */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 mb-16 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            What We Build
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Our Services
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            We design, build, and deploy premium digital products — from web & mobile apps to AI systems and cloud infrastructure. Every service is engineered for performance.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/services/${svc.id}`}
                  className={`group relative flex flex-col gap-5 bg-[#0c1018] border border-slate-800 rounded-2xl p-7 h-full hover:border-slate-700 hover:-translate-y-1.5 hover:shadow-2xl ${svc.accentShadow} transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${svc.accent} flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-2 flex-1">
                    <p className={`text-xs font-bold uppercase tracking-widest ${svc.accentBadge}`}>
                      {svc.tagline}
                    </p>
                    <h2 className="text-white font-black text-xl tracking-tight">{svc.title}</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">{svc.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-md text-[11px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Explore CTA */}
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${svc.accentBadge} group-hover:gap-2.5 transition-all duration-200`}>
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 text-center flex flex-col items-center gap-6"
        >
          <p className="text-slate-400 text-base max-w-lg leading-relaxed">
            Not sure which service fits your project? Talk to our team and we'll scope the right solution.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-sm font-bold shadow-xl shadow-orange-500/20 transition-all duration-200 active:scale-95"
          >
            Get a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
