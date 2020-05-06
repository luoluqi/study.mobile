import Vue from 'vue'
import {getSubjectList,pageListByClassIdSType,addZan,getListByRecordId,
    deleteZan,addComment,deleteCircle,getCommentList,deleteComment} from "@/api/circleApi"

const circle = {
    namespaced: true,
    state: {
       
        subjectData:[],
        subjectId:'',

        circleData:[],
        index:0,
        isAddCom:false,
        isMore:true,
        pageNum:0,
        pageSize:8,
        type:3,
        circle:'',
        pid:'',

      
    },
    getters: {
        modularName(state, getters, rootState, rootGetters){
            var modularName = ''
            if(state.type == 3){
               modularName = '班级风采'
           }
           if(state.type == 1){
               modularName = '课余天地'
           }
           if(state.type == 2){
               modularName = '作业快照'
           }
           return modularName
       }
    },
    mutations: {
       clearData(state){
            state.pageNum = 0
            state.isMore = true
            state.circleData = []
            state.subjectId = ''

       }
    },
    actions: {
        getSubjectData({state,rootState,rootGetters}){
            
            getSubjectList({
                   schoolId:rootGetters['user/schoolId'],
                   gradeId:rootState.user.gradeId
                   }).then((data) => {
                       var list = data.Data
                        for (var item of list) {
                            item.id = item.Id
                            item.name = item.Name
                        }
                           
                            state.subjectData = list
                       
                   })
        },
        praise ({state},index) {
            for(var i = 0;i<state.circleData.length;i++){
                state.circleData[i].zanShow = false
            }
            state.index = index
            state.circleData[index].zanShow = true
        },
        Nopraise ({state}) {
            state.circleData[state.index].zanShow = false
            state.isAddCom = false
        },
         //   列表
        circleDataList({state,rootGetters,dispatch}){
          
            if(!state.isMore){
                return
            }
            state.pageNum++
            pageListByClassIdSType({
                pageIndex:state.pageNum,
                pageSize:state.pageSize,
                classId:rootGetters['user/classId'],
                sType:state.type,
                subjectId:state.subjectId
            }).then((data) => {
                        var res = JSON.parse(data)
                        console.log(res)
                        if(res.Data.data.length < state.pageSize){
                            state.isMore = false
                        }
                        for(let obj of res.Data.data){
                            obj.likeList = []
                             obj.isLike =false
                             obj.commentList = []
                             obj.isAll = false
                             obj.zanShow = false
                             
                             if(obj.ClassImages){
                                 obj.ClassImages = obj.ClassImages.replace(/\\/g,'/')
                                      obj.ClassImages = obj.ClassImages.split(',')
                                      var imgArr = []
                                      obj.ClassImages.forEach((item,index) => {
                                            var obj2 = {src: item, msrc: item}
                                            imgArr.push(obj2)
                                        })

                                      obj.listArr = imgArr
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
                            dispatch('GetListByRecordId',temp).then(likeList => {
                                  temp.likeList = likeList
                                  temp.isLike = false
                                  for(var like of likeList){
                                      if(like.OperatorUid == rootGetters['user/loginUserId']) {
                                          temp.isLike = true
                                      }
                                  }     
                                  resolve()
                              })
                          })
  
                          let pro1 = new Promise((resolve,reject) => {
                            dispatch('getCommentList',temp).then(commentList => {
                                  temp.commentList = commentList
                                  resolve()
                              })
                          })
                         
                          proList.push(pro)
                           proList.push(pro1)
                         
                      }  
                      Promise.all(proList).then(() => {
                           state.circleData = state.circleData.concat(res.Data.data) 
                      })
                        
                        
                    })
        },
        //   删除
      circleDel ({state},id){
         
            Vue.$vux.confirm.show({
                title: '提示',
                content: '确定删除？',
                
                onConfirm : () => {
                    deleteCircle(id).then(res => {
                        for(var i = 0;i<state.circleData.length;i++){
                            if(state.circleData[i].Id == id){
                                state.circleData.splice(i,1)
                            }
                        }
                    })
                }
            })
        },
        //   点赞
       giveLike({state,getters,rootGetters,dispatch},item){
            var parms = {
                recordId:item.Demeanorid,
                operatorUid:rootGetters['user/loginUserId'],
                operatorUName:rootGetters['user/realName'],
                schoolId:item.SchoolId,
                classId:item.ClassId,
                modularName:getters.modularName
            }
            addZan({data:JSON.stringify(parms)}).then((data) => {
                        var res = JSON.parse(data)
                        
                        if(res.Code == '200'){
                            Vue.$vux.toast.text(res.Msg, 'top')
                            dispatch('GetListByRecordId',item).then(likeList => {
                                for(var i = 0;i<state.circleData.length;i++){
                                    
                                    if(item.Id == state.circleData[i].Id){
                                        state.circleData[i].likeList = likeList
                                        state.circleData[i].isLike = true
                                    
                                    }
                                }
                            })
                        }
                        
                    })
        },
         //   取消点赞
        DeleteZan({state,dispatch,rootGetters},item){
            var aLikeId = ''
            for(var obj of item.likeList){
                if(rootGetters['user/loginUserId'] == obj.OperatorUid){
                    aLikeId = obj.ALikeId
                }
            }
            var parms = {
                aLikeId:aLikeId
            }
            deleteZan(parms).then((data) => {
                        var res = JSON.parse(data)
                        
                        if(res.Code == '200'){
                            Vue.$vux.toast.text(res.Msg, 'top')
                            dispatch('GetListByRecordId',item).then(likeList => {
                                for(var i = 0;i<state.circleData.length;i++){
                                    
                                    if(item.Id == state.circleData[i].Id){
                                        state.circleData[i].likeList = likeList
                                        state.circleData[i].isLike = false
                                       
                                    }
                                }
                            })
                        }
                        
                    })
        },
        //   获取点赞记录
      GetListByRecordId({getters},item){
        return new Promise((resolve,reject) => {
          
            var parms = {
                recordId:item.Demeanorid,
                    schoolId:item.SchoolId,
                    classId:item.ClassId,
                    modularName:getters.modularName
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
     showAddComment({state,rootGetters,dispatch},{item,comment}){
        state.circle = item
            if(comment){
                state.pid = comment.CommentId
            }else{
                state.pid = ''
                comment = {}
            }
            
        if(comment.OperatorUid == rootGetters['user/loginUserId']){
            Vue.$vux.confirm.show({
                title: '提示',
                content: '确定删除评论？',
            
                onConfirm : () => {
                    deleteComment({
                        commentId:state.pid
                    }).then(res => {
                        res = JSON.parse(res)
                        dispatch('getCommentList',state.circle).then(commentList => {
                            for(var i = 0;i<state.circleData.length;i++){
                                    if(state.circle.Id == state.circleData[i].Id){
                                        state.circleData[i].commentList = commentList
                                      
                                    }
                                }
                        })
                    })
                }
            })
        }else{
                
            state.circleData[state.index].zanShow = false

            state.isAddCom = true
                setTimeout(() => {
                    document.getElementById('addComInput').focus()
                },100)
        }
        
        
    },

        addComment({state,dispatch,getters,rootGetters},{content}){
            return new Promise((resolve,reject) => {
                var param = {
                    recordId:state.circle.Demeanorid,
                    commentContent:content,
                    operatorUid:rootGetters['user/loginUserId'],
                    operatorUName:rootGetters['user/realName'],
                    schoolId:state.circle.SchoolId,
                    classId:state.circle.ClassId,
                    modularName:getters.modularName,
                    pid:state.pid
                }

                addComment({
                    data: JSON.stringify(param)
                }).then(res => {
                    state.isAddCom = false
                    dispatch('getCommentList',state.circle).then(commentList => {
                         for(var i = 0;i<state.circleData.length;i++){
                              if(state.circle.Id == state.circleData[i].Id){
                                state.circleData[i].commentList = commentList
                                 
                              }
                          }
                       
                          resolve()
                    })
                })
            })
            
        },
        getCommentList({state,getters},item){
            return new Promise((resolve,reject) => {
                 getCommentList({
                      recordId:item.Demeanorid,
                      schoolId:item.SchoolId,
                      classId:item.ClassId,
                      modularName:getters.modularName
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
        toggleAll({state},index){
            state.circleData[index].isAll = !state.circleData[index].isAll
        }
    }
}
export default circle
