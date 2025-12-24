import React from 'react';

interface AddEventIconProps {
  className?: string;
  size?: number;
}

export const AddEventIcon: React.FC<AddEventIconProps> = ({ 
  className = '', 
  size = 150 
}) => {
  return (
    <svg 
      viewBox="0 0 150 200" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 200) / 150}
      className={className}
    >
      <rect x="10" y="30" width="130" height="140" rx="8" fill="#3f51b5" stroke="#303f9f" strokeWidth="3"/>
      
      <rect x="10" y="30" width="130" height="35" rx="8" fill="#303f9f"/>
      <rect x="10" y="50" width="130" height="15" fill="#303f9f"/>
      
      <rect x="30" y="15" width="8" height="25" rx="4" fill="#757575"/>
      <rect x="112" y="15" width="8" height="25" rx="4" fill="#757575"/>
      
      <g fill="#c5cae9">
        <circle cx="35" cy="90" r="6"/>
        <circle cx="55" cy="90" r="6"/>
        <circle cx="75" cy="90" r="6"/>
        <circle cx="95" cy="90" r="6"/>
        <circle cx="115" cy="90" r="6"/>
        
        <circle cx="35" cy="110" r="6"/>
        <circle cx="55" cy="110" r="6"/>
        <circle cx="75" cy="110" r="6"/>
        <circle cx="95" cy="110" r="6"/>
        <circle cx="115" cy="110" r="6"/>
        
        <circle cx="35" cy="130" r="6"/>
        <circle cx="55" cy="130" r="6"/>
        <circle cx="75" cy="130" r="6"/>
        <circle cx="95" cy="130" r="6"/>
        <circle cx="115" cy="130" r="6"/>
        
        <circle cx="35" cy="150" r="6"/>
        <circle cx="55" cy="150" r="6"/>
        <circle cx="75" cy="150" r="6"/>
        <circle cx="95" cy="150" r="6"/>
      </g>
      
      <g transform="translate(95, 130)">
        <circle cx="0" cy="0" r="28" fill="#ff9800" stroke="white" strokeWidth="3"/>
        <rect x="-12" y="-3" width="24" height="6" rx="2" fill="white"/>
        <rect x="-3" y="-12" width="6" height="24" rx="2" fill="white"/>
      </g>
    </svg>
  );
};