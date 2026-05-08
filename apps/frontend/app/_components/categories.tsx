'use client';

import type React from 'react';
import {
  BookOpen,
  Briefcase,
  Dumbbell,
  Laptop,
  Music,
  Palette,
  Smile,
  Sparkles,
  Sun,
  UtensilsCrossed,
  BrickWall 
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  shortName: string;
  icon: React.ReactNode;
  tone: string;
}

interface CategoriesSectionProps {
  onCategoryClick?: (categoryId: string) => void;
}

const categories: Category[] = [
  { id: '01', name: 'All Events', shortName: 'All Events', icon: <Sparkles className="h-5 w-5" />, tone: 'bg-accent-500 text-primary-950' },
  { id: '02', name: 'Technology and Innovation', shortName: 'Technology', icon: <Laptop className="h-5 w-5" />, tone: 'bg-primary-950 text-white' },
  { id: '03', name: 'Sports, Fitness and Wellness', shortName: 'Wellness', icon: <Dumbbell className="h-5 w-5" />, tone: 'bg-emerald-500 text-primary-950' },
  { id: '04', name: 'Comedy and Entertainment', shortName: 'Comedy', icon: <Smile className="h-5 w-5" />, tone: 'bg-rose-500 text-white' },
  { id: '05', name: 'Business and Networking', shortName: 'Business', icon: <Briefcase className="h-5 w-5" />, tone: 'bg-indigo-600 text-white' },
  { id: '06', name: 'Art & Culture', shortName: 'Art & Culture', icon: <Palette className="h-5 w-5" />, tone: 'bg-fuchsia-500 text-white' },
  { id: '07', name: 'Spirituality & Religion', shortName: 'Spirituality', icon: <Sun className="h-5 w-5" />, tone: 'bg-amber-300 text-primary-950' },
  { id: '08', name: 'Food & Vibes', shortName: 'Food & Vibes', icon: <UtensilsCrossed className="h-5 w-5" />, tone: 'bg-orange-500 text-white' },
  { id: '09', name: 'Dinner and Dinner Parties', shortName: 'Dinner', icon: <UtensilsCrossed className="h-5 w-5" />, tone: 'bg-stone-900 text-white' },
  { id: '10', name: 'Music & Concerts', shortName: 'Music', icon: <Music className="h-5 w-5" />, tone: 'bg-cyan-500 text-primary-950' },
  { id: '11', name: 'Education & Workshops', shortName: 'Workshops', icon: <BookOpen className="h-5 w-5" />, tone: 'bg-sky-600 text-white' },
  { id: '12', name: 'Others', shortName: 'Others', icon: <Sparkles className="h-5 w-5" />, tone: 'bg-primary-100 text-primary-950' },
];

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onCategoryClick }) => {
  const featured = categories[0];
  const rest = categories.slice(1);

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-600">
                Browse by mood
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-primary-950 sm:text-5xl lg:text-6xl">
              Find the room that feels right.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-gray-600">
            From work nights to loud nights, jump straight into the events you actually came for.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.05fr_2fr]">
          <button
            type="button"
            onClick={() => onCategoryClick?.(featured.id)}
            className="group relative min-h-64 overflow-hidden rounded-lg bg-primary-950 p-7 text-left text-white shadow-xl shadow-primary-950/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-950/20 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-accent-500" />
            <div className="flex h-full flex-col justify-between gap-12">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-950">
                  {/* {featured.icon} */}
                  <BrickWall />
                </span>
                <span className="text-sm font-semibold text-primary-200">{featured.id}</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">{featured.name}</h3>
                <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-accent-300">
                  <span>Explore everything</span>
                  <span className="h-px w-10 bg-current transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {rest.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryClick?.(category.id)}
                className="group flex min-h-36 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-xl hover:shadow-primary-950/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${category.tone}`}>
                    {category.icon}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 transition-colors group-hover:text-accent-500">
                    {category.id}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold leading-tight text-primary-950 sm:text-lg">
                    {category.shortName}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs font-medium text-gray-500">
                    {category.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

