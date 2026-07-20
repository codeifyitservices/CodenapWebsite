import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Smartphone,
  Database,
  Code2,
  Monitor,
  Layers,
  Cpu,
  ShoppingBag,
  GitBranch,
  Layout,
  Zap,
  LineChart,
  AppWindow,
  Coins,
  Clock,
} from "lucide-react";

const SERVICE_OPTIONS = [
  { name: "Web Application Development", icon: Globe },
  { name: "Mobile App Development", icon: Smartphone },
  { name: "Back End Development", icon: Database },
  { name: "Software Development", icon: Code2 },
  { name: "Front End Development", icon: Monitor },
  { name: "UI/UX Design", icon: Layers },
  { name: "MERN Stack Developers", icon: Cpu },
  { name: "eCommerce Development", icon: ShoppingBag },
  { name: "Cross-Platform App Development", icon: GitBranch },
  { name: "Website Design and Development", icon: Layout },
  { name: "MVP Development Company", icon: Zap },
  { name: "Digital Marketing", icon: LineChart },
  { name: "Progressive Web App Development", icon: AppWindow },
];

const BUDGET_OPTIONS = [
  { name: "Under 50K", icon: Coins },
  { name: "50K to 1 Lakh", icon: Coins },
  { name: "1 - 2 Lakhs", icon: Coins },
  { name: "2 - 5 Lakhs", icon: Coins },
  { name: "5 Lakhs +", icon: Coins },
  { name: "Flexible Budget", icon: Coins },
];

const TIMELINE_OPTIONS = [
  { name: "2-4 weeks", icon: Clock },
  { name: "1-2 months", icon: Clock },
  { name: "3-6 months", icon: Clock },
  { name: "6+ months", icon: Clock },
  { name: "Urgent (ASAP)", icon: Clock },
  { name: "Within 1 month", icon: Clock },
  { name: "Within 3 months", icon: Clock },
  { name: "Flexible / No fixed deadline", icon: Clock },
];

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function QuoteModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    services: [SERVICE_OPTIONS[0].name], // Pre-select first option
    budget: BUDGET_OPTIONS[0].name, // Pre-select first option
    timeline: TIMELINE_OPTIONS[0].name, // Pre-select first option
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  if (!isOpen) return null;

  const handleCheckbox = (val) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(val)
        ? prev.services.filter((s) => s !== val)
        : [...prev.services, val],
    }));
    if (formErrors.services) setFormErrors((e) => ({ ...e, services: null }));
  };

  const handleRadio = (name, val) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (formErrors[name]) setFormErrors((e) => ({ ...e, [name]: null }));
  };

  const handleField = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((e) => ({ ...e, [name]: null }));
  };

  const validateStep4 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Enter a valid 10-digit mobile number";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (formData.services.length === 0) {
        setFormErrors({ services: "Please select at least one service" });
        return;
      }
    }
    if (currentStep === 4) {
      if (!validateStep4()) return;
      handleSubmit();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setApiError(null);
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
          startTime: formData.timeline, // maps timeline to startTime
        }),
      });

      if (!res.ok) throw new Error("Submission failed. Please try again.");

      setCurrentStep(5); // Move to Success State
    } catch (err) {
      setApiError(
        err.message || "Something went wrong. Please check your inputs.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      services: [SERVICE_OPTIONS[0].name],
      budget: BUDGET_OPTIONS[0].name,
      timeline: TIMELINE_OPTIONS[0].name,
    });
    setFormErrors({});
    setApiError(null);
    setCurrentStep(1);
    onClose();
  };

  const totalSteps = 4;
  const progressPercent = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-0 sm:p-4">
      {/* Modal Dialog Box */}
      <div className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[860px] bg-slate-900 border-0 sm:border border-slate-800/80 sm:rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative text-left select-none">
        {/* Glowing Top Progress Bar */}
        {currentStep <= totalSteps && (
          <div className="w-full h-1.5 bg-slate-850 relative overflow-hidden shrink-0">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-2.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800 transition-all z-50 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Inner Container */}
        <div className="px-6 sm:px-10 pt-10 pb-6 flex-1 flex flex-col justify-between overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: SERVICES (2-Column Card Grid) */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-orange-500">
                    Step 1 of 4
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    What service do you need?
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Select one or more services to proceed.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {SERVICE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.services.includes(opt.name);
                    return (
                      <label
                        key={opt.name}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                          isSelected
                            ? "border-orange-500/80 bg-orange-500/[0.04] text-white shadow-lg shadow-orange-500/[0.02]"
                            : "border-slate-800/80 bg-[#07090e]/60 text-slate-400 hover:border-slate-700/80 hover:text-slate-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCheckbox(opt.name)}
                          className="hidden"
                        />
                        <div
                          className={`p-1.5 rounded-xl transition-colors duration-250 ${
                            isSelected
                              ? "bg-orange-500/10 text-orange-500"
                              : "bg-slate-800/40 text-slate-500"
                          }`}
                        >
                          <Icon className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                          {opt.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {formErrors.services && (
                  <p className="text-red-400 text-xs mt-1">
                    {formErrors.services}
                  </p>
                )}
              </motion.div>
            )}

            {/* STEP 2: BUDGET (3-Column Horizontal segments) */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-orange-500">
                    Step 2 of 4
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    What is your estimated budget?
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Select a budget range that matches your expectations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {BUDGET_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.budget === opt.name;
                    return (
                      <label
                        key={opt.name}
                        className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                          isSelected
                            ? "border-orange-500/80 bg-orange-500/[0.04] text-white shadow-lg shadow-orange-500/[0.02]"
                            : "border-slate-800/80 bg-[#07090e]/60 text-slate-400 hover:border-slate-700/80 hover:text-slate-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={opt.name}
                          checked={isSelected}
                          onChange={() => handleRadio("budget", opt.name)}
                          className="hidden"
                        />
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-250 ${
                            isSelected
                              ? "bg-orange-500/10 text-orange-500"
                              : "bg-slate-800/40 text-slate-500"
                          }`}
                        >
                          <Icon className="w-4 h-4 stroke-[2]" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                          {opt.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: TIMELINE (4-Column Segment grid) */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-orange-500">
                    Step 3 of 4
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    When do you plan to start?
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Choose your preferred timeline for initiation.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIMELINE_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.timeline === opt.name;
                    return (
                      <label
                        key={opt.name}
                        className={`flex flex-col gap-2 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 select-none text-center sm:text-left ${
                          isSelected
                            ? "border-orange-500/80 bg-orange-500/[0.04] text-white shadow-lg shadow-orange-500/[0.02]"
                            : "border-slate-800/80 bg-[#07090e]/60 text-slate-400 hover:border-slate-700/80 hover:text-slate-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={opt.name}
                          checked={isSelected}
                          onChange={() => handleRadio("timeline", opt.name)}
                          className="hidden"
                        />
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center mx-auto sm:mx-0 transition-colors duration-250 ${
                            isSelected
                              ? "bg-orange-500/10 text-orange-500"
                              : "bg-slate-800/40 text-slate-500"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 stroke-[2]" />
                        </div>
                        <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                          {opt.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONTACT INFO (Optimized grid) */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-orange-500">
                    Step 4 of 4
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Tell us about yourself
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Enter your details below to submit your quote request.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Name + Email grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleField}
                        placeholder="Your full name"
                        className={`bg-[#07090e]/60 border ${
                          formErrors.name
                            ? "border-red-500/60"
                            : "border-slate-800"
                        } rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500/60 transition-colors`}
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleField}
                        placeholder="you@company.com"
                        className={`bg-[#07090e]/60 border ${
                          formErrors.email
                            ? "border-red-500/60"
                            : "border-slate-800"
                        } rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500/60 transition-colors`}
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone number */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="flex items-center px-4 bg-slate-800/40 border border-r-0 border-slate-800 rounded-l-2xl text-xs sm:text-sm text-slate-400 font-mono font-bold select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleField}
                        placeholder="10-digit number"
                        maxLength={10}
                        className={`flex-1 bg-[#07090e]/60 border ${
                          formErrors.mobile
                            ? "border-red-500/60"
                            : "border-slate-800"
                        } rounded-r-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:border-orange-500/60 transition-colors`}
                      />
                    </div>
                    {formErrors.mobile && (
                      <p className="text-red-400 text-xs mt-0.5">
                        {formErrors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {apiError && (
                  <p className="text-red-400 text-xs sm:text-sm font-semibold">
                    {apiError}
                  </p>
                )}
              </motion.div>
            )}

            {/* STEP 5: SUCCESS STATE */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center text-center gap-5 py-8"
              >
                <div className="w-16 h-16 rounded-3xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shadow-lg shadow-orange-500/5">
                  <CheckCircle2 className="w-8 h-8 text-orange-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white">
                    Request Received!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-sm leading-relaxed mt-1">
                    We have received your request, our team will get back to you
                    shortly.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="mt-6 px-7 py-3 rounded-2xl border border-slate-800 text-xs font-bold text-slate-450 hover:text-slate-200 hover:border-slate-700 transition-colors cursor-pointer bg-slate-950/40 hover:bg-slate-900"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation Buttons */}
          {currentStep <= totalSteps && (
            <div className="flex items-center gap-4 mt-8 border-t border-slate-800/80 pt-6 shrink-0">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}
              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    Submitting…
                  </span>
                ) : (
                  <>
                    <span>
                      {currentStep === 4 ? "Submit Request" : "Continue"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
