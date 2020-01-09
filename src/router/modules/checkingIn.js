export default {
    path: '/checkingIn',
    name: 'checkingIn',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'chekingInInquire',
        name: 'index',
        component: () => import('@/views/checkingIn/chekingInInquire'),
        meta:{
          title:'考勤查询'
        }
      },{
        path: 'TattendanceQuery',
        name: 'index',
        component: () => import('@/views/checkingIn/TattendanceQuery'),
        meta:{
          title:'学生考勤'
        }
      },{
        path: 'TstudentDetail',
        name: 'index',                                                                                                                                                     
        component: () => import('@/views/checkingIn/TstudentDetail'),
        meta:{
          title:'考勤明细'
        }
      },{
        path: 'TchekingInInquire',
        name: 'index',
        component: () => import('@/views/checkingIn/TchekingInInquire'),
        meta:{
          title:'考勤查询'
        }
      },{
        path: 'clockIn',
        name: 'index',
        component: () => import('@/views/checkingIn/clockIn'),
        meta:{
          title:'考勤打卡'
        }
      },{
        path: 'LookTeacherDetail',
        name: 'index',
        component: () => import('@/views/checkingIn/LookTeacherDetail'),
        meta:{
          title:'教师考勤查询'
        }
      }
    ]   
  }