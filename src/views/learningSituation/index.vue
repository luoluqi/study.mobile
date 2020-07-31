<template>
    <div style="background-color: #fff;">
        <headNav title="学情报告"></headNav>
        <div class="term">
            当前学期：
            <span>
                {{currentSchoolYear.name}} {{currentTerm.name}}
            </span>
        </div>
        <div class="main">
            <div class="left">
                <div v-for="(item, index) in examTypeList" :key="index" @click="chooseType(item)" class="unit" :class="{'active': item.examTypeId == unitIndex}">
                    {{item.examTypeName}}
                </div>
            </div>
            <div class="right" v-if="examList.length > 0">
                <div class="oneTitle" v-for="(item, index) in notReadList" :key='item.examId' @click="goDetail(item, false, index)">
                    <span class="isRead">
                        未读
                    </span>
                    <span class="title" :class="{'active': item.examId == examIndex}">
                        {{item.examName}}
                    </span>
                </div>
                <div class="oneTitle" v-for="(item, index) in readList" :key='item.examId' @click="goDetail(item, true, index)">
                    <span class="hadRead">
                        已读
                    </span>
                    <span class="title" :class="{'active': item.examId == examIndex}">
                        {{item.examName}}
                    </span>
                </div>
            </div>
            <div v-if="examList.length == 0" class="noExam">
                暂无试卷
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore} from 'vux'
export default {
    name:"examList",
    components: {
        headNav, infiniteScroll,
    },
    data() {
        return {
           unitIndex: '',
           examIndex: '',
           examTypeList: [],
           examList: [],
           allExamList: [],
           notReadList: [],
           readList: []
        }
    },
    mounted () {
        //this.getExamTypeListOnApp()
        this.getSchoolYearList().then(
            () => {
                this.getSchoolTermList().then(
                    () => {
                        this.getScoreReadSet()
                        this.getExamTypeListOnApp()
                    }
                )
            }
        )
    },
    computed: {
        cookiesObj () {
           return this.$store.state.user.cookiesObj
        },
        examTypeId () {
            return this.$store.state.learningSituation.examTypeId
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
        // 获取学年列表
        getSchoolYearList () {
            return new Promise((resolve, reject) => {
                var params = {
                    schoolId: this.cookiesObj.schoolId
                }
                this.$store.dispatch('learningSituation/GetSchoolYearList', params).then(
                    res => {
                        if (res.data) {
                            res.data.forEach(
                                item => {
                                    if (item.isCurrent) {
                                        this.$store.commit('learningSituation/setCurrentSchoolYear', item)
                                        resolve()
                                    }
                                }
                            )
                        }
                        
                    }
                )
            })
        },
        // 获取学期列表
        getSchoolTermList () {
            return new Promise(
                (resolve, reject) => {
                    var params = {
                        schoolId: this.cookiesObj.schoolId,
                        schoolYearId: this.currentSchoolYear.id
                    }  
                    this.$store.dispatch('learningSituation/GetSchoolTermList', params).then(
                        res => {
                            if (res.data) {
                                res.data.forEach(
                                    item => {
                                        if (item.isCurrent) {
                                            this.$store.commit('learningSituation/setCurrentTerm', item)
                                            resolve()
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            )
        },
        // 选择考试类型
        chooseType (item) {
            this.examIndex = ''
            this.unitIndex = item.examTypeId
            this.$store.commit('learningSituation/setExamTypeId', item.examTypeId)
            this.getExamListOnApp()
        },
        // 跳转考试详情
        goDetail (item, flag, index) {
            this.examIndex = item.examId
            this.$store.commit('learningSituation/setExamId', item.examId)
            if (!flag) {
                this.readStudentScore().then(
                    () => {
                        this.notReadList.splice(index, 1)
                        this.readList.unshift(item)
                    }
                )
            }
            this.$router.push('learningDetail')
        },
        // 获取考试类型列表
        getExamTypeListOnApp () {
            var params = {
                schoolId: this.cookiesObj.schoolId,
                termId: this.currentTerm.id
            }
            this.$store.dispatch('learningSituation/GetExamTypeListOnApp', params).then(
                res => {
                    if (res.data) {
                        this.examTypeList = res.data
                        debugger
                    }
                }
            )
        },
        // 获取考试列表
        getExamListOnApp () {
            var params = {
                examTypeId: this.examTypeId,
                schoolId: this.cookiesObj.schoolId,
                termId: this.currentTerm.id
            }
            this.$store.dispatch('learningSituation/GetExamListOnApp', params).then(
                res => {
                    if (res.data) {
                        this.readList = []
                        this.notReadList = []
                        this.examList = res.data
                        res.data.forEach(
                            item => {
                                var flag = false
                                this.allExamList.forEach(
                                    item2 => {
                                        if (item.examId == item2.examId) {
                                            flag = true
                                        }
                                    }
                                )
                                if (flag) {
                                    this.readList.push(item)
                                } else {
                                    this.notReadList.push(item)
                                }
                            }
                        )
                    }
                }
            )
        },
        // 获取已读列表
        getScoreReadSet () {
            var params = {
                studentId: this.cookiesObj.studentId,
                parentId: this.cookiesObj.parentId
            }
            this.$store.dispatch('learningSituation/GetScoreReadSet', params).then(
                res => {
                    if (res.data) {
                        this.allExamList = res.data
                    }
                }
            )
        },
        //设置已读
        readStudentScore () {
            return new Promise(
                (resolve, reject) => {
                    var params = {
                        examId: this.examId,
                        studentId: this.cookiesObj.studentId,
                        parentId: this.cookiesObj.parentId
                    }
                    this.$store.dispatch('learningSituation/ReadStudentScore', params).then(
                        res => {
                           resolve(res)
                        }
                    )
                }
            )
        } 
      
    }
}
</script>
<style lang='less' scoped>
    .term{
        position: fixed;
        top: 0.88rem;
        left: 0;
        background: #fff;
        width: 100%;
        height: 0.88rem;
        font-size: 0.26rem;
        line-height: 0.88rem;
        text-align: center;
        box-shadow:0px 2px 6px 0px rgba(13,45,62,0.1);
        >span{
            color: #128FEF;
        }
    }
    .main{
        margin-top: 0.9rem;
        height: calc(100% - 1.78rem);
        .left{
            height: 100%;
            width: 2.59rem;
            border-right: 0.01rem solid #E6E6E6;
            float: left;
            .unit{
                height: 0.87rem;
                line-height: 0.87rem;
                border-bottom: 0.01rem solid #E6E6E6;
                text-align: center;
                font-size: 0.26rem;
                color: #999999;
            }
            .active{
                border-left: 0.1rem solid #128FEF;
                color: #000000;
            }
        }
        .right{
            background: #FAFAFA;
            float: left;
            height: 100%;
            width: 4.6rem;
            .oneTitle{
                padding: 0.3rem 0.2rem;
                border-bottom: 0.01rem solid #E6E6E6;
                .isRead{
                    display: inline-block;
                    background: #FF8A00;
                    color: #fff;
                    font-weight: bold;
                    font-size: 0.22rem;
                    padding: 0 0.04rem;
                    vertical-align: top;
                    margin-right: 0.2rem;
                    border-radius: 0.04rem;
                }
                .hadRead{
                    display: inline-block;
                    background: #CCCCCC;
                    color: #fff;
                    font-weight: bold;
                    font-size: 0.22rem;
                    padding: 0 0.04rem;
                    vertical-align: top;
                    margin-right: 0.2rem;
                    border-radius: 0.04rem;
                }
                .title{
                    display: inline-block;
                    width: 3.2rem;
                    color: #999999;
                    font-size: 0.26rem;
                }
                .active{
                    color: #000;
                }
            }
        }
        .noExam{
            padding-top: 0.36rem;
            text-align: center;
            font-size: 0.36rem;
            color: #999;
        }
    }
</style>