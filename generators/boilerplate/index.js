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
            type: 'list',
            name: 'deploy',
            message: 'Deploy to:',
            default: "None",
            choices: ["C9", "None"],
        },
        {
            type: 'confirm',
            name: 'vscode',
            message: 'Using vscode?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'cors',
            message: 'Enable CORS on public connection?',
            default: false,
        }];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
            this.config.set(this.props);
        });
    }

    writing() {

        if (this.props.deploy === "C9") {
            this.fs.copy(this.templatePath("_c9"), this.destinationPath(".c9"));
        }

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
                    importname: tPath.name,
                    importvariable: camelcase(tPath.name)
                })
            }
        });
        this.fs.copyTpl(
            this.templatePath("src/"),
            this.destinationPath("src/"),
            { files: files, ...this.props }
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
