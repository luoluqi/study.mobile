import axios from './axios'
import qs from 'qs'
import { apiUrl, appUrl } from '@/config/config'

// 添加人员温度
export const addTemperatureApi = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: apiUrl + '/temperature-monitor-center/temperature/addTemperatureRecord',
      method: 'post',
      params: params
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
