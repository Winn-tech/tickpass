import Link from 'next/link';
import type { OrganizerEventStatusFilter, OrganizerEventsCounts } from '@shared/types/eventTypes';

const TABS: { label: string; value: OrganizerEventStatusFilter }[] = [
  { label: 'All Events', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Drafts', value: 'draft' },
  { label: 'Ended', value: 'ended' },
];

interface EventsTabsProps {
  activeStatus: OrganizerEventStatusFilter;
  counts: OrganizerEventsCounts;
}

export default function EventsTabs({ activeStatus, counts }: EventsTabsProps) {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-primary-100 pb-3">
      {TABS.map((tab) => {
        const isActive = tab.value === activeStatus;

        return (
          <Link
            key={tab.value}
            href={tab.value === 'all' ? '?' : `?status=${tab.value}`}
            aria-current={isActive ? 'page' : undefined}
            className={`relative whitespace-nowrap pb-2 text-sm font-semibold transition ${
              isActive ? 'text-accent-700' : 'text-gray-500 hover:text-primary-900'
            }`}
          >
            {tab.label}
            <span className={`ml-1.5 text-xs font-medium ${isActive ? 'text-accent-500' : 'text-gray-400'}`}>
              {counts[tab.value]}
            </span>
            {isActive ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent-500" /> : null}
          </Link>
        );
      })}
    </div>
  );
}