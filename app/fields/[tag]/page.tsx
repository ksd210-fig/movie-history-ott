import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_FILMS, FIELDS, FieldTag } from '@/data/films'
import FilmCard from '@/components/FilmCard'
import { SITE_NAME } from '@/data/site'

type FieldPageParams = Promise<{ tag: string }>

export function generateStaticParams() {
  return (Object.keys(FIELDS) as FieldTag[]).map(tag => ({ tag }))
}

export async function generateMetadata({ params }: { params: FieldPageParams }): Promise<Metadata> {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag) as FieldTag
  const meta = FIELDS[tag]
  if (!meta) {
    return {
      title: '분야를 찾을 수 없음',
    }
  }

  const url = `/fields/${encodeURIComponent(tag)}`
  const description = meta.context ?? meta.desc

  return {
    title: meta.label,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${meta.label} — ${SITE_NAME}`,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${meta.label} — ${SITE_NAME}`,
      description,
    },
  }
}

export default async function FieldPage({ params }: { params: FieldPageParams }) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag) as FieldTag
  const meta = FIELDS[tag]
  if (!meta) notFound()

  const films = ALL_FILMS.filter(f => f.fields?.includes(tag)).sort((a, b) => a.year - b.year)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center h-14"
        style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', backdropFilter: 'blur(8px)' }}>
        <Link href="/" className="flex items-center" aria-label="영화의 역사 홈으로 돌아가기" style={{ gap: 12 }}>
          <span className="text-lg" style={{ color: '#8a8580' }}>←</span>
          <span className="text-sm font-medium tracking-widest" style={{ color: '#e8630a' }}>Fig.1</span>
          <span className="text-sm" style={{ color: '#3a3a3a' }}>/</span>
          <span className="text-sm" style={{ color: '#8a8580' }}>Movie History</span>
          <span className="text-sm" style={{ color: '#3a3a3a' }}>/</span>
          <span className="text-sm" style={{ color: '#f0ede8' }}>{meta.label}</span>
        </Link>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: '300px', background: meta.bg }}>
        <svg viewBox="0 0 1200 300" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
          <path d={meta.shape} fill={meta.accent} transform="scale(5, 1.5)" />
        </svg>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${meta.bg}ee 0%, transparent 60%)`,
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: `linear-gradient(to bottom, transparent, #0a0a0a)` }} />

        <div className="relative z-10" style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', paddingTop: 64, paddingBottom: 64 }}>
          <div style={{ marginBottom: 16 }}>
            <span className="text-xs font-medium rounded-full inline-block"
              style={{ background: `${meta.accent}22`, color: meta.accent, border: `1px solid ${meta.accent}44`, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4 }}>
              {meta.era ?? tag}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold" style={{ color: '#f0ede8', marginBottom: 8, letterSpacing: '-0.02em' }}>
            {meta.label}
          </h1>
          <p className="text-base" style={{ color: '#6a6560', marginBottom: meta.context ? 32 : 0 }}>{meta.desc}</p>
          {meta.context && (
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#a0a09a', borderLeft: `2px solid ${meta.accent}60`, paddingLeft: 20 }}>
              {meta.context}
            </p>
          )}
        </div>
      </div>

      {/* Film scroll */}
      <div style={{ marginTop: 40, paddingBottom: 80 }}>
        <div className="scroll-hide flex" style={{ overflowX: 'auto', gap: 12, paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
          {films.map((film, index) => (
            <FilmCard key={film.id} film={film} large priority={index < 4} />
          ))}
        </div>
      </div>
    </div>
  )
}
