import axios from './axios'
import qs from 'qs'
import { appUrl } from '@/config/config'

// 保存校管SOS号码
export const saveSosNumber = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: appUrl + '/safety/api/device/schoolSOSConfig/creat',
      method: 'post',
      data: params
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// 获取校管设置的SOS号码
export const getSosInformation = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: appUrl + '/safety/api/device/schoolSOSConfig/schoolSOSList/' + params,
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(error => {
      reject(error)
    })
  })
}
