'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Film, getEraStyle, POSTERS } from '@/data/films'

export default function FilmCard({ film, large = false, onHoverChange }: {
  film: Film
  large?: boolean
  onHoverChange?: (hovered: boolean, rect: DOMRect) => void
}) {
  const [hovered, setHovered] = useState(false)
  const era = getEraStyle(film.year)
  const w = large ? 200 : 148
  const h = large ? 300 : 222
  const poster = POSTERS[film.id]

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setHovered(true)
    onHoverChange?.(true, e.currentTarget.getBoundingClientRect())
  }
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setHovered(false)
    onHoverChange?.(false, e.currentTarget.getBoundingClientRect())
  }

  return (
    <Link href={`/films/${film.id}`}
      className="flex-none rounded-lg overflow-hidden cursor-pointer block"
      style={{ width: w, border: '1px solid #2a2a2a' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="relative" style={{ height: h, background: era.bg }}>
        {poster ? (
          <Image
            src={poster}
            alt={film.title}
            fill
            sizes={`${w}px`}
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
        {/* hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end"
          style={{
            background: 'rgba(0,0,0,0.88)',
            padding: 12,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}>
          <p className="text-[10px]" style={{ color: '#8a8580', marginBottom: 4 }}>{film.year}</p>
          <p className="text-[13px] font-medium leading-snug" style={{ color: '#f0ede8', marginBottom: 6 }}>{film.title}</p>
          <p className="text-[11px] leading-relaxed" style={{ color: '#8a8580' }}>{film.description}</p>
        </div>
      </div>
    </Link>
  )
}
