<template>
    <div style="background-color: #fff;">
        <headNav title="学情报告"></headNav>
        <pageNav :active='1'></pageNav>
        <div class="term">
            统计日期：
            <span>
                2020.05.01 - 2020.05.31
            </span>
        </div>
        <div class="main">
            <div class="content" v-if="examData.scoreList">
                <div class="pie-p">
                    <!-- <pie :data="examBarData" :title="98"> </pie> -->
                    <div class="anBox">
                        <annular :percentNum="88" :speed="1"> </annular>
                    </div>
                    <div class="pieTitle">
                        准时到校率
                    </div>
                </div>
                <div class="pie-p">
                    <div class="anBox">
                        <annular :percentNum="98" :speed="1"> </annular>
                    </div>
                    <div class="pieTitle">
                        准时到课率
                    </div>
                </div>
                <div class="comeMark">
                    <span>
                        请假：
                        <span class="count">
                            1
                        </span>
                        次
                    </span>
                    <span>
                        早退：
                        <span class="count">
                            1
                        </span>
                        次
                    </span>
                </div>
                <div class="pie-p">
                    <div class="anBox">
                        <annular :percentNum="97" :speed="1"> </annular>
                    </div>
                    <div class="pieTitle">
                        作业完成率
                    </div>
                </div>
                <div class="pie-p">
                    <div class="anBox">
                        <annular :percentNum="99" :speed="1"> </annular>
                    </div>
                    <div class="pieTitle">
                        作业准确率
                    </div>
                </div>
                <div class="examMark">
                    <p class="teacherP">
                        教师点评：
                    </p>
                    <p class="pText">
                        {{examData.reportAnalysis}}
                    </p>
                    <p class="studentP">
                        学生点评：
                        <span class="pScore">
                            98
                        </span>
                    </p>
                    
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
import bar from '@/components/echarts/bar3'
import pie from '@/components/echarts/pie3' 
import annular from '@/components/annular'
import radar from '@/components/echarts/radar'
import { LoadMore} from 'vux'
export default {
    name:"examList",
    components: {
        headNav, pageNav, bar, radar, pie, annular
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
               reportAnalysis: '该生在校学习认真刻苦，课堂表现活跃，学习积极性很高，能够很好的带动课堂氛围，希望能够继续保持。',
               totalScore: 500,
               scoreList: [
                    {
                        "score": 90,
                        "scoreLevel": "",
                        "subjecClassAvgScore": 99,
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
                        "subjecClassAvgScore": 88,
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
            .examMark{
                margin-top: 0.3rem;
                padding: 0.4rem;
                border-radius: 0.2rem;
                background: #F5F5F5;
                line-height: 0.42rem;
                font-size: 0.26rem;
                .teacherP{
                    margin-bottom: 0.1rem;
                }
                .pText{
                    text-indent: 2em;
                }
                .studentP{
                    text-align: right;
                    .pScore{
                        color: #FF0000;
                        font-size: 0.6rem;
                    }
                }
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
            .pie-p{
                display: inline-block;
                width: 49.4%;
                // height: 2.5rem;
                padding: 0 0.36rem;
                box-sizing: border-box;
                .pieTitle{
                    text-align: center;
                    font-size: 0.24rem;
                }
                .anBox{
                    width: 1.41rem;
                    height: 1.41rem;
                    margin: 0.3rem auto;
                }
            }
            .comeMark{
                color: #999;
                padding: 0.4rem 1rem;
                border-radius: 0.2rem;
                background: #F5F5F5;
                line-height: 0.42rem;
                font-size: 0.26rem;
                margin-top: 0.3rem;
                display: flex;
                justify-content: space-between;
                .count{
                    font-weight: bold;
                    font-size: 0.36rem;
                    color: #000;
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