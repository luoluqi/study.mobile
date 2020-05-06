export default  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'location',
        name: 'map',
        component: () => import('@/views/map/location'),
        meta:{
          title:'定位'
        }
      },
      {
        path: 'track',
        name: 'map',
        component: () => import('@/views/map/track'),
        meta:{
          title:'轨迹'
        }
      },
      {
        path: 'fence',
        name: 'map',
        component: () => import('@/views/map/fence'),
        meta:{
          title:'电子围栏'
        }
      }
    ]
  }