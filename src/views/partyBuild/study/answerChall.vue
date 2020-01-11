<template>
    <div class="container">
        <div id="head" style="">
            <div class="head-space"></div>
            <div class="nvagter">
                <img class="arrow_index" @click="backHis(1)" src="@/assets/img/partyBuild/arrow-ji.png" />
                <span>挑战答题</span>
                <img class="index" @click="backHis(2)" src="@/assets/img/partyBuild/shou.png" />
            </div>
        </div>
        <div class="an-theme">{{challengeList.subjectModel.subjectTitle}}</div>
        <div class="option-item" :class="activeClass == index ? 'active':''" v-for="(item,index) in challengeList.subjectOptionGetList" @click="addActive(index,item.id,item.subjectId)" :key='index'>
            <div class="check-box"><div class="check-box-div"></div></div>
            <div class="option-text">{{item.optionContent}}</div>
        </div>
        <div class="comfirm-p">
            <div class="comfirm-btn" @click="confirmNext">下一题</div>
        </div>
        
        <!-- <div class="answer-p">
            <div class="answer-top">
                <img class="light-img" src="@/assets/img/partyBuild/light.png" alt="">
                <div class="answer-th">题目解析</div> 
                <div class="right-answer">
                    <div class="right-answer-text">【答案】</div>
                    <div class="right-answer-letter">B</div>
                </div>
            </div>
            <div class="answer-content">
                沙发斯蒂芬撒地方撒地方撒地方撒发撒地方撒地方撒旦法撒旦法撒旦法撒地方撒发的撒旦法sad撒的发生的发
            </div>
        </div> -->


        <div class="an-over-space"></div>
        <div @click="toOver" class="an-over">结束</div>
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
            startTimelesss:'',
            title:'',
            type:'',
            activeClass: -1,
            useTime: '',
            subjectId: '',
            answerArr: [],
            letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            itemAnswerId: '' // 回答的 选项 id
        }
    },
    methods:{
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
        toOver(){
            this.submitAnswer()
        },
        // 获取挑战答题数据
        getChallengeQustion(){
            this.$store.dispatch('answer/createChallenge')
        },
        // 下一题
        confirmNext () {
            if (this.activeClass == -1) {
               this.$vux.toast.text('请选择您的答案')
               return
            }
            this.getItemAnswer()
            this.activeClass = -1
        },
        // 添加样式
        addActive (index,answerId,subjectId) {
            // if(this.$store.state.answer.dayListItem.isComfirm) {
            //     return
            // }
            this.activeClass = index
            this.subjectId = subjectId
            this.itemAnswerId = answerId
            var answerObj = {}
            answerObj.subjectId = subjectId
            answerObj.answerOptionId = answerId
            this.answerArr.push(answerObj)
        },
        // 获取当前这一题的答案
        getItemAnswer () {
            GetSubjectAnswer({subjectId: this.subjectId}).then((data) => {
                if (this.itemAnswerId == data.subjectAnswer) {
                    this.getChallengeQustion()
                } else {
                    this.submitAnswer()
                }
            })
        },
        // 计时
        time_fun () {
            this.startTimelesss= (new Date()).getTime();
        },
        // 计算时间差
        timeless () {
            return (((new Date()).getTime() - this.startTimelesss) / 1000).toFixed(0)
        },
        //提交答案
        submitAnswer () {
            this.useTime = this.timeless()
            var params = {
                answerDetailList: this.answerArr,
                useTime: this.useTime,
                schoolId: this.$store.state.user.schoolId,
                teacherId: this.$store.state.user.teacherId,
                teacherName: this.$store.state.user.realName,
                answerType: 3
            }
            SubmitAnswer(params).then((data) => {
                if(data.Code == 200){
                    this.$vux.toast.text(data.Msg)
                    this.$store.state.answer.submitData = data.Data
                    if (!this.$store.state.answer.submitData) {
                        let createTime = this.formatDate(new Date())
                        let data = {'optionCount': 0, 'rightCount': 0, 'createTime': createTime, 'useTime': this.timeless()}
                        this.$store.state.answer.submitData = data
                        localStorage.setItem('submitData',JSON.stringify(data))
                        this.$store.state.answer.submitData.useTime = this.timeless()
                        localStorage.setItem('submitData',JSON.stringify(this.$store.state.answer.submitData))
                        this.$router.replace('answerChallOver')
                    } else {
                        localStorage.setItem('submitData',JSON.stringify(data.Data))
                        this.$router.replace('answerChallOver')
                    }
                }
            })
        },
        //日期
        formatDate (date) {  
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d; 
            return y + '-'+ m + '-' + d + 'T'
        }
    },
    mounted () {
        this.$store.state.answer.submitData = ''
        this.getChallengeQustion()
        this.time_fun()
    },
    computed: {
        challengeList () {
            this.itemAnswerId =''
            return this.$store.state.answer.challengeList
        }
    }
}
</script>
<style scoped>
.container{background: #fff;}
.an-top{padding: 0.32rem;border-bottom: 1px solid #dddddd;position: relative;}
.an-title{border-left: 4px solid #0a8de5;padding: 0 0 0 0.1rem;line-height: 0.24rem;}
.an-count{color: #10578d;position: absolute;top: 0.22rem;right: 0.32rem;}
.an-rem{display: inline-block;color: #222222;font-size: 0.5rem;}
.an-theme{padding: 0.32rem;font-size: 0.28rem;word-break: break-all;}
.option-item{width: 6.16rem;padding: 0.25rem 0.2rem;margin: 0.3rem auto 0 auto;background: #fff;color: #555;
 border: #e0e0e1 1px solid;border-radius: 0.1rem;}
.option-item.active{background: #eef6fb;color: #0a8de5;border: 1px solid #aed7f2;}
.check-box{display: inline-block;vertical-align: middle;width: 0.3rem;position: relative;;background: #fff;height: 0.3rem;text-align: center;border: #7a7a7a 1px solid;border-radius: 50%;}
.check-box-div{width: 0.16rem;height: 0.16rem;background: #444444;border-radius: 50%;
position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);display: none;}
.active .check-box-div{display: block;}
.option-text{display: inline-block;vertical-align: middle;margin: 0 0 0 0.22rem;}
.comfirm-btn{display: inline-block;background: #0a8de5;text-align: center;color: #fff;border-radius: 0.1rem;width: 2.8rem;height: 0.8rem;line-height: 0.8rem;}
.comfirm-p{text-align: center;margin: 0.3rem 0 0 0;}
.answer-p{padding: 0.32rem;border-top: 1px solid #dddddd;margin: 0.26rem 0 0 0;}
.answer-top{position: relative;}
.light-img{width: 0.24rem;height: 0.32rem;display: inline-block;vertical-align: middle;}
.answer-th{color: #10578d;display: inline-block;vertical-align: middle;}
.right-answer{position: absolute;right: 0;top: 0;}
.right-answer-text{display: inline-block;vertical-align: middle;color: #14be58;}
.right-answer-letter{display: inline-block;vertical-align: middle;color: #333333;}
.answer-content{word-break: break-all;padding: 0.3rem 0;}
.an-over-space{height: 2rem;}
.an-over{position: fixed;bottom: 0;width: 100%; height: 0.86rem;line-height: 0.86rem;text-align: center;background: #eeeeee;color: #f70000;}
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