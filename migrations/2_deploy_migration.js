const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (deployer, network, accounts) {
  deployer.deploy(TokenFarm);
};
