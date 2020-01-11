import axios from '@/api/axios'
import store from '@/store'
import cookie from '@/util/cookie'
import {getStudentDetail} from '@/api/studyApi'


//获取token
var search  = location.search.split("?")[1];
var token;
if(search){
	var arr = search.split("&");
	search = {};
	for(var item of arr){
		var temp = item.split("="); 
		var key = temp[0];
		var value = temp[1];
		search[key] = value;
	}
	token = search.token;
	
}


if(!token){
	token = "7dd306cd";
	console.log("token不存在");
}



axios({
    url: '/api/Check/GetUserCode',
    params : {
        token : token
    }
   
}).then(res => {
    store.state.loginUserId = res.data;
    return getStudentDetail(res.data);
   
}).then((res) => {
    
    var user = res.data;
    user.token = token;
    store.state.user = user;

});
