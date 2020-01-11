<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<div class="qj-img"><img :src="tescherImg"></div>
		<div class="qj-text" style="padding-top: 0.4rem;">
			<h2>{{tescherName}}</h2>
			<!-- <p>三年级</p> -->
		</div>
        <!-- <div class="changeIdn" @click="LookStudent">
            <img src="@/assets/img/change-reco.png">
            学生考勤
        </div> -->
	</div>
     <div class="dateTime">
         <calendar 
        :late="late"
        :lack="lack"
        :leave="leave"
        :normal="normal"
        :lackText="'旷工'"
        :isShow="true"
        @change="change"
        @select="select">
        </calendar>
    
     </div>
        
    
    <div class="content" style="height: 1.2rem;">
        <div class="chekingInDay" style="height: 1.2rem;">
            <p style="line-height: 1.2rem">本月应考勤<label>{{attendanceModel.monthWorkDay}}</label>天，已考勤<label>{{attendanceModel.monthWorkDayPassed }}</label>天，异常<label>{{attendanceModel.monthWorkDayAbnormal}}</label>天</p>
            <ul class="kaoDetail">
                <!-- <li>
                    <h2><label>{{attendanceModel.monthWorkDayNormal }}</label>次</h2>
                    <h3>正常</h3>
                </li>
                <li>
                    <h2><label>{{attendanceModel.monthWorkDayAbnormal }}</label>次</h2>
                    <h3>异常</h3>
                </li> -->
                <!-- <li>
                    <h2><label>{{attendanceModel.qj}}</label>次</h2>
                    <h3>请假</h3>
                </li>
                <li>
                    <h2><label>{{attendanceModel.kk}}</label>次</h2>
                    <h3>旷课</h3>
                </li> -->
            </ul>    
        </div>
         <div class="chekingInDuan" style="margin-bottom: 3rem;">
             <!-- <p>2019-09-02 星期几</p> -->
            <p>{{nowDateDay}} {{nowDateDay | getDay}}</p>
              <div class="duanTime2" v-for="(item,index) in itemDay.commutings" :key="index">
                 <ul>
                    <li > 
                        <h2 v-if="item.attendanceTeachCommutingWork.id != null" style="color: #999;">上班：{{item.attendanceTeachCommutingWork.attendanceTime | formatDateTime('HH:mm:ss')}}</h2>
                        <h2 v-if="item.attendanceTeachCommutingWork.id != null">打卡时间：{{item.attendanceTeachCommutingWork.cardingTime | formatDateTime('HH:mm:ss')}} 
                            <span v-if="item.attendanceTeachCommutingWork.msg == '正常'">正常</span>
                             <span v-if="item.attendanceTeachCommutingWork.msg == '迟到'" class="zaotui2">迟到</span>
                            <span v-if="item.attendanceTeachCommutingWork.msg == '早退'" class="zaotui2">早退</span>
                            <span v-if="item.attendanceTeachCommutingWork.msg == '请假'" class="qingjia2">请假</span>
                             <span v-if="item.attendanceTeachCommutingWork.msg == '旷工'" class="kuangke2">旷工</span>
                        </h2>
                    </li>
                    <!-- <li v-if="item.attendanceTeachCommutingWorkOff.id == null"></li> -->
                    <li >
                        <h2 v-if="item.attendanceTeachCommutingWorkOff.id != null" style="color: #999;">下班：{{item.attendanceTeachCommutingWorkOff.attendanceTime | formatDateTime('HH:mm:ss')}}</h2>
                        <h2 v-if="item.attendanceTeachCommutingWorkOff.id != null">打卡时间：{{item.attendanceTeachCommutingWorkOff.cardingTime | formatDateTime('HH:mm:ss')}} 
                            <span v-if="item.attendanceTeachCommutingWorkOff.msg == '正常'">正常</span>
                             <span v-if="item.attendanceTeachCommutingWorkOff.msg == '迟到'" class="zaotui2">迟到</span>
                            <span v-if="item.attendanceTeachCommutingWorkOff.msg == '早退'" class="zaotui2">早退</span>
                            <span v-if="item.attendanceTeachCommutingWorkOff.msg == '请假'" class="qingjia2">请假</span>
                             <span v-if="item.attendanceTeachCommutingWorkOff.msg == '旷工'" class="kuangke2">旷工</span>
                        </h2>
                    </li>
                 </ul>
             </div>
        </div>
      </div>
       <bottomNav></bottomNav>
    </div>
</template>
<script>
// import { InlineCalendar } from 'vux';
import  calendar  from '@/components/calendar/calendar';
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {recordDetailed} from "@/api/chekingApi"
import { debuglog } from 'util';
export default {
    components: {
    calendar,
    headNav,
    bottomNav
  },
  data(){
      return {
           teacherId:'',
           month:'',
           attendanceModel:{},
           attendanceTeachList:[],
           itemDay:{},
           nowDateDay:'',
        //    ColorInfo:[]
           late:[], //迟到
           lack:[], //旷课
           leave:[],  //请假
            normal:[],  //正常
            tescherName:'',
          tescherImg:''
          
      }
  },
   mounted(){
       this.tescherName = this.getCookie("realName") 
    if(this.tescherName && this.tescherName != 'null'){
         this.tescherName = decodeURIComponent(this.tescherName)
    }
    this.tescherImg = this.getCookie("img") 
    if(this.tescherImg && this.tescherImg != 'null'){
         this.tescherImg = this.tescherImg
    }
       var now = new Date();
       var year = now.getFullYear()
       var month = now.getMonth() + 1
       month = month > 9 ? month : '0' + month
       this.chekingDetail(year + '-' + month,this.formatDate(now))
       this.nowDateDay = this.formatDate(now)
  },
  methods:{
       //   获取cookie中的值
      getCookie(sName){
            var aCookie = document.cookie.split("; ");
            for (var i=0; i < aCookie.length; i++){
                var aCrumb = aCookie[i].split("=");
                if (sName == aCrumb[0])
                return aCrumb[1];
            }
            return null;
        },
        //    查看学生考勤
       LookStudent () {
           this.$router.push('TattendanceQuery')
       },
    //   签到积分{"userId":"844219e9ca7a47b79b2346867886dd16","userRoleCode":"Teacher","userRealName":"黄鑫文","pointType":1001}
        UpdatePoint(){
            this.userId = this.getCookie("loginUserId")
            if(!this.userId){
                this.userId = "844219e9ca7a47b79b2346867886dd16";
            }
            this.userRoleCode = this.getCookie("roleCode")
            if(!this.userRoleCode){
                this.userRoleCode = "Teacher";
            }
            this.userRealName = this.getCookie("realName")
            if(!this.userRealName){
                this.userRealName = "黄鑫文";
            }else{
                 this.userRealName = decodeURIComponent( this.userRealName)
            }
           var param = {
                 userId:this.userId,
				userRoleCode:this.userRoleCode,
                userRealName:this.userRealName,
                pointType:"2007"
            }
           updatePoint(param).then((data) => {
               console.log(data) 
                
			});
        },
      change(year,month){
          var zreo ;
          if(month > 8){
              zreo =''
          }else{
              zreo = '0'
          }
          var newMonth = year+'-'+zreo+(month+1)
          this.chekingDetail(newMonth,newMonth + '-01')
          this.getItemDate (newMonth + '-01')
          this.nowDateDay = newMonth + '-01'
      },
      select(date){   
          console.log(date);
          var d = new Date(date)
          var year = d.getFullYear()
          var month = d.getMonth() + 1
           month = month > 9 ? month : '0' + month
          this.getItemDate (date)
          this.nowDateDay = date
      },

    //    获取考勤详细
    chekingDetail (newMonth,dateDay) {
        this.attendanceTeachList = []
        this.itemDay = {}
        this.teacherId = this.getCookie("teacherId")
            if(!this.teacherId){
                this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                return
            }
         var param = {
                //  month:this.month,
                teachId	:this.teacherId,
                month: newMonth
            }
           
           recordDetailed(param).then((data) => {
               var data =JSON.parse(data);
               console.log(data) 
                if (data.Code==200) {
                      if(data.Data){
                          this.attendanceModel = data.Data.attendanceModel
                         this.attendanceTeachList = data.Data.attendanceTeachList
                            for( var obj of this.attendanceTeachList){
                            if(obj.workStateMsg == '正常'){
                                this.normal.push(obj.day)
                            }
                            if(obj.workStateMsg == '迟到' || obj.workStateMsg == '早退'){
                                this.late.push(obj.day)
                            }
                            if(obj.workStateMsg == '请假'){
                                this.leave.push(obj.day)
                            }
                            if(obj.workStateMsg == '旷工'){
                                this.lack.push(obj.day)
                            }
                            if(this.formatDate(obj.day)==dateDay){
                                this.itemDay = obj
                                console.log(this.itemDay)
                            }
                        }
                      }
                         
                }
                
			});
    },
    formatDate (str) {
           var d = new Date(str)
           var year = d.getFullYear()
           var month = d.getMonth() + 1
           var date = d.getDate()
           month = month > 9 ? month : '0' + month
            date = date > 9 ? date : '0' + date
            return year+'-'+month+'-'+date
    },
    getItemDate (date) {
        for( var obj of this.attendanceTeachList){
            if(this.formatDate(obj.day)==date){
                this.itemDay = obj
                console.log(this.itemDay)
            }
            
        }
    }
    
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>

<style scoped>
.duanTime2{
    background: url("../../assets/img/ban.png") no-repeat center left;
   
    height: 2.68rem;
    background-size: 1.04rem 2.68rem;
    margin-left: 0.24rem;
    margin-bottom: 0.4rem;
}
.duanTime2 ul{
    margin-left: 1.24rem;

}
.duanTime2 ul li{
    font-size: 0.28rem;
    height: 1.67rem;
    line-height: 0.45rem;
}
.duanTime2 ul li h2{
    color: #333333
}
.duanTime2 ul li h2 span{
    display: inline-block;
    background-color: #e5fcf5;
    color: #40cfa4;
    padding: 0.05rem 0.1rem;
    border-radius: 0.08rem;
    margin-left: 0.2rem;
}

</style>