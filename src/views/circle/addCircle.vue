<template>
    <div class="addCircle">
        <div class="publish">
            <span @click="toBack" class="pu-qu">取消</span>
            <span class="pu-fa" @click="publish">发表<span class="mo-name">({{modularName}})</span></span>
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
           
            <div v-show="imgData.length < 9"  class="addImg" >
                <span class="fileinput-button">
                    <img @click="chooseImage" class="addTu" src="@/assets/img/circle/addImg.png" alt="">
                    <!-- <input type="file" id="pic" name="pic" 
                    multiple accept="image/*"  
                    @change="updataFile($event)" /> -->
                </span>
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
    </div>
</template>
<script>
import {uploadFile,getSubjectList,addJobSnapshot,addCircle,addAfterSchool} from "@/api/circleApi"
import {GetConfig} from "@/api/chekingApi"
import {uploadWechatImg} from '@/api/commonApi'
import emoji from '@/util/emoji'
import insertEmoji from '@/util/insertEmoji'
import   cookie from '@/util/cookie'
export default {
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
        }
    },
   
    methods:{
      preview(list,img){
           wx.previewImage({
                current: img, // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            })
      },
       chooseImage(){
           var self = this
          wx.chooseImage({
                count: 9 - this.imgData.length, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    console.log('chooseImage success',localIds)
                    this.imgData = this.imgData.concat(localIds)
                   
                }
            });
        },
        publish(){
            if(this.imgData.length == 0){
                this.addData()
            }else{
                if(this.type == 2){
                    if(!this.subjectItem){
                        this.$vux.toast.text('学科不能为空', 'top')
                        return
                    }
                }
                this.uploadImage([].concat(this.imgData))
            }
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
        uploadImage(localIds){
            var localId = localIds.shift();
            var self = this
            wx.uploadImage({
                localId: localId,
                isShowProgressTips: 1,
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    //其他对serverId做处理的代码
                    self.serverIds.push(serverId)
                    if(localIds.length > 0){
                        self.uploadImage(localIds);
                    }else{
                        self.uploadServeId()
                    }
                }
            })
        },
        uploadServeId(){
            var self = this
            var schoolId = this.$store.getters['user/schoolId']
            this.$store.dispatch('user/getAccessToken').then(access_token => {
                var proArr = []
                for(let i = 0;i<this.serverIds.length;i++){
                    var promise = new Promise((resolve,reject) => {
                       uploadWechatImg({
                            schoolId:schoolId,
                            access_token:access_token,
                            media_id:this.serverIds[i]
                        }).then(res => {
                          
                            if(res.data){
                                this.imgData[i] = res.data
                            }else{
                                this.imgData[i] = this.$store.state.user.testImg
                                
                            }
                            
                           resolve()
                        })
                   })
                   proArr.push(promise)
                }
                Promise.all(proArr).then(() => {
                    this.addData()
                })
            })
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

        // 上传图片
       updataFile(event){
          this.imgTemp = []
           var list = event.target.files
           var length = list.length
           if(length > 9){
               length = 9
           }
           var proArr = []
            for(let i = 0;i<length;i++){
                var file = list[i]
                 proArr.push(this.uploadImg(file,i))
            }
            Promise.all(proArr).then(() => {
                
                this.imgData = this.imgData.concat(this.imgTemp)
                this.imgTemp = []
                document.getElementById('pic').value = ''
            })
          
       },
       uploadImg(file,index){
           return new Promise((resovle,reject) => {
                var formData = new FormData()
                formData.append("file",file)
                uploadFile(formData).then((data) => {
                    var res = JSON.parse(data)
                    res.Data.fileUrl = res.Data.fileUrl.replace(/\\/g,'/')
                  
                    this.imgTemp[index] = res.Data.fileUrl
                    resovle()
                   
                })
           })
           
       },
       deleteImg(index){
            this.imgData.splice(index,1)
       },
  
    //    选择科目
      selSubject(index,item){
         this.active = index
         this.subjectItem = item
      },
      
      
      addCircle(){
          
          if(this.imgData.length == 0 && this.content.replace(/\s/g,'') == ''){
             this.$vux.toast.text('照片或内容不能为空', 'top')
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
          var param = {
              classId:this.$store.getters['user/classId'],
              schoolId:this.$store.getters['user/schoolId'],
              classImages:this.imgData.join(','),
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
                  this.toBack()
              }else{
                   this.$vux.toast.text(res.Msg, 'top')
              }
          })
      },
      addAfterSchool(){
          if(this.imgData.length == 0 && this.content.replace(/\s/g,'') == ''){
             this.$vux.toast.text('照片或内容不能为空', 'top')
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
          var param = {
              classId:this.$store.getters['user/classId'],
              schoolId:this.$store.getters['user/schoolId'],
              classImages:this.imgData.join(','),
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
                  this.toBack()
              }else{
                   this.$vux.toast.text(res.Msg, 'top')
              }
          })
      },
    //   发布作业快照
       snapshotDistribution (){
           if(!this.subjectItem){
             this.$vux.toast.text('学科不能为空', 'top')
             return
           }
           if(this.imgData.length == 0 && this.content.replace(/\s/g,'') == ''){
             this.$vux.toast.text('照片或内容不能为空', 'top')
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
            
             var parms = {
                 classId:this.$store.getters['user/classId'],
                 schoolId:this.$store.getters['user/schoolId'],
                 classImages:this.imgData.join(','),
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
                      if(res.Code == '200'){
                         this.$vux.toast.text(res.Msg, 'top')
                         this.toBack()
                      }
		  			
		  			// this.total = res.Data.total
		  			
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
.add-com-p{position:fixed;z-index: 10;width: 100%;bottom: 0;border-top: #c9c9c9 1px solid;background: #fafafa;padding: 0.12rem 0.24rem;box-sizing: border-box;}
.add-com-input{display: inline-block;vertical-align: middle;width: 4.5rem;border:1px solid #dedede;height: 0.56rem;padding: 0 0.12rem;border-radius: 0.1rem;background: #fff;}
.add-com-btn{display: inline-block;vertical-align: middle;color: #10578d;padding: 0.1rem 0.2rem;}
.emoji-btn{display: inline-block;vertical-align: middle;width: 0.54rem;height: 0.54rem;padding: 0 0 0 0.24rem;}
.emoji-list{padding: 0.2rem;}
.emoji-item{display: inline-block;font-size: 0.5rem;width: 0.8rem;height: 0.8rem;}
</style>