import type { ReactNode } from 'react';

interface DashboardEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function DashboardEmptyState({
  icon,
  title,
  description,
  action,
}: DashboardEmptyStateProps) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[30px] border border-dashed border-primary-200 bg-[linear-gradient(180deg,_#fffdfa_0%,_#ffffff_100%)] px-6 py-10 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[28px] bg-accent-50 text-accent-700">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-primary-950">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">{description}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
