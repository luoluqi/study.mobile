<template>
    <div class="main">
        <headNav title="考勤查询"></headNav>
        <div style="position: relative;">
            <div class="detailTit">
                <p>
                    <span class="titName">{{itemStudent.name}}</span>
                    <span class="titTime">{{toDay}} {{toDay | getDay}}</span>
                </p>
            </div>
            
            <div class="timeDetail">
                <div class="arrowLeft" @click="leftmove"><img src="../../assets/img/checking/arrow-1.png" alt=""></div>
                <div ref="detailCont" class="detailCont" :style="{'margin-left': -move * 6.94 + 'rem'}" 
                    @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend'>
                    <div class="detailItem">
                        <div class="detailList" v-for="(item,index) of dataDetail" :key="index" :class="{'detailList-1':index == 0 || index == 1,'detailList-2':index == 2 || index == 3,'detailList-3':index == 4 || index == 5}">
                            <p>{{item.timeRnage}}</p>
                             <!-- <div class="outOff" v-for="index in 4" :key="index">
                                <h2 class="outOffh2"><img src="../../assets/img/checking/address-1.png" alt=""><span>07:45 入校</span></h2>
                                <span class="outSpan">学生证</span>
                            </div> -->
                            <div style="height: 0.44rem;"></div>
                            <div class="outOff" v-for="(item2,index) in item.studenInOutSchoolList" :key="index">
                                <h2 class="outOffh2"><img src="../../assets/img/checking/address-1.png" alt=""><span :class="{'yichang':item2.inOutSchoolStatus == 4}">{{item2.inOutTimeHour}} {{item2.attenceDirectionName}}</span></h2>
                                <span class="outSpan">{{item2.attenceDeviceTypeName}}</span>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div class="arrowRight"  @click="rightmove"><img src="../../assets/img/checking/arrow-2.png" alt=""></div>
            </div>
            <div style="height: 3.64rem;"></div>
            <div class="statusList">
                <div class="kejieList" v-for="(item,index) of attenceDetail" :key="index">
                    <div v-if="index != 0" class="line"></div>
                    <span class="time-2">{{item.timeBegin}}-{{item.timeEnd}}</span>
                    <span class="kejie"><i></i>{{item.classSectionName}}</span>
                    <span class="time-2 time-3" v-if="item.statuItem.updateTeacherName">{{item.statuItem.updateTeacherName}}修改为</span>
                    <select class="stateStyle" v-if="item.statuItem" v-model="item.statuItem.status" @change="changeStatu(item.statuItem)"
                     :class="{'normal':item.statuItem.status == 1,
                             'leave':item.statuItem.status == 2 || item.statuItem.status == 4,
                             'qingjia':item.statuItem.status == 0,
                             'truancy': item.statuItem.status == 3,
                             '': item.statuItem.status == -1
                             }">
                        <option v-if="item.statuItem.status == -1" :value=-1>--</option>
                        <option  :value=1>正常</option>
                        <option  :value=2>迟到</option>
                        <option  :value=4>早退</option>
                        <option  :value=0>请假</option>
                        <option  :value=3>旷课</option>
                    </select>
                    <!-- <span  v-else> -- </span> -->
                </div>
            </div>
            <div class="currMonth">
                 <div class="monthTit">该生本月考勤情况</div>
                 <div class="pieStyle">
                     <pie :data="pieData" :title="'132136'"></pie>
                 </div>
                 <div class="statusCorlor">
                     <div class="qingjia2"><i></i>请假</div>
                     <div class="chidao"><i></i>迟到</div>
                     <div class="zaotui"><i></i>早退</div>
                     <div class="kuangke"><i></i>旷课</div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import pie from '@/components/echarts/pie2'
export default {
    components: {
        headNav,
        pie
    },
    computed:{
       toDay(){
           return this.$store.state.checkingIn2.toDay
       },
       itemStudent(){
           return this.$store.state.checkingIn2.itemStudent
       },
       statusChange(){
           return this.$store.state.checkingIn2.statusChange
       }
    },
    data () {
        return {
            userDetail:{},
             move: 0,
           state:0,
           pieData: [],
            dataDetail:[],
            x: 0,
            y: 0,
            offsetX: 0,
            offsetY:0,
            attenceDetail:[], 
            num:2
        }
    },
    watch: {
       statusChange(newVal,oldVue){
           this.attendanceDetail()
            this.monthSummary()
        }
    },
    mounted(){
        this.userDetail = this.$store.state.user
    //    console.log(this.$store.state.user)
    //    console.log(this.itemStudent)
       this.getOutOf()
       this.attendanceDetail()
       this.monthSummary()
    },
    methods: {
        leftmove() {
            if (this.move > 0){
                this.move -= 1;
            }
              if (this.move > -(this.dataDetail.length-3 + this.move)) {
                
                }
        },

        rightmove() {
            if (this.move < this.dataDetail.length - this.num){
                 this.move += 1;
            }
        },
        touchstart(e){           
            this.x = e.targetTouches[0].clientX
            this.y = e.targetTouches[0].clientX
            // console.log(this.x, this.y)
        },
        touchmove(e){
              var moveX = e.targetTouches[0].clientX
              var moveY = e.targetTouches[0].clientX
              this.offsetX = moveX - this.x
              this.offsetY = moveY - this.y
            // console.log(this.offsetX, this.offsetY)
            this.$refs.detailCont.style.left = this.offsetX + 'px'     
        },
        touchend(e){
            // console.log(this.offsetX)
              this.$refs.detailCont.style.left = '0px' 
              if (this.offsetX < -100) {
                  if (this.move < this.dataDetail.length - this.num) {
                      this.move++
                  }
              }
              if (this.offsetX > 100) {
                  if (this.move > 0){
                      this.move--
                  }
              }
        },
        // 出入校
        getOutOf(){
            var prams = {
                schoolId:this.$store.getters['user/schoolId'],
                gradeId:this.$store.getters['user/gradeId'],
                // schoolId:'bb34a395d8df4b3a9f9a22592a0e0ae2',
                // gradeId:'162f01e041d541db8a5885c2e16e3a9f',
                attendanceTime:this.toDay,  //this.toDay
                studentId: this.itemStudent.id,
                
                }
            this.$store.dispatch('checkingIn2/StudentInOutSchoolData',prams).then((data) => {
                this.dataDetail = data
                var len = this.dataDetail.length
                if(len == 4){
                    this.num = 3
                }
                if(len == 6){
                   this.num = 4
                }
            })
        },
        // 某天的考勤数据
        attendanceDetail(){
            var prams = {
                SchoolId:this.$store.getters['user/schoolId'], 
                GradeId:this.$store.getters['user/gradeId'],
                ClassId:this.$store.getters['user/classId'],
                // SchoolId:'bb34a395d8df4b3a9f9a22592a0e0ae2',
                // GradeId:'162f01e041d541db8a5885c2e16e3a9f',
                // ClassId:'3f117d9b33c74ab3b47ffba246bc48f0',
                AttendanceTime:this.toDay,
                StudentId: this.itemStudent.id,
                }
               this.$store.state.checkingIn2.detailItem = prams 
            this.$store.dispatch('checkingIn2/StudentAttendanceDetail',prams).then((data) => {
                this.attendData = data
                 for(var item2 of data.sesionTimeClassSectionsList){
                     item2.statuItem = {status:-1,classSection:item2.classSection}
                     for(var item of data.studentAttendanceList){
                        if(item.classSection == item2.classSection){
                              item2.statuItem = item
                        }
                    }
                }
                this.attenceDetail = data.sesionTimeClassSectionsList
                // console.log(this.attenceDetail)
            })
        },
        // 月汇总StudentAttendanceSummaryData
        monthSummary(){
            var prams = {
                ClassId:this.$store.getters['user/classId'],
                // ClassId:'3f117d9b33c74ab3b47ffba246bc48f0',
                AttendanceTime:this.toDay,
                StudentId: this.itemStudent.id,
                }
                this.$store.state.checkingIn2.summaryItem = prams 
            this.$store.dispatch('checkingIn2/StudentAttendanceSummaryData',prams).then((data) => {
                this.pieData = [
                    {name:"请假",color:"#128AEF",value:data.leaveCount},
                    {name:"迟到",color:"#FFC000",value:data.lateCount},
                    {name:"早退",color:"#FF9900",value:data.leaveEarlyCount},
                    {name:"旷课",color:"#FE3000",value:data.absenteeismCount}
                    ]
            })
        },
        // 修改考勤状态
        changeStatu(item){
            if(item.rollBatchId){
                  this.upDataStatus(item)
            }else{
                this.createdStatus(item)
            }
        },
        // 修改
        upDataStatus(item){
           var prams = {
                studentId: this.itemStudent.id,
                Status:item.status,
                rollBatchId:item.rollBatchId,
                teacherId:this.$store.getters['user/teacherId']
                }
            this.$store.dispatch('checkingIn2/ClassRolls',prams).then((data) => {
                this.$vux.toast.text('修改成功',top)
                this.attendanceDetail()
                this.monthSummary()
            }).catch(res => {
                debugger
                this.$vux.toast.text('当前token已过期,请重新操作',top)
                this.attendanceDetail()
            //    this.$store.state.checkingIn2.statuItem = prams
            })
        },
        // 新增
        createdStatus(item){
           var prams = {
               attendanceTime:this.toDay + 'T06:07:03.723Z',
               studentId: this.itemStudent.id,
               studentName:this.itemStudent.name,
                classSection:item.classSection,
               Status:item.status,
               teacherId:this.$store.getters['user/teacherId'],
               teacherName:this.$store.getters['user/realName'],
            //    classId:'3f117d9b33c74ab3b47ffba246bc48f0',
                ClassId:this.$store.getters['user/classId'],
               className:this.userDetail.className,
            //    gradeId:'162f01e041d541db8a5885c2e16e3a9f',
                GradeId:this.$store.getters['user/gradeId'],
               gradeName:this.userDetail.gradeName
             }
            this.$store.dispatch('checkingIn2/StudentAttendance',prams).then((data) => {
                this.$vux.toast.text('修改成功',top)
                this.attendanceDetail()
                this.monthSummary()
            }).catch(res => {
                // this.$vux.toast.text('当前token已过期,请重新操作',top)
                this.attendanceDetail()
            //    this.$store.state.checkingIn2.statuItem = prams
            })
        }
    }
}
</script>
<style  scoped>
.yichang{
    color: red !important;
}
    select{
        border: none;
    }
    .main{
        /* background: #fff; */
    }
    .detailTit{
        background: url('../../assets/img/checking/bkTit.png') no-repeat center;
        width: 100%;
        height: 2.08rem;
        background-size: 7.2rem 2.08rem;
    }
    .detailTit p{
        line-height: 0.74rem;
        color: #fff;
        padding: 0 0.42rem;
    }
    .titName{
        float: left;
        font-size: 0.36rem;
    }
    .titTime{
        float: right;
        font-size: 0.32rem;
    }
    .timeDetail{
       width: 6.84rem;
        height: 4.76rem;
        background: rgba(255,255,255,1);
        border-radius: 0.10rem;
        margin: 0 auto;
        position: absolute;
        top: 0.76rem;
        left: 0.2rem;
        overflow: hidden;
    }
    .arrowLeft{
        float: left;
        width: 0.12rem;
        height: 0.24rem;
        position: absolute;
        top: 50%;
        margin-top: -0.12rem;
        left: 0.16rem;
        z-index: 99;
    }
    .arrowLeft img{
        width: 100%;
        height: 100%;
    }
    .arrowRight{
        float: right;
        width: 0.12rem;
        height: 0.24rem;
         position: absolute;
        top: 50%;
        margin-top: -0.12rem;
        right:0.16rem;
         z-index: 99;
    }
    .arrowRight img{
        width: 100%;
        height: 100%;
    }
    .detailCont{
        transition: all 0.5s;
        white-space: nowrap;
        position: relative;
    }
    .detailItem{
      margin: 0.3rem 0.42rem;
      display: inline-block;
    }
     .detailList{
        width:2.9rem;
        height:4.16rem;
        background:rgba(255,245,226,1);
        border-radius:0.10rem;
        display: inline-block;
         margin: 0 0.03rem;
         vertical-align: middle;
         overflow: auto;
    }
    .detailList:nth-child(2){
        margin: 0 1.03rem 0 0.08rem !important;
    }
    .detailList:nth-child(4){
        margin: 0 1.03rem 0 0.08rem !important;
    }
    /* .detailList-3:nth-child(2){
        margin: 0 1.03rem 0 0.08rem !important;
    } */
    .detailList p{
        width:1.71rem;
        height:0.44rem;
        background:rgba(255,176,57,1);
        border-radius:0.10rem 0rem 0.20rem 0rem;
        line-height: 0.44rem;
        color: #fff;
        text-align: center;
        font-size: 0.22rem;
        position: absolute;
    }
    .detailList-2 {
       background:#EAF9FE !important;
    }
    .detailList-2 p{
       background:#32A0F5 !important;
    }
    .detailList-3 {
       background:#ECF2FE !important;
    }
    .detailList-3 p{
       background:#6C87DF !important;
    }
    .outOff{
        margin-left: 0.22rem;
        margin-top: 0.2rem;
    }
    .outOffh2 img{
         width: 0.2rem;
        height: 0.28rem;
        vertical-align: text-top;
        margin-right: 0.1rem;
    }
    .outOffh2 span{
        font-size: 0.28rem;
        color: #333333;
    }
    .outSpan{
        color: #999999;
        font-size: 0.24rem;
        margin-left: 0.3rem;
    }
    .statusList{
        padding-top: 0.56rem;
        width:6.84rem;
        /* height:10rem; */
        background:rgba(255,255,255,1);
        border-radius:0.15rem;
        margin: 0 auto;
    }
    .kejieList{
        margin: 0 0.24rem;
        position: relative;
        height: 1rem;
    }
    .stateStyle{
        float: right;
        font-size: 0.28rem;
        width: 1rem;
        height: 0.48rem;
        border-radius: 0.08rem;
        padding: 0.04rem;
        -webkit-appearance:none;
        -moz-appearance:none;
        appearance:none;
        background: url("../../assets/img/homeWork/arrow-shi.png") no-repeat scroll right center transparent;
        padding-right: 0.30rem;
    }
    .normal{
        background-color: #E5FCF5;
        color: #40CFA4;
    }
    .leave{
        background-color: #FFF2DF;
        color: #ff9900;
    }
    .truancy{
        background-color: #FFEBEB;
        color: #FF321D;
    }
    .qingjia{
         background-color: #E3F3FF;
        color: #128FEF;
    }
    .time-2{
        color: #666666;
        font-size: 0.24rem;
        margin-right: 0.1rem;
    }
    .time-3{
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 1.46rem;
    }
    .kejie{
        font-size: 0.28rem;
        color: #333333;
        display: inline-block;
        width: 2.2rem;
    }
    .kejie i{
        display: inline-block;
        width:0.17rem;
        height:0.17rem;
        background:rgba(18,143,239,1);
        border-radius:50%;
        margin-right: 0.1rem;
    }
    .line{
       width: 1px;
        height: 0.82rem;
        position: absolute;
        background-color: #DFDFDF;
        left: 1.6rem;
        top: -0.7rem;
    }
    .currMonth{
        padding-top: 0.35rem;
        width:6.84rem;
        height:6rem;
        background:rgba(255,255,255,1);
        border-radius:0.15rem;
        margin: 0 auto;
        margin-top: 0.2rem;
        margin-bottom: 0.3rem;
    }
    .monthTit{
        margin-left: 0.24rem;
        color: #333333;
        font-size: 0.32rem;
    }
    .pieStyle{
        height: 5rem;
    }
    .statusCorlor{
        text-align: center;
    }
    .statusCorlor div{
        display: inline-block;
        font-size: 0.28rem;
        color: #666666;
        margin: 0 0.1rem;
    }
    .statusCorlor div i{
        display: inline-block;
         width:0.16rem;
        height:0.16rem;
        border-radius:50%;
        margin-right: 0.08rem;
    }
    .zhengchang i {
        background:rgba(6,202,140,1);
    }
    .qingjia2 i {
        background:#128AEF;
    }
    .chidao i {
        background:#FFC000;
    }
    .zaotui i {
        background:#FFC000;
    }
    .kuangke i {
        background:#FE3000;
    }
</style>