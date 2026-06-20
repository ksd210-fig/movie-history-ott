import Link from 'next/link'
import { Film, getCanonicalFilmPath, POSTERS } from '@/data/films'

export default function TimelineView({ films }: { films: Film[] }) {
  const sorted = [...films].sort((a, b) => a.year - b.year)

  const decades = new Map<number, Film[]>()
  for (const film of sorted) {
    const decade = Math.floor(film.year / 10) * 10
    if (!decades.has(decade)) decades.set(decade, [])
    decades.get(decade)!.push(film)
  }

  return (
    <div style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)', paddingBottom: 80 }}>
      {Array.from(decades.entries()).map(([decade, decadeFilms], decadeIndex) => (
        <div key={decade} style={{ marginTop: decadeIndex === 0 ? 0 : 56 }}>
          <div className="flex items-center" style={{ marginBottom: 28 }}>
            <span className="text-xs font-semibold tracking-widest"
              style={{ color: '#e8630a', width: 56, flexShrink: 0 }}>
              {decade}s
            </span>
            <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
          </div>

          <div className="flex flex-col" style={{ gap: 0 }}>
            {decadeFilms.map((film, filmIndex) => {
              const poster = POSTERS[film.id]
              const isLast = filmIndex === decadeFilms.length - 1
              const isPriority = decadeIndex === 0 && filmIndex < 4
              const href = getCanonicalFilmPath(film)

              return (
                <div key={film.id} className="flex" style={{ gap: 0 }}>
                  <div className="flex flex-col items-center" style={{ width: 56, flexShrink: 0 }}>
                    <span className="text-xs tabular-nums" style={{ color: '#4a4a4a', paddingTop: 14 }}>
                      {film.year}
                    </span>
                    {!isLast && (
                      <div style={{ flex: 1, width: 1, background: '#1e1e1e', marginTop: 8 }} />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingBottom: isLast ? 0 : 16, paddingTop: 4, paddingLeft: 16 }}>
                    <Link href={href} aria-label={`${film.title} (${film.year}) 상세 보기`}>
                      <div className="timeline-card flex rounded-xl overflow-hidden"
                        style={{ background: '#111', border: '1px solid #1e1e1e', height: 96 }}>
                        <div className="flex-none relative" style={{ width: 64, height: 96 }}>
                          {poster ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={poster}
                              alt={film.title}
                              loading={isPriority ? 'eager' : 'lazy'}
                              decoding="async"
                              fetchPriority={isPriority ? 'high' : undefined}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                          ) : (
                            <div className="absolute inset-0" style={{ background: '#1e1e1e' }} />
                          )}
                        </div>

                        <div style={{ padding: 12, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: '#f0ede8', lineHeight: 1.3 }}>{film.title}</p>
                          <p style={{ fontSize: 11, color: '#5a5a5a', lineHeight: 1.5 }}>
                            {film.keyword}
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
