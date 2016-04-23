var mongoose = require('mongoose');

var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var ToolSchema=new Schema({
    tool_id: {type: String},
    type: {type: String},
    num: {type: Number},
    expensive: {type: Boolean}
});

var tool=mongoose.model("tool",ToolSchema);
exports.Tool=tool;
exports.newToolSave = function (tool_id,type,num,exprnsive, callback) {
    var too = new tool();
    too.tool_id = tool_id;
    too.type = type;
    too.num = num;
    too.expensive = exprnsive;
    too.save(callback);
};
exports.findAllTools=function(callbck){
    tool.find(function(err,tools){
        if(err){
            return callbck(err);
        }

        return callbck(err,tools);
    });
};

exports.findToolById=function(tool_id,callbck){
    tool.find({tool_id:tool_id},function(err,tool){
        if(err){
            return callbck(err);
        }

        return callbck(err,tool);
    });
};

exports.findQueByQuestionId=function(que_id,callback){
    question.findByIdAndUpdate(que_id, { $inc:{ views: 1 }}, callback);
};

exports.findQueById=function(que_id,callback){
    question.findOne({_id:que_id},function(err,question){
       callback(err,question);
    });
};

