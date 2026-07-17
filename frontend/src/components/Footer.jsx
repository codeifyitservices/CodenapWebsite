import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [contactData, setContactData] = React.useState({
    phone: "+91 9717570933",
    email: "hello@codenap.in",
    address: "&Work Coworking, Plot No. 5B, Sector 15A Neelam Chowk Ajronda Metro Near Crown Plaza, Faridabad, Haryana 121007"
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  React.useEffect(() => {
    const fetchContact = async () => {
      try {
        const [phoneRes, emailRes, addrRes] = await Promise.all([
          fetch(`${API_BASE}/api/settings/companyPhone`),
          fetch(`${API_BASE}/api/settings/companyEmail`),
          fetch(`${API_BASE}/api/settings/companyAddress`)
        ]);
        const phone = phoneRes.ok ? await phoneRes.json() : null;
        const email = emailRes.ok ? await emailRes.json() : null;
        const address = addrRes.ok ? await addrRes.json() : null;
        
        setContactData({
          phone: phone || "+91 9717570933",
          email: email || "hello@codenap.in",
          address: address || "&Work Coworking, Plot No. 5B, Sector 15A Neelam Chowk Ajronda Metro Near Crown Plaza, Faridabad, Haryana 121007"
        });
      } catch (err) {
        console.error("Failed to load footer contact settings:", err);
      }
    };
    fetchContact();
  }, []);

  const services = [
    { name: "Web Development", slug: "web-development" },
    { name: "App Development", slug: "app-development" },
    { name: "AI Development", slug: "ai-development" },
    { name: "Digital Marketing", slug: "digital-marketing" },
    { name: "Cloud Hosting", slug: "hosting" },
    { name: "Project Onboarding", slug: "project-onboarding" },
  ];

  const techStack = [
    "C, C++ & DSA",
    "Web Frontend",
    "PHP & MySQL",
    "JAVA & MySQL",
    "MERN Stack",
    "React Native",
  ];

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
                href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-800 shrink-0" />
                <span>{contactData.phone}</span>
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center gap-3 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-800 shrink-0" />
                <span>{contactData.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {contactData.address}
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
              {services.map((item) => (
                <li key={item.slug}>
                  <Link
                    to={`/services/${item.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Column */}
          <div className="md:col-span-2 flex flex-col items-start text-left">
            <h4 className="font-bold text-base text-slate-900 tracking-tight mb-5">
              Tech Stack
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              {techStack.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-1 flex flex-col items-start text-left">
            <h4 className="font-bold text-base text-slate-900 tracking-tight mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-blue-600 transition-colors font-semibold text-orange-500"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
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
            <span className="hover:text-slate-800 transition-colors cursor-pointer">
              Terms &amp; Conditions
            </span>
            <span className="text-slate-300">|</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
