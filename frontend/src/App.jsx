import { Link, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Account from './pages/Account'
import Home from './pages/Home'
import Show from './pages/Show'
import Stubs from './pages/Stubs'
import Window from './pages/Window'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shows/:id" element={<Show />} />
        <Route path="/window" element={<Window />} />
        <Route path="/stubs" element={<Stubs />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="*"
          element={
            <p className="empty">
              Nothing at this address. <Link to="/">Listings.</Link>
            </p>
          }
        />
      </Route>
    </Routes>
  )
}
