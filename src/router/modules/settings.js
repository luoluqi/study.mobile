export default {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'setUp',
        name: 'index',
        component: () => import('@/views/settings/setUp'),
        meta:{
          title:'家长设置'
        }
      },
      {
        path: 'TsetUp',
        name: 'index',
        component: () => import('@/views/settings/TsetUp'),
        meta:{
          title:'老师设置'
        }
      }
    ]   
  }