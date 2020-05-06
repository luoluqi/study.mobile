<template>
    <div>
        <headNav title="发布通知"></headNav>
        <div>
            <div class="top">
                <p class="t-top">
                    通知标题：
                    <input type="text" maxlength="10" placeholder="通知标题，最多10字" v-model.trim="templateTitle">
                </p>
            </div>
            <div class="mid">
                <p class="title">通知内容</p>
                <div class="templateContent">
                    <p class="t-bot">
                       <textarea maxlength="1000" placeholder="请输入通知内容，最多可输入1000字" v-model.trim="templateContent"></textarea>
                    </p>
                </div>
                <media :showVideo='false' :showVoice='false' :showLink="false" :showFile="true"></media>
            </div>
            <div class="parents">
                <div class="p-left">
                    <p>需老师发送电子回执</p>
                </div>
                <div>
                    <x-switch title="" v-model="isCommit"></x-switch>
                </div>
                
            </div>
            <div class="remind" @click="AddNotice" v-if="isSub">发布</div>
            <div class="remind2" v-else>发布中...</div>
        </div>
        <div v-if="!isSub" class="model">

        </div>
    </div>
</template>
<script>
import { XSwitch } from 'vux'
import headNav from '@/components/headNav/headNav'
import media from '@/components/media'
import {uploadFile} from "@/api/circleApi"
export default {
    name:'oaPunishNotice',
    components: {
       XSwitch, headNav, media
    },
    data () {
        return {
            templateTitle: '',
            templateContent: '',
            classCurrent: -1,
            // templateCurrent: -1,
            isCommit: false,
            classList: [],
            noticeTemplate: [],
            classItem: [],
            // currentTemplate: ''
            // 上传部分
            // 图片
            serverIds: [],
            imgData: [],
            content: '',
            // 语音
            audio: [],
            audioData: [],
            audioServerIds: [],
            // 视频
            video: '',
            videoUrl: '',
            localVedioUrl: '',
            // 链接
            isUrl: false,
            urlLink:'',
            intUrl:'',
            urlShow: false,
            isSub: true
        }
    },
    methods: {
        // 检测
        check () {
            if (!this.templateTitle) {
                this.$vux.toast.text('通知标题不能为空')
                return false
            }
            return true
            if (!this.templateContent) {
                this.$vux.toast.text('通知内容不能为空')
                return false
            }
            return true
        },
        // 新增公告
        AddNotice () {
            if (!this.check()) {
                return
            } 
            this.isSub = false
            this.$store.dispatch('media/upload').then(() => {
                var params = {
                    Title: this.templateTitle,
                    Content: this.templateContent,
                    Imgs: this.$store.state.media.imgData.join(),   
                    FileUrl: this.$store.state.media.files.join(),
                    FileName: this.$store.state.media.filesName.join(),
                    TeacherId:this.$store.getters['user/teacherId'],
                    TeacherName:this.$store.getters['user/realName'],
                    SchoolId:this.$store.getters['user/schoolId'],
                    AnnounceFlag: 1,
                    IsCommit: this.isCommit ? 1 : 0,
                    IsRemind: 0,
                }
                this.$store.dispatch('oaNotice/AddNotice', params).then(
                    data => {
                        if (data.Code == 200) {
                            this.isSub = true
                            this.$vux.toast.text('发布成功', 'top')
                            this.$store.commit('oaNotice/setwhoTopunish', 1)
                            this.isCommit = false
                            this.$router.go(-1)
                        } 
                    }
                )
            })
         
        }
    },
    computed: {
        
    },
    activated () {

    },
    destroyed () {
        this.isSub = true
    }
}
</script>
<style scoped src="./css/public.css"></style>
<style scoped>
    input{
        font-size: 0.3rem;
        border: none;
        width: 74%;
    }
    input::-webkit-input-placeholder {
        color: #b0b0b0;
        /* font-size: 0.32rem;
        padding: 0.24rem 0; */
    }
    .top,.mid{
        padding: 0.32rem 0.24rem;
        background: #fff;
        overflow: hidden;
        margin-bottom: 0.12rem;
    }
    .title{
        color: #000;
        font-weight: bold;
        font-size: 0.32rem;
    }
    .t-top{
        font-size: 0.32rem;
        font-weight: bold;
    }
    /* .t-bot{
        padding-top: 0.3rem;
    } */
    .upload{
        display: flex;
        align-items: center;
        margin-top: 0.52rem;
    }
    .upload img{
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.42rem;
    }
    .parents{
        padding: 0 0.24rem;
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.4rem;
    }
    .p-left p:first-child{
        color: #333;
        font-size: 0.32rem;
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
    .remind2{
        width:6.40rem;
        height:0.80rem;
        background:#999;
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.28rem auto;
        font-size: 0.32rem;
    }
    /* 链接弹框 */
    .win{
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        z-index:998;
        background-color:#000;
        opacity:0.5;
        }
    .re-d-c{
        width:6.80rem;
        height:2.14rem;
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