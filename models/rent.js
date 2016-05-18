var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var RentSchema = new Schema({
    tool_id: {type: String},
    user_id: {type: String},
    num: {type: Number}
});
var rent = mongoose.model("rent", RentSchema);

exports.Rent = rent;

exports.newRentSave = function (tool_id, user_id, num, callback) {
    var re = new rent();
    re.tool_id = tool_id;
    re.user_id = user_id;
    re.num = num;
    re.save(callback);
};

exports.findRentById = function (_id, callback) {
    rent.find({'_id': _id},callback);
};

exports.findRentsByUserId = function (user_id, callback) {
    rent.find({'user_id': user_id}, callback);
};

exports.findAllRents = function (callback) {
    rent.find({}, callback);
};

exports.update = function (_id, num, callback) {
    if (num) {
        rent.findByIdAndUpdate(_id, {$inc: {num: -num}}, callback);
    } else {
        err = {message: 'num不能为空！'};
        return callback(err, user);
    }
};
exports.remove = function (rent_id, callback) {
    if (rent_id) {
        rent.remove({_id: rent_id}, callback);
    }
    else {
        err = {};
        err.message = 'rent_id不能为空！';
        return callback(err, user);
    }
};

