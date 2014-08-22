var Blocks = (function() {

/**
 * Blocks: Storage of blocks functions that generats BEMJSON
 * 
 * @constructor
 */
function Blocks() {
    /**
     * Объект для хранения блоков.
     * 
     * @type {Object}
     * @private
     */
    this._methods = {};

    /**
     * Неймспейс для библиотек.
     * Сюда можно писать различный функционал для дальнейшего использования.
     *
     * @example
     * ```javascript
     * blocks.lib.helpers = blocks.lib.helpers || {};
     * blocks.lib.helpers.inverse = blocks.lib.helpers.inverse || function(obj) { ... };
     * ```
     * 
     * @type {Object}
     */
    this.lib = {};
}

Blocks.prototype = {

    /**
     * Декларация блока по имени.
     *
     * @example
     * ```javascript
     * blocks.declare('header', function(data) {
     *     return {
     *         block: 'header',
     *         content: data.name
     *     }
     * });
     *
     * blocks.declare('utils', {
     *     format: fucntion(number) { ... },
     *     inverse: function(obj) { ... }
     * });
     * ```
     *
     * @param   {String} name   Block name
     * @param   {*}      method Block function
     * @returns {Blocks}
     */
    declare: function(name, method) {
        if (!name || typeof name !== 'string') {
            throw new TypeError('Argument `name` must be a string');
        }

        if (method === null || method === undefined) {
            throw new TypeError('Argument `method` must not be Null or undefined');
        }

        this._methods[name] = method;

        return this;
    },

    /**
     * Возвращает priv-функцию блока по названию.
     *
     * @example
     * ```javascript
     * blocks.declare('utils', {
     *     format: fucntion(number) { ... },
     *     inverse: function(obj) { ... }
     * });
     *
     * blocks.declare('price', function(data) {
     *     var utils = blocks.get('utils');
     *     return {
     *         block: 'price',
     *         content: utils.format(data.price) + 'руб.'
     *     }
     * });
     * ```
     *
     * @param   {String}    name    Block name
     * @returns {Function}
     */
    get: function(name) {
        if (!name || typeof name !== 'string') {
            throw new TypeError('Argument `name` must be a string');
        }

        var method = this._methods[name];

        if (!method) {
            throw new Error('Priv method `' + name + '` was not declared');
        }

        return method;
    },

    /**
     * Выполняет priv-функцию блока, возвращает результат выполнения.
     *
     * @example
     * ```javascript
     * blocks.declare('content', function(data) {
     *     return [
     *         { block: 'logo' },
     *         blocks.exec('header');
     *         blocks.exec('debug', data.debug);
     *     ]
     * });
     * ```
     *
     * @param   {String} name Block name
     * @returns {*}
     */
    exec: function(name) {
        if (!name || typeof name !== 'string') {
            throw new TypeError('Argument `name` must be a string');
        }

        var method = this._methods[name];

        if (!method) {
            throw new Error('Priv method `' + name + '` was not declared');
        }

        var methodType = typeof method,
            startsWithVowel;

        if (methodType !== 'function') {
            startsWithVowel = ['object', 'undefined'].indexOf(methodType);
            throw new TypeError('Can\'t exec priv method `' + name + '` because It\'s a' +
                (startsWithVowel ? 'n ' : ' ') + methodType + ' not a function');
        }

        var args = Array.prototype.slice.call(arguments, 1);

        return method.apply(this, args);
    }

};

return Blocks;

})();

if (typeof module !== 'undefined') {
    module.exports = Blocks;
}
