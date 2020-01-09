<template>
    <div id="WorkList">
    <div class="s_tab">
        <div class="s_tt" style="display: block;">
            <div class="xingqi">
                <div @click="preWeek" class="shang" ><img src="@/assets/img/homeWork/zuo.png" /> 上一周</div>
                <div class="publish" >发布作业</div>
                <div @click="nextWeek" class="xia" > 下一周<img src="@/assets/img/homeWork/you.png" /></div>
            </div>
            <div class="workList">
                <ul >
                    <li>
                        <div class="weektime">
                            <p>星期三</p>
                            <h2>2019-11-11</h2>
                        </div>
                        <!--<ul class="objList xiaoobjList">-->
                        <!-- <ul class="objList objList">
                            <li >语</li>
                            <li >语</li>
                            <li >语</li>
                            <li >语</li>
                        </ul> -->
                        <ul  class="objList">
                            <li class="obj1">数</li>
                            <li class="obj2">数</li>
                            <li class="obj3">数</li>
                            <li class="obj4">数</li>
                            <li class="obj5">数</li>
                        </ul>
                        <div class="weidu">
                            <img src="@/assets/img/homeWork/weidu.png" />
                        </div>
                        <img class="weekimg" src="@/assets/img/homeWork/a-arrow.png" />
                    </li>
                    <li>
                        <div class="weektime">
                            <p>星期三</p>
                            <h2>2019-11-11</h2>
                        </div>
                        <!--<ul class="objList xiaoobjList">-->
                        <!-- <ul class="objList objList">
                            <li >语</li>
                            <li >语</li>
                            <li >语</li>
                            <li >语</li>
                        </ul> -->
                        <ul  class="objList xiaoobjList">
                            <li class="obj1">数</li>
                            <li class="obj2">数</li>
                            <li class="obj3">数</li>
                            <li class="obj4">数</li>
                            <li class="obj5">数</li>
                            <li class="obj3">数</li>
                            <li class="obj4">数</li>
                            <li class="obj5">数</li>
                        </ul>
                        <div class="weidu">
                            <img src="@/assets/img/homeWork/weidu.png" />
                        </div>
                        <img class="weekimg" src="@/assets/img/homeWork/a-arrow.png" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
  
    <!--<div class="s_more2" id="more" v-on:click="ListMore">
        <span>查看更多</span>
    </div>-->
</div>
</template>
<script>
import {GetHomeWorks} from '@/api/homeWorkApi'  
export default {
    data() {
        return {
            day:'',
            dateList:[]
        }
    },
    mounted(){
        this.getThisWeek()
        this.getWorkList()
    },
    methods:{
    //   获取家庭作业
       getWorkList(){
           var prams = {
                teachId:this.$store.getters['user/teacherId'],
                schoolId:this.$store.getters['user/schoolId'],
                gradeId:this.$store.getters['user/gradeId'],
                classId:this.$store.getters['user/classId'],
                beginTime: this.formatDate(this.dateList[0]),
                endTime:this.formatDate(this.dateList[6]),
                pageIndex:1,
                pageSize:10
            }
            debugger
            GetHomeWorks(prams).then((data) =>{
               var data = JSON.parse(data)
               if(data.Code == 200){
                   debugger

               }
            })
       },
       //这周的时间数据
       getThisWeek(){
           var now = new Date()
           var day = now.getDay()
           
           var monday = now.getTime() - (1000 * 60 * 60 * 24) * (day - 1)
           var list = []
           for(var i = 0;i<7;i++){
                var time = monday + i * (1000 * 60 * 60 * 24)
                var d = new Date(time)
                list.push(d)
           }

           this.dateList = list
       },
       //上周的时间数据
       preWeek(){
           var monday = this.dateList[0].getTime() -  (1000 * 60 * 60 * 24) * 7
           var list = []
           for(var i = 0;i<7;i++){
                var time = monday + i * (1000 * 60 * 60 * 24)
                var d = new Date(time)
                list.push(d)
           }
           this.dateList = list
           this.getWorkList()
       },
       //下周的时间数据
       nextWeek(){
            var monday = this.dateList[0].getTime() + (1000 * 60 * 60 * 24) * 7
           var list = []
           for(var i = 0;i<7;i++){
                var time = monday + i * (1000 * 60 * 60 * 24)
                var d = new Date(time)
                list.push(d)
           }
           this.dateList = list
           this.getWorkList()
       },
    //    时间格式化
       formatDate(d){
           var year = d.getFullYear()
           var month = d.getMonth() + 1
           var date = d.getDate()
           if(month < 10){
               month = '0' + month
           }
            if(date < 10){
               date = '0' + date
           }
           return year+'-'+month+'-'+date
       }
         
    }
}
</script>
<style scoped src="@/assets/css/homeWork.css"></style>
