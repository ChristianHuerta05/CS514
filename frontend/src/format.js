const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function dateParts(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) {
    return { dow: '', day: '', mon: '', year: '', time: '', showYear: false }
  }
  let h = d.getHours()
  const minutes = d.getMinutes()
  const ap = h >= 12 ? 'p' : 'a'
  h = h % 12 || 12
  const min = minutes === 0 ? '' : `:${String(minutes).padStart(2, '0')}`
  return {
    dow: DOW[d.getDay()],
    day: d.getDate(),
    mon: MON[d.getMonth()],
    year: d.getFullYear(),
    time: `${h}${min}${ap}`,
    showYear: d.getFullYear() !== new Date().getFullYear(),
  }
}

export function dateLine(iso) {
  const p = dateParts(iso)
  const year = p.showYear ? ` ${p.year}` : ''
  return `${p.dow} ${p.day} ${p.mon}${year}`
}

export function money(n, cents = false) {
  const value = Number(n)
  if (!Number.isFinite(value)) return ''
  const digits = cents || value % 1 ? 2 : 0
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: 2,
  })
}

export function withinWindow(event, { city, from, to }) {
  if (city && event.venue?.city !== city) return false
  const day = String(event.starts_at || '').slice(0, 10)
  if (from && day < from) return false
  if (to && day > to) return false
  return true
}
