<template>
    <div class="main">
        <headNav title="考勤查询" :isBack="false"></headNav>
        <div class="tableContent" ref="scroll">
            <infiniteScroll  @loadMore="loadMore">
                <div class="oneCheck" v-for="(item,index) in studentData" :key="index">
                    <div class="c-top">
                        <div class="c-left">
                            <div class="imgBox">
                                <img src="@/assets/img/nuomiLogo.png" alt="">
                            </div>
                            <div>
                                <p>{{item.schoolName}}</p>
                                <p class="time">{{item.inOutTime | formatDateTime('YYYY-MM-DD')}}</p>
                            </div>
                        </div>
                        <div class="c-right">
                            考勤通知
                        </div>
                    </div>
                    <div class="c-content">
                        您的孩子
                        <span v-if="item.attenceDirection == 2">离校</span> 
                        <span v-if="item.attenceDirection == 1">进校</span> 
                        啦！{{item.studentName}}于{{item.inOutTime | formatDateTime('YYYY-MM-DD HH:mm')}}
                        <span v-if="item.attenceDirection == 2">离校</span> 
                        <span v-if="item.attenceDirection == 1">进校</span> 。
                    </div>
                    <div class="c-look" @click="goDetail(item)" v-if="item.snapPhotos">
                        立即查看 <img src="@/assets/img/checking/righting.png" alt="">
                    </div>
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
import headNav from '@/components/headNav/headNav'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore} from 'vux'
export default {
    name:'pushCheckList',
    components: {
        headNav,
        infiniteScroll,
        LoadMore
    },
    data() {
        return {
            pageNum:0,
            pageSize:6,
            studentData:[],
            isMore:true
        }
    },
    mounted(){
        this.recordsList()
    },
    methods:{
         // 获取url参数
         getQueryVariable(variable){
                var query = window.location.search.substring(1)
                var vars = query.split("&")
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=")
                        if(pair[0] == variable){return pair[1]}
                }
                return(false)
            },
       
        recordsList () {
             if(!this.isMore){
                return
            }
            this.pageNum++
           var prams = {
                StudentId:this.getQueryVariable('StudentId') ? this.getQueryVariable('StudentId') : 'e0838d9a5bd54caf8a5a71db8ca2c6f2',
                // StudentId:'e0838d9a5bd54caf8a5a71db8ca2c6f2',
                Sorting:'inOutTime desc',
                PageNum:this.pageNum,
                PageSize:this.pageSize
                }
            this.$store.dispatch('checkingIn2/PageRecords',prams).then((data) => {
                if(data){
                    if(data.items.length < this.pageSize){
                        this.isMore = false
                    }
                    this.studentData = this.studentData.concat(data.items) 
                }else{
                    this.isMore = false
                  }
                
            })
        },
        loadMore(){
            this.recordsList()
        },
        goDetail(item){
             this.$router.push('pcheckDetail')
             this.$store.state.checkingIn2.itemData = item
        }
    }
}
</script>
<style src="./css/public.css" scoped></style>
<style  scoped>
    .c-look{
        color: #128fef;
        font-size: 0.24rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
       margin: 0 auto;
    }
    .c-look img{
        width: 0.12rem;
        height: 0.24rem;
        margin-left: 0.1rem;
    }
    .load-p{
        padding: 1rem 0 0 0;
    }
     .tableContent{
        height: calc(100% - 0.88rem);
    }
</style>