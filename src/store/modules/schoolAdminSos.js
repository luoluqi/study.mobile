import {saveSosNumber, getSosInformation} from '@/api/schoolAdminSosApi'

const schoolAdminSos = {
    namespaced: true,
    state: {
     // allColumn: localStorage.allColumn ? JSON.parse(localStorage.allColumn) : []
    },
    getters: {
    },
    mutations: {
      // 改变所有栏目的值
      // changeAllColumn (state, val) {
      //   state.allColumn = val
      //   localStorage.allColumn = JSON.stringify(val)
      // }
    },
    actions: {
      // 保存校管SOS号码
      saveSosNumber ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          saveSosNumber(params).then(res => {
                resolve(res)
            })
        })
      },
      // 获取校管设置的SOS号码
      getSosInformation ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          getSosInformation(params).then(res => {
                resolve(res)
            })
        })
      }
    }
}
export default schoolAdminSos
