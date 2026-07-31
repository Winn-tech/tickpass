'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    { name: 'My Tickets', href: '/tickets' },
  ];

  const popularSearches: string[] = [
    'Concerts',
    'Sports',
    'Comedy Shows',
    'Festivals',
    'Theater',
  ];

  const isActiveLink = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  };

  const getInitials = (): string => {
    if (!user) return '';

    if (user.userType === 'business' && user.businessName) {
      return user.businessName.slice(0, 2).toUpperCase();
    }

    const first = user.firstName?.[0] ?? '';
    const last = user.lastName?.[0] ?? '';

    return `${first}${last}`.toUpperCase() || 'U';
  };

  const handleSignout = async (): Promise<void> => {
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
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center">
                <div className="flex h-12 w-auto items-center">
                  <Image
                    src="/logo2.png"
                    alt="Tickpass Logo"
                    width={100}
                    height={30}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link: NavLink) => {
                const isActive = isActiveLink(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative font-medium transition-colors duration-200 group ${
                      isActive
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600 text-[13px]'
                    }`}
                  >
                    {link.name}

                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-200 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-primary-600"
                aria-label="Search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                      {/* Cart */}
                      <button
                        type="button"
                        onClick={onCartClick}
                        className="relative rounded-full p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-primary-600"
                        aria-label="Shopping cart"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>

                        {cartCount > 0 && (
                          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                      </button>

                      {/* Profile */}
                      <Link href="/dashboard">
                        <button
                          type="button"
                          onClick={onProfileClick}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 font-semibold text-white transition-colors duration-200 hover:bg-primary-600"
                          aria-label="User dashboard"
                        >
                          {getInitials()}
                        </button>
                      </Link>

                      {/* Dashboard */}
                      <Link href="/dashboard">
                        <button
                          type="button"
                          className="rounded-full bg-accent-500 px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/30"
                        >
                          Visit Dashboard
                        </button>
                      </Link>

                      {/* Signout */}
                      <button
                        type="button"
                        onClick={handleSignout}
                        className="px-5 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:text-primary-600"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin">
                        <button
                          type="button"
                          className="px-5 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:text-primary-600"
                        >
                          Sign In
                        </button>
                      </Link>

                      <Link href="/signup">
                        <button
                          type="button"
                          className="rounded-full bg-gray-900 px-5 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800"
                        >
                          Sign Up
                        </button>
                      </Link>

                      <Link href="/createEvent">
                        <button
                          type="button"
                          onClick={onCreateEvent}
                          className="rounded-full bg-accent-500 px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/30"
                        >
                          Create Event
                        </button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-primary-600 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute bottom-0 left-0 top-0 w-80 transform bg-white shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <div className="flex h-14 w-40 items-center">
                <Image
                  src="/logo2.png"
                  alt="Tickpass Logo"
                  width={100}
                  height={30}
                  className="h-full w-auto object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-primary-600"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-1 px-4">
                {navLinks.map((link: NavLink) => {
                  const isActive = isActiveLink(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-lg px-4 py-3 font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Search */}
              <div className="mt-6 px-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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

            {/* Mobile Footer */}
            <div className="space-y-3 border-t border-gray-200 p-4">
              {isAuthReady && (
                <>
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/tickets"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 transition-colors duration-200 hover:bg-gray-100"
                      >
                        <span className="font-medium text-gray-700">
                          My Tickets
                        </span>

                        {cartCount > 0 && (
                          <span className="rounded-full bg-accent-500 px-2 py-1 text-xs font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <button
                          type="button"
                          className="w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                        >
                          Visit Dashboard
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignout}
                        className="w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <button
                          type="button"
                          className="w-full rounded-lg px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                        >
                          Sign In
                        </button>
                      </Link>

                      <Link
                        href="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <button
                          type="button"
                          className="w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
                        >
                          Sign Up
                        </button>
                      </Link>

                      <Link
                        href="/createEvent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <button
                          type="button"
                          className="w-full rounded-lg bg-accent-500 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-accent-600"
                        >
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

      {/* Search Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-32 transition-opacity duration-300 ${
          isSearchOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />

        <div
          className={`relative mx-4 w-full max-w-2xl transition-all duration-300 ${
            isSearchOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Search Header */}
            <div className="flex items-center gap-4 border-b border-gray-200 p-6">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
                className="flex-1 text-lg text-gray-900 outline-none placeholder:text-gray-400"
                autoFocus
              />

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Popular Searches */}
            <div className="p-6">
              <p className="mb-3 text-sm font-semibold text-gray-500">
                Popular Searches
              </p>

              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag: string) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600"
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
