import React, { useEffect, useState } from "react";
import {
  Plus, Trash2, Edit3, X, Save, ArrowLeft,
  Code2, Network, BrainCircuit, LineChart, Cloud, Workflow,
  Database, Smartphone, Layers, Globe, Cpu, Shield, Activity,
  Monitor, Server, Settings, Terminal, Layout, GitBranch,
  AppWindow, HardDrive, Key, Puzzle, Zap, Heart, ShoppingBag,
  Search, BarChart3, Users, Radio
} from "lucide-react";

const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getClosestAccentColorName = (hex) => {
  const presets = [
    { name: "orange", hex: "#f97316" },
    { name: "blue", hex: "#3b82f6" },
    { name: "violet", hex: "#8b5cf6" },
    { name: "emerald", hex: "#10b981" },
    { name: "cyan", hex: "#06b6d4" },
    { name: "amber", hex: "#f59e0b" },
  ];
  const target = hexToRgb(hex);
  if (!target) return "orange";

  let closest = presets[0];
  let minDistance = Infinity;

  for (const preset of presets) {
    const pRgb = hexToRgb(preset.hex);
    const distance = Math.sqrt(
      Math.pow(target.r - pRgb.r, 2) +
      Math.pow(target.g - pRgb.g, 2) +
      Math.pow(target.b - pRgb.b, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closest = preset;
    }
  }
  return closest.name;
};

const themeHexMap = {
  orange: "#f97316",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  emerald: "#10b981",
  cyan: "#06b6d4",
  amber: "#f59e0b",
};

const AVAILABLE_ICONS = [
  { name: "Code2", label: "Web / Dev", icon: Code2 },
  { name: "Network", label: "App / Network", icon: Network },
  { name: "BrainCircuit", label: "AI / ML", icon: BrainCircuit },
  { name: "LineChart", label: "Growth / Analytics", icon: LineChart },
  { name: "Cloud", label: "Cloud / DevOps", icon: Cloud },
  { name: "Workflow", label: "Process / Automation", icon: Workflow },
  { name: "Database", label: "Database / Backend", icon: Database },
  { name: "Smartphone", label: "Mobile / iOS", icon: Smartphone },
  { name: "Layers", label: "Architecture / Stack", icon: Layers },
  { name: "Globe", label: "Websites / SEO", icon: Globe },
  { name: "Cpu", label: "Systems / HW", icon: Cpu },
  { name: "Shield", label: "Security / Auth", icon: Shield },
  { name: "Activity", label: "Monitoring / Logs", icon: Activity },
  { name: "Monitor", label: "Frontend / UI", icon: Monitor },
  { name: "Server", label: "Server / Infra", icon: Server },
  { name: "Settings", label: "Settings / Config", icon: Settings },
  { name: "Terminal", label: "Scripts / Tools", icon: Terminal },
  { name: "Layout", label: "UI / UX Layout", icon: Layout },
  { name: "GitBranch", label: "Git / VCS", icon: GitBranch },
  { name: "AppWindow", label: "SaaS Apps", icon: AppWindow },
  { name: "HardDrive", label: "Storage", icon: HardDrive },
  { name: "Key", label: "Encryption", icon: Key },
  { name: "Puzzle", label: "Plugins / Addons", icon: Puzzle },
  { name: "Zap", label: "Speed", icon: Zap },
  { name: "Heart", label: "Healthcare", icon: Heart },
  { name: "ShoppingBag", label: "E-Commerce", icon: ShoppingBag },
  { name: "Search", label: "Search Engine", icon: Search },
  { name: "BarChart3", label: "Metrics", icon: BarChart3 },
  { name: "Users", label: "Collaboration", icon: Users },
  { name: "Radio", label: "Real-time", icon: Radio },
];

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState("list"); // list, create, edit
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState("basic"); // basic, content, interactive
  const [iconSearch, setIconSearch] = useState("");


  // Form State
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    shortTitle: "",
    tagline: "",
    headline: "",
    description: "",
    longDescription: "",
    icon: "Code2",
    accentColor: "orange",
    image: "",
    techStack: "",
    bulletPoints: "",
    tags: "",
    accent: "",
    accentShadow: "",
    accentBadge: "",
    features: [],
    process: [],
    stats: [],
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const handleOpenCreate = () => {
    setFormData({
      id: "",
      title: "",
      shortTitle: "",
      tagline: "",
      headline: "",
      description: "",
      longDescription: "",
      icon: "Code2",
      accentColor: "orange",
      image: "",
      techStack: "",
      bulletPoints: "",
      tags: "",
      accent: "",
      accentShadow: "",
      accentBadge: "",
      features: [{ title: "", desc: "" }],
      process: [{ step: "01", title: "", desc: "" }],
      stats: [{ value: "", label: "" }],
    });
    setFormMode("create");
    setActiveFormTab("basic");
    setError("");
  };

  const handleOpenEdit = (service) => {
    setFormData({
      ...service,
      techStack: service.techStack ? service.techStack.join(", ") : "",
      bulletPoints: service.bulletPoints ? service.bulletPoints.join(", ") : "",
      tags: service.tags ? service.tags.join(", ") : "",
      features: service.features && service.features.length > 0 ? service.features : [{ title: "", desc: "" }],
      process: service.process && service.process.length > 0 ? service.process : [{ step: "01", title: "", desc: "" }],
      stats: service.stats && service.stats.length > 0 ? service.stats : [{ value: "", label: "" }],
    });
    setCurrentServiceId(service.id);
    setFormMode("edit");
    setActiveFormTab("basic");
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/services/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete service");
      fetchServices();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Automatically map color categories to Tailwind CSS utility classes
    const colorMap = {
      orange: {
        accent: "from-orange-500 to-amber-500",
        accentShadow: "group-hover:shadow-orange-500/10",
        accentBadge: "text-orange-400"
      },
      blue: {
        accent: "from-blue-500 to-cyan-500",
        accentShadow: "group-hover:shadow-blue-500/10",
        accentBadge: "text-blue-400"
      },
      violet: {
        accent: "from-violet-600 to-purple-500",
        accentShadow: "group-hover:shadow-violet-500/10",
        accentBadge: "text-violet-400"
      },
      emerald: {
        accent: "from-emerald-600 to-green-500",
        accentShadow: "group-hover:shadow-emerald-500/10",
        accentBadge: "text-emerald-400"
      },
      cyan: {
        accent: "from-cyan-500 to-sky-500",
        accentShadow: "group-hover:shadow-cyan-500/10",
        accentBadge: "text-cyan-400"
      },
      amber: {
        accent: "from-amber-500 to-orange-500",
        accentShadow: "group-hover:shadow-amber-500/10",
        accentBadge: "text-amber-400"
      }
    };
    const colors = colorMap[formData.accentColor] || colorMap.orange;

    // Prepare payload
    const payload = {
      ...formData,
      ...colors,
      techStack: typeof formData.techStack === "string" ? formData.techStack.split(",").map((s) => s.trim()).filter(Boolean) : formData.techStack,
      bulletPoints: typeof formData.bulletPoints === "string" ? formData.bulletPoints.split(",").map((s) => s.trim()).filter(Boolean) : formData.bulletPoints,
      tags: typeof formData.tags === "string" ? formData.tags.split(",").map((s) => s.trim()).filter(Boolean) : formData.tags,
      features: formData.features.filter((f) => f.title.trim() && f.desc.trim()),
      process: formData.process.filter((p) => p.title.trim() && p.desc.trim()),
      stats: formData.stats.filter((s) => s.value.trim() && s.label.trim()),
    };

    const url = formMode === "create" ? `${API_BASE}/api/services` : `${API_BASE}/api/services/${currentServiceId}`;
    const method = formMode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save service");

      setFormMode("list");
      fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  // Dynamic Array Handlers
  const handleFeatureChange = (index, field, val) => {
    const updated = [...formData.features];
    updated[index][field] = val;
    setFormData({ ...formData, features: updated });
  };
  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, { title: "", desc: "" }] });
  };
  const removeFeature = (index) => {
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updated });
  };

  const handleProcessChange = (index, field, val) => {
    const updated = [...formData.process];
    updated[index][field] = val;
    setFormData({ ...formData, process: updated });
  };
  const addProcess = () => {
    const nextStep = String(formData.process.length + 1).padStart(2, "0");
    setFormData({ ...formData, process: [...formData.process, { step: nextStep, title: "", desc: "" }] });
  };
  const removeProcess = (index) => {
    const updated = formData.process
      .filter((_, i) => i !== index)
      .map((p, i) => ({ ...p, step: String(i + 1).padStart(2, "0") }));
    setFormData({ ...formData, process: updated });
  };

  const handleStatChange = (index, field, val) => {
    const updated = [...formData.stats];
    updated[index][field] = val;
    setFormData({ ...formData, stats: updated });
  };
  const addStat = () => {
    setFormData({ ...formData, stats: [...formData.stats, { value: "", label: "" }] });
  };
  const removeStat = (index) => {
    const updated = formData.stats.filter((_, i) => i !== index);
    setFormData({ ...formData, stats: updated });
  };

  const inputCls =
    "px-4 py-2.5 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Manage Services
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, update, and manage your service offerings.
          </p>
        </div>
        {formMode === "list" && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {loading && formMode === "list" ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="animate-spin w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Loading services…</span>
          </div>
        </div>
      ) : formMode === "list" ? (
        /* TABLE LIST */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/50">
                  <th className="py-4 px-6">Service Slug</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Tagline</th>
                  <th className="py-4 px-6">Accent Color</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-y-slate-850">
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service._id} className="hover:bg-slate-850/20 transition-colors">
                      <td className="py-4 px-6 text-sm font-semibold text-orange-400">
                        {service.id}
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-white">
                        {service.title}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400 max-w-[200px] truncate">
                        {service.tagline}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${
                            service.accentColor === "orange"
                              ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                              : service.accentColor === "blue"
                              ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                              : service.accentColor === "violet"
                              ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                              : service.accentColor === "emerald"
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : service.accentColor === "cyan"
                              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          }`}
                        >
                          {service.accentColor}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-slate-400 text-sm">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(service)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                      No services found. Click "Add Service" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CREATE OR EDIT FORM */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormMode("list")}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-black text-white uppercase">
              {formMode === "create" ? "Create Service" : `Edit Service: ${formData.title}`}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Improved Form Tab Navigation */}
            <div className="flex border-b border-slate-800 gap-4 mb-2">
              <button
                type="button"
                onClick={() => setActiveFormTab("basic")}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                  activeFormTab === "basic" ? "text-orange-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                1. Basic Info & Style
                {activeFormTab === "basic" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab("content")}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                  activeFormTab === "content" ? "text-orange-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                2. Descriptions & Tech Stack
                {activeFormTab === "content" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab("interactive")}
                className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                  activeFormTab === "interactive" ? "text-orange-500" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                3. Features, Steps & Stats
                {activeFormTab === "interactive" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            </div>

            {/* TAB 1: BASIC INFO & STYLE */}
            {activeFormTab === "basic" && (
              <div className="flex flex-col gap-6">
                {/* Row 1: ID, Title, ShortTitle */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Service Slug (ID) *
                    </label>
                    <input
                      required
                      disabled={formMode === "edit"}
                      type="text"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="e.g. web-development"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Title *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Web Development"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Short Title
                    </label>
                    <input
                      type="text"
                      value={formData.shortTitle}
                      onChange={(e) => setFormData({ ...formData, shortTitle: e.target.value })}
                      placeholder="e.g. Web Dev"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Row 2: Tagline, Headline, Image */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Code That Converts."
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      placeholder="e.g. High-Performance Web Applications Built to Scale"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Image Path / URL
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="e.g. /web_dev.png"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Icon Selection Grid with Search */}
                <div className="flex flex-col gap-3 bg-slate-850/20 border border-slate-800 rounded-3xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Select Service Icon
                    </label>
                    <input
                      type="text"
                      value={iconSearch}
                      onChange={(e) => setIconSearch(e.target.value)}
                      placeholder="Search icons (e.g. database, server)..."
                      className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 text-slate-300 w-full sm:max-w-xs placeholder-slate-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[220px] overflow-y-auto pr-2 mt-1 custom-scrollbar">
                    {AVAILABLE_ICONS.filter(ico => 
                      ico.name.toLowerCase().includes(iconSearch.toLowerCase()) || 
                      ico.label.toLowerCase().includes(iconSearch.toLowerCase())
                    ).map((ico) => {
                      const IconComp = ico.icon;
                      const isSelected = formData.icon === ico.name;
                      return (
                        <button
                          key={ico.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: ico.name })}
                          className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-orange-500/10 border-orange-500 text-orange-400 scale-[1.02] shadow-lg font-bold"
                              : "bg-slate-850 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                          }`}
                          title={ico.name}
                        >
                          <IconComp className="w-5 h-5" />
                          <span className="text-[9px] uppercase font-bold tracking-tight text-center leading-none truncate w-full">{ico.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accent Color Palette Selector with HTML Color picker */}
                <div className="flex flex-col gap-3 bg-slate-850/20 border border-slate-800 rounded-3xl p-6">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Select Accent Theme Color (Custom HTML Color Picker)
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-1">
                    {/* Color Picker HTML Input */}
                    <div className="flex items-center gap-3 bg-slate-900 border border-slate-850 p-2.5 rounded-2xl shrink-0">
                      <input
                        type="color"
                        value={themeHexMap[formData.accentColor] || "#f97316"}
                        onChange={(e) => {
                          const closestTheme = getClosestAccentColorName(e.target.value);
                          setFormData({ ...formData, accentColor: closestTheme });
                        }}
                        className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer outline-none"
                        style={{ padding: 0 }}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500">Choose Color</span>
                        <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider mt-0.5">
                          {themeHexMap[formData.accentColor] || "#f97316"}
                        </span>
                      </div>
                    </div>

                    {/* Matched Curated Theme Indicator */}
                    <div className="flex-1 flex flex-col gap-1.5 p-3 bg-slate-900/50 border border-slate-850 rounded-2xl w-full">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Matched Theme Category</span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-full inline-block ${
                            formData.accentColor === "orange" ? "bg-orange-500" :
                            formData.accentColor === "blue" ? "bg-blue-500" :
                            formData.accentColor === "violet" ? "bg-violet-500" :
                            formData.accentColor === "emerald" ? "bg-emerald-500" :
                            formData.accentColor === "cyan" ? "bg-cyan-500" : "bg-amber-500"
                          }`}
                        />
                        <span className="text-sm font-black text-white capitalize tracking-wide">
                          {formData.accentColor} Theme
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DESCRIPTIONS & TECH STACK */}
            {activeFormTab === "content" && (
              <div className="flex flex-col gap-6">
                {/* Description & Long Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Brief Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Briefly describe this service..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Long Detailed Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.longDescription}
                      onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                      placeholder="Detailed layout description used on detail pages..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>

                {/* Metadata Arrays: Tech Stack, Bullet Points, Tags */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tech Stack (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                      placeholder="e.g. React, Next.js, Node.js"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Bullet Points (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formData.bulletPoints}
                      onChange={(e) => setFormData({ ...formData, bulletPoints: e.target.value })}
                      placeholder="e.g. Custom SPAs, Serverless APIs"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Listing Tags (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g. React, Next.js, Node.js"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FEATURES, TIMELINE STEPS & STATS */}
            {activeFormTab === "interactive" && (
              <div className="flex flex-col gap-6">
                {/* Features Editor */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Detailed Features ({formData.features.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      + Add Feature
                    </button>
                  </div>
                  {formData.features.map((feat, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-slate-850/20 border border-slate-800 rounded-2xl relative">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          required
                          type="text"
                          value={feat.title}
                          onChange={(e) => handleFeatureChange(i, "title", e.target.value)}
                          placeholder="Feature Title"
                          className={inputCls}
                        />
                        <input
                          required
                          type="text"
                          value={feat.desc}
                          onChange={(e) => handleFeatureChange(i, "desc", e.target.value)}
                          placeholder="Feature Description"
                          className={inputCls}
                        />
                      </div>
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(i)}
                          className="p-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-xl transition-all cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <hr className="border-slate-800" />

                {/* Process Timeline Editor */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Process Steps ({formData.process.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addProcess}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      + Add Step
                    </button>
                  </div>
                  {formData.process.map((proc, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-slate-850/20 border border-slate-800 rounded-2xl relative">
                      <span className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400 shrink-0 mt-1">
                        {proc.step}
                      </span>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          required
                          type="text"
                          value={proc.title}
                          onChange={(e) => handleProcessChange(i, "title", e.target.value)}
                          placeholder="Step Title"
                          className={inputCls}
                        />
                        <input
                          required
                          type="text"
                          value={proc.desc}
                          onChange={(e) => handleProcessChange(i, "desc", e.target.value)}
                          placeholder="Step Description"
                          className={inputCls}
                        />
                      </div>
                      {formData.process.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProcess(i)}
                          className="p-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-xl transition-all cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <hr className="border-slate-800" />

                {/* Stats Editor */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Service Stats ({formData.stats.length})
                    </h3>
                    <button
                      type="button"
                      onClick={addStat}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all cursor-pointer"
                    >
                      + Add Stat
                    </button>
                  </div>
                  {formData.stats.map((stat, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-slate-850/20 border border-slate-800 rounded-2xl relative">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          required
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleStatChange(i, "value", e.target.value)}
                          placeholder="Stat Value (e.g. 120+, < 2s)"
                          className={inputCls}
                        />
                        <input
                          required
                          type="text"
                          value={stat.label}
                          onChange={(e) => handleStatChange(i, "label", e.target.value)}
                          placeholder="Stat Label (e.g. Uptime, Load Time)"
                          className={inputCls}
                        />
                      </div>
                      {formData.stats.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStat(i)}
                          className="p-2 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-xl transition-all cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setFormMode("list")}
                className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
