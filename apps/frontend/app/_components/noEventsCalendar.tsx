import React from 'react';

const NoEventsCalendar = ({ className = 'w-48 h-48 text-primary-800' }) => (
  <div className="relative inline-block">
    {/* Orbiting dot with trail - positioned around the calendar */}
    <svg
      className="absolute pointer-events-none text-primary-600"
      style={{
        width: 'calc(100% + 40px)',
        height: 'calc(100% + 40px)',
        left: '-20px',
        top: '-20px'
      }}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Trail circles - orbiting around outer edge */}
      <circle cx="120" cy="20" r="3" fill="currentColor" opacity="0.15">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 120 120"
          to="360 120 120"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="120" cy="20" r="3" fill="currentColor" opacity="0.3">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="-15 120 120"
          to="345 120 120"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="120" cy="20" r="3.5" fill="currentColor" opacity="0.5">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="-30 120 120"
          to="330 120 120"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Main dot */}
      <circle cx="120" cy="20" r="4" fill="currentColor" filter="url(#glow)">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 120 120"
          to="360 120 120"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>

    {/* Calendar SVG with bounce */}
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        animation: 'bounce 2s ease-in-out infinite'
      }}
    >
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      
      {/* Calendar base */}
      <rect x="20" y="30" width="160" height="140" rx="12" stroke="currentColor" strokeWidth="4" />
      
      {/* Header */}
      <rect x="20" y="30" width="160" height="40" rx="12" stroke="currentColor" strokeWidth="4" />
      
      {/* Rings */}
      <line x1="60" y1="20" x2="60" y2="40" stroke="currentColor" strokeWidth="4" />
      <line x1="140" y1="20" x2="140" y2="40" stroke="currentColor" strokeWidth="4" />

      {/* Empty grid */}
      <g stroke="currentColor" strokeWidth="2" opacity="0.4">
        <line x1="40" y1="90" x2="160" y2="90" />
        <line x1="40" y1="115" x2="160" y2="115" />
        <line x1="40" y1="140" x2="160" y2="140" />

        <line x1="80" y1="75" x2="80" y2="155" />
        <line x1="120" y1="75" x2="120" y2="155" />
      </g>

      {/* No events symbol (slash) */}
      <line
        x1="50"
        y1="150"
        x2="150"
        y2="90"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.6"
      />
    </svg>
  </div>
);

export default function App() {
  return (
    <div className="flex items-center justify-center">
      <NoEventsCalendar className="w-64 h-64 text-primary-600" />
    </div>
  );
}
