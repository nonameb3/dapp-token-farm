import React, { useEffect } from 'react';
import Web3 from 'web3';
// import logo from "./logo.svg";
import "./App.css";

import DiaToken from './abis/DiaToken.json';
import DappToken from './abis/DappToken.json';
import TokenFarm from './abis/TokenFarm.json';

import useMyState from './hooks/useMyState';
import Header from './component/Header';
import Content from './component/Content';

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
  
  useEffect(() => {
    const fetchWeb3 = async () => {
      let web3;
      if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if(window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        return alert("can't detected your MetaMask!");
      }

      const accounts = await web3.eth.requestAccounts();
      setState({account: accounts[0]})

      const networkId = await web3.eth.net.getId();
      const diaTokenData = DiaToken.networks[networkId];
      if(diaTokenData) {
        const diaToken = new web3.eth.Contract(DiaToken.abi, diaTokenData.address);
        const diaTokenBalance = await diaToken.methods.balanceOf(accounts[0]).call();

        setState({ diaToken, diaTokenBalance });
      } else {
        alert("can't find diatoken contract network!")
      }

      const dappTokenData = DappToken.networks[networkId];
      if(dappTokenData) {
        const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
        const dappTokenBalance = await dappToken.methods.balanceOf(accounts[0]).call();

        setState({ dappToken, dappTokenBalance })
      } else {
        alert("can't find dapptoken contract network!")
      }

      const tokenFarmData = TokenFarm.networks[networkId];
      if(tokenFarmData) {
        const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
        const tokenFarmBalance = await tokenFarm.methods.stakingBalance(accounts[0]).call();

        setState({ tokenFarm, tokenFarmBalance })
      } else {
        alert("can't find dapptoken contract network!")
      }
    }

    fetchWeb3();
  }, []);

  function onStakeToken(amount) {
    const { diaToken, tokenFarm, account } = state;
    setState({ isLoading: true });
    diaToken.methods.approve(tokenFarm._address, amount).send({from: account}).on("transactionHash", hash => {
      tokenFarm.methods.stakeTokens(amount).send({from: account}).on("transactionHash", hash => {
        setState({ isLoading: false });
        console.log('success')
      });
    });
  }

  function onUnStakeToken() {
    const { tokenFarm, account } = state;
    setState({ isLoading: true });
    tokenFarm.methods.unStakeTokens().send({from: account}).on("transactionHash", hash => {
      setState({ isLoading: false });
      console.log('success')
    });
  }

  return (
    <div className="app">
      <Header account={state.account}/>
      <Content token={state} onStakeToken={onStakeToken} onUnStakeToken={onUnStakeToken}/>
    </div>
  );
}

export default App;
