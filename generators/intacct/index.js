'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const pkg = require('../../package.json');

module.exports = class extends Generator {
    initializing() {
        this.composeWith(require.resolve('../boilerplate'));
    }

    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            `Welcome to ${chalk.red('Intacct')} generator! v${pkg.version}`
        ));

        const prompts = [{
            type: 'checkbox',
            name: 'paypalIntacct',
            message: 'What Intacct functionality would you like to enable?',
            choices: ["Invoicing"],
        },
        {
            type: 'confirm',
            name: 'dotenv',
            message: 'Create .env file?',
            default: false,
        },
        {
            type: 'list',
            name: 'deploy',
            message: 'Deploy to:',
            default: "None",
            choices: ["C9", "None"],
        }];

        return this.prompt(prompts).then(props => {
            const now = new Date();
            now.setDate(now.getDate() - 1 );
            props.invoiceStartDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
            this.props = props;
            console.log(this.props);
        });
    }

    writing() {

        this.fs.copy(
            this.templatePath("plugins/paypal-intacct-invoicing.ts"),
            this.destinationPath("src/plugins/paypal-intacct-invoicing.ts")
        );


        if (this.props.dotenv) {
            this.fs.copyTpl(
                this.templatePath("_env"),
                this.destinationPath(".env"),
                this.props
            );
        }

        if (this.props.deploy === "C9") {
            this.fs.copy(this.templatePath("_c9"), this.destinationPath(".c9"));
        }
    }

    install() {
        this.yarnInstall(["hapi-middleman-paypal-intacct"], { 'save': true });
    }
};
