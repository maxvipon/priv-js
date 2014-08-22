# priv-js [![NPM version](https://badge.fury.io/js/priv-js.svg)](http://badge.fury.io/js/priv-js) [![Build Status](https://travis-ci.org/maxvipon/priv-js.svg)](https://travis-ci.org/maxvipon/priv-js) [![Coverage Status](https://coveralls.io/repos/maxvipon/priv-js/badge.png)](https://coveralls.io/r/maxvipon/priv-js)

Helper library, that contains functions and methods which will help you form final BEMJSON object in `*.priv.js` files.

## Install

```
npm install priv-js
```

## Usage

```js
var Blocks = require('priv-js');
var blocks = new Blocks;
```

All `*.priv.js` files exports function:

```js
// button.priv.js
module.exports = function(blocks) {
    // ...
};
```

This function expects to get instance of `priv-js` object in first argument:

```js
var privFile = require('button.priv.js');
privFile(blocks);
```

## API

### Blocks()

Constructor. Returns `Blocks` instance, that have next methods:

### blocks.declare(name, object)

Declares object by name.

```javascript
blocks.declare('header', function(data) {
    return {
        block: 'header',
        content: data.name
    }
});

blocks.declare('utils', {
    format: fucntion(number) { ... },
    inverse: function(obj) { ... }
});
```

### blocks.get(name)

Get declared object by name.

```javascript
blocks.declare('price', function(data) {
    var utils = blocks.get('utils');
    return {
        block: 'price',
        content: utils.format(data.price) + 'руб.'
    }
});
```

### blocks.exec(name, args...)

Executes stored function with `args`. If type of stored object is not a function, exception will be thrown. Returns result of execution.

```javascript
blocks.declare('item', function(data) {
    return [
        { block: 'image' },
        blocks.exec('price');
        blocks.exec('debug', data.debug);
    ]
});
```

## Changelog

Changelog can be viewed on a [separate page](/CHANGELOG).

## Contribution

Please, read [contribution guide](/CONTRIBUTING.md) before creating issues or submitting issue.

## Tests

```
$ npm test
```
