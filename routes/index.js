var express = require('express');
var router = express.Router();
var tool=require("../models/tool");
var rent=require("../models/rent");
var User=require("../models/user");
var crypto = require('crypto');
var configure = require('../config');
/* GET home page. */

//获得所有工具
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

//获得所有租借信息
router.get("/tool/rent",function(req,res){
    rent.findAllRents(function(err, rents){
            if(err){
                return res.status(200).json(err);
            }
            else
                return res.status(200).json(rents);
        });
});

//获得所有用户
router.get("/users",function(req,res){
        User.findAllUsers(function(err, rents){
            if(err){
                return res.status(200).json(err);
            }
            else
                return res.status(200).json(rents);
        });
});

//用户注销
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

//处理租借请求
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

//获得指定租借信息
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

//归还指定工具
router.post("/tool/rent/return",function(req,res){
    if(req.session.user){
        rent.remove(req.body.rent_id,function (err,data) {
            console.log("err:" + err + 'data:' + data)
        })
        return res.status(200).json({message:'ok'});
    }

});

//注册
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
        if(user.NickName == 'admin'){
            return res.status(200).json({message:'ok',user:user});
        }else{
            return res.status(200).json({message:'ok',user:user});
        }
    });

});

//登录
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
            console.log("login======="+user)
            if(user.NickName == 'admin'){
                return res.status(200).json({message:'ok',user:user});
            }else{
                return res.status(200).json({message:'ok',user:user});
            }
        }
    });

});



module.exports = router;
