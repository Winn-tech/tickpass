'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Sparkles, X } from 'lucide-react';
import type { DashboardNavItem } from './dashboardShell';


interface DashboardSidebarProps {
  pathname: string;
  navItems: DashboardNavItem[];
  isOpen: boolean;
  initials: string;
  displayName: string;
  isReady: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const isActive = (pathname: string, href: string) => {
  if (href === '/dashboard') return pathname === href;
  return pathname.startsWith(href);   
};

function SidebarContent({
  pathname,
  navItems,
  onClose,
  onSignOut,
}: Omit<DashboardSidebarProps, 'isOpen'>) {
  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,_#101a6b_0%,_#0d1452_100%)] text-white">
    <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 bg-white">
      <Link href="/dashboard" onClick={onClose} className="flex items-center justify-center pl-3">
          <Image
            src="/logo2.png"
            alt="TickPass Logo"
            width={160}
            height={160}
            priority
            className="object-contain"
          />
        </Link>

  <button
    onClick={onClose}
    className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 md:hidden"
    aria-label="Close sidebar"
  >
    <X className="h-5 w-5" />
  </button>
</div>


      <nav className="flex-1 space-y-2 px-4 mt-5">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  // ? 'bg-[linear-gradient(135deg,_rgba(255,152,0,0.9),_rgba(239,108,0,0.96))] text-white shadow-lg shadow-accent-950/20'
                  ? 'border-2 border-accent-500 text-white shadow-lg shadow-accent-950/20'
                  : 'text-white/72 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4 pt-6">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/8 hover:text-white"
        >
          <LogOut className="h-5 w-5 text-accent-400" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  return (
    <>
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:block md:w-[290px]">
        <SidebarContent
          pathname={props.pathname}
          navItems={props.navItems}
          initials={props.initials}
          displayName={props.displayName}
          isReady={props.isReady}
          onClose={props.onClose}
          onSignOut={props.onSignOut}
        />
      </aside>

      <div className={`fixed inset-0 z-50 md:hidden ${props.isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          onClick={props.onClose}
          className={`absolute inset-0 bg-primary-950/45 transition-opacity ${
            props.isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[86%] max-w-[290px] transform transition-transform duration-300 ${
            props.isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent
            pathname={props.pathname}
            navItems={props.navItems}
            initials={props.initials}
            displayName={props.displayName}
            isReady={props.isReady}
            onClose={props.onClose}
            onSignOut={props.onSignOut}
          />
        </div>
      </div>
    </>
  );
}
