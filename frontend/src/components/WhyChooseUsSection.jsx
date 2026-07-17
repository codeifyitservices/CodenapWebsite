import React from 'react'
import { motion } from 'framer-motion'
import { Target, Sparkles, Cpu, TrendingUp } from 'lucide-react'

const features = [
  {
    id: 1,
    title: "Strategy-First Planning",
    description: "We understand your business goals, target audience, competitors, and project requirements before creating a digital solution that supports real business outcomes.",
    icon: Target,
    iconColor: "text-orange-500",
    hoverClasses: "group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-orange-600 group-hover:shadow-orange-500/20"
  },
  {
    id: 2,
    title: "Conversion-Focused UI/UX",
    description: "We design clean, mobile-friendly interfaces that improve user flow, reduce friction, and help turn visitors into leads, customers, and repeat users.",
    icon: Sparkles,
    iconColor: "text-blue-600",
    hoverClasses: "group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-blue-700 group-hover:shadow-blue-600/20"
  },
  {
    id: 3,
    title: "Custom Web & App Development",
    description: "From business websites and web apps to eCommerce platforms and CMS solutions, we build scalable digital products with clean, reliable, and secure code.",
    icon: Cpu,
    iconColor: "text-orange-500",
    hoverClasses: "group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-orange-600 group-hover:shadow-orange-500/20"
  },
  {
    id: 4,
    title: "SEO & Performance-Ready",
    description: "We develop fast, responsive, and search-friendly websites with proper structure, optimized layouts, and a strong technical foundation for long-term growth.",
    icon: TrendingUp,
    iconColor: "text-blue-600",
    hoverClasses: "group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-blue-700 group-hover:shadow-blue-600/20"
  }
]

export default function WhyChooseUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  }

  return (
    <div className="bg-white text-slate-900 border-t border-slate-100 px-6 py-20 md:py-28 relative z-20 overflow-hidden">
      {/* Background soft glow effects */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-orange-500" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-slate-900">
            Engineered for Growth, <span className="text-orange-500">Built for Performance.</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-2">
            We build custom websites, web apps, and eCommerce solutions with a strong focus on strategy, user experience, performance, and long-term business growth.
          </p>
        </div>

        {/* Differentiators Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-4"
        >
          {/* Vertical dashed line (large screens only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-slate-200/80 -translate-x-1/2 pointer-events-none" />
          
          {/* Horizontal dashed line (large screens only) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-slate-200/80 -translate-y-1/2 pointer-events-none" />

          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                className="group flex flex-col sm:flex-row items-start gap-6 p-2 rounded-2xl transition-all duration-300 hover:bg-slate-50/50"
              >
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-full border border-slate-100 bg-white flex items-center justify-center ${feature.iconColor} shadow-sm shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg ${feature.hoverClasses}`}>
                  <Icon className="w-7 h-7 stroke-[1.5] transition-transform duration-300 group-hover:rotate-6" />
                </div>

                {/* Content */}
                <div className="flex flex-col text-left">
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-2.5 transition-colors duration-300 group-hover:text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}
