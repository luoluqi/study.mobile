<template>
    <div id="noticeDetail">
        <headNav title="通知详情"></headNav>
        <div class="workName">
            {{noticeItem.Title}}
            <p class="whoSummit">
                {{noticeItem.TeacherName}}老师发布于{{noticeItem.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
            </p>
            <span class="imgBox" v-if="noticeItem.isConfirm != 0">
                <img src="@/assets/img/notice/sure.png" alt="">
            </span>
        </div>
        <div class="detail-top">
            <div  class="worktext worktext2">
                {{noticeItem.Content}}
            </div>
            <div v-if="noticeItem.Voices" class="audioList">
                <div class="audio" v-for="(audio,index) in noticeItem.Voices" :key='index' @click="play(audio)" >
                    <img v-if="!audio.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                    <img v-else src="@/assets/img/voiceGif.gif" alt="">
                    <!-- {{timeList[index]}}" -->
                    <span>{{noticeItem.VoiceSecond[index]}}"</span>
                    <audio style="display:none" duration :src="audio.url" :id="audio.url" controls></audio>
                </div>
            </div>
            <div v-if="noticeItem.Imgs" class="workPhotoList">
                <previewImgDiv  :list="noticeItem.imgArr"></previewImgDiv>
            </div>
            <div v-if="noticeItem.Video && showModel" class="vedio">
                <video :src="noticeItem.Video" playsinline webkit-playsinline width="100%" height="100%" 
                   controls
                    controlslist="nodownload  noremoteplayback"
                    oncontextmenu = "return false"
                    disablePictureInPicture = "true"
                ></video>
            </div>
            <div v-if="noticeItem.InternetUrl" class="link">
                <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                <div>
                    <img :src="noticeItem.InternetImg" alt="">
                </div>

                <div class="a-link-p" @click="goLink(noticeItem.InternetUrl)">
                    <a :href="noticeItem.InternetUrl" target="_blank" class="a-link">{{noticeItem.InternetTitle}}</a> 
                </div>
            </div>
            <div class="zan">
                <div v-if="noticeItem.isLike == 0" @click="addLike(noticeItem.Id)">
                    <img src="@/assets/img/homeWork/zan.png" alt="">
                    赞一个
                </div>
                <div v-else class="zaned">
                    <img src="@/assets/img/homeWork/zaning.png" alt="">
                    {{noticeItem.likeNumber}}
                </div>
            </div>
        </div>
        <div class="remind" v-if="noticeItem.isConfirm == 0 && noticeItem.IsCommit != 0" @click="confirm">提交回执</div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import previewImgDiv from '@/components/preview'
export default {
    name:'noticeDetail',
     components:{
       headNav, previewImgDiv
    },
    data() {
        return {
            noticeItem:'',
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
    mounted(){
        this.getDetail()
        this.isRead()
    },
    methods:{
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
                parentId:this.$store.getters['user/parentId'],
                id: this.noticeId
            }
            this.$store.dispatch('notice2/GetNoticeByParent', params).then(
                res => {
                    if (res.Code == 200) {
                        this.noticeItem = res.Data
                        this.noticeItem.Imgs =  this.noticeItem.Imgs ? this.noticeItem.Imgs.split(',') : ''
                        if (this.noticeItem.Imgs) {
                            this.noticeItem.imgArr = this.setImgArr(this.noticeItem.Imgs)
                        }
                        this.noticeItem.Voices = this.noticeItem.Voices ? this.noticeItem.Voices.split(',') : '' 
                        this.noticeItem.VoiceSecond = this.noticeItem.VoiceSecond ? this.noticeItem.VoiceSecond.split(',') : '' 
                        if (this.noticeItem.Voices) {
                            this.noticeItem.Voices =  this.setVoiceArr( this.noticeItem.Voices)
                        }
                    }
                }
            )
        },
        // 点赞
        addLike(id){
           var params = {
                NoticeId: id,
                ParentId: this.$store.getters['user/parentId'],
                ParentName: this.$store.getters['user/realName']
            }
            this.$store.dispatch('notice2/AddLike', params).then(data => {
                    if (data.Code == 200) {
                        this.$vux.toast.text('点赞成功', 'top')
                        this.noticeItem.isLike = 1
                        this.noticeItem.likeNumber += 1
                    } else {
                        this.$vux.toast.text(data.Msg, 'top')
                    }
               }
           )
        },
        // 提交回执
       confirm(){
           var params = {
                noticeId: this.noticeId,
                parentId: this.$store.getters['user/parentId']
            }
            this.$store.dispatch('notice2/SetConfirm', params).then(data => {
                    if (data.Code == 200) {
                        this.noticeItem.isConfirm = 1
                        this.$vux.toast.text('提交回执成功', 'top')
                    }
               }
           )
       },
       // 设置已读
       isRead(){
           var params = {
                noticeId: this.noticeId,
                parentId: this.$store.getters['user/parentId']
            }
            this.$store.dispatch('notice2/SetRead', params).then(data => {
                    if (data.Code == 200) {
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
    .worktext2{
        white-space: pre-wrap;
    }
</style>