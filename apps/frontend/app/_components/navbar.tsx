'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signout } from '../utils/authsApi';
import { useAuthStore } from '../store/authStore';

interface NavLink {
  name: string;
  href: string;
}

interface TickpassNavbarProps {
  cartCount?: number;
  onCreateEvent?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
}

const TickpassNavbar: React.FC<TickpassNavbarProps> = ({
  cartCount = 0,
  onCreateEvent,
  onCartClick,
  onProfileClick,
}) => {
  const router = useRouter();
  const { user, clearUser, isAuthReady } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks: NavLink[] = [
    { name: 'Events', href: '/events' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#' },
  ];

  const popularSearches: string[] = ['Concerts', 'Sports', 'Comedy Shows', 'Festivals', 'Theater'];

  const getInitials = () => {
    if (!user) return '';

    if (user.userType === 'business' && user.businessName) {
      return user.businessName.slice(0, 2).toUpperCase();
    }

    const first = user.firstName?.[0] ?? '';
    const last = user.lastName?.[0] ?? '';

    return `${first}${last}`.toUpperCase() || 'U';
  };

  const handleSignout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error('Signout failed:', error);
    } finally {
      clearUser();
      setIsMobileMenuOpen(false);
      router.push('/signin');
      router.refresh();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Link href="/">
                <div className="h-12 w-auto flex items-center">
                  <Image
                    src="/logo2.png"
                    alt="Tickpass Logo"
                    width={160}
                    height={48}
                    className="h-12 w-auto object-contain"
                    priority
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {isAuthReady && (
                <>
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={onCartClick}
                        className="relative p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                        aria-label="Shopping cart"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                      </button>

                      <Link href="/dashboard">
                        <button
                          onClick={onProfileClick}
                          className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold hover:bg-primary-600 transition-colors duration-200"
                          aria-label="User dashboard"
                        >
                          {getInitials()}
                        </button>
                      </Link>

                      <Link href="/dashboard">
                        <button className="px-6 py-2.5 bg-accent-500 text-white font-semibold rounded-full hover:bg-accent-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/30">
                          Visit Dashboard
                        </button>
                      </Link>

                      <button
                        onClick={handleSignout}
                        className="px-5 py-2 text-gray-700 font-semibold hover:text-primary-600 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin">
                        <button className="px-5 py-2 text-gray-700 font-semibold hover:text-primary-600 transition-colors duration-200">
                          Sign In
                        </button>
                      </Link>

                      <Link href="/signup">
                        <button className="px-5 py-2 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                          Sign Up
                        </button>
                      </Link>

                      <Link href="/createEvent">
                        <button
                          onClick={onCreateEvent}
                          className="px-6 py-2.5 bg-accent-500 text-white font-semibold rounded-full hover:bg-accent-600 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/30"
                        >
                          Create Event
                        </button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

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

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div
          className={`absolute top-0 left-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-14 w-40 flex items-center">
                  <Image
                    src="/logo2.png"
                    alt="Tickpass Logo"
                    width={160}
                    height={56}
                    className="h-full w-auto object-contain"
                  />
                </div>
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

              <div className="px-4 mt-6">
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg font-medium transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search Events
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 space-y-3">
              {isAuthReady && (
                <>
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

                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                          Visit Dashboard
                        </button>
                      </Link>

                      <button
                        onClick={handleSignout}
                        className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full px-4 py-3 text-gray-700 font-semibold hover:bg-gray-50 rounded-lg transition-colors duration-200">
                          Sign In
                        </button>
                      </Link>

                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200">
                          Sign Up
                        </button>
                      </Link>

                      <Link href="/createEvent" onClick={() => setIsMobileMenuOpen(false)}>
                        <button className="w-full px-4 py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors duration-200">
                          Create Event
                        </button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-32 transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        ></div>

        <div
          className={`relative w-full max-w-2xl mx-4 transition-all duration-300 ${
            isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-4 p-6 border-b border-gray-200">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
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

