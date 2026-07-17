import React, { useEffect, useState } from "react";
import { FileText, ChevronDown, ChevronUp, Clock, Phone, Mail, MapPin, Trash2, Search } from "lucide-react";

export default function ViewApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // Sorting, filtering & Pagination state
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchApplications();
  }, []);

  // Reset pagination to page 1 on filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy, pageSize]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApps(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/applications/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      // Update state locally
      setApps(apps.map((app) => (app._id === id ? { ...app, status: newStatus } : app)));
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete application");

      // Update local state
      setApps(apps.filter((app) => app._id !== id));
      
      // Remove from selection set
      const nextSelected = new Set(selectedIds);
      nextSelected.delete(id);
      setSelectedIds(nextSelected);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete the ${selectedIds.size} selected applications?`)) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/applications/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ids: Array.from(selectedIds) })
      });
      if (!res.ok) throw new Error("Failed to delete selected applications");

      // Update local state
      setApps(apps.filter((app) => !selectedIds.has(app._id)));
      setSelectedIds(new Set());
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSelectOne = (id) => {
    const nextSelected = new Set(selectedIds);
    if (nextSelected.has(id)) {
      nextSelected.delete(id);
    } else {
      nextSelected.add(id);
    }
    setSelectedIds(nextSelected);
  };

  const handleSelectAll = (visibleItems) => {
    const allSelected = visibleItems.every((item) => selectedIds.has(item._id));
    const nextSelected = new Set(selectedIds);
    if (allSelected) {
      // Unselect all visible items
      visibleItems.forEach((item) => nextSelected.delete(item._id));
    } else {
      // Select all visible items
      visibleItems.forEach((item) => nextSelected.add(item._id));
    }
    setSelectedIds(nextSelected);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filtered = apps.filter((app) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      app.name.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.appliedFor.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Job Applications
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review candidates who have submitted their resumes through the careers portal.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search candidate name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-2.5 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 bg-slate-850 border border-slate-750 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Statuses</option>
              <option value="Pending" className="bg-slate-900 text-white">Pending</option>
              <option value="Reviewed" className="bg-slate-900 text-white">Reviewed</option>
              <option value="Shortlisted" className="bg-slate-900 text-white">Shortlisted</option>
              <option value="Rejected" className="bg-slate-900 text-white">Rejected</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-850 border border-slate-750 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-900 text-white">Newest First</option>
              <option value="oldest" className="bg-slate-900 text-white">Oldest First</option>
              <option value="name" className="bg-slate-900 text-white">Candidate Name (A-Z)</option>
              <option value="status" className="bg-slate-900 text-white">Status (A-Z)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-850 border border-slate-750 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="text-xs bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value={10} className="bg-slate-900 text-white">10</option>
              <option value={25} className="bg-slate-900 text-white">25</option>
              <option value={50} className="bg-slate-900 text-white">50</option>
            </select>
          </div>

          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-red-500/20 active:scale-[0.98] cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Selected ({selectedIds.size})
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 text-slate-400">
            <svg className="animate-spin w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Loading applications…</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/50">
                  <th className="py-4 px-6 w-[40px] text-center">
                    <input
                      type="checkbox"
                      checked={paginated.length > 0 && paginated.every((item) => selectedIds.has(item._id))}
                      onChange={() => handleSelectAll(paginated)}
                      className="rounded border-slate-700 bg-slate-800 text-orange-500 focus:ring-orange-500/20 w-4 h-4 cursor-pointer accent-orange-500"
                    />
                  </th>
                  <th className="py-4 px-6 w-[20px]"></th>
                  <th className="py-4 px-6">Candidate</th>
                  <th className="py-4 px-6">Role Applied</th>
                  <th className="py-4 px-6">Experience & Notice</th>
                  <th className="py-4 px-6">Resume</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-y-slate-850">
                {paginated.length > 0 ? (
                  paginated.map((app) => {
                    const isExpanded = expandedId === app._id;
                    return (
                      <React.Fragment key={app._id}>
                        {/* Table Row */}
                        <tr className="hover:bg-slate-850/20 transition-colors">
                          <td className="py-4 px-6 text-center">
                            <input
                              type="checkbox"
                              checked={selectedIds.has(app._id)}
                              onChange={() => handleSelectOne(app._id)}
                              className="rounded border-slate-700 bg-slate-800 text-orange-500 focus:ring-orange-500/20 w-4 h-4 cursor-pointer accent-orange-500"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => toggleExpand(app._id)}
                              className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors flex items-center justify-center"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </td>
                          <td className="py-4 px-6 text-sm font-bold text-white">
                            {app.name}
                            <span className="block text-xs text-slate-400 font-normal mt-0.5">{app.email}</span>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-300 font-semibold">
                            {app.appliedFor}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-400">
                            <span className="text-slate-200 font-semibold">{app.experience}</span>
                            <span className="block text-xs text-slate-500">Notice: {app.noticePeriod}</span>
                          </td>
                          <td className="py-4 px-6 text-sm">
                            <a
                              href={`${API_BASE}${app.resumeUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-lg transition-all"
                            >
                              <FileText className="w-3.5 h-3.5" /> View CV
                            </a>
                          </td>
                          <td className="py-4 px-6 text-sm">
                            <select
                              value={app.status}
                              onChange={(e) => updateStatus(app._id, e.target.value)}
                              className={`text-xs font-bold px-3 py-1.5 border rounded-xl bg-slate-800 text-slate-300 focus:outline-none cursor-pointer ${
                                app.status === "Pending"
                                  ? "border-amber-500/20 text-amber-400 bg-amber-500/5"
                                  : app.status === "Shortlisted"
                                  ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5"
                                  : app.status === "Reviewed"
                                  ? "border-blue-500/20 text-blue-400 bg-blue-500/5"
                                  : "border-red-500/20 text-red-400 bg-red-500/5"
                              }`}
                            >
                              <option value="Pending" className="bg-slate-900 text-white">Pending</option>
                              <option value="Reviewed" className="bg-slate-900 text-white">Reviewed</option>
                              <option value="Shortlisted" className="bg-slate-900 text-white">Shortlisted</option>
                              <option value="Rejected" className="bg-slate-900 text-white">Rejected</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-400">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-center">
                            <button
                              onClick={() => deleteApplication(app._id)}
                              className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Details Panel */}
                        {isExpanded && (
                          <tr className="bg-slate-850/10">
                            <td colSpan={9} className="px-6 py-6 border-t border-b border-slate-850">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                {/* Left section: info */}
                                <div className="flex flex-col gap-4">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Candidate Information
                                  </h4>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-slate-300">
                                      <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                                      <span>{app.countryCode} {app.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                      <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                                      <span>{app.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                      <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                                      <span>{app.city}, {app.state}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right section: message */}
                                <div className="flex flex-col gap-2">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Message to HR
                                  </h4>
                                  <div className="p-4 bg-slate-800/50 border border-slate-800/80 rounded-2xl text-slate-300 leading-relaxed text-xs">
                                    {app.message ? app.message : "No message provided by candidate."}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500 text-sm">
                      No matching job applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/50 border-t border-slate-850 px-6 py-4">
              <span className="text-xs text-slate-500 font-semibold">
                Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
                {Math.min(currentPage * pageSize, totalItems)} of {totalItems} applications
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-850 border border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7.5 h-7.5 text-xs font-black rounded-lg transition-all cursor-pointer ${
                      currentPage === page
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-750 border border-slate-750"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white bg-slate-850 border border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
