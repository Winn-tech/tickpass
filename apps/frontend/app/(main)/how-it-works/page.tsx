import { Fraunces, Playwrite_DE_SAS } from 'next/font/google';
import HowItWorksPageClient from './pageClient';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-fraunces',
  display: 'swap',
});

const playwrite = Playwrite_DE_SAS({
  weight: 'variable',
  variable: '--font-playwrite-de-sas',
  display: 'swap',
});

export default function HowItWorksPage() {
  return (
    <div className={`${fraunces.variable} ${playwrite.variable}`}>
      <HowItWorksPageClient />
    </div>
  );
}
