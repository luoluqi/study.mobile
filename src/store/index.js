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
import homework2 from './modules/homework2'
import notice2 from './modules/notice2'
import media from './modules/media'
import checkingIn2 from './modules/checkingIn2'
import selectTeacher from './modules/selectTeacher'
import oa from './modules/oa'
import oaNotice from './modules/oaNotice'
import map from './modules/map'
import link from './modules/link'
import help from './modules/help'
import sos from './modules/sos'
import kitchen from './modules/kitchen'
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
    notice2,
    partyBuild,
    sign,
    answer,
    exam,
    news,
    examStatic,
    homework2,
    notice2,
    media,
    checkingIn2,
    selectTeacher,
    oa,
    oaNotice,
    map,
    link,
    help,
    sos,
    kitchen
  },
  getters,
  state: {
    imgSrc: "http://www.xueerqin.net/fs/"

  }
})
export default store
