// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/init.css'
import VueLazyload from 'vue-lazyload'
import store from './store'
import infiniteScroll from 'vue-infinite-scroll'
import GeminiScrollbar from 'vue-gemini-scrollbar'



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  // error: 'static/notFound.jpg',
  loading: 'static/loading-svg/loading-spinning-bubbles.svg'
});
Vue.use(infiniteScroll)
Vue.prototype.$axios = axios

// 滚动条
Vue.use(GeminiScrollbar)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render:h=>h(App)
}).$mount("#app");
