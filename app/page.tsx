'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FilmCard from '@/components/FilmCard'
import { techFilms, industryFilms, artFilms, oscFilms, cannesFilms, veniceFilms, berlinFilms, Film, getEraStyle, FIELDS, FieldTag, POSTERS } from '@/data/films'

type Filter = 'all' | 'art'

const ALL_FILMS = [...techFilms, ...industryFilms, ...artFilms, ...oscFilms, ...cannesFilms, ...veniceFilms, ...berlinFilms]

const HERO_FILMS = [
  techFilms.find(f => f.id === 'tech-2001'),
  industryFilms.find(f => f.id === 'ind-godfather'),
  artFilms.find(f => f.id === 'art-breathless'),
].filter(Boolean) as typeof techFilms

function HeroCarousel() {
  const [idx, setIdx] = useState(0)
  const [animDir, setAnimDir] = useState<'left'|'right'>('right')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = (next: number, dir: 'left'|'right') => {
    setAnimDir(dir)
    setIdx((next + HERO_FILMS.length) % HERO_FILMS.length)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => go(idx + 1, 'right'), 5000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [idx])

  const film = HERO_FILMS[idx]
  const era = getEraStyle(film.year)

  return (
    <div className="relative overflow-hidden hero-carousel" style={{ height: "520px" }}>
      {/* Background */}
      <div key={film.id} className="absolute inset-0 transition-opacity duration-700"
        style={{ background: `linear-gradient(135deg, ${era.bg} 0%, #0a0a0a 65%)` }} />

      {/* Poster on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
        {POSTERS[film.id] ? (
          <>
            <Image
              src={POSTERS[film.id]}
              alt={film.title}
              fill
              sizes="50vw"
              style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.35 }}
              priority
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0a0a0a 0%, transparent 40%)' }} />
          </>
        ) : (
          <svg viewBox="0 0 600 520" className="w-full h-full opacity-15" preserveAspectRatio="xMaxYMid slice">
            <circle cx="500" cy="200" r="320" fill={era.tag} />
            <circle cx="300" cy="400" r="180" fill={era.tag} opacity="0.5" />
          </svg>
        )}
      </div>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0a0a0a 30%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-3xl" style={{ paddingLeft: 'var(--page-px)', paddingBottom: 64 }}>
        <div className="flex items-center" style={{ gap: 8, marginBottom: 20 }}>
          <span className="text-[11px] font-medium"
            style={{ background: era.tag, color: era.tagText, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, borderRadius: 4 }}>
            {film.keyword}
          </span>
          <span className="text-[11px]" style={{ color: '#5a5a5a' }}>
            {film.category === 'tech' ? '기술 관점' : film.category === 'industry' ? '산업 관점' : '예술 운동'}
          </span>
          <span className="text-[11px]" style={{ color: '#3a3a3a' }}>·</span>
          <span className="text-[11px]" style={{ color: '#5a5a5a' }}>{film.year}</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: '#f0ede8', letterSpacing: '-0.02em', marginBottom: 20 }}>
          {film.title}
        </h2>

        <p className="text-sm leading-relaxed" style={{ color: '#8a8580', marginBottom: 32, maxWidth: 512 }}>
          {film.description}
        </p>

        <Link href={`/films/${film.id}`}
          className="inline-flex items-center self-start transition-opacity hover:opacity-80"
          style={{ background: '#f0ede8', color: '#0a0a0a', gap: 8, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, borderRadius: 8, fontSize: 14, fontWeight: 500 }}>
          ▶ 자세히 보기
        </Link>
      </div>

      {/* Left arrow */}
      <button onClick={() => go(idx - 1, 'left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(240,237,232,0.1)', border: '1px solid rgba(240,237,232,0.2)', color: '#f0ede8', fontSize: 22, cursor: 'pointer' }}>
        ‹
      </button>

      {/* Right arrow */}
      <button onClick={() => go(idx + 1, 'right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(240,237,232,0.1)', border: '1px solid rgba(240,237,232,0.2)', color: '#f0ede8', fontSize: 22, cursor: 'pointer' }}>
        ›
      </button>

      {/* Indicator */}
      <div className="absolute z-20 flex items-center" style={{ bottom: 32, right: 32, gap: 12 }}>
        <span className="text-sm font-medium tabular-nums" style={{ color: '#f0ede8' }}>{idx + 1}</span>
        <span style={{ color: '#3a3a3a' }}>|</span>
        <span className="text-sm tabular-nums" style={{ color: '#5a5a5a' }}>{HERO_FILMS.length}</span>
      </div>

      {/* Dot indicators */}
      <div className="absolute z-20 flex items-center" style={{ bottom: 32, left: '50%', transform: 'translateX(-50%)', gap: 6 }}>
        {HERO_FILMS.map((_, i) => (
          <button key={i} onClick={() => go(i, i > idx ? 'right' : 'left')}
            style={{
              width: i === idx ? 20 : 6, height: 6,
              borderRadius: 3,
              background: i === idx ? '#f0ede8' : '#3a3a3a',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.3s',
            }} />
        ))}
      </div>
    </div>
  )
}

const FIELD_GROUPS: { label: string; tags: FieldTag[] }[] = [
  { label: '기술 관점으로 보는 영화사', tags: ['편집', '촬영', '시각효과', '애니메이션'] },
]

const AWARD_TAGS: FieldTag[] = ['아카데미', '칸', '베니스', '베를린']

const ART_MOVEMENT_TAGS: FieldTag[] = [
  '표현주의', '소비에트몽타주', '포에틱리얼리즘', '누아르', '네오리얼리즘',
  '누벨바그', '브리티시뉴웨이브', '다이렉트시네마', '뉴저먼시네마',
  '타이완뉴시네마', '홍콩느와르', '도그마95', '루마니아뉴웨이브',
]

const INDUSTRY_TAGS: FieldTag[] = ['스튜디오시대', '뉴할리우드', '블록버스터', '인디필름', '스트리밍']

const AWARD_TROPHY_IMG: Partial<Record<FieldTag, string>> = {
  '아카데미': '/trophies/oscar.svg',
  '칸':       '/trophies/palme.svg',
  '베니스':   '/trophies/lion.svg',
  '베를린':   '/trophies/bear.svg',
}

function FieldTile({ tag }: { tag: FieldTag }) {
  const meta = FIELDS[tag]
  const trophySrc = AWARD_TROPHY_IMG[tag]

  return (
    <Link href={`/fields/${encodeURIComponent(tag)}`}
      className="relative overflow-hidden rounded-xl block"
      style={{ height: 130, background: meta.bg, border: `1px solid ${meta.accent}22`, transition: 'transform 0.18s, box-shadow 0.18s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 28px ${meta.accent}30` }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      {trophySrc ? (
        <>
          {/* Accent radial glow */}
          <div className="absolute pointer-events-none" style={{
            right: 0, top: 0, bottom: 0, width: '65%',
            background: `radial-gradient(ellipse at 85% 50%, ${meta.accent}28 0%, ${meta.accent}08 50%, transparent 75%)`,
          }} />
          {/* Trophy */}
          <div className="absolute pointer-events-none" style={{ right: 24, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={trophySrc} alt="" style={{ height: 88, maxWidth: 128, width: 'auto', objectFit: 'contain', opacity: 0.88, filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }} />
          </div>
          {/* Text protection gradient */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${meta.bg} 38%, ${meta.bg}e8 55%, ${meta.bg}70 72%, transparent 100%)` }} />
        </>
      ) : (
        <svg viewBox="0 0 240 200" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="xMidYMid slice">
          <path d={meta.shape} fill={meta.accent} />
        </svg>
      )}
      <div className="relative z-10 flex flex-col justify-center h-full" style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16 }}>
        <p className="text-[15px] font-semibold leading-tight" style={{ color: '#f0ede8' }}>{meta.label}</p>
        <p className="text-[11px]" style={{ color: '#6a6560', marginTop: 5 }}>{meta.desc}</p>
      </div>
    </Link>
  )
}

function FieldTileScrollRow({ label, tags }: { label: string; tags: FieldTag[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = 0
    setCanLeft(false)
    setCanRight(true)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? el.clientWidth * 0.75 : -el.clientWidth * 0.75, behavior: 'smooth' })
    setTimeout(updateArrows, 350)
  }

  return (
    <div>
      <p className="text-xs font-medium tracking-widest uppercase"
        style={{ color: '#4a4a4a', marginBottom: 12, paddingLeft: 56 }}>
        {label}
      </p>
      <div className="relative">
        {canLeft && <ArrowBtn dir="left" onClick={() => scroll('left')} visible />}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto scroll-hide"
          style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', gap: 12, paddingBottom: 8 }}
        >
          {tags.map(tag => (
            <div key={tag} style={{ flexShrink: 0, width: 'calc((100vw - 160px) / 5)' }}>
              <FieldTile tag={tag} />
            </div>
          ))}
        </div>
        <ArrowBtn dir="right" onClick={() => scroll('right')} visible={canRight} />
      </div>
    </div>
  )
}

function FieldTiles() {
  return (
    <div>
      <div className="flex flex-col" style={{ gap: 40 }}>
        {FIELD_GROUPS.map(group =>
          group.tags.length > 5 ? (
            <FieldTileScrollRow key={group.label} label={group.label} tags={group.tags} />
          ) : (
            <div key={group.label} style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
              <h2 className="text-2xl font-bold" style={{ color: '#f0ede8', letterSpacing: '-0.01em', marginBottom: 20 }}>
                {group.label}
              </h2>
              <div className="grid" style={{ gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                {group.tags.map(tag => <FieldTile key={tag} tag={tag} />)}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

const ERA_LABELS = [
  { label: '1900–1929', years: [1900, 1929] },
  { label: '1930–1949', years: [1930, 1949] },
  { label: '1950–1969', years: [1950, 1969] },
  { label: '1970–1989', years: [1970, 1989] },
  { label: '1990–2009', years: [1990, 2009] },
  { label: '2010–', years: [2010, 2099] },
]

const EXPANDED_W = 240
const EXPANDED_POSTER_H = 360

function ExpandedCard({ film, cardRect, sectionEl, onMouseEnter, onMouseLeave }: {
  film: Film
  cardRect: DOMRect
  sectionEl: HTMLElement
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  const era = getEraStyle(film.year)
  const sRect = sectionEl.getBoundingClientRect()

  let left = (cardRect.left - sRect.left) + cardRect.width / 2 - EXPANDED_W / 2
  const centerY = (cardRect.top - sRect.top) + cardRect.height / 2

  left = Math.max(8, Math.min(sRect.width - EXPANDED_W - 8, left))

  return (
    <Link href={`/films/${film.id}`}
      className="block rounded-xl overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        left,
        top: centerY,
        transform: 'translateY(-50%)',
        width: EXPANDED_W,
        zIndex: 50,
        boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
        border: '1px solid #3a3a3a',
        animation: 'expandIn 0.15s ease-out forwards',
      }}
    >
      <style>{`
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-50%) scale(0.92); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
      `}</style>

      {/* Poster */}
      <div className="relative" style={{ height: EXPANDED_POSTER_H, background: era.bg }}>
        {POSTERS[film.id] ? (
          <Image
            src={POSTERS[film.id]}
            alt={film.title}
            fill
            sizes={`${EXPANDED_W}px`}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 16 }}>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-medium"
                style={{ background: era.tag, color: era.tagText, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2, borderRadius: 4 }}>
                {film.keyword}
              </span>
              <span className="text-xs font-medium" style={{ color: era.tagText }}>
                {film.year}
              </span>
            </div>
            <p className="text-[15px] font-semibold leading-snug" style={{ color: era.text }}>
              {film.title}
            </p>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.95) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: 16 }}>
          <p className="text-[14px] font-semibold leading-snug" style={{ color: '#f0ede8' }}>{film.title}</p>
          <p className="text-[11px]" style={{ color: '#8a8580', marginTop: 4 }}>{film.year}</p>
          <p className="text-[11px] leading-relaxed" style={{ color: '#a0a09a', marginTop: 8 }}>
            {film.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

const CATEGORY_LABEL: Record<string, string> = {
  tech: '기술',
  industry: '산업',
  art: '예술',
}
const CATEGORY_COLOR: Record<string, string> = {
  tech: '#4a9eff',
  industry: '#e8630a',
  art: '#b07cff',
}

function TimelineView({ films }: { films: Film[] }) {
  const sorted = [...films].sort((a, b) => a.year - b.year)

  const decades = new Map<number, Film[]>()
  for (const f of sorted) {
    const dec = Math.floor(f.year / 10) * 10
    if (!decades.has(dec)) decades.set(dec, [])
    decades.get(dec)!.push(f)
  }

  return (
    <div style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', paddingBottom: 80 }}>
      {Array.from(decades.entries()).map(([decade, decadeFilms], di) => (
        <div key={decade} style={{ marginTop: di === 0 ? 0 : 56 }}>
          {/* Decade label */}
          <div className="flex items-center" style={{ marginBottom: 28 }}>
            <span className="text-xs font-semibold tracking-widest"
              style={{ color: '#e8630a', width: 56, flexShrink: 0 }}>
              {decade}s
            </span>
            <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
          </div>

          {/* Films */}
          <div className="flex flex-col" style={{ gap: 0 }}>
            {decadeFilms.map((film, fi) => {
              const poster = POSTERS[film.id]
              const catColor = CATEGORY_COLOR[film.category] ?? '#8a8580'
              const catLabel = CATEGORY_LABEL[film.category] ?? ''
              const isLast = fi === decadeFilms.length - 1

              return (
                <div key={film.id} className="flex" style={{ gap: 0 }}>
                  {/* Left: year + vertical line */}
                  <div className="flex flex-col items-center" style={{ width: 56, flexShrink: 0 }}>
                    <span className="text-xs tabular-nums" style={{ color: '#4a4a4a', paddingTop: 14 }}>
                      {film.year}
                    </span>
                    {!isLast && (
                      <div style={{ flex: 1, width: 1, background: '#1e1e1e', marginTop: 8 }} />
                    )}
                  </div>

                  {/* Card */}
                  <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16, paddingTop: 4, paddingLeft: 16 }}>
                    <Link href={`/films/${film.id}`}>
                      <div className="flex rounded-xl overflow-hidden transition-all hover:scale-[1.01]"
                        style={{ background: '#111', border: '1px solid #1e1e1e', height: 96 }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                      >
                        {/* Poster thumbnail */}
                        <div className="flex-none relative" style={{ width: 64, height: 96 }}>
                          {poster ? (
                            <Image src={poster} alt={film.title} fill sizes="64px" style={{ objectFit: 'cover' }} />
                          ) : (
                            <div className="absolute inset-0" style={{ background: '#1e1e1e' }} />
                          )}
                        </div>

                        {/* Info */}
                        <div style={{ padding: 12, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: '#f0ede8', lineHeight: 1.3 }}>{film.title}</p>
                          <p style={{ fontSize: 11, color: '#5a5a5a', lineHeight: 1.5 }}>
                            {film.description.slice(0, 55)}…
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function ArrowBtn({ dir, onClick, visible }: { dir: 'left' | 'right'; onClick: () => void; visible: boolean }) {
  return (
    <div
      className="arrow-btn absolute top-0 z-10 flex items-center"
      style={{
        [dir]: 0,
        bottom: 32,
        width: dir === 'right' ? '120px' : '80px',
        background: dir === 'left'
          ? 'linear-gradient(to right, rgba(10,10,10,0.95) 30%, transparent)'
          : 'linear-gradient(to left, rgba(10,10,10,0.85) 20%, transparent)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s',
        pointerEvents: visible ? 'auto' : 'none',
        justifyContent: dir === 'left' ? 'flex-start' : 'flex-end',
        paddingLeft: dir === 'left' ? '12px' : '0',
        paddingRight: dir === 'right' ? '12px' : '0',
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: 'rgba(240,237,232,0.15)',
          border: '1px solid rgba(240,237,232,0.25)',
          color: '#f0ede8',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}
      >
        {dir === 'left' ? '‹' : '›'}
      </button>
    </div>
  )
}

function FilmRow({ films, label, count, onMore, era, desc }: {
  films: Film[]
  label: string
  count: number
  onMore: () => void
  era?: string
  desc?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [hovered, setHovered] = useState<{ film: Film; rect: DOMRect } | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => { updateArrows() }, [films, updateArrows])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? el.clientWidth * 0.75 : -el.clientWidth * 0.75, behavior: 'smooth' })
    setTimeout(updateArrows, 350)
  }

  const handleCardHover = (film: Film, isHovered: boolean, rect: DOMRect) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    if (isHovered) {
      setHovered({ film, rect })
    } else {
      leaveTimer.current = setTimeout(() => setHovered(null), 80)
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{ marginBottom: 56, position: 'relative' }}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Row header */}
      <div style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', marginBottom: 20 }}>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline" style={{ gap: 12 }}>
            <h2 className="text-2xl font-bold" style={{ color: '#f0ede8', letterSpacing: '-0.01em' }}>{label}</h2>
          </div>
          <button
            onClick={onMore}
            className="text-xs transition-colors"
            style={{ color: '#8a8580', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0ede8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8a8580')}
          >
            더보기
          </button>
        </div>
        {(era || desc) && (
          <p className="text-sm" style={{ color: '#8a8580', marginTop: 6, display: 'flex', gap: 10, alignItems: 'center' }}>
            {era && <span style={{ color: '#8a8580', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', flexShrink: 0 }}>{era}</span>}
            {era && desc && <span style={{ color: '#4a4a4a' }}>·</span>}
            {desc && <span>{desc}</span>}
          </p>
        )}
      </div>

      {/* Scroll row */}
      <div className="relative" style={{ zIndex: 1 }}>
        <ArrowBtn dir="left" onClick={() => scroll('left')} visible={canLeft} />
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex overflow-x-auto scroll-hide"
          style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', gap: 12, paddingBottom: 8 }}
        >
          {films.map(film => (
            <div key={film.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
              <FilmCard
                film={film}
                large
                className="film-card"
                onHoverChange={(isHovered, rect) => handleCardHover(film, isHovered, rect)}
              />
            </div>
          ))}
        </div>
        <ArrowBtn dir="right" onClick={() => scroll('right')} visible={canRight} />
      </div>

      {/* Expanded hover card */}
      {hovered && sectionRef.current && (
        <ExpandedCard
          film={hovered.film}
          cardRect={hovered.rect}
          sectionEl={sectionRef.current}
          onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current) }}
          onMouseLeave={() => { leaveTimer.current = setTimeout(() => setHovered(null), 80) }}
        />
      )}
    </section>
  )
}

function FilmGrid({ films }: { films: Film[] }) {
  return (
    <div style={{ paddingBottom: 32, paddingLeft: 56, paddingRight: 56 }}>
      <div className="grid" style={{ gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))' }}>
        {films.map(film => <FilmCard key={film.id} film={film} />)}
      </div>
    </div>
  )
}

function EraDropdown({ era, setEra }: { era: string | null; setEra: (v: string | null) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center text-sm"
        style={{
          background: era ? '#2a1a00' : '#181818',
          color: era ? '#e8630a' : '#8a8580',
          border: `1px solid ${era ? '#e8630a' : '#2a2a2a'}`,
          cursor: 'pointer',
          gap: 6,
          paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6,
          borderRadius: 4,
        }}
      >
        <span>{era ?? '연도별'}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full overflow-hidden"
          style={{ background: '#181818', border: '1px solid #2a2a2a', minWidth: '120px', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', borderRadius: 8, marginTop: 6, zIndex: 50 }}>
          {era && (
            <button onClick={() => { setEra(null); setOpen(false) }}
              className="w-full text-left text-sm"
              style={{ color: '#8a8580', borderBottom: '1px solid #2a2a2a', cursor: 'pointer', background: 'none', paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
              전체 기간
            </button>
          )}
          {ERA_LABELS.map(e => (
            <button key={e.label} onClick={() => { setEra(e.label); setOpen(false) }}
              className="w-full text-left text-sm"
              style={{ color: era === e.label ? '#e8630a' : '#c0bdb8', background: era === e.label ? '#1a0f00' : 'none', cursor: 'pointer', paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
              {e.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Page() {
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<'home' | 'timeline'>('home')

  const filteredArt = artFilms
  const filteredByTag = (tag: FieldTag) => ALL_FILMS.filter(f => f.fields?.includes(tag)).sort((a, b) => a.year - b.year)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <header className="sticky top-0 z-50 flex items-center justify-between h-14"
        style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', backdropFilter: 'blur(8px)' }}>
        <div className="flex items-center flex-none" style={{ gap: 20 }}>
          <span className="text-sm font-medium tracking-widest" style={{ color: '#e8630a' }}>Fig.1</span>
          <span className="text-sm font-medium header-subtitle" style={{ color: "#f0ede8" }}>Movie History</span>
        </div>
        <div className="flex items-center flex-none" style={{ gap: 12 }}>
          {/* View toggle */}
          <div className="flex items-center" style={{ background: '#181818', border: '1px solid #2a2a2a', borderRadius: 6, padding: 3, gap: 2 }}>
            <button
              onClick={() => setView('home')}
              title="홈"
              style={{
                width: 30, height: 26, borderRadius: 4, border: 'none', cursor: 'pointer',
                background: view === 'home' ? '#2a2a2a' : 'transparent',
                color: view === 'home' ? '#f0ede8' : '#4a4a4a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => setView('timeline')}
              title="타임라인"
              style={{
                width: 30, height: 26, borderRadius: 4, border: 'none', cursor: 'pointer',
                background: view === 'timeline' ? '#2a2a2a' : 'transparent',
                color: view === 'timeline' ? '#f0ede8' : '#4a4a4a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="4" y1="2" x2="13" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="1.5" cy="2" r="1.5" fill="currentColor" />
                <line x1="4" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="1.5" cy="7" r="1.5" fill="currentColor" />
                <line x1="4" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="1.5" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {view === 'home' && filter === 'all' && <HeroCarousel />}

      <div style={{ marginTop: 64 }} />

      {view === 'timeline' ? (
        <TimelineView films={ALL_FILMS.filter((f, i, arr) => arr.findIndex(x => x.title === f.title && x.year === f.year) === i)} />
      ) : filter === 'all' ? (
        <>
          {INDUSTRY_TAGS.map(tag => {
            const films = filteredByTag(tag)
            return films.length > 0 ? (
              <FilmRow
                key={tag}
                films={films}
                label={FIELDS[tag].label}
                count={films.length}
                era={FIELDS[tag].era}
                desc={FIELDS[tag].desc}
                onMore={() => { location.href = `/fields/${encodeURIComponent(tag)}` }}
              />
            ) : null
          })}
          <div style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', marginBottom: 20 }}>
            <p className="text-2xl font-bold" style={{ color: '#f0ede8', marginBottom: 20, letterSpacing: '-0.01em' }}>역대 영화제 수상작</p>
            <div className="grid" style={{ gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
              {AWARD_TAGS.map(tag => <FieldTile key={tag} tag={tag} />)}
            </div>
          </div>
          <div style={{ height: 64 }} />
          <div style={{ height: 32 }} />
          {ART_MOVEMENT_TAGS.map(tag => {
            const films = filteredByTag(tag)
            return films.length > 0 ? (
              <FilmRow
                key={tag}
                films={films}
                label={FIELDS[tag].label}
                count={films.length}
                era={FIELDS[tag].era}
                desc={FIELDS[tag].desc}
                onMore={() => { location.href = `/fields/${encodeURIComponent(tag)}` }}
              />
            ) : null
          })}
          <FieldTiles />
        </>
      ) : (
        <FilmGrid films={filteredArt} />
      )}

      <div style={{ paddingBottom: 80 }} />
    </div>
  )
}
