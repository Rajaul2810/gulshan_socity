"use client";

import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Notice, NoticeCategory } from "@/hooks/useNotices";
import {
  uploadNoticeAttachment,
  noticeFileErrorMessage,
  isValidNoticeAttachmentType,
} from "@/lib/notice-upload";

const CATEGORIES: NoticeCategory[] = [
  "Security Notice",
  "Maintenance Notice",
  "Event Notice",
  "Meeting Notice",
  "Emergency Notice",
  "General Announcement",
];

const defaultForm = {
  title: "",
  description: "",
  short_description: "",
  category: "General Announcement" as NoticeCategory,
  priority: "normal" as "normal" | "important",
  publish_date: new Date().toISOString().slice(0, 16),
  expiry_date: "",
  status: "active" as "active" | "inactive",
  is_pinned: false,
  attachment_url: "",
  attachment_name: "",
};

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notices?status=");
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setNotices(json.data || []);
    } catch (e) {
      setNotices([]);
      setError(e instanceof Error ? e.message : "Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (notice?: Notice) => {
    setEditing(notice || null);
    if (notice) {
      setForm({
        title: notice.title,
        description: notice.description,
        short_description: notice.short_description || "",
        category: notice.category,
        priority: notice.priority,
        publish_date: notice.publish_date.slice(0, 16),
        expiry_date: notice.expiry_date ? notice.expiry_date.slice(0, 16) : "",
        status: notice.status as "active" | "inactive",
        is_pinned: notice.is_pinned,
        attachment_url: notice.attachment_url || "",
        attachment_name: notice.attachment_name || "",
      });
    } else {
      setForm({
        ...defaultForm,
        publish_date: new Date().toISOString().slice(0, 16),
      });
    }
    setAttachmentFile(null);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setAttachmentFile(null);
    setError("");
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidNoticeAttachmentType(file)) {
        setError("Only PDF and images (JPEG, PNG, WebP) are allowed");
        return;
      }
      const sizeErr = noticeFileErrorMessage(file);
      if (sizeErr) {
        setError(sizeErr);
        return;
      }
      setAttachmentFile(file);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    try {
      let attachment_url = form.attachment_url;
      let attachment_name = form.attachment_name;
      if (attachmentFile) {
        const up = await uploadNoticeAttachment(attachmentFile);
        if ("error" in up) throw new Error(up.error);
        attachment_url = up.url;
        attachment_name = up.name;
      }
      const body = {
        title: form.title,
        description: form.description,
        short_description: form.short_description || null,
        category: form.category,
        priority: form.priority,
        publish_date: new Date(form.publish_date).toISOString(),
        expiry_date: form.expiry_date
          ? new Date(form.expiry_date).toISOString()
          : null,
        status: form.status,
        is_pinned: form.is_pinned,
        attachment_url: attachment_url || null,
        attachment_name: attachment_name || null,
      };
      if (editing) {
        const res = await fetch(`/api/notices/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setSuccess("Notice updated successfully");
      } else {
        const res = await fetch("/api/notices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setSuccess("Notice created successfully");
      }
      await fetchNotices();
      setTimeout(() => {
        closeModal();
        setSuccess("");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this notice?")) return;
    try {
      const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setSuccess("Notice deleted");
      await fetchNotices();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setTimeout(() => setError(""), 3000);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Notice Board
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and manage society notices
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Notice
        </button>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
          <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-green-800 dark:text-green-200 font-medium">
            {success}
          </p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
        </div>
      )}

      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search notices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading notices...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <MegaphoneIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No notices
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {search ? "Try a different search" : "Add your first notice"}
            </p>
            {!search && (
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-4 py-2 bg-primary text-white font-semibold rounded-lg"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Notice
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.map((notice) => (
              <li
                key={notice.id}
                className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {notice.title}
                      </h3>
                      {notice.is_pinned && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary">
                          Pinned
                        </span>
                      )}
                      {notice.priority === "important" && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200">
                          Important
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          notice.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {notice.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {notice.short_description || notice.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span>{notice.category}</span>
                      <span>{formatDate(notice.publish_date)}</span>
                      {notice.attachment_url && (
                        <a
                          href={notice.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <DocumentArrowDownIcon className="w-3.5 h-3.5" />
                          Attachment
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => openModal(notice)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50" onClick={closeModal} />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editing ? "Edit Notice" : "New Notice"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    {success}
                  </p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    {error}
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Short description (optional)
                  </label>
                  <input
                    type="text"
                    value={form.short_description}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        short_description: e.target.value,
                      }))
                    }
                    placeholder="Brief summary for cards"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full description (optional)
                  </label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          category: e.target.value as NoticeCategory,
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c
                            .replace(" Notice", "")
                            .replace(" Announcement", "")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          priority: e.target.value as "normal" | "important",
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="normal">General</option>
                      <option value="important">Important</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Publish date
                    </label>
                    <input
                      type="datetime-local"
                      value={form.publish_date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, publish_date: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry date (optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={form.expiry_date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, expiry_date: e.target.value }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Attachment (PDF max 20MB; images max 5MB)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,image/jpeg,image/png,image/webp"
                    onChange={handleAttachmentChange}
                    className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:font-medium file:cursor-pointer"
                  />
                  {form.attachment_url && !attachmentFile && (
                    <p className="mt-1 text-xs text-gray-500">
                      Current: {form.attachment_name || "file"}
                    </p>
                  )}
                  {attachmentFile && (
                    <p className="mt-1 text-xs text-green-600">
                      New file: {attachmentFile.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_pinned}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, is_pinned: e.target.checked }))
                      }
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Pin to top
                    </span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.status === "active"}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          status: e.target.checked ? "active" : "inactive",
                        }))
                      }
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Active
                    </span>
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    {uploading ? "Saving..." : editing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
