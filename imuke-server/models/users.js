let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":[
        {
            "orderId": String,
            "addressId": String,
            "goodsList": [
                {
                    "productId":String,
                    "productName":String,
                    "salePrice":String,
                    "productImage":String,
                    "productNum": String
                }
            ],
            "orderStatus": Boolean,
            "createDate": String
        }
    ],
    "cartList":[
        {
            "productId":String,
            "productName":String,
            "salePrice":String,
            "productImage":String,
            "checked": Boolean,
            "productNum": String
        }
    ],
    "addressList": [
        {
            addressId: String,
            userName: String,
            streetName: String,
            postCode: String,
            tel: String,
            isDefault:Boolean
        }
    ]
});

module.exports = mongoose.model("User", userSchema);