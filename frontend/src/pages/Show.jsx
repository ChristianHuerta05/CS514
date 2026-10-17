import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Photo from '../components/Photo'
import { useCatalog } from '../catalog-state'
import { dateLine, dateParts, money } from '../format'
import { useSession } from '../session'

const MAX_PER = 6

export default function Show() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getEvent } = useCatalog()
  const { hold, setHold, left } = useSession()
  const event = getEvent(id)
  const [qty, setQty] = useState({})

  useEffect(() => {
    if (!event) return
    const initial = {}
    for (const tier of event.ticket_types) {
      const held =
        hold?.event_id === event.id
          ? hold.items.find((item) => item.ticket_type_id === tier.id)?.quantity || 0
          : 0
      initial[tier.id] = Math.min(held, Math.min(MAX_PER, left(tier)))
    }
    setQty(initial)
  }, [event?.id])

  if (!event) {
    return (
      <p className="empty">
        That show is not on the board. <Link to="/">Back to the listings.</Link>
      </p>
    )
  }

  const when = dateParts(event.starts_at)
  const count = event.ticket_types.reduce((sum, tier) => sum + (qty[tier.id] || 0), 0)
  const total = event.ticket_types.reduce(
    (sum, tier) => sum + (qty[tier.id] || 0) * Number(tier.price),
    0,
  )

  function bump(tierId, delta, cap) {
    setQty((current) => {
      const next = Math.min(cap, Math.max(0, (current[tierId] || 0) + delta))
      return { ...current, [tierId]: next }
    })
  }

  function takeToWindow() {
    const items = event.ticket_types
      .map((tier) => ({ ticket_type_id: tier.id, quantity: qty[tier.id] || 0 }))
      .filter((item) => item.quantity > 0)
    if (!items.length) return
    setHold({ event_id: event.id, items })
    navigate('/window')
  }

  return (
    <article className="show">
      <div className="show-copy">
        <p className="kicker">
          {dateLine(event.starts_at)} · Starts {when.time}
        </p>
        <h2>{event.title}</h2>
        <p className="venue-line">
          {event.venue?.city ? `${event.venue.name}, ${event.venue.city}` : event.venue?.name}
        </p>
        {event.venue?.capacity ? (
          <p className="cap">{Number(event.venue.capacity).toLocaleString('en-US')} in the room</p>
        ) : null}
        <Photo src={event.image} alt="" city={event.venue?.city} id={event.id} />
        {event.note ? <p className="note">{event.note}</p> : null}
      </div>

      <div className="price-board">
        <h3 className="kicker">Price board</h3>
        {event.ticket_types.length === 0 ? (
          <p className="empty">No tiers posted for this show.</p>
        ) : (
          <ul className="tiers">
            {event.ticket_types.map((tier) => {
              const remaining = left(tier)
              const cap = Math.min(MAX_PER, remaining)
              const countForTier = qty[tier.id] || 0
              return (
                <li key={tier.id} className={remaining === 0 ? 'tier gone' : 'tier'}>
                  <div>
                    <p className="tier-name">{tier.name}</p>
                    <p className="tier-left">{remaining === 0 ? 'Sold out' : `${remaining.toLocaleString('en-US')} left`}</p>
                  </div>
                  <p className="tier-price">{money(tier.price)}</p>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => bump(tier.id, -1, cap)}
                      disabled={countForTier === 0}
                      aria-label={`Fewer ${tier.name}`}
                    >
                      −
                    </button>
                    <span>{countForTier}</span>
                    <button
                      type="button"
                      onClick={() => bump(tier.id, 1, cap)}
                      disabled={countForTier >= cap}
                      aria-label={`More ${tier.name}`}
                    >
                      +
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="holdbar">
        <p>{count === 0 ? 'Nothing held' : `${count} held · ${money(total, true)}`}</p>
        <button type="button" onClick={takeToWindow} disabled={count === 0}>
          To the window
        </button>
      </div>
    </article>
  )
}
