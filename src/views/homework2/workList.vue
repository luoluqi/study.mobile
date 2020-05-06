<template>
    <div class="main">
        <headNav title="发布作业"></headNav>
        <div class="punish" @click="newsWork">
            发布作业
        </div>
        <!-- 作业列表 -->
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
                                <p>{{item.CreateTime | formatDateTime('MM-DD HH:mm')}}</p>
                            </div>
                            <div v-if="item.IsCommit == 1" class="tijiao">
                                <img src="@/assets/img/homeWork/tijiao.png" alt="">
                            </div>
                        </div>
                        <div class="w-right">
                            {{item.SubjectName}}
                        </div>
                    </div>
                    <div  :class="item.isOpen ? 'worktext2' : 'worktext'">
                        {{item.Content}}
                    </div>
                    <div v-if="!item.isOpen && item.Content.length > 0" class="zhanshou" @click="unfold(index)">展开</div>
                    <div v-if="item.isOpen" class="zhanshou" @click="unfold(index)">收起</div>
                    <div class="audioList" v-if="item.Voices">
                        <div class="audio" v-for="(voice,index) in item.Voices" :key="index" @click="play(voice)">
                            <img v-if="!voice.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                            <img v-else src="@/assets/img/voiceGif.gif" alt="">
                            <!-- {{timeList[index]}}" -->
                            <span>{{item.VoiceSecond[index]}}"</span>
                            <audio style="display:none" duration :src="voice.url" :id="voice.url" controls></audio>
                        </div>
                    </div>
                    
                    <div v-if="item.Imgs" class="workPhotoList">
                        <pre-view :list='item.listArr'></pre-view>
                    </div>
                    
                    <div class="vedio" v-if="item.Video && showModel">
                        <video :src="item.Video" width="100%" height="100%" 
                            playsinline webkit-playsinline
                            controls
                            controlslist="nodownload  noremoteplayback"
                            oncontextmenu = "return false"
                            disablePictureInPicture = "true"
                         ></video>
                    </div>
                    <div v-if="item.InternetUrl" class="link">
                        <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                        <div>
                            <img :src="item.InternetImg" alt="">
                        </div>

                        <div class="a-link-p" @click="goLink(item.InternetUrl)">
                            <a :href="item.InternetUrl" target="_blank" class="a-link">{{item.InternetTitle}}</a> 
                        </div>
                    </div>
                    <div class="zan">
                        <!-- <div>
                            <img src="@/assets/img/homeWork/zan.png" alt="">
                            赞一个
                        </div> -->
                        <div class="zaned">
                            <img src="@/assets/img/homeWork/zaning.png" alt="">
                            {{item.likeNumber}}
                        </div>
                        <div @click="isread(item)">
                            已查看 {{item.readNumber}}/{{item.Number}}
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
import headNav from '@/components/headNav/headNav';
import infiniteScroll from '@/components/infiniteScroll'
import preView from '@/components/preview'
import { LoadMore} from 'vux'
export default {
    name: 'workList',
    components:{
        headNav,
        infiniteScroll,
        LoadMore,
        preView
    },
    data () {
        return {
            lastId: '',
           pageIndex:0,
           pageSize:3,
           workList:[],
           isMore:true,
           isOpen:false
        }
    },
    computed: {
        showModel () {
            return this.$store.state.media.showModel
        }
    },
    activated () {
         if(this.$store.state.homework2.work == 1){
              this.pageIndex = 0
              this.isMore = true
              this.workList = []
              this.getWorkList()
        }
        if(!this.$store.state.homework2.work){
            this.getWorkList()
        }
    },
    methods: {
        // 去链接地址
        goLink(url){
            if(url){
                this.$store.state.homework2.iframeUrl = url
                this.$router.push('iframe')
            }
        },
        play (id) {
            if( this.lastid && this.lastid != id) {
                document.getElementById(this.lastid.url).pause()
                document.getElementById(this.lastid.url).load()
                this.lastid.isPlay =false
            }
            var music = document.getElementById(id.url)
            // this.time =Math.floor(music.duration)
            if (music.paused){
                music.play()
                id.isPlay = true
                this.lastid = id
            } else {
                music.pause()
                id.isPlay = false
            }
            var isend = document.getElementById(id.url)
            isend.addEventListener('ended', function () {  
                id.isPlay = false
            }, false)
        
        },
        unfold(index){
            this.workList[index].isOpen =  !this.workList[index].isOpen 
        },
        newsWork () {
             this.workList.forEach(
                 (item,index)=>{
                      if (item.Voices) {
                        item.Voices.forEach((item2,index) => {
                            item2.isPlay = false
                        });
                    }
                 }
             )
             this.$router.push('punish')
        },
        getWorkList () {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var prams = {
                teachId:this.$store.getters['user/teacherId'],
                schoolId:this.$store.getters['user/schoolId'],
                gradeId:'',
                classId:'',
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            }
            this.$store.dispatch('homework2/GetHomeWorkList',prams).then((data) => {
                if(data.Code == 200){
                     if(data.Data.List){
                            if(data.Data.List.length < this.pageSize){
                                this.isMore = false
                            }
                            for(var item of data.Data.List){
                                item.isOpen = false
                                if(item.Imgs){
                                    item.Imgs = item.Imgs.split(',')
                                    item.listArr = this.setImgArr(item.Imgs)
                                }else{
                                    item.Imgs = ''
                                }
                                if(item.Voices){
                                    item.Voices = item.Voices.split(',')
                                    var arr = []
                                    for (var item2 of item.Voices) {
                                        var obj = {url: item2, isPlay: false}
                                        arr.push(obj)
                                    }
                                    item.Voices =  arr
                                }else{
                                    item.Voices = ''
                                }
                                if (item.VoiceSecond) {
                                    item.VoiceSecond = item.VoiceSecond.split(',')
                                }else {
                                    item.VoiceSecond = []
                                }
                            }
                            this.workList = this.workList.concat(data.Data.List)
                            console.log(this.workList)
                            
                     }else{
                    this.isMore = false
                  }
                }
            })
        },
        isread (item) {
            if (item.Voices) {
                item.Voices.forEach((item2,index) => {
                    item2.isPlay = false
                });
            }
            this.$store.state.homework2.homeworkItem = item
            localStorage.setItem('homeworkItem', JSON.stringify(item))
            this.$router.push('workDetail')
        },
        loadMore(){
            this.getWorkList()
        }
    }
}
</script>
<style scoped src="@/assets/css/homeWork2.css"></style>
<style scoped src="./css/public.css"></style>
<style scoped>
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
        margin-bottom: 0.2rem;
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
    
</style>