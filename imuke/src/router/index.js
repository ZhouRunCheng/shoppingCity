import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import MGoodsList from '@/views/mobile/GoodsList'
import ProductList from '@/views/productList'
import HomePage from '@/views/HomePage'

import OrderList from '@/views/OrderList'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/product-list',
      name: 'HelloWorld',
      components: {
        default: GoodsList
      },
      children: [
        {
          path: '/product-list',
          component: ProductList
        },
        {
          path: '/home-page',
          redirect: '/home-page/order-list',
          component: HomePage,
          children: [
            {
              path: '/home-page/order-list',
              component: OrderList
            },
            {
              path: '/home-page/collection',
              component: ProductList
            },
            {
              path: '/home-page/address-list',
              component: ProductList
            }
          ]
        }
      ]
    },
    {
      path: '/m_goods-list',
      component: MGoodsList
    },

  ]
})
