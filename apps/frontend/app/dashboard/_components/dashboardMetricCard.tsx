import type { ReactNode } from 'react';

interface DashboardMetricCardProps {
  label: string;
  value: string;
  delta: string;
  icon: ReactNode;
  tone?: 'primary' | 'accent' | 'success';
}

const toneStyles = {
  primary: 'bg-primary-50 text-primary-700',
  accent: 'bg-accent-50 text-accent-700',
  success: 'bg-emerald-50 text-emerald-700',
};

export default function DashboardMetricCard({
  label,
  value,
  delta,
  icon,
  tone = 'primary',
}: DashboardMetricCardProps) {
  return (
    <article className="rounded-[28px] border border-primary-100 bg-white p-5 shadow-sm shadow-primary-900/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-primary-950">{value}</p>
          <p className="mt-2 text-xs font-semibold text-emerald-600">{delta}</p>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${toneStyles[tone]}`}>
          {icon}
        </div>
      </div>
    </article>
  );
}
