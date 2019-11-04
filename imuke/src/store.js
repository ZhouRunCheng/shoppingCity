import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogin: false,
  userName: '',
  Id: '',
  showUserName: false,
  isCartItem: false,
  showCartList: false
}

const mutations = {
  // 打开登录模态框
  mutationsOpenLogin(state) {
    state.isLogin = true
  },
  // 关闭登录模态框
  mutationsCloseLogin(state) {
    state.isLogin = false
  },

  // 登录时记录姓名
  changeUserName(state, payload) {
    state.userName = payload
  },

  // 登录时记录用于id
  changeId(state, payload) {
    state.Id = payload
  },

  // 退出登录清空姓名和Id
  clearUserName(state) {
    state.userName = '';
    state.Id = '';
  },

  // 控制登陆以后用户名在导航栏显示与否
  showUserNameInNav(state) {
    state.showUserName = !state.showUserName
  },

  // 改变购物车的显示
  changeShowCartList(state, payload) {
    state.showCartList = payload
  }
};

const getters = {
  getIsLogin(state) {
    return state.isLogin
  },
  getUserName(state) {
    return state.userName
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
})
