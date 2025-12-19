'use client';
import Link from "next/link";

const TickpassHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl animate-pulse [animation-delay:700ms]"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-400/10 rounded-full blur-2xl animate-pulse [animation-delay:1000ms]"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Secure seats,{' '}
                <span className="text-accent-400">stress free.</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-100 max-w-xl leading-relaxed">
                Locate occasions and create lifelong memories. It only takes a click to have your next amazing experience.
              </p>
            </div>

            <Link href="/events">
               <button className="group relative px-8 py-4 bg-accent-500 text-white font-semibold rounded-full text-lg overflow-hidden transition-all duration-300 hover:bg-accent-600 hover:scale-105 hover:shadow-2xl hover:shadow-accent-500/50 active:scale-95">
                  <span className="relative z-10">Discover Events</span>
                </button>
            </Link>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-4 text-primary-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="h-4 w-px bg-primary-600"></div>
              <div className="text-sm">
                <span className="font-semibold text-white">50K+</span> Events
              </div>
            </div>
          </div>

          {/* Right Content - Ticket Mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="ticket-container relative animate-float-ticket">
              {/* Main Ticket with Glassmorphism */}
              <div className="ticket-wrapper transform -rotate-[8deg] hover:-rotate-[5deg] transition-transform duration-500">
                <div className="relative sm:w-85 w-75 h-100 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Ticket perforated edge */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px">
                    <div className="flex justify-between px-4">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-primary-900"></div>
                      ))}
                    </div>
                  </div>

                  {/* Top section - Event details */}
                  <div className="p-8 h-1/2 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-accent-500/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        MUSIC FESTIVAL
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Summer Beats Festival
                      </h3>
                      <div className="space-y-2 text-primary-100">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">Dec 25, 202#</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">Ikeja Lagos Nigeria</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section - Ticket info */}
                  <div className="p-8 h-1/2 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-primary-200 text-sm">Section</span>
                        <span className="text-white font-semibold">VIP-A</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-primary-200 text-sm">Seat</span>
                        <span className="text-white font-semibold">12-B</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-primary-200 text-sm">Price</span>
                        <span className="text-accent-400 font-bold text-lg">$89.00</span>
                      </div>
                    </div>

                    {/* QR Code placeholder */}
                    <div className="mt-4 flex justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-900 opacity-20 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent-400/50 rounded-tr-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent-400/50 rounded-bl-2xl"></div>
                </div>
              </div>

              {/* Background ticket for depth */}
              <div className="absolute top-8 -right-4 w-80 h-96 backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-xl transform rotate-[5deg] -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-ticket {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-5px) translateX(-5px);
          }
          75% {
            transform: translateY(-15px) translateX(3px);
          }
        }

        .animate-float-ticket {
          animation: float-ticket 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TickpassHero;