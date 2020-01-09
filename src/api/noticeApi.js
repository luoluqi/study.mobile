import axios from './axios'
import qs from 'qs'
import {noticeUrl} from '@/config/config'

export const addNotice = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/AddNotice',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const updateNotice = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/UpdateNotice',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getNoticeList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNotices',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getNoticeListByParent = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNoticesByParent',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getNotice = (id) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNotice/'+id,
            method: 'get'
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const setRead = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/SetRead',
            method: 'post',
            data:qs.stringify(data)
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getReadList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetReadList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}

export const getUnReadNumber = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetUnReadNumber',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
