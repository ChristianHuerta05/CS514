import { Link } from 'react-router-dom'
import { dateLine, dateParts, money } from '../format'
import CodeMark from './CodeMark'

export default function Stub({ event, tier, ticket, price }) {
  const when = dateParts(event.starts_at)
  const amount = price ?? tier?.price
  const body = (
    <>
      <div className="stub-main">
        <p className="admit">Admit one</p>
        <h3>{event.title}</h3>
        <p className="stub-when">
          {dateLine(event.starts_at)} · {when.time}
        </p>
        <p className="stub-where">
          {event.venue?.city ? `${event.venue.name}, ${event.venue.city}` : event.venue?.name}
        </p>
        {ticket ? <p className="stub-order">Order {ticket.order_id}</p> : null}
      </div>
      <div className="stub-side">
        <p className="stub-price">{money(amount)}</p>
        <p className="stub-class">{tier?.name || 'GA'}</p>
        {ticket ? <CodeMark value={ticket.qr_code} /> : null}
        {ticket ? <p className="serial">{ticket.qr_code}</p> : null}
        {ticket ? <p className="stub-status">{ticket.status}</p> : null}
      </div>
    </>
  )

  if (ticket) {
    return <article className="stub issued">{body}</article>
  }

  return (
    <Link to={`/shows/${event.id}`} className="stub">
      {body}
    </Link>
  )
}
