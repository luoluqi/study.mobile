import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mobileCommon from './modules/mobileCommon'
import clock from './modules/clock'
import menu from './modules/menu'
import study from "./modules/study"
import user from "./modules/user"
import checking from "./modules/checking"
import circle from "./modules/circle"
import notice from "./modules/notice"
import partyBuild from "./modules/partyBuild"
import answer from "./modules/answer"
import sign from "./modules/sign"
import news from './modules/news'
import exam from './modules/exam'
import examStatic from './modules/examStatic'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    mobileCommon,
    clock,
    menu,
    study,
    checking,
    circle,
    user,
    notice,
    partyBuild,
    sign,
    answer,
    exam,
    news,
    examStatic
  },
  getters,
  state:{
    imgSrc:"http://www.xueerqin.net:9526/fs/"
   
  }
})
export default store
