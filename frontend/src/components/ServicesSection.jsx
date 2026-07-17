import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight, 
  ArrowUpRight,
  Code2, 
  Network, 
  BrainCircuit, 
  LineChart, 
  Cloud, 
  Workflow
} from 'lucide-react'

const ICON_MAP = {
  Code2,
  Network,
  BrainCircuit,
  LineChart,
  Cloud,
  Workflow
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null)

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
      <div className="flex items-center justify-center py-20 bg-white text-slate-900">
        <span>Loading services…</span>
      </div>
    );
  }

  if (services.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const card = container.querySelector('.snap-start')
      const cardWidth = card ? card.offsetWidth : 380
      const gap = 32 // gap-8 is 32px
      container.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const card = container.querySelector('.snap-start')
      const cardWidth = card ? card.offsetWidth : 380
      const gap = 32
      container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' })
    }
  }

  return (
    <div 
      id="services-section"
      className="relative z-20 mt-[100vh] bg-white text-slate-950 rounded-t-[40px] md:rounded-t-[64px] border-t border-slate-200/50 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] px-6 pt-20 pb-12 md:pt-28 md:pb-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-4 max-w-2xl text-left">
            <span className="text-xs uppercase font-extrabold tracking-widest bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-900">
              High-Performance IT Services
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We design, build, and deploy premium systems tailored to business operations. Hover over any capability to view detailed deliverables and technologies.
            </p>
          </div>
          
          {/* Scroll Navigation Buttons */}
          <div className="flex gap-3 shrink-0 pb-2">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Interactive Services Row Scroller */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pt-4 pb-8 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {services.map((service) => {
            const ServiceIcon = ICON_MAP[service.icon] || Code2;

            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                style={{ backgroundImage: `url(${service.image})` }}
                className="relative min-h-[420px] md:h-[420px] w-[290px] sm:w-[350px] md:w-[380px] shrink-0 snap-start rounded-[32px] overflow-hidden shadow-lg border border-slate-900/10 cursor-pointer bg-slate-950 bg-cover bg-center group flex flex-col justify-end p-6 transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-slate-950/75 group-hover:bg-slate-950/85 transition-colors duration-300 z-0" />
                
                {/* Subtle Tech grid mesh overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-20 z-0 pointer-events-none" />

                {/* Top Right: Link out Arrow */}
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white bg-slate-900/40 backdrop-blur-sm group-hover:bg-white group-hover:text-slate-950 transition-all duration-300 absolute top-6 right-6 z-30">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </div>

                {/* CONTENT WRAPPER */}
                <div className="relative z-10 w-full flex flex-col gap-4 text-left">
                  
                  {/* Header: Orange Icon Badge & Title */}
                  <div className="flex items-center gap-3.5 transition-transform duration-300 group-hover:-translate-y-1">
                    {/* Orange Circle Icon Badge */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 border-2 border-white/20 shrink-0">
                      <ServiceIcon className="w-5 h-5" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* DETAILS PANE: Fades and slides up on hover (always expanded on mobile touch screens) */}
                  <div className="grid grid-rows-[1fr] opacity-100 translate-y-0 md:grid-rows-[0fr] md:opacity-0 md:translate-y-2 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="overflow-hidden flex flex-col gap-4">
                      {/* Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
                        {service.description}
                      </p>

                      {/* Key deliverables */}
                      <div className="flex flex-col gap-1.5">
                        {service.bulletPoints.map((bullet, idx) => (
                          <div key={idx} className="flex gap-2 items-start text-[11px] sm:text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer: Tech Stack and Link */}
                      <div className="flex items-center justify-between border-t border-slate-800 pt-3 mt-1">
                        <div className="flex flex-wrap gap-1">
                          {service.techStack.map((tech) => (
                            <span key={tech} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-500 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <span className="flex items-center gap-1 text-xs text-orange-500 font-bold group-hover:text-orange-400 transition-colors">
                          <span>View</span>
                          <ArrowRight className="w-3 h-3 animate-pulse" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
