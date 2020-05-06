<template>
    <div id="statistics" style="background-color: #fff;">
         <headNav title="成绩统计"></headNav>
        <div class="statistics">
            <div class="statisticsItem" v-for="(item,index) in yearData" :key="index">
                <div class="year">
                    <p>{{item.schoolyears.Name}}</p>
                </div>
                <div class="yearLow" @click="yearDetail(item.schoolyears.Id,item2.Id)" v-if="item2.IsCurrent == '1'" v-for="(item2,index) in item.schoolterms" :key="index"><span>{{item2.Name}}</span> <img src="@/assets/img/exam/rightC.png" alt=""></div>
                <div class="yearUp" @click="yearDetail(item.schoolyears.Id,item2.Id)" v-if="item2.IsCurrent == '0'" v-for="(item2,index) in item.schoolterms" :key="index"><span>{{item2.Name}}</span> <img src="@/assets/img/exam/rightL.png" alt=""></div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';

export default {
    components: {
        headNav
    },
    data() {
        return {
        }
    },
    mounted(){
        this.getSchoolYears()
    },
     computed: {
        yearData(){
            return this.$store.state.exam.yearData
        }
    },
    methods:{
        // 获取年份
      getSchoolYears(){
           this.$store.dispatch('exam/getSchoolYears')
        },
      yearDetail(schoolYearId,schoolTermId){
          this.$store.state.exam.schoolYearId = schoolYearId
          this.$store.state.exam.schoolTermId = schoolTermId
          localStorage.setItem("schoolYearId",schoolYearId)
          localStorage.setItem("schoolTermId",schoolTermId)
          this.$router.push('PexamList')
          this.$store.state.exam.type = 1
          localStorage.setItem("type",1)
      }
    }
}
</script>
<style scoped>
.statistics{
    /* padding: 0 0.24rem */
}
.statisticsItem{
    /* line-height: 1.7rem; */
    border-bottom: 1px dashed #C2C2C2;
    overflow: hidden;  
    padding: 0.24rem 0;  
}
.year{
       float: left;
       margin-left: 0.28rem;
    width: 1.74rem;
    height: .74rem;
    border: 1px dashed #0079CB;
    border-radius: 0.08rem;
    font-size: 0.28rem;
    color: #0A8DE5;
    background-color: #F4FFFF;
    text-align: center;
    padding: 0.2rem 0;
}
.yearUp{
  float: left;
    width: 2.04rem;
    height: 0.72rem;
    text-align: center;
    margin-left: 0.32rem;
    font-size: 0.28rem;
    color: #2FAF5F;
    border: 1px solid #2FAF5F;
    border-radius: 0.5rem;
    line-height: 0.72rem;
    margin-top: 0.22rem;
}
.yearUp span{
    float: left;
    margin-left: 0.4rem;
    width: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.yearUp img{
  width: 0.28rem;
    height: 0.28rem;
    float: left;
    margin-left: 0.15rem;
    margin-top: 0.22rem;
}
.yearLow{
  float: left;
    width: 2.04rem;
    height: 0.72rem;
    text-align: center;
    margin-left: 0.32rem;
    font-size: 0.28rem;
    color: #FF8800;
    border: 1px solid #FF8800;
    border-radius: 0.5rem;
    line-height: 0.72rem;
    margin-top: 0.22rem;
}
.yearLow span{
    float: left;
    margin-left: 0.4rem;
    width: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.yearLow img{
  width: 0.28rem;
    height: 0.28rem;
    float: left;
    margin-left: 0.15rem;
    margin-top: 0.22rem;
}
.year p{
        width: 1.5rem;
    margin: 0 auto;
}
</style>