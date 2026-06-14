import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { techFilms, industryFilms, artFilms, oscFilms, cannesFilms, veniceFilms, berlinFilms, getEraStyle, POSTERS } from '@/data/films'
import PlatformIcon from '@/components/PlatformIcon'

const allFilms = [...techFilms, ...industryFilms, ...artFilms, ...oscFilms, ...cannesFilms, ...veniceFilms, ...berlinFilms]

export function generateStaticParams() {
  return allFilms.map(f => ({ id: f.id }))
}

export default async function FilmPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const film = allFilms.find(f => f.id === id)
  if (!film) notFound()

  const era = getEraStyle(film.year)

  const related = allFilms.filter(f =>
    f.id !== film.id &&
    Math.abs(f.year - film.year) <= 15 &&
    f.category === film.category
  ).slice(0, 6)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center h-14"
        style={{ paddingLeft: 56, paddingRight: 56, background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', backdropFilter: 'blur(8px)' }}>
        <Link href="/" className="flex items-center" style={{ gap: 12 }}>
          <span className="text-lg" style={{ color: '#8a8580' }}>←</span>
          <span className="text-sm font-medium tracking-widest" style={{ color: '#e8630a' }}>Fig.1</span>
          <span className="text-sm" style={{ color: '#3a3a3a' }}>/</span>
          <span className="text-sm" style={{ color: '#8a8580' }}>Movie History</span>
        </Link>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${era.bg} 0%, #0a0a0a 70%)`,
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }} />

        <div className="relative z-10 flex flex-col md:flex-row max-w-5xl"
          style={{ paddingLeft: 56, paddingRight: 56, paddingTop: 64, paddingBottom: 64, gap: 40 }}>

          {/* Poster */}
          <div className="flex-none rounded-xl overflow-hidden"
            style={{ width: 192, height: 288, position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            {POSTERS[film.id] ? (
              <Image
                src={POSTERS[film.id]}
                alt={film.title}
                fill
                sizes="192px"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: era.tag }}>
                <span className="text-4xl font-bold" style={{ color: era.tagText, marginBottom: 4 }}>{film.year}</span>
                <span className="text-xs text-center" style={{ color: `${era.tagText}99`, paddingLeft: 12, paddingRight: 12 }}>{film.keyword}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-end" style={{ gap: 16 }}>
            <div className="flex items-center flex-wrap" style={{ gap: 8 }}>
              <span className="text-xs font-medium rounded-full"
                style={{ background: era.tag, color: era.tagText, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4 }}>
                {film.keyword}
              </span>
              <span className="text-xs rounded-full"
                style={{ background: '#1e1e1e', color: '#8a8580', paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4 }}>
                {film.category === 'tech' ? '기술 관점' : '산업 관점'}
              </span>
              <span className="text-xs" style={{ color: '#4a4a4a' }}>{film.year}</span>
            </div>

            <h1 className="text-4xl font-medium leading-tight" style={{ color: '#f0ede8' }}>
              {film.title}
            </h1>

            <p className="text-base leading-relaxed max-w-xl" style={{ color: '#b0ada8' }}>
              {film.description}
            </p>

            <div style={{ marginTop: 16 }}>
              <p className="text-xs" style={{ color: '#4a4a4a', marginBottom: 12 }}>어디서 볼 수 있을까?</p>
              <a
                href={`https://www.justwatch.com/kr/search?q=${encodeURIComponent(film.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium justwatch-btn"
                style={{
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  color: '#c0bdb8',
                  paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
                  borderRadius: 6, gap: 8, textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                JustWatch에서 찾기
              </a>
            </div>

            <div className="flex items-center" style={{ gap: 16, marginTop: 16 }}>
              <span className="text-xs" style={{ color: '#4a4a4a' }}>Fig.1 · Movie History</span>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 40, paddingBottom: 80, paddingLeft: 56, paddingRight: 56 }}>
          <h2 className="text-sm font-medium" style={{ color: '#8a8580', marginBottom: 20 }}>
            같은 시대 · 같은 관점
          </h2>
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            {related.map(f => {
              const s = getEraStyle(f.year)
              return (
                <Link key={f.id} href={`/films/${f.id}`} className="group block rounded-lg overflow-hidden"
                  style={{ width: 144, border: '1px solid #2a2a2a' }}>
                  <div className="relative" style={{ height: 208, background: s.bg }}>
                    {POSTERS[f.id] ? (
                      <Image src={POSTERS[f.id]} alt={f.title} fill sizes="144px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 12 }}>
                        <span className="text-[10px] rounded self-start"
                          style={{ background: s.tag, color: s.tagText, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>{f.keyword}</span>
                        <p className="text-[13px] font-medium leading-snug" style={{ color: s.text }}>{f.title}</p>
                      </div>
                    )}
                    {/* hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-end"
                      style={{ background: 'rgba(0,0,0,0.88)', transition: 'opacity 0.2s', padding: 10 }}>
                      <p className="text-[10px]" style={{ color: '#8a8580', marginBottom: 3 }}>{f.year}</p>
                      <p className="text-[12px] font-medium leading-snug" style={{ color: '#f0ede8', marginBottom: 5 }}>{f.title}</p>
                      <p className="text-[10px] leading-relaxed" style={{ color: '#8a8580' }}>{f.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
