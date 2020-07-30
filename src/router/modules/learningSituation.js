export default {
    path: '/learningSituation',
    name: 'learningSituation',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/learningSituation/index'),
        meta:{
          title:'学情报告'
        }
      },
      {
        path: 'learningDetail',
        name: 'learningDetail',
        component: () => import('@/views/learningSituation/learningDetail'),
        meta:{
          title:'学情报告'
        }
      },
      {
        path: 'learningTotal',
        name: 'learningTotal',
        component: () => import('@/views/learningSituation/learningTotal'),
        meta:{
          title:'学情报告'
        }
      }
    ]
  }