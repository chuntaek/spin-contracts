require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');


const providerFactory = network => new HDWalletProvider(
  process.env.MNEMONICS || '',                                  // Mnemonic of the deployer
  `https://${network}.infura.io/${process.env.INFURA_API_KEY}`  // Provider URL => web3.HttpProvider
);


module.exports = {
  networks: {
    'mainnet': {
      provider: providerFactory('mainnet'),
      network_id: 1,
      gas: 4700000,
      gasPrice: 100000000000 // 100 Gwei, Change this value according to price average of the deployment time
    },
    'ropsten': {
      provider: providerFactory('ropsten'),
      network_id: 3,
      gas: 4700000,
      gasPrice: 50000000000 // 50 Gwei
    },
    'rinkeby': {
      provider: providerFactory('rinkeby'),
      network_id: 4,
      gas: 4700000,
      gasPrice: 50000000000 // 50 Gwei
    },
    'kovan': {
      provider: providerFactory('kovan'),
      network_id: 42,
      gas: 4700000,
      gasPrice: 50000000000  // 50 Gwei
    }
  }
};
