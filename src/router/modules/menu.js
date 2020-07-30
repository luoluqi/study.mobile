export default  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import(/* webpackChunkName: "mobile" */'@/views/menu/index'),
        meta:{
          title:'首页'
        }
      },
      {
        path: 'index-master',
        name: 'IndexMaster',
        component: () => import(/* webpackChunkName: "mobile" */'@/views/menu/indexMaster'),
        meta:{
          title:'首页'
        }
      }
    ]
  }