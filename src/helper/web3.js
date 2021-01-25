import Web3 from 'web3';

export let web3;

export function fromWei(token) {
  const web3 = new Web3(window.ethereum);
  
  if(!web3?.utils){
    return 0;
  }
  return web3.utils.fromWei(token.toString());
}

export function toWei(token) {
  const web3 = new Web3(window.ethereum);
  
  if(!web3?.utils){
    return 0;
  }
  return web3.utils.toWei(token.toString());
}
