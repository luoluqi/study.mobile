export default {
    path: '/oaNotice',
    name: 'oaNotice',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'noticeList',
        name: 'noticeList',
        component: () => import('@/views/oaNotice/noticeList'),
        meta:{
          title:'通知列表'
        }
      },
      {
        path: 'noticeDetail',
        name: 'noticeDetail',
        component: () => import('@/views/oaNotice/noticeDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'punishNotice',
        name: 'punishNotice',
        component: () => import('@/views/oaNotice/punishNotice'),
        meta:{
          title:'发布通知'
        }
      },
      {
        path: 'lookNoticeDetail',
        name: 'lookNoticeDetail',
        component: () => import('@/views/oaNotice/lookNoticeDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'commitNoticeDetail',
        name: 'commitNoticeDetail',
        component: () => import('@/views/oaNotice/commitNoticeDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'TnoticeList',
        name: 'TnoticeList',
        component: () => import('@/views/oaNotice/TnoticeList'),
        meta:{
          title:'通知列表'
        }
      },
      {
        path: 'TnoticeDetail',
        name: 'TnoticeDetail',
        component: () => import('@/views/oaNotice/TnoticeDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'detailPush',
        name: 'detailPush',
        component: () => import('@/views/oaNotice/detailPush'),
        meta:{
          title:'通知详情'
        }
      }
    ]   
  }