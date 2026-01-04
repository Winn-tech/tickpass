'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import dinnerCat from '@/assets/dinnerCat.jpg';
import religionCat from '@/assets/religionCat.jpg';
import sportsCat from '@/assets/sportsCat.jpg';
import techCat from '@/assets/techCat.jpg';
import musicCat from '@/assets/musicCat.jpg';
import artsCat from '@/assets/artsCat.jpg';
import businessCat from '@/assets/businessCat.jpg';
import educationCat from '@/assets/educationCat.jpg';

const CategoriesSlidder: React.FC = () => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')


  const slides = [
    {
      id: 1,
      slug: slugify('Technology and Innovation'),
      title: 'Technology and Innovation',
      description: 'Explore breathtaking peaks and valleys',
      image: techCat,
      bg: 'from-purple-950 to-pink-600',
    },
    {
      id: 2,
      slug: slugify('Sports, Fitness and Wellness'),
      title: 'Sports, Fitness and Wellness',
      description: 'Discover the calm of endless horizons',
      image: sportsCat,
      bg: 'from-blue-500 to-black-600',
    },
    {
      id: 3,
      slug: slugify('Comedy and Entertainment'),
      title: 'Comedy and Entertainment',
      description: 'Laugh and enjoy memorable performances',
      image: dinnerCat,
      bg: 'from-orange-500 to-red-600',
    },
    {
      id: 4,
      slug: slugify('Business and Networking'),
      title: 'Business and Networking',
      description: 'Connect with professionals and grow your network',
      image: businessCat,
      bg: 'from-purple-950 to-pink-600',
    },
    {
      id: 5,
      slug: slugify('Art and Culture'),
      title: 'Art and Culture',
      description: 'Experience creativity and cultural richness',
      image: artsCat,
      bg: 'from-blue-500 to-blue-950',
    },
    {
      id: 6,
      slug: slugify('Spirituality and Religion'),
      title: 'Spirituality and Religion',
      description: "Immerse yourself in nature's beauty",
      image: religionCat,
      bg: 'from-blue-500 to-blue-950',
    },
    {
      id: 7,
      slug: slugify('Food and Vibes'),
      title: 'Food and Vibes',
      description: 'Savor delicious cuisine and great atmosphere',
      image: dinnerCat,
      bg: 'from-orange-500 to-red-600',
    },
    {
      id: 8,
      slug: slugify('Dinner and Dinner Parties'),
      title: 'Dinner and Dinner Parties',
      description: 'Experience vast landscapes and golden sunsets',
      image: dinnerCat,
      bg: 'from-orange-500 to-red-600',
    },
    {
      id: 9,
      slug: slugify('Music and Concerts'),
      title: 'Music and Concerts',
      description: 'Live music and unforgettable performances',
      image: musicCat,
      bg: 'from-blue-500 to-black-600',
    },
    {
      id: 10,
      slug: slugify('Education and Workshops'),
      title: 'Education and Workshops',
      description: 'Learn new skills and expand your knowledge',
      image: educationCat,
      bg: 'from-purple-950 to-pink-600',
    },
  ];
  const activeSlide = slides.find(
    slide => slide.slug === activeCategory
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (!isPlaying || activeCategory) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, activeCategory, slides.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  const goToNext = () =>
    setCurrentSlide(prev => (prev + 1) % slides.length);
  const togglePlayPause = () => setIsPlaying(prev => !prev);

  if (activeCategory && !activeSlide) {
    return (
      <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-gray-900 text-white">
        <p className="text-xl opacity-70">Category not found</p>
      </div>
    );
  }

  if (activeCategory && activeSlide) {
    return (
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl bg-gray-900">
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-linear-to-br ${activeSlide.bg} opacity-40`}
          />
          <Image
            src={activeSlide.image}
            alt={activeSlide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-gray-700/50">
            <h2 className=" text-2xl text-center md:text-5xl font-medium mb-4">
              {activeSlide.title}
            </h2>
            <p className="text-xl">{activeSlide.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${slide.bg} opacity-40`}
          />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-gray-700/50">
            <h2 className="text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-xl">{slide.description}</p>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'bg-white w-12 h-3'
                : 'bg-white/50 hover:bg-white/75 w-3 h-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSlidder;
