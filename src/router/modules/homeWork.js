export default {
    path: '/homeWork',
    name: 'homeWork',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'publish',
        name: 'publish',
        component: () => import('@/views/homeWork/publish'),
        meta:{
          title:'发布作业'
        }
      },
      {
        path: 'work',
        name: 'work',
        component: () => import('@/views/homeWork/work'),
        meta:{
          title:'作业'
        }
      },
      {
        path: 'workList',
        name: 'workList',
        component: () => import('@/views/homeWork/workList'),
        meta:{
          title:'老师作业列表'
        }
      },{
        path: 'parentWorkList',
        name: 'parentWorkList',
        component: () => import('@/views/homeWork/parentWorkList'),
        meta:{
          title:'家长作业列表'
        }
      },{
        path: 'parentWork',
        name: 'parentWork',
        component: () => import('@/views/homeWork/parentWork'),
        meta:{
          title:'家长作业'
        }
      },
      {
        path: 'parentPush',
        name: 'parentPush',
        component: () => import('@/views/homeWork/parentPush'),
        meta:{
          title:'家长推送'
        }
      }  
    ]
  }