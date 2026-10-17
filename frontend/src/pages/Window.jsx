import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../catalog-state'
import { dateLine, money } from '../format'
import { useSession } from '../session'
import Stub from '../components/Stub'

export default function Window() {
  const { getEvent } = useCatalog()
  const { hold, user, pay, clearHold } = useSession()
  const [name, setName] = useState(user?.name || '')
  const [receipt, setReceipt] = useState(null)

  if (receipt) {
    const event = getEvent(receipt.order.event_id)
    return (
      <section className="window">
        <p className="kicker">Paid · Order {receipt.order.id}</p>
        <h2>Stubs are on the counter.</h2>
        <p className="slip-total">{money(receipt.order.total, true)}</p>
        {event ? (
          <div className="issued-stack">
            {receipt.tickets.map((ticket) => {
              const tier = event.ticket_types.find((row) => row.id === ticket.ticket_type_id)
              return <Stub key={ticket.id} event={event} tier={tier} ticket={ticket} />
            })}
          </div>
        ) : null}
        <p>
          <Link to="/stubs">All stubs</Link>
        </p>
      </section>
    )
  }

  const event = hold ? getEvent(hold.event_id) : null

  if (!hold || !event) {
    return (
      <section className="window">
        <h2>Nothing held.</h2>
        <p className="note">
          Pick a show off the board. <Link to="/">Listings.</Link>
        </p>
      </section>
    )
  }

  const lines = hold.items
    .map((item) => {
      const tier = event.ticket_types.find((row) => row.id === item.ticket_type_id)
      if (!tier) return null
      return {
        ...item,
        name: tier.name,
        unit_price: Number(tier.price),
        line: item.quantity * Number(tier.price),
      }
    })
    .filter(Boolean)

  const total = lines.reduce((sum, line) => sum + line.line, 0)

  function onPay(formEvent) {
    formEvent.preventDefault()
    const paid = pay({
      name: name.trim(),
      event,
      items: lines.map((line) => ({ ticket_type_id: line.ticket_type_id, quantity: line.quantity })),
    })
    if (paid) setReceipt(paid)
  }

  return (
    <section className="window">
      <form className="slip" onSubmit={onPay}>
        <header className="slip-head">
          <div>
            <p className="admit">Fairseat</p>
            <h2>Order slip</h2>
          </div>
          <p className="kicker">{dateLine(event.starts_at)}</p>
        </header>
        <p className="slip-show">{event.title}</p>
        <p className="slip-where">
          {event.venue?.city ? `${event.venue.name} · ${event.venue.city}` : event.venue?.name}
        </p>
        <ul className="slip-lines">
          {lines.map((line) => (
            <li key={line.ticket_type_id}>
              <span>
                {line.name} · {line.quantity}
              </span>
              <span>{money(line.line, true)}</span>
            </li>
          ))}
        </ul>
        <p className="slip-total">
          <span>Total</span>
          <span>{money(total, true)}</span>
        </p>
        <label className="slip-name">
          Name
          <input
            value={name}
            onChange={(input) => setName(input.target.value)}
            required
            autoComplete="name"
          />
        </label>
        <div className="slip-actions">
          <button type="submit" className="ink-btn">
            Pay
          </button>
          <button type="button" className="text-btn" onClick={clearHold}>
            Drop the hold
          </button>
        </div>
      </form>
    </section>
  )
}
