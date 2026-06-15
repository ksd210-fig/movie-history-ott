import type { Metadata } from 'next'
import MainHeader from '@/components/MainHeader'
import TimelineView from '@/components/TimelineView'
import { ALL_FILMS } from '@/data/films'
import { SITE_DESCRIPTION, SITE_NAME } from '@/data/site'

const DESCRIPTION = `연대순으로 보는 ${SITE_NAME}. ${SITE_DESCRIPTION}`

const DEDUPED_FILMS = ALL_FILMS.filter((film, index, arr) =>
  arr.findIndex(item => item.title === film.title && item.year === film.year) === index
)

export const metadata: Metadata = {
  title: '타임라인',
  description: DESCRIPTION,
  alternates: {
    canonical: '/timeline',
  },
  openGraph: {
    title: `타임라인 — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: '/timeline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `타임라인 — ${SITE_NAME}`,
    description: DESCRIPTION,
  },
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <MainHeader view="timeline" />
      <h1 className="sr-only">영화의 역사 타임라인</h1>
      <div style={{ marginTop: 64 }} />
      <TimelineView films={DEDUPED_FILMS} />
      <div style={{ paddingBottom: 80 }} />
    </div>
  )
}
