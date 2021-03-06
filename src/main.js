// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import common from '@/assets/js/common.js'
// 运用公共函数
Vue.use(common)

// import FastClick from 'fastclick'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
// import Calendar from 'vue-mobile-calendar'
// Vue.use(Calendar)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
// FastClick.attach(document.body)
// require('es6-promise').polyfill()
import './util/rem'
import './mixins/install'
Vue.config.productionTip = false


import "./filter/filter"
import '@/assets/css/public.css';
import '@/assets/css/index_app.css'
import '@/style/quill.core.css'

// 播放m3u8的插件使用
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
const hls = require('videojs-contrib-hls')
Vue.use(hls)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// history.pushState(null, null, document.URL);
// window.addEventListener('popstate', function () {
//     history.pushState(null, null, document.URL);
// });
