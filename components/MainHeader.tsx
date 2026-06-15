import Link from 'next/link'

export type MainView = 'home' | 'timeline'

export default function MainHeader({ view }: { view: MainView }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14"
      style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', backdropFilter: 'blur(8px)' }}>
      <div className="flex items-center flex-none" style={{ gap: 20 }}>
        <span className="text-sm font-medium tracking-widest" style={{ color: '#e8630a' }}>Fig.1</span>
        <span className="text-sm font-medium header-subtitle" style={{ color: '#f0ede8' }}>Movie History</span>
      </div>
      <div className="flex items-center flex-none" style={{ gap: 12 }}>
        <ViewToggle view={view} />
      </div>
    </header>
  )
}

function ViewToggle({ view }: { view: MainView }) {
  return (
    <div className="flex items-center" style={{ background: '#181818', border: '1px solid #2a2a2a', borderRadius: 6, padding: 3, gap: 2 }}>
      <Link
        href="/"
        aria-label="홈 보기"
        aria-current={view === 'home' ? 'page' : undefined}
        title="홈"
        style={{
          width: 30, height: 26, borderRadius: 4,
          background: view === 'home' ? '#2a2a2a' : 'transparent',
          color: view === 'home' ? '#f0ede8' : '#4a4a4a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
        </svg>
      </Link>

      <Link
        href="/timeline"
        aria-label="타임라인 보기"
        aria-current={view === 'timeline' ? 'page' : undefined}
        title="타임라인"
        style={{
          width: 30, height: 26, borderRadius: 4,
          background: view === 'timeline' ? '#2a2a2a' : 'transparent',
          color: view === 'timeline' ? '#f0ede8' : '#4a4a4a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <line x1="4" y1="2" x2="13" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="1.5" cy="2" r="1.5" fill="currentColor" />
          <line x1="4" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="1.5" cy="7" r="1.5" fill="currentColor" />
          <line x1="4" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="1.5" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </Link>
    </div>
  )
}
