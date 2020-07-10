<template>
    <div>
        <headNav title='学习强国'></headNav>
        <tab :index='2'></tab>
        <div @click="toDayAnswer" class="menu-item">
            <img class="clock-img middle" src="@/assets/img/partyBuild/clock.png" alt="">
            <div class="menu-name">每日答题</div>
            <img class="you-img" src="@/assets/img/you.png" alt="">
        </div>
        <div @click="toWeekAnswer" class="menu-item">
            <img class="week-img middle" src="@/assets/img/partyBuild/week.png" alt="">
            <div class="menu-name">每周答题</div>
            <img  class="you-img" src="@/assets/img/you.png" alt="">
        </div>
        <div @click="toChallenge" class="menu-item">
            <img class="cup-img middle" src="@/assets/img/partyBuild/cup.png" alt="">
            <div class="menu-name">挑战答题</div>
            <img  class="you-img" src="@/assets/img/you.png" alt="">
        </div>
        <div @click="toRecord" class="menu-item">
            <img class="record-img middle" src="@/assets/img/partyBuild/record.png" alt="">
            <div class="menu-name">学习记录</div>
            <img  class="you-img" src="@/assets/img/you.png" alt="">
        </div>
    </div>
</template>
<script>
import  headNav from '@/components/headNav/headNav'
import tab from '../tab'

export default {
    components:{
        headNav,tab
    },
    methods:{
        toDayAnswer(){
          this.$store.dispatch('answer/getDayQustion')
        },
        toWeekAnswer(){
           this.$store.dispatch('answer/getWeekQustion')
        },
        toChallenge(){
            this.$router.push('challenge')
        },
        toRecord(){
            this.$router.push('record')
        }
    }
}
</script>
<style scoped>
.clock-img{width: 0.44rem;height: 0.44rem;}
.week-img{width: 0.44rem;height: 0.42rem;}
.cup-img{width: 0.44rem;height: 0.38rem;}
.record-img{width: 0.44rem;height: 0.42rem;}
.you-img{width: 0.12rem;height: 0.24rem;position: absolute;right: 0.5rem;top: 50%;transform: translateY(-50%);}
.menu-item{width:6.18rem;height: 1.17rem;line-height: 1.17rem;background: #fff;border-radius: 0.2rem;
position: relative;margin: 0.5rem auto 0 auto;border: 1px solid #d8d8d8;box-sizing: border-box;padding: 0 0.5rem;}
.menu-name{display: inline-block;vertical-align: middle;padding: 0 0 0 0.36rem;}
.middle{display: inline-block;vertical-align: middle;}
</style>