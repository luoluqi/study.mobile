
const partyBuild = {
    namespaced: true,
    state: {
        showSign:false
    },
    getters: {
    },
    mutations: {
        openSign(state){
            state.showSign = true
        },
        closeSign(state){
            state.showSign = false
        }
    },
    actions: { 
    }
}
export default partyBuild
