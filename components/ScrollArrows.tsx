'use client'

import { useCallback, useEffect, useState } from 'react'

export default function ScrollArrows({ targetId, label }: { targetId: string; label: string }) {
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const getTarget = useCallback(() => document.getElementById(targetId), [targetId])

  const updateArrows = useCallback(() => {
    const el = getTarget()
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [getTarget])

  useEffect(() => {
    const el = getTarget()
    if (!el) return

    const frameId = window.requestAnimationFrame(updateArrows)
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)

    return () => {
      window.cancelAnimationFrame(frameId)
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [getTarget, updateArrows])

  const scroll = (dir: 'left' | 'right') => {
    const el = getTarget()
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? el.clientWidth * 0.75 : -el.clientWidth * 0.75, behavior: 'smooth' })
    window.setTimeout(updateArrows, 350)
  }

  return (
    <>
      <ArrowBtn dir="left" label={`${label} 왼쪽으로 스크롤`} onClick={() => scroll('left')} visible={canLeft} />
      <ArrowBtn dir="right" label={`${label} 오른쪽으로 스크롤`} onClick={() => scroll('right')} visible={canRight} />
    </>
  )
}

function ArrowBtn({ dir, label, onClick, visible }: {
  dir: 'left' | 'right'
  label: string
  onClick: () => void
  visible: boolean
}) {
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
        aria-label={label}
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
