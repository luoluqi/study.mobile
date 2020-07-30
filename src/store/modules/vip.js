import {getParentVip, getOrder, getOrderList, getChaegeMessage, getResidualFlowAndResidualMinute, getPayStutus} from '@/api/vipApi'
const vip = {
    namespaced: true,
    state: {
        userData:{}
    },
    getters: {
    },
    mutations: {
        SET_USERINFO(state,params){
            state.userData = params
        }
    },
    actions: {
        GetParentVip ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getParentVip(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetOrder ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getOrder(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetOrderList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getOrderList(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetChaegeMessage ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getChaegeMessage(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetResidualFlowAndResidualMinute ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getResidualFlowAndResidualMinute(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetPayStutus ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
              getPayStutus(params).then(res => {
                    resolve(res)
                })
            })
        }
    }
}
export default vip
