import { useEffect, useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useCatalog } from '../catalog-state'
import { dateLine, dateParts, money } from '../format'
import { lowestPrice } from '../data/catalog'
import { useSession } from '../session'

const ABOUT_URL = '#'
const BLOG_URL = '#'

function marqueeText(events) {
  const bits = []
  const nextOnsale = [...events]
    .filter((event) => event.onsale_at && new Date(event.onsale_at) > new Date())
    .sort((a, b) => new Date(a.onsale_at) - new Date(b.onsale_at))[0]

  if (nextOnsale) {
    const when = dateParts(nextOnsale.onsale_at)
    bits.push(`Onsale ${nextOnsale.title} · ${dateLine(nextOnsale.onsale_at)} ${when.time}`)
  }

  for (const event of events.slice(0, 8)) {
    const price = lowestPrice(event)
    const priceBit = price == null ? '' : ` · ${money(price)}`
    bits.push(`${event.venue?.city || 'Counter'} · ${dateLine(event.starts_at)} · ${event.title}${priceBit}`)
  }

  return bits.join('   ·   ')
}

export default function Layout() {
  const { events } = useCatalog()
  const { tickets, hold } = useSession()
  const { pathname } = useLocation()
  const line = useMemo(() => marqueeText(events), [events])
  const today = dateLine(new Date().toISOString())
  const held = hold?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="marquee">
        <div className="marquee-track">
          <span>{line}</span>
          <span aria-hidden="true">{line}</span>
        </div>
      </div>
      <div className="sheet">
        <header className="nameplate">
          <div>
            <p className="tag">Tickets at the window.</p>
            <NavLink to="/" className="wordmark">
              Fairseat
            </NavLink>
          </div>
          <p className="issue">{today}</p>
        </header>
        <nav className="nav">
          <NavLink to="/" end>
            Shows
          </NavLink>
          <NavLink to="/window">
            Window{held ? ` ${held}` : ''}
          </NavLink>
          <NavLink to="/stubs">
            Stubs{tickets.length ? ` ${tickets.length}` : ''}
          </NavLink>
          <NavLink to="/account">Account</NavLink>
          <a href={ABOUT_URL} target="_blank" rel="noreferrer">
            About Us
          </a>
          <a href={BLOG_URL} target="_blank" rel="noreferrer">
            Blog
          </a>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer className="colophon">Face value. Nothing added on this slip.</footer>
      </div>
    </>
  )
}
