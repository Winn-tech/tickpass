'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

const TickPassFooter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const eventCategories: FooterLink[] = [
    { label: 'Concerts', href: '/events/concerts' },
    { label: 'Sports', href: '/events/sports' },
    { label: 'Theater', href: '/events/theater' },
    { label: 'Festivals', href: '/events/festivals' },
    { label: 'Comedy Shows', href: '/events/comedy' },
    { label: 'Conferences', href: '/events/conferences' },
  ];

  const companyLinks: FooterLink[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
  ];

  const supportLinks: FooterLink[] = [
    { label: 'Help Center', href: '/help' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Ticket Refunds', href: '/refunds' },
    { label: 'Event Organizers', href: '/organizers' },
    { label: 'Accessibility', href: '/accessibility' },
  ];

  const legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const handleSubscribe = (): void => {
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <footer className="bg-primary-900 text-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="lg:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h3 className="text-2xl font-bold text-white">TickPass</h3>
            </div>

            <p className="text-primary-100 mb-6 leading-relaxed">
              Your gateway to unforgettable experiences. Discover and book tickets to the best events, concerts, sports, and shows near you.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:support@tickpass.com"
                className="flex items-center space-x-3 text-primary-100 hover:text-accent-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>support@tickpass.com</span>
              </a>

              <a
                href="tel:+1234567890"
                className="flex items-center space-x-3 text-primary-100 hover:text-accent-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4">Events</h4>
            <ul className="space-y-3">
              {eventCategories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-100 hover:text-accent-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-100 hover:text-accent-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-100 hover:text-accent-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-primary-100 text-sm mb-4">
              Get the latest events and exclusive offers delivered to your inbox.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                aria-label="Email address"
              />

              <button
                onClick={handleSubscribe}
                disabled={subscribed}
                className="w-full px-4 py-2 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors shadow-md"
              >
                {subscribed ? 'Subscribed! ✓' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-primary-100 hover:text-accent-400 transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-primary-100 hover:text-accent-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-primary-300 text-sm">
            © {new Date().getFullYear()} TickPass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TickPassFooter;
