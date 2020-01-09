import {GetSchoolYears,GetSubjectList,GetExamListTeachBySubject,GetExamListParentBySubject} from '@/api/exam'
const exam = {
    namespaced: true,
    state: {
        yearData:[],
        subjectData:[],
        schoolYearId:'',
        schoolTermId:'',
        pageIndex:0,
        pageSize:10,
        isMore:true,
        examData:[],
        examItem: localStorage.examItem ? JSON.parse(localStorage.examItem) : ''
    },
    getters: {
    },
    mutations: {
        clearData(state){
            state.pageIndex = 0
            state.isMore = true
            state.examData = []
       },
       setExamItem(state,item){
            state.examItem = item
            localStorage.examItem= JSON.stringify(item)
       }
    },
    actions: {
        // 获取年份
        getSchoolYears({state,dispatch,rootGetters,rootState}){
            GetSchoolYears({schoolId:rootState.user.schoolId}).then((data) => {
            if(data.Code == 200){
                state.yearData = data.Data
                console.log(data)
            }
         })
        },
        // 获取科目
        getSubjectList({state,commit,dispatch,rootGetters,rootState}){
            GetSubjectList({schoolId:rootState.user.schoolId}).then((data) => {
            if(data.Code == 200){
                state.subjectData = data.Data
                if(state.subjectData[0]){
                    commit('clearData')
                     if(rootGetters['user/roleCode'] == 'Teacher'){
                         dispatch('getExamListTeachBySubject',state.subjectData[0])
                     }else{
                          dispatch('getExamListParentBySubject',state.subjectData[0])
                     }
                }
               
            }
         })
        },
        // 教师获取考试列表
        getExamListTeachBySubject({state,dispatch,rootGetters,rootState},subject){
            if(!state.isMore){
                return
            }
            state.pageIndex++
            var params = {
                teachId:rootState.user.teacherId,
                subjectId:subject.Id,
                pageIndex:state.pageIndex,
                pageSize:state.pageSize
             } 
             params.schoolYearId = state.schoolYearId
             if(!state.schoolYearId){
                 params.schoolYearId = localStorage.getItem("schoolYearId")
             }
             params.schoolTermId = state.schoolTermId
             if(!state.schoolTermId){
                 params.schoolTermId = localStorage.getItem("schoolTermId")
             }
            GetExamListTeachBySubject(params).then((data) => {
            if(data.Code == 200){
                if(data.Data.List.length < state.pageSize){
                    state.isMore = false
                }
                state.examData =  state.examData.concat(data.Data.List)
                console.log(data)
                
            }
         })
        },
        // 家长获取考试列表
        getExamListParentBySubject({state,dispatch,rootGetters,rootState},subject){
            if(!state.isMore){
                return
            }
            state.pageIndex++
            var params = {
                studentId:rootState.user.studentId,
                subjectId:subject.Id,
                pageIndex:state.pageIndex,
                pageSize:state.pageSize
             } 
             params.schoolYearId = state.schoolYearId
             if(!state.schoolYearId){
                 params.schoolYearId = localStorage.getItem("schoolYearId")
             }
             params.schoolTermId = state.schoolTermId
             if(!state.schoolTermId){
                 params.schoolTermId = localStorage.getItem("schoolTermId")
             }
             GetExamListParentBySubject(params).then((data) => {
            if(data.Code == 200){
                if(data.Data.List.length < state.pageSize){
                    state.isMore = false
                }
                state.examData =  state.examData.concat(data.Data.List)
                console.log(data)
                
            }
         })
        }
    }
}
export default exam
