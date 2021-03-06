import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import study from './modules/study'
import partyBuild from './modules/partyBuild'
import wrong from './modules/wrong'
import checkingIn from './modules/checkingIn'
import checkingIn2 from './modules/checkingIn2'
import settings from './modules/settings'
import circle from './modules/circle'
import outIn from './modules/outIn'
import pushDetail from './modules/pushDetail'

import homeWork2 from './modules/homeWork2'
import classNotice from './modules/classNotice'
import classNotice2 from './modules/classNotice2'
import test from './modules/test'
import exam from './modules/exam'
import oa from './modules/oa'
import map from './modules/map'
import help from './modules/help'
import link from './modules/link'
import sos from './modules/sos'
import oaNotice from './modules/oaNotice'
import kitchen from './modules/kitchen'
import schoolAccount from './modules/schoolAccount'
import inviteParents from './modules/inviteParents'
import broadcast from './modules/broadcast'
import vip from './modules/vip'
import menu from './modules/menu'
import role from './modules/role'
import login from './modules/login'
import temperature from './modules/temperature'
import learningSituation from './modules/learningSituation'
Vue.use(Router)

const router = new Router({
  routes: [
    study,
    wrong,
    checkingIn,
    checkingIn2,
    settings,
    circle,
    outIn,
    pushDetail,

    homeWork2,
    partyBuild,
    classNotice,
    classNotice2,
    test,
    exam,
    oa,
    map,
    help,
    link,
    sos,
    oaNotice,
    kitchen,
    schoolAccount,
    inviteParents,
    broadcast,
    menu,
    vip,
    role,
    login,
    temperature,
    learningSituation,
    {
      path: '/404',
      name: 'lost',
      component: () => import('@/views/error/404')
    },

    //   {
    //     path: '/',
    //     redirect: '/checkingIn/clockIn'
    //  },
    {
      path: '*',

      redirect: '/404'
    }

  ]
})
export default router



router.beforeEach((to, from, next) => {
  store
    .dispatch('user/getUserInfo', '')
    .then(res => {
      // console.log(JSON.parse(res))
      next()
    })
    .catch(error => {
      console.log(error)
      next()
    })
})
router.afterEach((to, from) => {
  window.document.title = to.meta.title
  document.body.scrollTop = document.documentElement.scrollTop = 0
})
