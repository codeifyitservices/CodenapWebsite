import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Save, HelpCircle, X } from "lucide-react";

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Tab Management: "home" vs "careers"
  const [activeTab, setActiveTab] = useState("home");
  
  // Modal / Form Management
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit
  const [currentFaqId, setCurrentFaqId] = useState(null);
  
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    bullets: "",
    page: "home",
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/faqs`);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      const data = await res.json();
      setFaqs(data);
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
      question: "",
      answer: "",
      bullets: "",
      page: activeTab,
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleOpenEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      bullets: faq.bullets ? faq.bullets.join(", ") : "",
      page: faq.page,
    });
    setCurrentFaqId(faq._id);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/faqs/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete FAQ");
      }
      fetchFAQs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      bullets: formData.bullets.split(",").map((b) => b.trim()).filter(Boolean),
    };

    const url = modalMode === "create" ? `${API_BASE}/api/faqs` : `${API_BASE}/api/faqs/${currentFaqId}`;
    const method = modalMode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save FAQ");
      }

      setShowModal(false);
      fetchFAQs();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredFaqs = faqs.filter((faq) => faq.page === activeTab);

  const inputCls =
    "px-4 py-2.5 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Manage FAQs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Individually manage questions and answers for Home and Careers pages.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add FAQ
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
            activeTab === "home" ? "text-orange-500" : "text-slate-400 hover:text-white"
          }`}
        >
          Home Page FAQs
          {activeTab === "home" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("careers")}
          className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
            activeTab === "careers" ? "text-orange-500" : "text-slate-400 hover:text-white"
          }`}
        >
          Careers Page FAQs
          {activeTab === "careers" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="animate-spin w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Loading FAQs…</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/50">
                  <th className="py-4 px-6">Question</th>
                  <th className="py-4 px-6">Answer</th>
                  <th className="py-4 px-6">Bullets Count</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-y-slate-850">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <tr key={faq._id} className="hover:bg-slate-850/20 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-white max-w-[250px] truncate">
                        {faq.question}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400 max-w-[350px] truncate">
                        {faq.answer}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400">
                        {faq.bullets ? faq.bullets.length : 0}
                      </td>
                      <td className="py-4 px-6 text-right text-slate-400 text-sm">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(faq)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq._id)}
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
                    <td colSpan={4} className="py-12 text-center text-slate-500 text-sm">
                      No FAQs found for this section. Click "Add FAQ" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {modalMode === "create" ? "Add FAQ" : "Edit FAQ"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Page Section
                </label>
                <select
                  value={formData.page}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                  className={inputCls}
                >
                  <option value="home" className="bg-slate-900 text-white">Home Page FAQ</option>
                  <option value="careers" className="bg-slate-900 text-white">Careers Page FAQ</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Question *
                </label>
                <input
                  required
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What is the average timeline?"
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Answer *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter the detailed answer..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Bullets (Optional, Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.bullets}
                  onChange={(e) => setFormData({ ...formData, bullets: e.target.value })}
                  placeholder="e.g. Regular updates, Bug fixing, Security patches"
                  className={inputCls}
                />
                <p className="text-[10px] text-slate-500">
                  Separate each bullet point with a comma. Used for bullet lists in some answers.
                </p>
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
                  <Save className="w-3.5 h-3.5" /> Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
