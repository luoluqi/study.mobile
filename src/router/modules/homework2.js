export default {
    path: '/homeWork2',
    name: 'homeWork2',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'workList',
        name: 'workList',
        component: () => import('@/views/homeWork2/workList'),
        meta:{
          title:'布置作业'
        }
      },
      {
        path: 'workDetail',
        name: 'workDetail',
        component: () => import('@/views/homeWork2/workDetail'),
        meta:{
          title:'作业详情'
        }
      },
      {
        path: 'remarkWork',
        name: 'remarkWork',
        component: () => import('@/views/homeWork2/remarkWork'),
        meta:{
          title:'点评作业'
        }
      },
      {
        path: 'punish',
        name: 'workList',
        component: () => import('@/views/homeWork2/punish'),
        meta:{
          title:'发布作业'
        }
      },
      {
        path: 'parentsWorkList',
        name: 'parentsWorkList',
        component: () => import('@/views/homeWork2/parentsWorkList'),
        meta:{
          title:'家庭作业'
        }
      },
      {
        path: 'parentsSummitWork',
        name: 'parentsSummitWork',
        component: () => import('@/views/homeWork2/parentsSummitWork'),
        meta:{
          title:'提交作业'
        }
      },
      {
        path: 'parentsLookWork',
        name: 'parentsLookWork',
        component: () => import('@/views/homeWork2/parentsLookWork'),
        meta:{
          title:'作业详情'
        }
      },
      {
        path: 'parentPush',
        name: 'parentPush',
        component: () => import('@/views/homeWork2/parentPush'),
        meta:{
          title:'作业详情'
        }
      },
      {
        path: 'batchRemark',
        name: 'batchRemark',
        component: () => import('@/views/homeWork2/batchRemark'),
        meta:{
          title:'批量点评'
        }
      },
      {
        path: 'lookWork',
        name: 'lLookWork',
        component: () => import('@/views/homeWork2/lookWork'),
        meta:{
          title:'作业详情'
        }
      },
      {
        path: 'iframe',
        name: 'iframe',
        component: () => import('@/views/homeWork2/iframe'),
        meta:{
          title:'链接详情'
        }
      }
    ]
  }