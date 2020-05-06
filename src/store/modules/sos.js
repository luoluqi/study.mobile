// import {sign} from '@/api/signApi'
import {familyPhonesState, listenPhoneList, setOrUpdateFamilyPhones, sendListen,studentDevice} from '@/api/sosApi'
const sos = {
    namespaced: true,
    state: {
        sosItem: localStorage.sosItem ? JSON.parse(localStorage.sosItem) : '',
        newAdress: localStorage.newAdress ? JSON.parse(localStorage.newAdress) : ''
    },
    getters: {
    },
    mutations: {
        getSosItem (state, item) {
            state.sosItem = item
            localStorage.sosItem = JSON.stringify(item)
        },
        getNewAdress  (state, item) {
            state.newAdress = item
            localStorage.newAdress = JSON.stringify(item)
        }
    },
    actions: {
         // 获取亲情号码列表
         FamilyPhonesState ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                familyPhonesState(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 获取监听号码列表
        ListenPhoneList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                listenPhoneList(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 添加亲情号码
        SetOrUpdateFamilyPhones ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                setOrUpdateFamilyPhones(params).then(res => {
                    resolve(res)
                }).catch(res => {
                    reject(res)
                })
            })
        },
        // 发送监听
        SendListen ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                sendListen(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 设备类型
        StudentDevice ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentDevice(params).then(res => {
                    resolve(res)
                })
            })
        }
    }
        
}
export default sos
