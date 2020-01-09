<template>
    <div style="position: relative;">
     <headNav :title="'考勤查询'"></headNav>
    <div class="qj-bj">
		<div class="qj-img"><img :src="userDetail.headImg"></div>
		<div class="qj-text">
			<h2>{{userDetail.realName}}</h2>
			<p>{{userDetail.gradeName}}{{userDetail.className}}</p>
		</div>
        <!-- <div class="changeIdn">
            <img src="@/assets/img/change-reco.png">
            教师考勤
        </div> -->
	</div>
     <div class="dateList">
         <ul>
             <li v-for="(item ,index) in dateList" :key="index" >
                <h2 style="float: left;">{{item | formatDateTime('yyyy-MM-dd 星期w')}}</h2>
                <div style="float: right;" class="chaKanDetail" @click="getItemData(item)">查看考勤明细<img src="@/assets/img/arrR.png" alt=""></div>
                  
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
           userDetail:{},
           dateList: []
      }
  },
   mounted(){
       this.userDetail = this.$store.state.user
       console.log(this.userDetail)

       this.createDateList()
  },
  methods:{
        createDateList(){
            var now = new Date()
            this.dateList.push(now)
            for(var i = 0;i < 29;i++){
                var d = now.getTime() - 1000 *3600 *24
                d = new Date(d)
                this.dateList.push(d)
                now = d
            }
            // console.log(this.dateList)
        },
        getItemData(item){
           var aa = new Date(item)
            var myDate = new Date(aa);
             var year = myDate.getFullYear()
            var month = myDate.getMonth() + 1
            var date = myDate.getDate()
            if(month < 10) {
                month = '0' + month
            }
            if(date < 10) {
                date = '0' + date
            }
            var datetime=year+'-'+month+'-'+date
            console.log(datetime)
            this.$store.state.checking.startDatetime = datetime
           this.$router.push('TstudentDetail')
        }
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>
<style scoped>
.dateList{
    margin-top:-0.85rem;
}
</style>

