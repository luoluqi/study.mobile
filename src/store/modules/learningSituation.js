import {getStudentExam, getExamTypeListOnApp, getExamListOnApp, getScoreReadSet, readStudentScore, getSchoolYearList, getSchoolTermList} from '@/api/learningSituationApi'
const learningSituation = {
    namespaced: true,
    state: {
        examId: localStorage.examId ? localStorage.examId : '',
        examTypeId: '',
        currentTerm: localStorage.currentTerm ? JSON.parse(localStorage.currentTerm) : {name: '上学期', id: '1'},
        currentSchoolYear: localStorage.currentSchoolYear ? JSON.parse(localStorage.currentSchoolYear) : {name: '2019-2020学年', id:'1'}
    },
    getters: {
    },
    mutations: {
        setExamId (state, id) {
            state.examId = id
            localStorage.examId = id
        },
        setExamTypeId (state, id) {
            state.examTypeId = id
        },
        setCurrentTerm (state, obj) {
            state.currentTerm = obj
            localStorage.currentTerm = JSON.stringify(obj)
        },
        setCurrentSchoolYear (state, obj) {
            state.currentSchoolYear = obj
            localStorage.currentSchoolYear = JSON.stringify(obj)
        }
    },
    actions: {
        GetStudentExam ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getStudentExam(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetExamTypeListOnApp ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getExamTypeListOnApp(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetExamListOnApp ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getExamListOnApp(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetScoreReadSet ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getScoreReadSet(params).then(res => {
                    resolve(res)
                })
            })
        },
        ReadStudentScore ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                readStudentScore(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetSchoolYearList ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getSchoolYearList(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetSchoolTermList ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getSchoolTermList(params).then(res => {
                    resolve(res)
                })
            })
        }
    }
}
export default learningSituation
