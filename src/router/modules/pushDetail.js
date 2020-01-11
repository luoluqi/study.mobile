export default  {
    path: '/pushDetail',
    name: 'pushDetail',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'pushTeacher',
        name: 'pushTeacher',
        component: () => import('@/views/pushDetail/pushTeacher'),
        meta:{
          title:'点名详情'
        }
      },
      {
        path: 'pushParent',
        name: 'pushParent',
        component: () => import('@/views/pushDetail/pushParent'),
        meta:{
          title:'点名详情'
        }
      }
    ]
  }