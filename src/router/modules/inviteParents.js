export default  {
    path: '/inviteParents',
    name: 'inviteParents',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/inviteParents/index'),
        meta:{
          title:'添加学生家长'
        }
      },
      {
        path: 'addParents',
        name: 'addParents',
        component: () => import('@/views/inviteParents/addParents'),
        meta:{
          title:'添加学生家长'
        }
      },
      {
        path: 'toSendParents',
        name: 'toSendParents',
        component: () => import('@/views/inviteParents/toSendParents'),
        meta:{
          title:'添加学生家长'
        }
      }
    ]
  }