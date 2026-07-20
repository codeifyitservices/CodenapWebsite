import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Layers,
  Users,
  Coins,
  Target,
  TrendingUp,
  ShieldCheck,
  Workflow,
  Headphones,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Custom Solutions",
    icon: Layers,
    colorClass: "text-orange-600",
    bgClass: "bg-orange-50/80",
    description: (
      <>
        Get tailored enterprise software,{" "}
        <span className="underline decoration-orange-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          SaaS platforms
        </span>
        , and{" "}
        <span className="underline decoration-orange-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          app development
        </span>{" "}
        using secure, scalable{" "}
        <span className="underline decoration-orange-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          full-stack
        </span>{" "}
        technologies.
      </>
    ),
  },
  {
    id: 2,
    title: "Cost Efficiency",
    icon: Coins,
    colorClass: "text-indigo-600",
    bgClass: "bg-indigo-50/80",
    description: (
      <>
        Leverage{" "}
        <span className="underline decoration-indigo-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          offshore software development from India
        </span>{" "}
        with low costs, high ROI, and zero compromise on build quality.
      </>
    ),
  },
  {
    id: 3,
    title: "Client Focused",
    icon: Target,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-50/80",
    description: (
      <>
        We provide user-first software engineering with{" "}
        <span className="underline decoration-amber-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          business-aligned planning
        </span>
        , agile delivery, and transparent reporting.
      </>
    ),
  },
  {
    id: 4,
    title: "Highly Scalable",
    icon: TrendingUp,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50/80",
    description: (
      <>
        Build scalable{" "}
        <span className="underline decoration-emerald-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          cloud-native applications
        </span>{" "}
        with API-first architecture, microservices, and container-ready
        deployment.
      </>
    ),
  },
  {
    id: 5,
    title: "Quality Driven",
    icon: ShieldCheck,
    colorClass: "text-purple-600",
    bgClass: "bg-purple-50/80",
    description: (
      <>
        Ensure flawless delivery with{" "}
        <span className="underline decoration-purple-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          test automation
        </span>
        , performance benchmarking, and continuous QA-led development cycles.
      </>
    ),
  },
  {
    id: 6,
    title: "Agile Process",
    icon: Workflow,
    colorClass: "text-rose-600",
    bgClass: "bg-rose-50/80",
    description: (
      <>
        We follow agile sprint cycles with iterative releases, backlog grooming,{" "}
        <span className="underline decoration-rose-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          DevOps support
        </span>
        , and milestone tracking.
      </>
    ),
  },
  {
    id: 7,
    title: "Ongoing Support",
    icon: Headphones,
    colorClass: "text-teal-600",
    bgClass: "bg-teal-50/80",
    description: (
      <>
        Get{" "}
        <span className="underline decoration-teal-500/40 decoration-2 underline-offset-4 font-semibold text-slate-800">
          long-term software maintenance
        </span>
        , updates, performance audits, and 24/7 post-launch support for every
        deployment.
      </>
    ),
  },
];

export default function ExpertMindsSection() {
  const col1 = [cards[0], cards[2], cards[4], cards[6]];
  const col2 = [cards[1], cards[3], cards[5]];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };
  return (
    <section className="relative z-20 bg-white text-slate-900 px-6 py-24 md:py-32 border-t border-slate-100">
      {/* Background glow effects wrapper (avoids overflow-hidden on the parent section to allow position: sticky) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16 relative z-10">
        {/* Left Column (Sticky on Desktop) */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-36 self-start flex flex-col gap-6 text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-orange-500" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
              Expert Minds
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Why Work With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
              IT Services India?
            </span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
            We help you hire skilled developers to build custom web, app, and
            software solutions that solve real problems and drive growth.
          </p>

          <div className="mt-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (typeof window.openQuoteModal === "function") {
                  window.openQuoteModal();
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-950 text-white font-bold transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-lg shadow-slate-950/10 hover:shadow-xl text-sm cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (Staggered Cards Grid) */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 of Cards */}
          <div className="flex flex-col gap-8">
            {col1.map((card) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="group flex flex-col items-start text-left p-8 rounded-[32px] border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgClass} ${card.colorClass} mb-6 transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="w-5.5 h-5.5 stroke-[2]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Column 2 of Cards (Staggered downwards on medium screens & up) */}
          <div className="flex flex-col gap-8 md:mt-16">
            {col2.map((card) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="group flex flex-col items-start text-left p-8 rounded-[32px] border border-slate-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${card.bgClass} ${card.colorClass} mb-6 transition-all duration-300 group-hover:scale-110`}
                  >
                    <IconComponent className="w-5.5 h-5.5 stroke-[2]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
