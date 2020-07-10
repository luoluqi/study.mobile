<template>
    <div class="pushTeacher">
        <headNav :isBack="false" title="点名详情"></headNav>
           <div class="pushDetail">
                <div class="pushTime">
                    <span class="topLeft">{{time | formatDateTime('YYYY-MM-DD HH:mm:ss')}}</span>
                    <span class="topTight" @click="sendParent"><img src="@/assets/img/zhuanfa.png" alt=""> 点名信息推送给家长</span>
                </div>
                <div class="pushContent">
                    <ul>
                        <li class="liTitle">
                            <span>姓名</span>
                            <span>点名状态</span>
                            <span>教师操作</span>
                        </li>
                        <li class="liList" v-for="(item,index) in studentData" :key="index">
                            <span class="listName">{{item.studentName}}</span>
                           
                            <span v-if="item.replyStatus == 1 &&　item.status != 0" class="yingda">已应答</span>
                            <span v-if="item.replyStatus == 0　&&　item.status != 0" class="weiyingda">未应答</span>
                            <span v-if="item.status == 0" class="qingjia">请假</span>
                            
                            <span v-if="item.status == 1" class="zhengchang"><label>正常</label></span>
                            <span v-if="item.status == 2" class="chizao"><label>迟到</label></span>
                            <span v-if="item.status == 3" class="kuangke"><label>旷课</label></span>
                            <span v-if="item.status == 4" class="chizao"><label>早退</label></span>
                        </li>
                    </ul>
                </div>
           </div>
        <!-- <bottomNav></bottomNav> -->
    </div>

</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {classRolls,classRollToFamily} from "@/api/pushApi"
export default {
    components:{
       headNav,
        bottomNav
    },
    data() {
        return {
            studentData:[],
            classRollCallId:'',
            time:''
        }
    },
    mounted(){
        this.classRollCallId = this.getQueryVariable("classRollCallId")
         this.getList()
    },
    methods:{
            //  ec97948e44c245d98077d4316ff81ab3
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
            // 获取推送给班主任的异常数据
            getList(){
                var params = {
                    // classId: this.getQueryVariable("classId") ? this.getQueryVariable("classId") : '3f117d9b33c74ab3b47ffba246bc48f0',
                    // rollBatchId: this.getQueryVariable("rollBatchId") ? this.getQueryVariable("rollBatchId") : '2',
                    classId: this.getQueryVariable("classId"),
                    rollBatchId: this.getQueryVariable("rollBatchId")
                }
                classRolls(params).then((data) => {
                        this.studentData = data
                        this.time = data[0].creationTime
                })
            },
            // 推送给家长
            sendParent(){
                var params = {
                    // rollBatchId:'2'
                    rollBatchId:this.getQueryVariable("rollBatchId")
                    }
                classRollToFamily(params).then((data) => {
                        this.$vux.toast.text('推送成功')
                })
            }
    }
}
</script>
<style scoped>
.pushTime{
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.28rem;
    background-color: #f4f4f4;
    padding: 0 0.24rem;
}
.topLeft{
    float: left;
    color: #333333;
}
.topTight{
    float: right;
    color: #ff9900;
}
.topTight img{
    display: inline-block;
    width: 0.28rem;
    height: 0.26rem;
}
.pushContent{
    background-color: #ffffff;
    overflow: hidden;
}
.pushContent li{
   line-height: 0.95rem;
   border-bottom: 1px solid #dfdfdf;
}
.liTitle{
    color: #999999;
}
.liTitle span{
    display: inline-block;
    width: 32%;
    text-align: center;
}
.liList span{
    display: inline-block;
    width: 32%;
    text-align: center;
}
.listName{
    color: #333333;
}
.yingda{
    color: #32bb53;
}
.weiyingda{
    color: #f70000;
}
.qingjia{
    color: #999999
}
.chizao label{
    color: #ff9900;
    border: 1px solid #ff9900;
    padding: 0.04rem 0.15rem;
    border-radius: 0.08rem;
}
.kuangke label{
     color: #ff4242;
    border: 1px solid #ff4242;
    padding: 0.04rem 0.15rem;
    border-radius: 0.08rem;
}
.zhengchang label{
    color: #32bb53;
    border: 1px solid #32bb53;
    padding: 0.04rem 0.15rem;
    border-radius: 0.08rem;
}
</style>