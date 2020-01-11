import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import study from './modules/study'
import partyBuild from './modules/partyBuild'
import wrong from './modules/wrong'
import checkingIn from './modules/checkingIn'
import settings from './modules/settings'
import circle from './modules/circle'
import outIn from './modules/outIn'
import pushDetail from './modules/pushDetail'
import homeWork from './modules/homeWork'
import classNotice from './modules/classNotice'
import test from './modules/test'
import exam from './modules/exam'


Vue.use(Router)

const router =  new Router({
  routes: [
    
    study,
    wrong,
    checkingIn,
    settings,    
    circle,    
    outIn,   
    pushDetail,    
    homeWork,   
    partyBuild,
    classNotice,
    test,
    exam,
    
    {
      path: '/404',
      name:'lost',
      component: () => import('@/views/error/404'),
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
})