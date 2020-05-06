<template>
    <div>
        <headNav title="工作流"></headNav>
        <div class="tableContent" ref="scroll">
            <infiniteScroll @loadMore="loadMore">
            <div id="tabBox" class="tabBox">
                <span @click="choose(0)" :class="{'active': current == 0}">工作台</span>
                <span @click="choose(1)" :class="{'active': current == 1}">待办</span>
            </div>
            <div v-if="current == 0" class="box">
                <div class="box-head">
                    <div class="shouqi" @click="toggle">收起</div>
                    日常事务
                </div>
                <div class="box-body" :class="{'close': isClose}">
                    <div v-for="(item,index) in memuList" :key="index" class="menu-item" @click="loadto(item)">
                        <img :src="item.FlowImage" class="menu-img" alt="流程图标">
                        <div class="menu-text">{{item.FlowName}}</div>
                    </div>
                </div>
            </div>
            <div v-else class="box-2">
                <div id="secBar" class="secBar">
                    <span @click="chooseSec(0)" :class="{'active':currentSec == 0}">已发起</span>
                    <span @click="chooseSec(1)" :class="{'active':currentSec == 1}">待处理</span>
                    <span @click="chooseSec(2)" :class="{'active':currentSec == 2}">已处理</span>
                    <span @click="chooseSec(3)" :class="{'active':currentSec == 3}">抄送我</span>
                </div>
                    <div class="oneRecode" v-for="(item,index) in myRecord" :key="index" @click="toFlowDeatail(item)">
                        <div>
                            <img v-if="item.CreateUserImage" class="headImg" :src="item.CreateUserImage" @error="defaultBackImg" alt="">
                            <img v-else class="headImg" src="@/assets/img/default_head.png" alt="">
                            {{item.CreateUserName}}提交的{{item.RecordTitle}}
                        </div>
                        <div v-for='(item2,index2) in item.fieldValueList' :key="index2" class="normal">
                            {{item2.FieldChinaName}}:{{item2.FieldValue}}
                        </div>
                        <div class="normal">
                            <img src="@/assets/img/oa/clock.png" alt="">
                            {{item.CreateDateTime | formatDateTime('YYYY-MM-DD')}}
                            来自审批
                            <!-- 审批状态判断 -->
                            <span v-if="item.FlowState==0" class="state noPass">待审核</span>
                            <span v-else-if="item.FlowState==1" class="state doing">审核中</span>
                            <span v-else-if="item.FlowState==2" class="state reject">驳回</span>
                            <span v-else-if="item.FlowState==3" class="state cancel">取消</span>
                            <span v-else-if="item.FlowState==10" class="state pass">通过</span>
                            <span v-else-if="item.FlowState==20" class="state noPass">不通过</span>
                            <span v-else class="state">抄送成功</span>

                        </div>
                    </div>
                    <div class="load-p">
                        <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                        <load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
                    </div>
                </div>
            </infiniteScroll>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import { LoadMore } from 'vux'
import infiniteScroll from '@/components/infiniteScroll'
export default {
    name: 'oaIndex',
    components: {headNav, LoadMore, infiniteScroll},
    data () {
        return {
            current: 0,
            currentSec: 0,
            deptId: '',
            isClose: false,
            memuList: [],
            menuNames: [
                {name: '总务报修', val: 'affairsRepair', id: '7c658dff-314c-4fbd-9369-1700244d4658'},
                {name: '电教报修', val: 'eduInsurance', id: '8b305cfe-221b-444f-b4cf-3f6b4f3e9979'},
                {name: '物品申购', val: 'buyGoods', id: '2ad56de1-ebf9-4382-a97e-fae7e4a27405'},
                {name: '付款申请', val: 'payPrinting', id: '97ed607b-aaa4-412a-961c-295a06e4e733'},
                {name: '用印申请', val: 'sealPrinting', id: 'ec18b4f7-8a93-4ea4-b2a1-d9cf2cfe3a29'},
                {name: '请假', val: 'leave', id: '0fa419d3-5ee9-440d-bff9-f3ff644a6090'},
                {name: '补考勤', val: 'patchCard', id: 'f5a68f61-467f-4eff-acec-041bb7907ef1'},
                {name: '调课报备', val: 'classAdjustment', id: '9bb74e22-8d34-4f3f-b8c1-81de8f4b1246'}
            ],
            myRecord: [], //我发起的
            isMore: true,
            pageSize: 5,
            pageIndex: 0,
        }
    },
    methods: {
        defaultBackImg() {
            if(event.type == "error") {
                event.target.src = require("../../assets/img/default_head.png")
            }
        },
        // 数组根据对象排序
        compare(val) {
            return function (a, b) {
            var value1 = a[val];
            var value2 = b[val];
            return value1 - value2;
            }
        },
        choose (index) {
            this.current = index
            if (index == 1) {
                this.myRecord = []
                this.isMore = true
                this.pageIndex = 0
                this.getMyrecord() //获取我发起的
            }
        },
        chooseSec (index) {
            this.myRecord = []
            this.isMore = true
            this.pageIndex = 0
            this.currentSec = index
             if (index == 0) {
                this.getMyrecord()
            }
            if (index == 1) {
                this.getMyPendingDeal()
            }
            if (index == 2) {
                this.getMyHasDeal()
            }
            if (index == 3) {
                this.getMyCopy()
            }
        },
        toggle () {
            this.isClose = !this.isClose
        },
        loadto (obj) {
            var flag = true
            this.$store.commit('selectTeacher/clear')
            this.$store.commit('oa/clearMan')
            this.$store.commit('oa/setFlowObj', obj)
            this.menuNames.forEach((item, index)=>{
                if (obj.FormId == item.id) {
                    flag = false
                    this.$store.commit('oa/flowId')
                    this.$store.commit('media/clear')
                    this.$store.state.oa.isIndexTo = true
                    this.$router.push(item.val)
                    return
                } 
            })
            if(flag) {
                this.$router.push('anyFlow') 
                // this.$vux.toast.text('暂无流程表单，流程不可用')
            } 
        },
        // 获取当前用户能申请的流程
        myPowerApplyFlow () {
            var params = {
                userId: this.$store.getters['user/teacherId'],
                deptId: this.deptId,
                schoolId: this.$store.state.user.schoolId
            }
            this.$store.dispatch('oa/MyPowerApplyFlow', params).then(
                res => {
                    if (res.Code == 200) {
                        this.memuList = res.Data
                    } 
                }

            )
        },
        // 获取部门deptid
        getDeptId (teacherId) {
            this.$store.dispatch('oa/DeptListByTeacherId', {teacherId}).then(result => {
                let arr = []
                let deptArr = []
                if (result.Code == 200) {
                    for (var i = 0; i < result.Data.length; i++) {
                        var obj = {name: result.Data[i].Name, value: result.Data[i].Id}
                        arr.push(result.Data[i].Id)
                        deptArr.push(result.Data[i].Name)
                    }
                    this.deptId = arr.join()
                    this.$store.commit('oa/deptId', this.deptId)
                    this.$store.commit('oa/deptArr', deptArr)
                    this.myPowerApplyFlow()
                } 
            })
        },
        // 获取我发起的列表
        getMyrecord () {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var params = {
                pageSize: this.pageSize, 
                pageIndex: this.pageIndex, 
                userId: this.$store.getters['user/teacherId']
            }
            this.$store.dispatch('oa/PageMyRecord', params).then(
                res => {
                    if (res.Code == 200) {
                        if (res.Data.data.length < this.pageSize) {
                            this.isMore = false
                        }
                        res.Data.data.forEach((item, index) => {
                            item.fieldValueList.sort(this.compare('FieldName'))
                            item.fieldValueList.forEach(
                                (item2,index) =>{
                                    if (item2.FieldValue == 'buyGood') {
                                        item.fieldValueList.splice(index, 1)
                                    }
                                }
                             )
                            item.fieldValueList = item.fieldValueList.slice(1,3)
                        })
                        this.myRecord = this.myRecord.concat (res.Data.data)
                    } else {
                        this.isMore = false
                    }
                }
            )
        },
        /// 我待处理的 
        getMyPendingDeal (page) {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var params = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                userId: this.$store.getters['user/teacherId'],
                deptId: this.deptId,
                schoolId: this.$store.state.user.schoolId
            }
            this.$store.dispatch('oa/PageMyPendingDeal', params).then(
                res => {
                    if (res.Code == 200) {
                        if (res.Data.data.length < this.pageSize) {
                            this.isMore = false
                        }
                        res.Data.data.forEach((item, index) => {
                            item.fieldValueList.sort(this.compare('FieldName'))
                            item.fieldValueList = item.fieldValueList.slice(1,3)
                        })
                        this.myRecord = this.myRecord.concat (res.Data.data)
                    } else {
                        this.isMore = false
                    }
                }
            )
        },
        // 我已处理的 PageMyHasDeal
        getMyHasDeal () {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var params = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                userId: this.$store.getters['user/teacherId'],
                schoolId: this.$store.state.user.schoolId
            }
            this.$store.dispatch('oa/PageMyHasDeal', params).then(
                res => {
                    if (res.Code == 200) {
                        if (res.Data.data.length < this.pageSize) {
                            this.isMore = false
                        }
                        res.Data.data.forEach((item, index) => {
                            item.fieldValueList.sort(this.compare('FieldName'))
                            item.fieldValueList = item.fieldValueList.slice(1,3)
                        })
                        this.myRecord = this.myRecord.concat (res.Data.data)
                    } else {
                        this.isMore = false
                    }
                }
            )
        },
        // 获取抄送我的
        getMyCopy () {
            if(!this.isMore){
                return
            }
            this.pageIndex++
            var params = {
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                userId: this.$store.getters['user/teacherId'],
                schoolId: this.$store.state.user.schoolId,
                nodeType: 2
            }
            this.$store.dispatch('oa/PageMyHasDeal', params).then(
                res => {
                    if (res.Code == 200) {
                        if (res.Data.data.length < this.pageSize) {
                            this.isMore = false
                        }
                        res.Data.data.forEach((item, index) => {
                            item.fieldValueList.sort(this.compare('FieldName'))
                            item.fieldValueList = item.fieldValueList.slice(1,3)
                        })
                        this.myRecord = this.myRecord.concat (res.Data.data)
                    }
                }
            )
        },
        // 跳转流程审核
        toFlowDeatail (item) {
            this.$store.state.oa.goIndexType = ''
            this.$store.commit('oa/dflowId', item.Id)
            this.$router.push('dealFlow')
        },
        //加载更多
        loadMore () {
            this.currentSec == 0 ? this.getMyrecord() : this.currentSec == 1 ? this.getMyPendingDeal() : this.currentSec == 2 ? this.getMyHasDeal() : this.getMyCopy()
        },
        // getScroll (data) {
        //     var div = document.getElementById('tabBox')
        //     var div2 = document.getElementById('secBar')
        //     if (data >= 88) {
        //         div.style = "position:fixed; top:0.88rem;"
        //     }else {
        //          div.style = ""
        //     }
        // }
    },
    activated () {
        this.getDeptId(this.$store.state.user.teacherId) // 获取部门
        if (this.$store.state.oa.goIndexType) {
            this.myRecord.forEach(
                (item, index) => {
                    item.FlowState = item.Id == this.dflowId ? this.$store.state.oa.goIndexType : item.FlowState
                }
            )
        }
    },
    computed: {
        dflowId () {
            return this.$store.state.oa.dflowId
        }
    }
}
</script>
<style scoped>
.box{
    width: 6.8rem;
    margin: 0.16rem auto;
    background: #fff;
    border-radius: 0.1rem;
}
.box-2{
    width: 100%;
    padding: 0 0.2rem;
    box-sizing: border-box;
}
.tabBox{
    width: 100%;
    background: #fff;
    height: 0.92rem;
    line-height: 0.92rem;
    padding: 0 0.42rem;
    font-size: 0.32rem;
    color: #666;
    box-sizing: border-box;
    
}
.tabBox span{
    font-weight: bold;
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    height: 100%;
    width: 1rem;
    text-align: center;
}
.tabBox .active{
    color: #128fef;
}
.tabBox .active:before{
    position: absolute;
    z-index: 1;
    left: 0.27rem;
    bottom: 0px;
    display: inline-block;
    height: 3px;
    width: 0.46rem;
    background-color: #128fef;
    content: "";
    border-radius:25% ;
}
.box-head{
    color:#333;
    font-size: 0.32rem;
    padding: 0.3rem 0.2rem;
}
.shouqi{
    float: right;
    font-size: 0.24rem;
    color:#666;
}
.box-body{
    padding: 0 0.2rem;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
    transition: 0.2s;
    overflow: hidden;
}
.box-body.close{
    height: 0rem;
}
.menu-item{
   
    width: 1rem;
    text-align: center;
    margin: 0 0.28rem 0.33rem 0;
}
.menu-img{
    width: 0.84rem;
    height: 0.84rem;
    display: inline-block;
}
.menu-text{
    color: #666;
    font-size: 0.24rem;
}
.secBar{
    margin: 0.18rem 0;
}
.secBar span{
    display: inline-block;
    text-align: center;
    font-size: 0.28rem;
    color: #666;
    height: 0.6rem;
    line-height: 0.6rem;
    width: 1.64rem;
}
.secBar .active{
    background: #fff;
    border-radius: 0.3rem;
    color: #444;
    font-weight: bold;
}
.oneRecode{
    background: #fff;
    padding: 0.26rem 0.2rem;
    color: #333;
    font-size: 0.32rem;
    margin-bottom: 0.2rem;
}
.oneRecode div:first-child{
    display: flex;
    align-items: center;
}
.headImg {
    width: 0.56rem;
    height: 0.56rem;
    margin-right: 0.12rem;
    border-radius: 50%;
}
.normal{
    color: #999;
    font-size: 0.28rem;
    line-height: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.normal img{
    width: 0.26rem;
    height: 0.26rem;
}
.state{
    font-size: 0.32rem;
    float: right;
}
.pass{
    color: #14BE58;
}
.reject{
    color: #E64340;
}
.cancel{
    color: #DEDEDE;
}
.doing{
    color: #E6A23C;
}
.noPass{
    color: #434343;
}
.load-p{
    padding: 1rem 0 0 0;
}
.tableContent{
    height: calc(100% - 0.88rem);
}
</style>
