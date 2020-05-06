import axios from './axios'
import qs from 'qs'
import { kitchenUrl } from '@/config/config'
// 获取今日菜品实拍
export const listFoodPicVo = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: kitchenUrl + '/index/listFoodPicVo',
      method: 'post',
      data: qs.stringify(params)
    }).then(res => {
      resolve(res.data)
    })
  })
}
// 查看今日菜谱
export const listTodayFoodsMenuVos = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: kitchenUrl + '/index/listTodayFoodsMenuVos',
      method: 'post',
      data: qs.stringify(params)
    }).then(res => {
      resolve(res.data)
    })
  })
}
// 上传实拍
export const uploadFoodsPic = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: kitchenUrl + '/index/uploadFoodsPicForMobile',
      method: 'post',
      data: qs.stringify(params)
    }).then(res => {
      resolve(res.data)
    })
  })
}
// 获取当日时间
export const getWeekToday = (params) => {
  return new Promise((resolve, reject) => {
    axios({
      url: kitchenUrl + '/index/getWeekToday',
      method: 'get',
      data: qs.stringify(params)
    }).then(res => {
      resolve(res.data)
    })
  })
}
