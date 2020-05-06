<template>
    <div class="circleList" @click="Nopraise">
        <div class="circle-list">
            <div class="circle-item" v-for="(item,index) in circleData" :key="index">
                <img class="circle-head" :src="item.AddUserHead" alt="">
                <div class="circle-info">
                    <div class="circle-name">{{item.AddUserName}}</div><span class="subject" v-if="type ==2">{{item.SubjectName}}</span>
                    <div :class="{'circle-content':!isAll,'circle-content-all':isAll}">{{item.SContent}}</div>
                    <div @click="toggleAll" v-show="item.SContent.length > 100" class="all-content">
                        <span v-if="!isAll">全文</span>
                        <span v-if="isAll">收起</span>
                    </div>
                    <div class="circle-img-1" @click="preview(item)" v-if="item.ClassImages.length == 1" v-for="(img,index) in item.ClassImages" :key="index" :style="{backgroundImage:'url('+img+')'}"></div>
                    <div class="circle-img-2-9"  @click="preview(item,n)" v-if="item.ClassImages.length != 1" v-for="(img,n) in item.ClassImages" :key="n" :style="{backgroundImage:'url('+img+')'}"></div>
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
                                    <span v-for="(like,n) in item.likeList" :key="n">{{like.OperatorUName}},</span>
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
            <input :id="'addComInput'+type" v-model="commentContent" class="add-com-input" type="text">
            <img @click.stop="toggleEmoji" class="emoji-btn" src="@/assets/img/circle/emoji.png" alt="">
            <div @click.stop="addComment" class="add-com-btn">发送</div>
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
import bus from '@/util/bus'
import { LoadMore,Swiper,SwiperItem } from 'vux'

export default {
   name:'circleList',
    props: {
        type: {
        type: Number,
        default: null
        }
    },
    components:{
       LoadMore,Swiper,SwiperItem
    },
    data () {
        return {
           index: 0,
           isMore:true,
           pageNum:0,
			pageSize:8,
           circleData:[],
         
           likeData:[],
           isAddCom:false,
           commentContent:'​​​​​​​​​​​​​​​',
           showEmoji:false,
           emojiList :emoji,
           circle:null,
           pid:null,
           isPreview:false,
           previewList:[],
           previewIndex:0,
           isAll:false
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
             var modularName = ''
             if(this.type == 0){
                modularName = '班级风采'
            }
            if(this.type == 1){
                modularName = '课余天地'
            }
            if(this.type == 2){
                modularName = '作业快照'
            }
            return modularName
        }
    },
    mounted(){
        
       if(this.type == 0){
        //    班级风采
         this.circleDataList()
       }else if(this.type == 1){
        //    课余天地
         this.circleDataList()
       }else if(this.type == 2){
        //    作业快照
         this.circleDataList()
       } 

       bus.$on('loadMore',() => {
           console.log('load more....',this.type)
          
            this.circleDataList()
       })
       bus.$on('changeSubject',() => {
           
         console.log('change subject...',this.type)

           this.pageNum = 0
           
           this.circleDataList()
       })
    },
    methods: {
      praise (index) {
          for(var i = 0;i<this.circleData.length;i++){
              this.circleData[i].zanShow = false
          }
          this.index = index
          this.circleData[index].zanShow = true
      },
      Nopraise () {
         this.circleData[this.index].zanShow = false
         this.isAddCom = false
      },
     

    //   列表
      circleDataList(){
          
          if(!this.isMore){
              return
          }
          this.pageNum++
          pageListByClassIdSType({
		  		pageIndex:this.pageNum,
				pageSize:this.pageSize,
		  		classId:this.$store.getters['user/classId'],
				sType:this.type
		  		}).then((data) => {
                      var res = JSON.parse(data)
		  			if(res.Data.data.length < this.pageSize){
                          this.isMore = false
                      }
		  			for(let obj of res.Data.data){
                          obj.likeList = []
                           obj.isLike =false
                           obj.commentList = []
                         
                           obj.zanShow = false
                           
                           if(obj.ClassImages){
                               obj.ClassImages = obj.ClassImages.replace(/\\/g,'/')
                                    obj.ClassImages = obj.ClassImages.split(',')
                                    
                                for(var i = 0; i < obj.ClassImages.length; i++){
                                    var img = obj.ClassImages[i]
                                    if (/^http/.test(img)) {
                                    
                                        } else {
                                            obj.ClassImages[i] =  'http://' + img
                                        }
                                }  
                           }else{
                               obj.ClassImages = []
                           }
                                 
                    }
                       
                    var proList = []
                    for (let i =0;i<res.Data.data.length;i++){
                         let temp = res.Data.data[i]
                        let pro = new Promise((resolve,reject) => {
                            this.GetListByRecordId(temp).then(likeList => {
                                temp.likeList = likeList
                                temp.isLike = false
                                for(var like of likeList){
                                    if(like.OperatorUid == this.operatorUid) {
                                        temp.isLike = true
                                    }
                                }     
                                resolve()
                            })
                        })

                        let pro1 = new Promise((resolve,reject) => {
                             this.getCommentList(temp).then(commentList => {
                                temp.commentList = commentList
                                resolve()
                            })
                        })
                       
                        proList.push(pro)
                         proList.push(pro1)
                       
                    }  
                    Promise.all(proList).then(() => {
                         this.circleData = this.circleData.concat(res.Data.data) 
                    })
		  			
		  			
		  		})
      },
    //   删除
      circleDel (id){
         
          this.$vux.confirm.show({
                title: '提示',
                content: '确定删除？',
              
                onConfirm : () => {
                    deleteCircle(id).then(res => {
                        for(var i = 0;i<this.circleData.length;i++){
                            if(this.circleData[i].Id == id){
                                this.circleData.splice(i,1)
                            }
                        }
                    })
                }
            })
      },
    //   点赞
       giveLike(item){
           var parms = {
               recordId:item.Demeanorid,
				operatorUid:this.operatorUid,
		  		operatorUName:this.operatorUName,
                schoolId:item.SchoolId,
                classId:item.ClassId,
                modularName:this.modularName
           }
          addZan({data:JSON.stringify(parms)}).then((data) => {
		  			var res = JSON.parse(data)
		  			
		  			if(res.Code == '200'){
                         this.$vux.toast.text(res.Msg, 'top')
                         this.GetListByRecordId(item).then(likeList => {
                             for(var i = 0;i<this.circleData.length;i++){
                                 
                                 if(item.Id == this.circleData[i].Id){
                                     this.circleData[i].likeList = likeList
                                     this.circleData[i].isLike = true
                                     this.$set(this.circleData,i,this.circleData[i])
                                 }
                             }
                         })
                      }
		  			
		  		})
      },
    //   取消点赞
    DeleteZan(item){
        var aLikeId = ''
        for(var obj of item.likeList){
            if(this.operatorUid == obj.OperatorUid){
                aLikeId = obj.ALikeId
            }
        }
         var parms = {
               aLikeId:aLikeId
           }
          deleteZan(parms).then((data) => {
		  			var res = JSON.parse(data)
		  			
		  			if(res.Code == '200'){
                         this.$vux.toast.text(res.Msg, 'top')
                         this.GetListByRecordId(item).then(likeList => {
                             for(var i = 0;i<this.circleData.length;i++){
                                 
                                 if(item.Id == this.circleData[i].Id){
                                     this.circleData[i].likeList = likeList
                                     this.circleData[i].isLike = false
                                     this.$set(this.circleData,i,this.circleData[i])
                                 }
                             }
                         })
                      }
		  			
		  		})
    },
    //   获取点赞记录
      GetListByRecordId(item){
          return new Promise((resolve,reject) => {
            
            var parms = {
                recordId:item.Demeanorid,
                    schoolId:item.SchoolId,
                    classId:item.ClassId,
                    modularName:this.modularName
            }
            getListByRecordId(parms).then((data) => {
                var res = JSON.parse(data)
              
                if(res.Code == '200'){
                    resolve(res.Data)
                    
                }else{
                     resolve([])
                }
                
                })
         })
      },
      showAddComment(item,comment){ //CommentId
          
           this.circle = item
           if(comment){
               this.pid = comment.CommentId
           }else{
               this.pid = ''
               comment = {}
           }
            
          if(comment.OperatorUid == this.$store.getters['user/loginUserId']){
              this.$vux.confirm.show({
                title: '提示',
                content: '确定删除评论？',
              
                onConfirm : () => {
                    deleteComment({
                        commentId:this.pid
                    }).then(res => {
                        res = JSON.parse(res)
                        this.getCommentList(this.circle).then(commentList => {
                            for(var i = 0;i<this.circleData.length;i++){
                                    if(this.circle.Id == this.circleData[i].Id){
                                        this.circleData[i].commentList = commentList
                                        this.$set(this.circleData,i,this.circleData[i])
                                    }
                                }
                        })
                    })
                }
            })
          }else{
               
                this.circleData[this.index].zanShow = false

                this.isAddCom = true
                setTimeout(() => {
                    document.getElementById('addComInput'+this.type).focus()
                },100)
          }
          
         
      },
      toggleEmoji(){
          this.showEmoji = !this.showEmoji
      },
      insertEmoji(item){
          this.commentContent += item
           document.getElementById('addComInput'+this.type).focus()
      },
      addComment(){
          console.log(this.circle,this.pid)
          console.log(this.commentContent)
          if(this.commentContent.length > 100 ){
               this.$vux.toast.text('评论最多200字', 'top')
              return
          }
          if(!this.pid){
              this.pid = ''
          }
          var param = {
              recordId:this.circle.Demeanorid,
              commentContent:this.commentContent,
              operatorUid:this.operatorUid,
              operatorUName:this.operatorUName,
              schoolId:this.circle.SchoolId,
              classId:this.circle.ClassId,
              modularName:this.modularName,
              pid:this.pid
          }
          addComment({
              data: JSON.stringify(param)
          }).then(res => {
              this.commentContent = ''
              this.showEmoji = false
              this.getCommentList(this.circle).then(commentList => {
                   for(var i = 0;i<this.circleData.length;i++){
                        if(this.circle.Id == this.circleData[i].Id){
                            this.circleData[i].commentList = commentList
                            this.$set(this.circleData,i,this.circleData[i])
                        }
                    }
              })
          })
      },
      getCommentList(item){
          return new Promise((resolve,reject) => {
               getCommentList({
                    recordId:item.Demeanorid,
                    schoolId:item.SchoolId,
                    classId:item.ClassId,
                    modularName:this.modularName
                }).then((res) => {
                   
                    res = JSON.parse(res)
                    if(res.Code == 200){
                        resolve(res.Data)
                    }else{
                        console.error('getCommentList')
                        reject()
                    }
                })
          })
         
      },
      preview(item,index){
          var list = item.ClassImages
          this.previewList = list
         
          this.isPreview = true
           if(index){
              this.previewIndex = index
          }
      },
      closePreview(){
          this.isPreview = false
      },
      toggleAll(){
          this.isAll = !this.isAll
      }
    }
    
}
</script>
<style scoped='sass'>
 .circle-img-1{background-size: cover;background-position: center center;  width: 3.45rem;height: 2.64rem;display: inline-block}

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
     display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
}
.circle-content-all{
     line-height: 0.4rem;
    margin-bottom: 0.15rem;
    margin-top: 0.06rem;
    word-break: break-word;
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
.add-com-input{display: inline-block;vertical-align: middle;width: 4.5rem;border:1px solid #dedede;height: 0.56rem;padding: 0 0.12rem;border-radius: 0.1rem;background: #fff;}
.add-com-btn{display: inline-block;vertical-align: middle;color: #10578d;padding: 0.1rem 0.2rem;}
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
</style>