import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

const sessionStorageKey = 'ecommerce-demo-session-id'
let demoSessionId = localStorage.getItem(sessionStorageKey)

if (!demoSessionId) {
    demoSessionId = globalThis.crypto?.randomUUID?.()
        ?? `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(sessionStorageKey, demoSessionId)
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL || ''
axios.defaults.headers.common['X-Demo-Session'] = demoSessionId

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
