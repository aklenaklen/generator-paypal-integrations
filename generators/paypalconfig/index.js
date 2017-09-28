'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const pkg = require('../../package.json');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.option('store-all', {
            type: Boolean,
            default: false,
            desc: "Stores all prompts for testing only",
        });
    }

    prompting() {
        const prompts = [{
            type: 'input',
            name: 'clientid',
            message: 'PayPal REST Client ID',
            store: true,
        },
        {
            type: this.options.storeAll ? 'input' : 'password',
            name: 'clientsecret',
            message: 'PayPal REST Client Secret',
            store: this.options.storeAll,
        },
        {
            type: 'list',
            choices: ["sandbox", "production"],
            name: 'environment',
            message: 'PayPal Environment',
            default: "sandbox",
            store: true,
        },
        {
            type: 'input',
            name: 'webhookroute',
            message: 'Webhook Route',
            default: "/paypal/webhooks/listen",
            when: () => this.options.webhook,
            store: true,
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {

        this.fs.extendJSON(this.destinationPath(".env.development.json"), {
            "PAYPAL_MODE": this.props.environment,
            "PAYPAL_CLIENT_ID": this.props.clientid,
            "PAYPAL_CLIENT_SECRET": this.props.clientsecret,
            "PAYPAL_WEBHOOK_ROUTE": this.props.webhookroute,
        });
    }
};
