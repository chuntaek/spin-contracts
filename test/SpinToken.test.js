const { decodeLogs } = require('./utils/decodeLogs');
const { ZERO_ADDRESS } = require('./utils/constants');

const SpinToken = artifacts.require('SpinToken');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const WEI = 10**18;

contract('SpinToken', function ([_, creator]) {
  const name = "SPIN Protocol";
  const symbol = "SPIN";
  const decimals = 18;
  const initialSupply = 1250 * WEI;

  beforeEach(async function() {
    this.token = await SpinToken.new(name, symbol, decimals, initialSupply, { from: creator });
  });

  it('has a name', async function () {
    (await this.token.name()).should.equal('SPIN Protocol');
  });

  it('has a symbol', async function () {
    (await this.token.symbol()).should.equal('SPIN');
  });

  it('has 18 decimals', async function () {
    (await this.token.decimals()).should.be.bignumber.equal(18);
  });

  it('has 1250 * 10**18 initialSupply', async function () {
    (await this.token.totalSupply()).should.be.bignumber.equal(1250 * WEI);
  });

  it('assigns the initial total supply to the creator', async function () {
    const totalSupply = await this.token.totalSupply();
    const creatorBalance = await this.token.balanceOf(creator);

    creatorBalance.should.be.bignumber.equal(totalSupply);

    const receipt = await web3.eth.getTransactionReceipt(this.token.transactionHash);
    const logs = decodeLogs(receipt.logs, SpinToken, this.token.address);
    logs.length.should.equal(2);
    logs[0].event.should.equal('MinterAdded');
    logs[0].args.account.valueOf().should.equal(creator);

    logs[1].event.should.equal('Transfer');
    logs[1].args.from.valueOf().should.equal(ZERO_ADDRESS);
    logs[1].args.to.valueOf().should.equal(creator);
    logs[1].args.value.should.be.bignumber.equal(totalSupply);
  });

})