export default {
    path: '/study',
    name: 'Home',
    component: () => import(/* webpackChunkName: "mobile" */'@/views/layout/Index'),
   
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/study/index'),
        meta:{
          title:'强化学习'
        }
      },
     
      {
        path:'type',
        name: 'type',
        component: () => import('@/views/study/type'),
        meta:{
          title:'选择类型'
        }
      },

      {
        path:'queType',
        name: 'queType',
        component: () => import('@/views/study/queType'),
        meta:{
          title:'选择题目类型'
        }
      },
      // {
      //   path:'chapter',
      //   name: 'chapter',
      //   component: () => import('@/mobile/mvue/views/study/chapter'),
      //   meta:{
      //     title:'选择单元'
      //   }
      // },

      {
        path:'selectEdition',
        name: 'selectEdition',
        component: () => import('@/views/study/selectEdition'),
        meta:{
          title:'选择教材版本'
        }
      },

      {
        path:'selectBook',
        name: 'selectBook',
        component: () => import('@/views/study/selectBook'),
        meta:{
          title:'选择书本'
        }
      },

      {
        path:'selectUnit',
        name: 'selectUnit',
        component: () => import('@/views/study/selectUnit'),
        meta:{
          title:'选择单元'
        }
      },

      {
        path:'selectChapter',
        name: 'selectChapter',
        component: () => import('@/views/study/selectChapter'),
        meta:{
          title:'选择章节'
        }
      },

      {
        path:'question',
        name: 'question',
        component: () => import('@/views/study/question'),
        meta:{
          title:'学习'
        }
      },
     
    ]
  }