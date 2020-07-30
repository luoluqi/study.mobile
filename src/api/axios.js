import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
import cookie from '@/util/cookie'
import {refreshToken} from '@/api/commonApi'
import { Encrypt } from '@/util/crypto'
// console.log(axios)
axios.defaults.timeout = 0
axios.defaults.withCredentials = false // 跨域请求，允许保存cookie
// console.log(axios.defaults)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 签名
  config.headers['sign'] = Encrypt(new Date().getTime())

  config.headers['openId'] = cookie.get('OpenId')
  config.headers['wxMiniProgramToken'] = cookie.get('unionID')
  config.headers['clientMark'] = 'mobile'
  var authToken = cookie.get('authToken')
  if (authToken) {
    authToken = decodeURIComponent(authToken)
    authToken = JSON.parse(authToken)
    config.headers['Authorization'] = 'Bearer ' + authToken.access_token
  }


  if (axios.noLoading) {
    axios.noLoading = false
  } else {
    Vue.$vux.loading.show({
      text: '加载中'
    })
  }



  // if(config.params){
  // 	config.params.yiyu_token= store.state.user.token;
  // }else{
  // 	config.params = {};
  // 	config.params.yiyu_token=store.state.user.token;
  // }

  var loginName = cookie.get('loginName')
  if (loginName) {
    config.headers['loginName'] = loginName
  } else {
    config.headers['loginName'] = '13700000011'
  }
  var roleCode = cookie.get('roleCode')
  if (roleCode) {
    config.headers['roleCode'] = roleCode
  } else {
    config.headers['roleCode'] = 'Teacher'
  }

  // if (roleCode == 'Teacher' && location.hash.search(/kitchen/) != -1) {
  //   config.headers['roleCode'] = 'SchoolAdmin'
  // }

  var Token = cookie.get('Token')
  if (Token) {
    config.headers['Token'] = Token
  }

  return config

}, function (error) {
  console.log('error' + error)
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  Vue.$vux.loading.hide();
  var data = response.data
  if (typeof data == 'string') {
    if (data) {
      if(typeof data == 'object'){
        data = JSON.parse(data)
      }

    }

  }
  if (data.status == 500) {
    // alert(data.msg)
  }
  return response
}, function (error) {
  Vue.$vux.loading.hide();
  console.log('error:', error)
  if (error.response.status == 302) {
    Vue.$vux.toast.text('状态：302，请重新登陆')
    location.href = 'http://mappv2.xueerqin.net/common/login.shtml'
  } else if (error.response.status == 403) {
    Vue.$vux.toast.text(error.response.data.error.message, 'top')
  } else if (error.response.status == 401) {
    // Vue.$vux.alert.show({
    //     content: '401 登录过期，请重新登陆',
    //     maskZIndex: 100,
    //     onHide () {
    //       store.dispatch('setting/loginOut')
    //     }
    // })
    var params = {
      refreshtoken: (JSON.parse(decodeURIComponent(cookie.get('authToken')))).refresh_token
    }
    refreshToken(params).then(
      res => {
        let domain = '.xueerqin.net'
        cookie.set('authToken',encodeURIComponent(JSON.stringify(res)),0,domain)
        // this.$vux.toast.text('当前token已过期,请刷新页面',top)
        Vue.$vux.alert.show({
            content: '当前token已过期,请刷新页面',
            maskZIndex: 100,
            onHide () {
              window.location.reload()
            }
        })
      }
    ).catch(
      () => {
        store.dispatch('setting/loginOut')
      }
    )
    return
  }
  else {
    Vue.$vux.toast.text(error.response.data.error.message, 'top')
  }

  return Promise.reject(error.response.data.error.message)
})
export default axios
