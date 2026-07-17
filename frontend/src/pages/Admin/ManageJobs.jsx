import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // create, edit
  const [currentJobId, setCurrentJobId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    department: "Engineering",
    type: "Full-time",
    locationType: "Remote",
    location: "Remote",
    experience: "",
    salary: "",
    badge: "",
    badgeColor: "orange",
    techStack: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [showJobsSection, setShowJobsSection] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchJobsSetting();
  }, []);

  const fetchJobsSetting = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/settings/showJobsSection`);
      if (res.ok) {
        const val = await res.json();
        if (val !== null) setShowJobsSection(val);
      }
    } catch (err) {
      console.error("Failed to fetch jobs setting:", err);
    }
  };

  const handleToggleJobsSection = async (newValue) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/settings/showJobsSection`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value: newValue }),
      });
      if (res.ok) {
        setShowJobsSection(newValue);
      } else {
        alert("Failed to update visibility setting.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
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
      department: "Engineering",
      type: "Full-time",
      locationType: "Remote",
      location: "Remote",
      experience: "",
      salary: "",
      badge: "",
      badgeColor: "orange",
      techStack: "",
      description: "",
      responsibilities: [""],
      requirements: [""],
    });
    setModalMode("create");
    setShowModal(true);
  };

  const handleOpenEdit = (job) => {
    setFormData({
      id: job.id,
      title: job.title,
      department: job.department,
      type: job.type,
      locationType: job.locationType,
      location: job.location,
      experience: job.experience,
      salary: job.salary,
      badge: job.badge || "",
      badgeColor: job.badgeColor || "orange",
      techStack: job.techStack ? job.techStack.join(", ") : "",
      description: job.description,
      responsibilities:
        job.responsibilities && job.responsibilities.length > 0
          ? [...job.responsibilities]
          : [""],
      requirements:
        job.requirements && job.requirements.length > 0
          ? [...job.requirements]
          : [""],
    });
    setCurrentJobId(job.id);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job listing?"))
      return;

    try {
      const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete job");
      }
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleListChange = (field, index, value) => {
    const newList = [...formData[field]];
    newList[index] = value;
    setFormData({ ...formData, [field]: newList });
  };

  const addListItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeListItem = (field, index) => {
    const newList = formData[field].filter((_, idx) => idx !== index);
    setFormData({ ...formData, [field]: newList.length > 0 ? newList : [""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      // If slug/id not provided, let backend generate it or generate it here
      id:
        formData.id ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      techStack: formData.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      responsibilities: formData.responsibilities
        .map((r) => r.trim())
        .filter(Boolean),
      requirements: formData.requirements.map((r) => r.trim()).filter(Boolean),
    };

    const url =
      modalMode === "create"
        ? `${API_BASE}/api/jobs`
        : `${API_BASE}/api/jobs/${currentJobId}`;
    const method = modalMode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save job opening");
      }

      setShowModal(false);
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  const inputCls =
    "px-4 py-2.5 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Manage Job Openings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Post and update jobs for the CodeNap Careers page.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Job opening
        </button>
      </div>

      {/* Visibility Toggle Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex justify-between items-center gap-4 shadow-xl">
        <div className="flex-1">
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            Careers Page Jobs Visibility
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${showJobsSection ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Toggle whether the entire "Open Positions" section is visible to visitors on the Careers page.
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => handleToggleJobsSection(!showJobsSection)}
          className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
            showJobsSection ? "bg-orange-500" : "bg-slate-800 border-slate-700"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              showJobsSection ? "translate-x-5.5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

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
            <span>Loading job openings…</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/50">
                  <th className="py-4 px-6">Job Title</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Type & Location</th>
                  <th className="py-4 px-6">Experience & Salary</th>
                  <th className="py-4 px-6">Badge</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-y-slate-850">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-slate-850/20 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm font-bold text-white">
                        {job.title}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-400">
                        {job.department}
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className="text-slate-200 font-semibold">
                          {job.type}
                        </span>
                        <span className="block text-xs text-slate-500 capitalize">
                          {job.locationType} ({job.location})
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className="text-slate-200 font-semibold">
                          {job.experience}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {job.salary}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        {job.badge ? (
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                              job.badgeColor === "orange"
                                ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                                : job.badgeColor === "red"
                                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                                  : job.badgeColor === "blue"
                                    ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                    : job.badgeColor === "green"
                                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                                      : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                            }`}
                          >
                            {job.badge}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right text-slate-400 text-sm">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(job)}
                            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
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
                    <td
                      colSpan={6}
                      className="py-12 text-center text-slate-500 text-sm"
                    >
                      No job listings found. Click "Add Job Opening" to post
                      one.
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {modalMode === "create"
                  ? "Add Job Opening"
                  : "Edit Job Opening"}
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
                  Job Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className={inputCls}
                  >
                    <option
                      value="Engineering"
                      className="bg-slate-900 text-white"
                    >
                      Engineering
                    </option>
                    <option value="Mobile" className="bg-slate-900 text-white">
                      Mobile
                    </option>
                    <option value="Design" className="bg-slate-900 text-white">
                      Design
                    </option>
                    <option
                      value="Marketing"
                      className="bg-slate-900 text-white"
                    >
                      Marketing
                    </option>
                    <option value="Sales" className="bg-slate-900 text-white">
                      Sales
                    </option>
                    <option
                      value="Internship"
                      className="bg-slate-900 text-white"
                    >
                      Internship
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Employment Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className={inputCls}
                  >
                    <option
                      value="Full-time"
                      className="bg-slate-900 text-white"
                    >
                      Full-time
                    </option>
                    <option
                      value="Part-time"
                      className="bg-slate-900 text-white"
                    >
                      Part-time
                    </option>
                    <option
                      value="Internship"
                      className="bg-slate-900 text-white"
                    >
                      Internship
                    </option>
                    <option
                      value="Contract"
                      className="bg-slate-900 text-white"
                    >
                      Contract
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Location Type *
                  </label>
                  <select
                    value={formData.locationType}
                    onChange={(e) =>
                      setFormData({ ...formData, locationType: e.target.value })
                    }
                    className={inputCls}
                  >
                    <option value="Remote" className="bg-slate-900 text-white">
                      Remote
                    </option>
                    <option value="Hybrid" className="bg-slate-900 text-white">
                      Hybrid
                    </option>
                    <option value="On-site" className="bg-slate-900 text-white">
                      On-site
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Location *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Remote / Faridabad"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Experience Range *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    placeholder="e.g. 3–5 Years"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Salary Range *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    placeholder="e.g. ₹10L – ₹18L / year"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Badge Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    placeholder="e.g. Hot 🔥, Urgent"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Badge Color Theme
                  </label>
                  <select
                    value={formData.badgeColor}
                    onChange={(e) =>
                      setFormData({ ...formData, badgeColor: e.target.value })
                    }
                    className={inputCls}
                  >
                    <option value="orange" className="bg-slate-900 text-white">
                      Orange
                    </option>
                    <option value="red" className="bg-slate-900 text-white">
                      Red
                    </option>
                    <option value="blue" className="bg-slate-900 text-white">
                      Blue
                    </option>
                    <option value="green" className="bg-slate-900 text-white">
                      Green
                    </option>
                    <option value="purple" className="bg-slate-900 text-white">
                      Purple
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) =>
                    setFormData({ ...formData, techStack: e.target.value })
                  }
                  placeholder="e.g. React.js, TypeScript, Next.js"
                  className={inputCls}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Job Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter the role description..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="flex flex-col gap-6">
                {/* Responsibilities list editor */}
                <div className="flex flex-col gap-2 bg-slate-850/20 border border-slate-800 rounded-3xl p-5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Responsibilities *
                    </label>
                    <button
                      type="button"
                      onClick={() => addListItem("responsibilities")}
                      className="text-[10px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add Row
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                    {(formData.responsibilities || [""]).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          required
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleListChange(
                              "responsibilities",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder="e.g. Architect and build scalable React apps"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeListItem("responsibilities", index)
                          }
                          className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all cursor-pointer shrink-0"
                          title="Remove Row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements list editor */}
                <div className="flex flex-col gap-2 bg-slate-850/20 border border-slate-800 rounded-3xl p-5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Requirements *
                    </label>
                    <button
                      type="button"
                      onClick={() => addListItem("requirements")}
                      className="text-[10px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add Row
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                    {(formData.requirements || [""]).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          required
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleListChange(
                              "requirements",
                              index,
                              e.target.value,
                            )
                          }
                          placeholder="e.g. 3+ years of production experience with React"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem("requirements", index)}
                          className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all cursor-pointer shrink-0"
                          title="Remove Row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
                  <Save className="w-3.5 h-3.5" /> Save Job listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
