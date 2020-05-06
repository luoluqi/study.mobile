<template>
    <div id="Work">
        <headNav title="作业详情"></headNav>
        <div class="s_scetion" v-for="(item,index) in workList" :key="index">
            <div class="subWei">
                <h2>{{item.SubjectName}}</h2>
                <!-- <div class="yiwei" @click="detailShow(item.Id)"><label>已读</label><span>{{item.isRead}}</span><label>/{{item.Number}}</label></div> -->
            </div>
            <p>{{item.Content}}</p>
            <div class="zuoyeList">
                <ul >
                    <li @click="previewImg(item.Imgs,img)" v-for="(img,index) in item.Imgs" :key="index"><img  :src="img | imgUrl" /></li>
                </ul>
            </div>
            <p><label>{{item.CreateTime | formatDateTime('YYYY-MM-DD')}}</label></p>
        </div>
        
        <div class="tanDetail" v-if="isShow">
            <div class="win"></div>
            <div class="modal">
                <div class="topTitle">查看详情</div>
                <div class="scollList">
                     <div class="pDetail">
                        <p class="weiRen"><span>未读</span><label>（{{unreadCount}}人）</label></p>
                        <div class="nameList">
                            <ul>
                                <li v-for="(item,index) in unreadList" :key="index"><span>{{item.ParentName}}</span><label for="">（{{item.StudentNames}}）</label></li>
                            </ul>
                        </div>
                    </div>
                    <div class="pDetail">
                        <p class="weiRen"><span>已读</span><label style="color: #0a8de5;">（{{readCount}}人）</label></p>
                        <div class="nameList">
                            <ul>
                                <li v-for="(item,index) in readList" :key="index"><span>{{item.ParentName}}</span><label for="">（{{item.StudentNames}}）</label></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chacha" @click="detailHide"><img src="@/assets/img/homeWork/bai-cha.png"/></div>
        </div>
        <div class="box">
            <img src="@/assets/img/homeWork/23132.jpg" />
        </div>
        <bottomNav></bottomNav>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import bottomNav from '@/components/bottomNav/bottomNav'
import {GetReadList,SetRead} from '@/api/homeWorkApi'
export default {
     components:{
       headNav,
       bottomNav
    },
    data() {
        return {
            isShow:false,
            workList:'',
            imgList:'',
            readCount:'', 
            readList:'',
            unreadList:'',
            unreadCount:'',
            idList:[]
        }
    },
    mounted(){
        this.$store.state.user.type = 2
      var list = this.$store.state.user.workItem
      if(!list){
            this.$router.push('parentWorkList')
      }
      for(var item of list){
          if(item.Imgs){
              item.Imgs = item.Imgs.split(',')
          }else{
              item.Imgs = []
          }
      }
      this.workList = list
      console.log(this.workList)
      this.isRead()

    },
    methods:{
      
        previewImg(list,img){

          
            wx.previewImage({
                current: img, // 当前显示图片的http链接
                urls: list // 需要预览的图片http链接列表
            })

        },
        // detailShow (homeWorkId){
        //     this.isShow = true
        //     alert(homeWorkId)
        //     GetReadList({homeWorkId:homeWorkId}).then((data) =>{
        //         var data = JSON.parse(data)
        //         if(data.Code == 200){
        //            this.readCount = data.Data.readCount
        //            this.readList = data.Data.readList
        //            this.unreadList = data.Data.unreadList
        //            this.unreadCount = data.Data.unreadCount
        //         }
        //     })

        // },
        detailHide (){
            this.isShow = false
        },
        // s设置已读
        isRead(){
           //   设置已读list
            for(var itemId of this.workList){
                this.idList.push(itemId.Id)
            }
            console.log(this.idList)
            var prams = {
                parentId:this.$store.getters['user/parentId'],
                homeWorkIds:this.idList.join()
            }
            SetRead({data:JSON.stringify(prams)}).then((data) =>{
                var data = JSON.parse(data)
            })
        }
    }
}
</script>
<style scoped src="@/assets/css/homeWork.css"></style>