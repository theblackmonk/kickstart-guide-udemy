import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
//{ Link } is a react component that allows us to render anchor tags and  navigate
//Router allows us to programatically redirect people page to page in our app
//after campaign creation I will auto reroute user back to homepage


class CampaignNew extends Component {
  state = {
    minimumContribution: "", //always assume user input is a string
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => { //reference version is much better
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts(); //list of accounts in metamask
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ //metamask will calculate gas //to get accounts if we have web3
          from: accounts[0],
        }); //created a campaign

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
