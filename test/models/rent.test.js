var db = require('../../models/db');
var rent = require('../../models/rent');
var uuid = require('node-uuid');
var expect = require('chai').expect;

describe('rent模块测试', function () {
    var random_tool_id = uuid.v1();
    var random_user_id = uuid.v1();
    var random_num = Math.floor(Math.random() * 100);
    var _id;

    it('测试newRentSave', function (done) {
        rent.newRentSave(random_tool_id, random_user_id, random_num, function (err, data) {
            expect(err).to.be.equal(null);
            expect(data.tool_id).to.be.equal(random_tool_id);
            expect(data.user_id).to.be.equal(random_user_id);
            expect(data.num).to.be.equal(random_num);
            _id = data._id;
            done();
        });
    });

    it('测试findRentById', function (done) {
        rent.findRentById(_id, function (err, data) {
            expect(err).to.be.equal(null);
            expect(data.tool_id).to.be.equal(random_tool_id);
            expect(data.user_id).to.be.equal(random_user_id);
            expect(data.num).to.be.equal(random_num);
        });
        done();
    });

    //
    //it('测试findRentsByUserId', function (done) {
    //    rent.findRentsByUserId(random_user_id, function (err, data) {
    //        console.log(err + data);
    //        //expect(err).to.be.equal(null);
    //        //expect(data instanceof Array).to.be.ok;
    //        //expect(data[0] instanceof Object).to.be.ok;
    //        done();
    //    });
    //});

    //
    //it('测试findAllRents', function (done) {
    //    rent.findAllRents(function (err, data) {
    //        expect(err).to.be.equal(null);
    //        expect(data instanceof Array).to.be.ok;
    //        expect(data[0] instanceof Object).to.be.ok;
    //        done();
    //    });
    //});
    //

    it('测试update', function (done) {
        rent.update(_id, 10, function (err, data) {
            expect(err).to.be.equal(null);
            expect(data.num).to.be.equal(random_num - 10);
        });
        done();
    });
});