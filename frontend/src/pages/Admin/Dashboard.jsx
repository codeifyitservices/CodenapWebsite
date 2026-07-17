import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  HelpCircle,
  MessageSquare,
  Briefcase,
  Users,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    faqs: 0,
    testimonials: 0,
    jobs: 0,
    applications: 0,
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all data counters
        const [servicesRes, faqsRes, testimonialsRes, jobsRes, appsRes] = await Promise.all([
          fetch(`${API_BASE}/api/services`),
          fetch(`${API_BASE}/api/faqs`),
          fetch(`${API_BASE}/api/testimonials`),
          fetch(`${API_BASE}/api/jobs`),
          fetch(`${API_BASE}/api/applications`, { headers }),
        ]);

        if (!appsRes.ok) {
          throw new Error("Failed to authenticate or fetch data");
        }

        const services = await servicesRes.json();
        const faqs = await faqsRes.json();
        const testimonials = await testimonialsRes.json();
        const jobs = await jobsRes.json();
        const applications = await appsRes.json();

        setStats({
          services: services.length,
          faqs: faqs.length,
          testimonials: testimonials.length,
          jobs: jobs.length,
          applications: applications.length,
        });

        setRecentApps(applications.slice(0, 5));
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Services",
      value: stats.services,
      icon: Code2,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      link: "/admin/services",
    },
    {
      title: "FAQs",
      value: stats.faqs,
      icon: HelpCircle,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      link: "/admin/faqs",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      link: "/admin/testimonials",
    },
    {
      title: "Job Openings",
      value: stats.jobs,
      icon: Briefcase,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      link: "/admin/jobs",
    },
    {
      title: "Applications",
      value: stats.applications,
      icon: Users,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
      link: "/admin/applications",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex items-center gap-2 text-slate-400">
          <svg className="animate-spin w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading dashboard data…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl text-sm font-semibold max-w-xl">
        Error loading dashboard: {error}. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black uppercase text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Welcome back! Here's an overview of the content on your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className={`p-6 bg-slate-900 border ${card.border} rounded-2xl flex flex-col gap-4 hover:-translate-y-1 transition-all hover:bg-slate-900/80 group`}
            >
              <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {card.title}
                </p>
                <p className="text-3xl font-black text-white mt-1">
                  {card.value}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Recent Applications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Recent Job Applications
            </h2>
            <Link
              to="/admin/applications"
              className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentApps.length > 0 ? (
              recentApps.map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-800/80 hover:border-slate-700/60 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-300 text-sm uppercase">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{app.name}</p>
                      <p className="text-xs text-slate-500">
                        Applied for: <span className="font-semibold text-slate-300">{app.appliedFor}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        app.status === "Pending"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : app.status === "Shortlisted"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : app.status === "Reviewed"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}
                    >
                      {app.status}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                No job applications received yet.
              </div>
            )}
          </div>
        </div>

        {/* Quick Links / Guide */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
          <h2 className="text-lg font-black text-white uppercase tracking-tight">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-2.5">
            <Link
              to="/admin/services"
              className="flex items-center justify-between p-4 bg-slate-800/20 border border-slate-850 hover:bg-slate-800/40 rounded-2xl transition-all group font-semibold text-sm text-slate-300 hover:text-white"
            >
              Add a Service
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/admin/faqs"
              className="flex items-center justify-between p-4 bg-slate-800/20 border border-slate-850 hover:bg-slate-800/40 rounded-2xl transition-all group font-semibold text-sm text-slate-300 hover:text-white"
            >
              Add an FAQ
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/admin/testimonials"
              className="flex items-center justify-between p-4 bg-slate-800/20 border border-slate-850 hover:bg-slate-800/40 rounded-2xl transition-all group font-semibold text-sm text-slate-300 hover:text-white"
            >
              Add a Testimonial
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
            <Link
              to="/admin/jobs"
              className="flex items-center justify-between p-4 bg-slate-800/20 border border-slate-850 hover:bg-slate-800/40 rounded-2xl transition-all group font-semibold text-sm text-slate-300 hover:text-white"
            >
              Post a Job Opening
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
