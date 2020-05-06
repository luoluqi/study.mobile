export default  {
    path: '/link',
    name: 'help',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'link',
        name: '操作帮助',
        component: () => import('@/views/link/link'),
        meta:{
          title:'链接详情'
        }
      } 
    ]
  }