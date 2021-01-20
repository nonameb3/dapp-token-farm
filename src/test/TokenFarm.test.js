const DiaToken = artifacts.require("DiaToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

function tokenToWei(token) {
  return web3.utils.toWei(token, "ether");
}

function weiToToken(wei) {
  return web3.utils.fromWei(wei, "ether");
}

contract("TokenFarm", function ([owner, invester]) {
  let diaToken;
  let dappToken;
  let tokenFarm;

  before("setup contract for each test", async function () {
    // deploy
    diaToken = await DiaToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(DiaToken.address, DappToken.address);

    // transfer
    await dappToken.transfer(tokenFarm.address, tokenToWei("1000000"));

    // transfer 100 Dia to invester
    await diaToken.transfer(invester, tokenToWei("100"), { from: owner });
  });

  describe("Dia depolyment", async () => {
    it("token has own name", async () => {
      assert.equal(await diaToken.name(), "Mock DAI Token");
    });
  });

  describe("Dapp depolyment", async () => {
    it("token has own name", async () => {
      assert.equal(await dappToken.name(), "DApp Token");
    });
  });

  describe("Token Farm depolyment", async () => {
    it("token has own name", async () => {
      assert.equal(await tokenFarm.name(), "Token Farm");
    });
  });

  describe("Contract", async () => {
    it("contact has token", async () => {
      const dappBalance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(weiToToken(dappBalance.toString()), "1000000");
    });

    it("invester has dia token", async () => {
      const diaBalance = await diaToken.balanceOf(invester);
      assert.equal(weiToToken(diaBalance.toString()), "100");
    });
  });
});
