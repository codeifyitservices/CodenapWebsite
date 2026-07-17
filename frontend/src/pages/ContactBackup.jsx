import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ContactBackup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    websiteUrl: "",
    projectType: "",
    details: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [contactData, setContactData] = useState({
    phone: "+91 9717570933",
    email: "hello@codenap.in",
    location: "Faridabad, Haryana, India"
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const [phoneRes, emailRes, locRes] = await Promise.all([
          fetch(`${API_BASE}/api/settings/companyPhone`),
          fetch(`${API_BASE}/api/settings/companyEmail`),
          fetch(`${API_BASE}/api/settings/companyLocationShort`)
        ]);
        const phone = phoneRes.ok ? await phoneRes.json() : null;
        const email = emailRes.ok ? await emailRes.json() : null;
        const location = locRes.ok ? await locRes.json() : null;
        
        setContactData({
          phone: phone || "+91 9717570933",
          email: email || "hello@codenap.in",
          location: location || "Faridabad, Haryana, India"
        });
      } catch (err) {
        console.error("Failed to load ContactBackup settings:", err);
      }
    };
    fetchContact();
  }, []);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "details") {
      if (value.length > 1000) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.projectType) newErrors.projectType = "Please select a project type";
    if (!formData.details.trim()) newErrors.details = "Project specifications details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="pt-52 pb-20 min-h-screen bg-[#07090e] text-slate-100 flex items-start justify-center px-6 relative overflow-hidden selection:bg-orange-500 selection:text-white">
      {/* Brand glow, single soft wash top-center like the reference */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-orange-500/10 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* SVG Decorative Circuit Lines */}
      <svg
        className="absolute top-0 left-0 w-1/3 h-1/2 opacity-20 pointer-events-none z-0"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M -50,50 L 150,50 L 250,150 L 450,150"
          stroke="url(#circuit-grad-1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="150" cy="50" r="4" fill="#3b82f6" className="animate-pulse" />
        <circle cx="250" cy="150" r="4" fill="#f97316" className="animate-pulse" />
        <defs>
          <linearGradient id="circuit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute top-0 right-0 w-1/3 h-1/2 opacity-20 pointer-events-none z-0"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M 450,80 L 250,80 L 150,180 L -50,180"
          stroke="url(#circuit-grad-2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="250" cy="80" r="4" fill="#f97316" className="animate-pulse" />
        <circle cx="150" cy="180" r="4" fill="#3b82f6" className="animate-pulse" />
        <defs>
          <linearGradient id="circuit-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background watermark - smaller, sits higher, quieter than before */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-transparent bg-gradient-to-b from-slate-800/25 to-slate-950/0 bg-clip-text text-[12vw] font-black tracking-widest uppercase select-none z-0 pointer-events-none leading-none">
        CONTACT
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
        {/* Left Panel: Text & Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col text-left gap-5"
        >
          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-semibold text-slate-300 backdrop-blur-md">
              <HelpCircle className="w-3.5 h-3.5 text-slate-200" />
              <span>Contact</span>
            </div>
          </div>

          {/* Headings */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Get in touch
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 max-w-xs">
              Have questions or ready to transform your business with high-performance digital solutions?
            </p>
          </div>

          {/* Contact Details Stack */}
          <div className="flex flex-col gap-3 mt-2">
            {/* Email card */}
            <a
              href={`mailto:${contactData.email}`}
              className="group p-4 bg-slate-950/50 backdrop-blur-md border border-slate-900 hover:border-slate-800 rounded-2xl flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    Email us
                  </span>
                  <span className="text-sm font-bold text-slate-200">
                    {contactData.email}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-950/60 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-950 group-hover:border-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* Phone card */}
            <a
              href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
              className="group p-4 bg-slate-950/50 backdrop-blur-md border border-slate-900 hover:border-slate-800 rounded-2xl flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    Call us
                  </span>
                  <span className="text-sm font-bold text-slate-200">
                    {contactData.phone}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-950/60 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-950 group-hover:border-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            {/* Location card */}
            <div className="group p-4 bg-slate-950/50 backdrop-blur-md border border-slate-900 hover:border-slate-800 rounded-2xl flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">
                    Our location
                  </span>
                  <span className="text-sm font-bold text-slate-200">
                    {contactData.location}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-950/60 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-950 group-hover:border-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel: Form card that fills the column height like the reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7 bg-transparent w-full h-full flex flex-col"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form-backup"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-3 h-full"
              >
                {/* Full Name field */}
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border rounded-2xl outline-hidden text-slate-100 placeholder-slate-500 font-medium text-sm transition-all ${
                      errors.fullName
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-slate-900 focus:border-slate-800"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-xs font-semibold flex items-center gap-1 pl-2">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email field */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className={`w-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border rounded-2xl outline-hidden text-slate-100 placeholder-slate-500 font-medium text-sm transition-all ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-slate-900 focus:border-slate-800"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs font-semibold flex items-center gap-1 pl-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={`w-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border rounded-2xl outline-hidden text-slate-100 placeholder-slate-500 font-medium text-sm transition-all ${
                        errors.phone
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-slate-900 focus:border-slate-800"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs font-semibold flex items-center gap-1 pl-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Company Name */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border border-slate-900 focus:border-slate-800 rounded-2xl outline-hidden text-slate-100 placeholder-slate-500 font-medium text-sm transition-all"
                    />
                  </div>

                  {/* Website URL */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="Website URL (e.g. https://example.com)"
                      className="w-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border border-slate-900 focus:border-slate-800 rounded-2xl outline-hidden text-slate-100 placeholder-slate-500 font-medium text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Project Type dropdown */}
                <div className="flex flex-col gap-1 relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={`w-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border rounded-2xl outline-hidden text-slate-100 font-medium text-sm transition-all appearance-none cursor-pointer ${
                      errors.projectType
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-slate-900 focus:border-slate-800"
                    }`}
                  >
                    <option value="" disabled className="bg-slate-950 text-slate-400">
                      Select Type of Solution Needed
                    </option>
                    <option value="web" className="bg-[#0e121b] text-slate-200">
                      Custom Web Development
                    </option>
                    <option value="app" className="bg-[#0e121b] text-slate-200">
                      Mobile App Development
                    </option>
                    <option value="saas" className="bg-[#0e121b] text-slate-200">
                      SaaS & Dashboard Systems
                    </option>
                    <option value="ecommerce" className="bg-[#0e121b] text-slate-200">
                      eCommerce Platforms
                    </option>
                    <option value="hosting" className="bg-[#0e121b] text-slate-200">
                      Cloud Infrastructure & Hosting
                    </option>
                    <option value="other" className="bg-[#0e121b] text-slate-200">
                      Other Custom Software
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  {errors.projectType && (
                    <span className="text-red-500 text-xs font-semibold flex items-center gap-1 pl-2 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.projectType}
                    </span>
                  )}
                </div>

                {/* Message details field */}
                <div className="flex flex-col gap-1 flex-1 min-h-[160px]">
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Tell Us What You Need (e.g. key specifications, integrations)"
                    className={`w-full h-full py-4 px-6 bg-[#0e121b]/60 backdrop-blur-lg border rounded-2xl outline-hidden text-slate-100 placeholder-slate-500 font-medium text-sm transition-all resize-none ${
                      errors.details
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-slate-900 focus:border-slate-800"
                    }`}
                  />
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 px-2 mt-1">
                    {errors.details ? (
                      <span className="text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.details}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span>{charCount} / 1000</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-slate-950 hover:bg-orange-500 hover:text-white rounded-2xl font-bold tracking-wide transition-all duration-300 shadow-md cursor-pointer hover:shadow-xl active:scale-[0.99] flex items-center justify-center mt-2"
                >
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Submit Request
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-backup"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="p-10 bg-[#0e121b]/60 backdrop-blur-lg border border-slate-900 rounded-[32px] flex flex-col items-center justify-center text-center gap-6 shadow-2xl relative overflow-hidden h-full min-h-[560px]"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />

                <div className="w-14 h-14 bg-slate-950 border border-slate-900 rounded-2xl flex items-center justify-center text-orange-500">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                    Request Received!
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm">
                    Thank you for reaching out,{" "}
                    <span className="font-bold text-slate-200">
                      {formData.fullName}
                    </span>
                    . We've received your request.
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1">
                    Our team will review your specifications and get back to you with a free quote within 24 hours.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      companyName: "",
                      websiteUrl: "",
                      projectType: "",
                      details: "",
                    });
                    setCharCount(0);
                  }}
                  className="mt-4 px-6 py-3 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Send Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
