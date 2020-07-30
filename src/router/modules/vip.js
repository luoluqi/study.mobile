export default  {
    path: '/vip',
    name: 'vip',
    component: () => import('@/views/layout/Index'),
    children:[ 
      {
        path: 'index',
        name: 'Vip',
        component: () => import(/* webpackChunkName: "mobile" */'@/views/vip/index'),
        meta:{
          title:'套餐'
        }
      },
      {
        path: 'order-list',
        name: 'OrderList',
        component: () => import(/* webpackChunkName: "mobile" */'@/views/vip/orderList'),
        meta:{
          title:'套餐'
        }
      },
      {
        path: 'order-detail',
        name: 'OrderDetail',
        component: () => import(/* webpackChunkName: "mobile" */'@/views/vip/OrderDetail'),
        meta:{
          title:'套餐'
        }
      },
      {
        path: 'order-item',
        name: 'OrderItem',
        component: () => import(/* webpackChunkName: "mobile" */'@/views/vip/OrderItem'),
        meta:{
          title:'充值详情'
        }
      }
    ]
  }