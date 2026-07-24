import React, { useEffect, useState } from "react";
import {
  Mail,
  ChevronDown,
  ChevronUp,
  Clock,
  Phone,
  Trash2,
  Search,
  MessageSquare,
  User,
  Loader2,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function ContactRequests() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, pageSize]);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/contact/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contact requests");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact request?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/api/contact/requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete contact request");

      setContacts(contacts.filter((c) => c._id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter logic
  const filtered = contacts.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const fullName = `${c.firstName || ""} ${c.lastName || ""}`.toLowerCase();
    return (
      fullName.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.phoneNumber && c.phoneNumber.toLowerCase().includes(q)) ||
      (c.message && c.message.toLowerCase().includes(q))
    );
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "name") {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    }
    return 0;
  });

  // Pagination calculation
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginated = sorted.slice(startIndex, startIndex + pageSize);

  // Summary statistics
  const now = new Date();
  const todayCount = contacts.filter((c) => {
    const d = new Date(c.createdAt);
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight flex items-center gap-3">
            <Mail className="w-8 h-8 text-orange-500" />
            Contact Requests
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage inquiry messages received directly from the Contact page.
          </p>
        </div>
        <button
          onClick={fetchContacts}
          className="self-start sm:self-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> : "Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Total Messages
            </span>
            <span className="text-2xl font-black text-white">{contacts.length}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Received Today
            </span>
            <span className="text-2xl font-black text-white">{todayCount}</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
              Filtered Requests
            </span>
            <span className="text-2xl font-black text-white">{filtered.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        {/* Sort & Page Size Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-bold uppercase">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-bold uppercase">Per Page:</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[250px] bg-slate-900 border border-slate-800 rounded-3xl">
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <span className="font-semibold text-sm">Loading contact requests...</span>
          </div>
        </div>
      ) : paginated.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900 border border-slate-800 rounded-3xl text-center">
          <div className="p-4 bg-slate-800/50 rounded-full mb-3 text-slate-500">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No contact requests found</h3>
          <p className="text-slate-400 text-xs max-w-sm">
            {searchQuery
              ? "Try adjusting your search query."
              : "No user inquiry messages have been submitted yet."}
          </p>
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-3">
          {paginated.map((item) => {
            const isExpanded = expandedId === item._id;
            const fullName = `${item.firstName} ${item.lastName}`;
            const dateStr = item.createdAt
              ? new Date(item.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "N/A";

            return (
              <div
                key={item._id}
                className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden ${
                  isExpanded
                    ? "border-orange-500/40 shadow-xl shadow-orange-500/5"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Main Card Header */}
                <div
                  onClick={() => toggleExpand(item._id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center shrink-0 text-orange-400 font-black text-sm">
                      {item.firstName?.[0]?.toUpperCase() || "C"}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-base">{fullName}</span>
                        <span className="text-[11px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-md font-semibold">
                          Contact Form
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-orange-500" />
                          {item.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-orange-500" />
                          {item.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-800/80 pt-3 md:pt-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {dateStr}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteContact(item._id);
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        title="Delete Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="p-2 text-slate-400 hover:text-white rounded-xl">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/60 p-6 flex flex-col gap-6">
                    {/* Message Box */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-orange-500" /> Message Content
                      </h4>
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
                        {item.message || "No message provided."}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <a
                          href={`mailto:${item.email}`}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2"
                        >
                          <Mail className="w-3.5 h-3.5" /> Send Email
                        </a>
                        <a
                          href={`tel:${item.phoneNumber}`}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call Phone
                        </a>
                      </div>

                      <button
                        onClick={() => deleteContact(item._id)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold rounded-xl border border-red-500/20 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Entry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">
            Showing <strong className="text-white">{startIndex + 1}</strong> to{" "}
            <strong className="text-white">{Math.min(startIndex + pageSize, totalItems)}</strong> of{" "}
            <strong className="text-white">{totalItems}</strong> entries
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
            >
              Previous
            </button>
            <span className="text-xs text-slate-400 font-semibold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-lg transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
