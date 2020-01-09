<template>
   <div id="noticeContent">
       <headNav title="公告"></headNav>
        <div style="background-color: #FFFFFF;">
            <div class="noticeContent">
                <h2><img src="@/assets/img/biao.png" /> 来自 {{curNotice.TeacherName}}</h2>
                <span>{{curNotice.CreateTime | formatDateTime('yyyy-MM-dd HH:mm:ss')}}</span>
            </div>
            <div class="noticeContentDetail">
                <h2>{{curNotice.Title}}</h2>
                <p>{{curNotice.Content}}</p>
                <div v-show="roleCode == 'Teacher' && teacherId == curNotice.TeacherId" @click="opendReadDetail" class="read-div">
                    已读
                    <span class="red-num">{{curNotice.readList.length}}</span>/{{curNotice.readList.length + curNotice.unreadList.length}}
                </div>
            </div>
        </div>
        <readDetail 
        v-show="isShow"
        :unreadList='curNotice.unreadList' :readList='curNotice.readList'
        @hide='hideReadDetail'></readDetail>
      
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import readDetail from '@/components/readDetail'
import {setRead,getReadList} from '@/api/noticeApi'
export default {
    components:{
        headNav,readDetail
    },
   
    computed:{
      
        roleCode(){
            return this.$store.getters['user/roleCode']
        },
        curNotice(){
            return this.$store.state.notice.curNotice
        },
         teacherId(){
            return this.$store.state.user.teacherId
        }
    },
    data(){
        return {
            notice:{},
            read:[],
            unread:[],
            isShow:false
        }
    },
    methods:{
        opendReadDetail(){
             this.isShow = true
        },
        hideReadDetail(){
            this.isShow = false
        }
    },
    mounted(){
        
        if(this.roleCode == 'Parent' && this.curNotice.isRead == 0){
            setRead({data:JSON.stringify(
                {
                    noticeId:this.curNotice.Id,
                    parentId:this.$store.getters['user/parentId']
                }
            )}).then(res => {
                
                this.$store.dispatch('notice/setRead',this.curNotice.Id)
            })
        }
        
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