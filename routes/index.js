var express = require('express');
var router = express.Router();
var tool=require("../models/tool");
var rent=require("../models/rent");
var User=require("../models/user");
var crypto = require('crypto');
var configure = require('../config');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('index');
    }
    else{
        res.render("login");
    }
});

router.get('/index', function(req, res, next) {
    if(req.session.user){
        res.render('index');
    }
});

router.get('/home', function(req, res, next) {
    res.render('home');
});
router.get("/tool",function(req,res){


    if(req.session.user){
        tool.findAllTools(function(err, tools){
            if(err){
                return res.status(200).json(err);
            }
            else
                return res.status(200).json(tools);
        });

    }

});

router.get("/tool/rent",function(req,res){


    if(req.session.user){
        rent.findAllRents(function(err, rents){
            if(err){
                return res.status(200).json(err);
            }
            else
                return res.status(200).json(rents);
        });

    }

});


router.post("/tool/rent",function(req,res){
    if(req.session.user){
        tool.update(req.body.tool_id,req.body.rent_num, function (err,data) {
            console.log("err:" + err + 'data:' + data)
        })
        rent.newRentSave(req.body.tool_id,req.body.user_id,req.body.rent_num, function (err,data) {
            console.log("err:" + err + 'data:' + data)
        })
        return res.status(200).json({message:'ok'});
    }

});
router.post("/tool/rent/find",function(req,res){
    if(req.session.user){
        rent.findRentsByUserId(req.body.user_id,function(err, rents){
            if(err){
                return res.status(200).json(err);
            }
            else
                return res.status(200).json(rents);
        });
    }

});

router.post("/tool/rent/return",function(req,res){
    if(req.session.user){
        rent.remove(req.body.rent_id,function (err,data) {
            console.log("err:" + err + 'data:' + data)
        })
        return res.status(200).json({message:'ok'});
    }

});


router.post('/signup',function(req,res){
    var username=req.body.user;
    var password=req.body.password;

    // 密码md5加盐加密
    var md5 = crypto.createHash('md5'),
        password = md5.update(password + configure.password_salt).digest('hex');
    User.newUser(username, password, function (err, user) {
        if (err) {
            return res.status(200).json({message:err.message});

        }
        res.cookie(configure.auth_cookie_name, user._id, {
            maxAge: 1000 * 60 * 60 *24 * 30,
            signed: true
        });


        req.session.user = user;
        return res.status(200).json({message:'ok',user_id: user._id});
    });

});

router.post('/signin',function(req,res){
    var username=req.body.user;
    var password=req.body.password;

    var md5 = crypto.createHash('md5'),
        password = md5.update(password + configure.password_salt).digest('hex');

    User.login(username,password,function(err,user){
        if(!user){
            return res.status(200).json({message:"cant find user"});
        }
        if(err){
            return res.status(200).json({message:err.message});
        }
        if(user && user.password!=password){
            return res.status(200).json({message:"密码错误"});
        }
        else{
            res.cookie(configure.auth_cookie_name, user._id, {
                maxAge: 1000 * 60 * 60 *24 * 30,
                signed: true
            });
            req.session.user = user;
            return res.status(200).json({message:"ok",user_id: user._id});
        }
    });

});

router.get('/logout', function(req, res, next) {
    if(req.session.user){
        req.session.user=null;
        res.clearCookie(configure.auth_cookie_name, {
            maxAge: 1000 * 60 * 60 *24 * 30,
            signed: true
        });
        res.redirect('/');
    }
});


module.exports = router;
