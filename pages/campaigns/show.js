import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'; //C not c because we will probably use a campaign variable
import web3 from '../../ethereum/web3'; //to convert from wei
import ContributeForm from '../../components/ContributeForm';
import { Link } from "../../routes";


class CampaignShow extends Component {
    static async getInitialProps(props) { //dynamically get address
        //props.query.address is address of specific campgain
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        //console.log(summary); will return an object not an array
        //we will still access it like an array

        return {
            address: props.query.address,  //only getInitialProps knows the address
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };  //will call like this.props.manager
    }

    renderCards() { //we will make an array of objects
        const {
            balance, //in wei
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;      //destructure
        
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create a request to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description:
                  "You must contribute at least this much wei to become an approver",
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description:
                  "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description:
                  "Number of people who have already donated to this campaign",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                  "The balance is how much money this campaign has left to spend.",
            },
        ];
        return <Card.Group items={items} />;
    }

    render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
             
            {this.renderCards()}
            
            
            
            
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
              <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;