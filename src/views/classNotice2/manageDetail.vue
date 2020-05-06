<template>
    <div id="noticeDetail">
        <headNav title="通知详情"></headNav>
        <div class="workName">
            {{noticeDetail.Title}}
            <p class="whoSummit">
                {{noticeDetail.TeacherName}}老师发布于 {{noticeDetail.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
            </p>
            <!-- <span class="imgBox">
                <img src="@/assets/img/notice/sure.png" alt="">
            </span> -->
        </div>
        <div class="detail-top">
            <div  class="worktext">
                 {{noticeDetail.Content}}
            </div>
             <div v-if="noticeDetail.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in noticeDetail.Voices" :key='index' @click="play(audio)" >
                    <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                    <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{noticeDetail.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
            <div v-if="noticeDetail.Imgs" class="workPhotoList">
                <previewImgDiv  :list="noticeDetail.imgArr"></previewImgDiv>
            </div>
            <div v-if="noticeDetail.Video && showModel" class="vedio">
                <video :src="noticeDetail.Video" playsinline webkit-playsinline width="100%" height="100%"
                  controls
                    controlslist="nodownload  noremoteplayback"
                    oncontextmenu = "return false"
                    disablePictureInPicture = "true"
                ></video>
            </div>
            <div v-if="noticeDetail.InternetUrl" class="link">
                <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                <div>
                    <img :src="noticeDetail.InternetImg" alt="">
                </div>

                <div class="a-link-p" @click="goLink(noticeDetail.InternetUrl)">
                    <a :href="noticeDetail.InternetUrl" target="_blank" class="a-link">{{noticeDetail.InternetTitle}}</a> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import previewImgDiv from '@/components/preview'
export default {
    //name:'noticeDetail',
     components:{
       headNav, previewImgDiv
    },
    data() {
        return {
            noticeDetail: '',
            lastid: ''
        }
    },
    computed: {
        noticeId () {
            return this.$store.state.notice2.noticeId
        },
        showModel () {
            return this.$store.state.media.showModel
        }
    },
    mounted () {
        this.getDetail()
    },
    methods: {
        // 去链接地址
        goLink(url){
            if(url){
                this.$store.state.homework2.iframeUrl = url
                this.$router.push('../homework2/iframe')
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
        getDetail () {
            var params = {
                teachId:this.$store.getters['user/teacherId'],
                id: this.noticeId
            }
            this.$store.dispatch('notice2/GetNoticesById', params).then(
                res => {
                    if (res.Code == 200) {
                        this.noticeDetail = res.Data
                        this.noticeDetail.Imgs =  this.noticeDetail.Imgs ? this.noticeDetail.Imgs.split(',') : ''
                        if ( this.noticeDetail.Imgs) {
                            this.noticeDetail.imgArr = this.setImgArr(this.noticeDetail.Imgs)
                        }
                        this.noticeDetail.Voices = this.noticeDetail.Voices ? this.noticeDetail.Voices.split(',') : '' 
                        this.noticeDetail.VoiceSecond = this.noticeDetail.VoiceSecond ? this.noticeDetail.VoiceSecond.split(',') : '' 
                        if (this.noticeDetail.Voices) {
                            this.noticeDetail.Voices =  this.setVoiceArr( this.noticeDetail.Voices)
                        }
                    }
                }
            )
        }
    }
}
</script>
<style src="./css/public.css"></style>
<style  scoped>
    .workName .imgBox{
        position: absolute;
        top: 0.32rem;
        right: 0.26rem;
        display: inline-block;
        
    }
    .imgBox img{
        width: 1rem;
        height: 0.64rem;
    }
</style>