<template>
    <div class="container">
        <headNav title='挑战答题'></headNav>
        <tab :index='2'></tab>
        <div class="ch-p">
            <img class="warning-img" src="@/assets/img/partyBuild/warning.png" alt="">
            <div class="ch-text">挑战答题，答错即结束</div>
        </div>
        <div class="ch-btn-p">
            <div @click="toAnswer" class="ch-btn">开始</div>
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
        toAnswer(){
            this.$router.push('answerChall')
        }
    }
}
</script>
<style scoped>
.container{background: #fff;}
.ch-p{padding: 0.5rem;text-align: center;}
.warning-img{display: inline-block;vertical-align: middle;width: 0.36rem;height: 0.36rem;}
.ch-text{display: inline-block;vertical-align: middle;color: #666666;margin: 0 0 0 0.2rem;}
.ch-btn{display: inline-block;background: #0a8de5;text-align: center;color: #fff;border-radius: 0.1rem;width: 2.8rem;height: 0.8rem;line-height: 0.8rem;}
.ch-btn-p{text-align: center;}
</style>