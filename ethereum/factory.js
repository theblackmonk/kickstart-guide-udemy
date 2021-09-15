import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    //'0xC0D5D5Bc6f39a34664ac10b6d7686e153F0ab9BB' kickstart 1
    //'0x286fD0C1Db01b1B5AdA32DCEe39EcAd43c825CF1' kickstart 1.5
    //'0x64cdDa678b350A4A4aCA17873051863D894d245F' //kickstart 2.5
    "0x1e5207242D22A3DC6e2a8787CA0f817798Db20F9" //udemy
);

export default instance;