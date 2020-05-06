import {addNotice,
        getNoticeTemplate,
        getNoticeByType,
        updateNotice,
        deleteNotice,
        releaseNotice,
        getNotice,
        getNotices,
        getNoticesByParent,
        remind,
        addLike,
        setRead,
        setConfirm,
        getReadList,
        getUnReadNumber,
        getNoticesById,
        getNoticeByParent,
        addNoticeByManager,
        getReadListByManager
        } from '@/api/noticeApi2'
import {getGrade,getClass} from '@/api/commonApi'
const notice2 = {
    namespaced: true,
    state: {
        noticeDetail: localStorage.noticeDetail ? JSON.parse(localStorage.noticeDetail) : '',
        currentTemplate: '',
        whoTopunish: localStorage.whoTopunish ? localStorage.whoTopunish : 2,
        noticeId: localStorage.noticeId ? localStorage.noticeId : ''
    },
    getters: {
    },
    mutations: {
        setNoticeDetail (state, noticeDetail){
            state.noticeDetail = noticeDetail
            localStorage.noticeDetail = JSON.stringify(noticeDetail)
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
            // 获取年级
          GetGrade ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getGrade(params).then(res => {
                    resolve(res)
                })
            })
          },
          // 获取班级
          GetClass ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getClass(params).then(res => {
                    resolve(res)
                })
            })
          },
          //校管发布公告
          
          AddNoticeByManager ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                addNoticeByManager(params).then(res => {
                    resolve(res)
                })
            })
          },
           AddNotice ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                addNotice(params).then(res => {
                    resolve(res)
                })
            })
          },
          GetNoticeTemplate ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getNoticeTemplate(params).then(res => {
                    resolve(res)
                })
            })
          },
          GetNoticeByType ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getNoticeByType(params).then(res => {
                    resolve(res)
                })
            })
          },
          UpdateNotice ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                updateNotice(params).then(res => {
                    resolve(res)
                })
            })
          },
          // 删除公告
          DeleteNotice ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                deleteNotice(params).then(res => {
                    resolve(res)
                })
            })
          },
          // 确认发布 releaseNotice
          ReleaseNotice ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                releaseNotice(params).then(res => {
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
          GetNoticesByParent ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getNoticesByParent(params).then(res => {
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
          AddLike ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                addLike(params).then(res => {
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
          // 校管获取已读未读列表
          GetReadListByManager ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getReadListByManager(params).then(res => {
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
          GetNoticeByParent ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getNoticeByParent(params).then(res => {
                    resolve(res)
                })
            })
          }
    }
}
export default notice2
