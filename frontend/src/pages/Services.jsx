import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2, Network, BrainCircuit, LineChart, Cloud, Workflow,
  Database, Smartphone, Layers, Globe, Cpu, Shield, Activity,
  Monitor, Server, Settings, Terminal, Layout, GitBranch,
  AppWindow, HardDrive, Key, Puzzle, Zap, Heart, ShoppingBag,
  Search, BarChart3, Users, Radio
} from "lucide-react";

const ICON_MAP = {
  Code2, Network, BrainCircuit, LineChart, Cloud, Workflow,
  Database, Smartphone, Layers, Globe, Cpu, Shield, Activity,
  Monitor, Server, Settings, Terminal, Layout, GitBranch,
  AppWindow, HardDrive, Key, Puzzle, Zap, Heart, ShoppingBag,
  Search, BarChart3, Users, Radio
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/services`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center">
        <span>Loading services…</span>
      </div>
    );
  }
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
            const Icon = ICON_MAP[svc.icon] || Code2;
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
