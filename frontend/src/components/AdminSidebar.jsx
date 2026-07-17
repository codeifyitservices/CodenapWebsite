import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  HelpCircle,
  MessageSquare,
  Briefcase,
  Users,
  LogOut,
  ArrowLeft,
  Phone,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Services", path: "/admin/services", icon: Code2 },
    { name: "FAQs", path: "/admin/faqs", icon: HelpCircle },
    { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { name: "Job Openings", path: "/admin/jobs", icon: Briefcase },
    { name: "Applications", path: "/admin/applications", icon: Users },
    { name: "Contact Info", path: "/admin/contact-info", icon: Phone },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="flex flex-col gap-8 p-6">
        {/* Header/Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-white group">
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors" />
            <span className="font-black text-xl tracking-tight uppercase">
              Code<span className="text-orange-500">Nap</span>
            </span>
            <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full font-bold ml-1">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-slate-800/60">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 text-sm font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
