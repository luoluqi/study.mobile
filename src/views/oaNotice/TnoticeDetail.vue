<template>
    <div id="noticeDetail">
        <headNav title="通知详情"></headNav>
        <div class="workName">
            {{noticeDetail.Title}}
            <p class="whoSummit">
                {{noticeDetail.TeacherName}}老师发布于{{noticeDetail.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}
            </p>
            <span class="imgBox" v-if="noticeDetail.isConfirm == 1">
                <img src="@/assets/img/notice/sure.png" alt="">
            </span>
        </div>
        <div class="detail-top">
            <div  v-html="noticeDetail.Content" class="worktext">
                
            </div>
            <div v-if="noticeDetail.Imgs" class="workPhotoList">
                <previewImgDiv  :list="noticeDetail.imgArr"></previewImgDiv>
            </div>
            <div v-if="noticeDetail.FileUrl">
                <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                <a href="javascript:;" v-for="(item,index) in noticeDetail.FileUrl" class="link" @click="goLink(item)" :key="index">
                    <div>
                        <img v-if="noticeDetail.fileNameArr[index] == 'xls' || noticeDetail.fileNameArr[index] == 'xlsx'" src="@/assets/img/oa/xlscode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'pdf'" src="@/assets/img/oa/pdfcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'rar' || noticeDetail.fileNameArr[index] == 'zip'" src="@/assets/img/oa/zipcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'ppt'" src="@/assets/img/oa/pptcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'doc' || noticeDetail.fileNameArr[index] == 'docx'" src="@/assets/img/oa/wordcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'txt'" src="@/assets/img/oa/txtcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'mp4'" src="@/assets/img/oa/videocode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'mp3'" src="@/assets/img/oa/musiccode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'jpg' || noticeDetail.fileNameArr[index] == 'jpeg' || noticeDetail.fileNameArr[index] == 'png'" src="@/assets/img/oa/piccode.png" alt="">
                    </div>

                    <div class="a-link-p">
                        <span  href="javaScript:;" class="a-link">{{noticeDetail.FileName[index]}}</span> 
                    </div>
                </a>
            </div>
           
        </div>
        <div class="remind" v-if="noticeDetail.isConfirm == 0 && noticeDetail.IsCommit != 0" @click="confirm">提交回执</div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import previewImgDiv from '@/components/preview'
export default {
    name:'oaNoticeDetail',
     components:{
       headNav, previewImgDiv
    },
    data() {
        return {
            noticeDetail:'',
        }
    },
    computed: {
        noticeId () {
            return this.$store.state.oaNotice.noticeId
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
        getDetail () {
            var params = {
                teacherId:this.$store.getters['user/teacherId'],
                id: this.noticeId
            }
            this.$store.dispatch('oaNotice/GetNoticeByTeacher', params).then(
                res => {
                    if (res.Code == 200) {
                        if (res.Data) {
                            this.noticeDetail = res.Data
                            this.noticeDetail.Imgs =  this.noticeDetail.Imgs ? this.noticeDetail.Imgs.split(',') : ''
                            if ( this.noticeDetail.Imgs) {
                                this.noticeDetail.imgArr = this.setImgArr(this.noticeDetail.Imgs)
                            }
                            this.noticeDetail.FileUrl = this.noticeDetail.FileUrl ? this.noticeDetail.FileUrl.split(',') : '' 
                            if (this.noticeDetail.FileUrl) this.noticeDetail.fileNameArr = this.setFileArr(this.noticeDetail)
                            this.noticeDetail.FileName = this.noticeDetail.FileName ? this.noticeDetail.FileName.split(',') : '' 
                        }
                    }
                }
            )
        },
        // 提交回执
       confirm(){
           var params = {
                noticeId: this.noticeId,
                teacherId: this.$store.getters['user/teacherId']
            }
            this.$store.dispatch('oaNotice/SetConfirm', params).then(data => {
                    if (data.Code == 200) {
                        this.noticeDetail.isConfirm = 1
                        this.$store.state.oaNotice.commitNoticeId = this.noticeId
                        this.$vux.toast.text('提交回执成功', 'top')
                    }
               }
           )
       },
       // 设置已读
       isRead(){
           var params = {
                noticeId: this.noticeId,
                teacherId: this.$store.getters['user/teacherId']
            }
            this.$store.dispatch('oaNotice/SetRead', params).then(data => {
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