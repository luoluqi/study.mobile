import axios from './axios'
import qs from 'qs'
// import {examUrl} from '@/config/config'
let examUrl = 'http://192.168.66.218:7559'
// 获取学年和学期
export const getStudentExam = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/queryStudentExamInfoApp',
            method: 'post',
            data: qs.stringify(params) 
        }).then(res => {
            resolve(res.data)
        })
    })
}
 // 获取考试类型列表 /academic-analysis/query/queryExamTypeListOnApp
 export const getExamTypeListOnApp = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/queryExamTypeListOnApp',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
 // 获取考试类型列表 /academic-analysis/query/queryExamListOnApp
 export const getExamListOnApp = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/queryExamListOnApp',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取 已读列表 /academic-analysis/query/getScoreReadSet
export const getScoreReadSet = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/getScoreReadSet',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 设置已读 /academic-analysis/query/readStudentScore
export const readStudentScore = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/readStudentScore',
            method: 'post',
            data: qs.stringify(params) 
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取学年列表 /academic-analysis/query/querySchoolYearList
export const getSchoolYearList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/querySchoolYearList',
            method: 'post',
            data: qs.stringify(params) 
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取学期列表 /academic-analysis/query/getTermList
export const getSchoolTermList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/academic-analysis/query/getTermList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    })
}