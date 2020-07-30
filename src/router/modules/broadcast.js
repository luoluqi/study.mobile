export default {
    path: '/broadcast',
    name: 'broadcast',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'publish',
        name: 'index',
        component: () => import('@/views/voiceBroadcast/publish'),
        meta:{
          title:'发布广播'
        }
      },{
        path: 'adminList',
        name: 'index',
        component: () => import('@/views/voiceBroadcast/adminList'),
        meta:{
          title:'语音广播'
        }
      }
    ]   
  }