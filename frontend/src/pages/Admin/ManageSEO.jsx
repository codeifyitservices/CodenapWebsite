import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Info,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TABS = [
  { key: "home",     label: "Home",             route: "/" },
  { key: "about",    label: "About Us",          route: "/about" },
  { key: "services", label: "Services Listing",  route: "/services" },
  { key: "careers",  label: "Careers",           route: "/careers" },
  { key: "contact",  label: "Contact",           route: "/contact" },
];

const EMPTY_SEO = {
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
};

function SeoForm({ data, onChange }) {
  const fields = [
    {
      key: "metaTitle",
      label: "Meta Title",
      hint: "Recommended: 50–60 characters",
      type: "input",
    },
    {
      key: "metaDescription",
      label: "Meta Description",
      hint: "Recommended: 150–160 characters",
      type: "textarea",
    },
    {
      key: "metaKeywords",
      label: "Keywords",
      hint: "Comma-separated, e.g. web development, mobile app",
      type: "input",
    },
    {
      key: "ogTitle",
      label: "OG Title",
      hint: "Open Graph title (social share). Defaults to Meta Title if blank.",
      type: "input",
    },
    {
      key: "ogDescription",
      label: "OG Description",
      hint: "Open Graph description (social share). Defaults to Meta Description if blank.",
      type: "textarea",
    },
    {
      key: "ogImage",
      label: "OG Image URL",
      hint: "Full URL to the social share image (1200×630px recommended)",
      type: "input",
    },
    {
      key: "canonicalUrl",
      label: "Canonical URL",
      hint: "Full canonical URL, e.g. https://codenap.in/about",
      type: "input",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {fields.map((f) => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {f.label}
          </label>
          {f.type === "textarea" ? (
            <textarea
              rows={3}
              value={data[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              placeholder={f.hint}
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 transition-all resize-none"
            />
          ) : (
            <input
              type="text"
              value={data[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              placeholder={f.hint}
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 transition-all"
            />
          )}
          <p className="text-[11px] text-slate-600 flex items-center gap-1.5 pl-1">
            <Info className="w-3 h-3 shrink-0" />
            {f.hint}
          </p>
          {/* Character counter for title/description */}
          {(f.key === "metaTitle" || f.key === "metaDescription") && data[f.key] && (
            <p
              className={`text-[11px] pl-1 font-semibold ${
                (f.key === "metaTitle" && data[f.key].length > 60) ||
                (f.key === "metaDescription" && data[f.key].length > 160)
                  ? "text-red-400"
                  : "text-emerald-500"
              }`}
            >
              {data[f.key].length} chars
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ManageSEO() {
  const [activeTab, setActiveTab] = useState("home");
  const [formData, setFormData] = useState({ ...EMPTY_SEO });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }

  const token = localStorage.getItem("adminToken");

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSEO = useCallback(
    async (key) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/settings/seo_${key}`);
        const data = await res.json();
        setFormData(data ? { ...EMPTY_SEO, ...data } : { ...EMPTY_SEO });
      } catch {
        setFormData({ ...EMPTY_SEO });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchSEO(activeTab);
  }, [activeTab, fetchSEO]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/settings/seo_${activeTab}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: formData }),
      });
      if (!res.ok) throw new Error("Failed to save");
      showToast("success", "SEO data saved successfully!");
    } catch {
      showToast("error", "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const activeTabObj = TABS.find((t) => t.key === activeTab);

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-orange-500/10 rounded-xl">
              <Search className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className="text-3xl font-black uppercase text-white tracking-tight">
              SEO & Metadata
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1 pl-1">
            Manage meta tags, Open Graph data, and canonical URLs for each public page.
          </p>
        </div>

        {/* Toast */}
        {toast && (
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold border ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            {toast.msg}
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-orange-500" />
            <div>
              <p className="text-sm font-bold text-white">{activeTabObj?.label} Page</p>
              <p className="text-xs text-slate-500 font-mono">{activeTabObj?.route}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>

        {/* Form Body */}
        <div className="px-8 py-7">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-2.5 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                <span className="text-sm">Loading SEO data…</span>
              </div>
            </div>
          ) : (
            <SeoForm data={formData} onChange={handleChange} />
          )}
        </div>

        {/* Card Footer — Save shortcut */}
        <div className="px-8 py-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-600">
            Changes apply on the next page load by visitors.
          </p>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* SEO Preview Hint */}
      <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl px-6 py-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Google Search Preview
        </p>
        <div className="flex flex-col gap-0.5">
          <p className="text-blue-400 text-sm font-semibold truncate">
            {formData.metaTitle || <span className="text-slate-600 italic">Meta Title</span>}
          </p>
          <p className="text-green-600 text-xs font-mono">
            https://codenap.in{activeTabObj?.route}
          </p>
          <p className="text-slate-400 text-xs leading-relaxed mt-0.5 line-clamp-2">
            {formData.metaDescription || (
              <span className="text-slate-600 italic">Meta description will appear here…</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
