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
            `Welcome to ${chalk.red('PayPal Rest API')} generator! v${pkg.version}`
        ));

        const prompts = [{
            type: 'confirm',
            name: 'dotenv',
            message: 'Create .env file?',
            default: true,
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {

        this.fs.copy(
            this.templatePath("plugins/paypal-rest.ts"),
            this.destinationPath("src/plugins/paypal-rest.ts")
        );


        if (this.props.dotenv) {
            this.fs.copyTpl(
                this.templatePath("_env"),
                this.destinationPath(".env"),
                this.props
            );
        }
    }

    install() {
        this.yarnInstall(["hapi-paypal"], { 'save': true });
    }

    end() {
        console.log("View configuration at https://github.com/trainerbill/hapi-paypal")
    }
};
