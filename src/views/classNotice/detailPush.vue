<template>
   <div id="noticeContent">
       <headNav :isBack="false" :isHome='isHome' title="通知公告"></headNav>
        <div style="background-color: #FFFFFF;">
            <div class="noticeContent">
                <h2><img src="@/assets/img/biao.png" /> 来自 {{curNotice.TeacherName}}</h2>
                <span>{{curNotice.CreateTime | formatDateTime('yyyy-MM-dd HH:mm:ss')}}</span>
            </div>
            <div class="noticeContentDetail">
                <h2>{{curNotice.Title}}</h2>
                <p>{{curNotice.Content}}</p>
                <!-- <div @click="opendReadDetail" class="read-div">
                    已读
                    <span class="red-num">{{readList.length}}</span>/{{readList.length + unreadList.length}}
                </div> -->
            </div>
        </div>
        <readDetail 
        v-show="isShow"
        :unreadList='unreadList' :readList='readList'
        @hide='hideReadDetail'></readDetail>
      
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import readDetail from '@/components/readDetail'
import {setRead,getReadList,getNotice} from '@/api/noticeApi'
import   cookie from '@/util/cookie'
export default {
    components:{
        headNav,readDetail
    },
    computed:{
      
    },
    data(){
        return {
            curNotice:{},
           unreadList:[],
           readList:[],
            isShow:false,
            isHome:false
        }
    },
    methods:{
        opendReadDetail(){
             this.isShow = true
        },
        hideReadDetail(){
            this.isShow = false
        },
        getParam(){
            var search = location.search
            search = search.substring(1)
            var arr = search.split('&')
            var param = {}
            for(var item of arr){
                var list = item.split('=')
                param[list[0]] = list[1]
            }
            return param
        }
    },
    mounted(){
        
        var param = this.getParam()
        var noticeId = param.noticeId
        var parentId = param.parentId

        // if(this.$store.getters['user/parentId'] != parentId){
        //     cookie.clear()
        //     location.href = 'http://mappv2.xueerqin.net/common/login.shtml'
        //     return
        // }
        if(this.$store.getters['user/parentId'] == parentId){
            this.isHome = true
        }else{
            this.isHome = false
        }


        getNotice(noticeId).then(res => {
            
            res = JSON.parse(res)
           
            this.curNotice = res.Data

            
        })
         setRead({data:JSON.stringify(
            {
                noticeId:noticeId,
                parentId:parentId
            }
        )}).then(res => {
             getReadList({
                noticeId:noticeId
            }).then(res => {
                
                res = JSON.parse(res)
                var read = res.Data.readList
                var unread =  res.Data.unreadList

                 this.unreadList = unread
                this.readList = read
               
            })
        })
        
    }
}
</script>
<style scoped src="@/assets/css/NoticeV2.css"></style>
<style scoped>
.read-div{
    text-align: right;
    padding: 0.2rem 0;
}
.red-num{
    color: red;
}
</style>