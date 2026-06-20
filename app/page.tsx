import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import FilmCard from '@/components/FilmCard'
import MainHeader from '@/components/MainHeader'
import ScrollArrows from '@/components/ScrollArrows'
import { ALL_FILMS, FIELDS, FieldTag, Film } from '@/data/films'

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
  '칸': '/trophies/palme.svg',
  '베니스': '/trophies/lion.svg',
  '베를린': '/trophies/bear.svg',
}

function filteredByTag(tag: FieldTag) {
  return ALL_FILMS.filter(film => film.fields?.includes(tag)).sort((a, b) => a.year - b.year)
}

function FieldTile({ tag }: { tag: FieldTag }) {
  const meta = FIELDS[tag]
  const trophySrc = AWARD_TROPHY_IMG[tag]

  return (
    <Link
      href={`/fields/${encodeURIComponent(tag)}`}
      className="field-tile relative overflow-hidden rounded-xl block"
      aria-label={`${meta.label} 분야 보기`}
      style={{ height: 130, background: meta.bg, border: `1px solid ${meta.accent}22`, transition: 'transform 0.18s' }}
    >
      {trophySrc ? (
        <>
          <div className="absolute pointer-events-none" style={{
            right: 0, top: 0, bottom: 0, width: '65%',
            background: `radial-gradient(ellipse at 85% 50%, ${meta.accent}28 0%, ${meta.accent}08 50%, transparent 75%)`,
          }} />
          <div className="absolute pointer-events-none" style={{ right: 24, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={trophySrc} alt="" style={{ height: 88, maxWidth: 128, width: 'auto', objectFit: 'contain', opacity: 0.88, filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }} />
          </div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${meta.bg} 38%, ${meta.bg}e8 55%, ${meta.bg}70 72%, transparent 100%)` }} />
        </>
      ) : (
        <svg viewBox="0 0 240 200" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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

function FieldTiles() {
  return (
    <div>
      <div className="flex flex-col" style={{ gap: 40 }}>
        {FIELD_GROUPS.map(group => (
          <div key={group.label} style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
            <h2 className="text-2xl font-bold" style={{ color: '#f0ede8', letterSpacing: '-0.01em', marginBottom: 20 }}>
              {group.label}
            </h2>
            <div className="grid" style={{ gap: 12, gridTemplateColumns: 'var(--field-grid-cols)' }}>
              {group.tags.map(tag => <FieldTile key={tag} tag={tag} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FilmRow({ films, label, era, desc, moreHref, priorityCount = 0 }: {
  films: Film[]
  label: string
  era?: string
  desc?: string
  moreHref: string
  priorityCount?: number
}) {
  const rowId = `film-row-${encodeURIComponent(label)}`

  return (
    <section style={{ marginBottom: 56, position: 'relative' }}>
      <div style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', marginBottom: 20 }}>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold" style={{ color: '#f0ede8', letterSpacing: '-0.01em' }}>{label}</h2>
          <Link
            href={moreHref}
            aria-label={`${label} 전체 보기`}
            className="text-xs transition-colors row-more-link"
            style={{ color: '#8a8580' }}
          >
            더보기
          </Link>
        </div>
        {(era || desc) && (
          <p className="text-sm" style={{ color: '#8a8580', marginTop: 6, display: 'flex', gap: 10, alignItems: 'center' }}>
            {era && <span style={{ color: '#8a8580', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', flexShrink: 0 }}>{era}</span>}
            {era && desc && <span style={{ color: '#4a4a4a' }}>·</span>}
            {desc && <span>{desc}</span>}
          </p>
        )}
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <ScrollArrows targetId={rowId} label={label} />
        <div
          id={rowId}
          className="flex overflow-x-auto scroll-hide"
          style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', gap: 12, paddingBottom: 8 }}
        >
          {films.map((film, index) => (
            <div key={film.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
              <FilmCard film={film} large priority={index < priorityCount} className="film-card" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <MainHeader view="home" />

      <h1 className="sr-only">영화의 역사</h1>

      <HeroCarousel />

      <div style={{ marginTop: 64 }} />

      {INDUSTRY_TAGS.map((tag, index) => {
        const films = filteredByTag(tag)
        return films.length > 0 ? (
          <FilmRow
            key={tag}
            films={films}
            label={FIELDS[tag].label}
            era={FIELDS[tag].era}
            desc={FIELDS[tag].desc}
            moreHref={`/fields/${encodeURIComponent(tag)}`}
            priorityCount={index === 0 ? 4 : 0}
          />
        ) : null
      })}

      <div style={{ marginBottom: 20 }}>
        <h2 className="text-2xl font-bold" style={{ color: '#f0ede8', marginBottom: 20, letterSpacing: '-0.01em', paddingLeft: 'var(--page-px)' }}>
          역대 영화제 수상작
        </h2>
        <div className="grid" style={{ gap: 12, gridTemplateColumns: 'var(--award-grid-cols)', paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}>
          {AWARD_TAGS.map(tag => (
            <div key={tag}>
              <FieldTile tag={tag} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 96 }} />

      {ART_MOVEMENT_TAGS.map(tag => {
        const films = filteredByTag(tag)
        return films.length > 0 ? (
          <FilmRow
            key={tag}
            films={films}
            label={FIELDS[tag].label}
            era={FIELDS[tag].era}
            desc={FIELDS[tag].desc}
            moreHref={`/fields/${encodeURIComponent(tag)}`}
          />
        ) : null
      })}

      <FieldTiles />

      <div style={{ paddingBottom: 80 }} />
    </div>
  )
}
