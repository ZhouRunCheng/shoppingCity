<template>
    <div class="goods">
<!--      <div class="modal" v-show="showCartList" @click="closeModal"></div>-->
      <nav-logo></nav-logo>
      <nav-header></nav-header>
      <nav-bread :position="position"></nav-bread>
      <div class="p_l">
        <router-view></router-view>
      </div>
      <nav-footer></nav-footer>
      <login></login>
      <cart-list></cart-list>
    </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavLogo from '@/components/NavLogo'
  import NavBread from '@/components/NavBread'
  import NavFooter from '@/components/NavFooter'
  import Login from '@/views/Login'
  import CartList from '@/views/CartList'
  import '@/assets/css/init.css'
  import '@/assets/css/base.css'
    export default {
        name: "GoodsList",
        data() {
          return {
            // showCartList: false,
            position: 'GoodsList'
          }
        },
        components: {
          NavLogo,
          NavHeader,
          NavBread,
          NavFooter,
          Login,
          CartList
        },
        mounted() {
          this.checkLogin();
        },
        computed: {
          refreshShowCartList() {
            return this.$store.state.showCartList
          }
        },
        methods: {
          // 判断是移动端还是PC端
          isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
          },
          // closeModal() {
          //   this.$store.commit('changeShowCartList', false);
          //   document.body.parentNode.style.overflow = "auto";
          // }
          // ,
          checkLogin() {
            this.$axios.post('/users/checkLogin').then(res => {
              console.log(res.data);
              if(res.data.status === '0'){
                this.$store.commit('changeUserName', res.data.result.userName);
                this.$store.commit('changeId', res.data.result.id)
              }else{
                this.$notify.error({
                  title: '错误',
                  message: "登录验证：" + res.data.msg
                });
              }
            })
          }
        },
        watch: {
          refreshShowCartList() {
            this.showCartList = this.$store.state.showCartList
          }
        }
    }
</script>

<style scoped>
  .goods {
    position: relative;
  }

  .p_l {
    display: flex;
    justify-content: center;
  }
</style>
