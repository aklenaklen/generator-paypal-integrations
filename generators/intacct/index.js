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
                `Welcome to ${chalk.red('Intacct')} generator! v${pkg.version}`
            ));
        }
        this.composeWith(require.resolve('../boilerplate'));
        this.composeWith(require.resolve('../paypalconfig'), { storeAll: this.options.storeAll, forceWebhook: true });
    }

    prompting() {

        const prompts = [{
            type: 'input',
            name: 'intacctsenderid',
            message: 'Intacct Sender ID',
            store: true,
        },
        {
            type: this.options.storeAll ? 'input' : 'password',
            name: 'intacctsenderpassword',
            message: 'Intacct Sender Password',
            store: this.options.storeAll,
        },
        {
            type: 'input',
            name: 'intacctuserid',
            message: 'Intacct User ID',
            store: true,
        },
        {
            type: this.options.storeAll ? 'input' : 'password',
            name: 'intacctuserpassword',
            message: 'Intacct User Password',
            store: this.options.storeAll,
        },
        {
            type: 'input',
            name: 'intacctcompanyid',
            message: 'Intacct Company ID',
            store: true,
        },
        {
            type: 'checkbox',
            name: 'functionality',
            message: 'What Intacct functionality would you like to enable?',
            choices: ["Invoicing"],
            store: true,
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
            if (this.props.functionality.indexOf("Invoicing") !== -1) {
                this.composeWith(require.resolve('../intacctInvoicing'));
            }
        });
    }

    writing() {
        this.fs.copy(
            this.templatePath("plugins/paypal-intacct-invoicing.ts"),
            this.destinationPath("src/plugins/paypal-intacct-invoicing.ts")
        );


        this.fs.extendJSON(this.destinationPath(".env.development.json"), {
            "INTACCT_SENDER_ID": this.props.intacctsenderid,
            "INTACCT_SENDER_PASSWORD": this.props.intacctsenderpassword,
            "INTACCT_USER_ID": this.props.intacctuserid,
            "INTACCT_USER_PASSWORD": this.props.intacctuserpassword,
            "INTACCT_COMPANY_ID": this.props.intacctcompanyid,
        });
    }



    install() {
        this.yarnInstall(["paypal-integrations-intacct"], { 'save': true });
    }

    end() {
        console.log("View configuration at https://github.com/trainerbill/hapi-middleman-paypal-intacct")
    }
};
