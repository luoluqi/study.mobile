<template>
    <div class="main">
        <headNav title="通知公告"></headNav>
        <div v-if="isSchoolAdmin" class="top">
            <div class="search">
                <img  src="@/assets/img/oa/search.png" alt="">
                <input @change="searchNotice" type="text" v-model.trim="searchWork" placeholder="搜索公告标题、公告内容">
            </div>
            <div  @click="toPunish" class="punish">
                发布通知
            </div>
        </div>
        <div v-else class="top">
            <div class="tsearch">
                <img  src="@/assets/img/oa/search.png" alt="">
                <input @change="searchNotice" type="text" v-model.trim="searchWork" placeholder="搜索公告标题、公告内容">
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
                        <span v-show="item.IsCommit == 1" class="imgBox">
                            <img src="@/assets/img/notice/tijiao.png" alt="">
                        </span>
                    </p>
                    <p v-html="item.Content" class="one-mid">
                        
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
                        <span v-if="isSchoolAdmin && loginId == item.TeacherId" @click="toLook(item)" class="right">
                            已查看 {{item.readNumber}}/{{item.Number}} 
                            <img src="@/assets/img/notice/right.png" alt="">
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
import {getRoleList} from '@/api/commonApi'
export default {
    name: 'noticeList',
    components: {
        headNav, LoadMore, infiniteScroll
    },
    data () {
        return {
            readCurrent: -1,
            pageIndex: 0,
            pageSize: 4,
            noticeList: [],
            isMore: true,
            searchWork: '',
            isSchoolAdmin: false,
            loginId: ''
        }
    },
    activated () {
        this.loginId = this.$store.getters['user/teacherId']
        if (this.whoTopunish == 1) {
            this.noticeList = []
            this.pageIndex = 0
            this.isMore = true
        }
        this.getNotice()
        this.getRode()
        
    },
    computed: {
        whoTopunish () {
            return this.$store.state.oaNotice.whoTopunish
        }
    },
    methods :{
        // 获取身份
        getRode () {
            var params = {
                userId: this.$store.getters['user/loginUserId']
            }
            getRoleList(params).then(
                res => {
                    res = JSON.parse(res)
                    if (res.Code == 200) {
                        var roles = res.Data.data.roles
                        roles.forEach(item => {
                            if (item.code == 'SchoolAdmin') {
                                this.isSchoolAdmin = true
                            }
                        })
                    }
                }
            )
        },
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
        // 跳转发布
        toPunish () {
            this.$store.commit('oaNotice/setwhoTopunish', 2)
            this.$router.push('punishNotice')
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
                teachId: this.$store.getters['user/teacherId'],
                schoolId: this.$store.getters['user/schoolId'],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$store.dispatch('oaNotice/GetNotices', params).then(
                data => {
                    if (data.Code == 200) {
                        if (data.Data.List.length < this.pageSize) {
                            this.isMore = false
                        }
                        this.noticeList = this.noticeList.concat(data.Data.List)
                    } else {
                        this.$vux.toast.text('网络异常')
                        this.isMore = false
                    }
                }
            )
        },
        // 跳转详情
        toDetail (item) {
            this.$store.commit('oaNotice/setwhoTopunish', 2)
            this.$store.commit('oaNotice/setNoticeId', item.Id)
            if (item.isRead != 1 ) item.readNumber+=1
            item.isRead = 1
            this.$router.push('TnoticeDetail')
        },
        // 跳转已查看
        toLook (item) {
            this.$store.commit('oaNotice/setwhoTopunish', 2)
            this.$store.commit('oaNotice/setNoticeId', item.Id)
            this.$store.commit('oaNotice/setNoticeDetail', item)
            item.IsCommit == 1 ?  this.$router.push('commitNoticeDetail') : this.$router.push('lookNoticeDetail')
           
        },
        loadMore () {
            this.getNotice()
        }

    },
    
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
        width: 4.4rem;
        float: left;
        background: #f5f5f5;
        border-radius: 0.15rem;
    }
    .search input,.tsearch input{
        font-size: 0.24rem;
        width: 3.5rem;
        vertical-align: middle;
        background: #f5f5f5;
    }
    .search img,.tsearch img{
        vertical-align: middle;
        width: 0.32rem;
        height: 0.32rem;
        margin: 0 0.15rem;
    }
    .tsearch{
        width: 100%;
        float: left;
        background: #f5f5f5;
        border-radius: 0.15rem;
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