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

describe('postcss-flexboxfixer', function () {

    /* Write tests here */

    it('rewriting -webkit-box', function (done) {
        test('b{display: -webkit-box;}', 'b{display: -webkit-box;display: flex;}', {}, done);
    });
    it('rewriting -webkit-box-pack', function (done) {
        test('b{-webkit-box-pack: justify;}', 'b{-webkit-box-pack: justify;justify-content: space-between;}', {}, done);
    });
    it('rewriting -moz-box', function (done) {
        test('b{display: -moz-box;}', 'b{display: -moz-box;display: flex;}', {}, done);
    });
    it('rewriting -moz-box-pack', function (done) {
        test('b{-moz-box-pack: justify;}', 'b{-moz-box-pack: justify;justify-content: space-between;}', {}, done);
    });
    it('rewriting -ms-box', function (done) {
        test('b{display: -ms-box;}', 'b{display: -ms-box;display: flex;}', {}, done);
    });
    it('rewriting -ms-box-pack', function (done) {
        test('b{-ms-box-pack: justify;}', 'b{-ms-box-pack: justify;justify-content: space-between;}', {}, done);
    });
    it('rewriting -webkit-box', function (done) {
        test('b{display: -webkit-box;}', 'b{display: -webkit-box;display: flex;}', {}, done);
    });
    it('rewriting -webkit-flex', function (done) {
        test('b{display: -webkit-flex;}', 'b{display: -webkit-flex;display: flex;}', {}, done);
    });
    it('rewriting -moz-box', function (done) {
        test('b{display: -moz-box;}', 'b{display: -moz-box;display: flex;}', {}, done);
    });
    it('rewriting -ms-flexbox', function (done) {
        test('b{display: -ms-flexbox;}', 'b{display: -ms-flexbox;display: flex;}', {}, done);
    });
    it('rewriting -webkit-inline-box', function (done) {
        test('b{display: -webkit-inline-box;}', 'b{display: -webkit-inline-box;display: inline-flex;}', {}, done);
    });
    it('rewriting -webkit-inline-flex', function (done) {
        test('b{display: -webkit-inline-flex;}', 'b{display: -webkit-inline-flex;display: inline-flex;}', {}, done);
    });
    it('rewriting -moz-inline-box', function (done) {
        test('b{display: -moz-inline-box;}', 'b{display: -moz-inline-box;display: inline-flex;}', {}, done);
    });
    it('rewriting -ms-inline-flexbox', function (done) {
        test('b{display: -ms-inline-flexbox;}', 'b{display: -ms-inline-flexbox;display: inline-flex;}', {}, done);
    });

});
