import {GetExamStatistics, GetScoreDistributed, GetScoreDetailsTeach, GetScoreDetailsParent, GetSur} from '@/api/examStaticApi'
import router from '@/router'
import Vue from 'vue'
const examStatic = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
      
    },
    actions: {
        // 获取考试统计
        getExamStatistics ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                    GetExamStatistics(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 获取分数段分布
        getScoreDistributed ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                    GetScoreDistributed(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 获取班级分数明细 
        getScoreDetailsTeach ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                    GetScoreDetailsTeach(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 获取个人分数明细 
        getScoreDetailsParent ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                    GetScoreDetailsParent(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 获取个人排名 GET /api/ExamMoblie/GetSur
        getSur ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                GetSur(params).then(res => {
                    resolve(res)
                })
            })
        }
    }
}
export default examStatic
