# PRIV

PRIV — это библиотека для функций БЭМ-блоков, которые динамически создают BEMJSON.

## Установка

```
npm install priv
```

## Использование

priv-файлы в проекте имеют суффикс `priv.js`. Например, `button.priv.js`. Файл формируется в формате CommonJS для NodeJS:

```javascript
module.exports = function(blocks) {
    // ...
};
```

## Методы

### blocks.declare

Декларация блока по имени.

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

### blocks.get

Возвращает priv-функцию блока по названию.

```javascript
blocks.declare('price', function(data) {
    var utils = blocks.get('utils');
    return {
        block: 'price',
        content: utils.format(data.price) + 'руб.'
    }
});
```

### blocks.exec

Выполняет priv-функцию блока, возвращает результат выполнения.

```javascript
blocks.declare('item', function(data) {
    return [
        { block: 'image' },
        blocks.exec('price');
        blocks.exec('debug', data.debug);
    ]
});
```

## История изменений

История изменений на [отдельной странице](/CHANGELOG).

## Разработка

Руководство на [отдельной странице](/CONTRIBUTION.md).

## Запуск тестов

```
$ npm test
```
