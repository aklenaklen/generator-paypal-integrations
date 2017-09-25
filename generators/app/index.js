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
            'Welcome to the best ' + chalk.red('generator-hapi-middleman') + ' generator! v' + pkg.version
        ));

        const prompts = [{
            type: 'checkbox',
            name: 'plugins',
            message: 'Which integrations would you like to enable',
            choices: ["PayPal-Intacct"],
        },
        {
            type: 'checkbox',
            name: 'paypalIntacct',
            message: 'What PayPal-Intacct functionality would you like to enable',
            choices: ["Invoicing"],
            when: (answers) => {
                return answers.plugins.indexOf("PayPal-Intacct") !== -1;
            }
        },
        {
            type: 'confirm',
            name: 'dotenv',
            message: 'Create .env file?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'vscode',
            message: 'Using vscode?',
            default: false,
        },
        {
            type: 'checkbox',
            name: 'deploy',
            message: 'Deploy to?',
            default: "None",
            choices: ["C9", "None"],
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath("src/"),
            this.destinationPath("src/"),
            this.props
        );

        if (this.props.plugins.indexOf("PayPal-Intacct") !== -1 && this.props.paypalIntacct.indexOf("Invoicing") !== -1) {
            this.fs.copy(
                this.templatePath("plugins/paypal-intacct-invoicing.ts"),
                this.destinationPath("src/plugins/paypal-intacct-invoicing.ts")
            );
        }

        if (this.props.dotenv) {
            this.fs.copyTpl(
                this.templatePath("_env"),
                this.destinationPath(".env"),
                this.props
            );
        }

        if (this.props.vscode) {
            this.fs.copyTpl(
                this.templatePath("_vscode"),
                this.destinationPath(".vscode"),
                this.props
            );
        }

        if (this.props.deploy === "C9") {
            this.fs.copy(this.templatePath("_c9"), this.destinationPath(".c9"));
        }
    }

    install() {
        this.installDependencies({
            bower: false,
            npm: false,
            yarn: true
        });
        if (this.props.plugins.indexOf("PayPal-Intacct") !== -1) {
            this.yarnInstall(["hapi-middleman-paypal-intacct"], { 'save': true });
        }
    }
};
