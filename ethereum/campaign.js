import web3 from './web3';
import Campaign from './build/Campaign.json';

//rather than hardcode the contract location, create a function that will dynamically pull from a new campaign
//calling this in another filw should return back an instance of our campaign contract
const campaign = (address) => {
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
};
export default campaign;