[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Yeoman generator for PayPal Integrations

## Installation

### Install Node 8
Node 8 is required for this generator.
```
nvm use 8
```

### Install Yarn
You can use npm if you know what you are doing.  This documentation will use yarn.
```
npm install -g yarn
```

### Configure yarn
For linux/mac users only.  Windows users you will need to find a way to add "yarn global bin" to your executable location.
```
export PATH="$(yarn global bin):$PATH"
```

### Install Yeoman
First, install [Yeoman](http://yeoman.io) and generator-paypal-integrations using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
yarn global add yo
yarn global add generator-paypal-integrations
```

### Upgrade Generator
```
yarn global add generator-paypal-integrations --latest
```
or if you already generated a project
```
yarn gupdate
```

### Run subgenerator
* [PayPal REST Server](docs/paypalrest/index.md)
* [Intacct](docs/intacct/index.md)



## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Andrew Throener]()


[npm-image]: https://badge.fury.io/js/generator-paypal-integrations.svg
[npm-url]: https://npmjs.org/package/generator-paypal-integrations
[travis-image]: https://travis-ci.org/trainerbill/generator-paypal-integrations.svg?branch=master
[travis-url]: https://travis-ci.org/trainerbill/generator-paypal-integrations
[daviddm-image]: https://david-dm.org/trainerbill/generator-paypal-integrations.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/trainerbill/generator-paypal-integrations
[coveralls-image]: https://coveralls.io/repos/trainerbill/generator-paypal-integrations/badge.svg
[coveralls-url]: https://coveralls.io/r/trainerbill/generator-paypal-integrations
