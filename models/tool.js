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
exports.Rent=tool;
exports.newToolSave = function (type,num,exprnsive, callback) {
    var too = new tool();
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

    exports.update=function(tool_id,num,callback){
        if(num){
            tool.findByIdAndUpdate(tool_id, { $inc:{ num: -num }}, callback);
        }
        else{
            console.log("else happend")
        }
    };

exports.findToolById=function(tool_id,callbck){
    tool.find({tool_id:tool_id},function(err,tool){
        if(err){
            return callbck(err);
        }

        return callbck(err,tool);
    });
};
