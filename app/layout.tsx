import type { Metadata } from 'next'
import './globals.css'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/data/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Fig.1 Movie History',
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_TITLE,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
