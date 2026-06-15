'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import FilmCard from '@/components/FilmCard'
import { techFilms, industryFilms, artFilms, oscFilms, cannesFilms, veniceFilms, berlinFilms, Film, getEraStyle, getPosterPlaceholder, FIELDS, FieldTag, POSTERS } from '@/data/films'

type Filter = 'all' | 'art'

const ALL_FILMS = [...techFilms, ...industryFilms, ...artFilms, ...oscFilms, ...cannesFilms, ...veniceFilms, ...berlinFilms]

const HERO_SLIDES = [
  {
    id: 'intro',
    title: '영화의 역사',
    subtitle: 'Movie History',
    description: '산업·기술·예술 세 관점으로 본 영화 100년. 스튜디오 시스템부터 스트리밍까지, 영화사의 결정적 순간들을 모았습니다.',
    bg: 'linear-gradient(135deg, #0d0f1a 0%, #0a0a0a 65%)',
    accent: '#4a6fa5',
    cta: null as string | null,
  },
  {
    id: 'fig1',
    title: 'Fig.1',
    subtitle: '역사로 읽는 미디어',
    description: '역사 속 맥락으로 현재를 이해하는 1인 크리에이터 미디어. 유튜브·인스타그램·출판물로 이야기를 만듭니다.',
    bg: 'linear-gradient(135deg, #140f0a 0%, #0a0a0a 65%)',
    accent: '#e8630a',
    cta: 'https://www.youtube.com/@fig1_history' as string | null,
  },
]

function HeroCarousel() {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = (next: number) => {
    setIdx((next + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => go(idx + 1), 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [idx])

  const slide = HERO_SLIDES[idx]

  return (
    <div className="relative overflow-hidden hero-carousel" style={{ height: '520px' }}>
      {/* Background */}
      <div key={slide.id} className="absolute inset-0" style={{ background: slide.bg }} />

      {/* Decorative accent shape */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 600 520" className="w-full h-full" preserveAspectRatio="xMaxYMid slice" style={{ opacity: 0.06 }}>
          <circle cx="480" cy="180" r="300" fill={slide.accent} />
          <circle cx="280" cy="420" r="160" fill={slide.accent} />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full" style={{ paddingLeft: 'var(--page-px)', paddingBottom: 64, maxWidth: 600 }}>
        <span className="text-xs font-medium tracking-widest" style={{ color: slide.accent, marginBottom: 16 }}>
          {slide.subtitle}
        </span>

        <h2 className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: '#f0ede8', letterSpacing: '-0.02em', marginBottom: 20 }}>
          {slide.title}
        </h2>

        <p className="text-sm leading-relaxed" style={{ color: '#8a8580', marginBottom: 32, maxWidth: 480 }}>
          {slide.description}
        </p>

        {slide.cta && (
          <a href={slide.cta} target="_blank" rel="noopener noreferrer"
            aria-label="Fig.1 유튜브 채널 새 탭에서 보기"
            className="inline-flex items-center self-start transition-opacity hover:opacity-80"
            style={{ background: '#f0ede8', color: '#0a0a0a', gap: 8, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            Fig.1 보러가기 →
          </a>
        )}
      </div>

      {/* Left arrow */}
      <button type="button" onClick={() => go(idx - 1)} aria-label="이전 히어로 슬라이드 보기"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(240,237,232,0.1)', border: '1px solid rgba(240,237,232,0.2)', color: '#f0ede8', fontSize: 22, cursor: 'pointer' }}>
        ‹
      </button>

      {/* Right arrow */}
      <button type="button" onClick={() => go(idx + 1)} aria-label="다음 히어로 슬라이드 보기"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(240,237,232,0.1)', border: '1px solid rgba(240,237,232,0.2)', color: '#f0ede8', fontSize: 22, cursor: 'pointer' }}>
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute z-20 flex items-center" style={{ bottom: 32, left: '50%', transform: 'translateX(-50%)', gap: 6 }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`${i + 1}번째 히어로 슬라이드 보기`}
            aria-current={i === idx ? 'true' : undefined}
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
      aria-label={`${meta.label} 분야 보기`}
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
              <div className="grid" style={{ gap: 12, gridTemplateColumns: 'var(--field-grid-cols)' }}>
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
      aria-label={`${film.title} (${film.year}) 상세 보기`}
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
            placeholder="blur"
            blurDataURL={getPosterPlaceholder(film.year)}
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
                    <Link href={`/films/${film.id}`} aria-label={`${film.title} (${film.year}) 상세 보기`}>
                      <div className="flex rounded-xl overflow-hidden transition-all hover:scale-[1.01]"
                        style={{ background: '#111', border: '1px solid #1e1e1e', height: 96 }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = '#2a2a2a')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e1e')}
                      >
                        {/* Poster thumbnail */}
                        <div className="flex-none relative" style={{ width: 64, height: 96 }}>
                          {poster ? (
                            <Image
                              src={poster}
                              alt={film.title}
                              fill
                              sizes="64px"
                              preload={di === 0 && fi < 4}
                              loading={di === 0 && fi < 4 ? 'eager' : 'lazy'}
                              fetchPriority={di === 0 && fi < 4 ? 'high' : undefined}
                              placeholder="blur"
                              blurDataURL={getPosterPlaceholder(film.year)}
                              style={{ objectFit: 'cover' }}
                            />
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
        type="button"
        onClick={onClick}
        aria-label={dir === 'left' ? '왼쪽으로 스크롤' : '오른쪽으로 스크롤'}
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

function FilmRow({ films, label, count, onMore, era, desc, priorityCount = 0 }: {
  films: Film[]
  label: string
  count: number
  onMore: () => void
  era?: string
  desc?: string
  priorityCount?: number
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
            type="button"
            onClick={onMore}
            aria-label={`${label} 전체 보기`}
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
          {films.map((film, index) => (
            <div key={film.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
              <FilmCard
                film={film}
                large
                priority={index < priorityCount}
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
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="연도 필터 선택"
        aria-haspopup="menu"
        aria-expanded={open}
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
            <button type="button" onClick={() => { setEra(null); setOpen(false) }}
              className="w-full text-left text-sm"
              style={{ color: '#8a8580', borderBottom: '1px solid #2a2a2a', cursor: 'pointer', background: 'none', paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10 }}>
              전체 기간
            </button>
          )}
          {ERA_LABELS.map(e => (
            <button key={e.label} type="button" onClick={() => { setEra(e.label); setOpen(false) }}
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
              type="button"
              onClick={() => setView('home')}
              aria-label="홈 보기"
              aria-pressed={view === 'home'}
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
              type="button"
              onClick={() => setView('timeline')}
              aria-label="타임라인 보기"
              aria-pressed={view === 'timeline'}
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
          {INDUSTRY_TAGS.map((tag, index) => {
            const films = filteredByTag(tag)
            return films.length > 0 ? (
              <FilmRow
                key={tag}
                films={films}
                label={FIELDS[tag].label}
                count={films.length}
                era={FIELDS[tag].era}
                desc={FIELDS[tag].desc}
                priorityCount={index === 0 ? 4 : 0}
                onMore={() => { location.href = `/fields/${encodeURIComponent(tag)}` }}
              />
            ) : null
          })}
          <div style={{ marginBottom: 20 }}>
            <p className="text-2xl font-bold" style={{ color: '#f0ede8', marginBottom: 20, letterSpacing: '-0.01em', paddingLeft: 'var(--page-px)' }}>역대 영화제 수상작</p>
            <div className="flex scroll-hide" style={{ overflowX: 'auto', gap: 12, paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
              {AWARD_TAGS.map(tag => (
                <div key={tag} style={{ flexShrink: 0, width: 'var(--award-tile-w)' }}>
                  <FieldTile tag={tag} />
                </div>
              ))}
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
