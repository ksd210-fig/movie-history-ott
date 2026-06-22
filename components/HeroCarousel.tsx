'use client'

import { useEffect, useRef, useState } from 'react'

const HERO_SLIDES = [
  {
    id: 'intro',
    title: '영화의 역사',
    subtitle: 'Movie History',
    description: '영화의 역사를 정주행하는 OTT. 무성영화부터 스트리밍까지. 산업, 기술, 예술이 만들어낸 영화사의 중요한 작품들을 한곳에 모았습니다',
    bg: 'linear-gradient(135deg, #0d0f1a 0%, #0a0a0a 65%)',
    accent: '#4a6fa5',
    cta: null as string | null,
    ctaLabel: null as string | null,
  },
  {
    id: 'fig1',
    title: 'Fig.1',
    subtitle: '',
    description: '역사를 기반으로 다양한 프로젝트를 만듭니다',
    bg: 'linear-gradient(135deg, #140f0a 0%, #0a0a0a 65%)',
    accent: '#e8630a',
    cta: 'https://www.fig1.kr' as string | null,
    ctaLabel: 'Fig.1의 다른 프로젝트 보러가기 →',
  },
]

export default function HeroCarousel({ oldestPoster }: {
  oldestPoster?: string
}) {
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
  const showPosterBackground = slide.id === 'intro' && oldestPoster

  return (
    <div className="relative overflow-hidden hero-carousel" style={{ height: '520px' }}>
      <div key={slide.id} className="absolute inset-0" style={{ background: slide.bg }} />

      {showPosterBackground ? (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={oldestPoster} alt="" className="w-full h-full" style={{ objectFit: 'cover', opacity: 0.44, filter: 'saturate(0.9)' }} />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.9) 45%, rgba(10,10,10,0.56) 72%, rgba(10,10,10,0.86) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.42) 68%, #0a0a0a 100%)' }} />
        </div>
      ) : (
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 600 520" className="w-full h-full" preserveAspectRatio="xMaxYMid slice" style={{ opacity: 0.06 }}>
            <circle cx="480" cy="180" r="300" fill={slide.accent} />
            <circle cx="280" cy="420" r="160" fill={slide.accent} />
          </svg>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />

      <div className="relative z-10 flex flex-col justify-end h-full" style={{ paddingLeft: 'var(--page-px)', paddingBottom: 64, maxWidth: 600 }}>
        {slide.subtitle && (
          <span className="text-xs font-medium tracking-widest" style={{ color: slide.accent, marginBottom: 16 }}>
            {slide.subtitle}
          </span>
        )}

        <h2 className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: '#f0ede8', letterSpacing: '-0.02em', marginBottom: 20 }}>
          {slide.title}
        </h2>

        <p className="text-sm leading-relaxed" style={{ color: '#8a8580', marginBottom: 32, maxWidth: 480 }}>
          {slide.description}
        </p>

        {slide.cta && (
          <a href={slide.cta} target="_blank" rel="noopener noreferrer"
            aria-label={slide.ctaLabel ?? 'Fig.1 새 탭에서 보기'}
            className="inline-flex items-center self-start transition-opacity hover:opacity-80"
            style={{ background: '#f0ede8', color: '#0a0a0a', gap: 8, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            {slide.ctaLabel ?? 'Fig.1 보러가기 →'}
          </a>
        )}
      </div>

      <button type="button" onClick={() => go(idx - 1)} aria-label="이전 히어로 슬라이드 보기"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(240,237,232,0.1)', border: '1px solid rgba(240,237,232,0.2)', color: '#f0ede8', fontSize: 22, cursor: 'pointer' }}>
        ‹
      </button>

      <button type="button" onClick={() => go(idx + 1)} aria-label="다음 히어로 슬라이드 보기"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-opacity hover:opacity-100 opacity-50"
        style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(240,237,232,0.1)', border: '1px solid rgba(240,237,232,0.2)', color: '#f0ede8', fontSize: 22, cursor: 'pointer' }}>
        ›
      </button>

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
