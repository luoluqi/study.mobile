<template>
    <div class="main">
        <headNav title="通知公告"></headNav>
        <div class="top">
            <div class="search">
                <img src="@/assets/img/oa/search.png" alt="">
                <input @change="searchNotice" v-model="searchWork" type="text" placeholder="搜索公告标题、公告内容">
            </div>
        </div>
        <div class="tab">
            <span @click="chooseRead(-1)" :class="{'active': readCurrent == -1}">全部</span>
            <span @click="chooseRead(0)" :class="{'active': readCurrent == 0}">未读</span>
            <span @click="chooseRead(1)" :class="{'active': readCurrent == 1}">已读</span>
        </div>
        
        <div class="tableContent" ref="scroll">
            <infiniteScroll @loadMore="loadMore">
                <div v-for="(item,index) in noticeList" :key="index" class="oneNotice">
                    <p class="one-top">
                        <span class="ct" @click="toDetail(item)">
                            <span class="cycle" v-if="item.isRead != 1"></span>
                            <span class="title">{{item.Title}}</span> 
                        </span>
                        <span v-show="item.IsCommit == 1 && item.isConfirm !=1" class="imgBox">
                            <img src="@/assets/img/notice/tijiao.png" alt="">
                        </span>
                        <span v-show="item.IsCommit == 1 && item.isConfirm ==1" class="imgBox">
                            <img src="@/assets/img/notice/sure.png" alt="">
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
import { LoadMore} from 'vux'
import infiniteScroll from '@/components/infiniteScroll'
export default {
    name: 'noticeList',
    components: {
        headNav, LoadMore, infiniteScroll
    },
    data () {
        return {
            readCurrent: -1,
            searchWork: '',
            pageIndex:0,
            pageSize:4,
            noticeList: [],
            isMore: true
        }
    },
    computed: {
        commitNoticeId () {
            this.$store.state.oaNotice.commitNoticeId
        }
    },
    methods :{
        // 搜索公告
        searchNotice () {
            this.pageIndex = 0
            this.noticeList = []
            this.isMore = true
            this.getNotice()
        },
        // 选择已读未读
        chooseRead (index) {
            this.readCurrent = index
            this.pageIndex = 0
            this.noticeList = []
            this.isMore = true
            this.getNotice()
        },
        // 获取列表
        getNotice () {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var params = {
                title: this.searchWork,
                content: this.searchWork,
                isRead: this.readCurrent == -1 ? '' : this.readCurrent,
                teacherId:this.$store.getters['user/teacherId'],
                schoolId:this.$store.getters['user/schoolId'],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$store.dispatch('oaNotice/GetNoticesByTeacher', params).then(
                data => {
                    if (data.Code == 200) {
                        if (data.Data.List.length < this.pageSize) {
                            this.isMore = false
                        }
                        this.noticeList = this.noticeList.concat(data.Data.List)
                    } 
                }
            )
        },
        // 跳转详情
        toDetail (item) {
            item.isRead = 1
            this.$store.state.oaNotice.commitNoticeId = ''
            this.$store.commit('oaNotice/setNoticeId', item.Id)
            this.$router.push('TnoticeDetail')
        },
        loadMore () {
            this.getNotice()
        }

    },
    activated () {
        var commitNoticeId = this.$store.state.oaNotice.commitNoticeId
        if (commitNoticeId) {
            this.noticeList.forEach((item,index) => {
                if (item.Id == commitNoticeId) {
                    item.isConfirm = 1
                    this.$set(this.noticeList,index,item)
                }
            })
        } else {
            this.getNotice()
        }
    }
}
</script>
<style  scoped>
    .top{
        padding: 0.2rem;
        background: #fff;
        height: 0.64rem;
        line-height: 0.64rem;
        overflow: hidden;
    }
    .tab{
        padding: 0 0.88rem;
        background: #fff;
        font-size: 0.32rem;
        color: #666;
        display: flex;
        justify-content: space-between;
    }
    .tab>span{
        display: inline-block;
        height: 0.96rem;
        line-height: 0.96rem;
    }
    .tab>.active{
        color: #333;
        font-weight: bold;
        border-bottom:0.05rem solid #128FEF;
    }
    .oneNotice{
        background: #fff;
        padding: 0.38rem 0;
        border-radius: 0.1rem;
        margin-bottom: 0.22rem;
    }
    .one-top{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.32rem;
        color: #333;
        font-weight: bold;
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
    .search{
        width: 100%;
        float: left;
        background: #f5f5f5;
        border-radius: 0.15rem;
    }
    .search input{
        font-size: 0.28rem;
        height: 0.32rem;
        width: 3.5rem;
        vertical-align: middle;
        background: #f5f5f5;
    }
    .search img{
        vertical-align: middle;
        width: 0.32rem;
        height: 0.32rem;
        margin: 0 0.15rem;
    }
    .punish{
        width: 2.06rem;
        height: 0.64rem;
        background: #128FEF;
        text-align: center;
        line-height: 0.64rem;
        color: #fefefe;
        font-size: 0.28rem;
        border-radius:0.32rem;
        float: right;
    }
    .load-p{
        padding: 1rem 0 0 0;
    }
    .tableContent{
        height: calc(100% - 0.88rem);
        padding: 0.2rem;
    }
</style>