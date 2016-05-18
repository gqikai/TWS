var db = require('../../models/db');
var tool = require('../../models/tool');
var uuid = require('node-uuid');
var expect = require('chai').expect;

describe('tool模块测试', function () {
    var random_type = uuid.v1();
    var random_dept = uuid.v1();
    var random_num = Math.floor(Math.random() * 100);
    var _id = '573c3ab9df443416041828d3';

    it('测试newToolSave', function (done) {
        tool.newToolSave(random_type, random_dept, random_num, false, function (err, data) {
            expect(err).to.be.equal(null);
            done();
        });
    });

    it('测试findToolById', function (done) {
        tool.findToolById(_id, function (err, data) {
            expect(err).to.be.equal(null);
            expect(data instanceof Object).to.be.ok;
        });
        done();
    });



    it('测试findAllTools', function (done) {
        tool.findAllTools(function (err, data) {
            expect(err).to.be.equal(null);
            expect(data instanceof Array).to.be.ok;
            expect(data[0] instanceof Object).to.be.ok;
            done();
        });
    });


    it('测试update', function (done) {
        tool.update(_id, 10, function (err, data) {
            expect(err).to.be.equal(null);
            expect(data.num).to.be.equal(random_num - 10);
        });
        done();
    });
});