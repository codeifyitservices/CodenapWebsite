import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 px-6 bg-slate-950 text-white border-t border-slate-900 relative z-10 overflow-hidden">
      {/* Glowing background overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Ready to launch your project?
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
          Map your goals to structured sprints and get direct developer Slack access. Let's build a high-performance software system together.
        </p>
        <Link to="/contact">
          <button className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/10 cursor-pointer">
            <span className="text-sm">Start Your Project</span>
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </section>
  )
}
