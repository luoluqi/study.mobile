import axios from './axios'

import {appUrl} from '@/config/config'
// 获取sos最新位置
export const lastGPSInfoFromEs = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/position/gPSService/lastGPSInfoFromEs/'+params.studentId,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取sos信息列表
export const sOSInfo = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/position/sOSInfo',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 将SOS信息信息设置已读
export const setSOSReadState = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/position/sOSInfo/'+data.id+'/setSOSReadState',
            method: 'post',
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取sos未读数
export const readInfo = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/position/sOSInfo/readInfo'+params,
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取 亲情号码列表 /safety/api/device/studentDevice/familyPhonesState/{studentId}
export const familyPhonesState = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentDevice/familyPhonesState/'+params.studentId,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取 监听号码列表 /safety/api/device/studentDevice/listenPhoneList/{studentId}
export const listenPhoneList = (params) => {
    // console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentDevice/listenPhoneList/'+params.studentId,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 新增亲情号码 /safety/api/device/studentDevice/setOrUpdateFamilyPhones
export const setOrUpdateFamilyPhones = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentDevice/setOrUpdateFamilyPhones',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        }).catch(res => {
            reject(res)
        })
    })
}
// 发送监听 /safety/api/device/studentDevice/sendListen
export const sendListen = (data) => {
    // console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentDevice/sendListen',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 设备类型
export const studentDevice = (params) => {
    // console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/safety/api/device/studentDevice',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}