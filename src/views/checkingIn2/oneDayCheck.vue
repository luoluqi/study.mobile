<template>
    <div class="main">
        <headNav title="考勤查询"></headNav>
        <div class="dateTime">
            {{toDay}} {{toDay | getDay}}
        </div>
        <div class="studentList">
            
            <div @click="lookDetail(item.studentId)" v-for="(item,index) in studentData" :key="index" v-if="item.attenceStatus == 5 && item.studentName" class="student truancy">
                {{item.studentName}}
            </div>
            <div @click="lookDetail(item.studentId)" v-for="(item,index) in studentData" :key="index" v-if="item.attenceStatus == 6 && item.studentName" class="student leave">
                {{item.studentName}}
            </div>
             <div @click="lookDetail(item.studentId)" v-for="(item,index) in studentData" :key="index" v-if="item.attenceStatus == 0 && item.studentName" class="student normal">
                {{item.studentName}}
            </div>
            
            <!-- <div @click="lookDetail(item.studentId)" v-for="(item,index) in studentData" :key="index" v-if="item.attenceStatus == 5 && !item.studentName" class="student truancy">
                未命名
            </div> -->
        </div>
        <div v-show="modelShow" class="model">
            <div class="box">
                <div class="top" v-if="studentType[0]">
                    <span>{{studentType[0].studentName}}</span>
                    <span class="date">{{toDay}} {{toDay | getDay}}</span>
                </div>
                <div class="bot">
                    <div class="b-left">
                        <!-- <img src="@/assets/img/checking/leftNav.png" alt=""> -->
                    </div>
                    <div class="b-right" v-if="studentType">
                        <!-- 上午上学 上午放学  下午上学 下午放学-->
                        <div v-for="(item,index) in studentType" :key="index" class="forItem">
                            <p class="goSchool">
                                <span v-if="item.attenceType == 0">上午上学{{gradeTime.mTimeBegin}}</span>
                                <span v-if="item.attenceType == 1">上午放学{{gradeTime.mTimeEnd}}</span>
                                <span v-if="item.attenceType == 2">下午上学{{gradeTime.aTimeBegin}}</span>
                                <span v-if="item.attenceType == 3">下午放学{{gradeTime.aTimeEnd}}</span>
                                 <!-- <select v-if="item.time" class="state" v-model="state[index]" @change="setChekin(state[index],item.id)" :class="state[index] == 0 ? 'normal' : 'truancy'">
                                    <option  :value=0>正常</option>
                                    <option  :value=5>异常</option>
                                </select> -->
                                <span v-if="!item.time">--</span>
                            </p>
                            <p class="goTime">
                                 <span v-if="(item.attenceType == 0 || item.attenceType == 2) && item.time">
                                    {{item.attenceDateTime| formatDateTime('HH:mm')}}进校
                                </span>
                                 <span v-if="(item.attenceType == 1 || item.attenceType == 3) && item.time">
                                    {{item.attenceDateTime| formatDateTime('HH:mm')}}离校
                                </span>
                                <span class="leaveTime" v-if="item.updater && item.time" >
                                    {{item.updater}}修改于{{item.updateDateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
                                </span>
                            </p>
                        </div>
                        <!-- <div class="line"></div> -->
                    </div>
                </div>
                <div class="deleteBox">
                    <img @click="delModel" src="@/assets/img/checking/delete.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
    components: {
        headNav
    },
    data () {
        return {
            state:['state1','state2','state3','state4'],
            modelShow: false,
            toDay:'',
            studentData:[],
            studentType:[],
            gradeTime:''
        }
    },
    mounted(){
        this.toDay = this.$store.state.checkingIn2.toDay
        if(!this.$store.state.checkingIn2.toDay){
            this.toDay = localStorage.getItem("yueDate")
        }
        console.log(this.toDay,'today')
        this.studentList()
    },
    methods: {
        // 弹出遮罩
        lookDetail (studentId) {
            debugger
            this.modelShow = true
            var stuId = studentId
            this.studentId = studentId
            this.studentRecords(stuId)
        },
        // 关闭遮罩
        delModel () {
            this.modelShow = false
        },
        // 获取学生列表
        studentList(){
             var prams = {
                SchoolId:this.$store.getters['user/schoolId'],
                ClassId:this.$store.getters['user/classId'] ,
                // SchoolId: 'bb34a395d8df4b3a9f9a22592a0e0ae2',
                // ClassId: '3f117d9b33c74ab3b47ffba246bc48f0',
                GradeId: this.$store.getters['user/gradeId'],
                SearchTime:this.toDay
                }
            this.$store.dispatch('checkingIn2/StudentList',prams).then((data) => {
                this.studentData = data
            })
        },
        // 获取单个学生单天的考勤状态
        studentRecords(stuId){
             var prams = {
                SchoolId:this.$store.getters['user/schoolId'],
                GradeId:this.$store.getters['user/gradeId'],
                StudentId:stuId,
                Sorting:'attenceType',
                SearchTime:this.toDay
                }
            this.$store.dispatch('checkingIn2/Records',prams).then((data) => {
                  // 当前时间时间戳
                  var newTime=new Date().getTime()
                   var mTimeBeginTimeC = new Date(data.gradeTime.mTimeBeginTime).getTime()
                   var mTimeEndTimeC = new Date(data.gradeTime.mTimeEndTime).getTime()
                   var aTimeBeginTimeC = new Date(data.gradeTime.aTimeBeginTime).getTime()
                   var aTimeEndTimeC = new Date(data.gradeTime.aTimeEndTime).getTime()
                 this.studentType = data.schoolAttenceRecordList
                this.gradeTime = data.gradeTime
                 var timeArr = [mTimeBeginTimeC,mTimeEndTimeC,aTimeBeginTimeC,aTimeEndTimeC]
                for(var i = 0;i<this.studentType.length;i++){
                     this.state[i] = this.studentType[i].attenceStatus
                     if(newTime < timeArr[i]){
                         this.studentType[i].time = false
                     }else{
                         this.studentType[i].time = true
                     }
                }
                console.log(this.studentType)
                // this.state[0] = data.schoolAttenceRecordList[0].attenceStatus
                // this.state[1] = data.schoolAttenceRecordList[1].attenceStatus
                // this.state[2] = data.schoolAttenceRecordList[2].attenceStatus
                // this.state[3] = data.schoolAttenceRecordList[3].attenceStatus
            })
        },
        // 修改考勤状态
        setChekin(type,id){
             var prams = {
                teacherId:this.$store.getters['user/teacherId'],
                teacherName:this.$store.getters['user/realName'],
                recordId:id,
                attenceType:type,
                id:0
                }
            this.$store.dispatch('checkingIn2/Corrent',prams).then((data) => {
                 this.$vux.toast.text('修改成功', 'top')
                 this.studentList()
                 this.studentRecords(this.studentId)
                //  this.$store.state.checkingIn2.corrent = 1
            })
        }
    }
}
</script>
<style  scoped>
    select{
        border: none;
    }
    .main{
        background: #fff;
    }
    .dateTime{
        padding: 0.28rem 0.24rem;
        color: #333;
        font-size: 0.3rem;
    }
    .studentList{
        padding: 0 0.14rem;
        overflow: hidden;
    }
    .student{
        text-align: center;
        /* padding: 0.16rem 0; */
        width: 2.1rem;
        border-radius: 0.08rem;
        float: left;
        font-size: 0.28rem;
        margin: 0 0.1rem 0.2rem 0.1rem;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
        height: 0.64rem;
        line-height: 0.64rem;
    }
    .normal{
        background: #f4f4f4;
        color: #666;
    }
    .leave{
        background: #FFF5DF;
        color: #ff9900;
    }
    .truancy{
        background: #FFEBEB;
        color: #FF321D;
    }
    .model{
        position: fixed;
        top:0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        align-items: center;
        padding: 0 0.32rem;
        box-sizing: border-box;
    }
    .box{
        width: 100%;
        border-radius: 0.1rem;
    }
    .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 0.92rem;
        line-height: 0.92rem;
        background:#128fef;
        color: #fff;
        font-size: 0.36rem;
        padding: 0 0.32rem;
        box-sizing: border-box;
    }
    .top .date{
        font-size: 0.28rem;
    }
    .bot{
        background: #fff;
        padding: 0.4rem 0.3rem;
        display: flex;
        padding-top: 0;
    }
    .b-left{
        display: inline-block;
        width: 0.18rem;
        height: 5.36rem;
        background: url("../../assets/img/checking/leftNav.png") no-repeat center;
        background-size: 0.18rem 5.36rem;
        margin-top: 0.5rem;
        margin-right: 0.14rem;
    }
    .b-left img{
        width: 100%;
        height: 100%;
    }
    .b-right{
        width: 100%;
        display: inline-block;
        margin-top: 0.3rem;
        position: relative;
    }
    .b-right>.forItem{
        margin-bottom: 0.84rem;
        position: relative;
        height: 0.9rem;
    }.b-right>.forItem:last-child{
        margin-bottom: 0;
    }
    .goSchool{
        color: #999;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .goSchool>span:last-child{
        display: flex;
        align-items: center;
    }
    .goSchool .state{
        font-size: 0.28rem;
        padding: 0.04rem;
        -webkit-appearance:none;
        -moz-appearance:none;
        appearance:none;
        background: url("../../assets/img/homeWork/arrow-shi.png") no-repeat scroll right center transparent;
        padding-right: 0.30rem;
    }
    .goSchool .normal{
       color: #128FEF;
       /* background: #E3F3FF; */
    }
    .goSchool .leave{
        color: #FF9900;
        /* background: #FFF2DF; */
    }
    .goSchool .truancy{
        color: #FF2F2F;
        /* background: #FFEAEA; */
    }
    .down{
        display: inline-block;
        background: #f4f4f4;
        width: 0.48rem;
        height: 0.48rem;
        line-height: 0.48rem;
        text-align: center;
    }
    .down img{
        width: 0.22rem;
        height: 0.12rem;
    }
    .goTime{
        color: #333;
        font-size: 0.32rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* margin-left: 0.36rem; */
    }
    .leaveTime{
        color: #999;
        font-size: 0.24rem;
    }
    .deleteBox{
        margin-top: 0.4rem;
        text-align: center;
    }
    .deleteBox img{
        width: 0.64rem;
        height: 0.64rem;
    }
    .dian{
   width: 0.15rem;
   height: 0.15rem;
   background: #d2d2d2;
   border-radius: 0.15rem;
   display: inline-block;
   margin-right: 0.15rem;
}
.line{
   width: 1px;
    height: 5.1rem;
    background: #d2d2d2;
    position: absolute;
    top: 0.34rem;
    left: 0.07rem;
}
</style>