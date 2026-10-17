import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CatalogProvider } from './catalog-state'
import { SessionProvider } from './session'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </CatalogProvider>
    </BrowserRouter>
  </StrictMode>,
)
