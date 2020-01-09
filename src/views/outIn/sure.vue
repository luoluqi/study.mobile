<template>
    <div class="remind">
        <headNav :isBack="false" :title="confirmData.AcitonName + '确认提醒'"></headNav>
        <div class="remindStudent">
             <h2>{{time}}</h2>
             <div class="reText">因考勤系统未检测到以下学生{{confirmData.AcitonName}}数据，请您确认其是否{{confirmData.AcitonName}}</div>
             <div class="studentInfo">
                 <span>{{confirmData.StudentMsg}}</span>
                 <!-- <label>刘琦玉</label> -->
             </div>
             <!-- {{confirmData}} :class="{'affirmNo':confirmData.Display==false}" -->
             <div class="affirm" v-if="confirmData.Display" @click="InOrOut()">确认{{confirmData.AcitonName}}</div>
             <div class="affirmNo" v-if="confirmData.Display == false">确认{{confirmData.AcitonName}}</div>
        </div>
        <bottomNav></bottomNav>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {ConfirmInOrOutSchoolIfOp,ConfirmInOrOutSchool} from "@/api/sureApi"
export default {
    components:{
      headNav,
      bottomNav
    },
    data(){
        return {
            confirmData:'',
            time:''
        }
    },
    mounted(){
        this.time =unescape(this.getQueryVariable("createTime"))
        this.ConfirmInOrOut()
    },
    methods: {
        //  http://srv.xueerqin.net/api-attendance/api/InOrOutSchool/ConfirmInOrOutSchool?createTime=2019-11-05%2019%3A17%3A54&studentId=d9c9861748f145e08f1d1c7d31b1186c&atteState=1
        // 获取url参数
        getQueryVariable(variable){
                // var query = 'http://srv.xueerqin.net/api-attendance/api/InOrOutSchool/ConfirmInOrOutSchool?createTime=2019-11-05%2019%3A17%3A54&studentId=d9c9861748f145e08f1d1c7d31b1186c&atteState=1'
                var query = window.location.search.substring(1)
                var vars = query.split("&")
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=")
                        if(pair[0] == variable){return pair[1]}
                }
                return(false)
            },
            // 确认出入校是否可操作
            ConfirmInOrOut(){
                var parms = {
                    createTime:this.time ? this.time : '2019-11-09 09:52:12',
                    studentId:this.getQueryVariable("studentId") ? this.getQueryVariable("studentId") : 'd9c9861748f145e08f1d1c7d31b1186c',
                    atteState:this.getQueryVariable("atteState") ? this.getQueryVariable("atteState") : '1'
                }
                ConfirmInOrOutSchoolIfOp(parms).then((data) => {
		  			var res = JSON.parse(data)
                      console.log(res)
                      if(res.Code == '200'){
                         this.confirmData = res.Data
                         if(res.Data.Display == false){
                              this.$vux.toast.text(res.Msg, 'top')
                         }
                      } 
		  		})
            },
            // 确认入校或出校
            InOrOut(){
                var parms = {
                    createTime:this.time ? this.time : '2019-11-09 09:52:12',
                    studentId:this.getQueryVariable("studentId") ? this.getQueryVariable("studentId") : 'd9c9861748f145e08f1d1c7d31b1186c',
                    atteState:this.getQueryVariable("atteState") ? this.getQueryVariable("atteState") : '1'
                }
                ConfirmInOrOutSchool(parms).then((data) => {
		  			var res = JSON.parse(data)
                      console.log(res)
                      this.$vux.toast.text(res.Msg, 'top')
                      if(res.Code == '200'){
                         this.confirmData.Display = false
                      } 
		  		})
            }
    }    
}
</script>
<style scoped>
.remindStudent{
    padding: 0 0.24rem;
    background-color: #ffffff;
    min-height: 4.5rem;
    padding-bottom: 0.4rem;
}
.remindStudent h2{
    line-height: 0.86rem;
    font-size: 0.28rem;
    color: #999999
}
.reText{
    color: #333333;
    font-size: 0.28rem;
    line-height: 0.5rem
}
.studentInfo{
    font-size: 0.32rem;
    color: #333333;
}
.studentInfo label{
    margin-left: 0.38rem;
    line-height: 1.14rem
}
.affirm{
    margin: 0 auto;
    width: 2.82rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.32rem;
    color: #ffffff;
    background-color: #0a8de5;
    border-radius: 0.08rem;
    margin-top: 0.5rem
}
.affirmNo{
    margin: 0 auto;
    width: 2.82rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.32rem;
    border-radius: 0.08rem;
    margin-top: 0.5rem;
    color: #fff;
    background-color: #eee;
}
</style>
