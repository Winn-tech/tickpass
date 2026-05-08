import type { Metadata } from 'next';
import AboutPageClient from './aboutPageClient';

export const metadata: Metadata = {
  title: 'About Tickpass | Secure seats, stress-free',
  description:
    'Learn how Tickpass helps people discover, book, and attend events while giving organizers better tools to sell and manage experiences.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
