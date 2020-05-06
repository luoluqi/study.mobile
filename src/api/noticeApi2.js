import axios from './axios'
import qs from 'qs'
import {noticeUrl} from '@/config/config'
// 校管新增公告 POST /api/ClassNotice/AddNoticeByManager
export const addNoticeByManager = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/AddNoticeByManager',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 新增公告
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
// 获取模板
export const getNoticeTemplate = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNoticeTemplate',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取模板分类
export const getNoticeByType = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNoticeByType',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 编辑公告
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
// 确认发布
export const releaseNotice = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/ReleaseNotice',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 删除公告
export const deleteNotice = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/DeleteNotice',
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
            url: noticeUrl + '/api/ClassNotice/GetNotice',
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
            url: noticeUrl + '/api/ClassNotice/GetNotices',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 家长获取公告
export const getNoticesByParent = (params) => {
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
// 提醒
export const remind = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/Remind',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 新增点赞
export const addLike = (data) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/AddLike',
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
            url: noticeUrl + '/api/ClassNotice/SetRead',
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
            url: noticeUrl + '/api/ClassNotice/SetConfirm',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 校管获取已读未读列表GET /api/ClassNotice/GetReadListByManager
export const getReadListByManager = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetReadListByManager',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取已读未读列表
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
// 获取通知公告未读的总数
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
// 家长获取通知公告详情
export const getNoticeByParent= (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNoticeByParent',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 老师获取通知公告详情
export const getNoticesById= (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: noticeUrl + '/api/ClassNotice/GetNoticesById',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
