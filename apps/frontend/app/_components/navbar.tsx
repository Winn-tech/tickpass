'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import Logo from './../../assets/logo.png'

interface NavLink {
  name: string;
  href: string;
}

interface TickpassNavbarProps {
  isLoggedIn?: boolean;
  cartCount?: number;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onCreateEvent?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

const TickpassNavbar: React.FC<TickpassNavbarProps> = ({
  isLoggedIn = false,
  cartCount = 0,
  onSignIn,
  onSignUp,
  onCreateEvent,
  onCartClick,
  onProfileClick,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks: NavLink[] = [
    { name: 'Events', href: 'events' },
    { name: 'How It Works', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const popularSearches: string[] = ['Concerts', 'Sports', 'Comedy Shows', 'Festivals', 'Theater'];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white shadow-md'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Link href='/'>
                   <div className="h-12 w-auto flex items-center">
                    <Image
                    src={Logo}
                    alt="Tickpass Logo"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    />
              </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link: NavLink) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
           
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {isLoggedIn ? (
                <>
                  {/* Cart Icon with Badge */}
                  <button 
                    onClick={onCartClick}
                    className="relative p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                    aria-label="Shopping cart"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {/* Profile Avatar */}
                  <button 
                    onClick={onProfileClick}
                    className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold hover:bg-primary-600 transition-colors duration-200"
                    aria-label="User profile"
                  >
                    JD
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In Button */}
                  <Link href='/signin'>
                     <button 
                        onClick={onSignIn}
                        className="px-5 py-2 text-gray-700 font-semibold hover:text-primary-600 transition-colors duration-200"
                      >
                        Sign In
                      </button>
                  </Link>

                  {/* Sign Up Button */}
                  <Link href='/signup'>
                     <button 
                        onClick={onSignUp}
                        className="px-5 py-2 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                      >
                        Sign Up
                    </button>
                  </Link>
                </>
              )}

              {/* Create Event CTA */}
              <Link href={'/createEvent'}>
                   <button 
                      onClick={onCreateEvent}
                      className="px-6 py-2.5 bg-accent-500 text-white font-semibold rounded-full hover:bg-accent-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/30"
                    >
                      Create Event
                    </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={Logo}
                    alt="Tickpass Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-primary-900">Tickpass</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-1 px-4">
                {navLinks.map((link: NavLink) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Search Button */}
              <div className="px-4 mt-6">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Events
                </button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="border-t border-gray-200 p-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={onCartClick}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-700">My Tickets</span>
                    {cartCount > 0 && (
                      <span className="bg-accent-500 text-white text-xs font-bold rounded-full px-2 py-1">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={onProfileClick}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    Profile
                  </button>
                </>
              ) : (
                <>
                 <Link href='/signin' onClick={() => setIsMobileMenuOpen(false)}>
                    <button 
                        onClick={onSignIn}
                        className="w-full px-4 py-3 text-gray-700 font-semibold hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        Sign In
                      </button>
                 </Link>

                  <Link href='/signup' onClick={() => setIsMobileMenuOpen(false)}>
                      <button 
                        onClick={onSignUp}
                        className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
                      >
                        Sign Up
                      </button>
                  </Link>
                </>
              )}
             <Link href={'/createEvent'} onClick={() => setIsMobileMenuOpen(false)}>
                 <button 
                    className="w-full px-4 py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors duration-200"
                  >
                    Create Event
                  </button>
             </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-32 transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay Background */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        ></div>

        {/* Search Container */}
        <div
          className={`relative w-full max-w-2xl mx-4 transition-all duration-300 ${
            isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Input */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-200">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for events, artists, venues..."
                className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="p-6">
              <p className="text-sm font-semibold text-gray-500 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag: string) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-600 text-gray-700 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TickpassNavbar;