'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import dinnerCart from "@/assets/dinnerCat.jpg";
import religionCat from "@/assets/religionCat.jpg";
import sportsCat from "@/assets/sportsCat.jpg";
import techCat from "@/assets/techCat.jpg";

const CategoriesSlidder: React.FC = () => {
  const slides = [
    { id: 1, title: 'Tech', description: 'Explore breathtaking peaks and valleys', image: techCat, bg: 'from-purple-950 to-pink-600' },
    { id: 2, title: 'Sports', description: 'Discover the calm of endless horizons', image: sportsCat, bg: 'from-blue-500 to-black-600' },
    { id: 3, title: 'Religion', description: 'Immerse yourself in nature\'s beauty', image: religionCat, bg: 'from-blue-500 to-blue-950' },
    { id: 4, title: 'Dinner', description: 'Experience vast landscapes and golden sunsets', image: dinnerCart, bg: 'from-orange-500 to-red-600' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl bg-gray-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`absolute inset-0 bg-linear-to-br ${slide.bg} opacity-40`} />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-gray-700/50">
            <h2 className="text-5xl font-bold mb-4 ">{slide.title}</h2>
            <p className="text-xl">{slide.description}</p>
          </div>
        </div>
      ))}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
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
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSlidder;