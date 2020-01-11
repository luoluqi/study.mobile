<template>
    <div>
        <div v-show="show" class="sign-mask">
            <div class="sign-p">
                <img class="sign-img" src="@/assets/img/partyBuild/sign-img.png" alt="">
                <div class="sign-div">
                    <div v-if="signResult.signState" class="sign-one">
                        <img class="sign-suc middle" src="@/assets/img/partyBuild/sign-suc.png" alt="">
                        <span class="middle">签到成功</span>
                    </div>
                    <div v-else class="sign-one">
                        <img class="sign-suc middle" src="@/assets/img/partyBuild/warning.png" alt="">
                        <span class="middle">今日已签到</span>
                    </div>
                    <div class="sign-two">已累计签到<div class="blue-num">{{signResult.HistorySignCount}}</div>日</div>
                    <div @click="comfrim" class="sign-com">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['signResult'],
    computed:{
        show(){
            return this.$store.state.partyBuild.showSign
        }
    },
    methods:{
        comfrim(){
            this.$store.commit('partyBuild/closeSign')
        }
    },
    mounted () {
        
    }
}
</script>
<style scoped>
.middle{display: inline-block;vertical-align:middle;}
.sign-mask{position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0,0,0,0.6);z-index: 100;}
.sign-p{position: absolute;left: 50%;top: 50%;transform: translate(-50%,-60%);width: 5.42rem;}
.sign-img{display: block;width: 5.42rem;height: 2.82rem;}
.sign-div{background: #fff;text-align: center;padding: 1px;border-radius: 0 0 0.2rem 0.2rem;}
.sign-one{padding: 0.6rem 0 0 0;}
.sign-two{padding: 0.3rem 0 0 0;}
.sign-suc{width: 0.42rem;height: 0.42rem;font-size: 0.4rem;}
.blue-num{display: inline-block;color: #0a8de5;}
.sign-com{width: 4rem;height: 0.8rem;line-height: 0.8rem; margin: 0.64rem auto;background: #0a8de5;text-align: center;color: #fff;border-radius: 0.5rem;}
</style>