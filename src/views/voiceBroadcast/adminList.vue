<template>
    <div>
        <headNav title="语音广播"></headNav>
        <div class="searchzchen">
            <div class="searchBox">
                <img src="@/assets/img/homeWork/search.png" alt="">
                <input type="search" placeholder="搜索公告标题" v-model="keyWord" @keydown.enter.prevent="getBroadcast">
            </div>
            <div class="publish" @click="goPublish">发布广播</div>
        </div>
                 
                <div class="tableContent" ref="scroll" v-if="broadcastList.length != 0">
                    <infiniteScroll  @loadMore="loadMore">
                        <div class="oneItem" v-for="(item,index) in broadcastList" :key="index">
                            <p class="informTit">
                                <img src="@/assets/img/homeWork/guangbo.png" alt="">
                                <span>{{item.title}}</span>
                            </p>
                            <div class="voiceContent">
                                <img :src="item.headImgUrl" alt="">
                                <div class="voiceList">
                                    <div class="audio" @click="play(item,index)">
                                        <img v-if="!item.isPlay"  src="@/assets/img/homeWork/a-1.png" alt="">
                                        <img v-else src="@/assets/img/homeWork/a-2.gif" alt="">
                                        <span style="color: #fff;">{{item.totalSeconds}}"</span>
                                        <span class="clickPlay">点击播放</span>
                                        <audio style="display:none" duration :src="item.originalUrl" :id="item.originalUrl" controls></audio>
                                    </div>
                                </div>
                            </div>
                            <div class="informDetail">
                                <span>{{item.name}}</span>
                                <label>{{item.createTime}}</label>
                            </div>
                        </div>
                        <div class="load-p">
                            <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                            <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
                        </div>
                    </infiniteScroll>
                </div>
                <div class="zanImg" v-else>
                    <img src="@/assets/img/homeWork/zanwuData.png" alt="">
                    <p>暂无语音广播</p>
                </div>
       
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore} from 'vux'
export default {
    components:{
        headNav,
        infiniteScroll,
        LoadMore,
    },
    data() {
        return {
            lastId: '',
            pageIndex:0,
           pageSize:5,
           isMore:true,
           broadcastList:[],
           keyWord:''
        }
    },
    watch:{
        keyWord(newVal,oldVue){
            // false  ===>   null 0 '' false undefined  NAN
           if(!newVal){
               this.isMore = true
               this.pageIndex = 0
               this.broadcastList = []
               this.getBroadcastList()
           }
        }
    },
    mounted(){
       this.getBroadcastList()
    },
    methods:{
        play (id,index) {
            if( this.lastid && this.lastid != id) {
                document.getElementById(this.lastid.originalUrl).pause()
                document.getElementById(this.lastid.originalUrl).load()
                this.lastid.isPlay =false
            }
            var music = document.getElementById(id.originalUrl)
            // this.time =Math.floor(music.duration)
            if (music.paused){
                music.play()
                id.isPlay = true
                this.lastid = id
                 this.broadcastList.splice(index,1,id)
            } else {
                music.pause()
                id.isPlay = false
                 this.broadcastList.splice(index,1,id)
            }
            var isend = document.getElementById(id.originalUrl)
            isend.addEventListener('ended', () => {  
                id.isPlay = false
                 this.broadcastList.splice(index,1,id)
            }, false)
          
        },
        goPublish(){
            this.$router.push('publish')
        },
        getBroadcast(){
            this.isMore = true
            this.pageIndex = 0
            this.broadcastList = []
            this.getBroadcastList()
        },
        // 获取广播记录
         getBroadcastList(){
             if(!this.isMore){
                return
            }
            this.pageIndex++
            var prams = {
                LoginUserId:this.$store.getters['user/loginUserId'],
                PageNum:this.pageIndex,
                PageSize:this.pageSize,
                Title:this.keyWord
            }
            this.$store.dispatch('broadcast/GetVoiceBroadcast',prams).then((data) => {
                   if(data.items.length < this.pageSize){
                        this.isMore = false
                    }
                    this.broadcastList = this.broadcastList.concat(data.items)
              
            })
        },
        loadMore(){
            this.getBroadcastList()
        }
    }
}
</script>
<style  scoped>
.searchzchen{
    background: #fff;
    height: 1.2rem;
    overflow: hidden;
}
.searchBox{
    width:4.5rem;
    height:0.72rem;
    background:rgba(255,255,255,1);
    border:0.02rem solid rgba(204,204,204,1);
    border-radius:0.36rem;
    margin: 0.24rem;
    line-height: 0.72rem;
    display: inline-block;
    margin-right: 0.1rem;
}
.searchBox img{
    width: 0.26rem;
    height: 0.26rem;
    margin-left: 0.2rem;
}
.searchBox input{
    font-size: 0.26rem;
}
.publish{
    width:2rem;
    height:0.72rem;
    line-height: 0.72rem;
    background:rgba(18,143,239,1);
    border-radius:0.36rem;
    display: inline-block;
    text-align: center;
    font-size: 0.26rem;
    color: #fff;
}
.informList{
    padding-bottom: 1rem;
}
.oneItem{
    width:6.72rem;
    background:rgba(255,255,255,1);
    border-radius:0.20rem;
    margin: 0 auto;
    margin-top: 0.24rem;
    overflow: hidden;
    padding-bottom: 0.3rem;
}
.informTit{
    line-height: 0.8rem;
    margin-left: 0.24rem;
}
.informTit img{
    width: 0.26rem;
    height: 0.26rem;
    float: left;
    margin-top: 0.28rem;
    margin-right: 0.1rem;
}
.informTit span{
    font-size: 0.26rem;
}
.voiceContent > img{
    width: 0.72rem;
    height: 0.72rem;
    margin-left: 0.24rem;
    float: left;
}
.voiceContent{
    overflow: hidden;
}
.voiceList{
    float: left;
    margin-left: 0.2rem;
}
.informDetail{
    margin-top: 0.2rem;
}
.informDetail span{
    color: #010101;
    font-size: 0.26rem;
    margin-left: 0.24rem;
}
.informDetail label{
    color: #999999;
    font-size: 0.26rem;
    margin-left: 0.1rem;
}
.audio {
    width: 3.8rem;
    height: 0.72rem;
    background: #128FEF;
    border-radius: 0.36rem;
    padding: 0.2rem 0 0 0.24rem;
    box-sizing: border-box;
}
.audio img{
   width: 0.24rem;
   height: 0.24rem;
}
.clickPlay{
    float: right;
    margin-right: 0.24rem;
    color: #fff;
    font-size: 0.24rem;
}
.tableContent{
        height: calc(100% - 2.08rem);
    }
.load-p{
        padding: 1rem 0 0 0;
    }
.zanImg img{
    width: 3.6rem;
    height: 3.04rem;
}
.zanImg{
    text-align: center;
    margin-top: 2rem;
}
.zanImg p{
    color: #999999;
    font-size: 0.26rem;
    margin-top: 0.4rem;
}
input[type="search"]::-webkit-search-cancel-button{
    display: none;
    -webkit-appearance: none;
}
</style>
