import {getNoticeList,getNoticeListByParent,getReadList} from '@/api/noticeApi'
const notice = {
    namespaced: true,
    state: {
        pageIndex:0,
        pageSize:10,
        noticeList:[],
        curNotice:{},
        isMore:true
    },
    getters: {
    },
    mutations: {
      clearList(state){
        state.pageIndex = 0
        state.noticeList = []
        state.isMore = true
      },
    },
    actions: {
        getList({state,rootState,rootGetters,dispatch}){
            if(rootGetters['user/roleCode'] == 'Parent'){
                dispatch('getNoticeListByParent')
            }else if(rootGetters['user/roleCode'] == 'Teacher'){
                dispatch('getNoticeList')
            }
        },
        getNoticeListByParent({state,rootState,rootGetters,dispatch}){
            
            if(!state.isMore){
                return
            }
            state.pageIndex ++
            getNoticeListByParent({
                schoolId:rootState.user.schoolId,
                gradeId:rootState.user.gradeId,
                classId:rootState.user.classId,
                parentId:rootGetters['user/parentId'],
                pageIndex:state.pageIndex,
                pageSize:state.pageSize
            }).then(res => {
                res = JSON.parse(res)
                var list = res.Data.List
                for(var item of list){
                    item.unreadList = []
                    item.readList = []
                }
                state.noticeList = state.noticeList.concat(list)
                
                if(res.Data.List.length < state.pageSize){
                    state.isMore = false
                }
                
            })
        },
        getNoticeList({state,rootState,dispatch}){
            if(!state.isMore){
                return
            }
            state.pageIndex ++
            getNoticeList({
                schoolId:rootState.user.schoolId,
                gradeId:rootState.user.gradeId,
                classId:rootState.user.classId,
                pageIndex:state.pageIndex,
                pageSize:state.pageSize
            }).then(res => {
                res = JSON.parse(res)
                var list = res.Data.List
                for(var item of list){
                    item.unreadList = []
                    item.readList = []
                }
                state.noticeList = state.noticeList.concat(list)
                
                if(res.Data.List.length < state.pageSize){
                    state.isMore = false
                }
                dispatch('getReadList',res.Data.List)
            })
        },
        getReadList({state},list){
            for(let item of list){
                getReadList({
                    noticeId:item.Id
                }).then(res => {
                    
                    res = JSON.parse(res)
                    var read = res.Data.readList
                    var unread =  res.Data.unreadList

                    for(var i = 0;i<state.noticeList.length;i++){
                        var notice = state.noticeList[i]
                        if(notice.Id == item.Id){
                            notice.unreadList = unread
                            notice.readList = read
                            state.noticeList.splice(i,1,notice)
                        }
                    }
                   
                })
            }
        },
        setRead({state},id){
            
            for(let i = 0;i<state.noticeList.length;i++){
                if(state.noticeList[i].Id == id){
                    state.noticeList[i].isRead = 1


                    getReadList({
                        noticeId:id
                    }).then(res => {
                        
                        res = JSON.parse(res)
                        var read = res.Data.readList
                        var unread =  res.Data.unreadList
    
                        state.noticeList[i].unreadList = unread
                        state.noticeList[i].readList = read
                        state.noticeList.splice(i,1,state.noticeList[i])
                        
                        state.curNotice =  state.noticeList[i]
                    })
                }
            }
          }
    }
}
export default notice
