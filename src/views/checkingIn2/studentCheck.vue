<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<div class="qj-img" v-if="userDetail.headImg"><img :src="userDetail.headImg"></div>
        <div class="qj-img" v-else><img src="@/assets/img/homeWork/head.png"></div>
		<div class="qj-text">
			<h2>{{userDetail.realName}}</h2>
			<p>{{userDetail.gradeName}}{{userDetail.className}}</p>
		</div>
	</div>
     <div class="dateTime">
         <calendar 
        :late="late"
        :lack="lack"
        :leave="leave"
        :normal="normal"
        :lackText="'旷课'"
        :activeDate="''"
        @change="change"
        @select="select"
        :isShow='true'
        :disableFuture="true">
        </calendar>
    
     </div>
        
    
    <div class="content">
        <div class="chekingInDay">
            <p>本月考勤情况</p>
            <ul class="kaoDetail">
                <li>
                    <h2><label>{{summaryData.monthAttendanceDay}}</label>次</h2>
                    <h3>应该考勤</h3>
                </li>
                <li>
                    <h2><label>{{summaryData.monthAlreadyAttendanceDay}}</label>次</h2>
                    <h3>已考勤</h3>
                </li>
                <li>
                    <h2><label>{{summaryData.monthAbNormalAttendanceDay}}</label>次</h2>
                    <h3>异常</h3>
                </li>
            </ul>  
            <div class="remind">
                <div class="zhu-img">
                    <img src="@/assets/img/checking/dengpao.png" alt="">
                </div>
                <div class="zhu-text">
                    <div class="zhushi"> 1、学生迟到、早退、旷课、请假或系统无法获得考勤信息，都会显示考勤异常</div>
                    <div class="zhushi">2、设备损坏、忘记携带、设备没电等原因，都会造成系统无法获取学生考勤数据</div>
                </div>
            </div>  
        </div>
      </div>
       <!-- <bottomNav></bottomNav> -->
    </div>
</template>
<script>
// import { InlineCalendar } from 'vux';
import  calendar  from '@/components/calendar/calendar';
import headNav from '@/components/headNav/headNav';
// import bottomNav from '@/components/bottomNav/bottomNav';
import { debug } from 'util';
export default {
    name:'studentCheck',
    components: {
    calendar,
    headNav
  },
  data(){
      return {
           late:[], //有缺勤或无记录 橙色     //    1正常  2有缺勤或无记录 4异常
           lack:[], //异常 红色
           leave:[],  //正常 蓝色
           normal:[],   //以前的正常
           active:'',
           userDetail:{},
           myDate:'',
           checkinData:[],
           noAttendanceList:[],
           summaryData:''
      }
  },
   activated(){
       this.userDetail = this.$store.state.user
        this.NowDayCheking()
  },
  methods:{
      ifShow(show){
       this.tanShow=show
      },
      change(year,month){
           var zreo ;
          if(month > 8){
              zreo =''
          }else{
              zreo = '0'
          }
         var date =year+'-'+zreo+(month+1)+'-'+0+1
         this.$store.state.checkingIn2.monDay = date
         this.NowDayCheking()     
            
        //  +'-'+0+1
        //   console.log(date);
          
      },
      select(date){
        //    var day = new Date(date).getDay();//0-周日，6-周六
        //     if(day==0 || day==6) {
        //         this.$vux.toast.text('周末无考勤记录', 'top')
        //         return
        //     }
        for(var time of this.noAttendanceList){
            // time = time.slice(0,10)
            if(time == date){
              this.$vux.toast.text('该日期无考勤数据',top)
              return
            }
        }
        //   console.log(date);
          this.$router.push('oneDayCheck')
          this.$store.state.checkingIn2.toDay = date
          localStorage.setItem("yueDate", date);

      },
           //  获取当月考勤统计
     NowDayCheking(monthDate){
         this.leave = []
         this.lack = []
         this.late = []
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
    //    console.log(this.mydate,'mydate')
       var prams = {
                schoolId:this.$store.getters['user/schoolId'],
                classId:this.$store.getters['user/classId']
                // schoolId:'bb34a395d8df4b3a9f9a22592a0e0ae2',
                // classId:'3f117d9b33c74ab3b47ffba246bc48f0'
                }
                if(!this.$store.state.checkingIn2.monDay){
                   prams.attendanceTime = this.mydate
                }else{
                    prams.attendanceTime = this.$store.state.checkingIn2.monDay
                }
       this.$store.dispatch('checkingIn2/PerMonthClassAttendanceData',prams).then((data) => {
           this.noAttendanceList = data.noAttendanceList
           for( var obj of data.perDayAttendanceStatusList){
            //    obj.attendanceTime = obj.attendanceTime.slice(0,10)
            //    1正常 2有缺勤或无记录 4异常
                if(obj.attendanceStatus == 1){
                    this.leave.push(obj.attendanceTime)
                }
                if(obj.attendanceStatus == 2 ){
                    this.late.push(obj.attendanceTime)
                }
                if(obj.attendanceStatus == 4){
                    this.lack.push(obj.attendanceTime)
                }
            }
            this.checkinData = data
            this.getCheckDay()  
            // console.log('正常1：'+this.leave)
            // console.log('有缺勤或无记录2：'+this.late)
            // console.log('异常4：'+this.lack)
            
            
       })
     },
    //  获取考勤天数
    getCheckDay(){
        var prams = {
                schoolId:this.$store.getters['user/schoolId'],
                classId:this.$store.getters['user/classId']
                // schoolId:'bb34a395d8df4b3a9f9a22592a0e0ae2',
                // classId:'3f117d9b33c74ab3b47ffba246bc48f0'
                }
                if(!this.$store.state.checkingIn2.monDay){
                   prams.attendanceTime = this.mydate
                }else{
                    prams.attendanceTime = this.$store.state.checkingIn2.monDay
                }
            this.$store.dispatch('checkingIn2/ClassMonthSummaryData',prams).then((data) => {
                this.summaryData = data
            })
        
    }
       
        
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>
<style  scoped>
.chekingInDay{
    height: auto;
    margin-bottom: 0.2rem;
    overflow: hidden;
}
.chekingInDay p{
    font-size: 0.28rem;
}
.remind{
    padding: 0.35rem;
    font-size: 0.24rem;
    color: #999999;
    overflow: hidden;
}
.zhu-img img{
    width: 0.18rem;
    height: 0.24rem;
    float: left;
}
.zhu-img{
    width: 0.18rem;
    float: left;
    margin-right: 0.05rem;
    margin-top: 0.05rem;
}
.zhu-text{
    float: left;
    width: 5.7rem;
    line-height: 0.36rem;
    font-size: 0.24rem;
}
.kaoDetail li h2 label{
    font-size: 0.4rem;
}
</style>
