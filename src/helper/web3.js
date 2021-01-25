import Web3 from 'web3';

import DiaToken from '../abis/DiaToken.json';
import DappToken from '../abis/DappToken.json';
import TokenFarm from '../abis/TokenFarm.json';

export let web3 = new Web3(window.ethereum);

export const getWeb3 = async () => {
  return new Promise((resolve, reject) => {
    // Modern DApp Browsers
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          // User has allowed account access to DApp...
          console.log('allowed')
          resolve(web3)
        });
      } catch (e) {
        // User has denied account access to DApp...
        console.log('error', e)
        reject(e)
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      resolve(web3)
    }
    // Non-DApp Browsers
    else {
      reject('You have to install MetaMask !')
    }
  });
}

export function fromWei(token) {
  const web3 = new Web3(window.ethereum);

  if (!web3?.utils) {
    return 0;
  }
  return web3.utils.fromWei(token.toString());
}

export function toWei(token) {
  const web3 = new Web3(window.ethereum);

  if (!web3?.utils) {
    return 0;
  }
  return web3.utils.toWei(token.toString());
}

export const fetchToken = async (account, setState={}) => {
  const web3 = new Web3(window.ethereum);

  // debugger;
  const networkId = await web3.eth.net.getId();

  const result = {
    account: account,
    diaToken: {},
    dappToken: {},
    tokenFarm: {},
    diaTokenBalance: 0,
    dappTokenBalance: 0,
    tokenFarmBalance: 0,
    isLoading: false
  }

  const diaTokenData = DiaToken.networks[networkId];
  if (diaTokenData) {
    const diaToken = new web3.eth.Contract(DiaToken.abi, diaTokenData.address);
    const diaTokenBalance = await diaToken.methods.balanceOf(account).call();
    result.diaToken = diaToken;
    result.diaTokenBalance = diaTokenBalance;
    window.daiToken = diaToken;
    // setState({ diaToken, diaTokenBalance });
  } else {
    alert("can't find diatoken contract network!")
  }

  const dappTokenData = DappToken.networks[networkId];
  if (dappTokenData) {
    const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
    const dappTokenBalance = await dappToken.methods.balanceOf(account).call();
    result.dappToken = dappToken;
    result.dappTokenBalance = dappTokenBalance;
    // setState({ dappToken, dappTokenBalance })
  } else {
    alert("can't find dapptoken contract network!")
  }

  const tokenFarmData = TokenFarm.networks[networkId];
  if (tokenFarmData) {
    const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
    const tokenFarmBalance = await tokenFarm.methods.stakingBalance(account).call();
    result.tokenFarm = tokenFarm;
    result.tokenFarmBalance = tokenFarmBalance;
    // setState({ tokenFarm, tokenFarmBalance })
  } else {
    alert("can't find dapptoken contract network!")
  }
  return result;
}