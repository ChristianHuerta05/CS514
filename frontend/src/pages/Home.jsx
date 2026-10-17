import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCatalog } from '../catalog-state'
import { cheapestTier, lowestPrice } from '../data/catalog'
import { dateLine, dateParts, money, withinWindow } from '../format'
import { useSession } from '../session'
import Photo from '../components/Photo'
import Stub from '../components/Stub'

export default function Home() {
  const { events } = useCatalog()
  const { left } = useSession()
  const [params, setParams] = useSearchParams()
  const city = params.get('city') || ''
  const from = params.get('from') || ''
  const to = params.get('to') || ''

  const cities = useMemo(() => {
    return [...new Set(events.map((event) => event.venue?.city).filter(Boolean))].sort()
  }, [events])

  const backwards = Boolean(from && to && from > to)

  const listed = useMemo(() => {
    if (backwards) return []
    return events.filter((event) => withinWindow(event, { city, from, to }))
  }, [events, city, from, to, backwards])

  const feature = listed[0]
  const pass = listed.slice(1, 4)

  function setField(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  const filtering = Boolean(city || from || to)

  return (
    <>
      <form className="filters" onSubmit={(event) => event.preventDefault()}>
        <label>
          City
          <select value={city} onChange={(event) => setField('city', event.target.value)}>
            <option value="">Any</option>
            {cities.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label>
          From
          <input type="date" value={from} onChange={(event) => setField('from', event.target.value)} />
        </label>
        <label>
          To
          <input type="date" value={to} onChange={(event) => setField('to', event.target.value)} />
        </label>
        {filtering ? (
          <button type="button" className="text-btn" onClick={() => setParams(new URLSearchParams())}>
            Clear
          </button>
        ) : null}
      </form>

      {backwards ? <p className="empty">From is after to.</p> : null}

      {!backwards && !feature ? <p className="empty">Nothing on the board for that window.</p> : null}

      {feature ? (
        <section className="broadsheet">
          <article className="feature">
            <p className="kicker">
              {dateLine(feature.starts_at)} · {dateParts(feature.starts_at).time}
            </p>
            <h2>
              <Link to={`/shows/${feature.id}`}>{feature.title}</Link>
            </h2>
            <p className="venue-line">
              {feature.venue?.city ? `${feature.venue.name} · ${feature.venue.city}` : feature.venue?.name}
            </p>
            <Photo src={feature.image} alt={feature.title} city={feature.venue?.city} id={feature.id} />
            {feature.note ? <p className="note">{feature.note}</p> : null}
            <div className="feature-foot">
              <p className="from-price">
                {lowestPrice(feature) == null ? 'Price at the window' : money(lowestPrice(feature))}
              </p>
              <span className="stamp">{soldOut(feature, left) ? 'Sold' : 'At window'}</span>
              <Link className="board-link" to={`/shows/${feature.id}`}>
                Price board
              </Link>
            </div>
          </article>

          <div className="listings">
            <h2 className="kicker">On the board</h2>
            {listed.map((event) => {
              const when = dateParts(event.starts_at)
              const price = lowestPrice(event)
              return (
                <Link key={event.id} to={`/shows/${event.id}`} className="row">
                  <span className="row-date">
                    {when.dow} {when.day} {when.mon}
                  </span>
                  <span className="col-city">{event.venue?.city}</span>
                  <span className="row-title">
                    {event.title}
                    <span className="row-city">{event.venue?.city}</span>
                  </span>
                  <span className="row-price">{price == null ? '' : money(price)}</span>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

      {pass.length ? (
        <section className="pass">
          <h2 className="kicker">Pass these across</h2>
          <div className="stub-row">
            {pass.map((event) => (
              <Stub key={event.id} event={event} tier={cheapestTier(event)} price={lowestPrice(event)} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}

function soldOut(event, left) {
  return event.ticket_types.length > 0 && event.ticket_types.every((tier) => left(tier) === 0)
}
