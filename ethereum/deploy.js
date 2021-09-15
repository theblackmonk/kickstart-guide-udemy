const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
//const { interface, bytecode } = require("./compile"); //assumes we compile on the fly
//this time we need to read pre-compiled files off harddrive
const compiledFactory = require('./build/CampaignFactory.json');
const ABI = compiledFactory.interface;
const bytecode = compiledFactory.bytecode;

const provider = new HDWalletProvider(
  "away lemon nasty engine inherit flee grocery impulse train antenna churn crisp",
  "https://rinkeby.infura.io/v3/11f0fd6b73af4103bf29e9d7acaa2fc0"
  // your endpoint
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(ABI))  
    .deploy({ data: '0x' + bytecode }) 
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] })
    .catch('Contract NOT deployed ', err => console.log(err));
    
    console.log("Contract deployed to", result.options.address); 
};
deploy();