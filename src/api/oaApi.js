import axios from './axios'
import qs from 'qs'
import {oaUrl, formUrl, organizationUrl} from '@/config/config'
// 获取能申请的流程 GET /api/Flow/MyPowerApplyFlow
export const myPowerApplyFlow = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:oaUrl + '/api/Flow/MyPowerApplyFlow',
            method: 'get',
            params
        }).then(res => {
            resolve(JSON.parse(res.data))
        })
    })
}
export const deptListByTeacherId = (params) => {
  return new Promise((resolve, reject) => {
    axios({
        url: organizationUrl + '/api/Organization/DeptListByTeacherId',
        method: 'get',
        params
    }).then(res => {
        resolve(JSON.parse(res.data))
    }).catch(error => {
        // location.href = 'http://www.xueerqin.net'
        reject(error)
    })
  })
}
// 表单储存
export const formApply = (data) => {
    return new Promise((resolve, reject) => {
      axios({
        url: formUrl + '/api/FormRecord/Apply',
        method: 'post',
        data: qs.stringify(data)
      }).then(res => {
        resolve(JSON.parse(res.data))
      }).catch(error => {
        // location.href = 'http://www.xueerqin.net'
        reject(error)
      })
    })
}
// 流程存储
export const flowApply = (data) => {
    return new Promise((resolve, reject) => {
      axios({
        url: oaUrl + '/api/FlowRecord/Apply',
        method: 'post',
        data: qs.stringify(data)
      }).then(res => {
        resolve(JSON.parse(res.data))
      }).catch(error => {
        // location.href = 'http://www.xueerqin.net'
        reject(error)
      })
    })
}
// 审核人存储 POST /api/FlowRecord/AppendRecordNode
export const appendRecordNode = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/AppendRecordNode',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 我发起的 POST /api/FlowRecord/AppendRecordNode
export const pageMyRecord = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/PageMyRecord',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 我待处理的 POST /api/FlowRecord/AppendRecordNode
export const pageMyPendingDeal = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/PageMyPendingDeal',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 我已处理的 POST /api/FlowRecord/AppendRecordNode
export const pageMyHasDeal = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/PageMyHasDeal',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 获取流程详情信息
export const item = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/Item',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 获取表单记录
export const itemByRecordId = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: formUrl + '/api/FormRecord/ItemByRecordId',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 获取所有节点
export const recordNodeByFlowRecordId = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/RecordNodeByFlowRecordId',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 判断是否有处理权限
export const checkHasDealPower = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/CheckHasDealPower',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 撤销流程
export const cancel = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/Cancel',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 催办流程
export const pressToDo = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/PressToDo',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 处理流程
export const dealNode = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: oaUrl + '/api/FlowRecord/DealNode',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}
// 根据id获取表单信息 GET /api/Form/ItemById
export const getFormDetail = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: formUrl + '/api/Form/ItemById',
      method: 'get',
      params
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      // location.href = 'http://www.xueerqin.net'
      reject(error)
    })
  })
}