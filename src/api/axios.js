import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
import   cookie from '@/util/cookie'
import {Encrypt} from '@/util/crypto'
console.log(axios)
axios.defaults.timeout = 0
axios.defaults.withCredentials = false // 跨域请求，允许保存cookie
console.log(axios.defaults)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 签名
	config.headers['sign'] = Encrypt(new Date().getTime())

	config.headers['openId'] = cookie.get('OpenId')

	if(axios.noLoading){
		axios.noLoading = false
	}else{
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
	
	var loginName =  cookie.get('loginName')
	if(loginName){
		config.headers['loginName'] = loginName
	}else{
		config.headers['loginName'] = '13700000011'
	}
	var roleCode =  cookie.get('roleCode')
	if(roleCode){
		config.headers['roleCode'] = roleCode
	}else{
		config.headers['roleCode'] = 'Teacher'
	}
	var Token =  cookie.get('Token')
	if(Token){
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
	if(typeof data == 'string'){
		if(data){
			data = JSON.parse(data)
		}
		
	}
	if(data.status == 500){
		// alert(data.msg)
	}
	return response
}, function (error) {
	Vue.$vux.loading.hide();
	console.log('error:',error)
	if(error.response.status == 302){
		Vue.$vux.toast.text('状态：302，请重新登陆')
		// location.href = 'http://mappv2.xueerqin.net/common/login.shtml'
	}else if(error.response.status == 403){
		Vue.$vux.toast.text(error.response.data.error.message)
	}
	else{
		alert(JSON.stringify(error))
	}
	 
	return Promise.reject(error.response.data.error.message)
})
export default axios


