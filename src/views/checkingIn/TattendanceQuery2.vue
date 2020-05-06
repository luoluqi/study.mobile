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
            教师考勤
        </div> -->
	</div>
     <div class="dayDetail">
         <h2>{{nowItem.Day}} {{week}}</h2>
         <div class="duanDetail">
              <ul>
                  <li v-for="(item,index) in nowItem.objs" :key="index"> 
                      <span v-if="item.upDw == 0">上午上学</span>
                      <span v-if="item.upDw == 1">上午放学</span>
                      <span v-if="item.upDw == 2">下午上学</span>
                      <span v-if="item.upDw == 3">下午放学</span>
                      <ul class="DuanType">
                          <li  v-for="(item2,index2) in item.updownList" :key="index2" v-if="item2.list > 0 && item2.key != 5 && item2.key != 0">
                              <!-- 1-迟到；2-早退；3-请假；4-旷课 -->
                              <span v-if="item2.key == 1">迟到{{item2.list}}人</span>
                              <span v-if="item2.key == 2">早退{{item2.list}}人</span>
                              <span v-if="item2.key == 3">请假{{item2.list}}人</span>
                              <span v-if="item2.key == 4">旷课{{item2.list}}人</span>
                              
                           </li>
                      </ul>
                  </li>
                  
              </ul>
         </div>
         <div class="chaKanDetail" @click="checkDetailNow(nowItem.Day)">查看考勤明细<img src="@/assets/img/arrR.png" alt=""></div>
     </div>
     <div class="dateList">
         <ul>
             <li v-for="(item,index) in checkingData" :key="index" @click="GetItemDetail(item.Day)">
                <div @click="unfold(index)" class="dayWeek"><span>{{item.Day}} {{item.Day | getDay}}</span><img :class="{up:item.isOpen,down:!item.isOpen}" src="@/assets/img/arrX.png" alt=""></div> 
                  <div :class="{close:!item.isOpen,open:item.isOpen}">
                      <div class="duanDetail duanDetail2 " style="margin-left: 0rem;">
                            <ul>
                                <li v-for="(item2,index2) in item.detail" :key="index2">
                                    <span v-if="item2.upDw == 0">上午上学</span>
                                    <span v-if="item2.upDw == 1">上午放学</span>
                                    <span v-if="item2.upDw == 2">下午上学</span>
                                    <span v-if="item2.upDw == 3">下午放学</span>
                                    <ul class="DuanType">
                                        <li v-for="(item3,index3) in item2.updownList" :key="index3" v-if="item3.list > 0 && item3.key != 5 && item3.key != 0">
                                            <!-- 1-迟到；2-早退；3-请假；4-旷课 -->
                                            <span v-if="item3.key == 1">迟到{{item3.list}}人</span>
                                            <span v-if="item3.key == 2">早退{{item3.list}}人</span>
                                            <span v-if="item3.key == 3">请假{{item3.list}}人</span>
                                            <span v-if="item3.key == 4">旷课{{item3.list}}人</span>
                                        </li>
                                    </ul>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="chaKanDetail" @click="checkDetail(item.Day)">查看考勤明细<img src="@/assets/img/arrR.png" alt=""></div>
                  </div>
                  
             </li>
         </ul>
     </div>
      <bottomNav></bottomNav>
  </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {getChekingDetail,getParticulars,getItemDetail} from "@/api/chekingApi"
import { debug } from 'util';
export default {
    components: {
        headNav,
        bottomNav
  },
  data(){
      return {
           isOpen:false,
           schoolId:'',
           gradeId:'',
           classId:'',
        //    date:'2019-08-09',
           checkingData:{},
           detailData:{},
           mydate:'',
           week:'',
           nowItem:{},
           nowItemSS:[],
           ItemDetail:[]
      }
  },
   mounted(){
    this.presentDate()
    this.week = this.getWeekDate(new Date())
    this.GetChekingDetail()
  },
  methods:{
        unfold(index){
            this.checkingData[index].isOpen =  !this.checkingData[index].isOpen 
                this.checkingData.splice(index,1,this.checkingData[index])

            
        },
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
        // 获取当前日期 当前星期
        presentDate(){
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
            // alert(this.mydate)
        },
        getWeekDate(day) {
            var now = day;
            var day = now.getDay();
            var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            var week = weeks[day];
            // alert(week);
            return week
	    },

        // 获取考勤汇总信息
       GetChekingDetail(){
           
           this.schoolId = this.getCookie("schoolId")
        //    debugger
           console.log("schoolId:",this.schoolId);
            if(!this.schoolId){
                this.schoolId = "eeeea2b869e44b3bbd797f4d781aceaf";
            } 
           
            this.gradeId = this.getCookie("gradeId")
            console.log("gradeId:" ,this.gradeId);
            if(!this.gradeId){
                this.gradeId = "162f01e041d541db8a5885c2e16e3a9f";
            }
           
            this.classId = this.getCookie("classId")
             console.log("classId:",this.classId);
            if(!this.classId){
                this.classId = "d5f2734484b54ab09e0328c9429c7234";
            }
           
            var param={
                schoolId:this.schoolId,
                gradeId:this.gradeId,
                classId:this.classId,
                startDatetime:this.mydate
            }
        //    alert(this.schoolId)
			getChekingDetail(param).then((data) => {
               var data = JSON.parse(data)
                if(data.Code==200){
                     this.nowItem = data.Data[0]
                    //  console.log(this.nowItem);
                    this.checkingData=data.Data
                    this.checkingData.shift();
                    // console.log(111111);
                    // console.log(this.checkingData);
                    for(var obj of this.checkingData){
                        obj.isOpen = false
                    }
                }
                
			});
        },
        //  获取当天的考勤汇总信息
        GetItemDetail(date){
          var param={
                schoolId:this.schoolId,
                gradeId:this.gradeId,
                classId:this.classId,
                startDatetime:date
            }
            getItemDetail(param).then((data) => {
               var data = JSON.parse(data)
                if(data.Code==200){
                    //  console.log(data);
                    //  debugger
                     this.ItemDetail=data.Data[0].objs
                     var ItemDate=data.Data[0].Day
                     for(var obj of this.checkingData){
                         if(obj.Day==ItemDate){
                             // obj.detail=this.ItemDetail
                              this.$set(obj,"detail",this.ItemDetail)
                         }
                     }
                    //  console.log(this.checkingData)
                     
                }
                
			});

        },
        // 存进状态管理
        // StateStore(){
            
        // },
        // 当天点击查看详情
         checkDetailNow(nowDay){
            this.$store.state.checking.startDatetime = nowDay
            this.$store.state.checking.schoolId = this.schoolId
            this.$store.state.checking.gradeId = this.gradeId
            this.$store.state.checking.classId = this.classId
           this.$router.push('TstudentDetail')
         },
        // 点击查看详情
         checkDetail(Day){
            this.$store.state.checking.startDatetime = Day
            this.$store.state.checking.schoolId = this.schoolId
            this.$store.state.checking.gradeId = this.gradeId
            this.$store.state.checking.classId = this.classId
            this.$router.push('TstudentDetail')
         }
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>

