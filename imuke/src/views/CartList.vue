<template>
  <div class="cart">
    <div class="modal" v-show="showModal"></div>
    <div class="cart-list" v-show="showCartList">
      <div class="close-icon">
        <i class="el-icon-close" @click="closeModal"></i>
      </div>
      <div class="title"><h1>购物车</h1></div>
      <div class="header row-flex">
        <div class="item">
          全选
          <el-switch
            v-model="allControl"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="item">商品图片</div>
        <div class="item">名称</div>
        <div class="item">数量</div>
        <div class="item">总价</div>
        <div class="item">操作</div>
      </div>
      <GeminiScrollbar
        class="my-scroll-bar"
        :forceGemini='true'
        :autoshow="true"
      >
        <el-card>
          <div class="cart-item row-flex" v-for="item in cartList">
            <div class="product-checked">
              <div class="stander" @click="changeChecked(item.productId)"></div>
              <el-checkbox
                           :border="false"
                           v-model="item.checked"
              ></el-checkbox>
            </div>
            <div class="img">
              <img v-lazy="'./../static/'+item.productImage" alt="">
            </div>
            <div class="product-name">{{item.productName}}</div>
            <div class="product-num">
              <el-button-group>
                <el-button type="primary" icon="el-icon-minus" size="mini" v-show="countButton" @click="subNum(item.productId)"></el-button>
                <el-button type="default" size="mini" :disabled="true">{{item.productNum}}</el-button>
                <el-button type="primary" icon="el-icon-plus" size="mini" v-show="countButton" @click="addNum(item.productId)"></el-button>
              </el-button-group>
            </div>
            <div class="product-salePrice">￥{{item.salePrice * item.productNum}}</div>
            <div class="delete-icon">
              <el-button
                size="mini"
                class="el-icon-delete-solid"
                @click="deleteProduct(item.productId)"
                v-show="countButton">
              </el-button>
            </div>
          </div>
          <div class="tip">暂无商品</div>
        </el-card>
      </GeminiScrollbar>
      <div class="footer">
        <div class="count">合计: ￥{{countPrice}}</div>
        <div class="buttons row-flex">
          <el-button round class="count-button" @click="modifyButton" v-if="!countButton">修 改</el-button>
          <el-button round class="count-button" @click="submitOrderList" v-if="!countButton">结 算</el-button>
          <el-button round class="count-button" @click="modifyCartList" v-if="countButton">完 成</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CartList",
        data() {
          return {
            showCartList: false,
            showModal: false,
            cartList: [],
            myBarOption: {
              barColor: "red"
            },
            countPrice: 0,
            countButton: false,
            allControl: true
          }
        },
        mounted() {
          this.getCartList();
        },
        computed: {
          refreshShowCartList() {
            return this.$store.state.showCartList
          },
        },
        methods: {
          getCartList() {
            this.$axios.post("/goods/cartList").then(res => {
              if(res.data.status === '0'){
                if(JSON.stringify(res.data.result) !== JSON.stringify(this.cartList)){
                  this.cartList = [];
                  this.cartList = res.data.result
                  this.countChecked();
                }
              }else{
                this.$message({
                  type: 'error',
                  message: "加载购物车：" + res.data.msg
                });
              }
            })
          },
          modifyCartList() {
            this.modifyButton();
            this.cartList.forEach(item => {
              if(item.productNum === 0){
                this.deleteProduct(item.productId);
              }
            });
            this.$axios.post('/goods/cartList/modify',{product: this.cartList}).then(res => {
              if(res.data.status === '0'){
                this.countChecked();
                this.$message({
                  type: 'success',
                  message: "修改购物车：" + res.data.msg
                });
              }else{
                this.$message({
                  type: 'error',
                  message: "修改购物车：" + res.data.msg
                });
              }
            });
          },
          deleteProduct(id) {
            // console.log(id);
            /*
            * 获得该商品在购物车列表的索引，使用数组的splice删除
            * 在此之后再进行提交数据到后端，进行修改
            *
            * */
            let itemIndex = 0;
            this.cartList.forEach((item, index) => {
              if(item.productId === id){
                itemIndex = index;
              }
            });
            if(itemIndex!=-1)
              this.cartList.splice(itemIndex,1);
          },
          modifyButton() {
            this.countButton = !this.countButton
          },
          closeModal() {
            this.$store.commit('changeShowCartList', false);
            document.body.parentNode.style.overflow = "auto";
          },
          countChecked() {
            this.countPrice = 0;
            this.cartList.forEach(item => {
              if(item.checked === true){
                this.countPrice += (item.salePrice * item.productNum)
              }
            })
          },
          changeChecked(id) {
            this.cartList.forEach(item => {
              if(item.productId === id){
                item.checked = !item.checked
              }
            });
            this.countChecked();
          },
          subNum(id) {
            this.cartList.forEach(item => {
              if(item.productId === id){
                item.productNum --;
              }
            });
            this.countChecked();
          },
          addNum(id) {
            this.cartList.forEach(item => {
              if(item.productId === id){
                item.productNum ++;
              }
            });
            this.countChecked();
          },
          submitOrderList() {
            let newGoodsList = [];
            this.cartList.forEach(item => {
              if(item.checked === true) {
                newGoodsList.push(item);
              }
            });
            // console.log(newGoodsList);
            this.$confirm('确认提交订单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post('/goods/cartList/submitOrder', { newGoodsList: newGoodsList }).then(res => {
                if(res.data.status === '0'){
                  this.$message({
                    type: 'success',
                    message: "订单提交：" + res.data.msg
                  });
                  let index = [];
                  this.cartList.forEach(item => {
                    if(item.checked === true) {
                      index.push(item.productId);
                      // this.deleteProduct(item.productId);
                    }
                  });
                  // console.log(index);
                  index.forEach(item => {
                    this.deleteProduct(item);
                  });
                  this.modifyCartList();
                }else{
                  this.$message({
                    type: 'error',
                    message: "订单提交：" + res.data.msg
                  })
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          }
        },
        watch: {
          refreshShowCartList() {
            this.showCartList = this.$store.state.showCartList;
            this.showModal = this.$store.state.showCartList;
            if(this.showCartList === true)
              this.getCartList();
          },
          allControl(val) {
            this.cartList.forEach(item => {
                  item.checked = val
                });
            this.countChecked();
          }
        }
    }
</script>

<style scoped>
  .cart {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cart-list {
    width: 70%;
    position: fixed;
    top: 20px;
    background-color: #FFC125;
    z-index: 999;
    border-radius: 5px;
    border: 2px solid #FFC125;
  }

  .modal {
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: #454545;
    opacity: 0.8;
  }

  .cart-list >>> .el-card{
    background-color: #cdcdcd;
  }
  
  .cart-item {
    background-color: #ffffff;
    width: 100%;
    height: 100px;
    border-radius: 3px;
    box-shadow: 0 0 2px 1px rgba(0,0,0,.1);
    margin-bottom: 10px!important;
    font-family: '微软雅黑 Light';
    font-size: 12px;
  }

  .product-checked,
  .img,
  .product-name,
  .product-salePrice,
  .product-num,
  .delete-icon {
    flex: 1;
  }

  .product-checked {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-checked >>> .stander{
    position: fixed;
    background-color: #454545;
    opacity: 0;
    height: 16px;
    width: 16px;
    z-index: 99;
  }

  .product-checked >>> .el-checkbox is-checked{
    position: fixed;
    height: 15px;
    width: 15px;
    z-index: 90;
  }

  .product-checked >>> .el-checkbox__inner {

  }

  .cart-item .img {
    width: 100px;
    height: 100px;
    overflow: hidden;
  }

  .cart-item .img img{
    height: 100px;
    width: 100px;
  }

  .my-scroll-bar{
    height: 500px;
  }

  .title {
    margin: 10px 0 !important;
  }

  .header {
    padding: 10px 20px !important;
    color: #ffffff;
    background-color: #454545;
    font-family: '微软雅黑 Light';
    font-size: 14px;
  }

  .close-icon {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 8px;
    font-size: 28px;
    font-weight: 900;
  }

  .close-icon >>> .el-icon-close:hover {
    animation-name: rounding;
    -webkit-animation-name: rounding;
    animation-duration: 500ms;
    -webkit-animation-duration: 500ms;
  }
  
  @keyframes rounding {
    form {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .header .item {
    flex: 1;
  }

  .footer {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer .count {
    flex: 2;
    font-size: 30px;
  }

  .footer .buttons {
    flex: 1;
  }

  .row-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  
  .count-button {
    border: 0;
    font-family: '微软雅黑 Light';
    font-size: 16px;
  }

  .product-num >>> .el-button {
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-num >>> .el-button:nth-child(2) {
    color: #454545!important;
  }

</style>
