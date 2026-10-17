import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { fallbackEvents, loadEvents } from './api/client'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [events, setEvents] = useState(fallbackEvents)

  useEffect(() => {
    let cancel = false
    loadEvents().then((list) => {
      if (!cancel && list?.length) setEvents(list)
    })
    return () => {
      cancel = true
    }
  }, [])

  const value = useMemo(() => {
    const sorted = [...events].sort(
      (a, b) => new Date(a.starts_at) - new Date(b.starts_at),
    )
    return {
      events: sorted,
      getEvent: (id) => sorted.find((event) => String(event.id) === String(id)) || null,
    }
  }, [events])

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog requires CatalogProvider')
  return ctx
}
