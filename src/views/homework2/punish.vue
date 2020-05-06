<template>
    <div class="main">
        <headNav title="发布作业"></headNav>
        <div class="top">
            <select v-model="classItem">
                <option value="">班级</option>
                <option v-for="(item,index) in classList" :key="index" :value="item">{{item.GradeName}}{{item.ClassName}}</option>
            </select>
            <select v-model="subjetItem">
                <option value="">科目</option>
                <option v-for="(item,index) in subjectData" :key="index" :value="item">{{item.name}}</option>
            </select>
        </div>
        <div class="content-p">
            <textarea  v-model.trim="content" placeholder="请输入作业内容，最多可输入1000字" maxlength="1000"></textarea>
            <div class="content-count">{{content.length}}/1000</div>
        </div>
        
        <media :a="[1,2]"></media>
        <div class="parents">
            <div class="p-left">
                <p>需要家长在线提交作业</p>
                <p>家长可提交文字/图片/音频/视频等作业内容</p>
            </div>
            <div>
                <x-switch title="" v-model="isCommit2"></x-switch>
            </div>
            
        </div>
        <div class="remind" @click="addWork" v-if="uploadError">发布</div>
        <div class="remind2" v-else>发布中...</div>
        <div v-if='!uploadError' class="model">

        </div>
    </div>
</template>

<script>
import { XSwitch  } from 'vux'
import {getTeacher,uploadWechatImg} from '@/api/commonApi'
import headNav from '@/components/headNav/headNav';
import media from '@/components/media'
export default {
    name:'homeworkPunish',
    components: {
        XSwitch,
        headNav,
        media
    },
    data () {
        return {
          classList: [],
          subjectData:[],
          classItem: '',
          subjetItem: '',
          content: '',
           isCommit2: false,
           isCommit:''
        }
    },
    computed:{
       uploadError(){
           return this.$store.state.media.uploadError
       }
    },
    mounted () {
        this.classList = this.$store.state.user.classList
        this.getSubject()
    },
    destroyed(){
        this.$store.state.media.uploadError = true
    },
    methods: {
        // 获取科目
        getSubject () {
            var prams = {
                teacherId:this.$store.getters['user/teacherId']
            }
            this.$store.dispatch('homework2/GetSubjectList',prams).then((data) => {
                  var data = JSON.parse(data)
                   this.subjectData = data.Data.data
            })
        },
       
        check(){
            if(!this.classItem.ClassId){
                 this.$vux.toast.text('班级不能为空', 'top')
                 return false
            }
            if(!this.subjetItem.name){
                 this.$vux.toast.text('科目不能为空', 'top')
                 return false
            }
            if(!this.content && this.$store.state.media.imgData.length == 0 && this.$store.state.media.voices.length == 0 && this.$store.state.media.video.length == 0 && this.$store.state.media.link.length == 0){
                 this.$vux.toast.text('内容、语音、图片、视频、链接必须填一项', 'top')
                 return false
            }
            return true
        },
          // 新增家庭作业
        addWork(){
            if(!this.check()){
                return
            }
            if (this.isCommit2){
                this.isCommit = 1
            }else{
                this.isCommit = 0
            }
            this.$store.state.media.uploadError = false
            //提交之前，先上传图片，录音
            this.$store.dispatch('media/upload').then(() => {
                 var prams = {
                    Content: this.content,
                    SubjectName: this.subjetItem.name,
                    TeacherId: this.$store.getters['user/teacherId'],
                    TeacherName: this.$store.getters['user/realName'],
                    SchoolId: this.classItem.SchoolId,
                    SchoolName: this.classItem.SchoolName,
                    GradeId: this.classItem.GradeId,
                    GradeName: this.classItem.GradeName,
                    ClassId: this.classItem.ClassId,
                    ClassName: this.classItem.ClassName,
                    Imgs: this.$store.state.media.imgData.join(),     
                    Voices: this.$store.state.media.voices.join(),
                    VoiceSecond: this.$store.state.media.timeList.join(),
                    Video: this.$store.state.media.video.join(),
                    IsCommit: this.isCommit,
                
                }
                console.log(this.$store.state.media.imgData)
                if(this.$store.state.media.link.length > 0){
                    prams.InternetUrl = this.$store.state.media.link[0].url
                    prams.InternetTitle = this.$store.state.media.link[0].title
                    prams.InternetImg = this.$store.state.media.link[0].img
                }
                this.$store.dispatch('homework2/AddHomeWork',prams).then((data) => {
                    if(data.Code == 200){
                        this.$vux.toast.text('提交成功', 'top')
                        this.$router.go(-1)
                         this.$store.state.homework2.work = 1
                        this.$store.state.media.uploadError = true
                     } else{
                         this.$vux.toast.text('提交失败', 'top')
                         this.$store.state.media.uploadError = true
                     }
                })
            })        
           
        }
    }
}
</script>
<style scoped>
.model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
}
    .top{
        padding-left: 0.26rem;
        height: 0.96rem;
        background: #fff;
        border-bottom: 0.01rem solid #e5e5e5;
        line-height: 0.96rem;
    }
    .top select{
        border: none;
        background: #fff;
        color: #333;
        font-size: 0.32rem;
        padding: 0 0.4rem 0 0.1rem;
    }
    .top select:first-child{
        border: none;
        background: #fff;
        color: #333;
        font-size: 0.32rem;
        margin-right: 0.1rem;
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
    .parents{
        padding: 0 0.24rem;
        background: #fff;
        margin-top: 0.32rem;
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
    .p-left p:last-child{
        color: #999;
        font-size: 0.24rem;
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
    .content-p{
        background: #fff;
    }
    .content-count{
        
        margin: 0 0 0.2rem 0;
        color: #666;
        text-align:right;
        font-size: 0.32rem;
        padding: 0.2rem;
    }
</style>