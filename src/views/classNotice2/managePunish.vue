<template>
    <div>
        <headNav title="发布通知"></headNav>
        <div>
            <div class="mid">
                <p class="title">通知内容</p>
                <div class="template">
                    <span>
                        模板：
                    </span>
                    <span @click="moreTemplate" class="more">
                        更多模板
                        <img src="@/assets/img/notice/right.png" alt="">
                    </span>
                </div>
                <div class="templateList">
                    <p v-for="(item,index) in noticeTemplate" :key="index" @click="chooseTemplate(index,item)" :class="templateCurrent==item.Id? 'templateBox active':'templateBox'">
                        {{item.Title}}
                    </p>
                </div>
                <div class="templateContent">
                    <p class="t-top">
                        通知标题：
                        <input type="text" @input="changeContent" maxlength="10" placeholder="通知标题，最多10字" v-model="templateTitle">
                    </p>
                    <p class="t-bot">
                       <textarea  name="" @input="changeContent" id="" maxlength="1000" placeholder="请输入通知内容，最多可输入1000字" v-model.trim="templateContent"></textarea>
                    </p>
                </div>
                <media></media>
            </div>
            <!-- <div class="parents">
                <div class="p-left">
                    <p>需家长发送电子回执</p>
                </div>
                <div>
                    <x-switch title="" v-model="isCommit"></x-switch>
                </div>
                
            </div> -->
            <div class="remind" @click="AddNotice" v-if="uploadError">发布</div>
            <div class="remind2" v-else>发布中...</div>
        </div>
        <div v-if='!uploadError' class="model">

        </div>
    </div>
</template>
<script>
import { XSwitch } from 'vux'
import headNav from '@/components/headNav/headNav'
import media from '@/components/media'
import {uploadFile} from "@/api/circleApi"
export default {
    name:'teacherPunish',
    components: {
       XSwitch, headNav, media
    },
    data () {
        return {
            templateTitle: '',
            templateContent: '',
            classCurrent: -1,
            // templateCurrent: -1,
            classList: [],
            noticeTemplate: [],
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
            urlShow: false
        }
    },
    methods: {
        changeContent () {
            this.$store.state.notice2.currentTemplate = ''
        },
        // 获取模板 GetNoticeTemplate
        getNoticeTemplate () {
            var params = {
                pageSize: 10,
                pageIndex: 1
            }
            this.$store.dispatch('notice2/GetNoticeTemplate', params).then((data) => {
                if (data.Code == 200) {
                    this.noticeTemplate = data.Data
                }
            })
        },
        // 选择模板
        chooseTemplate (index, item) {
            this.templateTitle = item.Title
            this.templateContent = item.Content
            this.$store.commit('notice2/setTemplate', item)
        },
        // 检测
        check () {
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
            this.$store.state.media.uploadError = false
            this.$store.dispatch('media/upload').then(() => {
                var params = {
                    Title: this.templateTitle,
                    Content: this.templateContent,
                    Imgs: this.$store.state.media.imgData.join(),     
                    Voices: this.$store.state.media.voices.join(),
                    VoiceSecond: this.$store.state.media.timeList.join(),
                    Video: this.$store.state.media.video.join(),
                    TeacherId:this.$store.getters['user/teacherId'],
                    TeacherName:this.$store.getters['user/realName'],
                    SchoolId:this.$store.getters['user/schoolId'],
                    schoolName:this.$store.state.user.schoolName,
                    AnnounceFlag: 0,
                    IsCommit: 0,
                    IsRemind: 0,
                }
                if(this.$store.state.media.link.length > 0){
                    params.InternetUrl = this.$store.state.media.link[0].url
                    params.InternetTitle = this.$store.state.media.link[0].title
                    params.InternetImg = this.$store.state.media.link[0].img
                }
                this.$store.dispatch('notice2/AddNoticeByManager', params).then(
                    data => {
                        if (data.Code == 200) {
                            this.$store.state.media.uploadError = true
                            this.$vux.toast.text('发布成功', 'top')
                            this.$store.commit('media/clear')
                            this.$store.commit('notice2/setwhoTopunish', 3)
                            this.$router.go(-1)
                        } else {
                            this.$store.state.media.uploadError = true
                            this.$vux.toast.text('发布失败', 'top')
                        }
                    }
                )
            })
         
        },
        // 更多模板
        moreTemplate () {
            this.$store.commit('notice2/setwhoTopunish', 2)
            this.$router.push('noticeTemplate')
        }
    },
    computed: {
        get_templateTitle () {
            return this.$store.state.notice2.currentTemplate.Title
        },
        get_templateContent () {
            return this.$store.state.notice2.currentTemplate.Content
        },
        currentTemplate () {
            return this.$store.state.notice2.currentTemplate
        },
        templateCurrent () {
            return this.$store.state.notice2.currentTemplate.Id
        },
        uploadError () {
            return this.$store.state.media.uploadError
        }
    },
    activated () {
        // console.log(this.$store.state.notice2.whoTopunish)
        this.classList = this.$store.state.user.classList
        this.classList.forEach((item,index) => {
            item.choose = false
        })
        if ( this.$store.state.notice2.whoTopunish == 1) {
            this.templateTitle = ''
            this.templateContent = ''
        } else {
            this.templateTitle = this.get_templateTitle
            this.templateContent = this.get_templateContent
        }
        this.getNoticeTemplate()
    },
    destroyed () {
        this.$store.state.media.uploadError = true
    }
}
</script>
<style scoped src="./css/public.css"></style>
<style scoped>
    input{
        height: 0.5rem;
        font-size: 0.32rem;
        border: none;
        background: #f7f7f7;
    }
    input::-webkit-input-placeholder {
        color: #b0b0b0;
        font-size: 0.32rem;
        padding: 0.24rem 0;
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
    .className{
        position: relative;
        float: left;
        padding: 0.18rem 0.26rem;
        font-size: 0.28rem;
        border: 0.01rem solid #cacaca;
        border-radius: 0.08rem;
        color: #555;
        margin: 0.24rem 0.24rem 0 0;
    }
    .top .active{
        background: #38A1F2;
        color: #fff;
         border: 0.01rem solid #38A1F2;
    }
    .className img{
        width: 0.43rem;
        height: 0.43rem;
        position: absolute;
        top: 0;
        right: 0;
    }
    .template{
        color: #666;
        font-size: 0.28rem;
        padding: 0.3rem 0 ;
        display: flex;
        justify-content: space-between;
    }
    .more img{
        width: 0.12rem;
        height: 0.24rem;
    }
    .templateList{
        overflow-x: auto;
        white-space:nowrap;
    }
    .templateBox{
        display: inline-block;
        padding: 0.18rem;
        color: #555;
        font-size: 0.28rem;
        margin: 0 0.24rem 0.24rem 0; 
        border: 0.01rem solid #cacaca;
        border-radius: 0.08rem;
    }
    .templateList .active{
        color: #fff;
        background: #38A1F2;
        border: 0.01rem solid #38A1F2;
    }
    .templateContent{
        padding: 0.32rem 0.2rem;
        background: #f7f7f7;
        color: #333;
        font-size: 0.32rem;
        margin:  0.28rem 0;
    }
    .t-top{
        border-bottom: 0.01rem solid #dedede;
        padding-bottom: 0.3rem;
    }
    .t-bot{
        padding-top: 0.3rem;
    }
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
    .seeNumber{
        display: inline-block;
        text-align: right;
        width: 100%;
        font-size: 0.32rem;
        color: #666;
    }
    
</style>