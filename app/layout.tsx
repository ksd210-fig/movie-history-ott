import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '영화의 역사 — Fig.1',
  description: '기술과 산업 관점에서 본 영화사의 결정적 순간들',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
