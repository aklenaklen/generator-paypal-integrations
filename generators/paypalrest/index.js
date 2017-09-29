'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const pkg = require('../../package.json');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.option('say', {
            type: Boolean,
            default: true,
            desc: "Yosay!"
        });

        this.option('store-all', {
            type: Boolean,
            default: false,
            desc: "Stores all prompts for testing only"
        });
    }

    initializing() {
        if (this.options["say"]) {
            this.log(yosay(
                `Welcome to ${chalk.red('PayPal-REST')} generator! v${pkg.version}`
            ));
        }
        this.composeWith(require.resolve('../boilerplate'));
        this.composeWith(require.resolve('../paypalconfig'), { storeAll: this.options.storeAll});
    }

    prompting() {

        const prompts = [{
            type: 'list',
            choices: ["public", "private"],
            name: 'access',
            message: 'Public or Private connection?  Public connection is accessible outside localhost',
            default: "public",
            store: true,
        },
        {
            type: 'confirm',
            name: 'cors',
            message: 'Enable CORS?',
            default: false,
            store: true,
        },
        {
            type: 'confirm',
            name: 'webhookHandler',
            message: 'Custom Webhook Handler?',
            default: false,
            store: true,
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath("plugins/paypal-rest.ts"),
            this.destinationPath("src/plugins/paypal-rest.ts"),
            this.props,
        );


        this.fs.extendJSON(this.destinationPath(".env.development.json"), {
            "PAYPAL_HAPI_CONNECTION": this.props.access,
            "PAYPAL_WEBHOOK_ROUTE": this.props.webhookroute,
            "PAYPAL_REST_ROUTES": "",
        });
    }

    install() {
        this.yarnInstall(["hapi-paypal"], { 'save': true });
    }

    end() {
        console.log("View configuration at https://github.com/trainerbill/hapi-paypal")
    }
};
