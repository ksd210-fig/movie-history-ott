import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { techFilms, industryFilms, artFilms, oscFilms, FIELDS, FieldTag, getEraStyle, POSTERS } from '@/data/films'

const ALL_FILMS = [...techFilms, ...industryFilms, ...artFilms, ...oscFilms]

export function generateStaticParams() {
  return (Object.keys(FIELDS) as FieldTag[]).map(tag => ({ tag: encodeURIComponent(tag) }))
}

export default async function FieldPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag) as FieldTag
  const meta = FIELDS[tag]
  if (!meta) notFound()

  const films = ALL_FILMS.filter(f => f.fields?.includes(tag)).sort((a, b) => a.year - b.year)

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center h-14"
        style={{ paddingLeft: 56, paddingRight: 56, background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid #1e1e1e', backdropFilter: 'blur(8px)' }}>
        <Link href="/" className="flex items-center" style={{ gap: 12 }}>
          <span className="text-lg" style={{ color: '#8a8580' }}>←</span>
          <span className="text-sm font-medium tracking-widest" style={{ color: '#e8630a' }}>Fig.1</span>
          <span className="text-sm" style={{ color: '#3a3a3a' }}>/</span>
          <span className="text-sm" style={{ color: '#8a8580' }}>영화의 역사</span>
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

        <div className="relative z-10" style={{ paddingLeft: 56, paddingRight: 56, paddingTop: 64, paddingBottom: 64 }}>
          <span className="text-xs font-medium rounded-full inline-block"
            style={{ background: `${meta.accent}22`, color: meta.accent, border: `1px solid ${meta.accent}44`, paddingLeft: 10, paddingRight: 10, paddingTop: 4, paddingBottom: 4, marginBottom: 16 }}>
            {films.length}편
          </span>
          <h1 className="text-4xl font-medium" style={{ color: '#f0ede8', marginTop: 12, marginBottom: 8 }}>
            {meta.label}
          </h1>
          <p className="text-base" style={{ color: '#8a8580' }}>{meta.desc}</p>
        </div>
      </div>

      {/* Film grid */}
      <div style={{ marginTop: 40, paddingBottom: 80, paddingLeft: 56, paddingRight: 56 }}>
        <div className="grid" style={{ gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {films.map(film => {
            const era = getEraStyle(film.year)
            const poster = POSTERS[film.id]
            return (
              <Link key={film.id} href={`/films/${film.id}`} className="group block rounded-xl overflow-hidden"
                style={{ border: '1px solid #2a2a2a' }}>
                <div className="relative" style={{ height: 224, background: era.bg }}>
                  {poster ? (
                    <Image
                      src={poster}
                      alt={film.title}
                      fill
                      sizes="160px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 12 }}>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-medium rounded"
                          style={{ background: era.tag, color: era.tagText, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}>
                          {film.keyword}
                        </span>
                        <span className="text-[11px] font-medium" style={{ color: era.tagText }}>
                          {film.year}
                        </span>
                      </div>
                      <p className="text-[14px] font-medium leading-snug" style={{ color: era.text }}>
                        {film.title}
                      </p>
                    </div>
                  )}
                  {/* hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-end"
                    style={{ background: 'rgba(0,0,0,0.88)', transition: 'opacity 0.2s', padding: 12 }}>
                    <p className="text-[10px]" style={{ color: '#8a8580', marginBottom: 4 }}>{film.year}</p>
                    <p className="text-[13px] font-medium leading-snug" style={{ color: '#f0ede8', marginBottom: 6 }}>{film.title}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: '#8a8580' }}>{film.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
