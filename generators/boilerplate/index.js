'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
        this.fs.copy(this.templatePath("static/"), this.destinationPath(), { globOptions: { dot: true } });
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.props);
    }

    install() {
        // this.installDependencies();
    }
};
