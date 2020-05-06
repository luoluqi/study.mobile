export default {
    path: '/checkingIn2',
    name: 'checkingIn2',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'pcheckList',
        name: 'pcheckList',
        component: () => import('@/views/checkingIn2/pcheckList'),
        meta:{
          title:'考勤查询'
        }
      },{
        path: 'pcheckDetail',
        name: 'pcheckDetail',
        component: () => import('@/views/checkingIn2/pcheckDetail'),
        meta:{
          title:'考勤查询'
        }
      },{
        path: 'oneDayCheck',
        name: 'index',                                                                                                                                                     
        component: () => import('@/views/checkingIn2/oneDayCheck'),
        meta:{
          title:'考勤查询'
        }
      },{
        path: 'studentCheck',
        name: 'index',
        component: () => import('@/views/checkingIn2/studentCheck'),
        meta:{
          title:'考勤查询'
        }
      },{
        path: 'pushCheckList',
        name: 'index',
        component: () => import('@/views/checkingIn2/pushCheckList'),
        meta:{
          title:'考勤查询'
        }
      }
    ]   
  }