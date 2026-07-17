import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Tab: "home" (Client) vs "careers" (Employee)
  const [activeTab, setActiveTab] = useState("home");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit
  const [currentTestimonialId, setCurrentTestimonialId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    tenure: "",
    initials: "",
    color: "blue",
    rating: 5,
    text: "",
    image: "",
    category: "home",
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/testimonials`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      const data = await res.json();
      setTestimonials(data);
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
      name: "",
      role: "",
      company: "",
      tenure: "",
      initials: "",
      color: "blue",
      rating: 5,
      text: "",
      image: "",
      category: activeTab,
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleOpenEdit = (t) => {
    setFormData({
      name: t.name,
      role: t.role,
      company: t.company || "",
      tenure: t.tenure || "",
      initials: t.initials || "",
      color: t.color || "blue",
      rating: t.rating || 5,
      text: t.text,
      image: t.image || "",
      category: t.category,
    });
    setCurrentTestimonialId(t._id);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;

    try {
      const res = await fetch(`${API_BASE}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete testimonial");
      }
      fetchTestimonials();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate initials using logic from the entered name
    const getInitials = (name) => {
      if (!name) return "";
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
      }
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };
    
    const initials = getInitials(formData.name);
    const payload = {
      ...formData,
      initials,
    };

    const url =
      modalMode === "create"
        ? `${API_BASE}/api/testimonials`
        : `${API_BASE}/api/testimonials/${currentTestimonialId}`;
    const method = modalMode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save testimonial");
      }

      setShowModal(false);
      fetchTestimonials();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = testimonials.filter((t) => t.category === activeTab);

  const inputCls =
    "px-4 py-2.5 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Manage Testimonials
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage customer feedback and employee testimonials.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("home")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
            activeTab === "home"
              ? "text-orange-500"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Client Testimonials (Home)
          {activeTab === "home" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("careers")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
            activeTab === "careers"
              ? "text-orange-500"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Employee Testimonials (Careers)
          {activeTab === "careers" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
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
            <span>Loading testimonials…</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/50">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Role</th>
                  {activeTab === "home" ? (
                    <>
                      <th className="py-4 px-6">Company</th>
                      <th className="py-4 px-6">Rating</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 px-6">Tenure</th>
                    </>
                  )}
                  <th className="py-4 px-6">Quote</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-y-slate-850">
                {filtered.length > 0 ? (
                  filtered.map((t) => {
                    return (
                      <tr
                        key={t._id}
                        className="hover:bg-slate-850/20 transition-colors"
                      >
                        <td className="py-4 px-6 text-sm font-bold text-white">
                          {t.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-400">
                          {t.role}
                        </td>
                        {activeTab === "home" ? (
                          <>
                            <td className="py-4 px-6 text-sm text-slate-400">
                              {t.company}
                            </td>
                            <td className="py-4 px-6 text-sm text-amber-400 font-bold">
                              {t.rating} ★
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-4 px-6 text-sm text-slate-400">
                              {t.tenure}
                            </td>
                          </>
                        )}
                        <td className="py-4 px-6 text-sm text-slate-400 max-w-[200px] truncate">
                          "{t.text}"
                        </td>
                        <td className="py-4 px-6 text-right text-slate-400 text-sm">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(t)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(t._id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={activeTab === "home" ? 6 : 5}
                      className="py-12 text-center text-slate-500 text-sm"
                    >
                      No testimonials found for this section. Click "Add
                      Testimonial" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Testimonial Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {modalMode === "create"
                  ? "Add Testimonial"
                  : "Edit Testimonial"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Testimonial Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className={inputCls}
                >
                  <option value="home" className="bg-slate-900 text-white">Client Testimonial (Home Page)</option>
                  <option value="careers" className="bg-slate-900 text-white">
                    Employee Testimonial (Careers Page)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. David Chen"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Role *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    placeholder="e.g. VP of Product"
                    className={inputCls}
                  />
                </div>
              </div>

              {formData.category === "home" ? (
                /* Client Fields */
                <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="e.g. FinSphere"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Rating (1 - 5 stars)
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rating: Number(e.target.value),
                        })
                      }
                      className={inputCls}
                    >
                      <option value="5" className="bg-slate-900 text-white">5 Stars</option>
                      <option value="4" className="bg-slate-900 text-white">4 Stars</option>
                      <option value="3" className="bg-slate-900 text-white">3 Stars</option>
                      <option value="2" className="bg-slate-900 text-white">2 Stars</option>
                      <option value="1" className="bg-slate-900 text-white">1 Star</option>
                    </select>
                  </div>
                </div>
              ) : (
                /* Employee Fields */
                <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tenure
                    </label>
                    <input
                      type="text"
                      value={formData.tenure}
                      onChange={(e) =>
                        setFormData({ ...formData, tenure: e.target.value })
                      }
                      placeholder="e.g. 2 years at CodeNap"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Color Theme
                    </label>
                    <select
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      className={inputCls}
                    >
                      <option value="blue" className="bg-slate-900 text-white">Blue</option>
                      <option value="purple" className="bg-slate-900 text-white">Purple</option>
                      <option value="green" className="bg-slate-900 text-white">Green</option>
                      <option value="orange" className="bg-slate-900 text-white">Orange</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/photo-..."
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Quote / Testimonial Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  placeholder="Enter the quote text..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-xs rounded-xl transition-all shadow-lg active:scale-[0.98] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
