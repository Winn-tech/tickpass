const NoEventsCalendar = ({ className = 'w-48 h-48 text-gray-400' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
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
);

export default NoEventsCalendar;
