<template>
    <div>
        <div class="remark-d" v-if="isShow">
            <div class="win"></div>
            <div class="re-d-c">
                <div class="remark-operation">
                    <span class="left" @click="hide">取消</span>
                    <span class="right" @click="send">发送</span>
                </div>
                <div class="remark-grade">
                    <ul>
                        <li v-for="(item,index) in imgList" :key="index" @click="addClass(index)" :class="{reActive:current==index}">
                            <img :src="item" alt="">
                             <p v-if="index == 0">作业及格</p>
                             <p v-if="index == 1">作业中等</p>
                             <p v-if="index == 2">作业良好</p>
                             <p v-if="index == 3">作业优秀</p>
                             <p v-if="index == 4">作业完美</p>
                        </li>
                    </ul>
                </div>
                <div class="remark-text">
                    <textarea placeholder="输入评语或添加语音" v-model="remark"></textarea>
                </div>
                <!-- 点击录音 -->
                <!-- <div class="remark-a">
                    <img src="@/assets/img/homeWork/uploadAudio.png" alt="">
                </div> -->
                 <media :showVoice='true' :showImg='false' :showVideo='false' :showLink='false'></media>

            </div>
        </div>
    </div>
</template>
<script>
import media from '@/components/media'
export default {
    name: 'remarkDialog',
     components:{
       media
    },
    data () {
        return {
            current: -1,
            remark: '',
            imgList: [
                require('../../assets/img/homeWork/jige.png'),
                require('../../assets/img/homeWork/zhongdeng.png'),
                require('../../assets/img/homeWork/lianghao.png'),
                require('../../assets/img/homeWork/youxiu.png'),
                require('../../assets/img/homeWork/wanmei.png')
            ],
            ranking:'',
            remarkData2:{}
        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:true
        }
    },
    methods: {
        addClass (num) {
           this.current = num
           if(num == 0){
               this.ranking = 'E'
           }
           if(num == 1){
               this.ranking = 'D'
           }
           if(num == 2){
               this.ranking = 'C'
           }
           if(num == 3){
               this.ranking = 'B'
           }
           if(num == 4){
               this.ranking = 'A'
           }
        },
        hide () {
            this.$emit('hide')
            this.$store.commit('media/changeModel', true)
        },
        send () {
            this.$store.commit('media/changeModel', true)
            this.remarkData2.remark = this.remark
             this.remarkData2.ranking = this.ranking
             this.$store.dispatch('media/upload').then(() => {
                 this.remarkData2.voice = this.$store.state.media.voices.join()
                 this.remarkData2.VoiceSecond = this.$store.state.media.timeList.join(),
                 this.$emit('remarkData',this.remarkData2)
                 this.$emit('hide')
             })
        }
    }
}
</script>
<style  scoped>
.left{
        float: left;
    }
.right{
    float: right;
}
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
        height:6.5rem;
        background:rgba(255,255,255,1);
        border-radius:0.10rem;
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        z-index: 999;
        overflow: auto;
    }
    .remark-operation{
           height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.27rem;
    font-size: 0.32rem;
    color: #128FEF;
    position: fixed;
    /* top: 0; */
    width: 6.8rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* margin-bottom: 0.88rem; */
    background-color: #eee;
    z-index: 990;

    }
    .remark-grade{
          overflow: hidden;
        margin: 0 0.12rem;
        padding: 0.12rem 0;
        border-bottom: 1px solid #E5E5E5;
        margin-top: 0.88rem;
    }
    .remark-grade li{
        float: left;
        width:1.30rem;
        height:1.42rem;
        text-align: center;
        font-size: 0.24rem;
        background-color: #ffffff;
    }
    .remark-grade li img{
        width: 0.78rem;
        height: 0.72rem;
        margin-top: 0.15rem;
    }
     .remark-grade li p{
        font-size: 0.24rem;
        color: #666666;
        margin-top: 0.05rem;
    }
    .reActive{
        background-color: #F4F4F4 !important;
    }
    .reActive p {
        color: #333333 !important;
    }
    .remark-text{
        padding: 0.2rem 0.3rem;
    }
    .remark-text textarea{
        width: 100%;
        font-size: 0.28rem;
        height: 1.3rem;
        border: none;
        font-family: -webkit-body;
    }
    .remark-a{
        width:0.36rem;
       height:0.45rem;
       margin-left: 0.3rem;
    }
    .remark-a img{
        width:0.36rem;
       height:0.45rem;
    }
</style>>
    