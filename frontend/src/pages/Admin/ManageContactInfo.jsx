import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Save, ShieldAlert } from "lucide-react";

export default function ManageContactInfo() {
  const [formData, setFormData] = useState({
    companyPhone: "",
    companyEmail: "",
    companyAddress: "",
    companyLocationShort: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const [phoneRes, emailRes, addrRes, locRes] = await Promise.all([
        fetch(`${API_BASE}/api/settings/companyPhone`),
        fetch(`${API_BASE}/api/settings/companyEmail`),
        fetch(`${API_BASE}/api/settings/companyAddress`),
        fetch(`${API_BASE}/api/settings/companyLocationShort`),
      ]);

      const phone = phoneRes.ok ? await phoneRes.json() : null;
      const email = emailRes.ok ? await emailRes.json() : null;
      const address = addrRes.ok ? await addrRes.json() : null;
      const location = locRes.ok ? await locRes.json() : null;

      setFormData({
        companyPhone: phone || "+91 9717570933",
        companyEmail: email || "hello@codenap.in",
        companyAddress:
          address ||
          "&Work Coworking, Plot No. 5B, Sector 15A Neelam Chowk Ajronda Metro Near Crown Plaza, Faridabad, Haryana 121007",
        companyLocationShort: location || "Faridabad, Haryana, India",
      });
    } catch (err) {
      setError("Failed to load contact settings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setError("");
    try {
      const token = localStorage.getItem("adminToken");

      const updateSetting = async (key, value) => {
        const res = await fetch(`${API_BASE}/api/settings/${key}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ value }),
        });
        if (!res.ok) throw new Error(`Failed to save ${key}`);
      };

      await Promise.all([
        updateSetting("companyPhone", formData.companyPhone),
        updateSetting("companyEmail", formData.companyEmail),
        updateSetting("companyAddress", formData.companyAddress),
        updateSetting("companyLocationShort", formData.companyLocationShort),
      ]);

      setSuccessMsg(
        "Contact information updated successfully across the website!",
      );
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "px-4 py-3 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase text-white tracking-tight">
          Manage Contact Info
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Update the global phone number, email address, and office location
          displayed to site visitors.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-semibold">
          {successMsg}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center w-full justify-center min-h-[200px]">
          <div className="flex items-center gap-2 text-slate-400">
            <svg
              className="animate-spin w-5 h-5 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Loading contact settings…</span>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-slate-900 border w-full border-slate-800 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone field */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-500" /> Phone Number *
              </label>
              <input
                required
                type="text"
                value={formData.companyPhone}
                onChange={(e) =>
                  setFormData({ ...formData, companyPhone: e.target.value })
                }
                placeholder="e.g. +91 9717570933"
                className={inputCls}
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500" /> Email Address *
              </label>
              <input
                required
                type="email"
                value={formData.companyEmail}
                onChange={(e) =>
                  setFormData({ ...formData, companyEmail: e.target.value })
                }
                placeholder="e.g. hello@codenap.in"
                className={inputCls}
              />
            </div>
          </div>

          {/* Short Location field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-500" /> Short Location
              *
            </label>
            <input
              required
              type="text"
              value={formData.companyLocationShort}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyLocationShort: e.target.value,
                })
              }
              placeholder="e.g. Faridabad, Haryana, India"
              className={inputCls}
            />
            <span className="text-[10px] text-slate-500">
              Displayed in cards or short layout sections.
            </span>
          </div>

          {/* Full Address field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-500" /> Full Office
              Address *
            </label>
            <textarea
              required
              rows={3}
              value={formData.companyAddress}
              onChange={(e) =>
                setFormData({ ...formData, companyAddress: e.target.value })
              }
              placeholder="e.g. Plot No. 5B, Faridabad, Haryana 121007"
              className={`${inputCls} resize-none`}
            />
            <span className="text-[10px] text-slate-500">
              Displayed in the page footer details.
            </span>
          </div>

          <div className="flex justify-end mt-2">
            <button
              disabled={saving}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving Changes..." : "Save Contact Info"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
