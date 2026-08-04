import type { EventStatus } from '@shared/types/eventTypes';

const STATUS_STYLES: Record<EventStatus, string> = {
  published: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  draft: 'bg-gray-100 text-gray-600 border-gray-200',
  ended: 'bg-primary-50 text-primary-700 border-primary-100',
};

const STATUS_LABELS: Record<EventStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  ended: 'Ended',
};

export default function EventStatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}