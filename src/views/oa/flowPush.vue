<template>
    <div>
        <headNav :isBack="false" :isHome="false" title="流程审批"></headNav>
        <div class="main">
            <div class="top">
                <div class="head">
                    <img v-if="flowDetail.CreateUserImage" :src="flowDetail.CreateUserImage" @error="defaultBackImg" alt="">
                    <img v-else src="@/assets/img/default_head.png" alt="">
                    <div class="personName">
                        <p>{{flowDetail.CreateUserName}}</p>
                        <p class="flowstate">
                            <span v-if="flowDetail.FlowState==0">流程待审核</span>
                            <span v-else-if="flowDetail.FlowState==1">流程审核中</span>
                            <span v-else-if="flowDetail.FlowState==2">流程驳回</span>
                            <span v-else-if="flowDetail.FlowState==3">流程取消</span>
                            <span v-else-if="flowDetail.FlowState==10">流程通过</span>
                            <span v-else-if="flowDetail.FlowState==20">流程不通过</span>
                            <span v-else>流程抄送成功</span>
                        </p>
                    </div>
                </div>
                <p>审批编号 :　{{flowDetail.RecordCode}}</p>
                <p v-for="(item,index) in formDetail.recordFieldList" :key="index">
                    <span class="label">{{item.FieldChinaName}}</span> :　{{item.FieldValue}}
                </p>
                <div class="detailImg">
                    <previewImgDiv  :list="flowImgs"></previewImgDiv>
                </div>
            </div>
            <div class="mid">
                <div class="oneRow">
                    <span class="rowName">
                        <div class="imgBox">
                            <img v-if="flowDetail.CreateUserImage" :src="flowDetail.CreateUserImage" @error="defaultBackImg" class="smallImg" alt="">
                            <img v-else src="@/assets/img/default_head.png" class="smallImg">
                            <img class="canIcon" src="@/assets/img/oa/dead.png" alt="">
                        </div>
                        <span>{{flowDetail.CreateUserName}} 发起申请</span>
                    </span>
                    <span class="timeLess">{{flowDetail.CreateDateTime | formatDateTime('YYYY-MM-DD HH:mm')}}</span>

                    <div class="column"></div>
                </div>

                <div v-for="(item, index) in dealNode" :key="index"  class="twoRow">
                    <div class="imgBox">
                        <img v-if="item.OpUserImage" :src="item.OpUserImage" class="smallImg" @error="defaultBackImg" alt="">
                        <img v-else src="@/assets/img/default_head.png" class="smallImg">
                        <img v-if="item.DealState == 0 || item.DealState == 1" class="canIcon" src="@/assets/img/oa/warn.png" alt="">
                        <img v-else class="canIcon" src="@/assets/img/oa/dead.png" alt="">
                    </div>
                    
                    <span>审批人  {{item.NodeName}}</span>

                    <span class="checking" v-if="item.DealState==0">(待审核)</span>
                    <span class="checking" v-else-if="item.DealState==1">(审核中)</span>
                    <span class="checking" v-else-if="item.DealState==2">(驳回)</span>
                    <span class="checking" v-else-if="item.DealState==3">(取消)</span>
                    <span class="checking" v-else-if="item.DealState==10">(通过)</span>
                    <span class="checking" v-else-if="item.DealState==20">(不通过)</span>
                    <span class="checking" v-else>抄送成功</span>

                    <div class="column"></div>
                </div>
              
                <div class="threeRow">
                    <span class="rowName">
                        <img src="@/assets/img/default_head.png" class="smallImg">
                        <span class="timeLess">抄送人 (抄送{{copyNode.length}}人)</span>
                    </span>
                    <span>
                        <img @click="showCopyMan = false" v-if="showCopyMan" src="@/assets/img/arrS.png" alt="">
                        <img @click="showCopyMan = true" v-else src="@/assets/img/arrX.png" alt="">
                    </span>
                </div>
                <div v-if="showCopyMan" class="copyMan">
                    <div v-for="(item, index) in copyNode" :key="index" class="oneMan">
                        <p>
                            <img v-if="item.OpUserImage" :src="item.OpUserImage" @error="defaultBackImg" class="headImg" alt="">
                            <img v-else src="@/assets/img/default_head.png" class="headImg">
                        </p>
                        <p>
                            {{item.NodeName}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="flowDetail.FlowState==1" class="bot">
            <div v-if='isHaveOperate' class="bot-left">
                 <div @click="urge" class="bot-deal">
                    <img class="dealImg" src="@/assets/img/oa/cuiban.png" alt="">
                   <p>催办</p> 
                </div>
                <div @click="cancelFlow" class="bot-deal">
                    <img class="dealImg" src="@/assets/img/oa/cancel.png" alt="">
                    <p>撤销</p> 
                </div>
            </div>
           <div v-if="isHaveDeal" class="bot-right">
                <div @click="dealRecordNode(20)" class="reject">
                    拒绝
                </div>
                 <div @click="dealRecordNode(10)" class="agree">
                    同意
                </div>
           </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
import uploadImg from '@/components/uploadImg'
import previewImgDiv from '@/components/previewimg'
export default {
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav, previewImgDiv
    },
    data () {
        return{
            isHome: false,
           flowDetail: '',
           formDetail: '',
           isHaveDeal: false,
           isHaveOperate: false,
           nodeList: [],
           flowRecord: [],
           dealNode: [],
           copyNode: [],
           showCopyMan: false,
           recordNodeId: '',
           flowImgs: [],
           flowRecordId: '',
           userId: '',
           userName: '',
           deptId: ''
        }
    },
    mounted () {
        var param = this.getParam()
        this.flowRecordId = param. flowRecordid
        this.userId = param.userid
        this.userName = decodeURI(param.username)
        this.deptId = param.deptid
        this.getFlow(true)
        this.getRecordNode()
    },
    methods: {
        // 获取参数
        getParam(){
            var search = location.search
            search = search.substring(1)
            var arr = search.split('&')
            var param = {}
            for(var item of arr){
                var list = item.split('=')
                param[list[0]] = list[1]
            }
            return param
        },
        defaultBackImg() {
            if(event.type == "error") {
            event.target.src = require("../../assets/img/default_head.png")
            }
        },
        //数组根据对象排序
        compare(val) {
            return function (a, b) {
            var value1 = a[val];
            var value2 = b[val];
            return value1 - value2;
            }
        },
         // 递归
        def (p) { 
            for (var i = 0; i < this.nodeList.length; i++) { 
                if (p == this.nodeList[i].RecordNodeParentId) { 
                    this.flowRecord.push(this.nodeList[i])
                    return this.def(this.nodeList[i].Id)
                }
            }
        },
        // 获取流程信息
        getFlow (flag) { 
            this.$store.dispatch('oa/Item', {_id: this.flowRecordId}).then(res => { 
                if (res.Code == 200) { 
                    this.flowDetail = res.Data
                    this.isHaveOperate = res.Data.CreateUserId == this.$store.getters['user/teacherId'] ? true : false
                    this.getFormDetail(res.Data.FormRecordId)
                }
            })
        },
        // 获取表单记录 ItemByRecordId
        getFormDetail (recordId) {
            this.$store.dispatch('oa/ItemByRecordId', {recordId}).then(res => { 
                if (res.Code == 200) { 
                    this.formDetail = res.Data
                    var arr = []
                    this.formDetail.recordFieldList.forEach(
                        (item) => {
                            if (item.FieldChinaName != 'img') {
                                arr.push(item)
                            }else {
                                this.flowImgs.push(item.FieldValue)
                            }
                        }
                    )
                    if (this.flowImgs.length > 0 ) {
                        this.flowImgs = this.setImgArr(this.flowImgs)
                    }
                    this.formDetail.recordFieldList = arr
                    this.formDetail.recordFieldList.sort(this.compare('FieldName'))
                }
            })
        },
         // 获取所有节点
        getRecordNode () { 
            this.$store.dispatch('oa/RecordNodeByFlowRecordId', {flowRecordId: this.flowRecordId}).then(res => { 
                if (res.Code == 200) { 
                    this.nodeList = res.Data
                    this.nodeList.forEach((item,index) => {
                        if (!item.RecordNodeParentId) { 
                            this.flowRecord.push(item)
                            this.def(item.Id)
                        }
                        if (item.DealState == 1) {
                            this.recordNodeId = item.Id
                            this.isCanDeal(item.Id)
                        }
                    })
                    this.flowRecord.forEach(
                        (item, index) => {
                            if (item.NodeType == 1) {
                                this.dealNode.push(item)
                            }
                            if (item.NodeType == 2) {
                                this.copyNode.push(item)
                            }
                        }
                    )
                }
            })
        },
        // 处理节点
        dealRecordNode (opState) { 
            var params = { 
                userId: this.userId,
                userName: this.userName,
                deptId: this.deptId,
                recordNodeId: this.recordNodeId,
                opState
            }
            var paramsNew = { 
                data: JSON.stringify(params)
            }
            this.$store.dispatch('oa/DealNode', paramsNew).then(res => { 
                let result = res
                var self = this
                if (result.Code == 200) { 
                    self.$vux.alert.show({ 
                        content: result.Msg,
                        maskZIndex: 100,
                        onHide () { 
                            self.getFlow(true)
                        }
                    })
                } else { 
                    self.$vux.alert.show({ 
                        content: result.Msg,
                        maskZIndex: 100
                    })
                }
            })
        },
        // 判断当前用户是否有处理权限
        isCanDeal (recordId) { 
            var params = { 
                userId: this.userId,
                deptId: this.deptId,
                recordNodeId: recordId
            }
            this.$store.dispatch('oa/CheckHasDealPower', params).then(res => { 
                if (res.Code == 200) { 
                    this.isHaveDeal = res.Data
                }
            })
        },
        // 取消流程
        cancelFlow () {
            let self = this
            self.$vux.confirm.show({
                //  组件除show外的属性
                title: '提示',
                content: '确定要撤销吗?',
                onCancel () {
                    
                },
                onConfirm () {
                    var params = {
                        _id: self.flowRecordId,
                        userId: self.userId
                    }
                    self.$store.dispatch('oa/Cancel', params).then(
                        res => {
                            let result = res
                            let that = self
                            if (result.Code == 200) {
                                that.$vux.alert.show({
                                    content: '撤销成功',
                                    maskZIndex: 100,
                                    onHide () {
                                        that.getFlow(true)
                                    }
                                })
                            } else {
                                that.$vux.alert.show({
                                    content: result.Msg,
                                    maskZIndex: 100
                                })
                            }
                        }
                    )
                }
            })
        },
        // 催办
        urge () {
            var params = {
                recordId: this.flowRecordId,
                deptId: ''
            }
            this.$store.dispatch('oa/PressToDo', params).then(
                res => {
                    if (res.Code == 200) {
                        this.$vux.toast.text('催办成功')
                    }
                }
            )
        }
    }
}
</script>
<style src="./css/public.css" scoped>

</style>
<style scoped>
    .main{
        margin-bottom: 1.2rem;
    }
    .top,.mid{
        background: #fff;
        padding: 0.32rem;
        margin-top: 0.16rem;
    }
    .head{
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-bottom: 0.12rem;
    }
    .top>p{
        line-height: 0.6rem;
        font-size: 0.32rem;
    }
    /* .label{
        display: inline-block;
        min-width: 2rem;
    } */
    .top .detailImg{
        margin-top: 0.2rem;
    }
    .top img{
        width: 0.84rem;
        height: 0.84rem;
        border-radius: 50%;
        margin-right: 0.16rem;
    }
    .top .flowImg{
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 0;
        margin:0 0.32rem 0.32rem 0;
        object-fit: cover;
    }
    .personName p{
        line-height: 0.48rem;
    }
    .personName p:first-child{
        color: #333;
        font-weight: bold;
        font-size: 0.32rem;
    }
    .personName p:last-child{
        color: #FF9900;
        font-size: 0.28rem;
    }
    .smallImg{
        width: 0.56rem;
        height: 0.56rem;
        border-radius: 50%;
        margin-right: 0.22rem;
    }
    .oneRow{
        position: relative;
        display: flex;
        align-items: center;
        color: #333;
        font-size: 0.32rem;
        justify-content: space-between;
        margin-bottom: 0.44rem;
    }
    .twoRow{
        position: relative;
        display: flex;
        align-items: center;
        color: #333;
        font-size: 0.32rem;
        margin-bottom: 0.44rem;
    }
    .column{
        position: absolute;
        top: 0.56rem;
        left: 0.27rem;
        width: 0.02rem;
        height: 0.48rem;
        background: #ebebeb;
    }
    .threeRow{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333;
        font-size: 0.32rem;
        margin-bottom: 0.44rem;
    }
    .imgBox{
        position: relative;
    }
    .canIcon{
        width: 0.28rem;
        height: 0.28rem;
        position: absolute;
        right: 0.14rem;
        bottom: 0.14rem;
    }
    .rowName{
        display: flex;
        align-items: center;
    }
    .timeLess{
        color: #999;
    }
    .checking{
        color: #FF9900;
        font-size: 0.32rem;
    }
    .headImg{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
    }
    .copyMan{
        padding: 0 0.82rem;
    }
    .copyMan>.oneMan{
        margin-right: 0.48rem;
    }

    .oneMan{
        display: inline-block;
        text-align: center;
    }
    .bot{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        overflow: hidden;
        margin-top: 0.16rem;
        padding: 0.16rem 0.32rem;
        box-sizing: border-box;
        border-top:0.16rem solid #eee ;
    }
    .bot-left>div,.bot-right>div{
        display: inline-block;
        text-align: center;
    }
    .bot-deal{
        display: inline-block;
        text-align: center;
        color: #535252;
        font-size: 0.2rem;
    }
    .bot-left>.bot-deal:first-child{
        margin-right: 0.42rem;
    }
    .dealImg{
        width: 0.52rem;
        height: 0.52rem;
        border-radius: 50%;
    }
    .reject{
        width: 1.7rem;
        height: 0.68rem;
        line-height: 0.68rem;
        border: 0.01rem solid #128FEF;
        color: #128FEF;
        font-size: 0.28rem;
        border-radius: 0.1rem;
        text-align: center;
        margin-right: 0.16rem;
    }
    .agree{
        width: 1.7rem;
        height: 0.68rem;
        line-height: 0.68rem;
        border: 0.01rem solid #128FEF;
        background: #128FEF;
        font-size: 0.28rem;
        color: #fff;
        border-radius: 0.1rem;
        text-align: center;
    }   
    
</style>