import React, { useEffect } from 'react';
import Web3 from 'web3';
import logo from "./logo.svg";
import "./App.css";

import DiaToken from './abis/DiaToken.json';
import DappToken from './abis/DappToken.json';
import TokenFarm from './abis/TokenFarm.json';

import useMyState from './hooks/useMyState';

const initalState = {
  account: '0x',
  diaToken: {},
  dappToken: {},
  tokenFarm: {},
  diaTokenBalance: 0,
  dappTokenBalance: 0,
  farmTokenBalance: 0,
  isLoading: false
}

function App() {
  const [state, setState] = useMyState(initalState);
  
  useEffect(() => {
    const fetchWeb3 = async () => {
      if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        return alert("can't detected your MetaMask!");
      }

      const web3 = window.web3;
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

      const dappTokenData = DiaToken.networks[networkId];
      if(dappTokenData) {
        const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
        const dappTokenBalance = await dappToken.methods.balanceOf(accounts[0]).call();

        setState({ dappToken, dappTokenBalance })
      } else {
        alert("can't find dapptoken contract network!")
      }
    }

    fetchWeb3();
  }, []);

  console.log('state', state)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
