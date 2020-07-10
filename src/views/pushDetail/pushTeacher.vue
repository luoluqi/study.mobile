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
                            <span class="listName">{{item.StudentName}}</span>
                           
                            <span v-if="item.ReplyStatus == 1 &&　item.Status != 0" class="yingda">已应答</span>
                            <span v-if="item.ReplyStatus == 0　&&　item.Status != 0" class="weiyingda">未应答</span>
                            <span v-if="item.Status == 0" class="qingjia">请假</span>
                            
                            <span v-if="item.Status == 1" class="zhengchang"><label>正常</label></span>
                            <span v-if="item.Status == 2" class="chizao"><label>迟到</label></span>
                            <span v-if="item.Status == 3" class="kuangke"><label>旷课</label></span>
                            
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
import {GetAbnormalForTeach,SendData} from "@/api/pushApi"
export default {
    components:{
       headNav,
        bottomNav
    },
    data() {
        return {
            studentData:'',
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
                GetAbnormalForTeach({classRollCallId: this.classRollCallId,sendId: this.getQueryVariable("sendId")}).then((data) => {
                    if(data.Code == 200){
                        this.studentData = data.Data
                        this.time = data.Data[0].CreatTime
                        console.log(this.studentData)
                    }
                })
            },
            // 推送给家长
            sendParent(){
                var params = {
                    url:' http://m.xueerqin.net/study/index.html?classRollCallId='+this.classRollCallId+'#/pushDetail/pushParent',
                    choice:1,
                    classRollCallId:this.classRollCallId
                    }
                SendData(params).then((data) => {
                    if(data.Code==200){
                        this.$vux.toast.text('推送成功')
                    }
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