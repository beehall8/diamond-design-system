import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PaymentConfirmed from './PaymentConfirmed'
import './styles.css'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = pathname === '/payment-confirmed' ? PaymentConfirmed : App

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><Page /></React.StrictMode>,
)
