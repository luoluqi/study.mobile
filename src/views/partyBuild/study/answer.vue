<template>
    <div class="container">
        <!-- <headNav :title='title'></headNav> -->
        {{dayListIndex}}
        <div id="head" style="">
            <div class="head-space"></div>
            <div class="nvagter">
                <img class="arrow_index" @click="backHis(1)" src="@/assets/img/partyBuild/arrow-ji.png" />
                <span>{{title}}</span>
                <img class="index" @click="backHis(2)" src="@/assets/img/partyBuild/shou.png" />
            </div>
        </div>
        <div class="an-top">
            <div class="an-title">单选题</div>
            <div class="an-count">
                <div class="an-rem">{{dayListIndex + 1}}</div>/{{dayList.length}}
            </div>
        </div>
        <div class="an-theme">{{dayListItem.subjectModel.subjectTitle}}</div>
        <div class="option-item" :class="activeClass == index ? 'active':''" v-for="(item,index) in dayListItem.subjectOptionGetList" @click="addActive(index,item.id,item.subjectId)" :key="index">
            <div class="check-box"><div class="check-box-div"></div></div>
            <div class="option-text">{{item.optionContent}}</div> 
        </div>
        <div class="comfirm-p">
            <!-- 每日下一题 -->
            <div class="comfirm-btn" v-if="dayListIndex + 1 < 5 && type == 'day'" @click="confirmNext">下一题</div>
            <!-- 每周下一题 -->
            <div class="comfirm-btn" v-if="dayListIndex + 1 < 10 && type == 'week'" @click="confirmNext">下一题</div>
            <div class="comfirm-btn"  @click="getItemAnswer">查看答案</div>
            <!-- 每日提交 -->
            <div class="comfirm-btn" v-if="dayListIndex + 1 > 4 && type == 'day'" @click="confirm(1)">确定提交</div>
            <!-- 每周提交 -->
            <div class="comfirm-btn" v-if="dayListIndex + 1 > 9 && type == 'week'" @click="confirm(2)">确定提交</div>
        </div>
        <div class="answer-p" v-if="itemAnswerId">
            <div class="answer-top">
                <img class="light-img" src="@/assets/img/partyBuild/light.png" alt="">
                <div class="answer-th">题目解析</div> 
                <div class="right-answer">
                    <div class="right-answer-text">【正确答案】</div>
                    <div class="right-answer-letter">{{letterList[option]}}</div>
                </div>
            </div>
            <div class="answer-content">
                {{subjectRemark}}
            </div>
        </div>
    </div>
</template>
<script>
import  headNav from '@/components/headNav/headNav'
import {SubmitAnswer,GetSubjectAnswer} from '@/api/answerApi'
export default {
    components:{
        headNav
    },
    data() {
        return {
            title:'',
            type:'',
            activeClass: -1,
            userTime: '',
            subjectId: '',
            answerId:'',
            answerArr: [],
            letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            itemAnswerId: '',
            subjectRemark: '',
            option:'',
            timeStart:'',
            answerObj:{}
        }
    },
    computed: {
        dayList(){
            return this.$store.state.answer.dayList
        },
        dayListIndex(){
            return this.$store.state.answer.dayListIndex
        },
        dayListItem(){
             return this.$store.state.answer.dayListItem
        }
    },
    mounted () {
        // alert(this.$route.query.type)
        // this.$store.commit('answer/clear')
        this.type = this.$route.query.type
        if(this.type == 'day'){
            this.title = '每日答题'
            // this.getDayQustion()
            this.time_fun()
        }
        if(this.type == 'week'){
            this.title = '每周答题'
            // this.getWeekQustion()
            this.time_fun()
        }
    },
    destroyed(){
        console.log('destroyed....')
    },
    methods: {
        // 阻止返回
        backHis(type){
             this.$vux.confirm.show({
                title: '提示',
                content: '答题未完成，记录不做保存，是否退出？',
                onConfirm : () => {
                    if(type == 1){
                         this.$router.go(-1)
                         return
                    }
                     if(type == 2){
                         location.href="http://mappv2.xueerqin.net/home/#/index";
                         return
                    }
                },
                onCancel () {
                    console.log('plugin cancel')
                }
            })
        },
        //    获取每日答题数据
        // getDayQustion(){
        //    this.$store.dispatch('answer/getDayQustion')
        // },
        // 获取每周答题数据
        // getWeekQustion(){
        //     this.$store.dispatch('answer/getWeekQustion')
        // },
        // 添加样式
        addActive (index,answerId,subjectId) {
            if(this.$store.state.answer.dayListItem.isComfirm) {
                return
            }
          this.activeClass = index
          this.subjectId = subjectId
          this.answerId = answerId
        },
        // 获取当前这一题的答案
        getItemAnswer () {
            if (this.activeClass == -1) {
               this.$vux.toast.text('请选择您的答案')
               return
            }
            this.$store.state.answer.dayListItem.isComfirm = true
            GetSubjectAnswer({subjectId:this.subjectId}).then((data) => {
                this.itemAnswerId = data.subjectAnswer
                this.subjectRemark = data.subjectRemark
                for(var i = 0 ; i<this.dayListItem.subjectOptionGetList.length;i++){
                   if(this.dayListItem.subjectOptionGetList[i].id == this.itemAnswerId){
                      this.option = i
                   }
                }
            })
        },
        // 下一题
        confirmNext () {
            if (this.activeClass == -1) {
               this.$vux.toast.text('请选择您的答案')
               return
            }
            this.answerObj = {}
           this.answerObj.subjectId = this.subjectId
           this.answerObj.answerOptionId = this.answerId
           this.answerArr.push(this.answerObj)
           this.$store.commit('answer/nextQuestion')
           this.activeClass = -1
           this.itemAnswerId =''
           this.subjectRemark =''
        },
        // 计时
         time_fun () {
            this.timeStart = Date.parse(new Date()) / 1000
        },
        // 确定
        confirm (answerType) {
            if (this.activeClass == -1) {
               this.$vux.toast.text('请选择您的答案')
               return
            }
             this.answerObj = {}
           this.answerObj.subjectId = this.subjectId
           this.answerObj.answerOptionId = this.answerId
           this.answerArr.push(this.answerObj)
            var timeEnd = Date.parse(new Date()) / 1000
            var time = timeEnd - this.timeStart
            var params = {
               answerDetailList: this.answerArr,
               useTime: time,
               schoolId: this.$store.state.user.schoolId,
               teacherId: this.$store.state.user.teacherId,
               teacherName: this.$store.state.user.realName,
               answerType: answerType
            }
           SubmitAnswer(params).then((data) => {
               if(data.Code == 200){
                   this.$vux.toast.text(data.Msg)
                   this.$router.replace('answerOver')
                   this.$store.state.answer.submitData = data.Data
                   this.$store.commit('answer/clear')
               }
           })
        }
    }
}
</script>
<style scoped>
.container{background: #fff;}
.an-top{padding: 0.32rem;border-bottom: 1px solid #dddddd;position: relative;}
.an-title{border-left: 4px solid #0a8de5;padding: 0 0 0 0.1rem;}
.an-count{color: #999;position: absolute;top: 0.12rem;right: 0.32rem;}
.an-rem{display: inline-block;color: #222222;font-size: 0.5rem;}
.an-theme{padding: 0.32rem;font-size: 0.28rem;word-break: break-all;white-space: pre-wrap;}
.option-item{width: 6.16rem;padding: 0.25rem 0.2rem;margin: 0.3rem auto 0 auto;background: #fff;color: #555;
 border: #e0e0e1 1px solid;border-radius: 0.1rem;}
.option-item.active{background: #eef6fb;color: #0a8de5;border: 1px solid #aed7f2;}
.check-box{display: inline-block;vertical-align: middle;width: 0.3rem;position: relative;;background: #fff;height: 0.3rem;text-align: center;border: #7a7a7a 1px solid;border-radius: 50%;}
.check-box-div{width: 0.16rem;height: 0.16rem;background: #444444;border-radius: 50%;
position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);display: none;}
.active .check-box-div{display: block;}
.option-text{display: inline-block;vertical-align: middle;margin: 0 0 0 0.22rem;white-space: pre-wrap;}
.comfirm-btn{display: inline-block;background: #0a8de5;text-align: center;color: #fff;border-radius: 0.1rem;width: 2.8rem;height: 0.8rem;line-height: 0.8rem;}
.comfirm-p{text-align: center;margin: 0.3rem 0 0 0;}
.answer-p{padding: 0.32rem;border-top: 1px solid #dddddd;margin: 0.26rem 0 0 0;}
.answer-top{position: relative;}
.light-img{width: 0.24rem;height: 0.32rem;display: inline-block;vertical-align: middle;}
.answer-th{color: #10578d;display: inline-block;vertical-align: middle;}
.right-answer{position: absolute;right: 0;top: 0;}
.right-answer-text{display: inline-block;vertical-align: middle;color: #14be58;}
.right-answer-letter{display: inline-block;vertical-align: middle;color: #333333;}
.answer-content{word-break: break-all;padding: 0.3rem 0;white-space: pre-wrap;}
.nvagter {
	height: 0.88rem;
	line-height: 0.88rem;
	background-color: #0a8de5;
	font-size: 0.32rem;
	padding: 0 0.24rem;
	text-align: center;
	color: #fff;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	z-index: 100;
}
.head-space{
	height: 0.88rem;
}
.arrow_index {
	float: left;
	width: 0.16rem;
	height: 0.32rem;
	margin-top: 0.26rem;
}

.index {
	float: right;
	width: 0.34rem;
	height: 0.34rem;
	margin-top: 0.26rem;
}
</style>