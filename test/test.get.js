var Blocks = require('../lib/priv');
require('chai').should();

describe('blocks.get', function() {
    var blocks;
    beforeEach(function() {
        blocks = new Blocks();
    });
    it('should get priv method', function() {
        blocks.declare('button', function() {
            return {
                block: 'button',
                content: 'Button'
            };
        });
        blocks.get('button').should.be.a('function');
    });
    it('should throw exception if name is not a string', function() {
        (blocks.get.bind(blocks, 1)).should.throw(TypeError);
        (blocks.get.bind(blocks, null)).should.throw(TypeError);
        (blocks.get.bind(blocks, {})).should.throw(TypeError);
        (blocks.get.bind(blocks, [])).should.throw(TypeError);
        (blocks.get.bind(blocks, true)).should.throw(TypeError);
        (blocks.get.bind(blocks, function() {})).should.throw(TypeError);
    });
    it('should throw exception if method is not declared', function() {
        (blocks.get.bind(blocks, 'button')).should.throw(Error);
    });
});
