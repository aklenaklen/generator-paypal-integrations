'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const config = {
    name: "test-package"
}

module.exports = class extends Generator {
    prompting() {

        const prompts = [{
            type: 'input',
            name: 'packageName',
            message: 'Project Name:',
        }];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {

        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(),
            this.props,
            null,
            { globOptions: { dot: true } }
        );

    }

    install() {
        // this.installDependencies();
    }
};
