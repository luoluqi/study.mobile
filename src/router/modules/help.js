export default  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: '操作帮助',
        component: () => import('@/views/help/index'),
        meta:{
          title:'操作帮助'
        }
      },
      {
        path: 'detail',
        name: '操作帮助',
        component: () => import('@/views/help/detail'),
        meta:{
          title:'操作帮助'
        }
      }
    ]
  }