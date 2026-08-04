import Link from 'next/link';
import type { OrganizerEventStatusFilter, OrganizerEventsPagination } from '@shared/types/eventTypes';

function buildHref(status: OrganizerEventStatusFilter, page: number): string {
  const params = new URLSearchParams();
  if (status !== 'all') params.set('status', status);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `?${query}` : '?';
}

interface EventsPaginationProps {
  pagination: OrganizerEventsPagination;
  status: OrganizerEventStatusFilter;
}

export default function EventsPagination({ pagination, status }: EventsPaginationProps) {
  const { page, totalPages } = pagination;

  return (
    <nav className="flex items-center justify-between border-t border-primary-100 pt-4" aria-label="Events pagination">
      <Link
        href={buildHref(status, Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={`text-sm font-semibold ${
          page <= 1 ? 'pointer-events-none text-gray-300' : 'text-primary-900 hover:text-accent-600'
        }`}
      >
        ← Previous
      </Link>
      <p className="text-xs text-gray-500">
        Page {page} of {totalPages}
      </p>
      <Link
        href={buildHref(status, Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={`text-sm font-semibold ${
          page >= totalPages ? 'pointer-events-none text-gray-300' : 'text-primary-900 hover:text-accent-600'
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}