<template>
    <div class="addCircle">
        <div class="publish">
            <span @click="toBack" class="pu-qu">取消</span>
            <!-- {{uploadError}} -->
            <span class="pu-fa" @click="publish" v-if="uploadError">发表<span class="mo-name">({{modularName}})</span></span>
            <span class="pu-fa" style="color: #999999" v-else>发表中...<span class="mo-name">({{modularName}})</span></span>
        </div>
       
        <div class="updataFile">
            <textarea id='contentText' class="updataText" v-model="content" placeholder="这一刻的想法..."></textarea>
            
            <div class="imgList">
                <ul>
                    <li v-for="(item,index) in imgData" :key="index" >
                        <div @click.stop="deleteImg(index)" class="del-btn-p">
                            <img class="del-btn-img" src="@/assets/img/sc.png" alt="">
                        </div>
                        <img @click="preview(imgData,item)" :src="item" class="img-item" />
                    </li>
                </ul>
            </div>
            <div v-show="type == 2" class="subList">
                <ul>
                    <li v-for="(item,index) in subjectData"  :key="index" 
                    @click="selSubject(index,item)" :class='{active:index==active}'>{{item.name}}</li>
                </ul>
            </div>
        </div>
        <!-- <div style="word-break:break-all;">{{imgData}}</div> -->
       

        <div   class="add-com-p">
           
            <img v-show="!showEmoji" @click.stop="openEmoji" class="emoji-btn" src="@/assets/img/circle/emoji.png" alt="">
            <img v-show="showEmoji" @click.stop="closeEmoji" class="emoji-btn" src="@/assets/img/circle/keyboard.png" alt="">
            
            <div v-show="showEmoji" class="emoji-list">
                <div v-for="(item,index) in emojiList" :key="index" @click="insertEmoji(item)" class="emoji-item">{{item}}</div>
            </div>
        </div>
        <media :showVoice='false' :showImg='true' :showVideo='true' :showLink='false'></media>
    </div>
</template>
<script>
import {uploadFile,getSubjectList,addJobSnapshot,addCircle,addAfterSchool} from "@/api/circleApi"
import {GetConfig} from "@/api/chekingApi"
import {uploadWechatImg} from '@/api/commonApi'
import emoji from '@/util/emoji'
import insertEmoji from '@/util/insertEmoji'
import   cookie from '@/util/cookie'
import media from '@/components/media'
export default {
     components: {
        media
    },
    data () {
        return {
            file:'',
            imgData:[],
            imgTemp:[],
            addImgHide:true,
         
            active:'-1',
            subjectItem:'',
            content:'',
            addUserType:'',
            imageName:'图片名称',
           

             emojiList :emoji,
             showEmoji:false,

         
             mediaIds:[],
             serverIds:[]
        }
    },
    computed:{
        type(){
            return this.$store.state.circle.type
        },
        subjectData(){
            return this.$store.state.circle.subjectData
        },
        modularName(){
            return this.$store.getters['circle/modularName']
        },
        uploadError(){
           return this.$store.state.media.uploadError
       }
    },
   destroyed(){
        this.$store.state.media.uploadError = true
    },
    methods:{
        publish(){
             this.addData()
            // if(this.imgData.length == 0){
            //     this.addData()
            // }else{
            //     if(this.type == 2){
            //         if(!this.subjectItem){
            //             this.$vux.toast.text('学科不能为空', 'top')
            //             return
            //         }
            //     }
            //     this.uploadImage([].concat(this.imgData))
            // }
      },
      addData(){
          if(this.type == 3){
              this.addCircle()
          }else if(this.type == 1){
              this.addAfterSchool()
          }else if(this.type == 2){
               
              this.snapshotDistribution()
          }
      },
         openEmoji(){
            this.showEmoji = true
        },
        closeEmoji(){
          this.showEmoji = false
           document.getElementById('contentText').focus()
        },
        insertEmoji(item){
         
          insertEmoji('contentText',item)
          this.content = document.getElementById('contentText').value
         },

    //    选择科目
      selSubject(index,item){
         this.active = index
         this.subjectItem = item
      },
      
    //   发布班级风采
      addCircle(){
          
          if(this.$store.state.media.imgDataSource.length == 0 && this.$store.state.media.video.length == 0 && this.content.replace(/\s/g,'') == ''){
             this.$vux.toast.text('照片、视频或内容不能为空', 'top')
             return
           }
            if(this.content.length > 1000){
             this.$vux.toast.text('内容最多1000字', 'top')
             return
           }
           this.addUserType = this.$store.getters['user/roleCode']
            if(this.addUserType == 'Teacher'){
                this.addUserType = '1'
            }else if(this.addUserType == 'Parent'){
                this.addUserType = '2'
            }
            this.$store.state.media.uploadError = false
            this.$store.dispatch('media/upload').then(() => {
                 var param = {
                    classId:this.$store.getters['user/classId'],
                    schoolId:this.$store.getters['user/schoolId'],
                    classImages:this.$store.state.media.imgData.join(),
                    classVideos:this.$store.state.media.video.join(),
                    imageName:this.imageName,
                    sType:this.type,
                    sContent:this.content,
                    addUserId:this.$store.getters['user/loginUserId'],
                    addUserName:this.$store.getters['user/realName'],
                    addUserHead:cookie.get('img'),
                    addUserType:this.addUserType
                }
                addCircle({data:JSON.stringify(param)}).then(res => {
                    
                    res = JSON.parse(res)
                    if(res.Code == 200){
                        this.$store.state.media.uploadError = true
                        this.toBack()
                    }else{
                        this.$store.state.media.uploadError = true
                        this.$vux.toast.text(res.Msg, 'top')
                    }
                })
            })
          
      },
    //   课余天地
      addAfterSchool(){
          if(this.$store.state.media.imgDataSource.length == 0 && this.$store.state.media.video.length == 0 && this.content.replace(/\s/g,'') == ''){
             this.$vux.toast.text('照片、视频或内容不能为空', 'top')
             return
           }
            if(this.content.length > 1000){
             this.$vux.toast.text('内容最多1000字', 'top')
             return
           }
           this.addUserType = this.$store.getters['user/roleCode']
            if(this.addUserType == 'Teacher'){
                this.addUserType = '1'
            }else if(this.addUserType == 'Parent'){
                this.addUserType = '2'
            }
            this.$store.state.media.uploadError = false
            this.$store.dispatch('media/upload').then(() => {
                  var param = {
                    classId:this.$store.getters['user/classId'],
                    schoolId:this.$store.getters['user/schoolId'],
                    classImages:this.$store.state.media.imgData.join(),
                    classVideos:this.$store.state.media.video.join(),
                    imageName:this.imageName,
                    sType:this.type,
                    sContent:this.content,
                    addUserId:this.$store.getters['user/loginUserId'],
                    addUserName:this.$store.getters['user/realName'],
                    addUserHead:this.$store.getters['user/img'],
                    addUserType:this.addUserType
                }
                addAfterSchool({data:JSON.stringify(param)}).then(res => {
                    
                    res = JSON.parse(res)
                    if(res.Code == 200){
                        this.$store.state.media.uploadError = true
                        this.toBack()
                    }else{
                        this.$store.state.media.uploadError = true
                        this.$vux.toast.text(res.Msg, 'top')
                    }
                })
            })
         
      },
    //   发布作业快照
       snapshotDistribution (){
           if(!this.subjectItem){
             this.$vux.toast.text('学科不能为空', 'top')
             return
           }
           if(this.$store.state.media.imgDataSource.length == 0 && this.$store.state.media.video.length == 0 && this.content.replace(/\s/g,'') == ''){
             this.$vux.toast.text('照片、视频或内容不能为空', 'top')
             return
           }
             if(this.content.length > 1000){
             this.$vux.toast.text('内容最多1000字', 'top')
             return
           }
         
          
            this.addUserType = this.$store.getters['user/roleCode']
            if(this.addUserType == 'Teacher'){
                this.addUserType = '1'
            }else if(this.addUserType == 'Parent'){
                this.addUserType = '2'
            }
            this.$store.state.media.uploadError = false
            this.$store.dispatch('media/upload').then(() => {
                  var parms = {
                    classId:this.$store.getters['user/classId'],
                    schoolId:this.$store.getters['user/schoolId'],
                    classImages:this.$store.state.media.imgData.join(),
                    classVideos:this.$store.state.media.video.join(),
                    imageName:this.imageName,
                    sContent:this.content,
                    addUserId:this.$store.getters['user/loginUserId'],
                    addUserName:this.$store.getters['user/realName'],
                    addUserHead:this.$store.getters['user/img'],
                    addUserType:this.addUserType,
                    subjectId:this.subjectItem.id,
                    subjectName:this.subjectItem.name
                }
                console.log(parms)
                addJobSnapshot({data:JSON.stringify(parms)}).then((data) => {
                        var res = JSON.parse(data)
                        console.log(res)
                        if(res.Code == 200){
                            this.$store.state.media.uploadError = true
                            this.$vux.toast.text(res.Msg, 'top')
                            this.toBack()
                        }else{
                            this.$store.state.media.uploadError = true
                            this.$vux.toast.text(res.Msg, 'top')
                        }
                        
                        // this.total = res.Data.total
                        
                    })
            })
             
       },
       toBack(){
           this.$router.go(-1)
        //    this.$router.replace('index')
       }
       
    },
     mounted(){
       
    }
}
</script>
<style scoped='sass'>
.addCircle{
    background-color: #ffffff
}
.publish{
    height: 0.88rem;
    line-height: 0.88rem;
    padding: 0 0.24rem;
    font-size: 0.32rem
}
.pu-qu{
 float: left;
 color: #222222
}
.pu-fa{
    float: right;
    color: #0a8de5
}
.updataFile{
    overflow: hidden;
    padding: 0.24rem;
    clear: both;
}
.addImg{
    float: left;
    width: 1.88rem;
    height: 1.88rem;
}
.addTu{
    width: 1.88rem;
    height: 1.88rem;
}
.fileinput-button {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.fileinput-button input{
     position:absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    height: 1.88rem;
}
.imgList li{
    position: relative;
    width: 1.88rem;
    height: 1.88rem;
    float: left;
    margin: 0 0.1rem 0.1rem 0;
    background-size: cover;
    background-position: center center;
}
.img-item{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.del-btn-p{
     position: absolute;
    top:-0.1rem;
    right: 0px;
    background: #fff;
    padding: 0.1rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.5)
}
.del-btn-img{
   
    width: 0.3rem;
    height: 0.3.4rem;
}
.updataText {
    font-size: 0.32rem;
    color: #222;
    font-family: -webkit-body;
    border: 1px solid #eee;
    width: 100%;
    height: 2rem;
    margin-bottom: 0.2rem;
    padding:0.1rem;
    box-sizing: border-box;
}
.subList{
  
    padding: 1rem 0.24rem 0.24rem 0.24rem;
    overflow: auto;
    /* height: 3.3rem; */
    clear: both;
}
.subList li{
    float: left;
    padding: 0.1rem 0.2rem;
    border: 0.01rem solid #bbbbbb;
    border-radius: 0.08rem;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
}
.active{
    border: 0.01rem solid #0a8de5;
    background-color: #0a8de5;
    color: #ffffff
}
.mo-name{font-size: 0.25rem;color: #ccc;}
.add-com-p{position:fixed;z-index: 1000;width: 100%;bottom: 0;border-top: #c9c9c9 1px solid;background: #fafafa;padding: 0.12rem 0.24rem;box-sizing: border-box;}
.add-com-input{display: inline-block;vertical-align: middle;width: 4.5rem;border:1px solid #dedede;height: 0.56rem;padding: 0 0.12rem;border-radius: 0.1rem;background: #fff;}
.add-com-btn{display: inline-block;vertical-align: middle;color: #10578d;padding: 0.1rem 0.2rem;}
.emoji-btn{display: inline-block;vertical-align: middle;width: 0.54rem;height: 0.54rem;padding: 0 0 0 0.24rem;}
.emoji-list{padding: 0.2rem;}
.emoji-item{display: inline-block;font-size: 0.5rem;width: 0.8rem;height: 0.8rem;}
</style>