<template>
    <div>
        <headNav :title="curFristTab.typeName + '详情'"></headNav>
     
        <div class="news-con">
             <infiniteScroll  @loadMore="loadMore">
               
                <div class="article-p">
                    <div class="title">{{curNews.newsTitle}}</div>
                    <div class="date">{{curNews.createDate | formatDateTime('yyyy-MM-dd HH:mm')}}</div>
                    <div class="content ql-editor" v-html="curNews.newsContent"></div>
                    <div class="count-p">
                        
                        <div class="count-item">{{curNews.viewNumber | count}} 已读</div>
                    </div>
                    <div class="zan-p">
                        <div @click="zan" v-show="curNews.isThumbup == 0" class="zan-g">
                            <img class="zan-img" src="@/assets/img/partyBuild/zan-g.png">
                            <div class="middle">{{curNews.thumbupCount  | count}}</div> 
                        </div>
                        <div @click="cancelZan" v-show="curNews.isThumbup == 1" class="zan-y">
                            <img class="zan-img" src="@/assets/img/partyBuild/zan-y.png">
                            <div class="middle">{{curNews.thumbupCount  | count}}</div> 
                        </div>
                    </div>
                </div>
                <div v-show="commentList.length > 0" class="comment-p">
                    <div class="comment-title">评论</div>
                    <div v-for="(item,index) in commentList" :key="index" class="comment-item">
                        <img v-if="teacherId == item.teachId" 
                        @click="deleteComment(item)"
                        class="comment-del" src="@/assets/img/partyBuild/delete.png" >
                        <img v-if="item.img" class="comment-head" :src="item.img" >
                        <img v-else class="comment-head" src="@/assets/img/default_head.png" >
                        <div class="comment-info">
                            <div class="comment-name">{{item.teachName}}</div>
                            <div class="comment-content">{{item.content}}</div>
                            <div class="comment-date">{{item.createTime | formatDateTime('yyyy-MM-dd HH:mm')}}</div>
                        </div>
                    </div>
                </div>
              
                <div  class="load-p">
                    <load-more v-if="isMoreComment" :tip="'正在加载'"></load-more>
                    <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
                </div>

                <div class="add-comment-p">
                    <input v-model.trim="content" maxlength="200" class="add-comment-input" type="text" placeholder="欢迎发表您的观点（200字以内）">
                    <div @click="send" class="add-comment-btn">发送</div>
                </div>
                <div class="bottom-space"></div>
             </infiniteScroll>
        </div>
    </div>
</template>
<script>
import  headNav from '@/components/headNav/headNav'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore } from 'vux'
export default {
    components:{
        headNav, infiniteScroll, LoadMore
    },
    computed:{
        curNews(){
            return this.$store.state.news.curNews
        },
        commentList(){
            return this.$store.state.news.commentList
        },
        isMoreComment(){
            return this.$store.state.news.isMoreComment
        },
        teacherId(){
            return this.$store.state.user.teacherId
        },
        curFristTab(){
            return this.$store.state.news.curFristTab
        },
        fristTabList(){
            return this.$store.state.news.fristTabList
        },
        curFristTabIndex(){
            return this.$store.state.news.curFristTabIndex
        }
    },
    data(){
        return {
            content:'',
            isUpdateLearnTime: false
        }
    },
    methods:{
        send(){
            if(!this.content){
                this.$vux.toast.text('请输入内容', 'top')
                return
            }
            var param = {
                newsInfoId: this.curNews.id,
                teachId: this.teacherId,
                teachName: this.$store.state.user.realName,
                img: this.$store.state.user.headImg,
                content: this.content
                // parentId: "string"
               
            }
            this.$store.dispatch('news/addComment', param).then(() => {
                this.content = ''
                this.$vux.toast.text('发表评论成功', 'top')
            })
        },
        deleteComment(item){
             this.$vux.confirm.show({
                title: '提示',
                content: '确定删除？',
                
                onConfirm : () => {
                    
                    this.$store.dispatch('news/deleteComment',{
                        id: item.id
                    }).then(() => {})
                }
            })
           
        },
        loadMore(){
            console.log('loadMore...')
            this.$store.dispatch('news/getNextPageCommentList')
        },
        zan(){
            var param = {
                newsInfoId: this.curNews.id,
                opType: 2,
                teacherId: this.teacherId,
                teacherName: this.$store.state.user.realName,
            }
            this.$store.dispatch('news/addView',param).then(res => {

            })
        },
    
        cancelZan(){
            var param = {
                 newsInfoId: this.curNews.id,
                teachId: this.teacherId
            }
            this.$store.dispatch('news/cancelView',param).then(res => {

            })
        },
        read(){
            if(this.curNews.isRead == 0){
                var param = {
                    newsInfoId: this.curNews.id,
                    opType: 1,
                    teacherId: this.teacherId,
                    teacherName: this.$store.state.user.realName,
                }
                this.$store.dispatch('news/addView',param).then(res => {

                })
                if(this.curFristTabIndex == 1){
                    this.$store.state.news.LearnCount ++
                }
                
            }
        }
        
    },
    mounted(){
        console.log(this.$store.state.user)
         this.$store.dispatch('news/getNewsInfo').then(() => {
             this.loadMore()
             this.read()

            this.$store.dispatch('news/startLearnTime')
         })
    },
    destroyed() {
        console.log('destroyed');
        
        
         this.$store.dispatch('news/clearLearnTimer')
    }
}
</script>
<style scoped>
.news-con{
    height: calc(100% - 0.88rem);
}
.article-p{ padding: 0.16rem 0.32rem 0.32rem 0.32rem; background: #fff; }
.title{ font-size: 0.32rem; color: #222222; word-break: break-all;}
.date{ padding: 0.3rem 0; color: #999999; }
.content{ color: #222222; }
.count-p{ padding: 0.3rem 0; text-align: right; }
.count-item{ display: inline-block; vertical-align: middle; margin: 0 0 0 0.1rem; color: #b2b2b2; }
.zan-p{ text-align: right; }
.zan-g{ display: inline-block; width: 2.1rem; height: 0.65rem; line-height: 0.65rem; border-radius: 0.6rem; border: 1px solid #b2b2b2;
    color: #b2b2b2; text-align: center; }
.zan-y{ display: inline-block; width: 2.1rem; height: 0.65rem; line-height: 0.65rem; border-radius: 0.6rem; border: 1px solid #ff9900;
    color: #ff9900; text-align: center; }
.middle{ display: inline-block; vertical-align: middle; }
.zan-img{ display: inline-block; vertical-align: middle;  width:0.3rem; height: 0.3rem; }
.comment-p{background: #fff;margin: 0.2rem 0 0 0;}
.comment-title{color: #666666;padding: 0.32rem 0.32rem 0 0.32rem;}
.comment-item{position: relative;padding: 0.3rem;border-bottom: 1px solid #dddddd;}
.comment-head{display: inline-block;vertical-align: top;width: 0.68rem;height: 0.68rem;object-fit: cover;border-radius: 50%;}
.comment-info{display: inline-block;vertical-align: top;width: 5.6rem;padding: 0 0 0 0.2rem;}
.comment-name{color: #10578d;}
.comment-content{padding: 0.24rem 0;color: #222222;word-break: break-all;}
.comment-date{color: #999999; }
.comment-del{position: absolute;right: 0.3rem;top: 0.3rem;display: inline-block;width: 0.28rem;height: 0.28rem;}
.bottom-space{height: 1.86rem;}
.add-comment-p{width: 100%;text-align: center;position: fixed;left: 0;bottom: 0;padding: 0.2rem 0;background: #f6f6f6;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.6);box-sizing: border-box;}
.add-comment-input{display: inline-block;vertical-align: middle; width: 5.36rem;background: #fff;padding:0.2rem;
border: 1px solid #dddddd;font-size: 0.26rem;border-radius: 0.1rem;}
.add-comment-btn{display: inline-block;vertical-align: middle;width: 1rem;height: 0.5rem;text-align: center;line-height: 0.5rem;
background: #2399e9;color: #fff;border-radius: 0.1rem;}


</style>