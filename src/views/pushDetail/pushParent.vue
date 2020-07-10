<template>
    <div class="pushParent">
        <headNav :isBack="false" title="点名详情"></headNav>
        <div class="pushDetail">
            <p>{{time | formatDateTime('YYYY-MM-DD HH:mm:ss')}}</p>
            <div class="className"><span>{{studentData.gradeName}}{{studentData.className}}</span><label for="">{{studentData.studentName}}</label></div>
            <div class="tangType">
                课堂点名状态为：
                <span v-if="studentData.status == 0" class="qingjia">请假</span>
                <span v-if="studentData.status == 1" class="zhengchang">正常</span>
                <span v-if="studentData.status == 2" class="chidao">迟到</span>
                <span v-if="studentData.status == 3" class="kuangke">旷课</span>
            </div>
            <div class="tangTeacher">                           
                <span>点名教师：{{studentData.teachName}}</span>
                <span style="float:right">班主任：{{studentData.headTeachName}}</span>
            </div>
        </div>
        <!-- <bottomNav></bottomNav> -->
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {GetAbormalForParent} from "@/api/pushApi"
export default {
    components:{
       headNav,
       bottomNav
    },
    data() {
        return {
             studentData:'',
             time:''
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
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
            // 获取推送给家长的异常数据
            getList(){
                GetAbormalForParent({
                    classRollCallId: this.getQueryVariable("classRollCallId"),
                     sendId: this.getQueryVariable("sendId"),
                    studentId: this.getQueryVariable("studentId")
                    }).then((data) => {
                    if(data.Code == 200){
                        this.studentData = data.Data
                        this.time = data.Data.time
                        console.log(this.studentData)
                    }
                })
            }
    }
}
</script>
<style scoped>
.pushDetail{
    background-color: #ffffff;
    padding: 0 0.24rem;
    padding-bottom: 0.5rem;
}
.pushDetail p{
   line-height: 0.72rem;
}
.className{
    line-height: 0.72rem;
}
.className{
    line-height: 0.72rem;
    color: #333333
}
.className span{
    margin-right: 0.3rem
}
.tangType{
    color: #333333;
    line-height: 0.8rem;
}
.chidao{
   font-size: 0.28rem;
    color: #ff9900;
    border: 1px solid #ff9900;
    padding: 0.04rem 0.15rem;
    border-radius: 0.1rem;
}
.zhengchang{
   font-size: 0.28rem;
     color: #32bb53;
    border: 1px solid #32bb53;
    padding: 0.04rem 0.15rem;
    border-radius: 0.1rem;
}
.kuangke{
   font-size: 0.28rem;
    color: #ff4242;
    border: 1px solid #ff4242;
    padding: 0.04rem 0.15rem;
    border-radius: 0.1rem;
}
.qingjia{
   font-size: 0.28rem;
    color: #999999;
    border: 1px solid #999999;
    padding: 0.04rem 0.15rem;
    border-radius: 0.1rem;
}
.tangTeacher{
    color: #999999;
    line-height: 0.72rem;
}
</style>