import axios from './axios'
import qs from 'qs'
import {homeWorkUrl,circle} from '@/config/config'

// 获取学校科目
export const getSubjectList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: circle + '/api/ClassInfo/GetSubjectListByTeacherId',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 新增家庭作业
export const AddHomeWork = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/AddHomeWork',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 老师按周获取家庭作业
export const GetHomeWorkByTeach = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/GetHomeWorkByTeach',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取已读和未读列表
export const GetReadList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/GetReadList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

// 家长按周获取家庭作业
export const GetHomeWorkByParent = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/GetHomeWorkByParent',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长设置已读
export const SetRead = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/SetRead',
            method: 'post',
            data: qs.stringify(data)
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长推送
export const GetHomeWorkPush = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/GetHomeWork',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

// ================修改
// 老师获取家庭作业
export const GetHomeWorkByTeachNew = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/GetHomeWorkByTeachNew',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长获取家庭作业
export const GetHomeWorkByParentNew = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: homeWorkUrl + '/api/HomeWork/GetHomeWorkByParentNew',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
