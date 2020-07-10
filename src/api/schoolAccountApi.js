import axios from './axios'
import qs from 'qs'
import { schoolAccount } from '@/config/config'
// 根据用户登录ID获取用户账号信息
export const getAccountByUserLoginId = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: schoolAccount + '/parent/getAccountByUserLoginId',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}
// 分页获取用户消费明细
export const pageUserConsumeOrders = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: schoolAccount + '/parent/pageUserConsumeOrders',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}
// 分页获取用户充值明细
export const pageUserRechargeOrders = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: schoolAccount + '/parent/pageUserRechargeOrders',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}

// 支付结果回调
export const courseOrderResult = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: schoolAccount + '/api/courseOrderResult',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(JSON.parse(res.data))
    }).catch(error => {
      reject(error)
    })
  })
}
// 账户充值
export const studentRecharge = (data) => {
  return new Promise((resolve, reject) => {
    axios({
      url: schoolAccount + '/api/studentRecharge',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}