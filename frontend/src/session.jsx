import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const KEY = 'fairseat-counter'
const SessionContext = createContext(null)

const empty = { user: null, hold: null, orders: [], tickets: [] }

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const saved = JSON.parse(raw)
    return {
      user: saved.user ?? null,
      hold: saved.hold ?? null,
      orders: Array.isArray(saved.orders) ? saved.orders : [],
      tickets: Array.isArray(saved.tickets) ? saved.tickets : [],
    }
  } catch {
    return empty
  }
}

function nextId(rows) {
  const max = rows.reduce((n, row) => Math.max(n, Number(row.id) || 0), 0)
  return max + 1
}

export function SessionProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const sold = useMemo(() => {
    const map = {}
    for (const ticket of state.tickets) {
      map[ticket.ticket_type_id] = (map[ticket.ticket_type_id] || 0) + 1
    }
    return map
  }, [state.tickets])

  const api = useMemo(() => {
    return {
      user: state.user,
      hold: state.hold,
      orders: state.orders,
      tickets: state.tickets,
      sold,
      left(tier) {
        return Math.max(0, Number(tier.remaining || 0) - (sold[tier.id] || 0))
      },
      setHold(hold) {
        setState((current) => ({ ...current, hold }))
      },
      clearHold() {
        setState((current) => ({ ...current, hold: null }))
      },
      signIn(user) {
        setState((current) => ({ ...current, user }))
      },
      signOut() {
        setState((current) => ({ ...current, user: null }))
      },
      pay({ name, event, items }) {
        const priced = items
          .map((item) => {
            const tier = event.ticket_types.find((row) => row.id === item.ticket_type_id)
            return tier ? { ...item, unit_price: Number(tier.price) } : null
          })
          .filter((item) => item && item.quantity > 0)

        if (!priced.length) return null

        const total = priced.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
        const order = {
          id: nextId(state.orders),
          user_id: state.user?.id ?? null,
          event_id: event.id,
          status: 'paid',
          total,
          created_at: new Date().toISOString(),
          buyer_name: name,
          items: priced.map((item) => ({
            ticket_type_id: item.ticket_type_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
          })),
        }

        let ticketId = nextId(state.tickets)
        const made = []
        for (const item of priced) {
          for (let i = 0; i < item.quantity; i += 1) {
            made.push({
              id: ticketId,
              order_id: order.id,
              ticket_type_id: item.ticket_type_id,
              owner_id: state.user?.id ?? null,
              status: 'ready',
              qr_code: crypto.randomUUID(),
            })
            ticketId += 1
          }
        }

        setState((current) => ({
          ...current,
          hold: null,
          orders: [...current.orders, order],
          tickets: [...current.tickets, ...made],
        }))

        return { order, tickets: made }
      },
    }
  }, [sold, state])

  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession requires SessionProvider')
  return ctx
}
