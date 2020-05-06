<template>
    <div class="main">
        <headNav title="作业详情"></headNav>
        <div class="workName">
            {{workData.CreateTime | formatDateTime('YYYY-MM-DD')}}&nbsp;&nbsp;{{workData.SubjectName}}作业
        </div>
        <!-- 作业内容 -->
       <div class="top">
           <p class="whoSummit">
               {{workData.TeacherName}}老师布置于 {{workData.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
           </p>
           <p class="workContent">
                {{workData.Content}}
           </p>
           <div v-if="workData.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in workData.Voices" :key="index" @click="play(audio)">
                     <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                     <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{workData.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
            <div class="workPhotoList">
                 <pre-view :list='workData.listArr'></pre-view>
                <!-- <div class="onePhoto" v-for="(img,index) in workData.Imgs"  :key='index' @click="previewImg(workData.Imgs,img)">
                    <img :src="img" alt="">
                </div> -->
            </div>
            <div class="vedio" v-if="workData.Video && showModel">
                <video :src="workData.Video" width="100%" height="100%" controls="controls"></video>
            </div>
            <div v-if="workData.InternetUrl" class="link">
                <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                <div>
                    <img :src="workData.InternetImg" alt="">
                </div>

                <div class="a-link-p" @click="goLink(workData.InternetUrl)">
                    <a :href="workData.InternetUrl" target="_blank" class="a-link">{{workData.InternetTitle}}</a> 
                </div>
            </div>
       </div>
       <!-- 提交的答案 -->
       <div v-if="homeworksubmit" class="mid">
            <p class="whoSummit">
               {{homeworksubmit.parentName}}提交于{{homeworksubmit.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
               
           </p>
            <p class="workContent">
                {{homeworksubmit.Content}}
            </p>
            <div v-if="homeworksubmit.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in homeworksubmit.Voices" :key="index" @click="play(audio)">
                    <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                     <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{homeworksubmit.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
            <div class="workPhotoList">
                 <pre-view :list='homeworksubmit.listArr'></pre-view>
                <!-- <div class="onePhoto" v-for="(img,index) in homeworksubmit.Imgs"  :key='index'  @click="parent_previewImg(homeworksubmit.Imgs,img)">
                    <img :src="img" alt="">
                </div> -->
            </div>
            <div v-if="homeworksubmit.Video && showModel" class="vedio">
                <video :src="homeworksubmit.Video" width="100%" height="100%" controls="controls"></video>
            </div>
       </div>
       <!-- 老师的评价 -->
       <div v-if="homeworkreview" class="bot">
            <p class="whoSummit">
               
               {{homeworkreview.teachName}}老师评价于 {{homeworkreview.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
           </p>
           <div class="absolute" v-if="homeworkreview.Level">
                <div v-if="homeworkreview.Level=='A'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业完美</p>
                </div>
                <div v-if="homeworkreview.Level=='B'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业优秀</p>
                </div>
                <div v-if="homeworkreview.Level=='C'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业良好</p>
                </div>
                <div v-if="homeworkreview.Level=='D'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业中等</p>
                </div>
                <div v-if="homeworkreview.Level=='E'">
                    <img src="@/assets/img/homeWork/wanmei.png" alt="">
                    <p>作业及格</p>
                </div>
           </div>
           <div v-if="homeworkreview.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in homeworkreview.Voices" :key="index" @click="play(audio)">
                  <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                     <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{homeworkreview.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
           <p class="ab-content">
               {{homeworkreview.Content}}
           </p>
       </div>
    </div>
</template>

<script>
import { XSwitch  } from 'vux'
import headNav from '@/components/headNav/headNav';
import preView from '@/components/preview'
export default {
    components: {
        XSwitch,
        headNav,
        preView
    },
    name: 'lookWork',
    data () {
        return {
           remarkData:'',
           workData:'',
           homeworksubmit:'',
           homeworkreview:'',
           lastid: ''
        }
    },
     computed: {
        showModel () {
            return this.$store.state.media.showModel
        },
        homeWorkId () {
            return this.$store.state.homework2.homeWorkId
        },
        stuId(){
            return this.$store.state.homework2.stuId
        }
    },
    mounted(){
        this.getHomeWorkDetail()
    },
    methods:{
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
          getHomeWorkDetail () {
                var prams ={
                    id: this.homeWorkId,
                    teacherId: this.$store.getters['user/teacherId'],
                    studentId: this.stuId
                }
              this.$store.dispatch('homework2/GetHomeWorkByTeacher', prams).then(
                  res => {
                      if (res.Code == 200) {
                          
                            this.remarkData = res.Data
                            this.workData = res.Data
                            this.workData.Imgs = this.workData.Imgs ? this.workData.Imgs.split(',') : ''
                            this.workData.Voices = this.workData.Voices ? this.workData.Voices.split(',') : ''
                            this.workData.VoiceSecond = this.workData.VoiceSecond ? this.workData.VoiceSecond.split(',') : ''
                            if (this.workData.Voices) {
                                this.workData.Voices =  this.setVoiceArr( this.workData.Voices)
                            }
                            if (this.workData.Imgs) {
                                this.workData.listArr = this.setImgArr(this.workData.Imgs)
                            }
                            
                            this.homeworksubmit = this.remarkData.homeworksubmit
                            this.homeworksubmit.Imgs = this.homeworksubmit.Imgs ? this.homeworksubmit.Imgs.split(',') : ''
                            this.homeworksubmit.Voices = this.homeworksubmit.Voices ? this.homeworksubmit.Voices.split(',') : ''
                            if (this.homeworksubmit.Voices) {
                                this.homeworksubmit.Voices =  this.setVoiceArr( this.homeworksubmit.Voices)
                            }
                            this.homeworksubmit.VoiceSecond = this.homeworksubmit.VoiceSecond ? this.homeworksubmit.VoiceSecond.split(',') : ''
                            if (this.homeworksubmit.Imgs) {
                                this.homeworksubmit.listArr = this.setImgArr(this.homeworksubmit.Imgs)
                            }
                            
                            this.homeworkreview = this.remarkData.Homeworkreview
                            if (this.homeworkreview) {
                                this.homeworkreview.Voices = this.homeworkreview.Voices ? this.homeworkreview.Voices.split(',') : ''
                                if (this.homeworkreview.Voices) {
                                    this.homeworkreview.Voices =  this.setVoiceArr( this.homeworkreview.Voices)
                                }
                                this.homeworkreview.VoiceSecond = this.homeworkreview.VoiceSecond ? this.homeworkreview.VoiceSecond.split(',') : ''
                            }
                            console.log(this.remarkData)
                      }
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
    .top,.mid{
        padding: 0  0.24rem;
        background: #fff;
        margin-bottom: 0.24rem;
        box-sizing: border-box;
        height: max-content;
    }
    .bot{
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
   
    .absolute{
        height: 1.52rem;
        background: #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.32rem 0;
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
</style>