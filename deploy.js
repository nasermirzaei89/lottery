const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const Lottery = require('./compile');

const provider = new HDWalletProvider(process.env.LOTTERY_MNEMONIC, process.env.LOTTERY_PROVIDER);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[process.env.LOTTERY_ACCOUNT_INDEX];

    console.log(`Attempting to deploy from account ${account}`);

    const result = await new web3.eth.Contract(Lottery.abi)
        .deploy({data: `0x${Lottery.evm.bytecode.object}`})
        .send({gas: '1000000', from: account});

    console.log(`Contract deployed to ${result.options.address}`);
};

deploy().then(() => {
    process.exit(0);
});
