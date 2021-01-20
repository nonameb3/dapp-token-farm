const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function (callback) {
  let tokenFarm = await TokenFarm.deployed()
  await tokenFarm.issueToken()

  console.log('Script Here!')
  callback();
};
