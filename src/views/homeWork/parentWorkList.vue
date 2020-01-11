<template>
    <div id="pWorkList">
        <headNav title="作业"></headNav>
    <div class="s_tab">
        <div class="s_tt" style="display: block;">
            <div class="xingqi">
                <div @click="getWorkList(weekNumber-1)" class="shang" ><img src="@/assets/img/homeWork/zuo.png" /> 上一周</div>
                <!-- <div class="publish" @click="goPublish">发布作业</div> -->
                <div @click="getWorkList(weekNumber+1)" v-if="weekNumber != 0" class="xia" > 下一周<img src="@/assets/img/homeWork/you.png" /></div>
            </div>
            <div class="workList">
                <ul >
                    <li v-for="(item,index) in weekHomeWork" :key="index" @click="goWorkList(item)">
                        <div class="weektime">
                            <p>{{item.dayName}}</p>
                            <h2>{{item.day}}</h2>
                        </div>
                        <ul  class="objList" v-if="item.subjectName.length<6">
                            {{item.color}}
                            <li v-for="(sub,index) in item.subjectName" :key="index" :class="[colorList[index % colorList.length]]">{{sub}}</li>
                        </ul>
                        <ul  class="objList xiaoobjList" v-if="item.subjectName.length>5">
                             {{item.color}}
                            <li v-for="(sub,index) in item.subjectName" :key="index" :class="[colorList[index % colorList.length]]">{{sub}}</li>
                        </ul>
                        <div class="weidu" v-if="item.isRead == 0">
                            <img src="@/assets/img/homeWork/weidu.png" />
                        </div>
                        <img class="weekimg" src="@/assets/img/homeWork/a-arrow.png" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <bottomNav></bottomNav>
    <!--<div class="s_more2" id="more" v-on:click="ListMore">
        <span>查看更多</span>
    </div>-->
</div>
</template>
<script>
import {GetHomeWorkByParent} from '@/api/homeWorkApi'  
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
export default {
     components:{
       headNav,
       bottomNav
    },
    data() {
        return {
            weekNumber:0,
            weekHomeWork:'',
            colorList:['obj1','obj2','obj3','obj4','obj5']
        }
    },
    mounted(){
        if(this.$store.state.user.week != undefined){
             this.getWorkList(this.$store.state.user.week)
        }else{
            this.getWorkList(this.weekNumber)
        }
        
    },
    methods:{
    //   获取家庭作业
       getWorkList(weekNumber){
           this.weekNumber = weekNumber
           var prams = {
                parentId:this.$store.getters['user/parentId'],
                schoolId:this.$store.getters['user/schoolId'],
                gradeId:this.$store.getters['user/gradeId'],
                classId:this.$store.getters['user/classId'],
                week:weekNumber
            }
            GetHomeWorkByParent(prams).then((data) =>{
               var data = JSON.parse(data)
               if(data.Code == 200){
                   
                   this.weekHomeWork = data.Data
                  console.log(this.weekHomeWork)
               }
              
            })
       },
       //作业详情
       goWorkList(item){
           if(item.homeworkList.length==0){
                this.$vux.toast.text('暂无家庭作业', 'top')
                 return
           }
           this.$router.push('parentWork')
           this.$store.state.user.workItem = item.homeworkList
           this.$store.state.user.week = this.weekNumber
       },
       //发布作业
       goPublish(){
           this.$router.push('publish')
       }
    }
}
</script>
<style scoped src="@/assets/css/homeWork.css"></style>
