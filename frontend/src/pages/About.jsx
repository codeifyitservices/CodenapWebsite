import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Target, Sparkles, Cpu, TrendingUp, ArrowRight, CheckCircle, Shield, Award, Users, Headphones } from 'lucide-react'
import CTASection from '../components/CTASection'

// Animated Counter component
function AnimatedCounter({ target, duration = 1500, hasDecimal = false }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = parseFloat(target)
    if (start === end) return

    const totalSteps = 60
    const stepTime = Math.floor(duration / totalSteps)
    const increment = end / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(hasDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [target, duration, isInView, hasDecimal])

  return <span ref={ref}>{count}</span>
}

// 1. Creative Hero
function HeroSection() {
  return (
    <section className="relative pt-36 pb-20 px-6 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Grids & Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>ABOUT CODENAP</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight uppercase"
        >
          We Build Systems<br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            That Scale.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mt-2"
        >
          At CodeNap, we believe a website should unlock your business's online potential. We focus on bridging the gap between strategic brand goals and high-performance software engineering.
        </motion.p>
      </div>
    </section>
  )
}

// 2. Interactive Stats Grid
function StatsGrid() {
  const stats = [
    {
      id: 1,
      metric: "8",
      suffix: "+",
      label: "Years Experience",
      description: "Delivering custom codebases and engineering excellence.",
      glowColor: "group-hover:shadow-orange-500/10 group-hover:border-orange-500/40",
      hasDecimal: false
    },
    {
      id: 2,
      metric: "50",
      suffix: "+",
      label: "Projects Launched",
      description: "SPAs, SaaS dashboards, and eCommerce environments.",
      glowColor: "group-hover:shadow-blue-500/10 group-hover:border-blue-500/40",
      hasDecimal: false
    },
    {
      id: 3,
      metric: "99.9",
      suffix: "%",
      label: "Cloud Uptime",
      description: "High-availability architectures with CDN/DDoS protection.",
      glowColor: "group-hover:shadow-blue-500/10 group-hover:border-blue-500/40",
      hasDecimal: true
    },
    {
      id: 4,
      metric: "24",
      suffix: "/7",
      label: "Expert Support",
      description: "Direct access to senior developers and status checks.",
      glowColor: "group-hover:shadow-orange-500/10 group-hover:border-orange-500/40",
      hasDecimal: false
    }
  ]

  return (
    <section className="bg-white text-slate-900 border-t border-slate-100 py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-8 bg-slate-50 border border-slate-200/60 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300"
            >
              <div className="relative z-10 flex flex-col gap-2 items-start text-left">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {stat.id === 4 ? (
                    <span>24/7</span>
                  ) : (
                    <>
                      <AnimatedCounter target={stat.metric} hasDecimal={stat.hasDecimal} />
                      <span className="text-orange-500">{stat.suffix}</span>
                    </>
                  )}
                </div>
                <div className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 3. Interactive Process Flow (Timeline)
function ProcessTimeline() {
  const steps = [
    {
      id: "01",
      title: "Understanding Your Story",
      description: "We listen to the story and objectives of your brand, and conduct analysis to plan for successful partnering.",
      icon: Users,
      glow: "border-orange-500/20 text-orange-500"
    },
    {
      id: "02",
      title: "Tailoring Software Solutions",
      description: "We identify your software needs and quickly develop enhancements to provide you with improvements in e-commerce and digital marketing.",
      icon: Cpu,
      glow: "border-blue-500/20 text-blue-500"
    },
    {
      id: "03",
      title: "Providing Ongoing Support",
      description: "Our team of experts provides ongoing technical and marketing support to help you maximize customer engagement and sales.",
      icon: Headphones,
      glow: "border-orange-500/20 text-orange-500"
    }
  ]

  return (
    <section className="bg-slate-50 text-slate-900 border-t border-slate-200/50 py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-orange-500" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
              Working Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase max-w-4xl">
            From Vision to Launch
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            We transition your goals into structured sprints, mapping your ideas to concrete milestones.
          </p>
        </div>

        {/* Timeline Path container */}
        <div className="relative mt-8">
          {/* Vertical path line on small screens, Horizontal on large screens */}
          <div className="absolute left-8 md:left-0 md:right-0 top-0 bottom-0 md:top-8 md:bottom-auto h-full md:h-px border-l-2 md:border-t-2 border-dashed border-slate-200 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex flex-row md:flex-col items-start md:items-center gap-6 text-left md:text-center group"
                >
                  {/* Glowing Node Circle */}
                  <div className={`w-16 h-16 rounded-full bg-white border-2 ${step.glow} flex items-center justify-center shrink-0 z-10 transition-all duration-300 group-hover:scale-115 group-hover:bg-slate-50 group-hover:border-slate-800 group-hover:shadow-md`}>
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-3" />
                  </div>

                  {/* Content Block */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center md:justify-center gap-2">
                      <span className="text-xs font-mono font-bold text-orange-500">{step.id} /</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight group-hover:text-slate-950 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-xs md:mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

// 4. Tabbed Philosophy Panel (Our Approach)
function StrategicApproach() {
  const [activeTab, setActiveTab] = useState(0)

  const approachData = [
    {
      id: 0,
      tabTitle: "Collaboration",
      heading: "Strategy-First Partnering",
      description: "We believe that building a digital product isn’t just about code and design — it’s about creating lasting value for your business. Our approach is centered on direct developer integration and clear alignments.",
      bullets: [
        "Interactive goal workshops before sprint planning.",
        "Direct communication channels on developer Slack.",
        "Weekly reporting and milestone reviews."
      ],
      icon: Users,
      badge: "Partnering",
      accentColor: "text-blue-500",
      accentBg: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      id: 1,
      tabTitle: "Precision",
      heading: "Custom-Engineered Codebases",
      description: "We replace templated shortcuts with tailored, high-performance software systems. Every line of code is structured for fast rendering, security, and long-term expandability.",
      bullets: [
        "Headless and serverless system engineering.",
        "Highly-secure cloud configurations (AWS/GCP/Docker).",
        "Clean coding architecture and technical audits."
      ],
      icon: Target,
      badge: "Engineering",
      accentColor: "text-orange-500",
      accentBg: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      id: 2,
      tabTitle: "Longevity",
      heading: "Designed For Business Growth",
      description: "We are not the team that disappears after launch. Our products are architected to scale dynamically alongside your customer volume and enterprise operations.",
      bullets: [
        "Technical SEO optimization out of the box.",
        "Routine post-launch performance checks and updates.",
        "Scaling optimization to prevent server spikes."
      ],
      icon: Sparkles,
      badge: "Scale",
      accentColor: "text-blue-500",
      accentBg: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    }
  ]

  const ActiveIcon = approachData[activeTab].icon

  return (
    <section className="py-20 px-6 bg-white text-slate-900 border-t border-slate-100 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-orange-500" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
              Our Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Professional and Trust Building
          </h2>
        </div>

        {/* Main Content Grid: Tabs on Left, Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* Tab Navigation (col-span-4) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide shrink-0">
            {approachData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-2xl text-left font-bold text-sm tracking-wide shrink-0 transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-950 text-white shadow-xl scale-[1.02]'
                    : 'bg-slate-50 border border-slate-200/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {tab.tabTitle}
              </button>
            ))}
          </div>

          {/* Dynamic Content Panel (col-span-8) */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="p-8 sm:p-10 bg-slate-50 border border-slate-200/40 shadow-xl shadow-slate-100/30 rounded-3xl flex flex-col sm:flex-row gap-8 items-start relative overflow-hidden"
              >
                {/* Left side: Icon badge */}
                <div className={`w-14 h-14 rounded-2xl ${approachData[activeTab].accentBg} flex items-center justify-center shrink-0`}>
                  <ActiveIcon className={`w-7 h-7 ${approachData[activeTab].accentColor}`} />
                </div>

                {/* Right side: Texts & Bullets */}
                <div className="flex flex-col text-left gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-md">
                      {approachData[activeTab].badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {approachData[activeTab].heading}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {approachData[activeTab].description}
                  </p>

                  <ul className="flex flex-col gap-3 mt-2">
                    {approachData[activeTab].bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className={`w-4 h-4 ${approachData[activeTab].accentColor} shrink-0 mt-0.5`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}


// Main page container
export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Structural meshes & glow overlays */}
      <div className="absolute top-[35%] left-[20%] w-[600px] h-[300px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[25%] right-[20%] w-[500px] h-[250px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <HeroSection />
      <StatsGrid />
      <ProcessTimeline />
      <StrategicApproach />
      <CTASection />
    </div>
  )
}
