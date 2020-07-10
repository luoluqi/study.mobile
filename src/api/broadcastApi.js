import axios from './axios'

import {appUrl} from '@/config/config'

// /school/api/schoolmain/schoolVoiceBroadcast 下发语音广播指令
export const schoolVoiceBroadcast = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/schoolmain/schoolVoiceBroadcast',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取广播记录 /school/api/schoolmain/schoolVoiceBroadcast
export const getVoiceBroadcast = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/schoolmain/schoolVoiceBroadcast',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 定时发送语音 /school/api/schoolmain/schoolVoiceBroadcast/sendOnTime
export const sendOnTime = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/schoolmain/schoolVoiceBroadcast/sendOnTime',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 语音广播回调 /school/api/schoolmain/schoolVoiceBroadcast/sendVoiceBroadcastCallback
export const sendVoiceBroadcastCallback = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/schoolmain/schoolVoiceBroadcast/sendVoiceBroadcastCallback',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 根据学校id获取年级
export const gradesBySchoolId = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/bdc/api/app/grade/gradesBySchoolId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 根据年级获取班级
export const classList = (params) => {
    return new Promise((resolve,reject) => {
        axios.noLoading = true
        axios({
            url: appUrl + '/bdc/api/app/class',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// /school/api/schoolmain/schoolVoiceBroadcast/uploadAmr/{serverId} 根据微信serverId 下载音频文件 并调用java接口上传
export const uploadAmr = (serverId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: appUrl + '/school/api/schoolmain/schoolVoiceBroadcast/uploadAmr/'+ serverId,
            method: 'post'
        }).then(res => {
            resolve(res.data)
        })
    });
}