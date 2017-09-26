'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const camelcase = require('camelcase');

module.exports = class extends Generator {
    prompting() {

        const prompts = [{
            type: 'input',
            name: 'packageName',
            message: 'Project Name:',
        },
        {
            type: 'confirm',
            name: 'vscode',
            message: 'Using vscode?',
            default: false,
        },];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {

        this.fs.copy(this.templatePath("_editorconfig"), this.destinationPath(".editorconfig"));
        this.fs.copy(this.templatePath("_gitignore"), this.destinationPath(".gitignore"));
        this.fs.copy(this.templatePath("_nycrc"), this.destinationPath(".nycrc"));
        this.fs.copy(this.templatePath("tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copy(this.templatePath("tslint.json"), this.destinationPath("tslint.json"));
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.props);
        this.fs.copy(this.templatePath("_vscode"), this.destinationPath(".vscode"));

        const files = [];
        this.fs.store.each((file, index) => {
            const tPath = path.parse(file.path);
            if(tPath.dir === `${process.cwd()}/src/plugins`) {
                files.push({
                    filename: tPath.base,
                    variable: camelcase(tPath.name)
                })
            }
        });
        this.fs.copyTpl(
            this.templatePath("src/"),
            this.destinationPath("src/"),
            { files: files }
        );
    }

    install() {
        this.installDependencies({
            bower: false,
            npm: false,
            yarn: true
        });
    }
};
