import axios from './axios'
import qs from 'qs'
import {partyBuildUrl} from '@/config/config'

// 获取每日答题 获取5条不重复的
export const CreateDay = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: partyBuildUrl + '/api/Answer/CreateDay',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取每周答题 获取10条不重复的
export const CreateWeek = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: partyBuildUrl + '/api/Answer/CreateWeek',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取每日挑战
export const CreateChallenge = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: partyBuildUrl + '/api/Answer/CreateChallenge',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 获取某一题的答案
export const GetSubjectAnswer = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: partyBuildUrl + '/api/Answer/GetSubjectAnswer',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 用户答题
export const SubmitAnswer = (data) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: partyBuildUrl + '/api/Answer/SubmitAnswer',
            method: 'post',
            data
        }).then(res => {
            resolve(res.data)
        })
    });
}
// 统计
export const StatisticsList = (params) => {
	// console.log(params)
    return new Promise((resolve,reject) => {
        axios({
            url: partyBuildUrl + '/api/Answer/StatisticsList',
            method: 'get',
            params
        }).then(res => {
            resolve(res.data)
        })
    });
}