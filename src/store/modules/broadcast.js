
import {
    schoolVoiceBroadcast,
    getVoiceBroadcast,
    sendOnTime,
    sendVoiceBroadcastCallback,
    gradesBySchoolId,
    classList,
    uploadAmr
    } from '@/api/broadcastApi'
const broadcast = {
    namespaced: true,
    state: {
        isSchool: 0
    },
    getters: {
    },
    mutations: {
        clear (state) {
            state.isSchool = 0
        }
    },
    actions: {
        SchoolVoiceBroadcast ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                schoolVoiceBroadcast(params).then(res => {
                    resolve(res)
                })
            })
          },
          GetVoiceBroadcast ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getVoiceBroadcast(params).then(res => {
                    resolve(res)
                })
            })
          },
          SendOnTime ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                sendOnTime(params).then(res => {
                    resolve(res)
                })
            })
          },
          SendVoiceBroadcastCallback ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                sendVoiceBroadcastCallback(params).then(res => {
                    resolve(res)
                })
            })
          },
          GradesBySchoolId ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                gradesBySchoolId(params).then(res => {
                    resolve(res)
                })
            })
          },
          ClassList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                classList(params).then(res => {
                    resolve(res)
                })
            })
          },
          UploadAmr ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                uploadAmr(params).then(res => {
                    resolve(res)
                })
            })
          }
    }
}
export default broadcast
