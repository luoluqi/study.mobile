import axios from './axios'
import qs from 'qs'
import {oaNoticeUrl} from '@/config/config'
// 新增公告
export const addNotice = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/AddNotice',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}

// 根据主键获取
export const getNotice = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetNotice',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取公告
export const getNotices = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetNotices',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 教师获取公告
export const getNoticesByTeacher = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetNoticesByTeacher',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 提醒
export const remind = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/Remind',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 设置已读
export const setRead = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/SetRead',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 设置确认
export const setConfirm = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/SetConfirm',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取已读未读列表
export const getReadList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetReadList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取通知公告未读的总数
export const getUnReadNumber = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetUnReadNumber',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 老师获取通知公告详情
export const getNoticeByTeacher= (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetNoticeByTeacher',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 校官获取通知公告详情
export const getNoticesById= (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: oaNoticeUrl + '/api/OfficeNotice/GetNoticesById',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
