'use client';

import Link from 'next/link';
import { Menu, Plus } from 'lucide-react';

interface DashboardTopbarProps {
  title: string;
  subtitle: string;
  initials: string;
  onOpenSidebar: () => void;
}

export default function DashboardTopbar({
  title,
  subtitle,
  initials,
  onOpenSidebar,
}: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-primary-100/80 bg-white/88 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="inline-flex rounded-2xl border border-primary-100 bg-white p-2 text-primary-900 transition hover:bg-primary-50 md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-primary-950 sm:text-2xl">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-sm font-semibold text-primary-900 sm:flex">
            {initials}
          </div>

          <Link
            href="/createEvent"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/20 transition hover:bg-accent-600"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Event</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
