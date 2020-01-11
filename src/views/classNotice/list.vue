<template>
    <div id="noticeList">
        <headNav title="公告"></headNav>
        
        <div class="noticeList">
            <infiniteScroll  @loadMore="getNoticeList">
                <ul>
                    <li 
                        v-for="(item,index) in noticeList"
                        :key="index"
                    @click="toDetail(item)">
                        <p>{{item.CreateTime | formatDateTime('yyyy-MM-dd HH:mm:ss')}}</p>
                        <div class="noticeTitle">
                            <h2><img src="@/assets/img/biao.png" /> 来自 {{item.TeacherName}}</h2>
                            <h3>{{item.Title}}</h3>
                            <div v-show="roleCode == 'Teacher' && teacherId == item.TeacherId" @click.stop="openReadDetail(item)" class="read-div">
                                已读
                                <span class="red-num">{{item.readList.length}}</span>/{{item.readList.length + item.unreadList.length}}
                            </div>
                            <img v-show="item.isRead === 0 && roleCode == 'Parent'"  class="weidu" src="@/assets/img/weidu.png" />
                        </div>
                    </li>
                </ul>
                <div class="load-p">
                    <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                    <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
                </div>
            </infiniteScroll>
        </div>
        


      
         <readDetail 
        v-show="isReadDetail"
        :unreadList='unreadList' :readList='readList'
        @hide='hideReadDetail'></readDetail>

    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import readDetail from '@/components/readDetail'
import {getNoticeList} from '@/api/noticeApi'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore,Swiper,SwiperItem } from 'vux'
export default {
    name:'noticeList',
    components:{
        headNav,infiniteScroll,LoadMore,readDetail
    },
    computed:{
        noticeList(){
            return this.$store.state.notice.noticeList
        },
        isMore(){
            return this.$store.state.notice.isMore
        },
        roleCode(){
            return this.$store.getters['user/roleCode']
        },
        teacherId(){
            return this.$store.state.user.teacherId
        }
    },
    data(){
        return {
          isReadDetail:false,
          unreadList:[],
          readList:[]
        }
    },
    methods:{
        toDetail(item){
            this.$store.state.notice.curNotice = item
            this.$router.push('detail')
        },
        getNoticeList(){ 
            this.$store.dispatch('notice/getList')
        },
        openReadDetail(item){
            this.unreadList = item.unreadList
             this.readList = item.readList
            this.isReadDetail = true
        },
        hideReadDetail(){
             this.unreadList = []
             this.readList = []
            this.isReadDetail = false
        }
    },
    mounted(){
       
        if(!this.$store.state.user.schoolId){
            this.$router.replace('index')
        }
    }
}
</script>
<style scoped src="@/assets/css/NoticeV2.css"></style>
<style scoped>
.noticeList{
    height: calc(100% - 0.88rem);
}
.load-p{
	padding: 1rem 0 0 0;
}
.read-div{
    position: absolute;
    top: 0.2rem;
    right: 0.6rem;
}
.red-num{
    color: red;
}



</style>