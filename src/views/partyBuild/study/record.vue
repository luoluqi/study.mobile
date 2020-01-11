<template>
    <div>
         <headNav title='学习强国'></headNav>
        <tab :index='2'></tab>
        <div v-for="(item,index) in statisticsList" :key="index" >
            <div v-if="item.answerType ==1" class="record-item">
                <div class="record-title">每日答题</div>
                <div class="record-count">
                    <div class="count-item">
                        <div class="light-num">{{item.partakeCount}}</div>次
                        <div class="count-name">参与次数</div>
                        <div class="count-line"></div>
                    </div>
                    <div class="count-item">
                        <div class="light-num">{{item.rate}}</div>%
                        <div  class="count-name">正确率</div>
                        <div class="count-line"></div>
                    </div>
                    <div class="count-item">
                        <div class="light-num">{{item.useTime}}s</div>
                        <div  class="count-name">最短用时</div>
                    </div>
                </div>
            </div>
            <div v-if="item.answerType == 2" class="record-item">
                <div class="record-title">每周答题</div>
                <div class="record-count">
                    <div class="count-item">
                        <div class="light-num">{{item.partakeCount}}</div>次
                        <div class="count-name">参与次数</div>
                        <div class="count-line"></div>
                    </div>
                    <div class="count-item">
                        <div class="light-num">{{item.rate}}</div>%
                        <div  class="count-name">正确率</div>
                        <div class="count-line"></div>
                    </div>
                    <div class="count-item">
                        <div class="light-num">{{item.useTime}}s</div>
                        <div  class="count-name">最短用时</div>
                    </div>
                </div>
            </div>
            <div v-if="item.answerType == 3" class="record-item">
                <div class="record-title">挑战答题</div>
                <div class="record-count">
                    <div class="count-item">
                        <div class="light-num">{{item.partakeCount}}</div>次
                        <div class="count-name">参与次数</div>
                        <div class="count-line"></div>
                    </div>
                    <div class="count-item">
                        <div class="light-num">{{item.totalCount}}</div>题
                        <div  class="count-name">总答题数</div>
                        <div class="count-line"></div>
                    </div>
                    <div class="count-item">
                        <div class="light-num">{{item.correntCount}}</div>题
                        <div  class="count-name">答对记录</div>
                    </div>
                </div>
            </div>
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
            this.$router.push('answer')
        },
        toChallenge(){
            this.$router.push('challenge')
        },
        // 获取统计
        getStatisticsList () {
            this.$store.dispatch('answer/statisticsList')
        }
    },
    computed: {
        statisticsList () {
            return this.$store.state.answer.statisticsList
        }
    },
    mounted () {
        this.getStatisticsList();
    }
}
</script>
<style scoped>
.record-item{padding: 0.2rem 0 0.5rem 0;background: #fff;width: 6.56rem;margin: 0.3rem auto 0 auto;border-radius: 0.2rem;}
.record-title{width: 1.36rem;height: 0.48rem;line-height: 0.48rem;background: #e0f4ff;color: #0a8de5;text-align: center;border-radius: 0 0.2rem 0.2rem 0;}
.record-count{display: flex;justify-content: space-around;margin: 0.24rem 0 0 0;}
.count-item{color: #888888;position: relative;width: 2.28rem;text-align: center;}
.light-num{font-size: 0.4rem;color: #ff9900;display: inline-block;}
.count-name{margin: 0.1rem 0 0 0;}
.count-line{height: 0.7rem;position: absolute;right: 0;top: 50%;transform: translateY(-50%);border-left: 1px solid #d7d7d7;}
</style>