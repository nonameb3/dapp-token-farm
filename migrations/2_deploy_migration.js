const DiaToken = artifacts.require("DiaToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {
  // deploy Dia Token
  await deployer.deploy(DiaToken);
  const diaToken = await DiaToken.deployed();

  // deploy Dapp Token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // deploy Token Farm
  await deployer.deploy(TokenFarm, diaToken.address, dappToken.address);
  const tokenFarm = await DappToken.deployed();

  // transfer all token to Token Farm (1m)
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // transfer 100 Dia to invester
  await diaToken.transfer(accounts[1], "100000000000000000000");
};
