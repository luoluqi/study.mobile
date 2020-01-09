<template>
    <div class="studentDetail">
        <headNav :title="'考勤查询'"></headNav>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{detailData.Date}}</p>
        <div class="studentList">
            <ul>
                <li v-for="(item,index) in detailData.AttenceList" :key="index" @click="DayDetail(item)">
                    <ul class="stuDetail">
                        <li class="nameBk">{{item.StudentName}}</li>
                         <li v-for="(item2,index) in item.list" :key="index">
                            <h1>{{item2.AttenceTypeName}}</h1>
                            <h2 v-if="item2.AttenceDateTime != '无考勤记录'">{{item2.AttenceDateTime}}</h2>
                            <h2 v-if="item2.AttenceDateTime == '无考勤记录'">-</h2>
                            <span v-if="item2.AttenceStatus == 0">正常</span>
                            <span v-if="item2.AttenceStatus == 5" class="kuang3">异常</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
         <bottomNav></bottomNav>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {GetAttenceListByDayDetail} from "@/api/chekingApi"
export default {
    components: {
    headNav,
    bottomNav
  },
  data(){
      return {
        //   schoolId:'',
        //    gradeId:'',
        //    classId:'',
        //    startDatetime:''
        detailData:[],
        userDetail:{}
      }
  },
   mounted(){
       this.userDetail = this.$store.state.user
       console.log(this.userDetail)
      this.GetParticulars()
    if(this.$store.state.checking.startDatetime==null){
        this.$router.push('TattendanceQuery')
    }
  },
  methods:{
    // 获取考勤明细信息
         GetParticulars(){
              var param ={
                   schoolId:this.userDetail.schoolId,
                    gradeId:this.userDetail.gradeId,
                    classId:this.userDetail.classId,
                    startDatetime:this.$store.state.checking.startDatetime
              }
			GetAttenceListByDayDetail(param).then((data) => {
                var data =JSON.parse(data);
                 console.log(data)
                if (data.Code==200) {
                    this.detailData=data.Data

                }
                // console.log( this.detailData);
                
                
			});
        },
        DayDetail(item){
         this.$store.state.checking.studentId = item.StudentId
         this.$store.state.checking.StudentName = item.StudentName
         this.$store.state.checking.photoUrl = item.photoUrl
         this.$router.push('TchekingInInquire')
        }
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>
<style scoped>
.stuDetail li h1{
    /* margin-top: 0.25rem; */
}
.stuDetail li h2{
    font-size: 0.24rem;
}
</style>

