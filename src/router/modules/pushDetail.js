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
        path: 'pushTeacher2',
        name: 'pushTeacher2',
        component: () => import('@/views/pushDetail/pushTeacher2'),
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
      },
      {
        path: 'pushParent2',
        name: 'pushParent2',
        component: () => import('@/views/pushDetail/pushParent2'),
        meta:{
          title:'点名详情'
        }
      }
    ]
  }