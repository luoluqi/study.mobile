import axios from './axios'
import qs from 'qs'
import {examUrl} from '@/config/config'

// 获取学年和学期
export const GetSchoolYears = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetSchoolYearsAndTerm',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取科目 /api/Exam/GetSubjectList
export const GetSubjectList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/Exam/GetSubjectList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}


// 教师获取考试列表
export const GetExamListTeachBySubject = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetExamListTeachBySubject',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 家长获取考试列表
export const GetExamListParentBySubject = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetExamListParentBySubject',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
