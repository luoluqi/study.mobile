<template>
    <div class="main">
        <headNav title="作业详情"></headNav>
        <div class="workName">
            {{homeWorkDetail.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}&nbsp;&nbsp;{{homeWorkDetail.SubjectName}}作业
        </div>
       <div class="top">
            <p class="whoSummit">
                {{homeWorkDetail.TeacherName}}老师布置于{{homeWorkDetail.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
            </p>
            <div  class="worktext">
                {{homeWorkDetail.Content}}
            </div>
            <div v-if="homeWorkDetail.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in homeWorkDetail.Voices" :key="index" @click="play(audio)">
                   <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                   <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{homeWorkDetail.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
            <div v-if="homeWorkDetail.Imgs" class="workPhotoList">
                <previewImgDiv  :list="homeWorkDetail.imgArr"></previewImgDiv>
            </div>
            <div v-if="homeWorkDetail.Video && showModel" class="vedio">
                <!-- <div class="videoModel">
                    <img src="@/assets/img/ks.png" alt="">
                </div> -->
                <video playsinline webkit-playsinline :src="homeWorkDetail.Video" width="100%" height="100%"
                    controls
                    controlslist="nodownload  noremoteplayback"
                    oncontextmenu="return false"
                    disablePictureInPicture="true">
                 </video>
            </div>
            <!-- <div v-if="homeWorkDetail.InternetUrl" class="link">
                <a :href="homeWorkDetail.InternetUrl">{{homeWorkDetail.InternetUrl}}</a>
            </div> -->
            <div v-if="homeWorkDetail.InternetUrl" class="link">
                <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                <div>
                    <img :src="homeWorkDetail.InternetImg" alt="">
                </div>

                <div class="a-link-p" @click="goLink(homeWorkDetail.InternetUrl)">
                    <a :href="homeWorkDetail.InternetUrl" target="_blank" class="a-link">{{homeWorkDetail.InternetTitle}}</a> 
                </div>
            </div>
       </div>
       <div v-if="homeWorkDetail.IsCommit == 1 && homeWorkDetail.isSubmit !=1 " class="remind" @click="summitWork(homeWorkDetail.Id)">
            提交作业
        </div>
       <div v-if="parentSubmit" class="mid">
            <p class="whoSummit">
               {{parentSubmit.parentName}}提交于{{parentSubmit.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
           </p>
            <p class="workContent">
                 {{parentSubmit.Content}}
            </p>
            <div v-if="parentSubmit.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in parentSubmit.Voices" :key="index" @click="play(audio)">
                   <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                   <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{parentSubmit.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
            <div v-if="parentSubmit.Imgs" class="workPhotoList">
                <previewImgDiv  :list="parentSubmit.imgArr"></previewImgDiv>
            </div>
            <div v-if="parentSubmit.Video && showModel" class="vedio">
                <!-- <div @click="playVideo" class="videoModel">
                    <img src="@/assets/img/ks.png" alt="">
                </div> -->
                <video playsinline webkit-playsinline :src="parentSubmit.Video" width="100%" height="100%"
                    controls
                    controlslist="nodownload  noremoteplayback"
                    oncontextmenu="return false"
                    disablePictureInPicture="true">
                </video>
            </div>
       </div>
       <div v-if="teacherSubmit" class="bot">
            <p class="whoSummit">
               {{homeWorkDetail.TeacherName}}老师评价于{{teacherSubmit.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
           </p>
           <div class="absolute" v-if="teacherSubmit.Level">
                <div v-if="teacherSubmit.Level=='A'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业完美</p>
                </div>
                <div v-if="teacherSubmit.Level=='B'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业优秀</p>
                </div>
                <div v-if="teacherSubmit.Level=='C'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业良好</p>
                </div>
                <div v-if="teacherSubmit.Level=='D'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业中等</p>
                </div>
                <div v-if="teacherSubmit.Level=='E'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业及格</p>
                </div>
           </div>
           <p class="ab-content">
               {{teacherSubmit.Content}}
           </p>
            <div v-if="teacherSubmit.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in teacherSubmit.Voices" :key="index" @click="play(audio)">
                    <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                   <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{teacherSubmit.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
import { XSwitch  } from 'vux'
import headNav from '@/components/headNav/headNav'
import previewImgDiv from '@/components/preview'
export default {
    name: 'parentsLookWork',
    components: {
       headNav, XSwitch, previewImgDiv
    },
    data () {
        return {
            parentName: '',
            homeWorkDetail: '',
            parentSubmit: '',
            teacherSubmit: '',
            lastid: ''
        }
    },
    computed:{
        homeWorkId () {
            return this.$store.state.homework2.homeWorkId
        },
        showModel () {
            return this.$store.state.media.showModel
        }
    },
    mounted () {
        this.parentName = this.$store.getters['user/realName']
        this.getHomeWorkDetail()
        this.isRead()
    },
    methods :{
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
        getTime (id) {
           return id.timeLength = Math.ceil( document.getElementById(id.url).duration )
        },
        // 提交作业
        summitWork (item) {
            this.$store.state.homework2.summitHomeId = ''
            this.$router.push('parentsSummitWork')
            this.$store.commit('homework2/sethomeWorkId', item)    
        },
        getHomeWorkDetail () {
            var params = {
                id: this.homeWorkId,
                parentId: this.$store.getters['user/parentId'],
                studentId: this.$store.getters['user/studentId'],
            }
            this.$store.dispatch('homework2/GetHomeWorkById' ,params).then(
                res => {
                    console.log(res)
                    if (res.Code == 200) {
                        // 作业详情
                        this.homeWorkDetail =  res.Data
                        this.homeWorkDetail.Imgs = this.homeWorkDetail.Imgs ?  this.homeWorkDetail.Imgs.split(',') : ''
                        if (this.homeWorkDetail.Imgs) {
                           this.homeWorkDetail.imgArr = this.setImgArr(this.homeWorkDetail.Imgs)
                        }
                        this.homeWorkDetail.Voices = this.homeWorkDetail.Voices ?  this.homeWorkDetail.Voices.split(',') : '' 
                        this.homeWorkDetail.VoiceSecond = this.homeWorkDetail.VoiceSecond ?  this.homeWorkDetail.VoiceSecond.split(',') : '' 
                        if (this.homeWorkDetail.Voices) {
                            this.homeWorkDetail.Voices =  this.setVoiceArr( this.homeWorkDetail.Voices)
                        }
                        this.parentSubmit = this.homeWorkDetail.homeworksubmit
                        this.teacherSubmit = this.homeWorkDetail.homeworkreview
                        // 家长提交
                        if (this.parentSubmit) {
                            this.parentSubmit.Imgs =  this.parentSubmit.Imgs ? this.parentSubmit.Imgs.split(',') : ''
                            if (this.parentSubmit.Imgs) {
                                this.parentSubmit.imgArr = this.setImgArr(this.parentSubmit.Imgs)
                            }
                            this.parentSubmit.Voices = this.parentSubmit.Voices ? this.parentSubmit.Voices.split(',') : ''
                            this.parentSubmit.VoiceSecond = this.parentSubmit.VoiceSecond ?  this.parentSubmit.VoiceSecond.split(',') : '' 
                            if (this.parentSubmit.Voices) {
                                this.parentSubmit.Voices =  this.setVoiceArr( this.parentSubmit.Voices)
                            }
                        }
                        // 老师评价
                        if ( this.teacherSubmit) {
                            this.teacherSubmit.Voices = this.teacherSubmit.Voices ? this.teacherSubmit.Voices.split(',') : '' 
                            this.teacherSubmit.VoiceSecond = this.teacherSubmit.VoiceSecond ?  this.teacherSubmit.VoiceSecond.split(',') : ''
                            if (this.teacherSubmit.Voices) {
                                this.teacherSubmit.Voices =  this.setVoiceArr( this.teacherSubmit.Voices)
                            }
                        }
                    } 
                }
            )
        },
        // 设置已读
        isRead (homeWorkId) {
            var params = {
                homeWorkId: [this.homeWorkId],
                studentId:this.$store.getters['user/studentId']
            }
            this.$store.dispatch('homework2/SetRead', params).then(
                res => {
                    console.log(res)
                }
            )
        }
    }
}
</script>
<style scoped src="./css/public.css"></style>
<style scoped>
    .workName{
        padding: 0.32rem 0.24rem 0 0.24rem;
        font-size: 0.36rem;
        color: #333;
        font-weight: bold;
        background: #fff;
    }
    .top,.mid,.bot{
        padding: 0  0.24rem 0.30rem 0.24rem;
        background: #fff;
        margin-bottom: 0.24rem;
    }
    .whoSummit{
        color: #999;
        font-size: 0.28rem;
        padding-top: 0.30rem;
    }
    .workContent{
        color: #333;
        font-size: 0.32rem;
        line-height: 0.5rem;
        padding: 0.22rem 0;
         word-wrap: break-word;
        word-break: normal;
    }
    .worktext{
        padding-bottom: 0.32rem;
        color: #333;
        font-size: 0.32rem;
        word-wrap: break-word;
        word-break: normal;
        white-space: pre-line;
    }
    .absolute{
        height: 1.52rem;
        background: #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.32rem;
    }
    .absolute div{
        text-align: center;
        color: #666;
        font-size: 0.24rem;
    }
    .absolute img{
        width: 0.78rem;
        height: 0.72rem;
    }
    .ab-content{
        color: #333;
        font-size: 0.32rem;
        margin-top: 0.2rem;
    }
    .zhanshou{
        color: #128fef;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        margin: 0 auto;
    }
    .remind{
        width:6.40rem;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.28rem auto;
        font-size: 0.32rem;
    }
</style>