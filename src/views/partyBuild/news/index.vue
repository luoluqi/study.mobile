<template>
    <div>
        <headNav :title='curFristTab.typeName'></headNav>
        <div class="news-con">
            <infiniteScroll  @loadMore="loadMore">
                <tab :index='0'></tab>
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
export default {
    name:'newsList',
    components:{
        headNav,tab,subTab,newItem,infiniteScroll, LoadMore
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
        }
    },
    methods:{
        loadMore(){
           
            this.$store.dispatch('news/getNextPageNewsList')
            
            
        }
    },
    mounted () {
        this.$store.state.news.curFristTabIndex = 0
        console.log(this.$store.state.user)
    },
    activated(){
        this.$store.dispatch('news/clearLearnTimer')
    }
}
</script>
<style scoped>
.news-con{
    height: calc(100% - 0.88rem);
}
</style>