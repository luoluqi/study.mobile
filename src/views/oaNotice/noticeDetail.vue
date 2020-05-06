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
            <div v-html="noticeDetail.Content" class="worktext">
            </div>
            <div v-if="noticeDetail.Imgs" class="workPhotoList">
                <previewImgDiv  :list="noticeDetail.imgArr"></previewImgDiv>
            </div>
            <div v-if="noticeDetail.FileUrl">
                <!-- <a :href="item.InternetUrl">{{item.InternetUrl}}</a> -->
                <a :href="item" v-for="(item,index) in noticeDetail.FileUrl" class="link" :key="index">
                    <div>
                        <img v-if="noticeDetail.fileNameArr[index] == 'xls' || noticeDetail.fileNameArr[index] == 'xlsx'" src="@/assets/img/oa/xlscode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'pdf'" src="@/assets/img/oa/pdfcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'rar' || noticeDetail.fileNameArr[index] == 'zip'" src="@/assets/img/oa/zipcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'ppt'" src="@/assets/img/oa/pptcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'doc' || noticeDetail.fileNameArr[index] == 'docx'" src="@/assets/img/oa/wordcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'txt'" src="@/assets/img/oa/txtcode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'mp4'" src="@/assets/img/oa/videocode.png" alt="">
                        <img v-if="noticeDetail.fileNameArr[index] == 'mp3'" src="@/assets/img/oa/musiccode.png" alt="">
                    </div>

                    <div class="a-link-p">
                        <span  href="javaScript:;" class="a-link">{{noticeDetail.FileName[index]}}</span> 
                    </div>
                </a>
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
            noticeDetail: ''
        }
    },
    computed: {
        noticeId () {
            return this.$store.state.oaNotice.noticeId
        }
    },
    mounted () {
        this.getDetail()
        this.isRead()
    },
    methods: {
        getDetail () {
            var params = {
                teachId:this.$store.getters['user/teacherId'],
                id: this.noticeId
            }
            this.$store.dispatch('oaNotice/GetNoticesById', params).then(
                res => {
                    if (res.Code == 200) {
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
</style>