<template>
    <div class="goods">
      <nav-header></nav-header>
      <nav-bread><span>Goods</span></nav-bread>
      <product-list></product-list>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavBread from '@/components/NavBread'
  import productList from '@/views/productList'
  import NavFooter from '@/components/NavFooter'
  import '@/assets/css/init.css'
  import '@/assets/css/base.css'
    export default {
        name: "GoodsList",
        components: {
          NavHeader,
          NavBread,
          NavFooter,
          productList
        },
        mounted() {},
        methods: {
          // 判断是移动端还是PC端
          isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
          }
        }
    }
</script>
