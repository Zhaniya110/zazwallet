require('dotenv').config();

const { Web3 } = require('web3');
const { signTransaction } = require('web3-eth');
const apikey = process.env['apikey'];
const network = 'binance-testnet';

const node = `https://go.getblock.io/${apikey}/${network}/`

const web3 = new Web3(node)
//console.log(web3)


const accountTo = web3.eth.accounts.create();

console.log(accountTo.address);

const privateKey = process.env['privatekey'];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(accountFrom);

const createSignedTx = async(rawTx)=>{
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

const sendSignedTx = async(signedTx)=>{
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}

const amountTo="0.01"
const rawTx = {
    to:accountTo.address,
    value:web3.utils.toWei(amountTo,"ether")
}
createSignedTx(rawTx).then(sendSignedTx)