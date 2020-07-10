<template>
    <div>
        <headNav title="发布广播"></headNav>
        <group  label-width="5.5em" gutter="0rem" label-margin-right="0em" label-align="left">
            <div class="rowStyle">
                <x-input type="text" :min=1 :max=10 :show-clear='false' title="广播标题：" v-model.trim="title" text-align="left"  placeholder="请输入广播标题，10个字以内"></x-input>
            </div>
        </group>
        <div class="transcribe">
            <p class="transcribeP"><span>录制语音</span><label>[请录制6秒以上的语音]</label></p>
             <media ref="media" :showVoice='false' :showImg='false' :showVideo='false' :showLink='false'></media>
             <img class="tranImg"  src="@/assets/img/homeWork/transcribe.png" @click="startRecord" alt="">
        </div>
        <div class="selObj">
             <span class="boXiang">播报对象：</span>
             <div class="selXiang" @click="selClass">
                 <span v-if="classNames.length == 0 && (isSchool == 2 || !isSchool)" class="nameStyle">选择播报对象</span>
                 <span v-if="classNames.length == 0 && isSchool == 1" class="nameStyle">全校</span>
                 <span v-if="classNames.length > 0 && isSchool == 2" class="nameStyle">{{classNames.join(',')}}</span>
                 <img src="@/assets/img/homeWork/you.png" alt="">
             </div>
        </div>
        <div class="publishBtn" @click="startPublish">立即发布</div>
        <selClass @hide='hideReadDetail' @remarkData='remarkData' v-show="isReadDetail"></selClass>
     
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
import media from '@/components/media'
import selClass from './selClass'
export default {
    components:{
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, headNav, selClass, media
    },
    data() {
        return {
            isReadDetail: false,
            title:'',
            classIds:[],
            classNames:[]
        }
    },
    computed:{
        serverIds () {
            return this.$store.state.media.voiceServerIds
        },
        isSchool () {
            return this.$store.state.broadcast.isSchool
        },
        voicesSource () {
            return this.$store.state.media.voicesSource
        }
    },
    methods:{
        selClass(){
           this.isReadDetail = true
        },
         hideReadDetail(){
            this.isReadDetail = false
        },
        remarkData(data){
            this.classIds = []
            this.classNames = []
            for(var item of data){
               this.classIds.push(item.classId)
               this.classNames.push(item.name)
            }
            
        },
        // 录音
        startRecord(){
            if(this.voicesSource.length != 1){
                this.$refs.media.startRecord()
            }else{
                this.$vux.toast.text('只能录一条语音', 'top')
            }
        },
        async startPublish(){
            if(!this.title){
                this.$vux.toast.text('请输入标题', 'top')
                return
            }
            if(this.voicesSource.length == 0){
                this.$vux.toast.text('请录入语音', 'top')
                return
            }
            if(this.isSchool == 0){
                this.$vux.toast.text('请选择播报的班级', 'top')
                return
            }
            if(this.isSchool == 2 && this.classIds.length == 0){
                this.$vux.toast.text('请选择播报的班级', 'top')
                return
            }
            //提交之前，先上传录音
             await this.$store.dispatch('media/upload')

             var amrList = []
            
             for (let serverId of this.serverIds) {
                
                  var amr =  await this.$store.dispatch('broadcast/UploadAmr', serverId)
                  amrList.push(amr)
            }            
            
            var prams = {
                title:this.title,
                loginUserId:this.$store.getters['user/loginUserId'],
                schoolId:this.$store.getters['user/schoolId'],   
                originalUrl: this.$store.state.media.voices.join(),
                totalSeconds: this.$store.state.media.timeList.join(),
                targetType:this.isSchool,
                targetUrl:amrList.join(),
                classIds:this.classIds
            }
            this.$store.dispatch('broadcast/SchoolVoiceBroadcast',prams).then((data) => {
                    this.$vux.toast.text('发布成功', 'top')
                    this.$store.commit('broadcast/clear')
                    this.$router.push('adminList')
            })
        }
    }
}
</script>
<style  scoped>
.rowStyle{
        position: relative;
        padding: 0.1rem 0;
        border-bottom: 0.01rem solid #e5e5e5;
        font-size: 0.26rem;
    }
.transcribe{
    margin-top: 0.24rem;
    background-color: #ffffff;
    padding: 0 0.24rem;
    overflow: hidden;
    padding-bottom: 0.6rem;
    position: relative;
}
.transcribeP{
    line-height: 1rem;
}
.transcribeP span{
   font-size: 0.26rem;
    color: #010101;
}
.transcribeP label{
   font-size: 0.20rem;
    color: #CCCCCC;
    margin-left: 0.4rem;
}
.tranImg{
    width: 1.9rem;
    height: 0.74rem;
    position: absolute;
    right: 0.24rem;
    top: 1rem;
}
.selObj{
    height:0.88rem;
    background:rgba(255,255,255,1);
    margin-top: 0.24rem;
    padding: 0 0.24rem;
    line-height: 0.88rem;
}
.boXiang{
   color: #010101;
    font-size: 0.26rem;
}
.selXiang{
  float: right;
  font-size: 0.26rem;
  color: #CCCCCC;
}
.nameStyle{
    width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    text-align: right;
    margin-right: 0.16rem;
}
.selXiang img{
    width: 0.1rem;
    height: 0.16rem;
    float: right;
    margin-top: 0.36rem;
}
.publishBtn{
    width:6.40rem;
    height:0.80rem;
    background:#128FEF;
    border-radius:0.10rem;
    color: #ffffff;
    font-size: 0.32rem;
    line-height: 0.8rem;
    text-align: center;
    margin: 0 auto ;
    margin-top: 1rem;
}
.mediaHide{
    display: none;
}

</style>
<style >
.transcribe .upload{
    height: 0 !important;
}
</style>

