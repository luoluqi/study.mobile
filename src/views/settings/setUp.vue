<template>
    <div class="setting">
       <headNav :title="'设置'"></headNav>
       <!-- <div class="setTit">
           <div class="person">
               <img src="@/assets/img/11.png" alt="">
           </div>
           <span>刘晓丽</span>
           <div class="extit">
               <img src="@/assets/img/mobileExit.png" alt="">
               <span>退出登录</span>
           </div>
       </div> -->
       <div class="setList">
           <ul>
                <router-link tag="li" to="/schoolAccount/index">
                    <img class="yuanT" src="@/assets/img/schoolaccount/i1.png" alt="">
                    <span>校园账户</span>
                    <img class="arrYou" src="@/assets/img/a-arrow.png" alt="">
                </router-link>
                <!-- <li 
                    @click="">
                    <img class="yuanT" :src="item.ImgUrl" alt="">
                    <span>校园账户</span>
                    <img class="arrYou" src="@/assets/img/a-arrow.png" alt="">
                </li> -->
             
                <li v-for="(item,index) in setData" :key="index"
                    @click="toUrl(item)">
                        <img class="yuanT" :src="item.ImgUrl" alt="">
                        <span>{{item.Name}}</span>
                        <img class="arrYou" src="@/assets/img/a-arrow.png" alt="">
                </li>
            
           </ul>
       </div>
       <div class="exit" @click="DropOut()">退出登录</div>
       <!-- <div class="batch"><img src="@/assets/img/readding.png" alt=""></div> -->
       <bottomNav :index="4"></bottomNav>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {setUp,exit} from "@/api/studyApi"
import cookie from "@/util/cookie"
export default {
    components: {
    headNav,
    bottomNav
  },
  computed:{
      childList(){
          return this.$store.state.user.childList
      }
  },
  data(){
      return {
         setData:[],
         openId:'',
         schoolId:'',
         roleCode:''
        //  isMoreRole:''
      }
  },
   mounted(){
		this.SetUp()
        // this.setCookie('isNewLoad',true,0)
        // console.log(this.getCookie('roleCode'))
        if(this.getCookie('roleCode')=='Teacher'){
           this.$router.push('/settings/TsetUp')
        }
	},
  methods:{
      toUrl(item){
          if(item.Name == '设置' && this.childList.length == 0){
              this.$vux.toast.text('您没有设置孩子', 'top')
              return
          }
          location.href = item.Url
      },
    //   获取个人中心设置
        SetUp(){
            this.roleCode = this.getCookie("roleCode")
            if(!this.roleCode){
                    this.roleCode = "null";
                }
             this.schoolId = this.getCookie("schoolId")
            if(!this.schoolId){
                    this.schoolId = "eeeea2b869e44b3bbd797f4d781aceaf";
                }
            setUp({
                type:"1",
                roleCode:this.roleCode,
                schoolId:this.schoolId
                }).then((data) => {
                    var data=JSON.parse(data)
                    for(var obj of data.Data){
                        if(obj.Name == '帮助'){
                            //  obj.Url = 'http://m.xueerqin.net/study/index.html#help/index'
                            obj.Url = location.href
                        }
                    }
                    this.setData = data.Data
                    // console.log(this.setData);
                    // alert(JSON.stringify(this.setData))
                    this.switchIdentities(this.setData)
                    for( var obj of this.setData){
                        if(obj.Name=="切换身份"){
                            obj.Url="#/role"
                        }
                    }
                    
                });
        },
      //   获取cookie中的值
      getCookie(sName){
            var aCookie = document.cookie.split("; ");
            for (var i=0; i < aCookie.length; i++){
                var aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                return unescape(aCrumb[1]);
            }
            return null;
        },
        DropOut (){
            this.$store.dispatch('setting/loginOut')
        },
        // 判断是否需要切换身份
        switchIdentities(setData){
           var isMoreRole=this.getCookie("isMoreRole")
            //   alert(isMoreRole)
            if( isMoreRole !='true'){
                setData.pop();
            }
        },
        setCookie (name, value, expiresHours) {
            var dateTime = new Date()
            var msTime = 240 * 3600 * 1000
            dateTime.setTime(dateTime.getTime() + msTime)
            var cookieString = name + "=" + value + ";domain=" + "xueerqin.net" + ";path=" + '/'
            if (expiresHours > 0) {
                var date = new Date()
                var ms = expiresHours * 3600 * 1000
                date.setTime(date.getTime() + ms)
                cookieString = cookieString + ";expires=" + date.toGMTString() + ";domain=" + "xueerqin.net"
            }
            document.cookie = cookieString
        }
  }
 
 
}
</script>
<style scoped src="@/assets/css/setting.css">

</style>

