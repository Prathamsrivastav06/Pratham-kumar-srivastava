
import React from 'react';

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M20.2,5H19V3A1,1,0,0,0,18,2H6A1,1,0,0,0,5,3V5H3.8A1.8,1.8,0,0,0,2,6.8V9.2A1.8,1.8,0,0,0,3.8,11H5v3a7,7,0,0,0,14,0V11h1.2A1.8,1.8,0,0,0,22,9.2V6.8A1.8,1.8,0,0,0,20.2,5ZM7,4h10V5H7ZM12,20a5,5,0,0,1-5-5V11H17v4A5,5,0,0,1,12,20Zm8.2-11H19V7h1.2A.2.2,0,0,1,20,7.2v1.6A.2.2,0,0,1,20.2,9ZM4,7.2A.2.2,0,0,1,3.8,7H5V9H3.8A.2.2,0,0,1,4,9.2Z"
    />
  </svg>
);
