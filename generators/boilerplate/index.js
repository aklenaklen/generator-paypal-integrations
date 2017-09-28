'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const camelcase = require('camelcase');
const pkg = require('../../package.json');
const path = require('path');

module.exports = class extends Generator {

    prompting() {
        const prompts = [{
            type: 'input',
            name: 'packageName',
            message: 'Project Name:',
            store: true,
        },
        {
            type: 'input',
            name: 'hostname',
            message: 'Hostname:',
            default: process.env.C9_HOSTNAME || "localhost",
            store: true,
        },
        {
            type: 'input',
            name: 'publicport',
            message: 'Public Port:',
            default: process.env.C9_PORT || 3000,
            store: true,
        },
        {
            type: 'input',
            name: 'privateport',
            message: 'Private Port:',
            default: 3001,
            store: true,
        },
        {
            type: 'confirm',
            name: 'vscode',
            message: 'Using vscode?',
            default: false,
            store: true,
        }];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        console.log("boilerplate writing");
        if (process.env.C9_HOSTNAME) {
            this.fs.copy(this.templatePath("_c9"), this.destinationPath(".c9"));
        }

        if (this.props.dotenv) {
            this.fs.copyTpl(this.templatePath("_env.development.json"), this.destinationPath(".env.development.json"), this.props);
        }

        this.fs.copy(this.templatePath("_editorconfig"), this.destinationPath(".editorconfig"));
        this.fs.copy(this.templatePath("_gitignore"), this.destinationPath(".gitignore"));
        this.fs.copy(this.templatePath("_nycrc"), this.destinationPath(".nycrc"));
        this.fs.copy(this.templatePath("tsconfig.json"), this.destinationPath("tsconfig.json"));
        this.fs.copy(this.templatePath("tslint.json"), this.destinationPath("tslint.json"));
        this.fs.copyTpl(this.templatePath("_package.json"), this.destinationPath("package.json"), this.props);
        this.fs.copy(this.templatePath("_vscode"), this.destinationPath(".vscode"));

        this.fs.extendJSON(this.destinationPath(".env.development.json"), {
            "HOSTNAME": this.props.hostname,
            "PUBLIC_PORT": this.props.publicport,
            "PRIVATE_PORT": this.props.privateport,
        });
    }

    conflicts() {
        // Not ideal but this requires the subgenerators write to plugins dir first.
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
            { files: files },
        );
    }

    install() {
        this.installDependencies({
            bower: false,
            npm: false,
            yarn: true
        });
    }

    end() {
        console.log(chalk.red("Configure the .env.development.json file and execute 'yarn start:dev'"));
    }
};
