<template>
  <div class="navnav">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="containers">
        <div class="left">
          <el-menu-item index="1" @click="toHome">首页</el-menu-item>
          <el-menu-item index="2" @click="cartList" class="cart">
            购物车
          </el-menu-item>
        </div>

        <div class="right">
          <el-menu-item @click="login" v-show="!showUserName">登录</el-menu-item>
          <el-menu-item @click="register" v-show="!showUserName">注册</el-menu-item>
          <el-menu-item @click="personalPage" v-show="showUserName" class="nick-name">
            <router-link
              to="/home-page"
            >
              {{ nickName }}
            </router-link>
          </el-menu-item>
          <el-menu-item @click="loginOut" v-show="showUserName">退出登录</el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "NavHeader",
        data () {
          return {
            activeIndex: '1',
            activeIndex2: '1',
            showUserName: false,
            nickName: ''
          }
        },
        mounted() {
          this.getUserInfo();
        },
        computed: {
          refreshIsUserName() {
            return this.$store.state.userName
          },
          refreshCartItem() {
            return this.$store.state.isCartItem
          }
        },
        methods: {
          login() {
            this.$store.commit('mutationsOpenLogin');
          },
          register() {
            console.log(2);
          },
          personalPage() {
            console.log("个人主页");
          },
          loginOut() {
            this.$confirm('注销当前用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post('/users/loginOut')
                .then(res => {
                  if(res.data.status === '0'){
                    this.$store.commit('clearUserName');
                    this.$message({
                      type: 'success',
                      message: '注销成功!'
                    });
                  }
                });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          },
          getUserInfo() {},
          cartList() {
            this.$store.commit('changeShowCartList', true);
            document.body.parentNode.style.overflow = "hidden";
          },
          toHome() {
            this.$router.push('/product-list');
          }
        },
        watch: {
          refreshIsUserName() {
            if(this.$store.state.userName !== '') {
              this.nickName = this.$store.state.userName;
              this.showUserName = true;
            }
            else{
              console.log(`未退出：${this.showUserName}`);
              this.showUserName = false;
              console.log(`已退出：${this.showUserName}`);
            }
          }
        }
    }
</script>

<style scoped>
  .containers{
    display: flex;
  }
  .left{
    display: flex;
    flex: 1;
  }
  .right{
    display: flex;
    justify-content: right;
  }

  .cart {
    position: relative;
    height: 100%;
  }

  .cart-count {
    position: absolute;
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    right: 0;
    border-radius: 50%;
    background-color: red;
  }

  .nick-name a{
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
  }

</style>
