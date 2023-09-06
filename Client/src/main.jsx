import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./Style/_global.scss"
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
