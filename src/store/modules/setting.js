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

                    var url = location.origin + location.pathname
                   
                    location.href = url.replace('index.html', 'static/login.html')
            
                }
                
            });
        }
      
    }
}
export default setting
