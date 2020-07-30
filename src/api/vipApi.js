import axios from './axios'
import qs from 'qs'
import {baseUrl, baseUrl2, baseUrl3} from '@/config/config'
// 获取vip页面数据接口
export const getParentVip = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/MOAuth/GetParentVip?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取订单详情数据接口
export const getOrder = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/MOAuth/GetOrder?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取订单详情数据接口
export const getOrderList = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/GetOrderList?data=' + JSON.stringify(params),
          method: 'get',
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const getChaegeMessage = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/GetChaegeMessage/'+ params.Id,
          method: 'get',
      }).then(res => {
          resolve(res.data)
      })
  })
}
export const getResidualFlowAndResidualMinute = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/GetResidualFlowAndResidualMinute?data='+ JSON.stringify(params),
          method: 'get',
      }).then(res => {
          resolve(res.data)
      })
  })
}
// 订单状态
export const getPayStutus = (params) => {
  return new Promise((resolve, reject) => {
      axios({
          url: baseUrl3 + '/api/MCharge/GetPayStutus?data='+ JSON.stringify(params),
          method: 'get',
          data: qs.stringify(params)
      }).then(res => {
          resolve(res.data)
      })
  })
}