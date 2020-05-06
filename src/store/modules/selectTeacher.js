import Vue from 'vue'
import {getManListV2} from '@/api/commonApi'

const selectTeacher = {
    namespaced: true,
    state: {
        treeData:[],
        loading: true,
        count: 0,
        teacherList: [],
        deptList: []
    },
    getters: {
       
    },
    mutations: { 
        clear(state){
            state.treeData = []
            state.loading = true
            state.count = 0
            state.teacherList = []
            state.deptList = []
            
        },
        selectTeacher(state, item){
          var isHave = false
          for (var t of state.teacherList) {
              if (t.Id == item.Id) {
                  isHave = true
              }
          }
          if (!isHave) {
              state.teacherList.push(item)
          }
        },
        unselectTeacher(state, item){
            for (var i = 0; i < state.teacherList.length; i++) {
                if (item.Id == state.teacherList[i].Id) {
                    state.teacherList.splice(i, 1)
                }
            }
        },
        selectDept(state, item){

        },
        unselectDept(state, item){
          
        }
    },
    actions: {
        getTreeData({state,rootState,dispatch}){
            if(state.treeData.length > 0){
                return
            }
            getManListV2({
                schoolId: rootState.user.schoolId
           }).then(d => {
               
             d = JSON.parse(d)
             console.log(d)
             state.treeData = d.Data
             state.loading = false

             dispatch('count', state.treeData)
          })
        },
        count({state,dispatch}, arr){
            for(var i = 0; i<arr.length; i++){
                var item = arr[i]
                if(item.children){
                    dispatch('count', item.children)
                }else{
                    state.count ++
                }
            }
        }
       
    }
}
export default selectTeacher
