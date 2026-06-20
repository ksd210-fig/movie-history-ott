import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ALL_FILMS,
  getCanonicalFilm,
  getCanonicalFilmId,
  getCanonicalFilmPath,
  getEraStyle,
  getPosterPlaceholder,
  getUniqueCanonicalFilms,
  POSTERS,
} from '@/data/films'
import { SITE_NAME, SITE_URL } from '@/data/site'

type FilmPageParams = Promise<{ id: string }>

export function generateStaticParams() {
  return ALL_FILMS.map(f => ({ id: f.id }))
}

export async function generateMetadata({ params }: { params: FilmPageParams }): Promise<Metadata> {
  const { id } = await params
  const film = ALL_FILMS.find(f => f.id === id)
  if (!film) {
    return {
      title: '영화를 찾을 수 없음',
    }
  }

  const title = `${film.title} (${film.year})`
  const description = `${film.keyword}. ${film.description}`
  const canonicalFilm = getCanonicalFilm(film)
  const url = getCanonicalFilmPath(film)
  const poster = POSTERS[film.id] ?? POSTERS[canonicalFilm.id]

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url,
      type: 'article',
      images: poster ? [{ url: poster, alt: film.title }] : undefined,
    },
    twitter: {
      card: poster ? 'summary_large_image' : 'summary',
      title: `${title} — ${SITE_NAME}`,
      description,
      images: poster ? [poster] : undefined,
    },
  }
}

export default async function FilmPage({ params }: { params: FilmPageParams }) {
  const { id } = await params
  const film = ALL_FILMS.find(f => f.id === id)
  if (!film) notFound()

  const era = getEraStyle(film.year)
  const canonicalId = getCanonicalFilmId(film.id)
  const canonicalPath = getCanonicalFilmPath(film)

  const related = getUniqueCanonicalFilms(ALL_FILMS.filter(f =>
    getCanonicalFilmId(f.id) !== canonicalId &&
    Math.abs(f.year - film.year) <= 15 &&
    f.category === film.category
  )).slice(0, 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    datePublished: String(film.year),
    description: film.description,
    image: POSTERS[film.id],
    url: `${SITE_URL}${canonicalPath}`,
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center h-14"
        style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', backdropFilter: 'blur(8px)' }}>
        <Link href="/" className="flex items-center" aria-label="영화의 역사 홈으로 돌아가기" style={{ gap: 12 }}>
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
          style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', paddingTop: 64, paddingBottom: 64, gap: 40 }}>

          {/* Poster */}
          <div className="flex-none rounded-xl overflow-hidden self-start"
            style={{ width: 160, height: 240, position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            {POSTERS[film.id] ? (
              <Image
                src={POSTERS[film.id]}
                alt={film.title}
                fill
                sizes="192px"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={getPosterPlaceholder(film.year)}
                preload
                loading="eager"
                fetchPriority="high"
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

              <span className="text-xs" style={{ color: '#4a4a4a' }}>{film.year}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-medium leading-tight" style={{ color: '#f0ede8' }}>
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
                aria-label={`${film.title} JustWatch에서 찾기`}
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

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 40, paddingBottom: 80, paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
          <h2 className="text-sm font-medium" style={{ color: '#8a8580', marginBottom: 20 }}>
            비슷한 시대 · 비슷한 관점
          </h2>
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            {related.map(f => {
              const s = getEraStyle(f.year)
              return (
                <Link key={f.id} href={getCanonicalFilmPath(f)} className="group block rounded-lg overflow-hidden"
                  aria-label={`${f.title} (${f.year}) 상세 보기`}
                  style={{ width: 144, border: '1px solid #2a2a2a' }}>
                  <div className="relative" style={{ height: 208, background: s.bg }}>
                    {POSTERS[f.id] ? (
                      <Image
                        src={POSTERS[f.id]}
                        alt={f.title}
                        fill
                        sizes="144px"
                        placeholder="blur"
                        blurDataURL={getPosterPlaceholder(f.year)}
                        style={{ objectFit: 'cover' }}
                      />
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
