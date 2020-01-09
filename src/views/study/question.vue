
<template>
  <div id="allquestionTypes">
       <headNav title="题目列表"></headNav>
      <div class="no-data" v-if="data.list.length == 0 ">
          <img class="no-data-img" src="@/assets/img/n_date.png" alt="">
      </div>
      <div class="obj_ss" v-if="data.list.length > 0">
       <p class="obj_total">当前题量：{{pageNum}}/{{data.total}}</p>
       <div class="ti_box">
       <div class="xueli">
            <span>学历：小学 </span>
            <span>年级：{{$store.state.user.gradeName}} </span>
            <span>科目：{{$store.state.study.subjectName}}</span>
        </div>
      <single-choice v-show="question.questionChannelType == 1"></single-choice>
      <mul-choice v-show="question.questionChannelType == 2"></mul-choice>
      <judge v-show="question.questionChannelType == 3"></judge>

       <div class="btnXia">
                <!-- <span @click="prev" v-show="pageNum > 1" class="shangxia">上一题</span> -->
                <span @click="comfirm" class="queren">确认</span>
                <span @click="next" v-show="pageNum < total" class="shangxia">下一题</span>
            </div>
            <!--解析-->
            <div v-show="isShowAnswer" class="analysis">
                <ul>
                    <li>
                        <span class="correct">【正确答案】</span>
                        <p>{{question.answer}}</p>
                    </li>
                    <li>
                        <span class="kaodian">【考点】</span>
                        <p><img :src="$store.state.imgSrc + question.knowledge" alt=""></p>
                    </li>
                    <li>
                        <span class="jiexi">【解析】</span>
                        <p><img :src="$store.state.imgSrc + question.explanation" alt=""></p>
                    </li>
                    <li>
                        <span class="zhishi" style="line-height: 0.57rem;">【知识点】</span>
                        <p class="zhiList">
                            <span v-for="(item,index) in question.pointNames" :key="index">{{item}}</span>
                            
                        </p>
                    </li>
                    <li>
                        <span class="zhishi">【试题来源】</span>
                        <p>{{question.questionSource}}</p>
                    </li>
                </ul>
            </div>

        </div>
      </div>

</div>
</template>
<script>

import {getQuestionByType,getQuestionByChapter,getQuestionByDifficult,getQuestionByRandom,getQuestionByWrong} from "@/api/studyApi"
import singleChoice from "./singleChoice"
import mulChoice from "./mulChoice"
import judge from "./judge"
import headNav from '@/components/headNav/headNav'
export default {
    components:{
        singleChoice,
        mulChoice,
        judge,
        headNav
    },
    data(){
        return {
            pageNum:0,
            pageSize:1,
            total:0,

            data:{
                list:[{}]
            },
            question:{
                pointNames:[]
            },
            isShowAnswer:false
        }
    },

    methods:{
        getQuestionList(){

            
           
            
            switch(this.$store.state.study.type){
                case "queType":
                    //根据题型查询题目
                    getQuestionByType({
                        subjectId : this.$store.state.study.subjectId,
                        questionChannelTypes:this.$store.state.study.questionChannelTypes.toString(),
                        gradeId:this.$store.state.user.gradeId,
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }).then((data) => {
                        console.log(data);
                        this.data = data.data;
                        this.question = data.data.list[0];
                        this.total = data.data.total;
                        this.$store.state.study.question = this.question;


                        
                    });
                    break;
                case "chapter":
                     //根据章节查询题目
                    getQuestionByChapter({
                        subjectId:this.$store.state.study.subjectId,
                        chapterId:this.$store.state.study.chapterId,
                        gradeId:this.$store.state.user.gradeId,
                        questionChannelTypes:"1,2,3",
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }).then((data) => {
                         console.log(data);
                        this.data = data.data;
                        this.question = data.data.list[0];
                        this.total = data.data.total;
                        this.$store.state.study.question = this.question;

                        
                    });
                    break;
                case "know":
                     //根据知识点查询题目
                    getQuestionByWrong({
                         subjectId: this.$store.state.study.subjectId,
                        gradeId:this.$store.state.user.gradeId,
                        studentId:this.$store.state.user.studentId,
                        questionChannelTypes:"1,2,3",
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }).then((data) => {
                         this.data = data.data;
                        this.question = data.data.list[0];
                        this.total = data.data.total;
                        this.$store.state.study.question = this.question;

                         
                    });
                    break;
                case "diffuct":
                     //根据困难查询题目
                    getQuestionByDifficult({
                        subjectId:this.$store.state.study.subjectId,
                        gradeId:this.$store.state.user.gradeId,
                        questionChannelTypes:"1,2,3",
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }).then((data) => {
                         this.data = data.data;
                        this.question = data.data.list[0];
                        this.total = data.data.total;
                        this.$store.state.study.question = this.question;

                        
                    });
                    break;
                case "random":
                     //根据随机查询题目
                    getQuestionByRandom({
                         subjectId:this.$store.state.study.subjectId,
                        gradeId:this.$store.state.user.gradeId,
                        questionChannelTypes:"1,2,3",
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    }).then((data) => {
                         this.data = data.data;
                        this.question = data.data.list[0];
                        this.total = data.data.total;
                        this.$store.state.study.question = this.question;

                        
                    });
                    break;
            }
        },

        prev(){
            this.$store.state.study.answer = [];
            this.isShowAnswer = false;
            this.pageNum --;
            this.getQuestionList();
        },

        next(){
             this.$store.state.study.answer = [];
             this.isShowAnswer = false;
            this.pageNum ++;
            this.getQuestionList();
        },

        comfirm(){
             this.isShowAnswer = true;

             console.log(this.$store.state.study.answer);
        }
    },

    mounted(){
        //   subjectId:0,
        // type:"",
        // questionChannelTypes:[]
        var subjectId = this.$store.state.study.subjectId;
        var type = this.$store.state.study.type;
        var questionChannelTypes = this.$store.state.study.questionChannelTypes;
        console.log(subjectId,type,questionChannelTypes);

        this.next();
    }
}
</script>



<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>
.no-data{text-align: center;
padding: 0.2rem 0;
font-size: 0.28rem;
}
</style>
