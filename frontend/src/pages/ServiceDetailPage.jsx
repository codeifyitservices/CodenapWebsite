import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  PhoneCall,
  ExternalLink,
  Loader2,
  Code2,
  Network,
  BrainCircuit,
  LineChart,
  Cloud,
  Workflow,
  Database,
  Smartphone,
  Layers,
  Globe,
  Cpu,
  Shield,
  Activity,
  Monitor,
  Server,
  Settings,
  Terminal,
  Layout,
  GitBranch,
  AppWindow,
  HardDrive,
  Key,
  Puzzle,
  Zap,
  Heart,
  ShoppingBag,
  Search,
  BarChart3,
  Users,
  Radio,
} from "lucide-react";

const ICON_MAP = {
  Code2,
  Network,
  BrainCircuit,
  LineChart,
  Cloud,
  Workflow,
  Database,
  Smartphone,
  Layers,
  Globe,
  Cpu,
  Shield,
  Activity,
  Monitor,
  Server,
  Settings,
  Terminal,
  Layout,
  GitBranch,
  AppWindow,
  HardDrive,
  Key,
  Puzzle,
  Zap,
  Heart,
  ShoppingBag,
  Search,
  BarChart3,
  Users,
  Radio,
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* ─── Accent Colour Map ─────────────────────────────────── */
const accentMap = {
  orange: {
    badge: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    dot: "bg-orange-500",
    glow: "from-orange-500/20 via-orange-500/5",
    iconBg: "from-orange-500 to-amber-500",
    iconShadow: "shadow-orange-500/25",
    statBorder: "border-orange-500/20",
    statNum: "text-orange-400",
    check: "text-orange-500",
    stepNum: "text-orange-500 border-orange-500/30 bg-orange-500/5",
    cta: "from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400",
    ctaGlow: "shadow-orange-500/20",
    pill: "bg-orange-500",
  },
  blue: {
    badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    dot: "bg-blue-500",
    glow: "from-blue-500/20 via-blue-500/5",
    iconBg: "from-blue-500 to-cyan-500",
    iconShadow: "shadow-blue-500/25",
    statBorder: "border-blue-500/20",
    statNum: "text-blue-400",
    check: "text-blue-500",
    stepNum: "text-blue-500 border-blue-500/30 bg-blue-500/5",
    cta: "from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400",
    ctaGlow: "shadow-blue-500/20",
    pill: "bg-blue-500",
  },
  violet: {
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    dot: "bg-violet-500",
    glow: "from-violet-500/20 via-violet-500/5",
    iconBg: "from-violet-600 to-purple-500",
    iconShadow: "shadow-violet-500/25",
    statBorder: "border-violet-500/20",
    statNum: "text-violet-400",
    check: "text-violet-500",
    stepNum: "text-violet-500 border-violet-500/30 bg-violet-500/5",
    cta: "from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400",
    ctaGlow: "shadow-violet-500/20",
    pill: "bg-violet-500",
  },
  emerald: {
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    dot: "bg-emerald-500",
    glow: "from-emerald-500/20 via-emerald-500/5",
    iconBg: "from-emerald-600 to-green-500",
    iconShadow: "shadow-emerald-500/25",
    statBorder: "border-emerald-500/20",
    statNum: "text-emerald-400",
    check: "text-emerald-500",
    stepNum: "text-emerald-500 border-emerald-500/30 bg-emerald-500/5",
    cta: "from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400",
    ctaGlow: "shadow-emerald-500/20",
    pill: "bg-emerald-500",
  },
  cyan: {
    badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    dot: "bg-cyan-500",
    glow: "from-cyan-500/20 via-cyan-500/5",
    iconBg: "from-cyan-500 to-sky-500",
    iconShadow: "shadow-cyan-500/25",
    statBorder: "border-cyan-500/20",
    statNum: "text-cyan-400",
    check: "text-cyan-500",
    stepNum: "text-cyan-500 border-cyan-500/30 bg-cyan-500/5",
    cta: "from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400",
    ctaGlow: "shadow-cyan-500/20",
    pill: "bg-cyan-500",
  },
  amber: {
    badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    dot: "bg-amber-500",
    glow: "from-amber-500/20 via-amber-500/5",
    iconBg: "from-amber-500 to-yellow-500",
    iconShadow: "shadow-amber-500/25",
    statBorder: "border-amber-500/20",
    statNum: "text-amber-400",
    check: "text-amber-500",
    stepNum: "text-amber-500 border-amber-500/30 bg-amber-500/5",
    cta: "from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400",
    ctaGlow: "shadow-amber-500/20",
    pill: "bg-amber-500",
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Project Onboarding intake form state ──
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    services: [],
    budget: "",
    timeline: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formApiError, setFormApiError] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const SERVICE_OPTIONS = [
    "Web Application Development",
    "Mobile App Development",
    "Back End Development",
    "Software Development",
    "Front End Development",
    "UI/UX Design",
    "MERN Stack Developers",
    "eCommerce Development",
    "Cross-Platform App Development",
    "Website Design and Development",
    "MVP Development Company",
    "Digital Marketing",
    "Progressive Web App Development",
  ];
  const BUDGET_OPTIONS = [
    "Under 50K",
    "50K to 1 Lakh",
    "1 - 2 Lakhs",
    "2 - 5 Lakhs",
    "5 Lakhs +",
    "Flexible Budget",
  ];
  const TIMELINE_OPTIONS = [
    "2-4 weeks",
    "1-2 months",
    "3-6 months",
    "6+ months",
    "Urgent (ASAP)",
    "Within 1 month",
    "Within 3 months",
    "Flexible / No fixed deadline",
  ];

  const handleCheckbox = (val) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(val)
        ? prev.services.filter((s) => s !== val)
        : [...prev.services, val],
    }));
    if (formErrors.services) setFormErrors((e) => ({ ...e, services: null }));
  };

  const handleField = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((e) => ({ ...e, [name]: null }));
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Enter a valid 10-digit mobile number";
    if (formData.services.length === 0)
      errs.services = "Select at least one service";
    if (!formData.budget) errs.budget = "Please select a budget";
    if (!formData.timeline) errs.timeline = "Please select a timeline";
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormLoading(true);
    setFormApiError(null);
    try {
      const res = await fetch(`${API_BASE}/api/contact/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          services: formData.services,
          budget: formData.budget,
          startTime: formData.timeline, // maps timeline → startTime
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }
      setFormSubmitted(true);
    } catch (err) {
      setFormApiError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        // Fetch specific service
        const detailRes = await fetch(`${API_BASE}/api/services/${serviceId}`);
        if (!detailRes.ok) throw new Error("Service not found");
        const detailData = await detailRes.json();
        setService(detailData);

        // Fetch all services for navigation
        const listRes = await fetch(`${API_BASE}/api/services`);
        if (listRes.ok) {
          const listData = await listRes.json();
          setServices(listData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceData();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center gap-6 text-slate-400">
        <p className="text-sm font-semibold">Loading service details…</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center gap-6 text-slate-400">
        <p className="text-xl font-semibold">Service not found.</p>
        <Link
          to="/services"
          className="flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const accent = accentMap[service.accentColor] || accentMap.orange;
  const ServiceIcon = ICON_MAP[service.icon] || Code2;

  // adjacent services for prev/next navigation
  const currentIdx = services.findIndex((s) => s.id === serviceId);
  const prevService = currentIdx > 0 ? services[currentIdx - 1] : null;
  const nextService =
    currentIdx < services.length - 1 ? services[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* ── Background ambient glow ── */}
      <div
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b ${accent.glow} to-transparent blur-[120px] rounded-full pointer-events-none z-0`}
      />

      {/* ── Grid texture overlay ── */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)] opacity-30 pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════ */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          {/* Breadcrumb */}
          <motion.div
            {...fadeUp(0)}
            className="flex items-center gap-2 text-xs text-slate-500 mb-8 font-medium"
          >
            <Link to="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/services"
              className="hover:text-slate-300 transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-300">{service.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <motion.div {...fadeUp(0.05)}>
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest ${accent.badge}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`}
                  />
                  {service.shortTitle}
                </span>
              </motion.div>

              {/* Tagline */}
              <motion.p
                {...fadeUp(0.1)}
                className="text-sm font-bold uppercase tracking-widest text-slate-500"
              >
                {service.tagline}
              </motion.p>

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.15)}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white"
              >
                {service.headline}
              </motion.h1>

              {/* Description */}
              <motion.p
                {...fadeUp(0.2)}
                className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl"
              >
                {service.description}
              </motion.p>

              {/* Key bullets */}
              <motion.ul
                {...fadeUp(0.25)}
                className="flex flex-col gap-2.5 mt-1"
              >
                {service.bulletPoints.map((pt, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-slate-300"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${accent.check}`}
                    />
                    {pt}
                  </li>
                ))}
              </motion.ul>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.3)}
                className="flex flex-wrap gap-3 mt-2"
              >
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${accent.cta} text-white text-sm font-bold shadow-lg ${accent.ctaGlow} transition-all duration-200 active:scale-95`}
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919717570933"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-300 text-sm font-bold hover:bg-slate-800 hover:text-white transition-all duration-200"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Us
                </a>
              </motion.div>
            </div>

            {/* Right — Service image card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl aspect-[4/3] bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center opacity-80"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent" />

                {/* Icon badge floating */}
                <div
                  className={`absolute bottom-6 left-6 flex items-center gap-3 bg-[#07090e]/80 backdrop-blur-md border border-slate-800 rounded-2xl px-4 py-3`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${accent.iconBg} flex items-center justify-center text-white shadow-lg ${accent.iconShadow}`}
                  >
                    <ServiceIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">
                      {service.title}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      CodeNap Service
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STATS BAR
        ═══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pb-20"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-800">
            {service.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#0c1018] px-6 py-6 flex flex-col gap-1 text-center"
              >
                <span
                  className={`text-2xl sm:text-3xl font-black ${accent.statNum}`}
                >
                  {stat.value}
                </span>
                <span className="text-slate-500 text-xs font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            LONG DESCRIPTION
        ═══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pb-24"
        >
          <div className="max-w-3xl">
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed font-light">
              {service.longDescription}
            </p>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            FEATURES GRID
        ═══════════════════════════════════════ */}
        <section className="pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <span
              className={`text-xs font-bold uppercase tracking-widest ${accent.statNum}`}
            >
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
              Everything Included
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-[#0c1018] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${accent.iconBg} flex items-center justify-center text-white shadow-md ${accent.iconShadow} shrink-0`}
                >
                  <ServiceIcon className="w-4 h-4" />
                </div>
                <h3 className="text-white font-bold text-base leading-snug">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            TECH STACK
        ═══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="pb-24"
        >
          <div className="bg-[#0c1018] border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-2 ${accent.statNum}`}
              >
                Tech Stack
              </p>
              <h3 className="text-white font-black text-xl">
                Tools & Technologies We Use
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm font-mono text-slate-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            PROCESS STEPS
        ═══════════════════════════════════════ */}
        <section className="pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <span
              className={`text-xs font-bold uppercase tracking-widest ${accent.statNum}`}
            >
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 tracking-tight">
              Our Delivery Process
            </h2>
          </motion.div>

          <div className="flex flex-col gap-4">
            {service.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-5 items-start group"
              >
                {/* Step number */}
                <div
                  className={`w-14 h-14 shrink-0 rounded-2xl border text-xl font-black flex items-center justify-center ${accent.stepNum}`}
                >
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-1 bg-[#0c1018] border border-slate-800 rounded-2xl px-6 py-5 group-hover:border-slate-700 transition-colors duration-200">
                  <h3 className="text-white font-bold text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ═══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pb-24"
        >
          <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent.cta} p-px`}
          >
            <div className="bg-[#0c1018] rounded-[calc(1.5rem-1px)] px-8 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div className="flex flex-col gap-3 max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Ready to Build with CodeNap?
                </h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Get a free consultation and project quote within 24 hours. No
                  commitment required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r ${accent.cta} text-white text-sm font-bold shadow-xl ${accent.ctaGlow} transition-all duration-200 active:scale-95 whitespace-nowrap`}
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:hello@codenap.in"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 text-sm font-bold hover:bg-slate-800 hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" />
                  hello@codenap.in
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════
            PROJECT ONBOARDING INTAKE FORM
            (Only shown on project-onboard page)
        ═══════════════════════════════════════ */}
        {serviceId === "project-onboard" && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pb-24"
          >
            <div className="bg-[#0c1018] border border-slate-800 rounded-3xl overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-yellow-400" />

              <div className="px-6 sm:px-10 py-10">
                {!formSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Schedule a Call
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                        Enter Details
                      </h2>
                      <p className="text-slate-400 text-sm mt-1.5">
                        We'll reach out within 24 hours to set up your strategy
                        session.
                      </p>
                    </div>

                    <form
                      onSubmit={handleScheduleSubmit}
                      className="flex flex-col gap-7"
                      noValidate
                    >
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-300">
                            Name <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleField}
                            placeholder="Your full name"
                            className={`bg-[#07090e] border ${
                              formErrors.name
                                ? "border-red-500/60"
                                : "border-slate-800"
                            } rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors`}
                          />
                          {formErrors.name && (
                            <p className="text-red-400 text-xs">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-slate-300">
                            Email <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleField}
                            placeholder="you@company.com"
                            className={`bg-[#07090e] border ${
                              formErrors.email
                                ? "border-red-500/60"
                                : "border-slate-800"
                            } rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors`}
                          />
                          {formErrors.email && (
                            <p className="text-red-400 text-xs">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-300">
                          Mobile Number{" "}
                          <span className="text-amber-400">*</span>
                        </label>
                        <div className="flex">
                          <span className="flex items-center px-3.5 bg-slate-900 border border-r-0 border-slate-800 rounded-l-xl text-sm text-slate-400 font-mono font-semibold select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleField}
                            placeholder="10-digit number"
                            maxLength={10}
                            className={`flex-1 bg-[#07090e] border ${
                              formErrors.mobile
                                ? "border-red-500/60"
                                : "border-slate-800"
                            } rounded-r-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors`}
                          />
                        </div>
                        {formErrors.mobile && (
                          <p className="text-red-400 text-xs">
                            {formErrors.mobile}
                          </p>
                        )}
                      </div>

                      {/* Service Dropdown Multiselect */}
                      <div className="flex flex-col gap-3" ref={dropdownRef}>
                        <label className="text-xs font-semibold text-slate-300">
                          Which service are you looking for?{" "}
                          <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between py-3 px-4.5 bg-[#07090e] border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500/60 transition-colors cursor-pointer text-left"
                          >
                            <span className="truncate pr-4 select-none">
                              {formData.services.length === 0
                                ? "Select Services"
                                : formData.services.join(", ")}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                                isDropdownOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-30 w-full mt-2 bg-[#07090e] border border-slate-800 rounded-xl shadow-2xl max-h-[250px] overflow-y-auto p-2 flex flex-col gap-1 scrollbar-thin"
                              >
                                {SERVICE_OPTIONS.map((opt) => {
                                  const isSelected = formData.services.includes(opt);
                                  return (
                                    <label
                                      key={opt}
                                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg cursor-pointer select-none transition-colors ${
                                        isSelected
                                          ? "bg-amber-500/10 text-white"
                                          : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleCheckbox(opt)}
                                        className="accent-amber-500 w-3.5 h-3.5 rounded"
                                      />
                                      <span className="text-xs font-semibold">
                                        {opt}
                                      </span>
                                    </label>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {formErrors.services && (
                          <p className="text-red-400 text-xs">
                            {formErrors.services}
                          </p>
                        )}
                      </div>

                      {/* Budget + Timeline row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Budget */}
                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-semibold text-slate-300">
                            What is your estimated Budget?{" "}
                            <span className="text-amber-400">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {BUDGET_OPTIONS.map((opt) => (
                              <label
                                key={opt}
                                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all duration-150 ${
                                  formData.budget === opt
                                    ? "border-amber-500/50 bg-amber-500/5 text-white"
                                    : "border-slate-800 bg-[#07090e] text-slate-400 hover:border-slate-700"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="budget"
                                  value={opt}
                                  checked={formData.budget === opt}
                                  onChange={handleField}
                                  className="accent-amber-500 w-3.5 h-3.5"
                                />
                                <span className="text-xs font-semibold">
                                  {opt}
                                </span>
                              </label>
                            ))}
                          </div>
                          {formErrors.budget && (
                            <p className="text-red-400 text-xs">
                              {formErrors.budget}
                            </p>
                          )}
                        </div>

                        {/* Timeline */}
                        <div className="flex flex-col gap-3">
                          <label className="text-xs font-semibold text-slate-300">
                            When are you planning to start?{" "}
                            <span className="text-amber-400">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {TIMELINE_OPTIONS.map((opt) => (
                              <label
                                key={opt}
                                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-all duration-150 ${
                                  formData.timeline === opt
                                    ? "border-amber-500/50 bg-amber-500/5 text-white"
                                    : "border-slate-800 bg-[#07090e] text-slate-400 hover:border-slate-700"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="timeline"
                                  value={opt}
                                  checked={formData.timeline === opt}
                                  onChange={handleField}
                                  className="accent-amber-500 w-3.5 h-3.5"
                                />
                                <span className="text-xs font-semibold">
                                  {opt}
                                </span>
                              </label>
                            ))}
                          </div>
                          {formErrors.timeline && (
                            <p className="text-red-400 text-xs">
                              {formErrors.timeline}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* API Error */}
                      {formApiError && (
                        <p className="text-red-400 text-sm font-semibold">
                          {formApiError}
                        </p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-70 disabled:cursor-not-allowed text-slate-950 font-black text-base tracking-wide shadow-xl shadow-amber-500/20 transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                      >
                        {formLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />{" "}
                            Submitting…
                          </>
                        ) : (
                          "Schedule!"
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* ── Success State ── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center gap-5 py-12"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-black text-white">
                        You're Scheduled!
                      </h3>
                      <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                        Thanks,{" "}
                        <span className="text-white font-semibold">
                          {formData.name}
                        </span>
                        . We've received your details and will contact you at{" "}
                        <span className="text-amber-400 font-semibold">
                          {formData.email}
                        </span>{" "}
                        within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          mobile: "",
                          services: [],
                          budget: "",
                          timeline: "",
                        });
                      }}
                      className="mt-2 px-6 py-2.5 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ══════════════════════════════════════
            PREV / NEXT SERVICES
        ═══════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="pb-24 flex flex-col sm:flex-row gap-4"
        >
          {prevService ? (
            <Link
              to={`/services/${prevService.id}`}
              className="flex-1 flex items-center gap-4 bg-[#0c1018] border border-slate-800 rounded-2xl px-6 py-5 hover:border-slate-700 hover:-translate-y-1 transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
              <div>
                <p className="text-slate-500 text-xs font-medium mb-0.5">
                  Previous Service
                </p>
                <p className="text-white font-bold text-sm">
                  {prevService.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextService ? (
            <Link
              to={`/services/${nextService.id}`}
              className="flex-1 flex items-center justify-end gap-4 bg-[#0c1018] border border-slate-800 rounded-2xl px-6 py-5 hover:border-slate-700 hover:-translate-y-1 transition-all duration-200 group text-right"
            >
              <div>
                <p className="text-slate-500 text-xs font-medium mb-0.5">
                  Next Service
                </p>
                <p className="text-white font-bold text-sm">
                  {nextService.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </motion.section>
      </div>
    </div>
  );
}
