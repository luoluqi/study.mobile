<template>
    <div>
        <headNav :title='curFristTab.typeName'></headNav>
      
        <div class="news-con">
            <infiniteScroll  @loadMore="loadMore">
                <tab :index='1'></tab>
                <div class="count-p">
                    <div class="count-title">
                        <div class="count-desc">学习记录</div> 
                    </div>
                    <div class="count-list">
                        <div class="count-item">
                            <div>
                                <div class="count-num">{{LearnCount}}</div>篇
                            </div>
                            <div class="count-text">已学习内容</div>
                            <div class="count-line"></div>
                        </div>
                        <div class="count-item">
                            <div>
                                <div class="count-num">{{UpdateNewsLearnTime}}</div>分钟
                            </div>
                            <div  class="count-text">总学习时长</div>
                            <div class="count-line"></div>
                        </div>
                        <div class="count-item">
                            <div>
                                <div class="count-num">{{TranscendentPercent}}</div>%
                            </div>
                            <div  class="count-text">已超越学校的人</div>
                        </div>
                    </div>
                    
                </div>
            
                <subTab></subTab>
                 <div v-for="(item,index) in newsList" :key="index">
                    <newItem :news='item'></newItem>
                </div>

                <div class="load-p">
                    <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                    <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
                </div>
            </infiniteScroll>
        </div>
    </div>
</template>
<script>
import  headNav from '@/components/headNav/headNav'
import tab from '../tab'
import subTab from '../subTab'
import newItem from '../newItem'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore } from 'vux'
import {getRecord} from '@/api/newsApi'
export default {
    name:'newsList',
    components:{
        headNav,tab,subTab,newItem,infiniteScroll,LoadMore
    },
    computed:{
        newsList(){
            return this.$store.state.news.newsList
        },
        isMore(){
            return this.$store.state.news.isMore
        },
        curFristTab(){
            return this.$store.state.news.curFristTab
        },
        LearnCount(){
            return this.$store.state.news.LearnCount
        },
        TranscendentPercent(){
            return this.$store.state.news.TranscendentPercent
        },
        UpdateNewsLearnTime(){
            return this.$store.state.news.UpdateNewsLearnTime
        },
        isUpdateLearnTime(){
            return this.$store.state.news.isUpdateLearnTime
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        loadMore(){
            this.$store.dispatch('news/getNextPageNewsList')            
        }
    },
    activated(){
        this.$store.state.news.curFristTabIndex = 1
        this.$store.dispatch('news/getRecord')

         this.$store.dispatch('news/clearLearnTimer')
    },
     destroyed() {
       
       
    }
}
</script>
<style scoped>
.count-p{padding: 0rem 0rem 0.36rem 0rem;}
.count-title{width: 6rem;margin: 0.5rem auto;border-top: 1px dashed #e0e0e0;position: relative;color: #555555;}
.count-desc{position: absolute;left: 50%;transform: translate(-50%, -0.2rem);background: #f4f4f4;padding: 0 0.2rem;}
.count-list{display: flex;justify-content: space-around;}
.count-item{color: #888888;text-align: center;position: relative;width: 2.26rem;}
.count-num{font-size: 0.45rem;color: #ff9900;display: inline-block;}
.count-line{position: absolute;height: 0.7rem;border-right: 1px solid #d7d7d7;right: 0;top: 50%;transform: translateY(-50%);}
.count-text{padding: 0.2rem 0 0 0;}

.news-con{
    height: calc(100% - 0.88rem);
}
</style>