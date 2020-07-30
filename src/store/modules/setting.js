import {exit} from "@/api/studyApi"
import cookie from "@/util/cookie"
const setting = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        loginOut (){
            var openId = cookie.get("OpenId")
            
            exit({
             openId:openId
            }).then((data) => {
                var data=JSON.parse(data)
                if(data.Code==200){
                   cookie.clearAll()
                    // console.log(data);
                    localStorage.clear()
                    window.location.href = "http://mappv2.xueerqin.net/Common/Login.shtml"
                }
                
            });
        }
      
    }
}
export default setting
