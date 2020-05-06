<template>
    <div>
        <headNav title="成绩统计"></headNav>
        <div class="title-bg">

             <div class="title-div">
                <div class="exam-name">{{examItem.examName}}</div>
                <div class="exsd">
                    <img class="zhuz" src="@/assets/img/exam/zhuz.png" alt="">
                    <div class="exam-rs">计划考试人数：{{statistisDetail.number}}人</div>
                    <div class="exam-k">{{examItem.subjectName}}</div>
                </div>
            </div>
        </div>
       
        <div class="count-item">
            <div class="count-title">年段统计</div>
            <div class="count-list">
                <div class="count-p">
                    <div class="count-num">{{statistisDetail.maxScore}}</div>
                    <div class="count-text">总分最高分</div>
                </div>
                 <div class="count-p">
                    <div class="count-num">{{statistisDetail.avgScore}}</div>
                    <div class="count-text">总分平均分</div>
                </div>
                 <div class="count-p">
                    <div class="count-num">{{statistisDetail.subjectMaxScore}}</div>
                    <div class="count-text">{{examItem.subjectName}}最高分</div>
                </div>
                 <div class="count-p">
                    <div class="count-num">{{statistisDetail.subjectAvgScore}}</div>
                    <div class="count-text">{{examItem.subjectName}}平均分</div>
                </div>
            </div>
        </div>
         <div class="count-item">
            <div class="count-title">班级统计</div>
            <div class="count-list">
                <div class="count-p">
                    <div class="count-num">{{statistisDetail.classMaxScore}}</div>
                    <div class="count-text">总分最高分</div>
                </div>
                 <div class="count-p">
                    <div class="count-num">{{statistisDetail.classAvgScore}}</div>
                    <div class="count-text">总分平均分</div>
                </div>
                 <div class="count-p">
                    <div class="count-num">{{statistisDetail.classSubjectMax}}</div>
                    <div class="count-text">{{examItem.subjectName}}最高分</div>
                </div>
                 <div class="count-p">
                    <div class="count-num">{{statistisDetail.classSubjectAvg}}</div>
                    <div class="count-text">{{examItem.subjectName}}平均分</div>
                </div>
            </div>
        </div>
        <div class="chart-p">
            <div class="change-p">
                <div @click="choose()" :class="{active:cur==1}">{{examItem.subjectName}}</div>
                <div @click="chooseTotal()" :class="{active:cur==2}">总分</div>
                <div class="bar-p">
                    <bar :data="schoolBarData"></bar>
                </div>
            </div>
            <div v-show="roleCode!='Teacher'" class="personalShow">
                <span class="personnalText">个人表现</span>
                <div class="imgBox" :style="{left:scoreTotal}">
                    <img src="./img/people.png" alt="">
                </div>
            </div>
        </div>
        <div v-if="roleCode=='Teacher'" class="student-t">
            <div class="sp-tile-img" >本班分数明细</div>
            <table style="width:100%">
                <thead>
                    <tr class="tread">
                        <td class="td">座号</td>
                        <td class="td">姓名</td>
                        <td class="td">学科</td>
                        <td class="td ">考试状态</td>
                        <td class="td">分数</td>
                        <td class="td">总分</td>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in numberScoreDetailsTeach" :key="index">
                    <tr v-for="(td,i) in item.list" :key="i*10000000000" class="tr">
                        <td v-if="i===0" :rowspan="item.list.length" class="td">{{item.seatNumber}}</td>
                        <td v-if="i===0" :rowspan="item.list.length" class="td">{{item.studentName}}</td>
                        <td class="td">{{td.subjectName}}</td>

                        <td v-if="td.examStatusCode=='Exam_Normal'" class="td">正常</td>
                        <td v-else-if="td.examStatusCode=='Exam_Miss'" class="td">缺考</td>
                        <td v-else-if="td.examStatusCode=='Exam_Delay'" class="td">缓考</td>
                        <td v-else-if="td.examStatusCode=='Exam_Absent'" class="td">禁考</td>

                        <td class="td">{{td.score}}</td>
                        <td v-if="i===0" :rowspan="item.list.length" class="td">{{item.totalScore}}</td>
                    </tr>
                </tbody>

                <tbody v-for="(item,index) in noNumberScoreDetailsTeach" :key="(index+1)*10000">
                    <tr v-for="(td,i) in item.list" :key="i*10000000000" class="tr">
                        <td v-if="i===0" :rowspan="item.list.length" class="td">{{item.seatNumber}}</td>
                        <td v-if="i===0" :rowspan="item.list.length" class="td">{{item.studentName}}</td>
                        <td class="td">{{td.subjectName}}</td>

                        <td v-if="td.examStatusCode=='Exam_Normal'" class="td">正常</td>
                        <td v-else-if="td.examStatusCode=='Exam_Miss'" class="td">缺考</td>
                        <td v-else-if="td.examStatusCode=='Exam_Delay'" class="td">缓考</td>
                        <td v-else-if="td.examStatusCode=='Exam_Absent'" class="td">禁考</td>

                        <td class="td">{{td.score}}</td>
                        <td v-if="i===0" :rowspan="item.list.length" class="td">{{item.totalScore}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="student-p">
            <div class="studentName" v-if="scoreDetailsParents.length>0">
                <span>{{scoreDetailsParents[0].StudentName}}</span>
                <div class="sp-tile-img" >个人分数明细</div>
                <span>座号{{scoreDetailsParents[0].SeatNumber?scoreDetailsParents[0].SeatNumber:''}}</span>
            </div>
            <div class="tread">
                <div class="td">学科</div>
                <div class="td">考试状态</div>
                <div class="td">分数</div>
            </div>
            <div v-for="(item,index) in scoreDetailsParents" :key="index" class="tr">
               <div class="td">{{item.SubjectName}}</div>
               <div v-if="item.ExamStatusCode=='Exam_Normal'" class="td">正常</div>
               <div v-else-if="item.ExamStatusCode=='Exam_Miss'" class="td">缺考</div>
               <div v-else-if="item.ExamStatusCode=='Exam_Delay'" class="td">缓考</div>
               <div v-else-if="item.ExamStatusCode=='Exam_Absent'" class="td">禁考</div>
               <div class="td">{{item.Score}}</div>
            </div>
            <div class="tr">
               <div class="td">总分</div>
               <div class="td"></div>
               <div class="td">{{scoreDetailsParentsTotal}}</div>
            </div>
        </div>

    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import bar from '@/components/echarts/bar'
export default {
    components: {
        headNav,bar
    },
    data(){
        return {
            examId: '',
            schoolClassId: '',
            subjectId: '',
            studentId: '',
            statistisDetail:'',
            scoreDetailsTeach:[],
            noNumberScoreDetailsTeach:[],
            numberScoreDetailsTeach:[],
            scoreDetailsParents:[],
            cur: 1,
            barData:[],
            schoolBarData:[],
            colorArr:['#F89443','#EDD219','#4FCB5D','#4DA9E3','#7697EC'],
            roleCode:'',
            scoreTotal: 0,
            scoreDetailsParentsTotal:0
        }
    },
    mounted () {
        this.$store.state.exam.type = 2
        localStorage.setItem("type",2)
        this.roleCode = this.$store.getters['user/roleCode']
        this.examId = this.examItem.examId
        this.schoolClassId = this.examItem.classId
        this.subjectId = this.examItem.subjectId
        this.getExamStatistics()
        this.getScoreDistributed()
        if(this.roleCode == 'Teacher'){
            this.getScoreDetailsTeach()
        }else{
            this.studentId = this.$store.getters['user/studentId']
            var params = {
                examId: this.examId,
                schoolClassId: this.schoolClassId,
                subjectId: this.subjectId,
                studentId: this.studentId
            }
            this.getSur(params)
            this.getScoreDetailsParent()
        }
    },
    computed:{
        examItem () {
            return this.$store.state.exam.examItem
        }
    },
    methods:{
        choose () {
            this.cur = 1
            this.schoolBarData=[]
            this.getScoreDistributed()
            var params = {
                examId: this.examId,
                schoolClassId: this.schoolClassId,
                subjectId: this.subjectId,
                studentId: this.studentId
            }
            this.getSur(params)
        },
        chooseTotal () {
            this.cur = 2
            this.schoolBarData=[]
            this.getScoreDistributed()
             var params = {
                examId: this.examId,
                schoolClassId: this.schoolClassId,
               // subjectId: this.subjectId,
                studentId: this.studentId
            }
            this.getSur(params)
        },
        // 成绩统计
        getExamStatistics () {
            var params = {
                examId: this.examId,
                schoolClassId: this.schoolClassId,
                subjectId: this.subjectId,
                choice: this.roleCode == 'Teacher'? 0:1
            }
            this.$store.dispatch('examStatic/getExamStatistics', params).then(
            res => {
                if (res.Code == 200) {
                    this.statistisDetail = res.Data
                    if (this.statistisDetail) {
                        this.statistisDetail.avgScore = this.statistisDetail.avgScore.toFixed(1)
                        this.statistisDetail.subjectAvgScore = this.statistisDetail.subjectAvgScore.toFixed(1)
                        this.statistisDetail.classAvgScore = this.statistisDetail.classAvgScore.toFixed(1)
                        this.statistisDetail.classSubjectAvg = this.statistisDetail.classSubjectAvg.toFixed(1)
                    }
                } 
            })
        },
        // 获取分数段分布
        getScoreDistributed () {
            var params = {
                examId: this.examId,
                schoolClassId: this.schoolClassId,
                subjectId: this.subjectId,
                choice: this.roleCode == 'Teacher'? 0:1
            }
            this.$store.dispatch('examStatic/getScoreDistributed', params).then(
            res => {
                if (res.Code == 200) {
                    if(this.cur == 1){
                        this.barData = res.Data.subjectScore
                    }else{
                        this.barData = res.Data.classScore
                    }
                   for (var i=0;i<this.barData.length;i++){
                       var obj={name:this.barData[i].beginScore+'-'+this.barData[i].endScore,color:this.colorArr[i],value:this.barData[i].number}
                       this.schoolBarData.push(obj)
                   }
                }
                
            })
        }, 
        // 获取个人分数明细 GET /api/ExamMoblie/GetScoreDetailsParent
        getScoreDetailsParent () {
            var params = {
                examId: this.examId,
                studentId: this.studentId
            }
            this.$store.dispatch('examStatic/getScoreDetailsParent', params).then(
            res => {
                if (res.Code == 200) {
                    this.scoreDetailsParents = res.Data.List
                    this.scoreDetailsParentsTotal = res.Data.TotalScore
                }
            })
        },
        // 获取个人排名
        getSur(params){
            this.$store.dispatch('examStatic/getSur', params).then(
            res => {
                if (res.Code == 200) {
                    this.scoreTotal = res.Data+'%'
                }
                
            })
        },
        // 获取班级分数明细 GET /api/ExamMoblie/GetScoreDetailsTeach
        getScoreDetailsTeach () {
            var params = {
                examId: this.examId,
                schoolClassId: this.schoolClassId,
                subjectId: this.subjectId,
            }
            this.$store.dispatch('examStatic/getScoreDetailsTeach', params).then(
            res => {
                if (res.Code == 200) {
                   this.scoreDetailsTeach = res.Data
                   for(var i=0;i<this.scoreDetailsTeach.length;i++){
                       if(this.scoreDetailsTeach[i].seatNumber==null||this.scoreDetailsTeach[i].seatNumber==undefined){
                           this.noNumberScoreDetailsTeach.push(this.scoreDetailsTeach[i])
                       }else{
                           this.numberScoreDetailsTeach.push(this.scoreDetailsTeach[i])
                       }
                    }
                    if(this.noNumberScoreDetailsTeach.length>0){
                        this.compareByABC(this.noNumberScoreDetailsTeach,'studentName')
                    }
                    if(this.numberScoreDetailsTeach.length>0){
                        this.numberScoreDetailsTeach.sort(this.compare('seatNumber'))
                    }
                 
                }
                
            })
        },
        //数组根据对象排序
        compare(val) {
            return function (a, b) {
                var value1 = a[val];
                var value2 = b[val];
                return value1 - value2;
            }
        },
        //根据字母排序
        compareByABC(arr,sortStr) {
            var bySort = function() {
                return function(o, p) {
                    var a = o[sortStr],
                        b = p[sortStr];
                    if (isNaN(a)) {
                        return a.localeCompare(b);
                    } else {
                        if (a === b) {
                            return 0;
                        } else {
                            return a > b ? 1 : -1;
                        }
                    }
                }
            }
            for (var i = 0; i < arr.length; i++) {
                arr.sort(bySort(arr[i][sortStr]));
            }
        }
    }
}
</script>
<style scoped>
.title-bg{background: url(../../assets/img/exam/title-bg.png);background-size: cover;margin: 0 0 1rem 0;height: 1.36rem;position: relative;}
.title-div{background: #fff;width: 6.74rem;height: 1.96rem;position: absolute;transform: translateX(-50%);left: 50%;border-radius: 5px;top: 0.14rem;
box-shadow: 0 0 10px 0 rgba(0,0,0,0.3);box-sizing: border-box;padding: 0.4rem 0.36rem;}
.exam-name{color: #333;font-size: 0.32rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.exsd{position: relative;margin: 0.38rem 0 0 0;}
.zhuz{display: inline-block;vertical-align: middle;width: 0.3rem;height: 0.3rem;}
.exam-rs{display: inline-block;vertical-align: middle;font-size: 0.28rem;color: #666;}
.exam-k{position: absolute;padding: 0 0.16rem;height: 0.48rem;line-height: 0.48rem;text-align: center; border-radius: 0.24rem;
border:1px solid #0A8DE5;color: #0A8DE5;font-size: 0.28rem;position: absolute;top: 0;right: 0;}
.count-item{background: #fff;height: 2.18rem;box-sizing: border-box;padding: 0.32rem 0 0 0;margin: 0 0 0.24rem 0;}
.count-title{color: #333;font-size: 0.32rem;border-left: 0.06rem solid #0A8DE5;padding: 0rem 0.2rem;margin: 0 0 0.3rem 0;}
.count-list{display:flex;justify-content: space-around;}
.count-p{text-align: center;border-right: 1px solid #DFDFDF;width: 1.68rem;}
.count-p:last-child{border: none;}
.count-num{font-size: 0.36rem;color: #FF9900;}
.count-text{font-size: 0.24rem;color: #666666;}
.chart-p{padding: 0.3rem;background: #fff;margin: 0 0 0.2rem 0;text-align: center;}
.change-p{font-size: 0;}
.change-p>div:first-child{
    display: inline-block;vertical-align: middle;width: 1.62rem;height: 0.68rem;line-height: 0.68rem;text-align: center;
    font-size: 0.28rem;color: #666;background: #F6F6F6;
    border-radius: 5px 0 0 5px;border-top:1px solid #CDCDCD;border-left:1px solid #CDCDCD;border-bottom:1px solid #CDCDCD;
}
.change-p>div:nth-child(2){
    display: inline-block;vertical-align: middle;width: 1.62rem;height: 0.68rem;line-height: 0.68rem;text-align: center;
    font-size: 0.28rem;color: #666;background: #F6F6F6;
    border-radius: 0 5px 5px 0;border-top:1px solid #CDCDCD;border-right:1px solid #CDCDCD;border-bottom:1px solid #CDCDCD;
}
.change-p>div:first-child.active{
    background: #0A8DE5;color: #fff;
    border-top: 1px solid #0a8de5;
    border-left: 1px solid #0a8de5;
    border-bottom: 1px solid #0a8de5;
}
.change-p>div:nth-child(2).active{
    background: #0A8DE5;color: #fff;
    border-top: 1px solid #0a8de5;
    border-right: 1px solid #0a8de5;
    border-bottom: 1px solid #0a8de5;
}

/* .cha-btn{display: inline-block;vertical-align: middle;width: 1.62rem;height: 0.68rem;line-height: 0.68rem;text-align: center;
font-size: 0.28rem;color: #666;background: #F6F6F6;}
.cha-btn.active{background: #0A8DE5;color: #fff;}
.one{border-radius: 5px 0 0 5px;border-top:1px solid #CDCDCD;border-left:1px solid #CDCDCD;border-bottom:1px solid #CDCDCD;}
.two{border-radius: 0 5px 5px 0;border-top:1px solid #CDCDCD;border-right:1px solid #CDCDCD;border-bottom:1px solid #CDCDCD;} */
.student-p,.student-t{padding: 0.2rem 0 2rem 0;background: #fff;text-align: center;}
.sp-tile-img{width: 2.98rem;height: 0.83rem;line-height: 0.95rem;background: url(../../assets/img/exam/star.png);background-size: cover;
margin: 0 auto;color: #fff;font-size: 0.25rem;}
.tread{height: 0.88rem;line-height: 0.88rem;background: #f1f9ff}
.tr{height: 0.77rem;line-height: 0.77rem;border-bottom: 1px solid #E9E9E9;}
.td{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-right: 1px solid #E9E9E9;
}
.student-p .td{
   width: 33.33%;
   border-right:none
}
.student-p .tread{
    display: flex;height: 0.88rem;line-height: 0.88rem;background: #F1F9FF;border-top: 1px solid #0A8DE5;
}
.student-p .tr{
    display: flex;height: 0.77rem;line-height: 0.77rem;border-bottom: 1px solid #E9E9E9;
}
.two-ll{line-height: 0.4rem;}
.bar-p{width: 6.5rem;height: 3rem;margin: 0 auto;}

.personalShow{
    margin-top: 1.04rem;
    height: 0.18rem;
    position: relative;
    background: url('./img/bk.png') no-repeat;
    background-size:100% 100% ;
}
.personalShow .imgBox{
    padding: 0 -0.21rem;
    position: absolute;
    top: -0.54rem;
    left: -0.21rem;
    width: 0.42rem;
    height: 0.54rem;
}
.imgBox img{
    position: relative;
    left: -0.21rem;
    width: 100%;
    height: 100%;
}
.personalShow .personnalText{
    position: absolute;
    top: -0.9rem;
    left: 0;
}
.studentName{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 0.6rem;
    margin-top: 0.1rem;
    font-size: 0.3rem;

}
.studentName span{
    width: 1.2rem;
    display: inline-block;
}
</style>