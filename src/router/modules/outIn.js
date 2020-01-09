export default {
    path: '/outIn',
    name: 'outIn',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'sure',
        name: 'sure',
        component: () => import('@/views/outIn/sure'),
        meta:{
          title:'入校（离校）确认提醒'
        }
      }
    ]
  }