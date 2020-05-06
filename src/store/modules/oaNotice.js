import {addNotice,
    getNotice,
    getNotices,
    getNoticesByTeacher,
    remind,
    setRead,
    setConfirm,
    getReadList,
    getUnReadNumber,
    getNoticesById,
    getNoticeByTeacher
    } from '@/api/oaNoticeApi'
const oaNotice = {
namespaced: true,
state: {
    noticeDetail: localStorage.noticeDetail ? JSON.parse(localStorage.noticeDetail) : '',
    currentTemplate: '',
    whoTopunish: localStorage.whoTopunish ? localStorage.whoTopunish : 2,
    noticeId: localStorage.noticeId ? localStorage.noticeId : '',
    commitNoticeId: ''
},
getters: {
},
mutations: {
    setNoticeDetail (state, noticeDetail){
        state.noticeDetail = noticeDetail
        localStorage.noticeDetail =JSON.stringify(noticeDetail) 
    },
    setNoticeId (state, noticeId){
        state.noticeId = noticeId
        localStorage.noticeId = noticeId
    },
    setTemplate (state, currentTemplate) {
        state.currentTemplate = currentTemplate
    },
    setwhoTopunish (state, num) {
        state.whoTopunish = num
        localStorage.whoTopunish = num
    }
},
actions: {
       AddNotice ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            addNotice(params).then(res => {
                resolve(res)
            })
        })
      },
      GetNotice ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getNotice(params).then(res => {
                resolve(res)
            })
        })
      },
      GetNotices ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getNotices(params).then(res => {
                resolve(res)
            })
        })
      },
      GetNoticesByTeacher ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getNoticesByTeacher(params).then(res => {
                resolve(res)
            })
        })
      },
      Remind ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            remind(params).then(res => {
                resolve(res)
            })
        })
      },
      SetRead ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            setRead(params).then(res => {
                resolve(res)
            })
        })
      },
      SetConfirm ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            setConfirm(params).then(res => {
                resolve(res)
            })
        })
      },
      GetReadList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getReadList(params).then(res => {
                resolve(res)
            })
        })
      },
      GetUnReadNumber ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getUnReadNumber(params).then(res => {
                resolve(res)
            })
        })
      },
      GetNoticesById ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getNoticesById(params).then(res => {
                resolve(res)
            })
        })
      },
      GetNoticeByTeacher ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getNoticeByTeacher(params).then(res => {
                resolve(res)
            })
        })
      }
}
}
export default oaNotice
