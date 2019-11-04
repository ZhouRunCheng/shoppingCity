<template>
    <div class="product">
      <div class="queryParam">
        <div class="item1">
          <span>价格排序：</span>
          <el-button @click="sortData">
            排序
          </el-button>
        </div>
        <div class="item2">
          <span>价格区间：</span>
          <el-input placeholder="最低价" v-model="priceGt"></el-input>
          <span> ~ </span>
          <el-input placeholder="最高价" v-model="priceLt"></el-input>
          <el-button @click="priceFillter">筛选</el-button>
        </div>
      </div>
      <el-row v-for="(items, index) in nextPage" :key="index">
        <el-col :span="5" v-for="(item,index) in items" :key="index">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" v-if="item.productId">
            <div class="img">
              <img v-lazy="'./../static/'+item.productImage" class="image" @click="productDetail(item.productId)">
            </div>
            <div style="padding: 10px;">
              <div class="bottom clearfix">
                <p>{{item.productName}}</p>
                <p>￥{{item.salePrice}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
        <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
      </div>
    </div>
</template>

<script>
    export default {
        name: "ProductList",
        data() {
          return {
            goodsList: [],
            nextPage: [],
            page: 1,
            pageSize: 10,
            sort: true,
            busy: true,
            priceGt: 0,
            priceLt: 0,
            loading: false
          }
        },
        mounted() {
          this.getGoodsList(false);
        },
        methods: {
          getGoodsList(flag) {
            let param = {
              page: this.page,
              pageSize: this.pageSize,
              sort: this.sort ? '1' : '-1',
              priceGt: this.priceGt,
              priceLt: this.priceLt
            };
            this.loading = true;
            this.$axios.get("/goods/list", {params:param}).then(res => {
              if(res.data.status === '0'){
                let newGoodsList = res.data.result.list;
                this.loading = false;
                if(flag){
                  this.goodsList = this.goodsList.concat(newGoodsList);

                  if(res.data.result.count < 10){
                    this.busy = true;
                  }else{
                    this.busy = false;
                  }
                }else{
                  this.goodsList = newGoodsList;
                  this.busy = false;
                }
                this.nextRow();
              }
            })
          },
          productDetail(id) {
            // console.log(id);
            this.$axios.post("/goods/addCart", {productId: id}).then(res => {
              if(res.data.status === '0'){
                this.$notify.success({
                  title: '成功',
                  message: "加入成功：" + res.data.msg
                });
              }else{
                this.$notify.error({
                  title: '错误',
                  message: "加入失败：" + res.data.msg
                });
              }
            })
          },
          //  分行函数
          nextRow() {
            let arr = [];
            let row = Math.ceil(this.goodsList.length / 5)
            // console.log(row);
            for(let i = 0;i<row;i++){
              arr[i] = [];
              for(let j = 0;j < 5;j++){
                if(this.goodsList[5*i+j]===undefined){
                  arr[i][j] = {}
                }else{
                  arr[i][j] = this.goodsList[5*i+j];
                }
              }
            }
            // console.log(arr);
            this.nextPage = arr;
          },
          sortData() {
            this.sort = !this.sort
            this.page = 1
            this.getGoodsList()
          },
          //  滚动加载分页
          loadMore() {
            this.busy = true
            // console.log(this.page);
            setTimeout(() => {
              this.page++
              // console.log(this.page);
              this.getGoodsList(true);
            }, 600);
          },
          //筛选价格区间
          priceFillter() {
            let numReg = /^[0-9]+$/;
            let numRe = new RegExp(numReg);
            if((this.priceGt > this.priceLt) || !numRe.test(this.priceGt) && !numRe.test(this.priceLt)){
              this.$notify.error({
                title: '错误',
                message: '价格区间错误，请输入正确的价格格式！'
              });
            }else{
              this.page = 1;
              this.getGoodsList()
            }
          }
        }
    }
</script>

<style scoped>

  .product {
    width: 80%;
  }

  .product >>> .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .product >>> .bottom p:nth-child(1){
    margin-bottom: 10px !important;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .product >>> .el-card{
    width: 80%;
    height: 100%;
    margin: 0 auto !important;
   }

  .product >>> .el-row{
    display: flex;
    justify-content: center;
    margin-bottom: 15px !important;
  }
  
  .queryParam {
    /*background-color: #FFC125;*/
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center;
  }

  .queryParam span {
    font-family: "微软雅黑 Light";
    font-weight: 900;
  }

  .queryParam i {
    font-family: "微软雅黑 Light";
    font-weight: 900;
  }

  .product >>> .el-radio-button__inner{
     background-color: #FFC125;
     border: 0;
     -webkit-box-shadow: 0 0 0 0 #409EFF;
     font-family: "微软雅黑 Light";
     font-weight: 900;
   }

  .product >>> .el-radio-button__inner:hover{
    color: #f6f9fa;
  }

  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .item2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px!important;
  }

  .item2 .el-input{
    width: 80px;
  }
</style>
