//a list of requests
import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query; //Why the { } ?
        const campaign = Campaign(address); //instance of our campaign

        //passing in the approversCount, a campaign (not a request) property to request page
        const approversCount = await campaign.methods.approversCount().call();

        const requestCount = await campaign.methods.getRequestsCount().call();
        //issue all calls in one go and wait for them all to be resolved using the promise.call helper
        
        //Array().fill is used to iterate through multiple values of index
        const requests = await Promise.all(
            Array(parseInt(requestCount)) //request count is a number inside a string
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call()
            })
        );
        //console.log(requests);

        return { address, requests, requestCount, approversCount };
    }

    //helper method to render each request row inside our campaign
    //iterate over list of requests. For each request return a new request row
    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
             <RequestRow
                key={index}        //key property is part of react. it wants us to render key with list of components
                id={index}          //these properties are being passed to RequestRow
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
            );
        });
    }


    render() {
        //ES 2015 destructuring to help making a table easier
        //These will be pulled off table tag
        const {Header, Row, HeaderCell, Body } = Table;
        return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>{this.renderRows()}</Body>
            </Table>

        </Layout>

        
        );
    }
}

export default RequestIndex;