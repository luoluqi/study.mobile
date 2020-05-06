import {reportList,studentList,records,corrent,pageRecords
    } from '@/api/checkingApi2'
const checkingIn2 = {
    namespaced: true,
    state: {
        
    },
    getters: {
    },
    mutations: {
      
    },
    actions: {
        ReportList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                reportList(params).then(res => {
                    resolve(res)
                })
            })
          },
          StudentList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentList(params).then(res => {
                    resolve(res)
                })
            })
          },
          Records ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                records(params).then(res => {
                    resolve(res)
                })
            })
          },
          Corrent ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                corrent(params).then(res => {
                    resolve(res)
                })
            })
          },
          PageRecords ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                pageRecords(params).then(res => {
                    resolve(res)
                })
            })
          }
    }
}
export default checkingIn2