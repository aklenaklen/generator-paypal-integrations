'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const pkg = require('../../package.json');

module.exports = class extends Generator {

    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            `Welcome to the best ${chalk.red('generator-paypal-integrations')} generator! v${pkg.version}`
        ));

        const prompts = [{
            type: 'list',
            name: 'plugins',
            message: 'Which integrations would you like to enable',
            choices: ["PayPal-REST-Server", "PayPal-Intacct"],
        },];

        return this.prompt(prompts).then(props => {

            if (props.plugins.indexOf("PayPal-Intacct") !== -1) {
                this.composeWith(require.resolve('../intacct'));
            }
            if (props.plugins.indexOf("PayPal-REST-Server") !== -1) {
                this.composeWith(require.resolve('../paypalrest'));
            }

        });
    }
};
