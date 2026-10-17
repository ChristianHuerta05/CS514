import { useMemo } from 'react'

export default function CodeMark({ value }) {
  const cells = useMemo(() => {
    let h = 2166136261
    const text = String(value || '')
    for (let i = 0; i < text.length; i += 1) {
      h ^= text.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    const size = 11
    const grid = []
    for (let i = 0; i < size * size; i += 1) {
      h = Math.imul(h ^ (h >>> 13), 1274126177)
      grid.push((h >>> 0) % 3 !== 0)
    }
    const set = (x, y, on) => {
      grid[y * size + x] = on
    }
    const finder = (ox, oy) => {
      for (let y = 0; y < 4; y += 1) {
        for (let x = 0; x < 4; x += 1) {
          const edge = x === 0 || y === 0 || x === 3 || y === 3
          const core = x === 1 || x === 2
          set(ox + x, oy + y, edge || (core && (y === 1 || y === 2)))
        }
      }
    }
    finder(0, 0)
    finder(7, 0)
    finder(0, 7)
    return grid
  }, [value])

  return (
    <div className="mark" aria-hidden="true">
      {cells.map((on, index) => (
        <i key={index} className={on ? 'on' : ''} />
      ))}
    </div>
  )
}
