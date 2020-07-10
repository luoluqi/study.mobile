<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<div class="qj-img"><img :src="tescherImg"></div>
		<div class="qj-text" style="padding-top: 0.4rem;">
			<h2>{{tescherName}}</h2>
			<!-- <p>三年级</p> -->
		</div>
        <div class="changeIdn" @click="LookTeacher">
            <img src="@/assets/img/change-reco.png">
            教师考勤
        </div>
	</div>
     <!-- <div class="kaoBk">
         <ul>
             <li @click="LookStudent"><img src="@/assets/img/student.png" alt=""><span>学生考勤查询</span></li>
             <li @click="LookTeacher"><img src="@/assets/img/teacher.png" alt=""><span>教师考勤查询</span></li>
         </ul>
     </div> -->
     <div class="kaoContent">
         <p>
             <span class="Pleft">{{ClockInListData.name}}</span>
             <span class="Pright">{{ClockInListData.day | formatDateTime('YYYY-MM-DD')}}   {{ClockInListData.day | getDay}}</span>
         </p>
         <div v-for="(item,index) in ClockInListData.commutings" :key="index">
             <div class="itemContent" v-if="item.attendanceTeachCommutingWork.id" >
                <ul>
                    <li class="oneLi"><i></i><span>上班时间{{item.attendanceTeachCommutingWork.attendanceTime | formatDateTime('HH:mm:ss')}}</span></li>
                    <li class="twoLi">
                        <span v-if="item.attendanceTeachCommutingWork.cardingTime">打卡时间{{item.attendanceTeachCommutingWork.cardingTime | formatDateTime('HH:mm:ss')}}</span>
                        <span v-if="item.attendanceTeachCommutingWork.cardingTime == null">打卡时间{{item.attendanceTeachCommutingWork.cardingTime}}</span>
                        <span v-if="item.attendanceTeachCommutingWork.msg == '正常'" class="Czhengchang">正常</span>
                        <span v-if="item.attendanceTeachCommutingWork.msg == '迟到'" class="kaochi">迟到</span>
                        <span v-if="item.attendanceTeachCommutingWork.msg == '早退'" class="kaochi">早退</span>
                        <span v-if="item.attendanceTeachCommutingWork.msg == '请假'" class="Cqingjia">请假</span>
                        <span v-if="item.attendanceTeachCommutingWork.msg == '旷工'" class="Ckuangke">旷工</span>
                        <span @click="updataClockIn('1')" class="gengxin" v-if="item.attendanceTeachCommutingWork.isLast">更新打卡 ></span>
                    </li>
                    <li class="threeLi" v-if="item.attendanceTeachCommutingWork.address"><img src="@/assets/img/ding.png" alt=""><span>{{item.attendanceTeachCommutingWork.address}}</span></li>
                    <li class="threeLi" v-if="item.attendanceTeachCommutingWork.msg == '旷工'">
                        <span>缺卡</span>
                        <!-- <div class="bukaBtn" @click="goBuka">申请补卡</div> -->
                    </li>
                </ul>
                <div class="line"></div>
            </div>
            <div class="itemContent" v-if="item.attendanceTeachCommutingWorkOff.id">
                <ul>
                    <li class="oneLi"><i></i><span>下班时间{{item.attendanceTeachCommutingWorkOff.attendanceTime | formatDateTime('HH:mm:ss')}}</span></li>
                    <li class="twoLi">
                        <span v-if="item.attendanceTeachCommutingWorkOff.cardingTime">打卡时间{{item.attendanceTeachCommutingWorkOff.cardingTime | formatDateTime('HH:mm:ss')}}</span>
                        <span v-if="item.attendanceTeachCommutingWorkOff.cardingTime == null">打卡时间{{item.attendanceTeachCommutingWorkOff.cardingTime}}</span>
                        <!-- <span class="kaochi">早退</span> -->
                        <span v-if="item.attendanceTeachCommutingWorkOff.msg == '正常'" class="Czhengchang">正常</span>
                        <span v-if="item.attendanceTeachCommutingWorkOff.msg == '迟到'" class="kaochi">迟到</span>
                        <span v-if="item.attendanceTeachCommutingWorkOff.msg == '早退'" class="kaochi">早退</span>
                        <span v-if="item.attendanceTeachCommutingWorkOff.msg == '请假'" class="Cqingjia">请假</span>
                        <span v-if="item.attendanceTeachCommutingWorkOff.msg == '旷工'" class="Ckuangke">旷工</span>
                        <span @click="updataClockIn('1')" class="gengxin" v-if="item.attendanceTeachCommutingWorkOff.isLast">更新打卡 ></span>
                    </li>
                    <li v-if="item.attendanceTeachCommutingWorkOff.address" class="threeLi"><img src="@/assets/img/ding.png" alt=""><span>{{item.attendanceTeachCommutingWorkOff.address}}</span></li>
                    <li class="threeLi" v-if="item.attendanceTeachCommutingWorkOff.msg == '旷工'">
                        <span>缺卡</span>
                        <!-- <div class="bukaBtn" @click="goBuka">申请补卡</div> -->
                    </li>
                </ul>
                <div class="line"></div>
            </div>
         </div>
         <div class="clockIn" v-if="KaHide">
             <p class="clockP" v-if="surpass"><i></i><span>{{State.time}}</span></p>
             <!-- <p v-if="surpass == 500" class="clockP"><i></i><span>超过打卡次数</span></p> -->
             <div class="daka" @click="clockIn('1')" v-if="surpass">{{State.msg}}</div>
         </div>
     </div>
     <!-- 打卡弹窗 -->
     <div class="kaTan" v-if="KaShow == 1">
          <div class="win"></div>
          <div class="Kacontent">
              <p>打卡</p>
              <ul>
                  <li>打卡时间：{{IsRang.time | formatDateTime('HH:mm:ss')}}</li>
                  <li style="min-height: 1.3rem;">打卡地点：<span >{{IsRang.address}}</span> </li>
                  <li v-if="IsRang.isRang==false" style="text-align: center;font-size: 0.36rem;color: #ff9900;"><img src="@/assets/img/jing.png" alt=""> {{IsRang.msg}}</li>
              </ul>
              <div class="btnBox">
                  <span v-if="IsRang.isRang==true" @click="confirmCLockIn">确定打卡</span>
                  <span @click="quxiaoDaka('0')">取消</span>
              </div>
          </div>
     </div>
     <!-- 更新打卡弹窗 -->
     <div class="kaTan" v-if="updataKa == 1">
          <!-- <div class="win"></div>
          <div class="Kacontent" style="height: 4.56rem;">
              <p>提示</p>
              <ul>  
                  <li style="text-align: center;font-size: 0.36rem;color: #ff9900;height: 1.3rem;line-height: 1.3rem;"><img src="@/assets/img/jing.png" alt=""> 确定更新打卡记录？</li>
              </ul>
              <div class="btnBox">
                  <span @click="updataCLockIndata">确定打卡</span>
                  <span @click="updataClockIn('0')">取消</span>
              </div>
          </div> -->
          <div class="win"></div>
          <div class="Kacontent">
              <p>更新打卡</p>
              <ul>
                  <li>打卡时间：{{IsRang.time | formatDateTime('HH:mm:ss')}}</li>
                  <li style="min-height: 1.3rem;">打卡地点：<span >{{IsRang.address}}</span> </li>
                  <li v-if="IsRang.isRang==false" style="text-align: center;font-size: 0.36rem;color: #ff9900;"><img src="@/assets/img/jing.png" alt=""> {{IsRang.msg}}</li>
              </ul>
              <div class="btnBox">
                   <span v-if="IsRang.isRang==true" @click="updataCLockIndata">确定打卡</span>
                  <span @click="updataClockInqu('0')">取消</span>
              </div>
          </div>
     </div>
     <div style="height:2rem;"></div>
      <bottomNav></bottomNav>
  </div>
</template>

<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {IsRang,GetConfig,AddAttendancerecord,GetAttendanceNow,UpdateAttendancerecord,GetAttendanceRecordState,GetCommuting} from "@/api/chekingApi"
import { debug } from 'util';
import GPS from '@/util/gps'
export default {
    components: {
        headNav,
        bottomNav
  },
  data(){
      return {
          KaHide:true,
          KaShow: '0',
          updataKa: '0',
          latitude: '',
          longitude: '',
          IsRang: {},
          teachId: '',
          ClockInListData: {},
          State:{},
          surpass:true,
          tescherName:'',
          tescherImg:'',
          deptId:'',
          memuList:[],
          menuNames:[{FlowName: '补考勤', val: 'patchCard', FormId: 'f5a68f61-467f-4eff-acec-041bb7907ef1'}]

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
    this.ClockInList()
    // this.getDeptId()
    // this.RecordState()
    // this. Commuting()
  },
  methods:{
      goBuka(){
          this.$router.push('/oa/patchCard')
        //   var obj = {FlowName: '补考勤', val: 'patchCard', FormId: 'f5a68f61-467f-4eff-acec-041bb7907ef1'}
      },
       // 获取部门deptid
        getDeptId () {
            var teacherId = this.$store.state.user.teacherId
            this.$store.dispatch('oa/DeptListByTeacherId', {teacherId}).then(result => {
                let arr = []
                let deptArr = []
                if (result.Code == 200) {
                    for (var i = 0; i < result.Data.length; i++) {
                        var obj = {name: result.Data[i].Name, value: result.Data[i].Id}
                        arr.push(result.Data[i].Id)
                        deptArr.push(result.Data[i].Name)
                    }
                    this.deptId = arr.join()
                    this.$store.commit('oa/deptId', this.deptId)
                    this.$store.commit('oa/deptArr', deptArr)
                    this.myPowerApplyFlow()
                } 
            })
        },
      // 获取当前用户能申请的流程
        myPowerApplyFlow () {
            var params = {
                userId: this.$store.getters['user/teacherId'],
                deptId: this.deptId,
                schoolId: this.$store.state.user.schoolId
            }
            this.$store.dispatch('oa/MyPowerApplyFlow', params).then(
                res => {
                    if (res.Code == 200) {
                        this.memuList = res.Data
                        for(var obj of this.memuList){
                            for(var obj2 of this.menuNames){
                                if(obj2.FormId == obj.FormId){
                                    this.$store.commit('oa/setFlowObj', obj)
                                }
                            }
                        }
                    } 
                }

            )
        },
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
        // 打卡 weixin
       clockIn (a) {
         this.KaShow = a
         this.$vux.loading.show({
                text: '加载中'
            })
            setTimeout(() => {
                self.$vux.loading.hide()
            }, 5000)
        
         this.getAddress().then(res => {
            
                this.KaShow = a
                
         })
       
           
       },
    
    // 取消打卡
    quxiaoDaka (a) {
         this.KaShow = a
    },
    //  取消更新打卡
    updataClockInqu (a) {
        this.updataKa = a
    },
    //    确定打卡
       confirmCLockIn(){
           this.teacherId = this.getCookie("teacherId")
            if(!this.teacherId){
                this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                return
            }
            var param = {
                teachId	:this.teacherId,
                longitude: this.longitude,
                latitude: this.latitude
            }
            AddAttendancerecord(param).then((data) => {
                var data =JSON.parse(data)
                console.log(data) 
                    if (data.Code==200) {
                        this.$vux.toast.text(data.Msg, 'top')
                        this.KaShow = '0'
                    }else{
                        this.$vux.toast.text(data.Msg, 'top')
                        this.KaShow = '0'
                    }
                this.ClockInList()
                // this.RecordState()
            })
       },
       //   更新打卡
        updataClockIn (a) {
         this.updataKa = a
         this.$vux.loading.show({
                text: '加载中'
            })
         setTimeout(() => {
                self.$vux.loading.hide()
            }, 5000)
        this.getAddress().then(() => {

        })
       
       },
    // 确定更新打卡
      updataCLockIndata(){
          var self = this
            this.teacherId = this.getCookie("teacherId")
            if(!this.teacherId){
                this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                return
            }
            // alert(this.longitude)
            var param = {
                teachId	:this.teacherId,
                longitude: this.longitude,
                latitude: this.latitude
            }
            UpdateAttendancerecord(param).then((data) => {
                                var data =JSON.parse(data)
                                console.log(data) 
                                    if (data.Code==200) {
                                        self.$vux.toast.text(data.Msg, 'top')
                                        self.updataKa = '0'
                                    }
                                self.ClockInList()
                                // self.RecordState()
                            })
       },   
      
      
    //    打卡记录列表
     ClockInList(){
         this.teacherId = this.getCookie("teacherId")
            if(!this.teacherId){
                this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                this.KaHide = false
                return
            }
            var param = {
                teachId	:this.teacherId,
                time:null
            }
            GetAttendanceNow(param).then((data) => {
                // alert(data)
                var data =JSON.parse(data)
                console.log(data) 
                    if (data.Code==200) {
                        if(data.Data){
                             this.ClockInListData = data.Data
                             this.RecordState()
                            if(data.Data.commutings[0]){
                                // debugger
                                var data = data.Data
                                var last = data.commutings[data.commutings.length - 1]
                                if (last.attendanceTeachCommutingWorkOff.id){
                                    last.attendanceTeachCommutingWorkOff.isLast = true
                                }else{
                                    last.attendanceTeachCommutingWork.isLast = true
                                }
                            
                                this.ClockInListData = data
                            } 
                        } else {
                                console.log(this)
                                this.KaHide = false
                                console.log(this)

                                this.$vux.toast.text('该老师未参加考勤组', 'top')
                        }
                       
                    }else{
                        this.$vux.toast.text(data.Msg, 'top')
                    }
                
            })
     },
    //  获取现在打卡是上班还是下班
      RecordState(){
         this.teacherId = this.getCookie("teacherId")
            if(!this.teacherId){
                this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                return
            }
            var param = {
                teachId	:this.teacherId,
            }
            GetAttendanceRecordState(param).then((data) => {
                // alert(data) 
                var data =JSON.parse(data)
                 console.log(11111111) 
                console.log(data) 
                    if (data.Code==200) {
                       this.State = data.Data
                        this.surpass = true
                    }else if(data.Code==500){
                        this.surpass = false
                    }
            })
     },
     // 根据教师Id获取班次
     Commuting(){
          this.teacherId = this.getCookie("teacherId")
            if(!this.teacherId){
                this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                return
            }
            var param = {
                teachId	:this.teacherId,
            }
            GetCommuting(param).then((data) => {
                var data =JSON.parse(data)
                console.log(data) 
                    // if (data.Code==200) {
                    //    this.State = data.Msg
                    // }
            })
     },
    //    查看学生考勤
       LookStudent () {
           this.$router.push('TattendanceQuery')
       },
      //    查看教师考勤
       LookTeacher () {
        //    checkingIn2/studentCheck
           this.$router.push('LookTeacherDetail')
       },
       getAddress(){
           var self = this
           return new Promise((resolve,reject) => {
               wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {                              
                        var latitude = parseFloat(res.latitude+'') // 纬度，浮点数，范围为90 ~ -90
                        var longitude = parseFloat(res.longitude+'') // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed // 速度，以米/每秒计
                        var accuracy = res.accuracy // 位置精度
                        self.teacherId = self.getCookie("teacherId")
                        if(!self.teacherId){
                            this.$vux.toast.text('您暂未设置教师信息，请联系管理员设置教师信息')
                             return 
                        }

                         var resLnglat = GPS.gcj_encrypt( latitude,longitude)
                     
                        var param = {
                            teachId	:self.teacherId,
                            longitude: resLnglat.lng,
                            latitude:  resLnglat.lat
                        }
                        
                        IsRang(param).then((data) => {
                            var data =JSON.parse(data)
                            console.log(data) 
                            if (data.Code==200) {
                                self.$vux.loading.hide()
                               
                                self.IsRang = data.Data
                                self.latitude = resLnglat.lat,
                                self.longitude = resLnglat.lng
                            }else{
                                 self.$vux.loading.hide()
                            }
                            resolve()
                            
                        })

                        // AMap.convertFrom([longitude,latitude], 'gps', function (status, result) {
                            
                        //     if (result.info === 'ok') {
                        //         var resLnglat = result.locations[0];
                        //     }
                        // })
                        
                    },
                    cancel: function (res) {
                        // 点击取消执行的回调函数
                        self.$vux.loading.hide()
                        self.$vux.toast.text('用户拒绝授权获取地理位置', 'top')
                    },
                    fail: function () {
                    // 失败的回调函数
                        self.$vux.loading.hide()
                        self.$vux.toast.text('获取地理位置失败', 'top')
                    }
                    
                })
           })
       }
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>
<style  scoped>
.kaoBk{
    width: 6.72rem;
    height: 1.3rem;
    position: absolute;
    top: 2.6rem;
    left: 0.24rem;
    background-color: #fff;
    border-radius: 0.15rem;
    box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.1);
}
.kaoBk li{
    color: #666666;
    font-size: 0.28rem;
    float: left;
    width: 49.6%;
    text-align: center;
    /* line-height: 1.3rem; */
    margin: 0.3rem 0;
    line-height: 0.7rem;
    border-right: 1px solid #e5e5e5;
}
.kaoBk li:nth-child(2){
           border-right: 0
        }
.kaoBk li img{
    width: 0.4rem;
    height: 0.36rem;
    display: inline-block;
    vertical-align: sub;
    margin-right: 0.1rem;
}
.kaoContent{
    width: 6.72rem;
    margin: 0 auto;
    background-color: #fff;
    min-height: 4rem;
    border-radius: 0.15rem;
    /* margin-top: 0.6rem; */
    padding-bottom: 0.5rem;
    margin-bottom: 0.3rem;
    position: absolute;
    top: 2.6rem;
    left: 0.24rem;
}
.kaoContent p{
    font-size: 0.28rem;
    line-height: 1rem;
    padding: 0 0.24rem;
    overflow: hidden;
}
.Pleft{
    color: #0a8de5;
    float: left;
}
.Pright{
    float: right;
    color: #666666;
}
.itemContent{
    padding: 0 0.24rem;
        height: 2.64rem;
        position: relative
}
.itemContent li{
    overflow: hidden;
    margin-top: 0.2rem
}
.oneLi  i{
   width: 0.15rem;
   height: 0.15rem;
   background: #d2d2d2;
   border-radius: 0.15rem;
   display: inline-block;
   margin-right: 0.15rem;
}
.oneLi  span{
    color: #999999;
}
.twoLi span:nth-child(1){
    font-size: 0.32rem;
    color: #333333;
    float: left;
    font-weight: 600;
    margin-left: 0.35rem;
}
.kaochi{
    background-color: #fff2df !important;
    color: #ff9900 !important;
    padding: 0.05rem 0.15rem;
    float: left;
    margin-left: 0.2rem;
    border-radius: 0.08rem;
    font-size: 0.28rem;
}
.Czhengchang{
    
     background-color: #e5fcf5;
    color: #40cfa4;
    padding: 0.05rem 0.15rem;
    float: left;
    margin-left: 0.2rem;
    border-radius: 0.08rem;
    font-size: 0.28rem;
}
.Cqingjia{
    
     background-color: #e2f3ff !important;
    color: #0a8de5 !important;
    padding: 0.05rem 0.15rem;
    float: left;
    margin-left: 0.2rem;
    border-radius: 0.08rem;
    font-size: 0.28rem;
}
.Ckuangke{
      background-color: #ffeaea !important;
    color: #ff2f2f !important;
    padding: 0.05rem 0.15rem;
    float: left;
    margin-left: 0.2rem;
    border-radius: 0.08rem;
    font-size: 0.28rem;
}
.twoLi .gengxin{
    font-size: 0.28rem;
    color: #0a8de5;
    float: right;
}
.threeLi{
    margin-left: 0.35rem;
}
.threeLi img{
    width: 0.3rem;
    height: 0.34rem;
    float: left;
    margin-right: 0.1rem;
}
.threeLi span{
    font-size: 0.28rem;
    color: #999999;
}
.line{
    width: 1px;
    height: 2.9rem;
    background: #d2d2d2;
    position: absolute;
    top: 0.18rem;
    left: 0.3rem;
}
.clockP  i{
   width: 0.15rem;
   height: 0.15rem;
   background: #0a8de5;
   border-radius: 0.15rem;
   display: inline-block;
   margin-right: 0.15rem;
}
.clockP  span{
    color: #999999;
}
.daka{
    width: 2.12rem;
    height: 2.12rem;
    background-color: #1393e9;
    border-radius: 2.12rem;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    line-height: 2.12rem;
    font-size: 0.32rem
}
.win{
    position: fixed;
    background-color: #222222;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 102;
    left: 0;
    top: 0;
}
.Kacontent{
    width: 6.46rem;
    height: 5.56rem;
    background-color: #fff;
    border-radius: 0.15rem;
    position: fixed;
    top: 3rem;
    left: 0.35rem;
    z-index: 200;
}
.Kacontent p{
    font-size: 0.32rem;
    color: #333333;
    line-height: 0.92rem;
    padding-left: 0.46rem;
    border-bottom: 1px solid #dedede;
}
.Kacontent ul{
    margin-top: 0.2rem;
}
.Kacontent ul li{
    font-size: 0.28rem;
    color: #999999;
    padding: 0 0.44rem;
    line-height: 0.5rem;
}
.Kacontent ul li span{
    color: #333;
}
.Kacontent ul li img{
    width: 0.36rem;
    height: 0.36rem;
    display: inline-block;
    vertical-align: middle;
}
.btnBox{
    overflow: hidden;
    padding: 0 0.7rem;
    margin-top: 0.5rem;
}
.btnBox span{
    float: left;
    width: 2.32rem;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    border: 1px solid #0a8de5;
    font-size: 0.36rem;
    border-radius: 0.5rem
}
.btnBox span:nth-child(1){
   background-color: #0a8de5;
   color: #fff;
   margin-right: 0.32rem;
}
.btnBox span:nth-child(2){
   background-color: #ffffff;
   color: #0a8de5
}
.bukaBtn{
    display: inline-block;
    font-size: 0.28rem;
    background-color: #1393e9;
    width: 1.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.3rem;
    color: #fff;
    margin-left: 0.3rem;
}
.clockIn{
    margin-bottom: 1rem;
}
</style>

