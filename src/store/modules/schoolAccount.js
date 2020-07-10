// import Vue from 'vue'
// import GPS from '@/util/gps'

import { getAccountByUserLoginId, pageUserConsumeOrders, pageUserRechargeOrders, courseOrderResult, studentRecharge } from '@/api/schoolAccountApi'
const schoolAccountApi = {
  namespaced: true,
  state: {
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    // 根据用户登录ID获取用户账号信息
    GetAccountByUserLoginId ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        getAccountByUserLoginId(params).then(res => {
          resolve(res)
        })
      })
    },
    // 分页获取用户消费明细
    PageUserConsumeOrders ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        pageUserConsumeOrders(params).then(res => {
          resolve(res)
        })
      })
    },
    // 分页获取用户充值明细
    PageUserRechargeOrders ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        pageUserRechargeOrders(params).then(res => {
          resolve(res)
        })
      })
    },
    // 支付结果回调
    CourseOrderResult ({ state, commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        courseOrderResult(params).then(res => {
          resolve(res)
        })
      })
    },
      // 账户充值
      StudentRecharge ({ state, commit, dispatch }, params) {
        return new Promise((resolve, reject) => {
          studentRecharge(params).then(res => {
            resolve(res)
          })
        })
      },
  }
}
export default schoolAccountApi