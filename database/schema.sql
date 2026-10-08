CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(100),
  created_at    TIMESTAMP DEFAULT now()
);

CREATE TABLE venues (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(150),
  city     VARCHAR(100),
  capacity INT
);

CREATE TABLE events (
  id        SERIAL PRIMARY KEY,
  venue_id  INT REFERENCES venues(id),
  title     VARCHAR(200),
  starts_at TIMESTAMP,
  onsale_at TIMESTAMP
);

CREATE TABLE ticket_types (
  id             SERIAL PRIMARY KEY,
  event_id       INT REFERENCES events(id),
  name           VARCHAR(50),
  price          NUMERIC(10,2),
  quantity_total INT,
  quantity_sold  INT DEFAULT 0
);

CREATE TABLE orders (
  id         SERIAL PRIMARY KEY,
  user_id    INT REFERENCES users(id),
  event_id   INT REFERENCES events(id),
  status     VARCHAR(20) DEFAULT 'pending',
  total      NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE tickets (
  id             SERIAL PRIMARY KEY,
  order_id       INT REFERENCES orders(id),
  ticket_type_id INT REFERENCES ticket_types(id),
  owner_id       INT REFERENCES users(id),
  status         VARCHAR(20) DEFAULT 'ready',
  qr_code        VARCHAR(255) UNIQUE
);