import {sign} from '@/api/signApi'
const signs = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        Sign ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            sign(params).then(res => {
                resolve(res)
            })
        })
      }
    }
}
export default signs
