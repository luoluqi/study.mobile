<template>
    <div class="main">
        <headNav title="提交作业"></headNav>
        <textarea  name="" id="" maxlength="1000" placeholder="请输入作业内容，最多可输入1000字" v-model.trim="content"></textarea>
        <media :showLink="false"></media>
        <div @click="addWork" class="summitButton" v-if="uploadError">提交</div>
        <div class="summitButton2" v-else>提交中...</div>
        <div v-if='!uploadError' class="model">

        </div>
    </div>
</template>

<script>
import headNav from '@/components/headNav/headNav'
import {uploadFile} from "@/api/circleApi"
import { XSwitch  } from 'vux'
import {uploadWechatImg} from '@/api/commonApi'
import media from '@/components/media'
export default {
    name: 'parentsSummitWork',
    components: {
        headNav, XSwitch,media
    },
    data () {
        return {
            serverIds: [],
            imgData: [],
            content: '',
            audio: [],
            audioData: [],
            audioServerIds: [],
            video: '',
            videoUrl: '',
            localVedioUrl: ''
        }
    },
    computed: {
        homeWorkId () {
            return this.$store.state.homework2.homeWorkId
        },
        uploadError () {
            return this.$store.state.media.uploadError
        }
    },
    destroyed(){
        this.$store.state.media.uploadError = true
    },
    mounted () {
       
    },
    methods: {
        check () {
            if (!this.content && this.$store.state.media.imgDataSource.length == 0 && this.$store.state.media.voicesSource.length == 0 && this.$store.state.media.video.length == 0) {
                this.$vux.toast.text('请至少选择上传一个图片/语音/视频或填写作业内容', 'top')
                return false
            } else {
                return true
            }
        },
        // 新增家庭作业
        addWork(){
            if(!this.check()){
                return
            }
            this.$store.state.media.uploadError = false
              //提交之前，先上传图片，录音
            this.$store.dispatch('media/upload').then(() => {
                var params = {
                    HomeWorkId: this.homeWorkId,
                    Content: this.content,
                    parentId: this.$store.getters['user/parentId'],
                    studentId: this.$store.getters['user/studentId'],
                    Imgs: this.$store.state.media.imgData.join(),     
                    Voices: this.$store.state.media.voices.join(),
                    VoiceSecond: this.$store.state.media.timeList.join(),
                    Video: this.$store.state.media.video.join(),
                }
                console.log(params,this.$store.state.media.timeList)
                this.$store.dispatch('homework2/Submit', params).then(
                    data =>{
                        if(data.Code == 200){
                            this.$vux.toast.text('提交成功', 'top')
                            this.$router.go(-1)
                            this.$store.state.media.uploadError = true
                            this.$store.commit('homework2/setSummitHomeId',this.homeWorkId)
                        }else{
                            this.$vux.toast.text('提交失败', 'top')
                            this.$store.state.media.uploadError = true
                        }
                    }
                    
                )}
            )}
    }
}
</script>
<style scoped src="./css/public.css"></style>
<style scoped>
    .videoModel{
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 200;
        position:fixed;
        top: 0;
        left: 0;
        display: none;

    }
    textarea{
        padding: 0.24rem;
        font-size: 0.32rem;
        width: 100%;
        border: none;
        box-sizing: border-box;
        height: 3.92rem;
        caret-color:#b0b0b0;
        resize: none;
        background: #fff;
    }
    textarea::-webkit-input-placeholder {
       color: #b0b0b0;
       font-size: 0.32rem;
    }
   
    .content{
       padding: 0.32rem 0.24rem 0 0.24rem;
       background: #fff;
    }
    .upload{
        height: 0.96rem;
        display: flex;
        align-items: center;
        margin-top: 0.32rem;
    }
    .upload img{
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.42rem;
    }
    .summitButton{
        height: 0.8rem;
        width:6.4rem ;
        background: #128fef;
        text-align: center;
        line-height: 0.8rem;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.08rem;
        margin: 0.28rem auto;
        
    }
    .summitButton2{
        height: 0.8rem;
        width:6.4rem ;
        background: #999;
        text-align: center;
        line-height: 0.8rem;
        color: #fff;
        font-size: 0.32rem;
        border-radius: 0.08rem;
        margin: 0.28rem auto;
        
    }
    .seeNumber{
        display: inline-block;
        text-align: right;
        width: 100%;
        font-size: 0.32rem;
        color: #666;
    }
    .model{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 1000;
    }
</style>