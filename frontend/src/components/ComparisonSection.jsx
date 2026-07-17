import React from 'react'

export default function ComparisonSection() {
  return (
    <div className="bg-slate-50 text-slate-900 border-t border-slate-100 px-6 pt-12 pb-24 md:pt-16 md:pb-32 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Headline and Badges */}
        <div className="flex flex-col items-start text-left gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-slate-400" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
              What makes us different
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-slate-900">
            We're Not the Team That Disappears <span className="text-orange-500">After Launch.</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Strategy, design, engineering and SEO under one roof - partnered with you for the long game.
          </p>
          
          {/* Badges list */}
          <div className="flex flex-wrap gap-2.5 mt-2">
            {["UX + CRO focused", "SEO-first development", "Senior team only", "Transparent reporting"].map((badge, idx) => (
              <span 
                key={badge} 
                className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-slate-200/80 text-slate-700 shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Comparison Card Table */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/60 flex flex-col w-full max-w-lg mx-auto">
          {/* Header row */}
          <div className="flex flex-row w-full border-b border-slate-100 bg-slate-50/50">
            <div className="flex-1 p-6 text-left">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight">Typical Agency</h4>
            </div>
            <div className="flex-1 p-6 text-left bg-slate-950/5 border-l border-white/5">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-950 tracking-tight flex items-center gap-1.5">
                CodeNap
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </h4>
            </div>
          </div>

          {/* Content rows - Hovering highlights both sides of the row simultaneously */}
          <div className="flex flex-col w-full">
            {[
              { typical: "Pretty designs only", codenap: "UX + CRO focused" },
              { typical: "Slow communication", codenap: "Fast, collaborative process" },
              { typical: "Generic templates", codenap: "Strategy-led solutions" },
              { typical: "Launch & disappear", codenap: "Long-term growth partner" },
              { typical: "SEO added later", codenap: "SEO-first development" }
            ].map((row, idx) => (
              <div 
                key={idx} 
                className="flex flex-row w-full border-b border-slate-100 last:border-b-0 group/row hover:bg-slate-100/30 transition-all duration-300"
              >
                {/* Left Column (Typical Agency) */}
                <div className="flex-1 p-5 text-xs sm:text-sm text-slate-500 font-medium text-left flex items-center justify-start transition-colors duration-300 group-hover/row:text-slate-800">
                  {row.typical}
                </div>
                
                {/* Right Column (CodeNap - Highlights to deeper dark/orange accent on row hover) */}
                <div className="flex-1 p-5 text-xs sm:text-sm text-slate-200 font-bold text-left flex items-center justify-start bg-slate-950 border-l border-slate-900 transition-colors duration-300 group-hover/row:bg-slate-900 group-hover/row:text-white">
                  {row.codenap}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
