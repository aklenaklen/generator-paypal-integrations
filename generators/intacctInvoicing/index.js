'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const pkg = require('../../package.json');

module.exports = class extends Generator {

    prompting() {

        const now = new Date();
        now.setDate(now.getDate() - 1 );
        const startDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

        const prompts = [{
            type: 'confirm',
            name: 'autoCreateInvoices',
            message: 'Do you want to automatically create invoices?',
            default: true,
            store: true,
        },
        {
            type: 'confirm',
            name: 'autoRefundInvoices',
            message: 'Do you want to automatically refund invoices?',
            default: true,
            store: true,
        },
        {
            type: 'input',
            name: 'invoiceCreateFrequency',
            message: 'Invoice create job frequency:',
            default: 'every 1 hour',
            store: true,
        },
        {
            type: 'input',
            name: 'invoiceRefundFrequency',
            message: 'Invoice refund job frequency:',
            default: 'every 1 day',
            store: true,
        },
        {
            type: 'input',
            name: 'intacctDefaultPaymentAccount',
            message: 'Default Intacct Payment Account ID',
            store: true,
        },
        {
            type: 'confirm',
            name: 'useCurrencyAccounts',
            message: 'Do you want to configure Intacct currency accounts?',
            default: false,
            store: true,
        },
        {
            type: 'checkbox',
            name: 'currencyAccounts',
            choices: ["USD"],
            message: 'Do you want to configure Intacct currency accounts?',
            when: (answers) => answers.useCurrencyAccounts,
            store: true,
        },
        {
            type: 'input',
            name: 'usdCurrencyAccount',
            message: 'USD Currency Account',
            default: false,
            when: (answers) => answers.currencyAccounts.indexOf("USD") !== -1,
            store: true,
        },
        {
            type: 'input',
            name: 'invoiceStartDate',
            message: 'Start Date.  Invoices prior to this date are not queried.',
            default: startDate,
            store: true,
            validate: (value) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.exec(value) ? true : false,
        },
        {
            type: 'input',
            name: 'paypalemail',
            message: 'PayPal Email address.',
            store: true,
        }];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {

        this.fs.extendJSON(this.destinationPath(".env.development.json"), {
            "PAYPAL_INVOICE_MERCHANT_EMAIL": this.props.paypalemail,
            "INTACCT_INVOICE_CREATE_AUTO": this.props.autoCreateInvoices,
            "INTACCT_INVOICE_REFUND_AUTO": this.props.autoRefundInvoices,
            "INTACCT_INVOICE_CREATE_LATER": this.props.invoiceCreateFrequency,
            "INTACCT_INVOICE_REFUND_LATER": this.props.invoiceRefundFrequency,
            "INTACCT_INVOICE_PAYMENT_DEFAULT_ACCOUNT": this.props.intacctDefaultPaymentAccount,
            "INTACCT_INVOICE_PAYMENT_USD_ACCOUNT": this.props.usdCurrencyAccount,
            "INTACCT_INVOICE_START_DATE": this.props.invoiceStartDate,
        });
    }
};
