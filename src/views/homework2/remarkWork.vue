<template>
    <div id="remarkWork">
        <headNav title="点评作业"></headNav>
        <div class="remark-name">
            <div class="remark-per left">
                <img :src="studentData.studentImg" alt="">
                <span>{{studentData.studentName}}</span>
            </div>
            <div class="remark-c right">
                 <img src="@/assets/img/homeWork/wancheng.png" alt="">
                <span>已完成</span>
            </div>
        </div>
        <div class="remark-work">
            <div class="workContent">{{studentData.Content}}</div>
            <div class="audioList" v-if="studentData.Voices">
                 <div class="audio" v-for="(voice,index) in studentData.Voices" :key="index" @click="play(voice)">
                    <img v-if="!voice.isPlay"  src="@/assets/img/homeWork/audioCode.png" alt="">
                        <img v-else src="@/assets/img/voiceGif.gif" alt="">
                        <!-- {{timeList[index]}}" -->
                        <span>{{studentData.VoiceSecond[index]}}"</span>
                        <audio style="display:none" duration :src="voice.url" :id="voice.url" controls></audio>
                </div>
            </div>
            <div class="workPhotoList">
                <!-- <div class="onePhoto" v-for="(img,index) in studentData.Imgs" :key="index">
                    <img :src="img" alt="">
                </div> -->
                <pre-view :list='studentData.listArr'></pre-view>
            </div>
             <div class="vedio" v-if="studentData.Video && showModel">
                <video :src="studentData.Video" width="100%" height="100%" controls="controls"></video>
            </div>
            <div class="data-time">
                <img src="@/assets/img/homeWork/time.png" alt="">
                <span>{{studentData.CreateTime | formatDateTime('YYYY-MM-DD HH:mm')}}</span>
            </div>
        </div>
        <div class="remind" @click="sendRemark">发送点评</div>
        <!-- 点评弹窗 -->
        <remark-dialog @hide='hideReadDetail' @remarkData='remarkData' v-show="isReadDetail"></remark-dialog>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import remarkDialog from './remarkDialog';
import preView from '@/components/preview'
export default {
    name: 'remarkWork',
     components:{
       headNav,
       remarkDialog,
       preView
    },
    data () {
        return {
            isReadDetail:false,
            dataRemark: '',
            studentData:{},
            lastid: ''
        }
    },
     computed: {
        showModel () {
            return this.$store.state.media.showModel
        }
    },
    mounted () {
        this.studentData = this.$store.state.homework2.studentData
        if(!this.$store.state.homework2.studentData){
            this.studentData = JSON.parse(localStorage.getItem('studentData'))
        }
        this.studentData.Imgs =this.studentData.Imgs ? this.studentData.Imgs.split(',') : []
        this.studentData.Voices =this.studentData.Voices ? this.studentData.Voices.split(',') : []
        if (this.studentData.Voices ) {
            this.studentData.Voices =  this.setVoiceArr(this.studentData.Voices)
        }
        this.studentData.VoiceSecond = this.studentData.VoiceSecond ? this.studentData.VoiceSecond.split(',') : []
        this.studentData.listArr = this.setImgArr(this.studentData.Imgs)
    },
    methods: {
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
        sendRemark () {
            this.isReadDetail = true
            this.$store.commit('media/changeModel', false)
        },
         hideReadDetail(){
            this.isReadDetail = false
        },
        remarkData (data) {
             this.dataRemark = data
             this.remakrConfirm()
        },
        // 发送评价
        remakrConfirm(){
                  var prams ={
                    HomeWorkId:this.studentData.HomeWorkId,
                    StudentId:this.studentData.StudentId,
                    Content:this.dataRemark.remark,
                    Voices:this.dataRemark.voice,
                    VoiceSecond: this.dataRemark.VoiceSecond,
                    Level:this.dataRemark.ranking
                }
                var pramsArr = []
                pramsArr.push(prams)
                this.$store.dispatch('homework2/AddReview',pramsArr).then((data) => {
                    if(data.Code == 200){
                        this.$vux.toast.text('评价成功', 'top')
                        this.$router.go(-1)
                    }else{
                        this.$vux.toast.text(data.Msg, 'top')
                    }
                })
        }
    }
}
</script>
<style scoped>
.left{
        float: left;
    }
.right{
    float: right;
}
.remark-name{
    padding: 0.15rem 0.27rem;
    overflow: hidden;
    height: 0.79rem;
    line-height: 0.79rem;
    background-color: #ffffff;
    border-bottom: 1px solid #E5E5E5;
}
.remark-per img{
    width:0.73rem;
    height:0.76rem;
    border-radius:50%;
    vertical-align: top;
}
.remark-per span{
    font-size: 0.32rem;
    color: #333333;
    margin-left: 0.1rem;
}
.remark-c img{
    width:0.3rem;
    height:0.3rem;
    border-radius:50%;
    vertical-align: sub;
}
.remark-c span{
    font-size: 0.28rem;
    color: #999999;
    margin-left: 0.05rem;
}
.remark-work{
    padding: 0.24rem;
    background-color: #ffffff;
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
        margin-top: 0.32rem;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .onePhoto{
        width: 1.44rem;
        height: 1.44rem;
        border-radius: 0.08rem;
        margin-bottom: 0.32rem;
    }
    .onePhoto img{
        height: 100%;
        width: 100%;
    }
    .data-time img{
        width: 0.26rem;
        height: 0.26rem;
        float: left;
        margin-top: 0.02rem;
        margin-right: 0.05rem;
    }
    .data-time span{
        font-size: 0.24rem;
        color: #999999;
    }
    .remind{
        width:6.40rem;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.3rem auto;
        font-size: 0.32rem;
    }
    .vedio{
        width: 1.92rem;
        height: 1.44rem;
    }
    /*  */
    .workContent{
        color: #333;
        font-size: 0.32rem;
        line-height: 0.5rem;
        padding: 0.22rem 0;
    }
</style>