<template>
    <div class="main">
        <headNav title="家庭作业"></headNav>
        <div class="tableContent" ref="scroll">
            <infiniteScroll  @loadMore="loadMore">
                <div class="onework" v-for="(item,index) in workList" :key="index">
                    <div class="workDetail">
                        <div class="w-left">
                            <div v-if="item.teacherImgurl" class="headBox">
                                <img :src="item.teacherImgurl" alt="">
                            </div>
                            <div v-else class="headBox">
                                <img src="@/assets/img/homeWork/head.png" alt="">
                            </div>
                            <div class="teacher">
                                <p>{{item.TeacherName}}</p>
                                <p>{{item.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}</p>
                            </div>
                        </div>
                        <div class="tijiao">
                            <img v-if="item.IsCommit == 1 && item.isSubmit == 0 && item.isReview == 0"  src="@/assets/img/homeWork/tijiao.png" alt="">
                            <img v-if="item.IsCommit == 1 && item.isSubmit == 1 && item.isReview == 0" src="@/assets/img/homeWork/weiping.png" alt="">
                            <img v-if="item.IsCommit == 1 && item.isSubmit == 1 && item.isReview == 1" src="@/assets/img/homeWork/yiping.png" alt="">
                        </div>
                        <div class="read" v-if="item.isRead == 0">未读</div>
                        <div class="w-right">
                            {{item.SubjectName}}
                        </div>
                    </div>
                    <div  :class="item.isOpen ? 'worktext2' : 'worktext'">
                        {{item.Content}}
                    </div>
                    <div v-if="item.isShow">
                        <div v-if="!item.isOpen" class="zhanshou" @click="unfold(index)">展开</div>
                        <div v-if="item.isOpen" class="zhanshou" @click="unfold(index)">收起</div>
                    </div>
                    <!-- <div v-if="item.Voices" class="audioList">
                        <div class="audio" v-for="(audio,index) in item.Voices" :key='index' >
                            <audio :src="audio" controls></audio>
                        </div>
                    </div>
                    
                    <div v-if="item.Imgs" class="workPhotoList">
                        <previewImgDiv  :list="item.imgArr"></previewImgDiv>
                    </div>
                    <div v-if="item.Video && showModel" class="vedio">
                        <video preload :src="item.Video" width="100%" height="100%" controls="controls"></video>
                    </div>
                    <div v-if="item.InternetUrl" class="link">
                        <div>
                            <img :src="item.InternetImg" alt="">
                        </div>

                        <div class="a-link-p">
                            <a :href="item.InternetUrl" target="_blank" class="a-link">{{item.InternetTitle}}</a> 
                        </div>
                    </div> -->
                    <div class="zan">
                        <div>
                            <span @click="zan(item.Id, item)" v-if="item.isLike == 0">
                                <img src="@/assets/img/homeWork/zan.png" alt="">
                                赞一个
                            </span>
                            <span class="zaned" v-else>
                                <img src="@/assets/img/homeWork/zaning.png" alt="">
                                {{item.likeNumber}}
                            </span>
                            <!-- <span class="flower">
                                <img src="@/assets/img/homeWork/flower.png" alt="">
                            </span> -->
                        </div>
                        <!-- <div v-if="item.IsCommit == 1 && item.isSubmit == 0" class="summitWork" @click="summitWork(item)">
                            提交作业  >
                        </div> -->
                        <div class="summitWork" @click="lookDetail(item)">
                            查看  >
                        </div>
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
import previewImgDiv from '@/components/preview'
import { LoadMore} from 'vux'
export default {
    name: 'parentsWorkList',
    components:{
       headNav, LoadMore, infiniteScroll, previewImgDiv
    },
    data () {
        return {
            pageIndex: 0,
            pageSize: 6,
            workList: [],
            current: 0,
            isMore: true,
            imgIndex: 0
        }
    },
    methods: {
        // 展开 收齐 
        unfold (index) {
            this.workList[index].isOpen =  !this.workList[index].isOpen 
        },
        // 查看图片
        previewImg (list, img ,index) {
            this.imgIndex = index
            wx.previewImage({
                current: img, // 当前显示图片的http链接
                urls: list// 需要预览的图片http链接列表
            })
        },
         //  获取家庭作业
        getWorkList () {
            if (!this.isMore) {
                return
            }
            this.pageIndex++
            var params = {
                parentId: this.$store.getters['user/parentId'],
                schoolId: this.$store.getters['user/schoolId'],
                gradeId: this.$store.getters['user/gradeId'],
                classId: this.$store.getters['user/classId'],
                studentId: this.$store.getters['user/studentId'],
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            console.log(params)
            this.$store.dispatch('homework2/GetHomeWorkListByParent', params).then(
                data => {
                    console.log(data)
                    if (data.Code == 200) {
                        if (data.Data.List.length < this.pageSize) {
                            this.isMore = false
                        }
                        for (var i = 0; i < data.Data.List.length; i++) {
                            data.Data.List[i].isShow = false
                            if ( data.Data.List[i].Content.length > 0) {
                                 data.Data.List[i].isShow = true
                            } 
                            data.Data.List[i].isOpen = false
                            data.Data.List[i].Imgs =  data.Data.List[i].Imgs ? data.Data.List[i].Imgs.split(',') : ''
                            if (data.Data.List[i].Imgs) {
                               data.Data.List[i].imgArr = this.setImgArr(data.Data.List[i].Imgs)
                            }
                            data.Data.List[i].Voices = data.Data.List[i].Voices ? data.Data.List[i].Voices.split(',') : '' 
                        }
                        this.workList = this.workList.concat(data.Data.List)
                      
                    } else {
                        this.isMore = false
                    }
                }
            )
       },
        // 点赞
        zan (Id, item) {
            var params = {
                HomeWorkId: Id,
                ParentId: this.$store.getters['user/parentId'],
                ParentName: this.$store.getters['user/realName']
            }
            this.$store.dispatch('homework2/AddLike', params).then(
                res => {
                    if (res.Code == 200) {
                        this.$vux.toast.text('点赞成功', 'top')
                        item.isLike = 1
                        item.likeNumber = item.likeNumber + 1
                    }
               }
           )
        },
        // 设置已读
        isRead (homeWorkId) {
            var params = {
                homeWorkId: [homeWorkId],
                studentId:this.$store.getters['user/studentId'],
            }
            this.$store.dispatch('homework2/SetRead', params).then(
                res => {
                    console.log(res)
                }
            )
        },
        // 提交作业
        summitWork (item) {
            this.$router.push('parentsSummitWork')
            this.$store.commit('homework2/sethomeWorkId', item.Id)    
        },
        // 查看作业
        lookDetail (item) {
            item.isRead = 1
            this.$router.push('parentsLookWork')
            this.$store.commit('homework2/sethomeWorkId', item.Id)
            // this.$store.commit('homework2/sethomeWorkDetail', homeWorkDetail)
        },
        // 下拉刷新
        loadMore () {
            this.getWorkList()
        }
    },
    activated () {
         if (this.summitHomeId) {
            this.workList.forEach((item,index) => {
                if (item.Id == this.summitHomeId) {
                    this.workList[index].isSubmit = 1
                }
            });
        }
        this.getWorkList()
    },
    computed: {
        summitHomeId () {
            return this.$store.state.homework2.summitHomeId
        },
        showModel () {
            return this.$store.state.media.showModel
        }
    }
}
</script>
<style scoped src="@/assets/css/homeWork2.css"></style>
<style scoped src="./css/public.css"></style>
<style scoped>
    .read{
        position: absolute;
        right: 20%;
        color: red;
    }
    .main{
        padding: 0 0.16rem;
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
        margin: 0.16rem auto;
    }
    .onework{
        background: #fff;
        padding: 0.32rem 0.24rem 0 0.24rem;
        margin-bottom: 0.24rem;

    }
    .workDetail{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .w-left{
        display: flex;
        align-items: center;
    }
    .tijiao{
        position: absolute;
        left: 50%;
        width: 1rem;
        height: 0.64rem;
        margin: 0 auto;
    }
    .tijiao img{
        width:100%;
        height: 100%;
    }
   .w-right{
        width:1.04rem;
        height: 0.46rem;
        text-align: center;
        line-height: 0.42rem;
        color: #fff;
        font-size: 0.22rem;
        background: url('../../assets/img/homeWork/workname.png') no-repeat;
        background-size: 100% 100%;
    }
    .headBox{
        width: 0.76rem;
        height: 0.76rem;
        border-radius: 50%;
    }
    .headBox img{
        width: 100%;
        height: 100%;
    }
    .teacher{
        margin-left: 0.1rem;
    }
    .teacher p:first-child{
        color: #333;
        font-size: 0.32rem;
    }
    .teacher p:last-child{
        color: #999;
        font-size: 0.24rem;
    }
    .worktext{
        padding-bottom: 0.32rem;
        color: #333;
        font-size: 0.32rem;
        max-height: 1.3rem;
        overflow: hidden;
        word-wrap: break-word;
        word-break: normal;
        white-space: pre-line;
    }
    .worktext2{
        padding-bottom: 0.32rem;
        color: #333;
        font-size: 0.32rem;
        overflow: auto;
        max-height: 3rem;
        word-wrap: break-word;
        word-break: normal;
        white-space: pre-line;
    }
    .current{
        padding: 0.32rem 0;
        color: #333;
        font-size: 0.32rem;
    }
    .zan{
        color: #666;
        font-size: 0.28rem;
        height: 0.86rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top:0.01rem solid #e5e5e5 ;
    }
    .zaned{
        color: #128FEF;
    }
    .zan div:first-child{
        display: flex;
        align-items: center;
    }
    .zan img{
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.06rem;
    }
    .zan span{
        display: flex;
        align-items: center;
    }
    .zan .flower{
        margin-left: 0.5rem;
    }
    .zan .summitWork{
        color: #128FEF;
    }
    .load-p{
        padding: 1rem 0 0 0;
    }
    .tableContent{
        height: calc(100% - 0.88rem);
    }
    .zhanshou{
        color: #128fef;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        margin: 0 auto;
    }
</style>