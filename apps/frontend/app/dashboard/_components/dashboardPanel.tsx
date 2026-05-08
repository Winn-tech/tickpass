import type { ReactNode } from 'react';

interface DashboardPanelProps {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function DashboardPanel({ title, eyebrow, action, children }: DashboardPanelProps) {
  return (
    <section className="rounded-[32px] border border-primary-100/80 bg-white/92 p-5 shadow-sm shadow-primary-900/5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">{eyebrow}</p>
          ) : null}
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-primary-950">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
