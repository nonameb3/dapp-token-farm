import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

const DiaToken = artifacts.require("DiaToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

function tokenToWei(token) {
  return web3.utils.toWei(token, "ether");
}

function weiToToken(wei) {
  return web3.utils.fromWei(wei, "ether");
}

contract("TokenFarm", async ([owner, investor]) => {
  let diaToken;
  let dappToken;
  let tokenFarm;

  before("setup contract for each test", async function () {
    // deploy
    diaToken = await DiaToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(diaToken.address, dappToken.address);

    // transfer
    await dappToken.transfer(tokenFarm.address, tokenToWei("1000000"));

    // transfer 100 Dia to investor
    await diaToken.transfer(investor, tokenToWei("100"), { from: owner });
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
      assert.equal(dappBalance.toString(), tokenToWei("1000000"));
    });

    it("investor has dia token", async () => {
      const diaBalance = await diaToken.balanceOf(investor);
      assert.equal(diaBalance.toString(), tokenToWei("100"));
		});
		
		it('staked', async () => {
			let result;

			// Check investor balance before staking
			result = await diaToken.balanceOf(investor);
			assert.equal(result.toString(), tokenToWei("100"), 'investor has 100 dia');

			// Stake Mock DAI Tokens
			await diaToken.approve(tokenFarm.address, tokenToWei("100"), { from: investor });
			await tokenFarm.stakeTokens(tokenToWei("100"), { from: investor });

			// Check staking result
			result = await diaToken.balanceOf(investor);
			assert.equal(result.toString(), tokenToWei('0'), 'investor DIA wallet balance correct after staking');

			result = await diaToken.balanceOf(tokenFarm.address);
      assert.equal(result.toString(), tokenToWei('100'), 'Token Farm DIA balance correct after staking');
      
      result = await tokenFarm.stakingBalance(investor);
      assert.equal(result.toString(), tokenToWei('100'), 'Check Token Farm has staking balance');
      
      result = await tokenFarm.isStaking(investor)
      assert.equal(result, true, 'Check Token Farm has staking')
      
      // try issueToken token
      result = await dappToken.balanceOf(investor);
      assert.equal(result.toString(), '0', 'Check dappToken balance is zero');

      await tokenFarm.issueToken({from:owner});
      await tokenFarm.issueToken({from:investor}).should.be.rejected;

      result = await dappToken.balanceOf(investor);
      assert.equal(result.toString(), tokenToWei('100'), 'Check dappToken balance has value back');

      // check unstak token
      await tokenFarm.unStakeTokens({from:investor});

			result = await diaToken.balanceOf(investor);
			assert.equal(result.toString(), tokenToWei('100'), 'investor DIA wallet balance have value after unstak');

      result = await tokenFarm.isStaking(investor)
      assert.equal(result, false, 'Check Token Farm has unStaking')
    });
  });
});
