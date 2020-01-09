export default {
    path: '/classNotice',
    name: 'classNotice',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/classNotice/index'),
        meta:{
          title:'通知公告'
        }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/classNotice/list'),
        meta:{
          title:'通知公告'
        }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/classNotice/detail'),
        meta:{
          title:'通知公告'
        }
      },
      {
        path: 'detailPush',
        name: 'detailPush',
        component: () => import('@/views/classNotice/detailPush'),
        meta:{
          title:'通知公告'
        }
      },
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/classNotice/publish'),
        meta:{
          title:'通知公告'
        }
      }
    ]
  }