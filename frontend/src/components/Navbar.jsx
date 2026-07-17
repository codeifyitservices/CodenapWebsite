import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Menu, X, ChevronDown, Sparkles, PhoneCall } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine if user is at top
      if (currentScrollY < 10) {
        setIsAtTop(true)
        setIsVisible(true)
      } else {
        setIsAtTop(false)
        
        // Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false) // Scrolling down -> hide navbar
        } else {
          setIsVisible(true)  // Scrolling up -> show navbar
        }
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out flex justify-center ${
        isAtTop 
          ? 'top-0 w-full px-0' 
          : 'top-4 w-full px-4 sm:px-6 md:px-8'
      } ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0 pointer-events-none'
      }`}
    >
          <header
            className={`transition-all duration-300 flex items-center justify-between w-full ${
              isAtTop
                ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 sm:px-12 py-5 max-w-full'
                : 'bg-slate-900/70 backdrop-blur-md border border-slate-800/60 rounded-full px-6 py-3 max-w-5xl shadow-2xl shadow-blue-500/5'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/codenapLogoLight.png" 
                alt="CodeNap Logo" 
                className={`object-contain transition-all duration-300 ${
                  isAtTop ? 'h-10' : 'h-8'
                }`}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${isActive 
                      ? 'text-white font-semibold' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 to-cyan-950/40 border border-blue-500/20 rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {link.name}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+919717570933"
                className="flex items-center gap-2 p-2 px-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all text-slate-400 hover:text-white text-xs font-semibold"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 9717570933</span>
              </a>
              <Link
                to="/contact"
                className={`flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-medium text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/10 ${
                  isAtTop ? 'rounded-xl' : 'rounded-full'
                }`}
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </header>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-4 right-4 mt-2 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 z-40 md:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        w-full px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-between
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-950/40 to-cyan-950/40 text-blue-400 border border-blue-500/20' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                        }
                      `}
                    >
                      {link.name}
                      <Sparkles className="w-4 h-4 text-orange-500/30" />
                    </NavLink>
                  ))}
                </div>

                <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-3">
                  <a
                    href="tel:+919717570933"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-950 text-slate-300 text-sm font-semibold border border-slate-800"
                  >
                    <PhoneCall className="w-4 h-4 text-orange-400" />
                    <span>Call +91 9717570933</span>
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm shadow-md"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
    </div>
  )
}
