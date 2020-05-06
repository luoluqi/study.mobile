<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<!-- <div class="qj-img"><img src="@/assets/img/1112.png"></div>
		<div class="qj-text">
			<h2>刘欣然</h2>
			<p>三年级1班</p>
		</div> -->
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
            <p>本月应考勤<label>{{dayStuDetail.ykqTs}}</label>天，已考勤<label>{{dayStuDetail.okqTs}}</label>天</p>
            <ul class="kaoDetail">
                <li>
                    <h2><label>{{dayStuDetail.cd}}</label>次</h2>
                    <h3>迟到</h3>
                </li>
                <li>
                    <h2><label>{{dayStuDetail.zt}}</label>次</h2>
                    <h3>早退</h3>
                </li>
                <li>
                    <h2><label>{{dayStuDetail.qj}}</label>次</h2>
                    <h3>请假</h3>
                </li>
                <li>
                    <h2><label>{{dayStuDetail.kk}}</label>次</h2>
                    <h3>旷课</h3>
                </li>
            </ul>    
        </div>
         <div class="chekingInDuan">
            <p>{{Datetime}} {{Datetime | getDay}}</p>
             <div class="duanTime">
                 <ul>
                    <li v-for="(item,index) in nowDetailData" :key="index">
                        <h2>{{item.time}} &nbsp;&nbsp; {{item.attencetime}} 
                            <span v-if="item.attencestatus == 0">正常</span>
                            <span v-if="item.attencestatus == 1" class="zaotui2">迟到</span>
                            <span v-if="item.attencestatus == 2" class="zaotui2">早退</span>
                            <span v-if="item.attencestatus == 3" class="qingjia2">请假</span>
                             <span v-if="item.attencestatus == 4" class="kuangke2">旷课</span>
                        </h2>
                        <h3>
                            <label v-if="item.attencedevicetype == 0">考勤方式：闸机人脸识别</label>
                            <label v-if="item.attencedevicetype == 1">考勤方式：学生卡定位</label>
                            <label v-if="item.attencedevicetype == 2">考勤方式：球机人脸识别</label>
                            <img v-if="item.attencestatus == 0" @click="ifShow('1',item.attenceimgurl)" src="@/assets/img/tupian.png" alt="">
                        </h3>
                    </li>
                    
                 </ul>
             </div>
        </div>
      </div>
      <!-- 弹窗 -->
      <div class="jieTan" v-if="this.tanShow==1" >
          <div class="BlackWin"></div>
          <div class="WinImg">
              <div class="recognition">
                  <p>闸机人脸识别</p>
                  <img :src="zhaji" alt="">
              </div>
              <div class="recognition">
                  <p>球机人脸识别</p>
                  <img :src="qiuji" alt="">
              </div>
              <div class="faceCha" @click="ifHide()"><img src="@/assets/img/faceCha.png" alt=""></div>
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
import {nowDayCheking,nowDetail,detailColorInfo} from "@/api/chekingApi"
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
           normal:[]   //正常

      }
  },
   mounted(){
     this. NowDayCheking()
     this. NowDetail()
     this.DetailColorInfo()
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
          this.DetailColorInfo(date)
          this.NowDetail(date);
          this.NowDayCheking(date)
      },
      select(date){
           
        //   console.log(date);
          this.NowDetail(date);
          this.DetailColorInfo(date);
        //   this.NowDayCheking(date)
      },
      //  获取当天考勤统计
     NowDayCheking(date){
            var param ={
                studentId:this.$store.state.checking.studentId,
                // startTime:this.$store.state.checking.startDatetime
            }
             if(date){
                 param.startTime = date
            }else{
                param.startTime = this.$store.state.checking.startDatetime
            }
			nowDayCheking(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                     console.log(1212121212);
                    console.log(data.Data[0]);
                    this.dayStuDetail=data.Data[0]
                }
			});
        },
        //    获取当天明细
        NowDetail(date){
            this.Datetime=this.$store.state.checking.startDatetime
            var param = {
                 schoolId:this.$store.state.checking.schoolId,
				gradeId:this.$store.state.checking.gradeId,
                studentId:this.$store.state.checking.studentId
            }

            if(date){
                 param.startTime = date
                 this.Datetime =date
            }else{
                param.startTime = this.$store.state.checking.startDatetime
            }

            nowDetail(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                    console.log(111111111111111);
                    console.log(data);
                    this.nowDetailData=data.Data
                }
			});
        },
        // 单个学生某月考勤颜色--移动端
        DetailColorInfo(date){
            this.Datetime=this.$store.state.checking.startDatetime
            var param = {
                studentId:this.$store.state.checking.studentId
            }

            if(date){
                 param.startTime = date
                 this.Datetime=date
            }else{
                param.startTime = this.$store.state.checking.startDatetime
            }

            detailColorInfo(param).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                     console.log(88888888888888888888888888888888);
                    console.log(data);
                   var ColorInfo = data.Data;
                   for( var obj of ColorInfo){
                    //    debugger
                      if(obj.status == 0){
                          this.normal.push(obj.datetime)
                       }
                       if(obj.status == 1 || obj.status == 2){
                          this.late.push(obj.datetime)
                       }
                       if(obj.status == 3){
                          this.leave.push(obj.datetime)
                       }
                       if(obj.status == 4){
                          this.lack.push(obj.datetime)
                       }
                   }
                    // console.log(this.normal);
                    // console.log(this.leave);
                    // console.log(this.lack);
                }
			});
        }
       
        
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>

