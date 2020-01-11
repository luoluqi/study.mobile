export default {
    path: '/test',
    name: 'test',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'test',
        name: 'sure',
        component: () => import('@/views/test/test'),
        meta:{
          title:'测试页面'
        }
      }
    ]
  }