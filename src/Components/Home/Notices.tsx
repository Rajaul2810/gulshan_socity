"use client";

import React from "react";
import Link from "next/link";
import {
  MegaphoneIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useNotices, Notice, NoticeCategory } from "@/hooks/useNotices";

const LIMIT = 6;

function getCategoryBadgeClass(category: NoticeCategory): string {
  const map: Record<NoticeCategory, string> = {
    "Security Notice":
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    "Maintenance Notice":
      "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    "Event Notice":
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    "Meeting Notice":
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    "Emergency Notice":
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
    "General Announcement":
      "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
  };
  return map[category] || "bg-gray-100 text-gray-800";
}

function formatDate(dateString: string) {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function NoticeCard({ notice }: { notice: Notice }) {
  const summary =
    notice.short_description ||
    notice.description.slice(0, 120) +
      (notice.description.length > 120 ? "..." : "");
  const categoryLabel = notice.category
    .replace(" Notice", "")
    .replace(" Announcement", "");
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(notice.category)}`}
          >
            {categoryLabel}
          </span>
          {notice.priority === "important" && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200">
              Important
            </span>
          )}
          {notice.is_pinned && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary">
              Pinned
            </span>
          )}
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {notice.title}
        </h2>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <CalendarDaysIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span>{formatDate(notice.publish_date)}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {summary}
        </p>
        <Link
          href={`/notice-page/${notice.id}`}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
        >
          Read More
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

export default function Notices() {
  const { notices, loading, error } = useNotices({
    limit: LIMIT,
    status: "active",
  });

  return (
    <section className="py-16 bg-amber-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MegaphoneIcon className="w-4 h-4" />
            <span>Notice Board</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest <span className="text-amber-500">Notices</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Important announcements and updates for residents.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && notices.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {notices.slice(0, 6).map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/notice-page"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                View All Notices
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}

        {!loading && !error && notices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No notices at the moment.
            </p>
            <Link
              href="/notice-page"
              className="text-primary font-medium hover:underline mt-2 inline-block"
            >
              Notice Board →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
