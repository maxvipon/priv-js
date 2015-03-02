var Blocks = require('../lib/priv');
require('chai').should();

describe('blocks.decl', function() {
    var blocks;
    beforeEach(function() {
        blocks = new Blocks();
    });
    it('should throw exception with no arguments', function() {
        (blocks.decl.bind(blocks)).should.throw();
    });
    it('should throw exception if name is not a string', function() {
        (blocks.decl.bind(blocks, 1)).should.throw(TypeError);
        (blocks.decl.bind(blocks, null)).should.throw(TypeError);
        (blocks.decl.bind(blocks, {})).should.throw(TypeError);
        (blocks.decl.bind(blocks, [])).should.throw(TypeError);
        (blocks.decl.bind(blocks, true)).should.throw(TypeError);
        (blocks.decl.bind(blocks, function() {})).should.throw(TypeError);
    });
    it('should throw exception if method is not defined', function() {
        (blocks.decl.bind(blocks, 'button')).should.throw(TypeError);
        (blocks.decl.bind(blocks, 'button', null)).should.throw(TypeError);
    });
    it('should not throw exception if all ok', function() {
        (blocks.decl.bind(blocks, 'button', 1)).should.not.throw();
        (blocks.decl.bind(blocks, 'button', '1')).should.not.throw();
        (blocks.decl.bind(blocks, 'button', {})).should.not.throw();
        (blocks.decl.bind(blocks, 'button', [])).should.not.throw();
        (blocks.decl.bind(blocks, 'button', true)).should.not.throw();
        (blocks.decl.bind(blocks, 'button', function() {})).should.not.throw();
    });
    it('should return self', function() {
        blocks.decl('true', true).should.be.an.instanceof(Blocks);
    });
});
