var db = require('../../models/db');
var tool = require('../../models/tool');
var uuid = require('node-uuid');
var expect = require('chai').expect;

describe('tool模块测试', function () {
    var random_type = uuid.v1();
    var random_dept = uuid.v1();
    var random_num = Math.floor(Math.random() * 100);
    var _id;

    it('测试newToolSave', function (done) {
        tool.newToolSave(random_type, random_dept, random_num, false, function (err) {
            expect(err).to.be.equal(null);
            done();
        });
    });
    //
    it('测试findToolById', function (done) {
        tool.findToolById(_id, function (err, data) {
            expect(err).to.be.equal(null);
            expect(data.random_type).to.be.equal(random_type);
            expect(data.random_dept).to.be.equal(random_dept);
            expect(data.num).to.be.equal(random_num);
        });
        done();
    });

    
    //it('测试findRentsByUserId', function (done) {
    //    tool.findRentsByUserId(random_user_id, function (err, data) {
    //        console.log(err + data);
    //        //expect(err).to.be.equal(null);
    //        //expect(data instanceof Array).to.be.ok;
    //        //expect(data[0] instanceof Object).to.be.ok;
    //        done();
    //    });
    //});

    //
    //it('测试findAllRents', function (done) {
    //    tool.findAllRents(function (err, data) {
    //        expect(err).to.be.equal(null);
    //        expect(data instanceof Array).to.be.ok;
    //        expect(data[0] instanceof Object).to.be.ok;
    //        done();
    //    });
    //});
    //
    //
    //it('测试update', function (done) {
    //    tool.update(_id, 10, function (err, data) {
    //        expect(err).to.be.equal(null);
    //        expect(data.num).to.be.equal(random_num - 10);
    //    });
    //    done();
    //});
});