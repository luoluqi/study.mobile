export default  {
    path: '/circle',
    name: 'circle',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/circle/index'),
        meta:{
          title:'班级风采'
        }
      },
      {
        path: 'addCircle',
        name: 'addCircle',
        component: () => import('@/views/circle/addCircle'),
        meta:{
          title:'发布'
        }
      }
    ]
  }