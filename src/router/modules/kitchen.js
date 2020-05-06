export default {
  path: '/kitchen',
  name: 'kitchen',
  component: () => import('@/views/layout/Index'),
  children: [
    {
      path: 'index',
      name: '明厨亮灶',
      component: () => import('@/views/kitchen/index'),
      meta: {
        title: '明厨亮灶'
      }
    }
    // {
    //   path: 'detail',
    //   name: '操作帮助',
    //   component: () => import('@/views/help/detail'),
    //   meta:{
    //     title:'操作帮助'
    //   }
    // }
  ]
}
