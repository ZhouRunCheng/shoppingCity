/*
* mongoose是使用node.js对MongoDB数据库的操作进行了封装，有以下几个概念：
* 1. Schema: 模型，类似于类似关系型数据库中的表的结构
* 2. Model: 模型，负责和底层MongoDB数据库进行交互
* 3. Document: 文档 表示存储在MongoDB中的数据的一对一映射。每个文档都是其模型的一个实例
* */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
* 生成模型
* */
const productSchema = new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "productImage":String
});

module.exports = mongoose.model('Good', productSchema);