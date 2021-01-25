import React, { useState } from 'react';
import Web3 from 'web3';
import './Content.css';

import DiaTokenLogo from '../image/DIA-icon-colour.webp'

function fromWei(token) {
  const web3 = new Web3(window.ethereum);
  
  if(!web3?.utils){
    return 0;
  }
  return web3.utils.fromWei(token.toString());
}

function toWei(token) {
  const web3 = new Web3(window.ethereum);
  
  if(!web3?.utils){
    return 0;
  }
  return web3.utils.toWei(token.toString());
}

function App({ token=0, onStakeToken, onUnStakeToken}) {
  const [amount, setAmount] = useState(0);

  function onSubmit(e) {
    e.preventDefault();
    onStakeToken(toWei(amount));
  }

  function onUnStake(e) {
    e.preventDefault();
    onUnStakeToken();
  }
  
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
        <form className="box" onSubmit={onSubmit}>
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
                  type="number"
                  step="1"
                  placeholder="0.0"
                  max={fromWei(token.diaTokenBalance)}
                  value={amount}
                  onChange={({target}) => setAmount(target.value)}
                />
                <div className="flex items-center wrap">
                  <img src={DiaTokenLogo} width="35px" alt="WebP rules." />
                  <div>Dia</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-1">
            <button type="submit" className="box-btn">STAKE!</button>
            <div className="mt-1 flex justify-center">
              <button type="button" className="box-btn-transparent" onClick={onUnStake}>UN-STAKE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
