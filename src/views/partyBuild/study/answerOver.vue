<template>
    <div class="container">
        <headNav title='答题统计'></headNav>
         <tab :index='2'></tab>
        <div class="date-p">{{submitData.createTime | formatDateTime('YYYY-MM-DD')}}</div>
        <div class="count-item">
            <img style="width:0.26rem;height:0.28rem;" class="middle" src="@/assets/img/partyBuild/ans-count.png" alt="">
            <div class="count-name">本次答题：</div>
            <proccess :percent='submitData.optionCount/submitData.optionCount'></proccess>
            <div class="count-num">{{submitData.optionCount}}/{{submitData.optionCount}}</div>
        </div>
        <div class="count-item">
            <img class="count-img" src="@/assets/img/partyBuild/wrong.png" alt="">
            <div class="count-name">错题：</div>
             <proccess :percent='(submitData.optionCount - submitData.rightCount)/submitData.optionCount'></proccess>
            <div class="count-num">{{submitData.optionCount - submitData.rightCount}}/{{submitData.optionCount}}</div>
        </div>
        <div class="count-item">
            <img class="count-img" src="@/assets/img/partyBuild/right.png" alt="">
            <div class="count-name">正确率：</div>
            <proccess :percent='submitData.rightCount / submitData.optionCount'></proccess>
            <div class="count-num">{{(submitData.rightCount / submitData.optionCount)*100}}%</div>
        </div>
        <div class="count-item">
            <img class="count-img" src="@/assets/img/partyBuild/ans-time.png" alt="">
            <div class="count-name">用时：</div>
            <div class="count-time">{{useTime}}</div>
        </div>
    </div>
</template>
<script>
import  headNav from '@/components/headNav/headNav'
import tab from '../tab'
import proccess from '../process'
export default {
    components:{
        headNav,tab,proccess
    },
    data() {
        return {
           submitData:'' ,
           useTime:''
        }
    },
    mounted(){
        this.submitData = this.$store.state.answer.submitData
        if(!this.$store.state.answer.submitData){
             this.submitData = JSON.parse(localStorage.getItem("submitData")) 
        }
        // console.log(this.submitData)
        var time = this.submitData.useTime
        var min = Math.floor(time%3600)
        var h = Math.floor(time/3600) >= 10 ? Math.floor(time/3600) : "0" + Math.floor(time/3600)
        var m
        if (time >= 3600) {
            m = (Math.floor(time / 60)) % 60 >= 10 ? (Math.floor(time / 60)) % 60 : '0' + (Math.floor(time / 60)) % 60
        } else {
            m = Math.floor(time / 60) >= 10 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
        }
        var s = time%60 >= 10 ? time%60 : "0" + time%60
        this.useTime = h + ":" + m + ":"+ s 
    }
}
</script>
<style scoped>
.container{background: #fff;}
.date-p{padding: 0.32rem;border-bottom: 1px solid #dddddd;color: #666666;}
.count-item{padding: 0.32rem;border-bottom: 1px solid #dddddd;}
.count-img{display: inline-block;vertical-align: middle;width: 0.28rem;height: 0.28rem;}
.count-name{display: inline-block;vertical-align: middle;width: 1.4rem;padding: 0 0 0 0.16rem;}

.count-num{display: inline-block;vertical-align: middle;padding: 0 0 0 0.25rem;color: #666666;}
.middle{display: inline-block;vertical-align: middle;}
.count-time{color: #ff9900;display: inline-block;vertical-align: middle;}
</style>