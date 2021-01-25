import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import "./App.css";

import DiaToken from './abis/DiaToken.json';
import DappToken from './abis/DappToken.json';
import TokenFarm from './abis/TokenFarm.json';

import { web3, fromWei, toWei, getWeb3, fetchToken } from './helper/web3'
import useMyState from './hooks/useMyState';
import Header from './component/Header';

import DiaTokenLogo from './image/DIA-icon-colour.webp'

const initalState = {
  account: '',
  diaToken: {},
  dappToken: {},
  tokenFarm: {},
  diaTokenBalance: 0,
  dappTokenBalance: 0,
  tokenFarmBalance: 0,
  isLoading: false
}

function App() {
  const [state, setState] = useMyState(initalState);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchWeb3 = async () => {
      const newWeb3 = new Web3(window.ethereum);
      const accounts = await newWeb3.eth.getAccounts();
      setState({ account: accounts[0] });
      web3 = newWeb3;
    }

    fetchWeb3();
  }, []);

  useEffect(() => {
    if (state.account) {
      fetchToken(state.account, setState).then(data => {
        setState({ ...data, isLoading: false});
      });
    }
  }, [state.account]);

  async function onSubmit(e) {
    e.preventDefault();
    const stakeToken = toWei(amount);
    const { diaToken, tokenFarm, account } = state;
    setState({ isLoading: true });
    diaToken.methods.approve(tokenFarm._address, stakeToken).send({ from: account }).on("receipt", receipt => {
      tokenFarm.methods.stakeTokens(stakeToken).send({ from: account }).on("receipt", async receipt => {
        const data = await fetchToken(state.account, setState);
        setState({ ...data, isLoading: false});
        setAmount(0);
        console.log('stake success', receipt)
      });
    });
  }

  async function onUnStake(e) {
    e.preventDefault();
    const { tokenFarm, account } = state;
    setState({ isLoading: true });
    tokenFarm.methods.unStakeTokens().send({ from: account }).on("receipt", async  receipt => {
      const data = await fetchToken(state.account, setState);
      setState({ ...data, isLoading: false});
      setAmount(0)
      console.log('unStake success', receipt)
    });
  }

  async function onConnect() {
    const newWeb3 = await getWeb3();
    const accounts = await newWeb3.eth.getAccounts();
    setState({ account: accounts[0] });
    web3 = newWeb3;
  }

  return (
    <div className="app">
      <Header account={state.account ? state.account : '0x'} />
      <div className="content">
        <div className="flex justify-center text-center">
          <div className="p-1">
            <p>
              <b>Staking Balance</b>
            </p>
            <p className="text-gray">
              {fromWei(state.tokenFarmBalance)}<span> mDIA</span>
            </p>
          </div>
          <div className="p-1">
            <p>
              <b>Reward balance</b>
            </p>
            <p className="text-gray">
              {fromWei(state.dappTokenBalance)}<span> DAPP</span>
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
                  <div className="text-gray head ">Balance: {fromWei(state.diaTokenBalance)}</div>
                </div>
                <div className="item">
                  <input
                    className="item-input"
                    type="number"
                    step="1"
                    placeholder="0.0"
                    min="1"
                    max={fromWei(state.diaTokenBalance)}
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                  />
                  <div className="flex items-center wrap">
                    <img src={DiaTokenLogo} width="35px" alt="WebP rules." />
                    <div>Dia</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1">
              {state.account ? (
                <>
                  <button type="submit" className="box-btn">STAKE!</button>
                  <div className="mt-1 flex justify-center">
                    <button type="button" className="box-btn-transparent" onClick={onUnStake}>UN-STAKE</button>
                  </div>
                </>
              ) : (
                  <div className="flex justify-center">
                    <button type="button" className="box-btn" onClick={onConnect}>CONNECT TO MATEMASK!</button>
                  </div>
                )}

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
