
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function(done) {
        var f = function () {
            console.log('hello');
            expect(4 + 5).to.be.equal(5);
            done();
        };
        setTimeout(f, 1000);
  });
});
//
//describe('加法函数的测试', function() {
//    it('1 加 1 应该等于 2', function() {
//                expect(4 + 5).to.be.equal(5);
//    });
//});