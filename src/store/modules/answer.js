import {CreateDay, CreateWeek, CreateChallenge, StatisticsList} from '@/api/answerApi'
import router from '@/router'
import Vue from 'vue'
const answer = {
    namespaced: true,
    state: {
        statisticsList:[],
        challengeList:{subjectModel:''},
        dayList: [],
        dayListIndex:0,
        dayListItem:{subjectModel:''},
        submitData:''
    },
    getters: {
    },
    mutations: {
        clear(state){
            state.dayList = [],
            state.dayListIndex = 0
            state.dayListItem = {subjectModel:''}
        },
        nextQuestion(state){
            state.dayListIndex++
            state.dayListItem = state.dayList[state.dayListIndex]
        }
    },
    actions: {
        // 每日
        getDayQustion({state,dispatch,rootGetters,rootState}){
            var params = {
               schoolId:rootState.user.schoolId,
               teacherId:rootState.user.teacherId
            }
            CreateDay(params).then((data) => {
                if(data.Code == 200){
                    if(data.Data.length < 5){
                        Vue.$vux.toast.text('每日答题小于5题，不能进行答题')
                        // router.go(-2)
                        return
                    }
                   state.dayList = data.Data
                   state.dayListItem = state.dayList[state.dayListIndex]

                   router.push({path:'/partyBuild/answer',query:{type:'day'}})
                }
                if(data.Code == 300){
                    Vue.$vux.toast.text(data.Msg)
                    router.replace('answerOver')
                    state.submitData = data.Data
                    localStorage.setItem("submitData",JSON.stringify(data.Data))
                }
                if(data.Code == 0){
                    Vue.$vux.toast.text(data.Msg)
                    // router.go(-2)
                }
            })
        },
        // 每周
        getWeekQustion({state,dispatch,rootGetters,rootState}){
            var params = {
               schoolId:rootState.user.schoolId,
               teacherId:rootState.user.teacherId
            }
            CreateWeek(params).then((data) => {
                if(data.Code == 200){
                    if(data.Data.length < 10){
                        Vue.$vux.toast.text('每周答题小于10题，不能进行答题')
                        // router.push('study')
                        return
                    }
                   state.dayList = data.Data
                   state.dayListItem = state.dayList[state.dayListIndex]
                   router.push({path:'/partyBuild/answer',query:{type:'week'}})
                }
                if(data.Code == 300){
                    Vue.$vux.toast.text(data.Msg)
                    router.replace('answerOver')
                    state.submitData = data.Data
                    localStorage.setItem("submitData",JSON.stringify(data.Data))
                }
                if(data.Code == 0){
                    Vue.$vux.toast.text(data.Msg)
                    // router.push('study')
                }
            })
        },
        // 挑战 GET /api/Answer/CreateChallenge
        createChallenge({state,dispatch,rootGetters,rootState}){
            var params = {
               schoolId:rootState.user.schoolId
            }
            CreateChallenge(params).then((data) => {
                if(data.Code == 200){
                   state.challengeList = data.Data
                }
                if(data.Code == 300){
                    Vue.$vux.toast.text(data.Msg)
                }
                if(data.Code == 0){
                    Vue.$vux.toast.text(data.Msg)
                    router.go(-2)
                   
                }
            })
        },
        // 统计 GET /api/Answer/StatisticsList
        statisticsList({state,dispatch,rootGetters,rootState}){
            var params = {
               schoolId:rootState.user.schoolId,
               teacherId:rootState.user.teacherId
            }
            StatisticsList(params).then((data) => {
                if(data.Code == 200){
                   state.statisticsList = data.Data
                   for ( let i = 0; i < state.statisticsList.length; i++){
                       let obj = state.statisticsList[i]; 
                        if (obj.totalCount!=0) {
                            obj.rate = ((obj.correntCount / obj.totalCount) * 100).toFixed(0)
                        }else{
                            obj.rate = 0
                        }
                   }
                }
                if(data.Code == 300){
                    Vue.$vux.toast.text(data.Msg)
                }
            })
        }
    }
}
export default answer
