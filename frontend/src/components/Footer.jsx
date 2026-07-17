import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    "Website Development",
    "Web App Development",
    "Software Development",
    "Mobile App Development",
    "Digital Marketing",
    "Hosting"
  ]

  const techStack = [
    "C, C++ & DSA",
    "Web Frontend",
    "PHP & MySQL",
    "JAVA & MySQL",
    "MERN Stack",
    "React Native"
  ]

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200 pt-16 pb-8 px-6 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Left Column: Logo & Info */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            {/* Logo */}
            <Link to="/" className="flex items-center select-none mb-6">
              <img 
                src="/codenapLogo.png" 
                alt="CodeNap Logo" 
                className="h-10 object-contain"
              />
            </Link>
            
            {/* Contact Details */}
            <div className="flex flex-col gap-4 text-sm text-slate-600 w-full max-w-sm">
              <a 
                href="tel:+919717570933" 
                className="flex items-center gap-3 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-800 shrink-0" />
                <span>(+91) - 9717570933</span>
              </a>
              <a 
                href="mailto:hello@codenap.in" 
                className="flex items-center gap-3 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-800 shrink-0" />
                <span>hello@codenap.in</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  &amp;Work Coworking, Plot No. 5B, Sector 15A Neelam Chowk Ajronda Metro Near Crown Plaza, Faridabad, Haryana 121007
                </span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Services Column */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="font-bold text-base text-slate-900 tracking-tight mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              {services.map((item, idx) => (
                <li key={idx} className="hover:text-blue-600 transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h4 className="font-bold text-base text-slate-900 tracking-tight mb-5">
              Tech Stack
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              {techStack.map((item, idx) => (
                <li key={idx} className="hover:text-blue-600 transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-slate-200/80 mt-4" />

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            Copyright &copy; {currentYear} CodeNap. All Rights Reserved.
          </div>
          
          <div className="flex items-center gap-3">
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Terms &amp; Conditions</span>
            <span className="text-slate-300">|</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
