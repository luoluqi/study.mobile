<template>
  <div >
     <amap @complete='complete'></amap>
     <div id="panel" style="display:none;"></div>
     <div class="func-p">
        <img @click="back" class="func-img" src="@/assets/img/map/back.png" alt="">
        <div>返回</div>
        <img @click="getLocation" class="func-img" src="@/assets/img/map/my.png" alt="">
        <div  @click="getLocation">我的</div>
      </div>

      <!-- <div class="walk-rigde">
        <img @click="walkOrRide('walking')" class="func-img" src="@/assets/img/map/walk.png" alt="">
        <div @click="walkOrRide('walking')">步行</div>
        <img  @click="walkOrRide('riding')" class="func-img" src="@/assets/img/map/ride.png" alt="">
        <div  @click="walkOrRide('riding')">骑行</div>
      </div> -->

     <div class="track-p">
         <div class="date-p">
             <div @click="openCalendar" class="date-item middle">{{date | formatDateTime('周W MM-DD')}}</div>
             <img  @click="openCalendar" class="date-arr middle" src="@/assets/img/map/date-arr.png" alt="">
             <div @click="prevDate" class="date-btn middle">前一天</div>
             <div v-if="!isToday" @click="nextDate" class="date-btn middle">后一天</div>
         </div>
         <div v-if="isSelectDate">
             <calendar
          
            :leave="leave"
            @change="change"
            @select="select"
            :disableFuture='true'
                ></calendar>
         </div>
         <div v-else>
            <div v-show="list.length > 0" class="time-p">
                <div class="time-start middle">首</div>
                <div class="time-text middle">{{startTime | formatDateTime('HH:mm')}}</div>
                <div class="time-end middle">末</div>
                <div class="time-text middle">{{endTime | formatDateTime('HH:mm')}}</div>
                <div @click="lookAll" class="all-p">
                    <div class="all-text middle">查看全部路径</div>
                    <img class="track-arr middle" src="@/assets/img/map/track-arr.png" alt="">
                </div>
            </div>
            <div  v-show="list.length > 0" v-if="isLookAll" class="track-list">
                <div @click="selectTrack(index)"
                v-for="(item,index) in list" :key="index" class="track-item middle" :class="{'active': index === trackIndex}">
                    <img v-if="index === trackIndex" class="track-img middle" src="@/assets/img/map/track-b.png" alt="">
                     <img v-else class="track-img middle" src="@/assets/img/map/track-g.png" alt="">
                    <div class="track-text">{{item.createTime | formatDateTime('HH:mm')}}</div>
                    <div v-if="index != list.length - 1" class="track-line"></div>
                </div>
            </div>
            <div v-show="list.length == 0" class="no-track-p">
                <img class="no-track middle" src="@/assets/img/map/no-track.png" alt="">
                <div class="no-track-text middle">当日无路径记录</div>
            </div>
        </div>

     </div>
  </div>
</template>

<script>
import amap from '@/components/map'
import calendar from '@/components/calendar/calendar'
import GPS from '@/util/gps'
import {getGPS} from '@/api/mapApi'
// import falseData from '@/views/test/data'
  export default {
    components: {
      amap, calendar
    },
    computed:{
      startTime(){
        if(this.list.length > 0){
          return this.list[0].createTime
        }else{
          return new Date()
        }
      },
      endTime(){
         if(this.list.length > 0){
          return this.list[this.list.length - 1].createTime
        }else{
          return new Date()
        }
      },
      studentId(){
         return this.$store.getters['user/studentId']
        //  return 'e0838d9a5bd54caf8a5a71db8ca2c6f2'
      },
      isToday(){
        var now = new Date()
        
        if(this.dateToStr(this.date) == this.dateToStr(now)){
          return true
        }else{
          return false
        }
      }
    },
    data() {
      return {
          tt: 'fsdfsdfsdfsdfs',
          
          leave:[],  //请假
         
          date: new Date(),
          isSelectDate: false,
          list: [],
          isLookAll: false,
          trackIndex: null
      }
    },
   
    methods: { 
      back(){
        this.$router.go(-1)
      }, 
       getLocation(){
        this.$store.dispatch('map/getLocation')
      },
      complete(){
        console.log('complete...')
      
         this.getGPS()
      },
      lookAll(){
        this.isLookAll = !this.isLookAll
      },
      openCalendar(){
        this.isSelectDate = !this.isSelectDate
      },
      selectTrack(index){
        this.trackIndex = index
        var lng = parseFloat(this.list[index].c_Longitude)
        var lat = parseFloat(this.list[index].c_Latitude)
        var positionType = this.list[index].positionType
        var positionTypeStr = ''
        if(positionType == 1){
          positionTypeStr = 'GPS定位'
        }else if(positionType == 2){
          positionTypeStr = 'WIFI定位'
        }else if (positionType == 3) {
          positionTypeStr = '基站定位(存在误差)'
        }
        var content = this.list[index].createTime + '<br>' + this.list[index].c_Address + '<br>' + '定位类型：' + positionTypeStr
        this.$store.dispatch('map/addTrackMarker', {lng, lat, content})
      },
        change(year,month){
            console.log(year, month)
        },
         select(date){
             console.log(date)
             this.leave = [date]
             this.date = new Date(date)
             this.isSelectDate = false
             this.getGPS()
         },
         dateToStr(date){
           var y = date.getFullYear()
           var m = date.getMonth() + 1
           if(m < 10){
             m = '0' + m
           }
           var d = date.getDate()
           if(d < 10){
             d = '0' + d
           }
           return y + '-' + m + '-' + d

         },
         prevDate(){
           var time = this.date.getTime() - 1000 * 3600 *24
           this.date = new Date(time)
            this.getGPS()

            this.leave = [this.dateToStr(this.date)]
         },
         nextDate(){
             var time = this.date.getTime() + 1000 * 3600 *24
           this.date = new Date(time)
            this.getGPS()

            this.leave = [this.dateToStr(this.date)]
         },
         drawTrack(){
           this.$store.dispatch('map/clear')
           if(this.list.length == 0){
             return
           }
           
           var path = []
           for (var i = 0; i < this.list.length; i++) {
             var item = this.list[i]
             if (item.positionType != 3) {
               path.push({
                  lng: parseFloat(item.c_Longitude),
                  lat: parseFloat(item.c_Latitude),
                    createTime: item.createTime
                })
             }
           }
           
            console.log(path)
             this.path = path
            if (path.length > 0) {
             
               this.$store.dispatch('map/drawTrack', {path, type:'riding'})
            }
            
           
            // this.$store.dispatch('map/addTrackMarker', {lng: 116.372105, lat: 39.90651})
         },
         getGPS(){
           var d = this.dateToStr(this.date)
           getGPS({
             StudentId: this.studentId,
           
             BeginTime: d + ' 00:00:00',
             EndTime:  d + ' 23:59:59',

             PageNum: 1,
             PageSize: 10000
           }).then(res => {
            //  res = falseData
              this.list = res.items
             this.drawTrack()
           })
         },
         walkOrRide (type) {
            this.$store.dispatch('map/drawTrack', {path:this.path, type})
         }
    },
     mounted () { 
       console.log(this.date)
      
    }
  }
</script>
<style scoped>
.walk-rigde{
  position: absolute;
  width: 0.72rem;
 
  background: #fff;
  right:0.2rem;
  bottom:3rem;
  box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
  text-align: center;
  padding: 0 0 0.2rem 0;
}
.func-p{
  position: absolute;
  width: 0.72rem;
 
  background: #fff;
  left:0.2rem;
  bottom:3rem;
  box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
  text-align: center;
  padding: 0 0 0.2rem 0;
}

.func-img{
  width: 0.44rem;
  height:0.44rem;
  display: inline-block;
  margin: 0.2rem 0 0 0;
}
.func-text{
  font-size: 0.2rem;
  color:#333;
  display: inline-block;
  margin: 0rem 0 0.12rem 0;
}
.track-p{position:absolute;width:100%;bottom:0;background: #fff;box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);}
.date-p{padding: 0.27rem 0.4rem 0 0.4rem;}
.middle{display:inline-block;vertical-align:middle;}
.date-item{color:#128FEF;font-size:0.32rem;}
.date-arr{width:0.2rem;height:0.14rem;margin: 0 0.2rem;}
.date-btn{color:#333;font-size:0.28rem;text-align:center;width:1.16rem;height:0.52rem;line-height:0.52rem;border:1px solid #BCBCBC;border-radius:0.1rem;margin: 0 0.2rem 0 0;}
.time-p{color:#666666;font-size: 0.28rem;padding: 0.36rem 0.4rem }
.time-start{width: 0.4rem;height:0.4rem;line-height: 0.4rem;background: #4BB0F4;color:#fff;font-size: 0.24rem;border-radius: 50%;text-align: center;}
.time-end{width: 0.4rem;height:0.4rem;line-height: 0.4rem;background: #FFA927;color:#fff;font-size: 0.24rem;border-radius: 50%;text-align: center;}
.time-text{margin: 0  0.27rem 0 0;}
.all-p{float: right;}
.track-arr{width: 0.24rem;height: 0.12rem;}
.track-list{overflow-x: scroll;width:100%;white-space: nowrap;padding: 0rem 0.28rem 0.3rem 0.28rem;box-sizing: border-box;}
.track-item{font-size: 0.24rem;color: #999;text-align: center;margin: 0 0.3rem 0 0;position: relative;}
.track-item.active{color:#0ADCA0;}
.track-line{position: absolute;border-top: 1px solid #ddd;width:0.8rem;  right: -0.7rem; top: 0.2rem;}
.track-img{width: 0.4rem;height: 0.4rem;}
.track-text{padding: 0.1rem 0 0 0;}
.no-track-p{text-align: center;padding: 0.3rem 0rem;}
.no-track{width:0.5rem;height:0.5rem;}
.no-track-text{font-size: 0.28rem;color: #999;}
</style>