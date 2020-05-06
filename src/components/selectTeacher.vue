<template>
    <div class="man-con">
        <load-more v-show="loading" :tip="'正在加载...'"></load-more>
        <div>
            <tree 
                :data="treeData" 
               
                :props="{label: 'name', id:'loginUserId', children: 'children'}">
            </tree>
        </div>
        <!-- <checklist :options="manList" v-model="selectedMan"></checklist> -->
        <div class="btn-p">
           <div class="select-text">
               <span class="blue">已选择</span>
               <span v-for="(item,index) in teacherList" :key="index">{{item.name}}，</span>
               
           </div>
           <div @click="comfirm" class="sure-btn">确定({{teacherList.length}}/{{count}})</div>
        </div>
        
        <div style="height:4rem;"></div>
    </div>
</template>
<script>
import { LoadMore } from 'vux'
import tree from '@/components/tree/tree'

export default {
   
     components: {
       tree, LoadMore 
    },
    computed: {
        loading(){
            return this.$store.state.selectTeacher.loading
        },
        treeData(){
            return this.$store.state.selectTeacher.treeData
        },
         teacherList(){
            return this.$store.state.selectTeacher.teacherList
        },
        count(){
            return this.$store.state.selectTeacher.count
        }
    },
    data () {
        return {
          
        }
    },
    methods: {
        comfirm () {
            this.$emit('comfirm')
        }
    },
   
    mounted () {
         this.$store.dispatch('selectTeacher/getTreeData')
    }    
}
</script>
<style scoped>
.man-con{
    position: relative;
}
.btn-p{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #fff;
    padding: 0rem 0.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
    box-sizing: border-box;
}
.select-text{
    font-size: 0.28rem;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
    width:5rem
}
.blue{
    color: #128FEF;
    
}
.sure-btn{
    width:1.64rem;
    height:0.6rem;
    line-height: 0.6rem;
    background:rgba(18,143,239,1);
    border-radius:0.08rem;
    margin: 0 auto;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
</style>
