import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
// import logo from "./logo.svg";
import "./App.css";

import DiaToken from './abis/DiaToken.json';
import DappToken from './abis/DappToken.json';
import TokenFarm from './abis/TokenFarm.json';

import {fromWei, toWei} from './helper/web3'
import useMyState from './hooks/useMyState';
import Header from './component/Header';

import DiaTokenLogo from './image/DIA-icon-colour.webp'

const initalState = {
  account: '0x',
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
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        return alert("can't detected your MetaMask!");
      }

      const accounts = await web3.eth.requestAccounts();
      setState({ account: accounts[0] })

      const networkId = await web3.eth.net.getId();
      const diaTokenData = DiaToken.networks[networkId];
      if (diaTokenData) {
        const diaToken = new web3.eth.Contract(DiaToken.abi, diaTokenData.address);
        const diaTokenBalance = await diaToken.methods.balanceOf(accounts[0]).call();

        setState({ diaToken, diaTokenBalance });
      } else {
        alert("can't find diatoken contract network!")
      }

      const dappTokenData = DappToken.networks[networkId];
      if (dappTokenData) {
        const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
        const dappTokenBalance = await dappToken.methods.balanceOf(accounts[0]).call();

        setState({ dappToken, dappTokenBalance })
      } else {
        alert("can't find dapptoken contract network!")
      }

      const tokenFarmData = TokenFarm.networks[networkId];
      if (tokenFarmData) {
        const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
        const tokenFarmBalance = await tokenFarm.methods.stakingBalance(accounts[0]).call();

        setState({ tokenFarm, tokenFarmBalance })
      } else {
        alert("can't find dapptoken contract network!")
      }
    }

    fetchWeb3();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const stakeToken = toWei(amount);
    const { diaToken, tokenFarm, account } = state;
    setState({ isLoading: true });
    diaToken.methods.approve(tokenFarm._address, stakeToken).send({ from: account }).on("transactionHash", hash => {
      tokenFarm.methods.stakeTokens(stakeToken).send({ from: account }).on("transactionHash", hash => {
        setState({ isLoading: false });
        console.log('success')
      });
    });
  }

  function onUnStake(e) {
    e.preventDefault();
    const { tokenFarm, account } = state;
    setState({ isLoading: true });
    tokenFarm.methods.unStakeTokens().send({ from: account }).on("transactionHash", hash => {
      setState({ isLoading: false });
      console.log('success')
    });
  }

  return (
    <div className="app">
      <Header account={state.account} />
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
              <button type="submit" className="box-btn">STAKE!</button>
              <div className="mt-1 flex justify-center">
                <button type="button" className="box-btn-transparent" onClick={onUnStake}>UN-STAKE</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
