import axios from './axios'
import qs from 'qs'
import {examUrl} from '@/config/config'

// 获取考试统计 GET /api/ExamMoblie/GetExamStatistics
export const GetExamStatistics = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetExamStatistics',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取分数段分布 GET /api/ExamMoblie/GetScoreDistributed
export const GetScoreDistributed = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetScoreDistributed',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取班级分数明细 GET /api/ExamMoblie/GetScoreDetailsTeach
export const GetScoreDetailsTeach = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetScoreDetailsTeach',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取个人分数明细 GET /api/ExamMoblie/GetScoreDetailsParent
export const GetScoreDetailsParent = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetScoreDetailsParent',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取个人排名 GET /api/ExamMoblie/GetSur
export const GetSur = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: examUrl + '/api/ExamMoblie/GetSur',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}

