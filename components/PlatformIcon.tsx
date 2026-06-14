import React from 'react'

export type Platform = 'netflix' | 'watcha' | 'disney' | 'appletv' | 'wavve' | 'tving' | 'youtube' | 'mubi'

const icons: Record<Platform, React.ReactElement> = {
  netflix: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#141414"/>
      <path d="M6 4h3.2l4.8 9.6V4H17v16h-3.2L9 10.4V20H6V4Z" fill="#E50914"/>
    </svg>
  ),
  watcha: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF0558"/>
      <path d="M4.5 7h2.3l2.2 6.8L11.2 7h1.6l2.2 6.8L17.2 7h2.3l-3.4 10h-1.8l-2.1-6.3L10.1 17H8.3L4.5 7Z" fill="white"/>
    </svg>
  ),
  disney: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#040E26"/>
      <text x="3" y="15" fontSize="7.5" fontWeight="bold" fill="white" fontFamily="Arial">Disney</text>
      <text x="3" y="21" fontSize="7" fontWeight="bold" fill="#4CC9F0" fontFamily="Arial">+ </text>
    </svg>
  ),
  appletv: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#1C1C1E"/>
      <path d="M12 4.5c-.8 0-1.8.5-2.4 1.4-.5.7-.9 1.8-.7 2.8 1 .1 2-.5 2.6-1.3.5-.7.8-1.8.5-2.9Z" fill="white"/>
      <path d="M14.8 9.3c-1.2-.7-2.8-.6-3.6 0C10 10 9 11.4 9 13c0 1.1.4 2.2 1 3 .5.7 1.1 1.5 1.9 1.5.7 0 1-.4 1.9-.4.9 0 1.2.4 1.9.4.8 0 1.4-.8 1.9-1.5.4-.6.7-1.2.9-1.9-1.3-.5-2.2-1.8-2.2-3.2 0-1.2.6-2.2 1.5-2.6Z" fill="white"/>
    </svg>
  ),
  wavve: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0F4C98"/>
      <path d="M4 8h2.2l2 6.2L10.2 8h1.6l2 6.2L15.8 8H18l-3.1 8h-1.8L11 9.8 8.9 16H7.1L4 8Z" fill="white"/>
    </svg>
  ),
  tving: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF153C"/>
      <path d="M5 7h14v2.5H13v7.5h-2V9.5H5V7Z" fill="white"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0F0F0F"/>
      <rect x="2" y="6" width="20" height="12" rx="3" fill="#FF0000"/>
      <path d="M10 9.5l5 2.5-5 2.5V9.5Z" fill="white"/>
    </svg>
  ),
  mubi: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <circle cx="12" cy="12" r="7" fill="none" stroke="#ffffff" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3.5" fill="#ffffff"/>
    </svg>
  ),
}

const labels: Record<Platform, string> = {
  netflix: 'Netflix',
  watcha: 'Watcha',
  disney: 'Disney+',
  appletv: 'Apple TV+',
  wavve: 'Wavve',
  tving: 'Tving',
  youtube: 'YouTube',
  mubi: 'MUBI',
}

export default function PlatformIcon({ platform, url }: { platform: Platform; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={labels[platform]}
      className="group flex flex-col items-center gap-1.5 transition-transform hover:scale-110"
    >
      <div className="w-10 h-10 rounded-lg overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
        {icons[platform]}
      </div>
      <span className="text-[10px]" style={{ color: '#5a5a5a' }}>{labels[platform]}</span>
    </a>
  )
}
