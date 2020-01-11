import axios from './axios'
import qs from 'qs'
import {studentNameUrl} from '@/config/config'

// 获取推送给班主任的异常数据
export const GetAbnormalForTeach = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:studentNameUrl + '/api/ClassRollCall/GetAbnormalForTeach',
            method: 'get',
            params:params
        }).then(res => {
            resolve(JSON.parse(res.data))
        })
    })
}
// 推送点名情况给家长
export const SendData = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:studentNameUrl + '/api/ClassRollCall/SendData',
            method: 'get',
            params:params
        }).then(res => {
            resolve(JSON.parse(res.data))
        })
    })
}
// 获取推送给家长的详细信息
export const GetAbormalForParent = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:studentNameUrl + '/api/ClassRollCall/GetAbormalForParent',
            method: 'get',
            params:params
        }).then(res => {
            resolve(JSON.parse(res.data))
        })
    })
}
