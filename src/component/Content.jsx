import React from 'react'
import './Content.css'

import DiaTokenLogo from '../image/DIA-icon-colour.webp'

function App() {
  return (
    <div className="content">
      <div className="flex justify-center text-center">
        <div className="p-1">
          <p>
            <b>Staking Balance</b>
          </p>
          <p className="text-gray">
            0<span> mDIA</span>
          </p>
        </div>
        <div className="p-1">
          <p>
            <b>Reward balance</b>
          </p>
          <p className="text-gray">
            0<span> DAPP</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="box">
          <div className="box-header">
            <b>Stake</b>
          </div>
          <div className="p-1">
            <div className="box-item">
              <div className="head">From</div>
              <div className="item">
                <input
                  className="item-input"
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                />
                <div className="flex items-center wrap">
                  <img src={DiaTokenLogo} width="35px" alt="WebP rules." />
                  <div>Dia</div>
                  <div className="break text-center">0.0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <button class="box-btn">STAKE!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
