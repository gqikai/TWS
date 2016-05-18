var func = function () {
    console.log('hello -- a');
}

exports.test = function (callback) {
    console.log(callback);
    callback();
}