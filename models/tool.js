var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ToolSchema = new Schema({
    type: {type: String},
    dept: {type: String},
    num: {type: Number},
    expensive: {type: Boolean}
});
var tool = mongoose.model("tool", ToolSchema);

exports.Tool = tool;

exports.newToolSave = function (type, dept, num, exprnsive, callback) {
    var too = new tool();
    too.type = type;
    too.dept = dept;
    too.num = num;
    too.expensive = exprnsive;
    too.save(callback);
};
exports.findToolById = function (_id, callbck) {
    tool.findById(_id, callbck);
};

exports.findAllTools = function (callback) {
    tool.find({}, callback);
};

exports.update = function (tool_id, num, callback) {
    if (num) {
        tool.findByIdAndUpdate(tool_id, {$inc: {num: -num}}, callback);
    }
    else {
        err = {message :'num不能为空！'};
        return callback(err);
    }
};

