import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // .jsx uzantısını ekledik
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)