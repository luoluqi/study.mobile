<template>
    <div id="WorkList">
        <headNav title="作业"></headNav>
    <div class="s_tab">
        <div class="s_tt" style="display: block;">
            <div class="xingqi">
                <div style="width: 1.5rem; float: left;" v-if="!check">
                    <div @click="getWorkList(weekNumber-1)" class="shang" ><img src="@/assets/img/homeWork/zuo.png" /></div>
                    <div @click="getWorkList(weekNumber+1)" v-if="weekNumber != 0" class="xia" ><img src="@/assets/img/homeWork/you.png" /></div>
                </div>
                <div style="width: 1.5rem; float: left;" v-if="check">
                    <div @click="getHomeWorkByTeachNew(pageIndex+1)" v-if="xiaShow"  class="shang" ><img src="@/assets/img/homeWork/zuo.png" /></div>
                    <div @click="getHomeWorkByTeachNew(pageIndex-1)"  class="xia" v-if="pageIndex != 1" ><img src="@/assets/img/homeWork/you.png" /></div>
                </div>
                <div class="publish" @click="goPublish">发布作业</div>
                <div class="checkHave" @click="getHomeWorkByTeachNew(1)">
                    <check-icon :value.sync="check" > 有作业 </check-icon>
                </div>
            </div>
            <div class="workList">
                <ul >
                      <!-- v-if ="item.homeworkList.length!=0" -->
                    <li v-for="(item,index) in weekHomeWork"  :key="index" @click="goWorkList(item)">
                        <div class="weektime">
                            <p>{{item.dayName}}</p>
                            <h2>{{item.day}}</h2>
                        </div>
                        <ul  class="objList" v-if="item.subjectName.length<6">
                            <li v-for="(sub,index) in item.subjectName" :key="index" :class="[colorList[index % colorList.length]]">{{sub}}</li>
                        </ul>
                        <ul  class="objList xiaoobjList" v-if="item.subjectName.length>5">
                            <li v-for="(sub,index) in item.subjectName" :key="index" :class="[colorList[index % colorList.length]]">{{sub}}</li>
                        </ul>
                        <!-- <div class="weidu">
                            <img src="@/assets/img/homeWork/weidu.png" />
                        </div> -->
                        <img class="weekimg" src="@/assets/img/homeWork/a-arrow.png" />
                    </li>
                </ul>
            </div>
            <div class="none" v-if="!xiaShow">没有更多了</div>
        </div>
    </div>
    <!-- <bottomNav></bottomNav> -->
    <!--<div class="s_more2" id="more" v-on:click="ListMore">
        <span>查看更多</span>
    </div>-->
</div>
</template>
<script>
import {GetHomeWorkByTeach,GetHomeWorkByTeachNew} from '@/api/homeWorkApi'  
import headNav from '@/components/headNav/headNav';
import bottomNav from '@/components/bottomNav/bottomNav';
import { CheckIcon } from 'vux'
export default {
    name:'ThomeWork',
     components:{
       headNav,
       bottomNav,
       CheckIcon
    },
    data() {
        return {
            check: false,
            weekNumber:0,
            weekHomeWork:'',
            colorList:['obj1','obj2','obj3','obj4','obj5'],
             pageIndex:1,
           pageSize:7,
           xiaShow:true
        }
    },
    activated(){
        this.$store.dispatch('user/getUserInfo').then(() => {})
        if(this.$store.state.user.type == 2){
            if(!this.check){
               if(this.$store.state.user.week != undefined){
                    this.getWorkList(this.$store.state.user.week)
                }else{
                    this.getWorkList(this.weekNumber)
                }
            }else{
                this.getHomeWorkByTeachNew(this.pageIndex)
            }
        }else{
            this.getWorkList(0)
            this.check = false
        }
        
             
    },
    methods:{
    //   获取家庭作业
       getWorkList(weekNumber){
           this.weekNumber = weekNumber
           var prams = {
                teachId:this.$store.getters['user/teacherId'],
                schoolId:this.$store.getters['user/schoolId'],
                gradeId:this.$store.getters['user/gradeId'],
                classId:this.$store.getters['user/classId'],
                week:weekNumber
            }
            GetHomeWorkByTeach(prams).then((data) =>{
               var data = JSON.parse(data)
               if(data.Code == 200){
                   this.weekHomeWork = data.Data
                  console.log(this.weekHomeWork)
               }
              
            })
       },
       //   获取有家庭作业的
       getHomeWorkByTeachNew(pageIndex){
           this.pageIndex = pageIndex
           this.xiaShow = true
           if(!this.check){
               this.getWorkList(0)
              return
           }
           var prams = {
                teachId:this.$store.getters['user/teacherId'],
                schoolId:this.$store.getters['user/schoolId'],
                gradeId:this.$store.getters['user/gradeId'],
                classId:this.$store.getters['user/classId'],
                 pageIndex:pageIndex,
                pageSize:this.pageSize
            }
            GetHomeWorkByTeachNew(prams).then((data) =>{
               var data = JSON.parse(data)
               if(data.Code == 200){
                   this.weekHomeWork = data.Data.List
                   if(data.Data.List){
                        if(this.weekHomeWork.length < this.pageSize){
                                this.xiaShow = false
                        }
                        console.log(this.weekHomeWork)
                   }else{
                       this.xiaShow = false
                   }
               }
              
            })
       },
       //作业详情
       goWorkList(item){
           if(item.homeworkList.length==0){
                this.$vux.toast.text('暂无家庭作业', 'top')
                 return
           }
           this.$router.push('work')
           this.$store.state.user.workItem = item.homeworkList
           this.$store.state.user.week = this.weekNumber
        //    this.$store.state.user.pageIndex = this.pageIndex
        //    this.$store.state.user.check = this.check
       },
       //发布作业
       goPublish(){
           this.$router.push('publish')
       }
    }
}
</script>
<style scoped src="@/assets/css/homeWork.css"></style>
<style scoped>
.checkHave{
    float: right;
    font-size: 0.28rem;
    height: 0.64rem;
    line-height: 0.64rem;
    color: #333;
}
</style>
