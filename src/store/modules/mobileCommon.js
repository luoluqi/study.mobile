import {getTokenByMoblie} from '@/api/commonApi'
const mobileCommon = {
    namespaced: true,
    state: {
        title: 'header'
    },
    getters: {
    },
    mutations: {
        SET_TITLE (state, params) {
            state.title = params
        }
    },
    actions: {
        getTokenByMoblie ({ state, commit, dispatch }) {
            return new Promise((resolve, reject) => {
                getTokenByMoblie().then(res => {
                    debugger
                    res = JSON.parse(res)
                })
            })
        }
    }
}
export default mobileCommon
