import axios from './axios'

import {appUrl} from '@/config/config'

// 获取老师考勤详细
export const reportList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/attence/record/reportList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 学生列表
export const studentList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/attence/record/studentList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取单个学生考勤
export const records = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/attence/record/records',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 修改单个学生考勤状态
export const corrent = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/attence/corrent',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长端  考勤列表
export const pageRecords = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/attence/record/pageRecords',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
