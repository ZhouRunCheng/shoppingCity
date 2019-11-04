const express = require('express');
const router = express.Router();
const Goods = require('./../models/goods');
const mongoose = require('mongoose');
const User = require('./../models/users');

mongoose.connect('mongodb://127.0.0.1:27017/text', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
    console.log("mongoDB is connected !");
});
mongoose.connection.on("error", () => {
    console.log("mongoDB is error !");
});
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB is disconnected !");
});

// 二级路由
router.get('/list', (req, res, next) => {
    // res.send('hello')
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let skip = (page - 1) * pageSize;
    let priceGt = parseInt(req.query.priceGt);
    let priceLt = parseInt(req.query.priceLt);
    let params = {};
    if(priceLt !== 0){
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLt
            }
        };
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    if(req.query.sort){
        let sort = req.query.sort;
        goodsModel.sort({'salePrice': sort});
    }
    goodsModel.exec((err, doc) => {
        if(err){
            res.json({
                status: 1,
                msg: err.message
            })
        }else{
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

router.post('/addCart', (req, res, next) => {
    //  获取cookie中的ID
    let Id = req.cookies.Id;
    let productId = req.body.productId;
    console.log(productId);
    //  根据userId获取用户信息
    User.findOne({_id: Id}, (err, userDoc) => {
        if(err){
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        }else{
            if(userDoc){
                //  遍历cartList子文档中有没有匹配的id，有就让数量加一，没有就添加信息
                let goodsItem = '';
                userDoc.cartList.forEach((item) => {
                    if(item.productId == productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                })
                // 如果该商品已在购物车，则直接加一都存入数据库，否则就搜索商品数据库查找该商品信息
                if(goodsItem){
                    userDoc.save((saveErr, saveDoc) => {
                        if(saveErr){
                            res.json({
                                status: '1',
                                msg: saveErr.message
                            })
                        }else{
                            res.json({
                                status: '0',
                                msg: '已在购物车，数量加一',
                                result: 'Save Success'
                            })
                        }
                    });
                }else{
                    //  根据请求参数productId获取商品信息
                    Goods.findOne({productId: productId}, (err, productDoc) => {
                        if(err){
                            res.json({
                                status: '1',
                                msg: err.message
                            })
                        }else{
                            if(productDoc){
                                productDoc.checked = true;
                                productDoc.productNum = 1;
                                let newProductDoc = {
                                    productId:productDoc.productId,
                                    productName:productDoc.productName,
                                    salePrice:productDoc.salePrice,
                                    productImage:productDoc.productImage,
                                    checked: productDoc.checked,
                                    productNum: productDoc.productNum
                                };
                                userDoc.cartList.push(newProductDoc);
                                userDoc.save((saveErr, saveDoc) => {
                                    if(saveErr){
                                        res.json({
                                            status: '1',
                                            msg: saveErr.message,
                                            result: ''
                                        })
                                    }else{
                                        res.json({
                                            status: '0',
                                            msg: '已加入购物车',
                                            result: 'Save Success'
                                        })
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    })

});

router.post('/cartList', (req, res, next) => {
    let params = { _id: req.cookies.Id };
    User.findOne(params, (err, userDoc) => {
        if(err){
            res.json({
                status: '1',
                msg: "加载购物车失败",
                result: ''
            });
        }else{
            res.json({
                status: '0',
                msg: "加载购物车成功",
                result: userDoc.cartList
            })
        }
    })
});

router.post('/cartList/del', (req, res, next) => {
    let id = req.cookies.Id;
    let productId = req.body.productId;
    User.update({
        _id: id
    }, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, (err, doc) => {
        if(err){
            res.json({
                status: '1',
                msg: '删除失败！',
                result: ''
            });
        }else{
            res.json({
                status: '0',
                msg: '删除成功！',
                result: ''
            });
        }
    })
});

router.post('/cartList/modify', (req, res, next) => {
   let id = req.cookies.Id;
   let newCartList = req.body.product;
   User.findOne({ _id: id }, (err, userDoc) => {
       if(err){
           res.json({
               status: '1',
               msg: '无此用户',
               result: ''
           })
       }else{
           if(userDoc){
               userDoc.cartList = newCartList;
               userDoc.save((saveErr, saveDoc) => {
                   if(saveErr){
                       res.json({
                           status: '1',
                           msg: '修改购物车成功' + saveErr.message,
                           result: ''
                       })
                   }else{
                       res.json({
                           status: '0',
                           msg: '修改购物车成功',
                           result: 'Save Success'
                       })
                   }
               });
           }
       }
   });
});

router.post('/cartList/submitOrder', (req, res, next) => {
    let id = req.cookies.Id;
    User.findOne({ _id: id }, (err, userDoc) => {
        if(err){
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        }else{
            if(userDoc){
                let newGoodsList = req.body.newGoodsList;
                let orderId = "307000" + ( userDoc.orderList.length + 1 );
                let today = new Date();
                let newOrderList = {
                    orderId: orderId,
                    addressId: 123456,
                    goodsList: newGoodsList,
                    orderStatus: true,
                    createDate: today.toLocaleDateString()
                };
                userDoc.orderList.push(newOrderList);
                userDoc.save((err, doc) => {
                    if(err){
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        })
                    }else{
                        res.json({
                            status: '0',
                            msg: '订单完成',
                            result: ''
                        })
                    }
                })
            }
        }
    });
});

router.get('/orderList', (req, res, next) => {
    let id = req.cookies.Id;
    User.findOne({ _id: id }, (err, orderDoc) => {
        if(err){
            res.json({
                status: '1',
                msg: '获取订单列表错误',
                result: ''
            })
        }else {
            if(orderDoc){
                res.json({
                    status: '0',
                    msg: '获取订单列表成功',
                    result: orderDoc.orderList
                })
            }
        }
    });
});

module.exports = router;