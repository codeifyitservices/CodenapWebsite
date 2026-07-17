import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    websiteUrl: '',
    projectType: '',
    details: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'details') {
      if (value.length > 1000) return
      setCharCount(value.length)
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.projectType) newErrors.projectType = 'Please select a project type'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    // Split full name into first + last
    const nameParts = formData.fullName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || '-'

    setIsLoading(true)
    setApiError(null)
    try {
      const res = await fetch(`${API_BASE}/api/contact/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber: formData.phone,
          email: formData.email,
          message: formData.details || `Project Type: ${formData.projectType}${formData.companyName ? ' | Company: ' + formData.companyName : ''}${formData.websiteUrl ? ' | Website: ' + formData.websiteUrl : ''}`,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Something went wrong. Please try again.')
      }
      setIsSubmitted(true)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#FAF6F0] text-slate-800 flex items-center justify-center px-6 relative overflow-hidden selection:bg-orange-500 selection:text-white">
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: IT services visual */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent blur-3xl rounded-full scale-75 opacity-70 pointer-events-none" />
          
          <img 
            src="/contact_it_services.png" 
            alt="IT Services and Software Engineering illustration" 
            className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-full h-auto object-contain drop-shadow-2xl animate-float"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          />

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes float {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(1deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }
          `}} />
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7 bg-transparent"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col text-left gap-6"
              >
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                    Get a free quote in 24 hrs
                  </h1>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-3">
                    Ready to Launch a High-Performance Website?
                  </h3>
                  <p className="text-slate-50 text-sm sm:text-base leading-relaxed mt-2" style={{color: '#64748b'}}>
                    Tell us what you need — we'll get back to you with a free, no-obligation quote within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full py-3 px-1.5 bg-transparent border-b-2 outline-hidden text-slate-900 placeholder-slate-400/80 transition-all font-medium ${
                          errors.fullName ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-slate-800'
                        }`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full py-3 px-1.5 bg-transparent border-b-2 outline-hidden text-slate-900 placeholder-slate-400/80 transition-all font-medium ${
                          errors.email ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-slate-800'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Phone *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full py-3 px-1.5 bg-transparent border-b-2 outline-hidden text-slate-900 placeholder-slate-400/80 transition-all font-medium ${
                          errors.phone ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-slate-800'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Company Name</label>
                      <input 
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full py-3 px-1.5 bg-transparent border-b-2 border-slate-300 focus:border-slate-800 outline-hidden text-slate-900 placeholder-slate-400/80 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Website URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Website URL</label>
                    <input 
                      type="url" 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full py-3 px-1.5 bg-transparent border-b-2 border-slate-300 focus:border-slate-800 outline-hidden text-slate-900 placeholder-slate-400/80 transition-all font-medium"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Type of Solution Needed *</label>
                    <div className="relative">
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`w-full py-3 px-1.5 bg-transparent border-b-2 outline-hidden text-slate-900 transition-all font-medium appearance-none cursor-pointer ${
                          errors.projectType ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-slate-800'
                        }`}
                      >
                        <option value="" disabled>Select Project Type</option>
                        <option value="web">Custom Web Development</option>
                        <option value="app">Mobile App Development</option>
                        <option value="saas">SaaS & Dashboard Systems</option>
                        <option value="ecommerce">eCommerce Platforms</option>
                        <option value="hosting">Cloud Infrastructure & Hosting</option>
                        <option value="other">Other Custom Software</option>
                      </select>
                      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </div>
                    </div>
                    {errors.projectType && <p className="text-red-500 text-xs font-semibold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.projectType}</p>}
                  </div>

                  {/* Message Details */}
                  <div className="flex flex-col gap-1.5 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tell Us What You Need</label>
                      <span className="text-xs font-semibold text-slate-400">{charCount} / 1000</span>
                    </div>
                    <textarea 
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Briefly describe your goals, required features, and key integrations..."
                      rows="4"
                      className="w-full py-3 px-1.5 bg-transparent border-b-2 border-slate-300 focus:border-slate-800 outline-hidden text-slate-900 placeholder-slate-400/80 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* API Error */}
                  {apiError && (
                    <p className="text-red-500 text-sm font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />{apiError}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="mt-4">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="group inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold transition-all shadow-lg shadow-orange-500/10 cursor-pointer hover:shadow-xl hover:shadow-orange-500/20 active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /><span className="text-sm">Sending…</span></>
                      ) : (
                        <><span className="text-sm">Submit Request</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start text-left gap-6 p-8 sm:p-10 bg-white border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-200/50"
              >
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                    Request Received!
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Thank you for reaching out, <span className="font-bold text-slate-800">{formData.fullName}</span>. We've received your request.
                  </p>
                  <p className="text-slate-550 text-sm leading-relaxed mt-2" style={{color: '#64748b'}}>
                    Our engineering and consulting team will review your specifications and get back to you with a free, no-obligation quote within 24 hours.
                  </p>
                </div>
                
                <button 
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      companyName: '',
                      websiteUrl: '',
                      projectType: '',
                      details: ''
                    })
                    setCharCount(0)
                  }}
                  className="mt-4 px-6 py-3 border-2 border-slate-200 hover:border-slate-800 rounded-xl font-bold text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Send Another Request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  )
}
