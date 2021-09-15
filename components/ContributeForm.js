import { Router } from '../routes';
import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault(); //to prevent form from submitting and rendering

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true });

        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether') //we are taking in ether
            });

            Router.replaceRoute(`/campaigns/${this.props.address}`); //pass in current route aka refresh
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: '' }); //value '' will clear form

    };

//exclude () in this.onSubmit() because we want to pass a reference
//we don't want to render immediately
//mark form component with error message
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}> 
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition="right"
                    />    
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Contribute!</Button>

            </Form>
        );
    }
}

export default ContributeForm;