<template>
    <div>
    <div class="content">
            <div class="audioList">
                <!-- <div>{{access_token}}</div>
                <div>{{voiceServerIds}}</div> -->
                 <div class="audio" v-for="(item,index) in voices" :key='index'>
                    <div @click="playAudio(item,index)"> 
                        <img v-if="item == curVoice" src="@/assets/img/voiceGif.gif" alt="">
                        <img v-else src="@/assets/img/homeWork/audioCode.png" alt="">
                        {{timeList[index]}}"
                    </div>
                    
                    <span   @click="deleAudio(index)"  class="deleteIcon">
                        X
                    </span>
                </div>
            </div>
            <div v-if="this.imgData.length>0" class="workPhotoList">
                <!-- <div>{{imgData}}</div>
                <div>{{serverIds}}</div> -->
                <div class="onePhoto" v-for="(item,index) in imgData" :key="index">
                    <img :src="item" alt="">
                    <span class="deleteIcon" @click="delImg(index)">
                        X
                    </span>
                </div>
            </div>
           
            <div :class="showModel ? 'vedio' : 'hideVedio'" v-for="(item,index) in video" :key="index">
                <video v-if="showModel" :src="item" 
                    playsinline webkit-playsinline width="100%" height="100%"
                    controls
                    controlslist="nodownload  noremoteplayback"
                    oncontextmenu = "return false"
                    disablePictureInPicture = "true">
                </video>
                <span v-if="showModel" @click="delVideo(index)" class="deleteIcon2">
                    X
                </span>
            </div>
            <div class="link" v-for="(item,index) in link" :key="index">
                <div>
                    <img :src="item.img" alt="">
                </div>

                <div class="a-link-p">
                   <!-- <a :href="item.url" target="_blank" class="a-link">{{item.title}}</a>  -->
                   <span  href="javaScript:;" class="a-link">{{item.title}}</span> 
                </div>
                <span class="deleteIcon" @click="delUrl">
                    X
                </span>
            </div>
            <div class="link" v-for="(item,index) in filesObj" :key="index">
                <div>
                    <img v-if="item.fileType == 'xls' || item.fileType == 'xlsx'" src="@/assets/img/oa/xlscode.png" alt="">
                    <img v-if="item.fileType == 'pdf'" src="@/assets/img/oa/pdfcode.png" alt="">
                    <img v-if="item.fileType == 'rar' || item.fileType == 'zip'" src="@/assets/img/oa/zipcode.png" alt="">
                    <img v-if="item.fileType == 'ppt'" src="@/assets/img/oa/pptcode.png" alt="">
                    <img v-if="item.fileType == 'doc' || item.fileType == 'docx'" src="@/assets/img/oa/wordcode.png" alt="">
                    <img v-if="item.fileType == 'txt'" src="@/assets/img/oa/txtcode.png" alt="">
                    <img v-if="item.fileType == 'mp4'" src="@/assets/img/oa/videocode.png" alt="">
                    <img v-if="item.fileType == 'mp3'" src="@/assets/img/oa/musiccode.png" alt="">
                    <img v-if="item.fileType == 'jpg' || item.fileType == 'jpeg' || item.fileType == 'png'" src="@/assets/img/oa/piccode.png" alt="">
                </div>

                <div class="a-link-p">
                   <!-- <a :href="item.url" target="_blank" class="a-link">{{item.title}}</a>  -->
                   <span  href="javaScript:;" class="a-link">{{item.fileName}}</span> 
                </div>
                <span class="deleteIcon" @click="delFile">
                    X
                </span>
            </div>
            <div v-show="showProgress" class="video-pro">正在上传视频：{{progress}}%</div>
            <div v-show="showFileProgress" class="video-pro">正在上传文件：{{progress}}%</div>
            <div class="upload">
                <div  @click="startRecord"  class="record-p" v-if="showVoice">
                    <!-- <img src="@/assets/img/homeWork/uploadAudio.png" alt=""> -->
                </div>
                <img v-show="imgData.length < 9" @click="chooseImage" src="@/assets/img/homeWork/uploadPhoto.png" alt="" v-if="showImg">
                <div class="video-p" v-if="showVideo">
                    <div v-if="video.length == 0">
                         <img src="@/assets/img/homeWork/uploadVideo.png" alt="">
                        <input ref='videoFile' @change="changeVideo" class="video-file" type="file" accept="video/*">
                    </div>
                    <div v-else>
                        <img @click="limitVideo" src="@/assets/img/homeWork/uploadVideo.png" alt="">
                    </div>
                </div>
                <img @click="chooseLink" src="@/assets/img/homeWork/uploadLink.png" alt="" v-if="showLink">
                <div class="video-p" v-if="showFile">
                    <div>
                        <img src="@/assets/img/homeWork/uploadFile.png" alt="">
                        <input ref='files' @change="changeFile" class="video-file" type="file" accept="/*">
                    </div>
                </div>
            </div>
        </div>
      
        <!-- 链接弹框 -->
        <div class="remark-d" v-if="isUrl">
            <div class="win">
                <div class="re-d-c">
                    <div class="remark-operation">
                        <span class="left" @click="chooseLinkHide">取消</span>
                        <span class="right" @click="chooseLinkSend">确定</span>
                    </div>
                    <div class="remark-a">
                        <input type="text" v-model="urlLink" placeholder="请输入网址">
                    </div>
                </div>
            </div>
        </div>
        <!-- 录音弹框 -->
        <div class="remark-d" v-if="isRecord">
            <div class="win">
                <div class="re-d-c">
                    <!-- <div class="remark-operation">正在录音 {{time}}...</div> -->
                     <div class="vux-circle-demo">
                          <span style="color:#36D1DC;font-size: 0.3rem;">{{time}}s</span>
                        <div style='width:2rem;height:2rem;margin-top: 0.3rem;'>
                        <x-circle
                            :percent="percent"
                            :stroke-width="6"
                            :trail-width="6"
                            :stroke-color="['#36D1DC', '#5B86E5']"
                            trail-color="#ececec">
                            <span class="endRecord" @click="stopRecord">结束</span>
                        </x-circle>
                        </div>
                    </div>
                    <!-- <div class="stop-btn" @click="stopRecord">结束录音</div> -->
                
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import COS from '@/util/COS'
import { XCircle } from 'vux'
import {getLinkInfo} from '@/api/commonApi'
export default {
    components: {
    XCircle
  },
    props:{
        showVoice:{
            type: Boolean,
            default: true
        },
        showImg:{
            type: Boolean,
            default: true
        },
        showVideo:{
            type: Boolean,
            default: true
        },
        showLink:{
            type: Boolean,
            default: true
        },
        showFile: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        filesObj () {
            return this.$store.state.media.filesObj
        },
        voices () {
            return this.$store.state.media.voices
        },
        imgData () {
            return this.$store.state.media.imgData
        },
        voiceServerIds () {
            return this.$store.state.media.voiceServerIds
        },
        serverIds () {
            return this.$store.state.media.serverIds
        },
        video () {
            return this.$store.state.media.video
        },
        link () {
            return this.$store.state.media.link
        },
        timeList () {
            return this.$store.state.media.timeList
        },
        showModel () {
            return this.$store.state.media.showModel
        },
        schoolId () {
            return this.$store.getters['user/schoolId']
        },
        access_token(){
            return this.$store.state.media.access_token
        }
    },
    data () {
        return {
           
            isUrl: false,
            urlLink:'',
            curVoice: '',

            showProgress: false,
            showFileProgress: false,
            progress: 0,

            isRecord: false,
            time: -1,
        
            percent: 0,
            voiceTimer: null,
            voiceIndex:0,

            interval: null
        }
    },
    methods: {
        // 开始录制
        startRecord () {
            if (this.voices.length >= 3) {
                 this.$vux.toast.text('只能上传三个录音', 'top')
                return
            }
            console.log('start record')
            wx.stopVoice({
                localId: this.curVoice
            })
            this.curVoice = ''
            wx.startRecord()
            this.isRecord = true
            this.$store.commit('media/changeModel', false)
            this.time = -1
            this.percent= 0
            this.timer()
        },
        timer(){
            if(!this.isRecord){

                return
            }

            this.time++
            this.percent = this.time/60*100
            if(this.time >= 59){
               
                this.stopRecord()
                return
            }
            this.interval = setTimeout(() => {
                this.timer()
            }, 1000)
        },
        // 停止录制
        stopRecord () {
            if (this.time<6) {
                this.$vux.toast.text('录制时间不得小于6秒')
                this.isRecord = false
                this.$store.commit('media/changeModel', true)
                clearTimeout(this.interval)
                 wx.stopRecord({})
                return
            }
            console.log('stop record')
            var self = this
           wx.stopRecord({
                success: function (res) {
                    console.log(res)
                    var localId = res.localId;
                    self.$store.commit('media/addVoice', localId)

                    
                }
            })

            this.isRecord = false
            this.$store.commit('media/changeModel', true)
            clearTimeout(this.interval)
            self.$store.commit('media/addTime', this.time)
        },
        // 播放语音
        playAudio(item,index){
            console.log(item)
            this.voiceIndex = index
            this.clearVoiceTimer()

            if (this.curVoice == '') {
                 wx.playVoice({
                    localId: item
                });
                this.curVoice = item
                this.startVoiceTimer()
            } else if (this.curVoice == item) {
                 wx.stopVoice({
                    localId: item
                })
                this.curVoice = ''
            } else {
                 wx.stopVoice({
                    localId: this.curVoice
                })
                this.curVoice = ''
                 wx.playVoice({
                    localId: item
                });
                this.curVoice = item
                this.startVoiceTimer()
            }
           
        },
        startVoiceTimer(){
            this.clearVoiceTimer()
            this.voiceTimer = setTimeout(() => {
                this.playAudioOver()
            }, this.timeList[this.voiceIndex] * 1000)
        },
        clearVoiceTimer(){
            if(this.voiceTimer){
                clearTimeout(this.voiceTimer)
                this.voiceTimer = null
            }
        },
        playAudioOver(){
            this.curVoice = ''
        },
        // 删除 语音
        deleAudio(index){
            wx.stopVoice({
                localId: this.voices[index]
            })
             this.$store.commit('media/delVoice', index)
             this.$store.commit('media/delTime', index)
        },
        
        // 图片
        chooseImage(){
            this.$store.dispatch('media/chooseImage').then(() => { 
                this.$emit('chooseImageSuccess')
            })
        },
       
        delImg(index){
           this.$store.commit('media/delImg', index)
        },
        limitVideo() {
             this.$vux.toast.text('只能上传一个视频', 'top')
        },
        changeVideo(e){
            var self = this
                var file = e.target.files[0]
                var size = file.size
                if(size > 1000 * 1024 * 250){
                    this.$vux.toast.text('只能上传250M以内的视频', 'top')
                    return 
                }
                var name = file.name
                function progress(progressData) {
                    console.log(progressData)
                    self.progress = Math.floor(progressData.percent * 100)
                   
                    self.showProgress = true
                    
                }
                COS.putObject(file, progress).then(res => {
                    console.log(res)
                    this.$refs.videoFile.value = ''
                    this.$store.commit('media/addVideo', res)
                    self.showProgress = false
                })
            
            
        },
        delVideo(index){
            this.$store.commit('media/delVideo', index)
        },
        // 上传文件
        changeFile(e){
            if (this.filesObj.length >= 9) {
                 this.$vux.toast.text('最多只能上传9个文件', 'top')
                return
            }
            var self = this
            var file = e.target.files[0]
            var size = file.size
            if(size > 1000 * 1024 * 30){
                this.$vux.toast.text('只能上传30M以内的文件', 'top')
                return 
            }
            var name = file.name
            function progress(progressData) {
                console.log(progressData)
                self.progress = Math.floor(progressData.percent * 100)
                
                self.showFileProgress = true
                
            }
            COS.putObject(file, progress).then(res => {
                var oneFile = file.name.split('.')
                var obj = {fileName: oneFile[0], fileType: oneFile[1]}
                this.$refs.files.value = ''
                this.$store.commit('media/addFile', res)
                this.$store.commit('media/addFileName', oneFile[0])
                this.$store.commit('media/addFileObj', obj)
                self.showFileProgress = false
            })
        },
        delFile(index){
            this.$store.commit('media/delFile', index)
            this.$store.commit('media/delFileName', index)
        },
        // 链接 
        chooseLink () {
            if(this.link.length >= 1){
                this.$vux.toast.text('只能上传一个链接', 'top')
                return
            }
            this.isUrl = true
            this.$store.commit('media/changeModel', false)
            // this.urlLink = ''
        },
        chooseLinkHide () {
            this.isUrl = false
            this.$store.commit('media/changeModel', true)
            // this.urlLink = ''
        },
        chooseLinkSend () {
           this.isUrl = false
           this.$store.commit('media/changeModel', true)
           getLinkInfo({
               url: this.urlLink
           }).then(res => {
               if(!res){
                   this.$vux.toast.text('无效地址')
                   return
               }
               if (res.Code == 200) {
                    if (!res.Data) {
                       this.$vux.toast.text('无效地址')
                    }else{
                       this.$store.commit('media/addLink',  {
                            url: this.urlLink,
                            title: res.Data.title,
                            img: res.Data.iconImgUrl
                        })
                    }
                } else {
                   this.$vux.toast.text(res.Msg)
                }
           })
           
        },
        delUrl (index) {
            this.$store.commit('media/delLink',  index)
        },
        toLink(url){
            this.$store.dispatch('link/toLink', url)
        }
    },
    mounted () {
        console.log('media mounted ... ')
        var self = this
        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                alert('on voice record end..')
                var localId = res.localId
                 self.$store.commit('media/addVoice', localId)
                 self.isRecord = false
            }
        })

        wx.onVoicePlayEnd({
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
            }
        })
    },
    destroyed () {
        console.log('media destroyed...')
        this.$store.commit('media/clear')
        this.urlLink = ''
        this.showProgress = false
        this.showFileProgress = false
    }
}
</script>
<style scoped>
.endRecord{
  color:#36D1DC;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.32rem;
}
.vux-circle-demo {
  padding-top: 20px;
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
    .content{
       padding: 0.32rem 0.24rem 0 0.24rem;
       background: #fff;
    }
    .audioList{
        display: flex;
        flex-wrap: wrap;
    }
    .audio{
        position: relative;
        color: #333;
        font-size: 0.28rem;
        display: flex;
        align-items: center;
        padding: 0 0.3rem;
        width:1.36rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        border: 0.01rem solid #d2d2d2;
        margin: 0 0.2rem 0.2rem 0;
    }
    .audio img{
        width: 0.24rem;
        height: 0.3rem;
        margin-right: 0.12rem;
    }
    .workPhotoList{
        display: flex;
        margin: 0.32rem -0.16rem 0 -0.16rem;
        /* justify-content: space-between; */
        flex-wrap: wrap;
    }
    .onePhoto{
        position: relative;
        width: 1.44rem;
        height: 1.44rem;
        border-radius: 0.08rem;
        margin-bottom: 0.32rem;
        padding: 0 0.3rem;
    }
    .onePhoto img{
        width: 100%; 
        height: 100%; 
        object-fit: cover;
    }
    .vedio{
        position: relative;
        width: 96%;
        height: 3.88rem;
        background: #000;
        margin-bottom: 0.32rem;
        box-sizing: border-box;
    }
    .hideVedio{
        position: relative;
        width: 96%;
        height: 3.88rem;
        margin-bottom: 0.32rem;
        box-sizing: border-box;
    }
    .link{
        position: relative;
        height: 0.84rem;
        background: #f7f7f7;
        display: flex;
        align-items: center;
        margin-bottom: 0.32rem;
        font-size: 0.28rem;
        color: #333;
        padding: 0 0.08rem;
    }
    .link div:first-child{
        width: 0.78rem;
        height: 0.7rem;
        margin-right: 0.12rem;
    }
    .link img{
        max-width: 100%;
        max-height: 100%;
    }
    .link div:last-child{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-emphasis: emphasis;
    }
    .deleteIcon{
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 50%;
        background: rgba(0,0,0,0.3);
        color: #FFF;
        text-align: center;
        z-index: 101;
    }
    .deleteIcon2{
        position: absolute;
        top: -0.3rem;
        right: -0.3rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 50%;
        background: rgba(0,0,0,0.3);
        color: #FFF;
        text-align: center;
        z-index: 101;
    }
    .upload{
        height: 0.96rem;
        display: flex;
        align-items: center;
    }
    .upload img{
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.42rem;
        vertical-align: middle;
        display: inline-block;
    }
     .win{
        width:100%;
        height:100%;
        position:fixed;
        left:0;
        top:0;
        right: 0;
        bottom: 0;
        z-index:998;
        background-color:rgba(0,0,0,0.5);
        }
        .re-d-c{
        width:6.80rem;
        height:3.6rem;
        background:rgba(255,255,255,1);
        border-radius:0.10rem;
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        z-index: 999;
    }
     .remark-operation{
        height: 0.88rem;
        line-height: 0.88rem;
        padding: 0 0.27rem;
        font-size: 0.32rem;
        color: #128FEF;

    }
     .remark-a input{
         width: 6rem;
        height: 0.76rem;
        border: 1px solid #e5e5e5;
        margin-left: 0.3rem;
        font-size: 0.26rem;
        padding: 0 0.1rem;
        margin-top: 0.5rem;
    }
.left{
        float: left;
    }
.right{
    float: right;
}
.video-p{
    display:inline-block;
    position: relative;
    vertical-align: middle;
}
.video-file{
    position: absolute;
    top:0;
    left: 0;
    width:0.5rem;
    height:0.5rem;
    opacity: 0;
}
.record-p{
     display:inline-block;
     vertical-align: middle;
    position: relative;
    background: url(../assets/img/homeWork/uploadAudio.png);
        width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.42rem;
        background-size: cover;
}
.video-pro{
    color:#0a8de5;
}
.stop-btn{
        width: 6.40rem;
    height: 0.80rem;
    background: rgba(18,143,239,1);
    border-radius: 0.08rem;
    line-height: 0.8rem;
    text-align: center;
    color: #ffffff;
    margin: 0.28rem auto;
    font-size: 0.32rem;
}
.a-link-p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 5.5rem;
    color:#333;
}
.a-link{
    color:#333;
}
</style>
