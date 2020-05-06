<template>
    <div>
        <headNav title="审批流程设置"></headNav>
        <div class="title">审批流程</div>
        <div class="box">
            <div class="tr">
                <div class="td-1">
                    <div class="m-text">审批人</div>
                    <div class="s-text">请选择审批人</div>
                    <span class="star">*</span>
                </div>
                <div :class="approversFlag ? 'td-2': 'hide-td-2'">
                    <div class="man-box" v-for="(item,index) in approvers" :key="index">
                        <div class="man-item">
                            <img @click="delApprover(index)" class="delete-btn" src="@/assets/img/oa/delete.png" alt="">
                            <img v-if="item.img" class="man-img" :src="item.img" @error="defaultBackImg">
                            <img v-else class="man-img" src="@/assets/img/default_head.png">
                            <div v-if="approvers.length > 3 && index == 0" @click="cutApprovers" class="man-name">查看全部</div>
                            <div v-else class="man-name">{{item.name}}</div>
                        </div>
                        <img v-if="index!=approvers.length-1" class="arr-img" src="@/assets/img/a-r.png" alt="">
                    </div>
                </div>
                <div @click="toselect(1)" class="td-3">
                    <img class="add-btn" src="@/assets/img/oa/addImg.png" alt="">
                </div>
            </div>
            <div class="tr">
                <div class="td-1">
                    <div class="m-text">抄送人</div>
                    <div class="s-text">请选择抄送人</div>
                </div>
                <div :class="copyMansFlag ? 'td-2': 'hide-td-2'">
                    <div class="man-box" v-for="(item,index) in copyMans" :key="index">
                        <div class="man-item">
                            <img @click="delCopyMan(index)" class="delete-btn" src="@/assets/img/oa/delete.png" alt="">
                            <img v-if="item.img" class="man-img" :src="item.img" @error="defaultBackImg">
                            <img v-else class="man-img" src="@/assets/img/default_head.png">
                            <div v-if="copyMans.length > 3 && index == 0" @click="cutCopyMans" class="man-name">查看全部</div>
                            <div v-else class="man-name">{{item.name}}</div>
                        </div>
                        <img v-if="index!=copyMans.length-1" class="arr-img" src="@/assets/img/a-r.png" alt="">
                    </div>
                </div>
                <div @click="toselect(2)" class="td-3">
                    <img class="add-btn" src="@/assets/img/oa/addImg.png" alt="">
                </div>
            </div>
        </div>
        <div v-if="isSub" @click="apply" class="comfirm-btn">发送申请</div>
        <div v-else class="comfirm-btn2">发送申请中...</div>
        <div v-if="!isSub" class="model">

        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import selectManVue from './selectMan.vue'
export default {
    components: {
        headNav
    },
    data () {
        return{
            approversFlag: false,
            copyMansFlag: false,
            isSub: true
        }
    },
    computed: {
        approvers () {
            return this.$store.state.oa.approvers
        },
        copyMans () {
            return this.$store.state.oa.copyMans
        },
        teacherList () {
            return this.$store.state.selectTeacher.teacherList
        },
        RecordFields () {
            return this.$store.state.oa.RecordFields
        },
        flowObj () {
            return this.$store.state.oa.flowObj
        }
    },
    methods: {
        defaultBackImg() {
            if(event.type == "error") {
                event.target.src = require("../../assets/img/default_head.png")
            }
        },
        cutApprovers () {
            this.approversFlag = !this.approversFlag
        },
        cutCopyMans () {
            this.copyMansFlag = !this.copyMansFlag
        },
        // 选人
        toselect (num) {
            this.$store.commit('oa/chooseAdd', num)
            this.$store.commit('selectTeacher/clear')
            this.$store.state.selectTeacher.teacherList = num == 1 ? this.approvers : this.copyMans
            this.$store.dispatch('selectTeacher/count', this.teacherList)
            this.$router.push('selectMan') 
        },
        // 删审批人
        delApprover (index) {
            this.$store.commit('oa/delApprover', index)
        },
        // 删抄送人
        delCopyMan (index) {
            this.$store.commit('oa/delCopyMans', index)
        },
        // 选人检测
        check () {
            if (this.approvers.length == 0) {
                this.$vux.toast.text('请选择审批人')
                return false
            }
            return true
        },
        // 提交申请
        apply () {
            if (!this.check()) {
                return
            }
            this.isSub = false
            this.$store.dispatch('media/uploadImg').then(
                () => {
                    var imgArr = []
                    var recordFields = this.RecordFields
                    this.$store.state.media.imgData.forEach((item,index) => {
                        var obj = {FieldName: recordFields.length + (index+1), fieldChinaName: 'img', FieldValue: item, RecordType: 'string'}
                        imgArr.push(obj)
                    })
                    var RecordFields = recordFields.concat(imgArr)
                    var params = {
                        applyTitle: this.flowObj.FlowName,
                        applyUserId: this.$store.getters['user/teacherId'],
                        applyUserName: this.$store.state.user.realName,
                        tableId: this.flowObj.FormId, // 表单id
                        recordFields: JSON.stringify(RecordFields)
                    }
                    var paramsNew = {
                        data: JSON.stringify(params)
                    } 
                    this.$store.dispatch('oa/FormApply', paramsNew).then( //存表单
                        res => {
                            if (res.Code == 200) {
                                var params = {
                                    flowId: this.flowObj.Id,
                                    formId: this.flowObj.FormId,
                                    formRecordId: res.Data,
                                    recordCode: new Date().getTime(),
                                    recordTitle: this.flowObj.FlowName,
                                    tableTypeId: this.flowObj.FormTypeId,
                                    createUserId: this.$store.getters['user/teacherId'],
                                    createUserName: this.$store.state.user.realName,
                                    schoolId: this.$store.state.user.schoolId,
                                    recordFields: JSON.stringify(RecordFields),
                                    isCustom: true,
                                    createUserImage: this.$store.state.user.headImg
                                }
                                var paramsNew = {
                                    data: JSON.stringify(params)
                                }
                                this.$store.dispatch('oa/FlowApply', paramsNew).then( // 存流程
                                    res => {
                                        if (res.Code == 200) {
                                            var nodeArr = []
                                            this.approvers.forEach(
                                                (item, index) => {
                                                   var obj = {NodeName: item.name, OpUserIds: item.Id, OpDeptIds: '', NodeType: 1, OpUserImage: item.img}
                                                   nodeArr.push(obj)
                                                }
                                            )
                                            this.copyMans.forEach(
                                                (item, index) => {
                                                   var obj = {NodeName: item.name, OpUserIds: item.Id, OpDeptIds: '', NodeType: 2, OpUserImage: item.img}
                                                   nodeArr.push(obj)
                                                }
                                            )
                                            var params = {
                                                flowRecordId: res.Data,
                                                nodeJson: JSON.stringify(nodeArr)

                                            }
                                            var paramsNew = {
                                                data: JSON.stringify(params)
                                            }
                                            this.$store.dispatch('oa/AppendRecordNode', paramsNew).then(
                                                res => {
                                                    if (res.Code == 200) {
                                                        this.$vux.toast.text('申请成功')
                                                        this.$store.commit('selectTeacher/clear')
                                                        this.$store.commit('oa/clearMan')
                                                        this.$store.commit('media/clear')
                                                        this.$router.go(-2)
                                                        this.isSub = true
                                                    } else {
                                                        this.$vux.toast.text(res.Msg)
                                                        this.isSub = true
                                                    }
                                                }
                                            )
                                        } else {
                                            this.$vux.toast.text(res.Msg)
                                            this.isSub = true
                                        }
                                    }
                               )
                            } else {
                                this.$vux.toast.text(res.Msg)
                                this.isSub = true
                            }
                        }
                    )
                }
            )

        }
    },
    destroyed () {
        this.isSub = false
    }
    
}
</script>
<style scoped>
.title{
    padding: 0.2rem 0.3rem;
    color:#666;
    font-size: 0.24rem;
}
.box{
    position: relative;
}
.tr{
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    padding: 0.43rem 0rem 0.43rem 0.54rem;
    position: relative;
}
.step-img{
    width: 0.19rem;
    height: 2.76rem;
    position: absolute;
    top: 0.76rem;
    left: 0.19rem;
}
.td-1{
    display: inline-block;
    vertical-align: middle;
    width: 1.45rem;
}
.td-1 .star{
    position: absolute;
    top: 28px;
    left: 20px;
    color: red;
}
.m-text{
    font-size: 0.32rem;
    color:#333;
}
.s-text{
    color:#999;
    font-size: 0.24rem;
    padding: 0.2rem 0 0 0;
}
.hide-td-2{
    display: inline-block;
    vertical-align: middle;
    width: 3.3rem;
    margin: 0 0.4rem;
    white-space: nowrap;
    overflow: hidden;
}
.td-2{
    display: inline-block;
    vertical-align: middle;
    width: 3.6rem;
    margin-left: 0.4rem;
}
.td-3{
    display: inline-block;
    vertical-align: middle;
}
.man-box{
    display: inline-block;
}
.man-item{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    
}
.delete-btn{
    position: absolute;
    width: 0.4rem;
    height:0.4rem;
    top: 0rem;
    right:-0.1rem;
}
.man-img{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    display: inline-block;
    padding: 0.1rem 0;
}
.man-name{
    font-size: 0.24rem;
    color:#999;
}
.add-btn{
    width: 0.82rem;
    height: 0.82rem;
}
.arr-img{
    width: 0.12rem;
    height: 0.24rem;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.1rem;
}
.comfirm-btn{
    width: 6.4rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.2rem auto;
    color: #fff;
    background: #128FEF;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 0.08rem;
}
.comfirm-btn2{
    width: 6.4rem;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.2rem auto;
    color: #fff;
    background: #999;
    font-size: 0.32rem;
    text-align: center;
    border-radius: 0.08rem;
}
.model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
}
</style>