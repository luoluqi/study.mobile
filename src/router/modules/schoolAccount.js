export default {
    path: '/schoolAccount',
    name: 'schoolAccount',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/schoolAccount/index'),
        meta:{
          title:'校园账户'
        }
      },
      {
        path: 'orderInfo',
        name: 'orderInfo',
        component: () => import('@/views/schoolAccount/orderInfo'),
        meta:{
          title:'校园账户'
        }
      },
      {
        path: 'recharge',
        name: 'recharge',
        component: () => import('@/views/schoolAccount/recharge'),
        meta:{
          title:'校园账户'
        }
      },
    ]   
  }