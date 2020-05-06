export default  {
    path: '/oa',
    name: 'oa',
    component: () => import('@/views/layout/Index'),
    children:[
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/oa/index'),
        meta:{
          title:'OA工作流'
        }
      },
      {
        path: 'sealPrinting',
        name: 'sealPrinting',
        component: () => import('@/views/oa/sealPrinting'),
        meta:{
          title:'用印申请'
        }
      },
      {
        path: 'eduInsurance',
        name: 'eduInsurance',
        component: () => import('@/views/oa/eduInsurance'),
        meta:{
          title:'电教报修'
        }
      },
      {
        path: 'flowSet',
        name: 'flowSet',
        component: () => import('@/views/oa/flowSet'),
        meta:{
          title:'审批流程设置'
        }
      },
      {
        path: 'selectMan',
        name: 'selectMan',
        component: () => import('@/views/oa/selectMan'),
        meta:{
          title:'请选择'
        }
      },
      {
        path: 'patchCard',
        name: 'patchCard',
        component: () => import('@/views/oa/patchCard'),
        meta:{
          title:'补卡申请'
        }
      },
      {
        path: 'leave',
        name: 'leave',
        component: () => import('@/views/oa/leave'),
        meta:{
          title:'请假'
        }
      },
      {
        path: 'payPrinting',
        name: 'payPrinting',
        component: () => import('@/views/oa/payPrinting'),
        meta:{
          title:'付款申请'
        }
      },
      {
        path: 'affairsRepair',
        name: 'affairsRepair',
        component: () => import('@/views/oa/affairsRepair'),
        meta:{
          title:'总务报修'
        }
      },
      {
        path: 'buyGoods',
        name: 'buyGoods',
        component: () => import('@/views/oa/buyGoods'),
        meta:{
          title:'物品申购'
        }
      },
      {
        path: 'dealFlow',
        name: 'dealFlow',
        component: () => import('@/views/oa/dealFlow'),
        meta:{
          title:'流程审批'
        }
      },
      {
        path: 'classAdjustment',
        name: 'classAdjustment',
        component: () => import('@/views/oa/classAdjustment'),
        meta:{
          title:'调课报备'
        }
      },
      {
        path: 'flowPush',
        name: 'flowPush',
        component: () => import('@/views/oa/flowPush'),
        meta:{
          title:'流程审批'
        }
      },
      {
        path: 'anyFlow',
        name: 'anyFlow',
        component: () => import('@/views/oa/anyFlow'),
        meta:{
          title:'流程申请'
        }
      }
     
    ]
  }