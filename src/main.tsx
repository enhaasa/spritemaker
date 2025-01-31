import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Contexts
import { SpriteContextProvider } from './contexts/sprite'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SpriteContextProvider>
      <App />
    </SpriteContextProvider>
  </StrictMode>,
)
