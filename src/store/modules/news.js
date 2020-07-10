import {getNewsTypeParent, getNewsTypeChildren, getNewsInfoList, getCommentList, deleteComment, addComment, addView,
    cancelView,getNewsInfo,updateLearnTime, getRecord} from '@/api/newsApi'
const news = {
    namespaced: true,
    state: {
       fristTabList:[],
       curFristTabIndex:0,
       curFristTab:'',
       secondTabList:[],
       curSecondTab:'',
       newsList:[],
       curNews:localStorage.curNews ? JSON.parse(localStorage.curNews) : '',
       newsPageIndex: 0,
       newsPageSize: 10,
       isMore:true,
       commentList:[],
       commentPageIndex:0,
       commentPageSize:10,
       isMoreComment:true,
       learnTimeInterval: 60000,
       isUpdateLearnTime: true,
       LearnCount: 0,
        TranscendentPercent:0,
        UpdateNewsLearnTime:0,
        timer: ''
    },
    getters: {
    },
    mutations: {
      clear(state){
          state.isMore = true
        state.newsList = []
        state.newsPageIndex = 0
        state.curSecondTab = ''
      },
      setCurFristTab(state,tab){
          
        state.curFristTab = tab
        // localStorage.curFristTab = JSON.stringify(tab)
      },
      setCurSecondTab(state,tab){
        state.curSecondTab = tab
      },
      setCurNews(state,news){
        state.curNews = news
        localStorage.curNews = JSON.stringify(news)


        state.commentList = []
        state.commentPageIndex = 0
        state.isMoreComment = true
      }
    },
    actions: {
        //获取一级菜单
        getNewsTypeParent({state,commit,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                if(state.fristTabList.length == 0){
                    getNewsTypeParent(param).then(res => {
                        res = JSON.parse(res)
                        state.fristTabList = res.Data
                      
                        dispatch('changeFristType',state.fristTabList[state.curFristTabIndex])
                        resolve()
                    })
                }else{
                    resolve()
                }
                
            })
        },
        //点击选择一个一级菜单
        changeFristType({state,commit,dispatch,getters,rootGetters},type){
          
            if(state.curFristTab.id == type.id){
                return
            }
            commit('setCurFristTab',type)
            dispatch('getNewsTypeChildren',{parentId:type.id})
        },
        //获取二级菜单
        getNewsTypeChildren({state,commit,dispatch,getters,rootGetters},param){
            
            return new Promise((resolve,reject) => {
                getNewsTypeChildren(param).then(res => {
                    res = JSON.parse(res)
                    state.secondTabList = res.Data
                    
                    if(state.secondTabList.length > 0){
                        dispatch('changeSecondType',state.secondTabList[0])
                    }else{
                        state.isMore = false
                    }
                    resolve()
                })
            })
        },
        //点击选择一个二级菜单
        changeSecondType({state,commit,dispatch,getters,rootGetters},type){
            
            if(state.curSecondTab.id == type.id){
                return
            }
            commit('clear')
                commit('setCurSecondTab', type)
              
                dispatch('getNextPageNewsList')
        },
        //获取下一页的新闻
        getNextPageNewsList({state,commit,dispatch,getters,rootGetters}){
            if(!state.isMore){
                return
            }
            state.newsPageIndex ++
            dispatch('getNewsInfoList',{
                newsTypeId:state.curSecondTab.id,
                pageIndex:state.newsPageIndex,
                pageSize:state.newsPageSize})
        },
        //获取新闻列表
        getNewsInfoList({state,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                getNewsInfoList(param).then(res => {
                    res = JSON.parse(res)
                    
                    state.newsList = state.newsList.concat(res.Data.List) 
                    if(res.Data.List.length < state.newsPageSize){
                        state.isMore = false
                    }
                    resolve()
                })
            })
        },
        //获取新闻列表
        getNewsInfo({state,commit,dispatch,getters,rootGetters,rootState},param){
            return new Promise((resolve,reject) => {
                getNewsInfo({
                    id: state.curNews.id,
                    teachId: rootState.user.teacherId
                }).then(res => {
                    res = JSON.parse(res)
                    commit('setCurNews',res.Data)
                    resolve()
                })
            })
            
        },
        //获取下一页的评论
        getNextPageCommentList({state,dispatch,getters,rootGetters},param){
            if(!state.isMoreComment){
                return
            }
            state.commentPageIndex++
            dispatch('getCommentList', {
                newsInfoId:state.curNews.id,
                pageIndex:state.commentPageIndex,
                pageSize:state.commentPageSize
            })
        },
        //获取评论列表
        getCommentList({state,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                getCommentList(param).then(res => {
                    res = JSON.parse(res)
                    state.commentList = state.commentList.concat(res.Data.List)
                    if(res.Data.List.length < state.commentPageSize){
                        state.isMoreComment = false
                    }
                    resolve(res)
                })
            })
        },
       
        addComment({state,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                addComment(param).then(res => {
                    res = JSON.parse(res)

                    state.commentList = []
                    state.commentPageIndex = 0
                    state.isMoreComment = true
                    for(var item of state.newsList){
                        if(item.id == state.curNews.id){
                            item.commentCount ++
                            break
                        }
                    }

                    dispatch('getNextPageCommentList')
                    resolve(res)
                })
            })
        },
        deleteComment({state,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                deleteComment({
                    data: JSON.stringify(param)
                }).then(res => {
                    res = JSON.parse(res)
                    for(var i = 0;i<state.commentList.length;i++){
                        var item = state.commentList[i]
                        if(item.id == param.id){
                            state.commentList.splice(i,1)
                        }
                    }

                    for(var item of state.newsList){
                        if(item.id == state.curNews.id){
                            item.commentCount --
                            break
                        }
                    }


                    resolve()
                })
            })
        },
        addView({state,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                addView(param).then(res => {
                    res = JSON.parse(res)
                    
                    if(res.Data){
                        if(param.opType == 1){
                            state.curNews.isRead = 1
                            if(state.curNews.viewNumber){
                                state.curNews.viewNumber ++
                            }else{
                                state.curNews.viewNumber = 1
                            }
                            for(var item of state.newsList){
                                if(item.id == param.newsInfoId){
                                    item.viewNumber ++
                                    break
                                }
                            }
                        }else if(param.opType == 2){
                            state.curNews.isThumbup = 1
                            if(state.curNews.thumbupCount){
                                state.curNews.thumbupCount ++
                            }else{
                                state.curNews.thumbupCount = 1
                            }
                            for(var item of state.newsList){
                                if(item.id == param.newsInfoId){
                                    item.thumbupCount ++
                                    break
                                }
                            }
                        }
                        
                        
                    }
                    resolve()
                })
            })
        },
        cancelView({state,dispatch,getters,rootGetters},param){
            return new Promise((resolve,reject) => {
                cancelView({
                    data: JSON.stringify(param)
                }).then(res => {
                    res = JSON.parse(res)
                    if(res.Data){
                        state.curNews.isThumbup = 0
                        if(state.curNews.thumbupCount){
                            state.curNews.thumbupCount --
                        }
                        
                        for(var item of state.newsList){
                            if(item.id == param.newsInfoId){
                                item.thumbupCount --
                            }
                        }
                        
                    }
                    resolve()
                })
            })
        },
        updateLearnTime({state,dispatch,getters,rootGetters,rootState}){
            
            if(state.curFristTab.id != state.fristTabList[1].id){
                return
            }
            var param = {
                teachId: rootState.user.teacherId,
                teachName: rootState.user.realName,
            }
            state.UpdateNewsLearnTime++
            updateLearnTime({
                data: JSON.stringify(param)
            }).then(res => {
                if(state.isUpdateLearnTime){
                    state.timer = setTimeout(() => {
                        dispatch('updateLearnTime')
                    },state.learnTimeInterval)
                }
            })
        },
        startLearnTime({state,dispatch,getters,rootGetters,rootState}){
            dispatch('clearLearnTimer')
            state.isUpdateLearnTime = true
            state.timer = setTimeout(() => {
                dispatch('updateLearnTime')
            },state.learnTimeInterval)
        },
        clearLearnTimer({state,dispatch,getters,rootGetters,rootState}){
            if(state.timer){
                clearTimeout(state.timer)
            }
            state.isUpdateLearnTime = false
        },
        getRecord({state,dispatch,getters,rootGetters,rootState}){
            getRecord({
                schoolId: rootState.user.schoolId,
                teachId: rootState.user.teacherId
            }).then(res => {
                res = JSON.parse(res)
                state.LearnCount = res.Data.LearnCount
                state.TranscendentPercent = res.Data.TranscendentPercent
                state.UpdateNewsLearnTime = res.Data.UpdateNewsLearnTime
                if(!state.LearnCount){
                    state.LearnCount = 0
                }
                if(!state.UpdateNewsLearnTime){
                    state.UpdateNewsLearnTime = 0
                }
            })
        }
    }
}
export default news
