
import React from 'react';

export const ClimateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l16.5 0m-16.5-6.75l16.5 0M4.125 6l15.75 0M4.125 18l15.75 0" />
  </svg>
);

export const RecycleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662a49.471 49.471 0 0014.862 0zM19.5 12v3.375c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125V12m15 0a48.46 48.46 0 01-14.862 0m14.862 0L21 12m-3-3h.008v.008H18V9m-1.5 0h.008v.008H16.5V9m-1.5 0h.008v.008H15V9m-1.5 0h.008v.008H13.5V9m-1.5 0h.008v.008H12V9m-1.5 0h.008v.008H10.5V9m-1.5 0h.008v.008H9V9m-1.5 0h.008v.008H7.5V9" />
  </svg>
);

export const OceanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5,8.25c0,7.18-7.5,11.25-7.5,11.25S4.5,15.43,4.5,8.25C4.5,4.71,7.84,2.25,12,2.25S19.5,4.71,19.5,8.25z" />
  </svg>
);

export const ForestIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75V12m0 9.75a8.25 8.25 0 000-16.5 8.25 8.25 0 000 16.5zm0-16.5V2.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-4.5 4.5m4.5-4.5l4.5 4.5m-4.5-4.5l-4.5-4.5m4.5 4.5l4.5-4.5" />
    </svg>
);

