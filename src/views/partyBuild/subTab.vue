<template>
    <div class="tab-list">
        <div v-for="(item,index) in secondTabList"
        :key="index"
        @click="select(item)"
        :class="{'active':item.id == curSecondTab.id}"
         class="tab-item">{{item.typeName}}</div>
        
    </div>
</template>
<script>
export default {
    computed:{
        secondTabList(){
            return this.$store.state.news.secondTabList
        },
        curSecondTab(){
            return this.$store.state.news.curSecondTab
        }
    },
    data(){
        return {

        }
    },
    methods:{
        select(item){
            this.$store.dispatch('news/changeSecondType', item)
        }
    }
}
</script>
<style scoped>
.tab-list{
    white-space:nowrap;
    overflow-x: scroll;
    background: #fff;
    padding: 0 0 0 0.32rem;
    border-bottom: 1px solid #dddddd;
}
.tab-item{
    display: inline-block;
    padding: 0.25rem 0;
    margin: 0 0.5rem 0 0;
    border-bottom: 4px solid #fff;
    color: #666666;
}
.tab-item.active{
    color:  #0a8de5;
     border-bottom: 4px solid #0a8de5;
}
</style>