import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory"; //import the contract
import Layout from "../components/Layout";
import { Link } from "../routes";
//import 'semantic-ui-css/semantic.min.css';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }
  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      }; //fluid:true makes the cards fill width of container
    });
    return <Card.Group items={items} />; //get card group component and return it from the renderCampaigns function
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

            <Link route='/campaigns/new'>
              <a>                
                <Button
                  floated="right"  //anchor tag <a> lets us right click and open in new tab
                  content="Create Campaign"
                  icon="add circle"
                  primary  //primary = primary={true} adds some nice blue styling
                />
              </a>
            </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
