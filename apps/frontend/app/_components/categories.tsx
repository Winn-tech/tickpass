'use client';
import { Laptop, Smile, Briefcase, Palette, Sun, UtensilsCrossed, Music, BookOpen, Sparkles, Dumbbell } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
}

interface CategoriesSectionProps {
  onCategoryClick?: (categoryId: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onCategoryClick }) => {
  const categories: Category[] = [
    { id: '01', name: 'All Events', icon: <Sparkles className="w-8 h-8" />, gradient: 'from-primary-500 to-primary-700' },
    { id: '02', name: 'Technology and Innovation', icon: <Laptop className="w-8 h-8" />, gradient: 'from-primary-400 to-primary-600' },
    { id: '03', name: 'Sports, Fitness and Wellness', icon: <Dumbbell className="w-8 h-8" />, gradient: 'from-accent-500 to-accent-700' },
    { id: '04', name: 'Comedy and Entertainment', icon: <Smile className="w-8 h-8" />, gradient: 'from-accent-400 to-accent-600' },
    { id: '05', name: 'Business and Networking', icon: <Briefcase className="w-8 h-8" />, gradient: 'from-primary-600 to-primary-800' },
    { id: '06', name: 'Art & Culture', icon: <Palette className="w-8 h-8" />, gradient: 'from-primary-300 to-primary-500' },
    { id: '07', name: 'Spirituality & Religion', icon: <Sun className="w-8 h-8" />, gradient: 'from-accent-300 to-accent-500' },
    { id: '08', name: 'Food & Vibes', icon: <UtensilsCrossed className="w-8 h-8" />, gradient: 'from-accent-600 to-accent-800' },
    { id: '09', name: 'Dinner and Dinner Parties', icon: <UtensilsCrossed className="w-8 h-8" />, gradient: 'from-primary-500 to-accent-500' },
    { id: '10', name: 'Music & Concerts', icon: <Music className="w-8 h-8" />, gradient: 'from-primary-700 to-accent-600' },
    { id: '11', name: 'Education & Workshops', icon: <BookOpen className="w-8 h-8" />, gradient: 'from-primary-400 to-primary-700' },
    { id: '12', name: 'Others', icon: <Sparkles className="w-8 h-8" />, gradient: 'from-accent-500 to-primary-600' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <section className="w-full px-4 py-12 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-300 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-950">
            Explore Categories
          </h2>
          <p className="text-lg text-accent-600">
            Discover events that match your interests
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-3 animate-scroll hover:pause-animation">
            {[...categories, ...categories].map((category, index) => (
              <button
                key={`${category.id}-${index}`}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative shrink-0 w-32 h-32 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                
                <div className="relative h-full flex flex-col items-center justify-center gap-2 p-2 text-white">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <span className="text-xs font-semibold text-center leading-tight">
                    {category.name}
                  </span>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
              </button>
            ))}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .pause-animation:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
};

export default CategoriesSection;