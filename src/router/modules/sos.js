export default {
    path: '/sos',
    name: 'sos',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'sos',
        name: 'sos',
        component: () => import('@/views/sos/sos'),
        meta:{
          title:'SOS'
        }
      },
      {
        path: 'sosDetail',
        name: 'sosDetail',
        component: () => import('@/views/sos/sosDetail'),
        meta:{
          title:'SOS详情'
        }
      },
      {
        path: 'sosDetail2',
        name: 'sosDetail2',
        component: () => import('@/views/sos/sosDetail2'),
        meta:{
          title:'SOS详情'
        }
      },
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/sos/monitor'),
        meta:{
          title:'监听'
        }
      },{
        path: 'familyNumber',
        name: 'familyNumber',
        component: () => import('@/views/sos/familyNumber'),
        meta:{
          title:'亲情号码'
        }
      },{
        path: 'addFamilyNumber',
        name: 'addFamilyNumber',
        component: () => import('@/views/sos/addFamilyNumber'),
        meta:{
          title:'添加亲情号码'
        }
      },
      {
        path: 'editFamilyNumber',
        name: 'editFamilyNumber',
        component: () => import('@/views/sos/editFamilyNumber'),
        meta:{
          title:'编辑亲情号码'
        }
      },
      {
        path: 'sosPush',
        name: 'sosPush',
        component: () => import('@/views/sos/sosPush'),
        meta:{
          title:'SOS详情'
        }
      },
      {
        path: 'schoolAdminSos',
        name: 'schoolAdminSos',
        component: () => import('@/views/sos/schoolAdminSos'),
        meta:{
          title:'SOS设置'
        }
      },
      {
        path: 'setFamily',
        name: 'setFamily',
        component: () => import('@/views/sos/setFamily'),
        meta:{
          title:'设置家庭SOS号码'
        }
      },
      {
        path: 'lookNumber',
        name: 'lookNumber',
        component: () => import('@/views/sos/lookNumber'),
        meta:{
          title:'SOS号码查看'
        }
      }
    ]
  }
