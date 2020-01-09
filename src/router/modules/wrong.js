export default {
    path: '/wrong',
    name: 'wrong',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'count',
        name: 'count',
        component: () => import('@/views/wrong/count'),
        meta:{
          title:'错题统计'
        }
      },
      {
        path: 'list',
        name: 'wrongList',
        component: () => import('@/views/wrong/list'),
        meta:{
          title:'查看错题',
         
        }
       
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/wrong/detail'),
        meta:{
          title:'错题详情'
        }
      },
      {
        path: 'answer',
        name: 'answer',
        component: () => import('@/views/wrong/answer'),
        meta:{
          title:'错题详情'
        }
      }
    ]   
  }