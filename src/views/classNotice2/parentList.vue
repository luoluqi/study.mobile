<template>
    <div class="main">
        <headNav title="通知公告"></headNav>
        <div class="tableContent" ref="scroll">
            <infiniteScroll  @loadMore="loadMore">
                <div class="oneNotice" v-for="(item,index) in noticeList" :key="index" @click="goDetail(item)">
                    <p class="one-top" :class="{'one-toped':item.isRead == 1}">
                        <span class="ct">
                            <span class="cycle" v-if="item.isRead != 1"></span>
                            <span class="title">{{item.Title}}</span> 
                        </span>
                        <span class="imgBox" v-if="item.IsCommit">
                            <img src="@/assets/img/notice/tijiao.png" alt="">
                        </span>
                    </p>
                    <p class="one-mid">
                        {{item.Content}}
                    </p>
                    <p class="one-bottom">
                        <span v-if="item.teacherImgurl" class="left">
                            <img :src="item.teacherImgurl" alt="">
                            {{item.TeacherName}}
                            {{item.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
                        </span>
                         <span v-else class="left">
                            <img src="@/assets/img/notice/head.png" alt="">
                            {{item.TeacherName}}
                            {{item.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
                        </span>
                        <!-- <span class="right">
                            已查看{{item.isRead}}/{{item.Number}} 
                        <img src="@/assets/img/notice/right.png" alt="">
                        </span> -->
                    </p>
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
    name:'parentList',
    components: {
        headNav,
         infiniteScroll,
        LoadMore
    },
    data() {
        return {
             pageIndex: 0,
            pageSize: 6,
            noticeList:[],
             isMore:true
        }
    },
    activated(){
      this.getNoticesByParent()
    },
    methods:{
      getNoticesByParent(){
           if(!this.isMore){
                return
            }
            this.pageIndex++
           var params = {
                parentId: this.$store.getters['user/parentId'],
                schoolId: this.$store.getters['user/schoolId'],
                gradeId: this.$store.getters['user/gradeId'],
                classId: this.$store.getters['user/classId'],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$store.dispatch('notice2/GetNoticesByParent', params).then((data) => {
               if(data.Code == 200){
                    if(data.Data.List){
                        if(data.Data.List.length < this.pageSize){
                                this.isMore = false
                            }
                        this.noticeList =this.noticeList.concat(data.Data.List) 
                    }else{
                    this.isMore = false
                  }

               }
            })
      },
      loadMore(){
            this.getNoticesByParent()
        },
      goDetail(item){
            this.$store.commit('notice2/setNoticeId', item.Id)
            this.$router.push('noticeLook')
            item.isRead = 1
      }
    }
}
</script>
<style  scoped>
     .main{
        padding: 0 0.16rem;
    }
    .oneNotice{
        background: #fff;
        padding: 0.38rem 0;
        border-radius: 0.1rem;
        margin-top: 0.22rem;
    }
    .one-top{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.32rem;
        color: #333;
        font-weight: bold;
        padding: 0 0.26rem 0 0.16rem;
    }
    .one-toped{
        padding: 0 0.26rem 0 0.38rem;
    }   
    .ct{
        display: flex;
        align-items: center;
    }
    .one-top .cycle{
        display: inline-block;
        width: 0.14rem;
        height: 0.14rem;
        border-radius: 50%;
        background: #ff3000;
        margin-right: 0.09rem;
    }
    .one-top .title{
        display: inline-block;
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .one-top .imgBox{
        position: absolute;
        right: 0;
        right: 0.26rem;
        display: inline-block;
        
    }
    .one-top img{
        width: 1rem;
        height: 0.64rem;
    }
    .one-mid{
        width: 100%;
        padding: 0.2rem 1.52rem 0.2rem 0.38rem ;
        color: #999;
        font-size: 0.28rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        box-sizing: border-box;
    }
    .one-bottom{
        font-size: 0.24rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.26rem 0 0.38rem;
    }
    .one-bottom img{
        width: 0.54rem;
        height: 0.54rem;
        margin-right: 0.1rem;
    }
    .one-bottom .left{
        color: #999;
        display: flex;
        align-items: center;
    }
    .one-bottom .right{
        color: #666;
    }
    .one-bottom .right img{
        width: 0.10rem;
        height: 0.20rem;
    }
    .load-p{
	padding: 1rem 0 0 0;
    }
    .tableContent{
        height: calc(100% - 0.88rem);
    }
</style>