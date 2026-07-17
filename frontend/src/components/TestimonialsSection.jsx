import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/testimonials?category=home`);
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return null;
  }

  if (testimonials.length === 0) {
    return null;
  }
  return (
    <section className="bg-slate-50 text-slate-900 border-t border-slate-200/50 py-24 px-6 relative z-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-16">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-orange-500" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-500">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 uppercase">
            The voice of success
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            Read stories of how we've helped businesses around the globe unlock
            their online potential.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group p-8 bg-white border border-slate-100 shadow-xl shadow-slate-100/40 rounded-3xl relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-slate-200"
            >
              {/* Card content top */}
              <div className="flex flex-col gap-5 text-left">
                {/* Rating stars & Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4.5 h-4.5 fill-orange-500 text-orange-500"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-100 group-hover:text-slate-200/80 transition-colors" />
                </div>
                {/* Text */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-[400] italic">
                  "{item.text}"
                </p>
              </div>

              {/* Card Footer (Author info) */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mt-6 text-left">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 group-hover:border-orange-500/20 transition-colors"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 border-2 border-orange-500/20 flex items-center justify-center text-orange-600 font-black text-sm shrink-0 uppercase">
                    {item.initials}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-800 tracking-tight text-sm sm:text-base">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">
                    {item.role},{" "}
                    <span className="text-blue-600 font-semibold">
                      {item.company}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
