export default  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'login',
        name: '登录',
        component: () => import('@/views/login/login'),
        meta:{
          title:'登录'
        }
      } 
    ]
  }