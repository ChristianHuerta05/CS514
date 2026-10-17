export const venues = [
  { id: 1, name: 'Red Rocks Amphitheatre', city: 'Morrison', capacity: 9525 },
  { id: 2, name: 'The Crocodile', city: 'Seattle', capacity: 550 },
  { id: 3, name: 'First Avenue', city: 'Minneapolis', capacity: 1550 },
  { id: 4, name: 'The Fillmore', city: 'San Francisco', capacity: 1150 },
  { id: 5, name: 'Revolution Hall', city: 'Portland', capacity: 850 },
  { id: 6, name: 'Brooklyn Steel', city: 'Brooklyn', capacity: 1800 },
  { id: 7, name: 'The Troubadour', city: 'West Hollywood', capacity: 500 },
  { id: 8, name: '9:30 Club', city: 'Washington', capacity: 1200 },
  { id: 9, name: "Tipitina's", city: 'New Orleans', capacity: 800 },
  { id: 10, name: 'Thalia Hall', city: 'Chicago', capacity: 750 },
  { id: 11, name: 'Mohawk', city: 'Austin', capacity: 900 },
  { id: 12, name: "Saint Andrew's Hall", city: 'Detroit', capacity: 1000 },
]

export const events = [
  {
    id: 1,
    venue_id: 1,
    title: 'The Midnight Cashiers',
    starts_at: '2026-11-14T19:00:00',
    onsale_at: '2026-09-08T10:00:00',
    note: 'Soundcheck is in daylight. Pit is the front bowl, not a separate entrance.',
    ticket_types: [
      { id: 101, name: 'GA', price: 49, quantity_total: 4200, quantity_sold: 2680, remaining: 1520 },
      { id: 102, name: 'Reserved', price: 86, quantity_total: 900, quantity_sold: 640, remaining: 260 },
      { id: 103, name: 'Pit', price: 125, quantity_total: 400, quantity_sold: 355, remaining: 45 },
    ],
  },
  {
    id: 2,
    venue_id: 2,
    title: 'Harbor & Wire',
    starts_at: '2026-11-18T20:00:00',
    onsale_at: '2026-09-20T10:00:00',
    note: 'The room holds about five hundred. After 8:30 you are watching from the bar.',
    ticket_types: [
      { id: 201, name: 'GA', price: 22, quantity_total: 500, quantity_sold: 470, remaining: 30 },
    ],
  },
  {
    id: 3,
    venue_id: 3,
    title: 'Late Freight',
    starts_at: '2026-11-21T21:00:00',
    onsale_at: '2026-09-12T10:00:00',
    note: 'Late set. Main floor is standing. The balcony is the only place to sit.',
    ticket_types: [
      { id: 301, name: 'GA', price: 31, quantity_total: 1100, quantity_sold: 640, remaining: 460 },
      { id: 302, name: 'Balcony', price: 38, quantity_total: 280, quantity_sold: 90, remaining: 190 },
    ],
  },
  {
    id: 4,
    venue_id: 4,
    title: 'Salt Choir',
    starts_at: '2026-12-02T19:00:00',
    onsale_at: '2026-10-01T10:00:00',
    note: 'Four voices and a pump organ. Reserved is the first four rows, which are chairs.',
    ticket_types: [
      { id: 401, name: 'GA', price: 35, quantity_total: 800, quantity_sold: 210, remaining: 590 },
      { id: 402, name: 'Reserved', price: 62, quantity_total: 160, quantity_sold: 44, remaining: 116 },
    ],
  },
  {
    id: 5,
    venue_id: 5,
    title: 'County Line Boxing',
    starts_at: '2026-12-05T18:00:00',
    onsale_at: '2026-10-04T12:00:00',
    note: 'Four bouts. The main goes eight rounds. Ringside is folding chairs on the floor.',
    ticket_types: [
      { id: 501, name: 'Balcony', price: 25, quantity_total: 220, quantity_sold: 40, remaining: 180 },
      { id: 502, name: 'Floor', price: 45, quantity_total: 300, quantity_sold: 126, remaining: 174 },
      { id: 503, name: 'Ringside', price: 80, quantity_total: 80, quantity_sold: 61, remaining: 19 },
    ],
  },
  {
    id: 6,
    venue_id: 6,
    title: 'Glass Orchard',
    starts_at: '2026-12-09T20:00:00',
    onsale_at: '2026-10-06T10:00:00',
    note: 'General admission all the way back. No seats. The balcony rail fills first.',
    ticket_types: [
      { id: 601, name: 'GA', price: 46, quantity_total: 1700, quantity_sold: 980, remaining: 720 },
    ],
  },
  {
    id: 7,
    venue_id: 7,
    title: 'June Keller',
    starts_at: '2026-12-12T19:30:00',
    onsale_at: '2026-10-08T10:00:00',
    note: 'No band tonight. Reserved is a chair. GA stands behind the chairs.',
    ticket_types: [
      { id: 701, name: 'GA', price: 29, quantity_total: 320, quantity_sold: 188, remaining: 132 },
      { id: 702, name: 'Reserved', price: 48, quantity_total: 140, quantity_sold: 97, remaining: 43 },
    ],
  },
  {
    id: 8,
    venue_id: 8,
    title: 'The Paper Route',
    starts_at: '2026-12-18T20:00:00',
    onsale_at: '2026-10-10T10:00:00',
    note: 'The back bar is closed. Balcony is the upstairs rail, same show.',
    ticket_types: [
      { id: 801, name: 'GA', price: 30, quantity_total: 900, quantity_sold: 240, remaining: 660 },
      { id: 802, name: 'Balcony', price: 36, quantity_total: 200, quantity_sold: 51, remaining: 149 },
    ],
  },
  {
    id: 9,
    venue_id: 9,
    title: 'Low Tide Brass',
    starts_at: '2027-01-08T21:00:00',
    onsale_at: '2026-10-14T10:00:00',
    note: 'Late brass. A table ticket is one person along the rail, not the whole table.',
    ticket_types: [
      { id: 901, name: 'GA', price: 24, quantity_total: 520, quantity_sold: 80, remaining: 440 },
      { id: 902, name: 'Table', price: 55, quantity_total: 64, quantity_sold: 12, remaining: 52 },
    ],
  },
  {
    id: 10,
    venue_id: 10,
    title: 'Ada Voss',
    starts_at: '2027-01-16T19:00:00',
    onsale_at: '2026-10-15T10:00:00',
    note: 'Seated set. A few balcony seats have a column in the sightline.',
    ticket_types: [
      { id: 1001, name: 'GA', price: 33, quantity_total: 480, quantity_sold: 60, remaining: 420 },
      { id: 1002, name: 'Balcony', price: 44, quantity_total: 180, quantity_sold: 22, remaining: 158 },
    ],
  },
  {
    id: 11,
    venue_id: 11,
    title: 'Wren Motel',
    starts_at: '2027-01-23T20:30:00',
    onsale_at: '2026-11-01T10:00:00',
    note: 'Outdoor is the patio if it stays dry. If it rains, those stubs work on the indoor floor.',
    ticket_types: [
      { id: 1101, name: 'Outdoor', price: 18, quantity_total: 250, quantity_sold: 0, remaining: 250 },
      { id: 1102, name: 'Indoor', price: 28, quantity_total: 400, quantity_sold: 0, remaining: 400 },
    ],
  },
  {
    id: 12,
    venue_id: 12,
    title: 'Static Mercy',
    starts_at: '2027-02-06T20:00:00',
    onsale_at: '2026-10-11T10:00:00',
    note: 'Pit is the floor in front of the stage, about forty people. GA is behind that.',
    ticket_types: [
      { id: 1201, name: 'GA', price: 23, quantity_total: 700, quantity_sold: 140, remaining: 560 },
      { id: 1202, name: 'Pit', price: 32, quantity_total: 40, quantity_sold: 27, remaining: 13 },
    ],
  },
]

export function normalize(event, venueList = venues) {
  const venue =
    event.venue ||
    venueList.find((venue) => venue.id === event.venue_id) || {
      id: event.venue_id,
      name: 'Venue',
      city: '',
      capacity: null,
    }

  const ticket_types = (event.ticket_types || []).map((tier) => {
    const quantity_total = Number(tier.quantity_total ?? 0)
    const quantity_sold = Number(tier.quantity_sold ?? 0)
    const remaining =
      tier.remaining != null ? Number(tier.remaining) : quantity_total - quantity_sold
    return {
      ...tier,
      price: Number(tier.price),
      quantity_total,
      quantity_sold,
      remaining,
    }
  })

  return { ...event, venue, ticket_types }
}

export function lowestPrice(event) {
  if (!event.ticket_types?.length) return null
  return Math.min(...event.ticket_types.map((tier) => Number(tier.price)))
}

export function cheapestTier(event) {
  if (!event.ticket_types?.length) return null
  return [...event.ticket_types].sort((a, b) => Number(a.price) - Number(b.price))[0]
}

export const counterEvents = events.map((event) => normalize(event))
