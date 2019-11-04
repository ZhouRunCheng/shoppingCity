var express = require('express');
var router = express.Router();
let User = require('./../models/users');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let key = require('./../config/keys');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 登录接口
router.post('/login', (req, res, next) => {
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  User.findOne(params, (err, userDoc) => {
    if(err){
      res.json({
        status: '1',
        msg: '登录失败'
      });
    }else{
      if(userDoc){
          res.cookie("Id", userDoc.id, {
              path: '/',
              maxAge: 1000*60*60
          });
          res.cookie("userName", userDoc.userName, {
              path: '/',
              maxAge: 1000*60*60
          });
        let rule = {
          id: userDoc.id,
          userName: userDoc.userName
        };
        jwt.sign(rule, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if(err) {
            res.json({
              status: '1',
              msg: '创建token失败'
            });
          }else{
            res.json({
              status: '0',
              msg: '登录成功',
              result: {
                  userName: userDoc.userName,
                  userId: userDoc.userId,
                  cartCount: userDoc.cartList.length
              },
              //  token 固定格式返回“Bearer ”token
              token: "Bearer " + token
            });
          }
        });
      }
    }
  })
});

// 获取个人信息
router.get("/personalPage",passport.authenticate("jwt", { session: false }),(req, res) => {
    res.json({
        status: '0',
        msg: "success",
        result: req.user || "获取信息失败"
    })
    // console.log(req.userDoc);
});

//  登出接口
router.post("/loginOut",(req, res, next) => {
    res.cookie("Id", "", {
        path: '/',
        maxAge: -1
    });
    res.cookie("userName", "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: "登出成功",
        result: ''
    })
});


/*
* 检查是否登录
* 检查cookie是否存在
* */

router.post("/checkLogin", (req, res, next) => {
    console.log(req.cookies.Id);
    if(req.cookies.Id){
        res.json({
            status: '0',
            msg: '已登录',
            result: {
                id: req.cookies.Id,
                userName: req.cookies.userName
            }
        })
    }else{
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })
    }
})


module.exports = router;
