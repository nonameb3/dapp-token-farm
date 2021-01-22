import React from 'react'
import './Header.css'

import Logo from '../image/logo.png'

function App() {
  return (
    <header className="header">
      <img src={Logo} width="24px" alt="logo" />
      <div className="header-content">
        <span>0xasdadsads</span>
      </div>
    </header>
  )
}

export default App
