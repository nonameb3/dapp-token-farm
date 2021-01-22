import React from 'react'
import './Header.css'

import Logo from '../image/logo.png'

function App({ account }) {
  return (
    <header className="header">
      <img src={Logo} width="24px" alt="logo" />
      <div className="header-content">
        <span>{account}</span>
      </div>
    </header>
  )
}

export default App
