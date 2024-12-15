import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'core wear goose congress elephant afraid amazing diet holiday crush better expect provide envelope involve slide hotel prepare dad zoo fatal media cute already';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const contractAddress = 'archway15y2rtn48nm0483umghatyj48n8fs6lrwj7t5q2lpl7apzdtmx37qg6j8wc'; // collection address


let metadata = {
  'link': '123',
  'some_attributes': {
    'attribute': 'value'
  }
}

let tokens = [];

for (let i = 1; i < 10; i++) {
  tokens.push({
    "token_id": i.toString(),
    "owner": accounts[0].address,
    "token_uri": "https://ik.imagekit.io/fmivn9lzw/1_C_FB4vklOD.png",
    "extension": JSON.stringify(metadata)
  });
}

const mintNftMsg = {
  "batch_mint": {
    "tokens": tokens
  }
};

const gasPrice = GasPrice.fromString("1000000000000aconst");

const { transactionHash } = await client.execute(
  accounts[0].address,
  contractAddress,
  mintNftMsg,
  calculateFee(500000, gasPrice),
  ""
);

console.log(transactionHash);