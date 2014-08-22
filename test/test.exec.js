var Blocks = require('../lib/priv');
require('chai').should();

describe('blocks.exec', function() {
    var blocks;
    beforeEach(function() {
        blocks = new Blocks();
    });
    it('should exec priv method', function() {
        blocks.declare('button', function() {
            return {
                block: 'button',
                content: 'Button'
            };
        });
        var bemjson = blocks.exec('button');
        bemjson.should.be.an('object');
        bemjson.should.deep.equal({
            block: 'button',
            content: 'Button'
        });
    });
    it('should throw exception if name is not a string', function() {
        (blocks.exec.bind(blocks, 1)).should.throw(TypeError);
        (blocks.exec.bind(blocks, null)).should.throw(TypeError);
        (blocks.exec.bind(blocks, {})).should.throw(TypeError);
        (blocks.exec.bind(blocks, [])).should.throw(TypeError);
        (blocks.exec.bind(blocks, true)).should.throw(TypeError);
        (blocks.exec.bind(blocks, function() {})).should.throw(TypeError);
    });
    it('should throw exception if method nod declared', function() {
        (blocks.exec.bind(blocks, 'button')).should.throw(Error);
    });
    it('should throw exception if method is not a function', function() {
        blocks.declare('button', 1);
        (blocks.exec.bind(blocks, 'button')).should.throw(Error);
        blocks.declare('button', '1');
        (blocks.exec.bind(blocks, 'button')).should.throw(Error);
        blocks.declare('button', {});
        (blocks.exec.bind(blocks, 'button')).should.throw(Error);
        blocks.declare('button', []);
        (blocks.exec.bind(blocks, 'button')).should.throw(Error);
        blocks.declare('button', true);
        (blocks.exec.bind(blocks, 'button')).should.throw(Error);
    });
});
