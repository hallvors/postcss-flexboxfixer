var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-unprefixer', function () {

    /* Write tests here */

    it('rewriting -webkit-box', function (done) {
        test('b{display: -webkit-box;}', 'b{display: flex;display: -webkit-box;}', {}, done);
    });
    it('rewriting -webkit-box-pack', function (done) {
        test('b{-webkit-box-pack: justify;}', 'b{justify-content: space-between;-webkit-box-pack: justify;}', {}, done);
    });

});
