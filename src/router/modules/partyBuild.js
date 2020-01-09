export default  {
    path: '/partyBuild',
    name: 'partyBuild',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/partyBuild/news/index'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/partyBuild/news/detail'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'read',
        name: 'read',
        component: () => import('@/views/partyBuild/read/index'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'study',
        name: 'study',
        component: () => import('@/views/partyBuild/study/index'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'answer',
        name: 'answer',
        component: () => import('@/views/partyBuild/study/answer'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'answerOver',
        name: 'answerOver',
        component: () => import('@/views/partyBuild/study/answerOver'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'challenge',
        name: 'challenge',
        component: () => import('@/views/partyBuild/study/challenge'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'answerChall',
        name: 'answerChall',
        component: () => import('@/views/partyBuild/study/answerChall'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'answerChallOver',
        name: 'answerChallOver',
        component: () => import('@/views/partyBuild/study/answerChallOver'),
        meta:{
          title:'云上党建'
        }
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/partyBuild/study/record'),
        meta:{
          title:'云上党建'
        }
      }
    ]
}