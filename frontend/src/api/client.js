import { counterEvents, normalize, venues } from '../data/catalog'

export const GATEWAY = 'https://api-gateway-k909.onrender.com'

async function readJson(res) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

export async function loadEvents() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(`${GATEWAY}/events`, { signal: controller.signal })
    if (!res.ok) return null
    const data = await readJson(res)
    if (!Array.isArray(data) || data.length === 0) return null

    let list = data.map((event) => normalize(event, venues))
    if (list.some((event) => event.ticket_types.length === 0)) {
      const detailed = await Promise.all(
        list.map(async (event) => {
          if (event.ticket_types.length) return event
          const full = await fetchEvent(event.id)
          return full ? normalize({ ...event, ...full }, venues) : event
        }),
      )
      list = detailed
    }
    return list
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export async function fetchEvent(id) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(`${GATEWAY}/events/${id}`, { signal: controller.signal })
    if (!res.ok) return null
    const data = await readJson(res)
    if (!data || typeof data !== 'object') return null
    return data
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export function fallbackEvents() {
  return counterEvents
}

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error('offline')
      error.status = 0
      reject(error)
    }, ms)
  })
}

export async function signup(body) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  let res
  try {
    res = await Promise.race([
      fetch(`${GATEWAY}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      }),
      timeout(8000),
    ])
  } catch {
    const error = new Error('offline')
    error.status = 0
    throw error
  } finally {
    clearTimeout(timer)
  }

  const data = await readJson(res)

  if (res.status === 409) {
    const detail = typeof data?.detail === 'string' ? data.detail : 'Email already in'
    const error = new Error(detail)
    error.status = 409
    throw error
  }

  if (res.status === 422) {
    const error = new Error('Check the name, email, and password.')
    error.status = 422
    throw error
  }

  if (!res.ok || !data) {
    const error = new Error('offline')
    error.status = res.status
    throw error
  }

  return data
}
