export default  {
  path: '/temperature',
  name: 'temperature1',
  component: () => import('@/views/layout/Index'),
  children:[
    {
      path: 'temperature',
      name: 'temperature',
      component: () => import('@/views/temperature/temperature'),
      meta:{
        title:'体温监测'
      }
    }
  ]
}
