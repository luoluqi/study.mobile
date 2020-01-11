<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<div class="qj-img"><img :src="photoUrl"></div>
		<div class="qj-text">
			<h2>{{StudentName}}</h2>
			<!-- <p>{{userDetail.gradeName}}{{userDetail.className}}</p> -->
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
        :activeDate="$store.state.checking.startDatetime"
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
import {nowDayCheking} from "@/api/chekingApi"
import { debug } from 'util';
export default {
    components: {
    calendar,
    headNav,
    bottomNav
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
           normal:[],   //正常
            userDetail:{},
           NowDayChekData:'',
           StudentName:'',
           photoUrl:''
      }
  },
   mounted(){
       this.StudentName = this.$store.state.checking.StudentName
      this.photoUrl = this.$store.state.checking.photoUrl
     this. NowDayCheking()
      this.userDetail = this.$store.state.user
      this.Datetime=this.$store.state.checking.startDatetime
     if(this.$store.state.checking.studentId==null){
        this.$router.push('TattendanceQuery')
    }
  },
  methods:{
      ifShow(show,attenceimgurl){
       this.tanShow=show;
       this.imgurl=attenceimgurl;
       var result=this.imgurl.split(',');
        for(var i=0;i<result.length;i++){
          this.zhaji = result[0]
          this.qiuji = result[1]
          if(this.zhaji=='0'){
              this.zhaji = "static/zanwu.png"
          }
          if(this.qiuji=='0'){
              this.qiuji = "static/zanwu.png"
          }
        }
    //    console.log(this.imgurl)


      },
      ifHide(){
          this.tanShow='0';
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
     NowDayCheking(date){
            var param ={
                studentId:this.$store.state.checking.studentId,
                // startTime:this.$store.state.checking.startDatetime
            }
             if(date){       
                 param.startTime = date
                 this.Datetime =date
            }else{
                param.startTime = this.$store.state.checking.startDatetime
            }
			nowDayCheking(param).then((data) => {
                var data =JSON.parse(data)
                if (data.Code==200) {
                    console.log(data)
                    this.NowDayChekData = data.Data
                    // this.dayStuDetail=data.Data[0]
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
