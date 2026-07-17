import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  MapPin,
  Clock,
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Star,
  Users,
  Globe,
  TrendingUp,
  Heart,
  Lightbulb,
  Shield,
  Award,
  Code2,
  DollarSign,
  BookOpen,
  GraduationCap,
  Rocket,
  X,
  Plus,
  Minus,
  Send,
  Mail,
  RefreshCw,
  Eye,
  Cpu,
  Sparkles,
  Building2,
  Zap,
  ExternalLink,
  Upload,
  FileText,
} from "lucide-react";
import {
  hiringSteps,
  benefits,
  perksAndBenefits,
  cultureValues,
  stats,
} from "../data/careersData";

/* ── animation helper ─────────────────────────────────────── */
const fi = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* ── dynamic icon map ─────────────────────────────────────── */
const ICON_MAP = {
  Rocket,
  Cpu,
  BookOpen,
  Clock,
  TrendingUp,
  Users,
  Shield,
  DollarSign,
  Lightbulb,
  Eye,
  RefreshCw,
  Heart,
  Star,
  Code2,
  Globe,
  Building2,
  Award,
  Zap,
  Sparkles,
};
function DynIcon({ name, cls = "w-5 h-5" }) {
  const Ic = ICON_MAP[name] || Zap;
  return <Ic className={cls} />;
}

/* ── dept badge colours (dark-theme) ─────────────────────── */
const deptBadge = {
  Engineering: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  Mobile: "bg-violet-500/10 border-violet-500/20 text-violet-400",
  Design: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  Marketing: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  Sales: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  Internship: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
};

const locBadge = {
  Remote: "bg-emerald-500/10 text-emerald-400",
  Hybrid: "bg-amber-500/10 text-amber-400",
  "On-site": "bg-slate-800 text-slate-400",
};

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function HeroSection({ onScrollToJobs, showJobsSection }) {
  return (
    <section className="relative pt-36 pb-20 px-6 flex flex-col justify-center items-center overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/8 rounded-full blur-[160px] pointer-events-none" />
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25" />

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center gap-6">
        {/* Eyebrow — plain text, no pill/no pulse dot */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-orange-400 text-xs font-bold uppercase tracking-[0.2em]"
        >
          Careers at CodeNap
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight uppercase"
        >
          Build Products
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
            That Matter.
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          CodeNap builds scalable software, AI solutions, SaaS products, and
          digital experiences for startups and enterprises — while fostering a
          culture of continuous learning, real ownership, and career growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <button
            onClick={onScrollToJobs}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98]"
          >
            {showJobsSection ? "View Open Positions" : "Join Talent Pool"} <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#culture"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm transition-all"
          >
            Life at CodeNap
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-12 pt-10 border-t border-slate-800/60 w-full grid grid-cols-3 sm:grid-cols-5 gap-6"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">
                {s.value}
              </p>
              <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WHY WORK WITH US  (light section — same as About StatsGrid)
══════════════════════════════════════════════════════════════ */
function WhySection() {
  return (
    <section className="bg-white text-slate-900 border-t border-slate-100 py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header — left-aligned, no eyebrow pill */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase"
          >
            More than a job.
            <br className="hidden sm:block" /> A launchpad.
          </motion.h2>
          <motion.p
            {...fi(0.08)}
            className="text-slate-500 text-sm sm:text-base leading-relaxed"
          >
            We built CodeNap with the culture we always wished we had — where
            great work is recognised, growth is real, and every team member has
            true impact.
          </motion.p>
        </div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              {...fi(i * 0.06)}
              className="group p-6 bg-slate-50 border border-slate-200/60 rounded-3xl hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <DynIcon name={b.icon} cls="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CULTURE  (dark section)
══════════════════════════════════════════════════════════════ */
function CultureSection({ testimonials = [] }) {
  return (
    <section id="culture" className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header — heading carries an inline highlighted word, no label row */}
        <div className="flex flex-col gap-3 text-center items-center">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase max-w-3xl"
          >
            <span className="text-orange-500">Values</span> we live by, every
            day.
          </motion.h2>
          <motion.p
            {...fi(0.08)}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Culture isn't a slide deck — it's how we actually make decisions and
            treat each other.
          </motion.p>
        </div>

        {/* Culture value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cultureValues.map((v, i) => (
            <motion.div
              key={v.title}
              {...fi(i * 0.06)}
              className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/30 hover:bg-slate-900 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
                <DynIcon name={v.icon} cls="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-2">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="flex flex-col gap-6 mt-4">
          <motion.h3
            {...fi(0.04)}
            className="text-2xl sm:text-3xl font-black text-white uppercase text-center"
          >
            From the people who work here.
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => {
              const colorMap = {
                blue: {
                  ring: "border-blue-500/30",
                  bg: "bg-blue-500",
                  label: "text-blue-400",
                },
                purple: {
                  ring: "border-violet-500/30",
                  bg: "bg-violet-500",
                  label: "text-violet-400",
                },
                green: {
                  ring: "border-emerald-500/30",
                  bg: "bg-emerald-500",
                  label: "text-emerald-400",
                },
              };
              const c = colorMap[t.color] || colorMap.blue;
              return (
                <motion.div
                  key={t._id || t.name}
                  {...fi(i * 0.08)}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5 hover:border-slate-700 transition-colors"
                >
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-orange-400 fill-orange-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic flex-1">
                    &ldquo;{t.text || t.quote}&rdquo;
                  </p>
                  <div
                    className={`flex items-center gap-3 pt-3 border-t border-slate-800`}
                  >
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-800 shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center text-white font-black text-sm shrink-0`}
                      >
                        {t.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className={`text-xs ${c.label}`}>
                        {t.role} · {t.tenure}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   HIRING TIMELINE  (light section)
══════════════════════════════════════════════════════════════ */
function HiringTimeline() {
  return (
    <section className="bg-slate-50 text-slate-900 border-t border-slate-200/50 py-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        {/* Header — numbered like the steps below, no separate label row */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase max-w-3xl"
          >
            How we hire.
          </motion.h2>
          <motion.p
            {...fi(0.08)}
            className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            Transparent, respectful, and built to find mutual fit — not just
            fill a seat.
          </motion.p>
        </div>

        {/* Timeline — horizontal desktop */}
        <div className="hidden md:block relative">
          <div className="absolute top-8 left-[4.5%] right-[4.5%] h-px border-t-2 border-dashed border-slate-200 pointer-events-none" />
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {hiringSteps.map((s, i) => (
              <motion.div
                key={s.step}
                {...fi(i * 0.07)}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-orange-500/40 flex items-center justify-center font-black text-base text-orange-500 shrink-0 shadow-lg relative">
                  <span className="font-mono">{s.step}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">
                    {s.title}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-bold text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                    {s.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline — vertical mobile */}
        <div className="md:hidden flex flex-col gap-0 relative">
          <div className="absolute top-6 bottom-6 left-[27px] w-px border-l-2 border-dashed border-slate-300" />
          {hiringSteps.map((s, i) => (
            <motion.div
              key={s.step}
              {...fi(i * 0.07)}
              className="flex gap-5 pb-8 last:pb-0 relative"
            >
              <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-orange-500/40 flex items-center justify-center font-black text-sm text-orange-500 shrink-0 relative z-10 shadow-md">
                {s.step}
              </div>
              <div className="pt-3.5">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-bold text-slate-900">{s.title}</p>
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                    {s.time}
                  </span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   JOB CARD  (dark)
══════════════════════════════════════════════════════════════ */
function JobCard({ job, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      {...fi(index * 0.06)}
      className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors duration-200"
    >
      {/* Header row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4 cursor-pointer group"
        aria-expanded={open}
      >
        <div className="flex-1">
          {/* Dept badge */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${deptBadge[job.department] || "bg-slate-800 text-slate-400 border-slate-700"}`}
            >
              {job.department}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {job.badge}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-orange-400 transition-colors">
            {job.title}
          </h3>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2.5">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${locBadge[job.locationType] || "bg-slate-800 text-slate-400"}`}
            >
              {job.locationType}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {job.experience}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Briefcase className="w-3.5 h-3.5" />
              {job.type}
            </span>
            {job.salary && (
              <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                {job.salary}
              </span>
            )}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700"
              >
                {t}
              </span>
            ))}
            {job.techStack.length > 4 && (
              <span className="text-[11px] font-medium px-2 py-0.5 bg-slate-800 text-slate-500 rounded-md">
                +{job.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center gap-2 shrink-0 mt-1">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3.5 py-2 rounded-xl group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-200">
            {open ? "Collapse" : "View Role"}{" "}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          {open ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {/* Expandable */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-800 px-6 py-6 bg-slate-900/30 flex flex-col gap-6">
              <p className="text-slate-400 text-sm leading-relaxed">
                {job.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    What You'll Do
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {job.responsibilities.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    What You'll Need
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {job.requirements.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Full tech stack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply CTA */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={`mailto:careers@codenap.in?subject=Application for ${encodeURIComponent(job.title)}&body=Hi CodeNap Team,%0A%0AI'm applying for the ${encodeURIComponent(job.title)} role.%0A%0AAbout me:%0A`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
                >
                  Apply for This Role <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-slate-500 text-xs">
                  careers@codenap.in
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   OPEN POSITIONS  (dark)
══════════════════════════════════════════════════════════════ */
function JobsSection({ jobsRef, jobs = [] }) {
  const departments = [
    "All",
    ...Array.from(new Set(jobs.map((j) => j.department))),
  ];
  const locationTypes = ["All", "Remote", "Hybrid", "On-site"];
  const empTypes = ["All", "Full-time", "Internship"];

  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [locType, setLocType] = useState("All");
  const [empType, setEmpType] = useState("All");

  const filtered = jobs.filter((j) => {
    const q = query.trim().toLowerCase();
    return (
      (!q ||
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q)) &&
      (dept === "All" || j.department === dept) &&
      (locType === "All" || j.locationType === locType) &&
      (empType === "All" || j.type === empType)
    );
  });

  const activeFilters =
    (dept !== "All" ? 1 : 0) +
    (locType !== "All" ? 1 : 0) +
    (empType !== "All" ? 1 : 0);

  return (
    <section ref={jobsRef} id="jobs" className="py-20 px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase"
          >
            Find your perfect role.
          </motion.h2>
          <motion.p
            {...fi(0.08)}
            className="text-slate-400 text-sm sm:text-base max-w-xl"
          >
            {jobs.length} open positions across engineering, design,
            marketing, and more.
          </motion.p>
        </div>

        {/* Search + Filters */}
        <motion.div
          {...fi(0.1)}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search roles or departments…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-sm text-slate-200 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder-slate-500"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { val: dept, set: setDept, opts: departments },
              { val: locType, set: setLocType, opts: locationTypes },
              { val: empType, set: setEmpType, opts: empTypes },
            ].map(({ val, set, opts }, i) => (
              <select
                key={i}
                value={val}
                onChange={(e) => set(e.target.value)}
                className="text-xs font-semibold px-3 py-2 border border-slate-700 rounded-xl bg-slate-800 text-slate-300 focus:outline-none focus:border-orange-500/50 cursor-pointer"
              >
                {opts.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ))}
            {activeFilters > 0 && (
              <button
                onClick={() => {
                  setDept("All");
                  setLocType("All");
                  setEmpType("All");
                }}
                className="text-xs font-semibold px-3 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl hover:bg-orange-500/20 transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear ({activeFilters})
              </button>
            )}
          </div>
        </motion.div>

        <p className="text-slate-500 text-sm font-medium">
          Showing{" "}
          <span className="font-bold text-slate-300">{filtered.length}</span>{" "}
          position{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {filtered.length > 0 ? (
            filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))
          ) : (
            <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-bold text-white mb-1">
                No roles match your filters
              </p>
              <p className="text-slate-500 text-sm">
                Try adjusting your search, or join our talent network below.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   INTERNSHIP  (light section)
══════════════════════════════════════════════════════════════ */
function InternshipSection() {
  const highlights = [
    { icon: "Award", text: "Live client projects from week one" },
    { icon: "Users", text: "1:1 mentorship with senior engineers" },
    { icon: "BookOpen", text: "Structured learning with real feedback" },
    { icon: "TrendingUp", text: "Pre-Placement Offers for top interns" },
  ];

  return (
    <section className="bg-white text-slate-900 border-t border-slate-100 py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — content */}
          <div className="flex flex-col gap-6">
            <motion.h2
              {...fi(0.04)}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase"
            >
              Start your career
              <br />
              <span className="text-orange-500">with real work.</span>
            </motion.h2>
            <motion.p
              {...fi(0.08)}
              className="text-slate-500 text-base leading-relaxed max-w-lg"
            >
              Our internship isn't about making coffee. From day one you'll ship
              real features, get code reviewed by seniors, and build things that
              real users actually use.
            </motion.p>

            <motion.div {...fi(0.12)} className="flex flex-col gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-orange-500">
                    <DynIcon name={h.icon} cls="w-4 h-4" />
                  </div>
                  <p className="text-slate-700 font-medium text-sm">{h.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              {...fi(0.16)}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <a
                href="mailto:careers@codenap.in?subject=Internship Application — CodeNap"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
              >
                Apply for Internship <ArrowRight className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center text-slate-500 text-sm font-medium pl-1">
                ₹10K–₹15K / month · Hybrid
              </span>
            </motion.div>
          </div>

          {/* Right — stats grid */}
          <motion.div {...fi(0.1)} className="grid grid-cols-2 gap-4">
            {[
              { val: "6", unit: "months", label: "Programme Duration" },
              { val: "PPO", unit: "", label: "For Top Performers" },
              { val: "100%", unit: "", label: "Live Project Exposure" },
              { val: "24h", unit: "", label: "Mentorship Access" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
              >
                <p className="text-3xl font-black text-slate-900">
                  {s.val}
                  {s.unit && (
                    <span className="text-lg ml-1 font-semibold text-orange-500">
                      {s.unit}
                    </span>
                  )}
                </p>
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PERKS  (dark)
══════════════════════════════════════════════════════════════ */
function PerksSection() {
  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase"
          >
            We invest in our people.
          </motion.h2>
          <motion.p
            {...fi(0.08)}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl"
          >
            Beyond competitive salaries, here's what makes CodeNap a great place
            to work.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {perksAndBenefits.map((p, i) => (
            <motion.div
              key={p.title}
              {...fi(i * 0.04)}
              className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-center hover:border-orange-500/30 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="font-bold text-white text-sm mb-1.5 group-hover:text-orange-400 transition-colors">
                {p.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FAQs  (light)
══════════════════════════════════════════════════════════════ */
function FAQSection({ faqs = [] }) {
  const [open, setOpen] = useState(null);

  if (faqs.length === 0) return null;

  return (
    <section className="bg-white text-slate-900 border-t border-slate-100 py-20 px-6 relative z-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase"
          >
            Your questions, answered.
          </motion.h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f._id || i}
              {...fi(i * 0.05)}
              className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors">
                  {f.question || f.q}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-slate-200 group-hover:bg-orange-500/10 flex items-center justify-center transition-colors">
                  {open === i ? (
                    <Minus className="w-3.5 h-3.5 text-orange-500" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-4">
                      {f.answer || f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TALENT NETWORK  (dark)
══════════════════════════════════════════════════════════════ */
const NOTICE_PERIODS = [
  "Immediate Joiner",
  "15 Days",
  "30 Days",
  "60 Days",
  "90 Days",
];
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];
const EXPERIENCE_LEVELS = [
  "Fresher",
  "0–1 Years",
  "1–3 Years",
  "3–5 Years",
  "5–8 Years",
  "8+ Years",
];
const MAX_RESUME_MB = 5;
const ACCEPTED_RESUME_TYPES = [".pdf", ".doc", ".docx"];

function TalentNetwork({ jobs = [] }) {
  const appliedForOptions = [
    ...jobs.map((j) => j.title),
    "General Application",
  ];
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    noticePeriod: "",
    state: "",
    city: "",
    experience: "",
    appliedFor: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!ACCEPTED_RESUME_TYPES.includes(ext)) {
      setFileError("Only PDF, DOC or DOCX files are supported.");
      setResume(null);
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_RESUME_MB}MB.`);
      setResume(null);
      return;
    }
    setFileError("");
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setFileError("Please attach your resume.");
      return;
    }
    setLoading(true);
    setFileError("");
    try {
      const formDataToSend = new FormData();
      Object.keys(form).forEach((key) => {
        formDataToSend.append(key, form[key]);
      });
      formDataToSend.append("resume", resume);

      const res = await fetch(`${API_BASE}/api/applications/submit`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err) {
      setFileError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "px-4 py-3 text-sm bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all";
  const selectCls =
    "px-4 py-3 text-sm bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-300 transition-all cursor-pointer appearance-none";

  return (
    <section id="talent-network" className="py-20 px-6 relative z-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <motion.h2
            {...fi(0.04)}
            className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase"
          >
            No suitable role? Join our talent pool.
          </motion.h2>
          <motion.p
            {...fi(0.08)}
            className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            Leave your details and we'll reach out the moment a role matching
            your profile opens up.
          </motion.p>
        </div>

        <motion.div
          {...fi(0.1)}
          className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10"
        >
          {submitted ? (
            <div className="text-center flex flex-col items-center gap-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  You're in our network!
                </h3>
                <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
                  We've received your resume and details. We'll reach out when a
                  role matching your profile opens. Thanks,{" "}
                  <span className="font-semibold text-white">{form.name}</span>.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name / Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="jane@example.com"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Phone / Notice Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={form.countryCode}
                      onChange={(e) =>
                        setForm({ ...form, countryCode: e.target.value })
                      }
                      className={`${selectCls} w-20 shrink-0 text-center`}
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/[^0-9]/g, ""),
                        })
                      }
                      placeholder="98765 43210"
                      maxLength={10}
                      className={`${inputCls} flex-1 min-w-0`}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Notice Period *
                  </label>
                  <select
                    required
                    value={form.noticePeriod}
                    onChange={(e) =>
                      setForm({ ...form, noticePeriod: e.target.value })
                    }
                    className={selectCls}
                  >
                    <option value="" disabled>
                      Select notice period
                    </option>
                    {NOTICE_PERIODS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* State / City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Current State *
                  </label>
                  <select
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className={selectCls}
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {INDIAN_STATES.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Current City *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Faridabad"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Experience / Applied For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    No. of Experience *
                  </label>
                  <select
                    required
                    value={form.experience}
                    onChange={(e) =>
                      setForm({ ...form, experience: e.target.value })
                    }
                    className={selectCls}
                  >
                    <option value="" disabled>
                      Select experience
                    </option>
                    {EXPERIENCE_LEVELS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Applied For *
                  </label>
                  <select
                    required
                    value={form.appliedFor}
                    onChange={(e) =>
                      setForm({ ...form, appliedFor: e.target.value })
                    }
                    className={selectCls}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {appliedForOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resume upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Attach Resume *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center justify-between gap-3 px-4 py-3 bg-slate-800 border rounded-xl cursor-pointer transition-all ${
                    fileError
                      ? "border-red-500/50"
                      : "border-slate-700 hover:border-orange-500/40"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm text-slate-400 truncate">
                    <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="truncate">
                      {resume ? resume.name : "No file selected"}
                    </span>
                  </span>
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold">
                    <Upload className="w-3.5 h-3.5" /> Browse
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {fileError ? (
                  <p className="text-red-400 text-xs">{fileError}</p>
                ) : (
                  <p className="text-slate-500 text-xs">
                    Note: Only supports PDF, Doc, Docx · Maximum file size –{" "}
                    {MAX_RESUME_MB}MB
                  </p>
                )}
              </div>

              {/* Message to HR */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Message to HR
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us a bit about your background and what you're looking for…"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:opacity-70 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Application
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FINAL CTA  (same dark+orange as rest of site)
══════════════════════════════════════════════════════════════ */
function FinalCTA({ onScrollToJobs, showJobsSection, jobs = [] }) {
  return (
    <section className="bg-white text-slate-900 border-t border-slate-100 py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.h2
          {...fi(0.06)}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase leading-tight"
        >
          Ready to build the future
          <br />
          <span className="text-orange-500">with us?</span>
        </motion.h2>

        <motion.p
          {...fi(0.1)}
          className="text-slate-500 text-lg leading-relaxed max-w-xl"
        >
          {showJobsSection
            ? `Explore our ${jobs.length} open positions, find a role that excites you, and join a team that's shipping real products and growing fast. We'd love to have you.`
            : "Submit your profile to our talent pool. We'd love to connect and keep you in mind for future openings."}
        </motion.p>

        <motion.div {...fi(0.14)} className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onScrollToJobs}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all active:scale-[0.98]"
          >
            {showJobsSection ? "See Open Positions" : "Join Talent Network"} <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="mailto:careers@codenap.in"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-300 hover:border-slate-800 text-slate-600 hover:text-slate-900 font-semibold rounded-xl text-sm transition-all"
          >
            <Mail className="w-4 h-4" /> careers@codenap.in
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════════════════════════════ */
export default function Careers() {
  const jobsRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobsSection, setShowJobsSection] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        const [jobsRes, testRes, faqsRes, settingRes] = await Promise.all([
          fetch(`${API_BASE}/api/jobs`),
          fetch(`${API_BASE}/api/testimonials?category=careers`),
          fetch(`${API_BASE}/api/faqs?page=careers`),
          fetch(`${API_BASE}/api/settings/showJobsSection`),
        ]);

        if (jobsRes.ok) setJobs(await jobsRes.json());
        if (testRes.ok) setTestimonials(await testRes.json());
        if (faqsRes.ok) setFaqs(await faqsRes.json());
        if (settingRes.ok) {
          const val = await settingRes.json();
          if (val !== null) setShowJobsSection(val);
        }
      } catch (err) {
        console.error("Error loading careers data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareersData();
  }, []);

  const handleScrollToJobs = () => {
    const selector = showJobsSection ? "#jobs" : "#talent-network";
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
      {/* Global glow orbs matching other pages */}
      <div className="absolute top-[10%] left-[20%] w-[600px] h-[300px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[500px] h-[250px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[200px] bg-orange-500/5 blur-[130px] rounded-full pointer-events-none" />

      <HeroSection onScrollToJobs={handleScrollToJobs} showJobsSection={showJobsSection} />
      <WhySection />
      <CultureSection testimonials={testimonials} />
      <HiringTimeline />
      {showJobsSection && <JobsSection jobsRef={jobsRef} jobs={jobs} />}
      {/* <InternshipSection /> */}
      {/* <PerksSection /> */}
      <TalentNetwork jobs={jobs} />
      <FAQSection faqs={faqs} />
      <FinalCTA onScrollToJobs={handleScrollToJobs} showJobsSection={showJobsSection} jobs={jobs} />
    </div>
  );
}
