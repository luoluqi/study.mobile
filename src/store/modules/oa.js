import Vue from 'vue'
import store from '@/store'
import {myPowerApplyFlow, deptListByTeacherId, formApply, flowApply, appendRecordNode, pageMyRecord, pageMyPendingDeal, pageMyHasDeal, item, itemByRecordId, recordNodeByFlowRecordId, checkHasDealPower, cancel, dealNode, pressToDo, getFormDetail} from '@/api/oaApi'
const oa = {
    namespaced: true,
    state: {
        approvers: [],
        copyMans: [],
        addType: 1,
        deptArr: localStorage.deptArr ? JSON.parse(localStorage.deptArr) : [],
        deptId: localStorage.deptId ? localStorage.deptId : '',
        flowId: '',
        RecordFields: [],
        flowObj: localStorage.flowObj ? JSON.parse(localStorage.flowObj): '',
        dflowId: localStorage.dflowId ? localStorage.dflowId : '',
        goIndexType: '',
        isIndexTo: false
    },
    getters: {
       
    },
    mutations: { 
        addApprover (state,approver) {
            state.approvers = approver
        },
        addCopyMans (state,man) {
            state.copyMans = man
        },
        delApprover (state,index) {
            state.approvers.splice(index,1)
        },
        delCopyMans (state,index) {
            state.copyMans.splice(index,1)
        },
        chooseAdd (state,num) {
            state.addType = num
        },
        deptArr (state, arr) {
            localStorage.deptArr = JSON.stringify(arr)
            state.deptArr = arr
        },
        deptId (state, deptId) {
            localStorage.deptId = deptId
            state.deptId = deptId
        },
        flowId (state, id) {
            state.flowId = id
        },
        dflowId (state, id) {
            state.dflowId = id
            localStorage.dflowId = id
        },
        setRecordFields (state, arr) {
            state.RecordFields = arr
        },
        setFlowObj (state, obj){
            state.flowObj = obj
            localStorage.flowObj = JSON.stringify(obj) 
        },
        clearMan (state) {
            state.approvers = []
            state.copyMans = []
        }


    },
    actions: {  
        // 获取能申请的流程
        MyPowerApplyFlow ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                myPowerApplyFlow(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 获取部门
        DeptListByTeacherId ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                deptListByTeacherId(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 表单存储
        FormApply ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                formApply(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 流程存储
        FlowApply ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                flowApply(params).then(res => {
                    resolve(res)
                })
            })
        },
         // 审核人存储 POST /api/FlowRecord/AppendRecordNode
        AppendRecordNode ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                appendRecordNode(params).then(res => {
                    resolve(res)
                })
            })
        },
        // 我发起的
        PageMyRecord ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
              pageMyRecord(params).then(res => {
                resolve(res)
              })
            })
        },
        // 我待处理的
        PageMyPendingDeal ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                pageMyPendingDeal(params).then(res => {
                resolve(res)
              })
            })
        },
        // 我已处理的
        PageMyHasDeal ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                pageMyHasDeal(params).then(res => {
                resolve(res)
              })
            })
        },
        // 流程详情信息
        Item ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                item(params).then(res => {
                resolve(res)
              })
            })
        },
        // 获取表单记录
        ItemByRecordId ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                itemByRecordId(params).then(res => {
                resolve(res)
              })
            })
        },
        // 获取所有节点 recordNodeByFlowRecordId
        RecordNodeByFlowRecordId ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                recordNodeByFlowRecordId(params).then(res => {
                resolve(res)
              })
            })
        },
        // 判断是否有处理权限 checkHasDealPower
        CheckHasDealPower ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                checkHasDealPower(params).then(res => {
                resolve(res)
              })
            })
        },
        // 取消流程 
        Cancel ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                cancel(params).then(res => {
                resolve(res)
              })
            })
        },
        // 催办流程 
        PressToDo ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                pressToDo(params).then(res => {
                resolve(res)
              })
            })
        },
        // 处理节点 dealNode
        DealNode ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                dealNode(params).then(res => {
                resolve(res)
              })
            })
        },
        // 获取表单信息getFormDetail
        GetFormDetail ({ state, commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                getFormDetail(params).then(res => {
                resolve(res)
              })
            })
        }
    }
}
export default oa
