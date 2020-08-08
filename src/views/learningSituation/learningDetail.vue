<template>
    <div style="background-color: #fff;">
        <headNav title="学情报告"></headNav>
        <pageNav :active='0'></pageNav>
        <div class="term">
            当前学期：
            <span>
                {{currentSchoolYear.name}} {{currentTerm.name}}
            </span>
        </div>
        <div class="main">
            <div class="unitBox">
                <div class="unitName" @click="$router.push('index')">
                    <img src="@/assets/img/learningSituation/exam.png" alt="">
                    <span class="theName">
                        {{examData.examName}}
                    </span>
                    <img src="@/assets/img/learningSituation/code.png" alt="">
                </div>
            </div>
            <div class="content" v-if="examData.scoreList">
                <div class="sortBox">
                    <div class="left">
                        <div class="totalScore">
                            <span class="label">
                                总分：
                            </span>
                            <span class="point">
                                {{examData.totalScore}}
                            </span>
                        </div>
                        <div class="otherScore">
                            <p class="oneCurse" :key='index' v-for="(item, index) in examData.scoreList">
                                <span class="label">
                                    {{item.subjectName}}：
                                </span>
                                <span class="point" :class="{'red': item.score/item.subjectMaxScore<0.6}">
                                    {{item.score}}
                                </span> 
                            </p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="sortCycle">
                            <span class="sonPercent">{{examData.classRank}}</span>
                            /
                            <span class="momPercent">{{examData.gradeRank}}</span>
                        </div>
                        <div class="sortName">
                            班级/年级排名
                        </div>
                    </div>
                </div>
                <div class="examMark">
                    {{examData.reportAnalysis}}
                </div>
                <div class="bar-p">
                    <!-- <div class="totalScore">
                        150分
                    </div> -->
                    <bar :data="examBarData"></bar>
                </div>
                <div style="text-align:center">
                    <select class="selectStyle" v-model="subject" @change="getSubject">
                        <option value="0">
                            英语
                        </option>
                        <option value="1">
                            语文
                        </option>
                        <option value="2">
                            数学
                        </option>
                    </select>
                </div>
                <div class="radar-p">
                    <radar :data="subjectBarData"></radar>
                </div>
            </div>
            <div class="noContent" v-if="!examData.scoreList">
                暂无成绩
            </div>
            
        </div>
       
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import pageNav from './headNav'
import bar from '@/components/echarts/bar2'
import radar from '@/components/echarts/radar'
import { LoadMore} from 'vux'
export default {
    name:"examList",
    components: {
        headNav, pageNav, bar, radar
    },
    data() {
        return {
            subject: '0',
            subjectBarData: {
                indicator: [
                    { name: '作文', max: 100},
                    { name: '听力测试', max: 100},
                    { name: '单词解析', max: 100},
                    { name: '阅读理解', max: 100},
                    { name: '语法', max: 100},
                ],
                data: [{value: [98, 68, 98, 68, 77]}]
            },
            data1: {
                indicator: [
                    { name: '作文', max: 100},
                    { name: '听力测试', max: 100},
                    { name: '单词解析', max: 100},
                    { name: '阅读理解', max: 100},
                    { name: '语法', max: 100},
                ],
                data: [{value: [98, 68, 98, 68, 77]}]
            },
             data3: {
                indicator: [
                    { name: '逻辑', max: 100},
                    { name: '计算能力', max: 100},
                    { name: '口算能力', max: 100},
                    { name: '正弦', max: 100},
                    { name: '余弦', max: 100},
                ],
                data: [{value: [99, 55, 66, 22, 33]}]
            },
             data2: {
                indicator: [
                    { name: '作文', max: 100},
                    { name: '文言文', max: 100},
                    { name: '诗词', max: 100},
                    { name: '阅读理解', max: 100},
                    { name: '语法', max: 100},
                ],
                data: [{value: [12, 60, 80, 70, 90]}]
            },
            examData: {
               examName: '第一单元测试',
               classRank: 1,
               gradeRank: 2,
               reportAnalysis: '较上次月考，班级排名下降1名，年级排名上升3名。其中，英语成绩低于班级平均分，需要侧重补强学习。',
               totalScore: 260,
               scoreList: [
                    {
                        "score": 90,
                        "scoreLevel": "",
                        "subjecClassAvgScore": 100,
                        "subjectClassRank": 0,
                        "subjectClassRankLifting": 0,
                        "subjectId": "",
                        "subjectMaxScore": 150,
                        "subjectName": "英语"
                    },
                    {
                        "score": 80,
                        "scoreLevel": "",
                        "subjecClassAvgScore": 90,
                        "subjectClassRank": 0,
                        "subjectClassRankLifting": 0,
                        "subjectId": "",
                        "subjectMaxScore": 150,
                        "subjectName": "语文"
                    },
                    {
                        "score": 90,
                        "scoreLevel": "",
                        "subjecClassAvgScore": 100,
                        "subjectClassRank": 0,
                        "subjectClassRankLifting": 0,
                        "subjectId": "",
                        "subjectMaxScore": 150,
                        "subjectName": "数学"
                    }
               ]
           }
        }
    },
    activated () {
        // this.getStudentExam()
    },
    computed: {
        cookiesObj () {
            return this.$store.state.user.cookiesObj
        },
        examBarData () {
            return this.examData.scoreList
        },
        examId () {
            return this.$store.state.learningSituation.examId
        },
        currentTerm () {
            return this.$store.state.learningSituation.currentTerm
        },
        currentSchoolYear () {
            return this.$store.state.learningSituation.currentSchoolYear
        }
    },
    methods:{
        getSubject () {
            this.subjectBarData = this.subject == 0 ? this.data1 : this.subject == 1 ? this.data2 : this.data3 
        },
        getStudentExam () {
            // var params = {
            //     studentId: this.cookiesObj.studentId,
            //     classId: this.cookiesObj.classId,
            //     schoolId: this.cookiesObj.schoolId,
            //     examId: this.examId
            // }
            var params = {
                studentId: 'studentId1-1',
                classId: 'e782d1ccf8f74a0296408d0af26c4ea3',
                schoolId: 'schoolId1',
                examId: 'examId3'
            }
            this.$store.dispatch('learningSituation/GetStudentExam', params).then(
                res => {
                   // this.examData = res.data
                }
            )
        }
    }
}
</script>
<style lang='less' scoped>
   .term{
        width: 100%;
        height: 0.88rem;
        font-size: 0.26rem;
        line-height: 0.88rem;
        text-align: center;
        margin-top: 0.32rem;
        >span{
            color: #128FEF;
        }
    }
    .main{
        width: 100%;
        .unitBox{
            text-align: center;
            margin: 0.3rem 0;
            padding: 0 0.24rem;
            .unitName{
                display: inline-block;
                border-radius: 0.12rem;
                background: #128FEF;
                padding: 0.2rem 0.8rem;
                font-size: 0.26rem;
                color: #fff;
                box-sizing: border-box;
                .theName{
                    margin: 0 0.02rem;
                    color: #FDFDFD;
                    vertical-align: middle;
                }
                img{
                    width: 0.22rem;
                    height: 0.22rem;
                    vertical-align: middle;
                }
                img:last-child{
                    width: 0.08rem;
                    height: 0.12rem;
                }
            }
        }
        .content{
            padding:0 0.24rem;
            .sortBox{
                overflow: hidden;
                margin-bottom: 0.6rem;
                .label{
                    color: #999999;
                    font-size: 0.24rem;
                }
                .point{
                    color: #000000;
                    font-size: 0.36rem;
                    font-weight: bold;
                }
                .red{
                    color: #ff0000;
                }
                .left{
                    float: left;
                    width: 4rem;
                    .totalScore{
                        margin-bottom: 0.28rem;
                    }
                    .otherScore{
                        .oneCurse{
                            display: inline-block;
                            width: 1.8rem;
                            margin-top: 0.32rem;
                        } 
                    }
                }
                .right{
                    margin-left: 0.6rem;
                    float: left;
                    .sortCycle{
                        width: 1.8rem;
                        height: 1.8rem;
                        background: #F5F5F5;
                        line-height: 1.8rem;
                        text-align: center;
                        border-radius: 50%;
                        .sonPercent{
                            color: #128FEF;
                            font-size: 0.36rem;
                        }
                        .momPercent{
                            font-weight: bold;
                        }
                    }
                    .sortName{
                        text-align: center;
                        margin-top: 0.16rem;
                        color: #999;
                        font-size: 0.24rem;
                    }
                }
            }
            .examMark{
                padding: 0.4rem;
                border-radius: 0.2rem;
                background: #F5F5F5;
                line-height: 0.42rem;
                font-size: 0.26rem;
            }
            .bar-p,.radar-p{
                width: 6.5rem;
                height: 4.5rem;
                margin: 0.6rem auto;
                padding: 0 0.36rem;
                box-sizing: border-box;
                position: relative;
                .totalScore{
                    color: #999;
                    position: absolute;
                    top: 0.5rem
                }
            }
        }
        .noContent{
            text-align: center;
            font-size: 0.36rem;
            color: #999;
        }
        .selectStyle{
            font-size: 0.26rem;
            color: #128FEF;
            border: 0.02rem solid #128fef;
            padding: 0.2rem 1rem;
            border-radius: 0.12rem;
        }
    }

</style>