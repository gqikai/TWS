var mongoose = require('mongoose');

var Schema=mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var RentSchema=new Schema({
    tool_id: {type: String},
    user_id: {type: String},
    num: {type: Number}
});

var rent=mongoose.model("rent",RentSchema);
exports.Rent=rent;
exports.newRentSave = function (tool_id,user_id,num, callback) {
    var re = new rent();
    re.tool_id = tool_id;
    re.user_id = user_id;
    re.num = num;
    re.save(callback);
};

exports.findAllRents=function(callbck){
    rent.find(function(err,rents){
        if(err){
            return callbck(err);
        }

        return callbck(err,rents);
    });
};

exports.update=function(rent_id,num,callback){
    if(num){
        rent.findByIdAndUpdate(rent_id, { $inc:{ num: -num }}, callback);
    }
    else{
        console.log("else happend")
    }
};
exports.remove=function(rent_id,callback){
    if(rent_id){
        rent.remove({_id: rent_id},callback);
    }
    else{
        console.log("else rent_id happend")
    }
};

exports.findRentsByUserId=function(user_id,callbck){
    rent.find({user_id:user_id},function(err,rent){
        if(err){
            return callbck(err);
        }

        return callbck(err,rent);
    });
};
