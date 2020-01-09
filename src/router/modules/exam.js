export default  {
    path: '/exam',
    name: 'exam',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/exam/statistics'),
        meta:{
          title:'成绩统计'
        }
      },
      {
        path: 'statisticsDeatail',
        name: 'statisticsDeatail',
        component: () => import('@/views/exam/statisticsDeatail'),
        meta:{
          title:'成绩统计'
        }
      },
      {
        path: 'statisticsDeatailPush',
        name: 'statisticsDeatailPush',
        component: () => import('@/views/exam/statisticsDeatailPush'),
        meta:{
          title:'成绩统计'
        }
      },
      {
        path: 'examList',
        name: 'examList',
        component: () => import('@/views/exam/examList'),
        meta:{
          title:'考试列表'
        }
      },
      {
        path: 'Pstatistics',
        name: 'Pstatistics',
        component: () => import('@/views/exam/Pstatistics'),
        meta:{
          title:'成绩统计'
        }
      },
      {
        path: 'PexamList',
        name: 'PexamList',
        component: () => import('@/views/exam/PexamList'),
        meta:{
          title:'考试列表'
        }
      }
    ]
  }