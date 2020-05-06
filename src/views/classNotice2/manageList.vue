<template>
    <div class="main">
        <headNav title="通知公告"></headNav>
        <div @click="toPunish" class="punish">
            发布通知
        </div>
        <div class="tableContent" ref="scroll">
            <infiniteScroll @loadMore="loadMore">
                <div v-for="(item,index) in noticeList" :key="index" class="oneNotice">
                    <p class="one-top">
                        <span class="ct" @click="toDetail(item)">
                            <!-- <span class="cycle"></span> -->
                            <span class="title">{{item.Title}}</span> 
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
                        <span v-if='item.AnnounceFlag == 1' @click="toLook(item)" class="right">
                            已查看 {{item.readNumber}}/{{item.Number}} 
                            <img src="@/assets/img/notice/right.png" alt="">
                        </span>
                        <span v-else>
                            <span @click="releaseNotice(item)" class="punishBtn">
                                发布
                            </span>
                            <span @click="deleteNotice(item,index)" class="delBtn">
                                删除
                            </span>
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
    name: 'list',
    components: {
        headNav, LoadMore, infiniteScroll
    },
    data () {
        return {
            pageIndex:0,
            pageSize:5,
            noticeList: [],
            isMore: true
        }
    },
    methods :{
        // 确认发布
        releaseNotice (item) {
            this.$store.dispatch('notice2/ReleaseNotice', {noticeId: item.Id}).then(
                res => {
                    if (res.Code == 200) {
                        this.$vux.toast.text('发布成功')
                        item.AnnounceFlag = 1
                    } else {
                        this.$vux.toast.text(res.Msg)
                    }
                }
            )
        },
        // 删除公告
        deleteNotice (item,index) {
            this.$store.dispatch('notice2/DeleteNotice', {id: item.Id}).then(
                res => {
                    if (res.Code == 200) {
                        this.$vux.toast.text('删除成功')
                        this.noticeList.splice(index, 1) 
                    } else {
                        this.$vux.toast.text(res.Msg)
                    }
                }
            )
        },
        // 跳转发布
        toPunish () {
            this.$store.state.notice2.currentTemplate = ''
            this.$store.commit('notice2/setwhoTopunish', 1)
            this.$store.commit('media/clear')
            this.$router.push('managePunish')
        },
        // 获取列表
        getNotice () {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var params = {
                teachId:this.$store.getters['user/teacherId'],
                schoolId:this.$store.getters['user/schoolId'],
                level: 1,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            this.$store.dispatch('notice2/GetNotices', params).then(
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
            this.$store.commit('notice2/setwhoTopunish', 2)
            this.$store.commit('notice2/setNoticeId', item.Id)
            this.$router.push('manageDetail')
        },
        // 跳转已查看
        toLook (item) {
            this.$store.commit('notice2/setwhoTopunish', 2)
            this.$store.commit('notice2/setNoticeDetail', item)
            this.$router.push('manageNoticeLook')
        },
        loadMore () {
            this.getNotice()
        }

    },
    activated () {
        if (this.$store.state.notice2.whoTopunish == 3) {
            this.pageIndex = 0
            this.noticeList = []
            this.isMore = true
        }
        this.getNotice()
    }
}
</script>
<style src="./css/listSame.css" scoped></style>
<style  scoped>
    .one-bottom .punishBtn{
        color: #128FEF;
    }
    .one-bottom .delBtn{
        color: #ff3000;
    }
</style>