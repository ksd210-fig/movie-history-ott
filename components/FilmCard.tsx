import Link from 'next/link'
import Image from 'next/image'
import { Film, getEraStyle, getPosterPlaceholder, POSTERS } from '@/data/films'

export default function FilmCard({ film, large = false, priority = false, className }: {
  film: Film
  large?: boolean
  priority?: boolean
  className?: string
}) {
  const era = getEraStyle(film.year)
  const w = large ? 'var(--film-card-w)' : 148
  const h = large ? 'var(--film-card-h)' : 222
  const poster = POSTERS[film.id]

  return (
    <Link
      href={`/films/${film.id}`}
      className={`film-card-link flex-none rounded-lg overflow-hidden cursor-pointer block${className ? ` ${className}` : ''}`}
      aria-label={`${film.title} (${film.year}) 상세 보기`}
      style={{ width: w, border: '1px solid #2a2a2a' }}
    >
      <div className="relative" style={{ height: h, background: era.bg }}>
        {poster ? (
          <Image
            src={poster}
            alt={film.title}
            fill
            sizes={large ? '(max-width: 768px) 33vw, 200px' : '148px'}
            preload={priority}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            placeholder="blur"
            blurDataURL={getPosterPlaceholder(film.year)}
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
            <p className="text-[13px] font-medium leading-snug" style={{ color: era.text }}>
              {film.title}
            </p>
          </div>
        )}

        <div className="film-card-overlay absolute inset-0 flex flex-col justify-end"
          style={{ background: 'rgba(0,0,0,0.88)', padding: 12, transition: 'opacity 0.2s' }}>
          <p className="text-[10px]" style={{ color: '#8a8580', marginBottom: 4 }}>{film.year}</p>
          <p className="text-[13px] font-medium leading-snug" style={{ color: '#f0ede8', marginBottom: 6 }}>{film.title}</p>
          <p className="text-[11px] leading-relaxed" style={{ color: '#8a8580' }}>{film.description}</p>
        </div>
      </div>
      <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, background: '#0f0f0f' }}>
        <p className="text-[11px]" style={{ color: '#5a5a5a' }}>{film.year}</p>
      </div>
    </Link>
  )
}
