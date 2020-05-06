export default {
    path: '/classNotice2',
    name: 'classNotice2',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/classNotice2/index'),
        meta:{
          title:'通知公告'
        }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/classNotice2/list'),
        meta:{
          title:'通知列表'
        }
      },
      {
        path: 'teacherDetail',
        name: 'teacherDetail',
        component: () => import('@/views/classNotice2/teacherDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'noticeDetail',
        name: 'noticeDetail',
        component: () => import('@/views/classNotice2/noticeDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'noticeLook',
        name: 'noticeLook',
        component: () => import('@/views/classNotice2/noticeLook'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'detailPush',
        name: 'detailPush',
        component: () => import('@/views/classNotice2/detailPush'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'teacherPunish',
        name: 'teacherPunish',
        component: () => import('@/views/classNotice2/teacherPunish'),
        meta:{
          title:'发布通知'
        }
      },
      {
        path: 'parentList',
        name: 'parentList',
        component: () => import('@/views/classNotice2/parentList'),
        meta:{
          title:'通知列表'
        }
      },
      {
        path: 'noticeTemplate',
        name: 'noticeTemplate',
        component: () => import('@/views/classNotice2/noticeTemplate'),
        meta:{
          title:'通知模板'
        }
      },
      {
        path: 'managePunish',
        name: 'managePunish',
        component: () => import('@/views/classNotice2/managePunish'),
        meta:{
          title:'发布通知'
        }
      },
      {
        path: 'manageList',
        name: 'manageList',
        component: () => import('@/views/classNotice2/manageList'),
        meta:{
          title:'通知列表'
        }
      },
      {
        path: 'manageDetail',
        name: 'manageDetail',
        component: () => import('@/views/classNotice2/manageDetail'),
        meta:{
          title:'通知详情'
        }
      },
      {
        path: 'manageNoticeLook',
        name: 'manageNoticeLook',
        component: () => import('@/views/classNotice2/manageNoticeLook'),
        meta:{
          title:'通知详情'
        }
      }
    ]
  }