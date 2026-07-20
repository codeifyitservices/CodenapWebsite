import React, { useEffect, useState } from "react";
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  Phone,
  Mail,
  Trash2,
  Search,
  DollarSign,
  Calendar,
  Layers,
  Loader2,
} from "lucide-react";

export default function QuotationRequests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchBookings();
  }, []);

  // Reset pagination to page 1 on filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, budgetFilter, sortBy, pageSize]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/contact/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch quotation requests");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quotation request?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/contact/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete quotation request");

      // Update local state
      setBookings(bookings.filter((b) => b._id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filters
  const filtered = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.name.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      (b.services && b.services.some((s) => s.toLowerCase().includes(q)));
    
    const matchesBudget = budgetFilter === "All" || b.budget === budgetFilter;
    return matchesSearch && matchesBudget;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center text-left">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Quotation Requests
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review onboarding submissions, budgets, and services requested by clients.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-semibold text-left">
          {error}
        </div>
      )}

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search client name, email, or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-4 py-2.5 text-sm bg-slate-850 border border-slate-700 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 text-slate-200 placeholder-slate-600 transition-all w-full"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 bg-slate-850 border border-slate-750 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Budget:</span>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="text-xs bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-slate-300">All Budgets</option>
              <option value="1 - 5 Lakhs" className="bg-slate-900 text-slate-300">1 - 5 Lakhs</option>
              <option value="5 - 10 Lakhs" className="bg-slate-900 text-slate-300">5 - 10 Lakhs</option>
              <option value="Flexible Budget" className="bg-slate-900 text-slate-300">Flexible Budget</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-850 border border-slate-750 px-3 py-1.5 rounded-xl">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="newest" className="bg-slate-900 text-slate-300">Newest First</option>
              <option value="oldest" className="bg-slate-900 text-slate-300">Oldest First</option>
              <option value="name" className="bg-slate-900 text-slate-300">Client Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl text-left">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
            <span>Fetching quotation requests…</span>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-2">
            <FileText className="w-10 h-10 text-slate-600" />
            <p className="text-slate-400 font-bold">No quotation requests found</p>
            <p className="text-slate-600 text-xs">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-850/40 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4.5">Client Details</th>
                  <th className="px-6 py-4.5">Requested Services</th>
                  <th className="px-6 py-4.5">Budget</th>
                  <th className="px-6 py-4.5">Start Time</th>
                  <th className="px-6 py-4.5">Date Received</th>
                  <th className="px-6 py-4.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {paginated.map((booking) => {
                  const isExpanded = expandedId === booking._id;
                  return (
                    <React.Fragment key={booking._id}>
                      <tr className="hover:bg-slate-850/30 transition-colors">
                        {/* Name & Contact */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-sm">{booking.name}</span>
                            <span className="text-xs text-slate-500 mt-0.5">{booking.email}</span>
                          </div>
                        </td>

                        {/* Services Badges */}
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {booking.services && booking.services.length > 0 ? (
                              booking.services.map((s, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 text-[10px] font-bold rounded bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                >
                                  {s}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-600">None selected</span>
                            )}
                          </div>
                        </td>

                        {/* Budget */}
                        <td className="px-6 py-4">
                          <span className="text-slate-300 text-sm font-semibold whitespace-nowrap">{booking.budget || "N/A"}</span>
                        </td>

                        {/* Timeline */}
                        <td className="px-6 py-4">
                          <span className="text-slate-300 text-xs bg-slate-800 px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
                            {booking.startTime || "N/A"}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4">
                          <span className="text-slate-400 text-xs whitespace-nowrap">{formatDate(booking.createdAt)}</span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() => toggleExpand(booking._id)}
                              className="p-1.5 rounded-lg border border-slate-700 bg-slate-850 hover:bg-slate-850 text-slate-300 hover:text-white transition-all cursor-pointer"
                              title="Toggle Details"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => deleteBooking(booking._id)}
                              className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-400 transition-all cursor-pointer"
                              title="Delete Request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded details row */}
                      {isExpanded && (
                        <tr className="bg-slate-950/40">
                          <td colSpan={6} className="px-8 py-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                              {/* Left Section: Info */}
                              <div className="flex flex-col gap-3">
                                <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500">Contact Details</h4>
                                <div className="space-y-2">
                                  <p className="flex items-center gap-2 text-slate-300">
                                    <Mail className="w-4 h-4 text-slate-500" />
                                    <a href={`mailto:${booking.email}`} className="hover:underline">{booking.email}</a>
                                  </p>
                                  <p className="flex items-center gap-2 text-slate-300">
                                    <Phone className="w-4 h-4 text-slate-500" />
                                    <a href={`tel:${booking.mobile}`} className="hover:underline">+91 {booking.mobile}</a>
                                  </p>
                                  <p className="flex items-center gap-2 text-slate-300">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <span>Received on {formatDate(booking.createdAt)}</span>
                                  </p>
                                </div>
                              </div>

                              {/* Right Section: Requirement Summary */}
                              <div className="flex flex-col gap-3">
                                <h4 className="text-xs uppercase font-extrabold tracking-wider text-orange-500">Requirements Summary</h4>
                                <div className="space-y-2 text-slate-350">
                                  <p className="flex items-start gap-2">
                                    <Layers className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                    <span>
                                      <strong>Requested Services: </strong>
                                      {booking.services && booking.services.join(", ")}
                                    </span>
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-slate-500" />
                                    <span><strong>Estimated Budget: </strong>{booking.budget || "N/A"}</span>
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span><strong>Timeline to Start: </strong>{booking.startTime || "N/A"}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 px-6 py-4 rounded-3xl shadow-xl">
          <span className="text-xs text-slate-500 font-semibold">
            Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-xl border border-slate-750 text-xs font-bold text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer bg-slate-850"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-xl border border-slate-750 text-xs font-bold text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer bg-slate-850"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
