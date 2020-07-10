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
    },
    {
      path: 'kitchenMonitor',
      name: 'kitchenMonitor',
      component: () => import('@/views/kitchen/kitchenMonitor'),
      meta: {
        title: '厨房监控'
      }
    },
    {
      path: 'watchMonitor',
      name: 'watchMonitor',
      component: () => import('@/views/kitchen/watchMonitor'),
      meta: {
        title: '厨房监控'
      }
    }
  ]
}
