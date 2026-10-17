import { Link } from 'react-router-dom'
import { useCatalog } from '../catalog-state'
import { useSession } from '../session'
import Stub from '../components/Stub'

export default function Stubs() {
  const { tickets, orders } = useSession()
  const { getEvent } = useCatalog()

  if (!tickets.length) {
    return (
      <section>
        <h2>No stubs yet.</h2>
        <p className="note">
          Paid holds land here. <Link to="/">Shows.</Link>
        </p>
      </section>
    )
  }

  const ordered = [...tickets].reverse()

  return (
    <section className="stubs-page">
      <h2 className="kicker">{tickets.length} on the counter</h2>
      <div className="issued-stack">
        {ordered.map((ticket) => {
          const order = orders.find((row) => row.id === ticket.order_id)
          const event = getEvent(order?.event_id)
          if (!event) return null
          const tier = event.ticket_types.find((row) => row.id === ticket.ticket_type_id)
          return <Stub key={ticket.id} event={event} tier={tier} ticket={ticket} />
        })}
      </div>
    </section>
  )
}
