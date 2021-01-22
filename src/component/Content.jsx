import React from 'react'
import './Content.css'

import DiaTokenLogo from '../image/DIA-icon-colour.webp'

function fromWei(token) {
  if(!window.web3?.utils){
    return 0;
  }
  return window.web3.utils.fromWei(token.toString());
}

function App({ token=0 }) {
  return (
    <div className="content">
      <div className="flex justify-center text-center">
        <div className="p-1">
          <p>
            <b>Staking Balance</b>
          </p>
          <p className="text-gray">
            {fromWei(token.tokenFarmBalance)}<span> mDIA</span>
          </p>
        </div>
        <div className="p-1">
          <p>
            <b>Reward balance</b>
          </p>
          <p className="text-gray">
            {fromWei(token.dappTokenBalance)}<span> DAPP</span>
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="box">
          <div className="box-header flex">
            <div className="flex-1"><b>Stake</b></div>
          </div>
          <div className="p-1">
            <div className="box-item">
              <div className="flex justify-between">
                <div className="head">From</div>
                <div className="text-gray head ">Balance: {fromWei(token.diaTokenBalance)}</div>
              </div>
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
                </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <button className="box-btn">STAKE!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
