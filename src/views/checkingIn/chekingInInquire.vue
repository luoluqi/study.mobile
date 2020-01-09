<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<div class="qj-img"><img :src="userDetail.studentImg"></div>
		<div class="qj-text">
			<h2>{{userDetail.studentName}}</h2>
			<p>{{userDetail.gradeName}} {{userDetail.className}}</p>
		</div>
        <!-- <div class="changeIdn">
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
        :lackText="'旷课'"
        @change="change" 
        @select="select">
        </calendar>
    
     </div>
        
    
    <div class="content">
        <div class="chekingInDay">
            <p>本月应考勤<label>{{NowDayChekData.ykqTs}}</label>天，已考勤<label>{{NowDayChekData.okqTs}}</label>天，异常<label>{{NowDayChekData.yc}}</label>天</p>
            <div>
               <div class="zhushi"> 1、学生迟到、早退、旷课、请假或系统无法获得考勤信息，都会显示考勤异常</div>
               <div class="zhushi">2、设备损坏、忘记携带、设备没电等原因，都会造成系统无法获取学生考勤数据</div>
            </div>
        </div>
         <div class="chekingInDuan">
            <p>{{Datetime}} {{Datetime | getDay}}</p>
             <div class="duanTime">
                 <ul>
                    <li v-for="(item,index) in NowDayChekData.data" :key="index">
                        <h2>{{item.GradetimeName}} &nbsp;&nbsp; 
                            <span class="gradetime" v-if="item.Gradetime != '考勤时间：无考勤数据'">{{item.Gradetime}}</span>
                            <span class="gradetime" v-if="item.Gradetime == '考勤时间：无考勤数据'">-</span>
                        </h2>
                        <h3>
                            <label>{{item.DeviceName}}</label>
                        </h3>
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
import {nowDayCheking,nowDetail,detailColorInfo,updatePoint} from "@/api/chekingApi"
import { debuglog, debug } from 'util';
export default {
    components: {
    calendar,
    headNav,
    bottomNav
  },
  computed:{
      mChildList(){
          return this.$store.state.user.childList
      }
  },
  data(){
      return {
           tanShow:'',
           dayStuDetail:{},
           nowDetailData:[],
           imgurl:'',
           Datetime:'',
        //    ColorInfo:[]
           late:[], //迟到
           lack:[], //旷课
           leave:[],  //请假
            normal:[],  //正常
           studentId:'',
           itemTecher:{},
           mydate:'',
           userId:'',
           userRoleCode:'',
           userRealName:'',
           userDetail:'',
           NowDayChekData:''
      }
  },
   mounted(){
        this.$store.dispatch('user/getUserInfo').then(res => {     
            this.userDetail = this.$store.state.user
            console.log(this.userDetail)
             this.UpdatePoint()
             this.NowDayCheking()
        })
      
  },
  methods:{
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
                 this.userRealName = decodeURI( this.userRealName)
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
          var date =year+'-'+zreo+(month+1)+'-'+0+1
        //   console.log(date);
          this.NowDayCheking(date)
      },
      select(date){
          this.NowDayCheking(date)
      },
      //  获取当天考勤统计
     NowDayCheking(date2){
        //  当前日期
         var myDate = new Date();
         var year = myDate.getFullYear()
         var month = myDate.getMonth() + 1
         var date = myDate.getDate()
         if(month < 10) {
             month = '0' + month
         }
         if(date < 10) {
             date = '0' + date
         }
       
            this.mydate=year+'-'+month+'-'+date
            var param ={
                studentId:this.userDetail.studentId
                // studentId:'d656000343e341e684f682badb89530e'
                // startTime:this.mydate
            }
             if(date2){
                 param.startTime = date2
                this.Datetime = date2
            }else{
                param.startTime = this.mydate
                 this.Datetime = this.mydate
            }
			nowDayCheking(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                     this.NowDayChekData = data.Data
                }
			});
        }     
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>
<style scoped>
.chekingInDay{
    height: 1.2rem;
}
.chekingInDay p{
    line-height: 1.2rem
}
.zhushi{
    padding: 0 0.24rem;
    font-size: 0.24rem;
    color: #999;
    margin-bottom: 0.1rem;
}
.chekingInDay{
        height: 3.2rem;
}
.gradetime{
    background-color: transparent !important;
    color: #333 !important;
}
</style>
