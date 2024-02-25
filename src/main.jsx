import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> //commenting out as it's rendering twice 
  //causing issue in websocket client initialisation
    <App />
  // </React.StrictMode>,
)
