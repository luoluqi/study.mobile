<template>
    <div class="circleList" @click="Nopraise">
        <div class="circle-list">
            
            <div class="circle-item" v-for="(item,index) in circleData" :key="index">
                <img v-if="item.AddUserHead == '' || item.AddUserHead == 'null'" class="circle-head" src="@/assets/img/default_head.png" alt="">
                <img v-else class="circle-head" :src="item.AddUserHead" alt="">
                <div class="circle-info">
                    <div class="circle-name">{{item.AddUserName}}</div><span class="subject" v-if="type ==2">{{item.SubjectName}}</span>
                    <div :class="{'circle-content':!item.isAll,'circle-content-all':item.isAll}" v-html="replaceUrl(item.SContent)"></div>
                    <div @click="toggleAll(index)" v-show="item.SContent.length > 100" class="all-content">
                        <span v-if="!item.isAll">全文</span>
                        <span v-if="item.isAll">收起</span>
                    </div>
                    <!-- <div  @click="preview(item,1)" v-if="item.ClassImages.length == 1" v-for="(img,index) in item.ClassImages" :key="index">
                        <img class="circle-img-1" :src="img" >
                    </div> -->
                    <div v-if="item.ClassImages" class="workPhotoList" >
                        <pre-view :list='item.listArr'></pre-view>
                    </div>
                    <!-- <div v-if="item.Imgs && item.ClassImages.length != 1" class="workPhotoList" >
                        <pre-view :list='item.listArr'></pre-view>
                    </div> -->


                    <!-- <div class="circle-img-2-9"  @click="preview(item,n)" v-if="item.ClassImages.length != 1" v-for="(img,n) in item.ClassImages" :key="n" :style="{backgroundImage:'url('+img+')'}"></div> -->
                    <div class="vedio" v-if="item.ClassVideos && showModel">
                        <video :src="item.ClassVideos" width="100%" height="100%" 
                            playsinline webkit-playsinline
                            controls
                            controlslist="nodownload  noremoteplayback"
                            oncontextmenu = "return false"
                            disablePictureInPicture = "true"
                         ></video>
                    </div>
                    <div class="operation">
                        <span>{{item.AddDate | offsetTime}}</span>
                        <label v-show="operatorUid == item.AddUserId" @click="circleDel(item.Id)">删除</label>
                        <img @click.stop="praise(index)" src="@/assets/img/circle/com-btn.png"/>
                        <div class="zanAdd" v-if="item.zanShow">
                            <ul>
                                <li v-if="!item.isLike" @click="giveLike(item)" style="border-right: 0.01rem solid #3a3f42;"><img src="@/assets/img/circle/zan-white.png" alt=""><span>赞</span></li>
                                <li v-if="item.isLike" @click="DeleteZan(item)" style="border-right: 0.01rem solid #3a3f42;"><img src="@/assets/img/circle/zan-white.png" alt=""><span>取消</span></li>
                                <li @click.stop="showAddComment(item)"><img src="@/assets/img/circle/com.png" alt=""><span>评论</span></li>
                            </ul>
                        </div>
                    </div>
                    <div v-if="item.likeList.length > 0 || item.commentList.length > 0" class="discuss">
                        <img class="arrow" src="@/assets/img/circle/arrow.png" alt="">
                        <div class="discussItem">
                            <div v-if="item.likeList.length > 0" class="item-zan">
                                <img src="@/assets/img/circle/zan-blue.png" alt="">
                                <p>
                                    <span v-for="(like,n) in item.likeList" :key="n">
                                        {{like.OperatorUName}}
                                        <label v-if="n < item.likeList.length -1">,</label>
                                    </span>
                                </p>
                            </div>
                            <div v-if="item.commentList.length > 0" class="discussList">
                                <ul>
                                    <li v-for="(comment,index) in item.commentList" :key="index" class="discus-item"
                                    @click.stop="showAddComment(item,comment)">
                                        <span>{{comment.OperatorUName}}</span>
                                        <label v-show="comment.Pid">回复</label>
                                        <span  v-show="comment.Pid">{{comment.ParentAddUserName}}</span>
                                        <label>：{{comment.CommentContent}}</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        <div v-show="isAddCom" @click.stop class="add-com-p">
            <textarea id="addComInput" v-model.trim="commentContent" class="add-com-input"></textarea>
            <!-- <img @click.stop="toggleEmoji" class="emoji-btn" src="@/assets/img/circle/emoji.png" alt=""> -->
            <div @touchstart="addComment" class="add-com-btn">发送</div>
            <div v-show="showEmoji" class="emoji-list">
                <div v-for="(item,index) in emojiList" :key="index" @click="insertEmoji(item)" class="emoji-item">{{item}}</div>
            </div>
        </div>

        <div class="load-p">
			 <load-more v-if="isMore" :tip="'正在加载'"></load-more>
    		<load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
		</div>
        <div v-show="isPreview" @click="closePreview" class="preview-img">
              <div class="preview-con">
                   <swiper class="swiper" height="100%" v-model="previewIndex">
                        <swiper-item class="swiper-item" style="height:100%;width:100%;" v-for="(item, index) in previewList" :key="index">
                            <img :src="item" class="swiper-img">
                        </swiper-item>
                    </swiper>
              </div>
             
        </div>
    </div>
</template>
<script>
import {pageListByClassIdSType,addZan,getListByRecordId,deleteZan,addComment,deleteCircle,getCommentList,deleteComment} from "@/api/circleApi"
import emoji from '@/util/emoji'
import insertEmoji from '@/util/insertEmoji'
import bus from '@/util/bus'
import preView from '@/components/preview'
import { LoadMore,Swiper,SwiperItem } from 'vux'

export default {
   name:'circleList',
   
    components:{
       LoadMore,Swiper,SwiperItem,preView
    },
    data () {
        return {
        
           commentContent:'​​​​​​​​​​​​​​​',
           showEmoji:false,
           emojiList :emoji,
          
           isPreview:false,
           previewList:[],
           previewIndex:0
         
        }
    },
    computed:{
         operatorUid(){
            return this.$store.getters['user/loginUserId']
           
        },
        operatorUName(){
             return this.$store.getters['user/realName']
           
        },
         modularName(){
            return this.$store.getters['circle/modularName']
        },
        circle(){
            return this.$store.state.circle.circle
        },
       isMore(){
           return this.$store.state.circle.isMore
       },
       circleData(){
           return this.$store.state.circle.circleData
       },
       isAddCom(){
           return this.$store.state.circle.isAddCom
       },
       type(){
           return this.$store.state.circle.type
       },
       showModel () {
            return this.$store.state.media.showModel
        }
    },
    mounted(){
        
       
         this.$store.commit('circle/clearData')
         
           this.$store.dispatch('circle/circleDataList')      
    },
    methods: {
      praise (index) {
         this.$store.dispatch('circle/praise',index)
      },
      Nopraise () {
         this.$store.dispatch('circle/Nopraise')
      },
     

    //   列表
      circleDataList(){
          this.$store.dispatch('circle/circleDataList')
      },
    //   删除
      circleDel (id){
         this.$store.dispatch('circle/circleDel',id)
         
      },
    //   点赞
       giveLike(item){
            this.$store.dispatch('circle/giveLike',item)
      },
    //   取消点赞
    DeleteZan(item){
        this.$store.dispatch('circle/DeleteZan',item)
    },
    
      showAddComment(item,comment){
          this.commentContent = ''
           this.$store.dispatch('circle/showAddComment',{item,comment})
      },
      toggleEmoji(){
          this.showEmoji = !this.showEmoji
      },
      insertEmoji(item){
         
          insertEmoji('addComInput',item)
          this.commentContent = document.getElementById('addComInput').value
      },
      addComment(){
          console.log(this.circle,this.pid)
          console.log(this.commentContent)
          if(this.commentContent.length > 1000 ){
               this.$vux.toast.text('评论最多1000字', 'top')
               console.log(this.commentContent.length)
              return
          }
         
          this.$store.dispatch('circle/addComment',{content:this.commentContent}).then(() => {
               this.commentContent = ''
              this.showEmoji = false
          })
          
      },
      
      preview(item,index){

          
            wx.previewImage({
                current: item.ClassImages[index], // 当前显示图片的http链接
                urls: item.ClassImages // 需要预览的图片http链接列表
            })

        //   var list = item.ClassImages
        //   this.previewList = list
         
        //   this.isPreview = true
        //    if(index){
        //       this.previewIndex = index
        //   }else{
        //       this.previewIndex = 0
        //   }
      },
      closePreview(){
          this.isPreview = false
      },
      toggleAll(index){
         
          this.$store.dispatch('circle/toggleAll',index)
      }
    }
    
}
</script>
<style scoped>
 .circle-img-1{max-width: 3.5rem;max-height: 7rem;display: inline-block}

 .circle-img-2-9{
     width: 1.8rem !important;
     height: 1.8rem;
     background-size: cover;
     background-position: center center; 
     display: inline-block;
     margin:0 0.1rem 0.1rem 0;
 }

.circle-list{background-color: #ffffff}
.circle-item{
    overflow: hidden;
    margin-bottom: 0.3rem;
    padding: 0.24rem;
    border-bottom: 1px solid #eee;
}
.circle-head{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.08rem;
    float: left;
}
.circle-info{
    float: left;
    width: 5.72rem;
    margin-left: 0.2rem;
}
.circle-name{
    font-size: 0.28rem;
    color: #10578d;
    display: inline-block;
}
.circle-content{
    font-size: 0.28rem;
    line-height: 0.4rem;
    margin-bottom: 0.15rem;
    margin-top: 0.06rem;
    word-break: break-word;
        white-space: pre-wrap;
     /*! autoprefixer: off */
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    /*! autoprefixer: on */
}
.circle-content-all{
     line-height: 0.4rem;
    margin-bottom: 0.15rem;
    margin-top: 0.06rem;
    word-break: break-word;
    white-space: pre-wrap;
}
.operation{
    height: 0.54rem;
    line-height: 0.54rem;
    position: relative;
}
.operation > span{
  font-size: 0.24rem;
  color: #666666;
}
.operation label{
  font-size: 0.24rem;
  color: #0a8de5;
  margin-left: 0.5rem;
}
.operation > img{
    float: right;
    width: 0.42rem;
    height: 0.28rem;
    margin-top: 0.12rem;
}
.discussItem{
    background-color: #f3f3f5;
    border-radius: 0.04rem;
}
.discuss{
    position: relative;
    padding-top: 0.12rem;
}
.arrow{
    width: 0.24rem;
    height: 0.12rem;
    position: absolute;
    top: 0;
    left: 0.2rem;
}
.item-zan{
    line-height: 0.5rem;
    font-size: 0.28rem;
    color: #10578d;
    padding: 0 0.14rem;
}
.item-zan img{
    float: left;
    width: 0.24rem;
    height: 0.24rem;
    margin-top: 0.12rem;
    margin-right: 0.1rem
}
.discussList{
     border-top: 0.01rem solid #e1e2e2;
    padding: 0 0.14rem;
    line-height: 0.5rem;
}
.discussList span{
    color: #10578d;
    font-size: 0.28rem;
}
.discussList label{
    color: #222222;
    font-size: 0.28rem;
}
.discus-item{
    word-break: break-word;
}
.zanAdd{
    background-color: #4c5154;
    width: 3.46rem;
    height: 0.76rem;
    border-radius: 0.1rem;
    position: absolute;
    right: 0.48rem;
    z-index: 999;
    top: -0.18rem;
}
.zanAdd li{
   width: 49.8%;
    float: left;
    line-height: 0.46rem;
    text-align: center;
    font-size: 0.28rem;
    color: #ffffff;
    margin: 0.15rem 0;
}
.zanAdd li img{
    width: 0.3rem;
    height: 0.3rem;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.1rem;
}
.subject{
    float: right;
    height: 0.38rem;
    color: #ff9900;
    border: 0.01rem solid #ff9900;
    line-height: 0.38rem;
    display: inline-block;
    padding: 0 0.1rem;
    border-radius: 0.06rem;
    font-size: 0.2rem;
}
.add-com-p{position:fixed;z-index: 10;width: 100%;bottom: 0;border-top: #c9c9c9 1px solid;background: #fafafa;padding: 0.12rem 0.24rem;box-sizing: border-box;}
.add-com-input{display: inline-block;vertical-align: middle;width: 5.5rem;
font-size: 0.24rem;
border:1px solid #dedede;height: 0.76rem;padding: 0 0.12rem;border-radius: 0.1rem;background: #fff;}
.add-com-btn{display: inline-block;vertical-align: middle;color: #10578d;padding: 0.1rem 0.2rem;font-size: 0.3rem;}
.emoji-btn{display: inline-block;vertical-align: middle;width: 0.54rem;height: 0.54rem;padding: 0 0 0 0.24rem;}
.emoji-list{padding: 0.2rem;}
.emoji-item{display: inline-block;font-size: 0.5rem;width: 0.8rem;height: 0.8rem;}
.load-p{
	padding: 1rem 0 0 0;
}
.preview-img{position: fixed;z-index: 200;top:0;bottom:0;left:0;right:0;background: #000;}

.preview-con{width: 100%;height: 100%;}
.swiper{width: 100%;height: 100%;}
.swiper-item{text-align: center;font-size: 0;}
.swiper-item::before{display: inline-block;vertical-align: middle;content: '';height: 100%;}
.swiper-img{max-width: 100%;max-height: 100%;display: inline-block;vertical-align: middle;}
.all-content{color: #10578d;padding: 0 0 0.2rem 0;}
.vedio{
    width: 100%;
    height: 2.5rem;
    margin-top: 0.2rem;
}
</style>