import axios from './axios'
import qs from 'qs'
import {appUrl} from '@/config/config'
var comUrl = appUrl + '/bdc/api/app/parents'
// 保存家长信息
export const setParentInfo = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: comUrl + '/invitation',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 检测家长注册接口
export const checkParent = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: comUrl + '/exist',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 家长注册
export const registerParent = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: comUrl + '/user',
            method: 'post',
            data: params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 家长关联
export const connectParent = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: comUrl,
            method: 'post',
            data: params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取验证码 /bdc/api/app/checkcode
export const checkCode = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/bdc/api/app/checkcode',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取图形码 /bdc/api/app/checkcode
export const getCodeImg= (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/bdc/api/app/checkcode/img',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取学生绑定的家长 /bdc/api/app/parents/parents
export const getParentsList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: comUrl,
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// /bdc/api/app/student/{id}学生信息
export const getStudentInfo = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/bdc/api/app/student/' + params.id,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    })
}