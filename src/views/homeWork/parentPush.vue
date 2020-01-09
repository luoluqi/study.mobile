<template>
    <div id="Work">
        <headNav :isBack="false" :isHome='isHome' title="作业详情"></headNav>
        <div class="s_scetion" >
            <div class="subWei">
                <h2>{{workList.SubjectName}}</h2>
            </div>
            <p>{{workList.Content}}</p>
            <div class="zuoyeList">
                <ul >
                    <li @click="previewImg(workList.Imgs,img)" v-for="(img,index) in workList.Imgs" :key="index"><img  :src="img | imgUrl" /></li>
                </ul>
            </div>
            <p><label>{{workList.CreateTime | formatDateTime('YYYY-MM-DD')}}</label></p>
        </div>
        
        <div class="box">
            <img src="@/assets/img/homeWork/23132.jpg" />
        </div>
        <!-- <bottomNav></bottomNav> -->
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
// import bottomNav from '@/components/bottomNav/bottomNav'
import {GetHomeWorkPush,SetRead} from '@/api/homeWorkApi'
import  cookie from '@/util/cookie'
import {exit} from "@/api/studyApi"
export default {
     components:{
       headNav
    },
    data() {
        return {
            isHome:false,
            isShow:false,
            workList:'',
            imgList:'',
            readCount:'', 
            readList:'',
            unreadList:'',
            unreadCount:'',
            idList:[]
        }
    },
    mounted(){
        
    //   var list = this.$store.state.user.workItem
    //   if(!list){
    //         this.$router.push('parentWorkList')
    //   }
          
    //   this.workList = list
    //   console.log(this.workList)
    //   if(this.$store.getters['user/parentId'] != this.getQueryVariable('parentId')){
    //       cookie.clear()
    //      location.href = 'http://mappv2.xueerqin.net/common/login.shtml'
    //      return
    //   }
    if(this.$store.getters['user/parentId'] == this.getQueryVariable('parentId')){
        this.isHome = true
    }else{
        this.isHome = false
    }
     this.getWork()
    },
    methods:{
        loginout(){
             var openId = cookie.get("OpenId")
                //   alert(this.openId)
                if(!openId){
                    openId = "null";
                }
            exit({
                openId:openId
                }).then((data) => {
                    var data=JSON.parse(data)
                    if(data.Code==200){
                        // console.log(data);
                        cookie.set('pushUrl',window.href)
                        window.location.href=data.Msg
                    }
                    
                    
                });
        },
        // 获取url参数
         getQueryVariable(variable){
                var query = window.location.search.substring(1)
                var vars = query.split("&")
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=")
                        if(pair[0] == variable){return pair[1]}
                }
                return(false)
            },
        previewImg(list,img){

          
            wx.previewImage({
                current: img, // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            })

        },
       
        detailHide (){
            this.isShow = false
        },
        getWork(){
            GetHomeWorkPush({
                id:this.getQueryVariable('homeWorkId') ? this.getQueryVariable('homeWorkId') : 'f838306ae82c4b63bf0850445dcc611f'
                }).then((data) =>{
                var data = JSON.parse(data)
                if(data.Code == 200){
                    if(!data.Data){
                         this.$vux.toast.text('该作业不存在或者已被删除', 'top')
                         return
                    }
                    this.workList=data.Data
                    if(this.workList.Imgs){
                        this.workList.Imgs = this.workList.Imgs.split(',')
                    }else{
                        this.workList.Imgs = []
                    }
                   this.isRead()
                }
                
            })
        },
        // s设置已读
        isRead(){
           //   设置已读list
            // for(var itemId of this.workList){
            //     this.idList.push(itemId.Id)
            // }
            // console.log(this.idList)
            var prams = {
                parentId:this.getQueryVariable('parentId') ? this.getQueryVariable('parentId') : 'e49e92de846b47fb96f96242c145e463',
                homeWorkIds:this.getQueryVariable('homeWorkId') ? this.getQueryVariable('homeWorkId') : 'f838306ae82c4b63bf0850445dcc611f'
            }
            SetRead({data:JSON.stringify(prams)}).then((data) =>{
                var data = JSON.parse(data)
            })
        }
    }
}
</script>
<style scoped src="@/assets/css/homeWork.css"></style>