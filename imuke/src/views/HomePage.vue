<template>
    <div class="home-page">
      <div class="container">
        <div class="left-bar">
          <router-link to="/home-page/order-list">
            <div class="item">
              <i class="el-icon-s-order"></i>
              <span>订单</span>
            </div>
          </router-link>
          <router-link to="/home-page/colection">
            <div class="item"><i class="el-icon-connection"></i>
              <span>收藏</span>
            </div>
          </router-link>
          <router-link to="/home-page/address-list">
            <div class="item">
              <i class="el-icon-position"></i>
              <span>地址管理</span>
            </div>
          </router-link>
        </div>
        <div class="right-bar">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
        components: {
        },
    }
</script>

<style scoped>

  .home-page {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .container {
    width: 80%;
    height: 500px;
    display: flex;
    justify-content: center;
  }

  .left-bar {
    flex: 1;
    text-align: left;
    background-color: #2c3e50;
  }

  .left a {
    margin-left: 15px;
  }

  .right-bar {
    flex: 5;
  }

  .item {
    height: 50px;
    line-height: 50px;
    padding-left: 15px!important;
  }



  .item:hover {
    background-color: #FFC125;
    /*animation-name: amplification;*/
    /*-webkit-animation-name: amplification;*/
    /*animation-duration: 500ms;*/
    /*-webkit-animation-duration: 500ms;*/
    transform: scale(1.05);
    -ms-transform:scale(1.05);     /* IE 9 */
    -moz-transform:scale(1.05);     /* Firefox */
    -webkit-transform:scale(1.05); /* Safari 和 Chrome */
    -o-transform:scale(1.05);
    transition: all .15s;
    -webkit-transition: all .15s;
  }

  @keyframes amplification {
    from {}
    to {}
  }

  a {
    text-decoration: none;
    color: #f6f9fa;
    font-size: 14px;
    font-family: '微软雅黑 Light';
  }
</style>
