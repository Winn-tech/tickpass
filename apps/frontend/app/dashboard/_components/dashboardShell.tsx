'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  BadgePercent,
  ChartNoAxesColumn,
  LayoutDashboard,
  QrCode,
  Settings,
  Ticket,
  Wallet,
} from 'lucide-react';
import DashboardSidebar from './dashboardSidebar';
import DashboardTopbar from './dashboardTopbar';
import { signout } from '../../utils/authsApi';
import { useAuthStore } from '../../store/authStore';

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: DashboardNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Events', href: '/dashboard/events', icon: Ticket },
  { label: 'Ticket Sales', href: '/dashboard/ticket-sales', icon: ChartNoAxesColumn },
  { label: 'Scan Tickets', href: '/dashboard/scan', icon: QrCode },
  { label: 'Discount Codes', href: '/dashboard/discount-codes', icon: BadgePercent },
  { label: 'Settlements', href: '/dashboard/settlements', icon: Wallet },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, clearUser, isAuthReady } = useAuthStore();

  const displayName = useMemo(() => {
    if (!user) return 'TickPass Organizer';

    if (user.businessName) return user.businessName;

    if (user.firstName) {
      return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`;
    }

    return user.email;
  }, [user]);

  const initials = useMemo(() => {
    if (!user) return 'TP';

    if (user.businessName) {
      return user.businessName.slice(0, 2).toUpperCase();
    }

    const first = user.firstName?.[0] ?? '';
    const last = user.lastName?.[0] ?? '';

    return `${first}${last}`.toUpperCase() || 'TP';
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signout();
    } catch {
      // clear client state either way
    } finally {
      clearUser();
      setIsSidebarOpen(false);
      router.push('/signin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,152,0,0.15),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(63,81,181,0.12),_transparent_28%),linear-gradient(180deg,_#fffdf8_0%,_#ffffff_100%)]">
      <DashboardSidebar
        pathname={pathname}
        navItems={navItems}
        isOpen={isSidebarOpen}
        initials={initials}
        displayName={displayName}
        isReady={isAuthReady}
        onClose={() => setIsSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      <div className="md:pl-[290px]">
        <DashboardTopbar
          title={isAuthReady ? `Welcome back, ${displayName}` : 'Welcome back'}
          subtitle="Own your listings, revenue, ticketing flow, and live event operations from one polished control room."
          initials={initials}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <main className="px-4 pb-8 pt-20 sm:px-6 xl:px-8">{children}</main>
      </div>
    </div>
  );
}
