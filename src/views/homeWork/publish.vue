<template>
    <div id="publish" style="background:#fff;">
        <headNav title="发布作业"></headNav>
    <div class="content">
          <group >
            <selector  title="班级" :options="classList" v-model="clas"></selector>
            <selector  title="科目" :options="subjectList" v-model="subject"></selector>
            <x-textarea title="作业内容" v-model="content" :max="200" placeholder="请输入内容" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
        </group>
        
        <div class="upImgList">
            <div v-for="(item,index) in imgData" :key="index" class="up_box" id="img-box">
                <img class="upPhone" :src="item" />
                <img @click="delImg(item)" class="delImg" src="@/assets/img/homeWork/cha.png" alt="">
            </div>
        </div>
        
        <div>
            <div v-show="imgData.length < 9" @click="chooseImage" class="fileinput-button" style="margin: 0.24rem;">
                <span>拍摄图片</span>
             
            </div>
        </div>
        <div class="confimWork" @click="comfirm">提交作业</div>
    </div>
    <!-- <bottomNav></bottomNav> -->
</div>

</template>
<script>
import { Datetime,Group,Selector,XTextarea,XInput  } from 'vux'
import {getTeacher,uploadWechatImg} from '@/api/commonApi'
import {AddHomeWork,getSubjectList} from '@/api/homeWorkApi'  
// import {getSubjectList } from '@/api/circleApi'
import headNav from '@/components/headNav/headNav';
// import bottomNav from '@/components/bottomNav/bottomNav';  
export default {
     components: {
        Datetime ,Group,Selector,XTextarea,XInput, headNav
    },
    data() {
        return {
            value1:'',
            grade:'',
            // gradeList: [],
            clas:'',
            classList: [],
            subject:'',
            subjectList: [],
            content:'',
            detailData:'',
            detailData:'',
            selClassData:'',
            selSubData:'',
            serverIds:[],
            imgData:[]
        }
    },
    mounted(){
      this.$store.state.user.type = 1
         // h获取老师的数据
       for(var obj of this.$store.state.user.classList){
            let classObj = {}
            classObj.key = obj.ClassId
            classObj.value = obj.GradeName + obj.ClassName 
            this.classList.push(classObj)
        }
        getSubjectList({teacherId:this.$store.getters['user/teacherId']}).then((data) =>{
            var data = JSON.parse(data)
            console.log(data)
            this.subjectData = data.Data.data
            for(var obj of this.subjectData){
                    let subObj = {}
                    subObj.key = obj.id
                    subObj.value = obj.name 
                    this.subjectList.push(subObj)
                }
        }) 
    },
    methods:{
         chooseImage(){
          
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
                                res.media_id = this.serverIds[i]
                                alert(JSON.stringify(res))
                                this.imgData[i] = this.$store.state.user.testImg
                                
                            }
                            
                           resolve()
                        })
                   })
                   proArr.push(promise)
                }
                Promise.all(proArr).then(() => {
                    this.addWork()
                })
            })
        },

        comfirm(){
            if(this.imgData.length == 0){
                this.addWork()
            }else{
                if(!this.check()){
                    return
                }
                this.uploadImage([].concat(this.imgData))
            }
        },
        check(){
            for(var obj of this.$store.state.user.classList){
                // if(this.$store.getters['user/classId'] == obj.ClassId){
                //     this.selClassData = obj
                // }
                if(this.clas == obj.ClassId){
                    this.selClassData = obj
                }
            }
            for(var obj of this.subjectData){
                if(this.subject == obj.id){
                    this.selSubData = obj
                }
            }
            if(!this.selClassData.ClassId){
                 this.$vux.toast.text('班级不能为空', 'top')
                 return false
            }
            if(!this.selSubData.name){
                 this.$vux.toast.text('科目不能为空', 'top')
                 return false
            }
            if(!this.content && this.imgData.length == 0){
                 this.$vux.toast.text('内容不能为空', 'top')
                 return false
            }
            return true
        },

            // 新增家庭作业
        addWork(){
            if(!this.check()){
                return
            }
           console.log(this.selSubData)
            var prams = {
                Content:this.content,
                SubjectName:this.selSubData.name,
                TeacherId:this.$store.getters['user/teacherId'],
                TeacherName:this.$store.getters['user/realName'],
                SchoolId:this.selClassData.SchoolId,
                SchoolName:this.selClassData.SchoolName,
                GradeId:this.selClassData.GradeId,
                GradeName:this.selClassData.GradeName,
                ClassId:this.selClassData.ClassId,
                ClassName:this.selClassData.ClassName,
                Imgs:this.imgData.join()
               
            }
            console.log(prams)
            AddHomeWork(prams).then((data) =>{
               var data = JSON.parse(data)
               if(data.Code == 200){
                    this.$vux.toast.text('提交成功', 'top')
                    this.$router.go(-1)
               }
            })
        },
        delImg(img){
           for(var i = 0;i<this.imgData.length;i++){
                if(this.imgData[i] == img){
                   this.imgData.splice(i,1)
                }
            }
        }
        
    }
}
</script>
<style scoped src="@/assets/css/homeWork.css"></style>
<style scoped>
.upPhone{object-fit: cover;}
</style>
