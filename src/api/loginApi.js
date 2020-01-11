import axios from '@/api/axios'
import store from '@/store'
import cookie from '@/util/cookie'
import {getStudentDetail} from '@/api/studyApi'


//获取token
var token = cookie.get("Token");
// var search  = location.search.split("?")[1];
// var token;
// if(search){
// 	var arr = search.split("&");
// 	search = {};
// 	for(var item of arr){
// 		var temp = item.split("="); 
// 		var key = temp[0];
// 		var value = temp[1];
// 		search[key] = value;
// 	}
// 	token = search.token;
	
// }


if(!token){
	token = "9510017f";
	console.log("token不存在,使用临时token="+token);
}
store.state.user.token = token;

export const login = () => {
    return new Promise((resolve,reject) => {
        axios({
            url: '/api/Check/GetUserCode',
            params : {
                token : token
            }
           
        }).then(res => {
          
            
            resolve(res.data)
           
        })
    });
}


