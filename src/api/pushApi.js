import axios from './axios'
import qs from 'qs'
import {studentNameUrl,appUrl} from '@/config/config'

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
// /school/api/classroom/classRolls 教师获取异常点名数据
export const classRolls = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:appUrl + '/school/api/classroom/classRolls2',
            method: 'get',
            params:params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 家长查看学生点名/school/api/classroom/classRolls2/child
export const classRollsParent = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:appUrl + '/school/api/classroom/classRolls2/child',
            method: 'get',
            params:params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 点名推送给家长 /school/api/classroom/classRolls2/classRollToFamily/{rollBatchId}
export const classRollToFamily = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url:appUrl + '/school/api/classroom/classRolls2/classRollToFamily/' + params.rollBatchId,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    })
}

