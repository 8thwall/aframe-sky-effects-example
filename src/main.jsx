import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { initRemoteLogger } from './utils/remoteLogger'
import './styles/app.css'

// Initialize Mobile Remote Terminal Logger
initRemoteLogger()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
