
import{setParentInfo, checkParent, registerParent, connectParent, checkCode, getCodeImg, getParentsList, getStudentInfo} from '@/api/inviteParentsApi'
const inviteParents = {
    namespaced: true,
    state: { 
      inviteObj: localStorage.inviteObj ? JSON.parse(localStorage.inviteObj) : '',
      isMine: localStorage.isMine ? localStorage.isMine : false
    },
    getters: {
       
    },
    mutations: { 
        setInviteObj (state, obj) {
          state.inviteObj = obj
          localStorage.inviteObj = JSON.stringify(obj)
        },
        setMine (state, flag) {
          state.isMine = flag
          localStorage.isMine = flag
        }
    },
    actions: {
      SetParentInfo ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          setParentInfo(params).then(res => {
                resolve(res)
            })
        })
      },
      CheckParent ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          checkParent(params).then(res => {
                resolve(res)
            })
        })
      },
      RegisterParent ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          registerParent(params).then(res => {
                resolve(res)
            })
        })
      },
      ConnectParent ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          connectParent(params).then(res => {
                resolve(res)
            })
        })
      },
      CheckCode ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          checkCode(params).then(res => {
                resolve(res)
            })
        })
      },
      GetCodeImg ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getCodeImg(params).then(res => {
                resolve(res)
            })
        })
      },
      GetParentsList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getParentsList(params).then(res => {
                resolve(res)
            })
        })
      },
      GetStudentInfo ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getStudentInfo(params).then(res => {
            resolve(res)
          })
        })
      }
    }
}
export default inviteParents
