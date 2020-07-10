import { listFoodPicVo, listTodayFoodsMenuVos, uploadFoodsPic, getWeekToday, getWeekList, listKitchen, watchKitchenMonitor } from '@/api/kitchenApi'
const kitchen = {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // 获取今日菜品实拍
    ListFoodPicVo ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        listFoodPicVo(params).then(res => {
          resolve(res)
        })
      })
    },
    // 查看今日菜谱
    ListTodayFoodsMenuVos ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        listTodayFoodsMenuVos(params).then(res => {
          resolve(res)
        })
      })
    },
    // 上传实拍
    UploadFoodsPic ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        uploadFoodsPic(params).then(res => {
          resolve(res)
        })
      })
    },
    // 获取当日时间
    GetWeekToday ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        getWeekToday(params).then(res => {
          resolve(res)
        })
      })
    },
    // 获取周数据
    GetWeekList ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        getWeekList(params).then(res => {
          resolve(res)
        })
      })
    },
    // 查看厨房列表
    ListKitchen ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        listKitchen(params).then(res => {
          resolve(res)
        })
      })
    },
    // 查看厨房监控
    WatchKitchenMonitor ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        watchKitchenMonitor(params).then(res => {
          resolve(res)
        })
      })
    }
  }
}
export default kitchen
