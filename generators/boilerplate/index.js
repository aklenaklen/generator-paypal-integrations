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
        },
        {
            type: 'confirm',
            name: 'c9',
            message: 'Deploying to C9?',
            default: false,
        }];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        if (this.props.c9) {
            this.fs.copy(this.templatePath("_c9"), this.destinationPath(".c9"));
        }
        this.fs.copy(this.templatePath("_editorconfig"), this.destinationPath(".editorconfig"));
        this.fs.copy(this.templatePath("_gitignore"), this.destinationPath(".gitignore"));
        this.fs.copy(this.templatePath("_nycrc"), this.destinationPath(".nycrc"));
        this.fs.copy(this.templatePath("tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copy(this.templatePath("tslint.json"), this.destinationPath("tslint.json"));
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.props);
    }

    install() {
        // this.installDependencies();
    }
};
