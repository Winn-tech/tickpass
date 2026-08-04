import 'server-only';
import { cookies } from 'next/headers';
import { OrganizerEventStatusFilter, OrganizerEventsResponse } from '@shared/types/eventTypes';

const baseApi = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api/v1';

interface GetOrganizerEventsParams {
  status?: OrganizerEventStatusFilter;
  page?: number;
  limit?: number;
}

export const getOrganizerEvents = async ({
  status = 'all',
  page = 1,
  limit = 10,
}: GetOrganizerEventsParams = {}): Promise<OrganizerEventsResponse> => {
  const params = new URLSearchParams({ status, page: String(page), limit: String(limit) });
  const url = `${baseApi}/events/organizer?${params.toString()}`;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: token ? { Cookie: `token=${token}` } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
};