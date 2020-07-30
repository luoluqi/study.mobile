import {addTemperatureApi} from '@/api/temperatureApi'

const temperature = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
      // 添加人员温度
      addTemperatureApi ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
          addTemperatureApi(params).then(res => {
                resolve(res)
            })
        })
      }
    }
}
export default temperature
