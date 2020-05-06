<template>
    <div class="studentDetail">
        <headNav :title="'考勤查询'"></headNav>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;{{detailData.Day}} {{detailData.Day | getDay}}</p>
        <div class="studentList">
            <ul>
                <li v-for="(item,index) in detailData.objs" :key="index" :stuId="item.stuId" @click="DayDetail(item.stuId)">
                    <ul class="stuDetail">
                        <li class="nameBk">{{item.stuName}}</li>
                        <li v-for="(item2,index2) in item.attenceList" :key="index2">
                            <h1 v-if="item2.key == 0">上午上学</h1>
                            <h1 v-if="item2.key == 1">上午放学</h1>
                            <h1 v-if="item2.key == 2">下午上学</h1>
                            <h1 v-if="item2.key == 3">下午放学</h1>
                            <h2>{{item2.time}}</h2>
                            <span v-if="item2.status == 0">正常</span>
                            <span v-if="item2.status == 1" class="zaochi">迟到</span>
                            <span v-if="item2.status == 2" class="zaochi">早退</span>
                            <span v-if="item2.status == 3" class="qingjia3">请假</span>
                            <span v-if="item2.status == 4" class="kuang3">旷课</span>
                        </li>
                        <!-- <li>
                            <h1>上午放学</h1>
                            <h2>11:36</h2>
                            <span class="zaochi">早退</span>
                        </li>
                        <li>
                            <h1>下午上学</h1>
                            <h2>13:36</h2>
                            <span class="qingjia3">请假</span>
                        </li>
                        <li>
                            <h1>下午放学</h1>
                            <h2>18:00</h2>
                            <span class="kuang3">旷课</span>
                        </li> -->
                    </ul>
                </li>
                <!-- <li>
                    <ul class="stuDetail">
                        <li class="nameBk">陈锋风</li>
                        <li>
                            <h1>上午上学</h1>
                            <h2></h2>
                            <span>正常</span>
                        </li>
                        <li>
                            <h1>上午放学</h1>
                            <h2></h2>
                            <span class="zaochi">早退</span>
                        </li>
                        <li>
                            <h1>下午上学</h1>
                            <h2></h2>
                            <span class="qingjia3">请假</span>
                        </li>
                        <li>
                            <h1>下午放学</h1>
                            <h2></h2>
                            <span class="kuang3">旷课</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul class="stuDetail">
                        <li class="nameBk">陈锋风</li>
                        <li>
                            <h1>上午上学</h1>
                            <h2>09:36</h2>
                            <span>正常</span>
                        </li>
                        <li>
                            <h1>上午放学</h1>
                            <h2>09:36</h2>
                            <span class="zaochi">早退</span>
                        </li>
                        <li>
                            <h1>下午上学</h1>
                            <h2>09:36</h2>
                            <span class="zaochi">迟到</span>
                        </li>
                        <li>
                            <h1>下午放学</h1>
                            <h2>09:36</h2>
                            <span class="kuang3">旷课</span>
                        </li>
                    </ul>
                </li> -->
            </ul>
        </div>
         <bottomNav></bottomNav>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import {getChekingDetail,getParticulars} from "@/api/chekingApi"
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
        detailData:[]
      }
  },
   mounted(){
    this.GetParticulars()
    if(this.$store.state.checking.schoolId==null){
        this.$router.push('TattendanceQuery')
    }

  },
  methods:{
    // 获取考勤明细信息
         GetParticulars(){
    
			getParticulars({
				schoolId:this.$store.state.checking.schoolId,
				gradeId:this.$store.state.checking.gradeId,
                classId:this.$store.state.checking.classId,
                startDatetime:this.$store.state.checking.startDatetime
			}).then((data) => {
                var data =JSON.parse(data);
                if (data.Code==200) {
                    this.detailData=data.Data[0]
                }
                // console.log( this.detailData);
                
                
			});
        },
        DayDetail(stuId){
         this.$store.state.checking.studentId = stuId
         this.$router.push('TchekingInInquire')
        }
  }
 
}
</script>
<style scoped src="@/assets/css/chekingIn.css">

</style>

