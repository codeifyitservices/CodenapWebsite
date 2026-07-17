import React from 'react'
import { 
  ShoppingCart, 
  Globe, 
  HeartPulse, 
  Building2, 
  GraduationCap, 
  Truck, 
  Zap, 
  Coins, 
  Film, 
  Factory 
} from 'lucide-react'

const industriesData = [
  { id: 1, name: "Ecommerce", icon: ShoppingCart },
  { id: 2, name: "Travel & Hospitality", icon: Globe },
  { id: 3, name: "Healthcare", icon: HeartPulse },
  { id: 4, name: "Real Estate & Construction", icon: Building2 },
  { id: 5, name: "Education", icon: GraduationCap },
  { id: 6, name: "Transportation & Logistics", icon: Truck },
  { id: 7, name: "Utilities & On Demand", icon: Zap },
  { id: 8, name: "Finance & Insurance", icon: Coins },
  { id: 9, name: "Media & Entertainment", icon: Film },
  { id: 10, name: "Manufacturing", icon: Factory }
]

export default function IndustriesSection() {
  return (
    <div className="bg-slate-950 text-slate-100 border-t border-slate-900 px-6 py-24 md:py-32 relative z-20 overflow-hidden">
      {/* Background gold/orange center radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
          Industries We Serve
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3 max-w-2xl mx-auto leading-tight">
          Customized Digital Solutions For Every Industry
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed mt-4">
          We believe every industry is unique and needs customized solutions to thrive. Our web design and software development services are tailored for every industry vertical, helping our clients overcome operational challenges and achieve their goals.
        </p>

        {/* Glassmorphic Grid of 10 Industries */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-16">
          {industriesData.map((ind) => {
            const Icon = ind.icon
            return (
              <div
                key={ind.id}
                className="bg-white/20 backdrop-blur-md rounded-[24px] p-6 flex flex-col items-center justify-center gap-5 h-[175px] border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:-translate-y-3 hover:bg-white/25 hover:border-white/30 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer group"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-100 transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-amber-500 group-hover:border-white/20 group-hover:shadow-md group-hover:shadow-orange-500/20">
                  <Icon className="w-6 h-6 stroke-[1.4] transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title */}
                <span className="text-sm font-semibold tracking-wide text-white text-center transition-colors duration-300 group-hover:text-orange-300">
                  {ind.name}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
