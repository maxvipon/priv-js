var Blocks = require('../lib/priv');
require('chai').should();

describe('blocks.has', function() {
    var blocks;
    beforeEach(function() {
        blocks = new Blocks();
    });
    it('should return true if priv method is declared', function() {
        blocks.declare('utils', {});
        blocks.declare('button', function () {});

        blocks.has('utils').should.be.true();
        blocks.has('button').should.be.true();
    });
    it('should return false if priv method is not declared', function() {
        blocks.has('utils').should.be.false();
        blocks.has('button').should.be.false();
    });
    it('should throw exception if name is not a string', function() {
        (blocks.has.bind(blocks, 1)).should.throw(TypeError);
        (blocks.has.bind(blocks, null)).should.throw(TypeError);
        (blocks.has.bind(blocks, {})).should.throw(TypeError);
        (blocks.has.bind(blocks, [])).should.throw(TypeError);
        (blocks.has.bind(blocks, true)).should.throw(TypeError);
        (blocks.has.bind(blocks, function() {})).should.throw(TypeError);
    });
});
