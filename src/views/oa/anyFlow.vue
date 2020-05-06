<template>
    <div>
        <headNav title="流程申请"></headNav>
        <!-- 表单信息 -->
        <group id="h-input" v-html="recordForm.TableRemarkH5">

        </group>
        <!-- <group gutter="0.24rem">
            <div class="rowStyle">
                <popup-picker  title="所在部门" :data="deptList" v-model="dept"  placeholder="请选择"></popup-picker>
            </div>
        </group> -->
        <div v-if="isSub" @click="apply" class="comfirm-btn">发送申请</div>
        <div v-else class="comfirm-btn2">发送申请中...</div>
        <div v-if="!isSub" class="model">

        </div>
      
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import { Loading, XInput, Group, XButton, Cell, CheckIcon, XSwitch, Selector, Datetime, XTextarea, Alert } from 'vux'
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'newLeave',
  components: {
    Loading,
    XInput,
    XButton,
    Group,
    Cell,
    CheckIcon,
    XSwitch,
    Selector,
    Datetime,
    XTextarea,
    Alert,
    headNav
  },
  data () {
    return {
        commitFlag: false,
        deptList: [],
        dept: [],
        selectItem: '', // 选中的流程标题
        recordForm: '', // 表单数据
        recordDetail: '', // 记录详情
        fieldList: [],
        isSub: true
    }
  },
  computed:{
        deptArr () {
            return this.$store.state.oa.deptArr
        },
        flowObj () {
            return this.$store.state.oa.flowObj
        }
  },
  mounted () {
        if (this.deptArr.length != 0) {
            this.deptList = []
            this.deptList.push(this.deptArr)
        } 
        this.getFormId()
  },
  methods: {
    // 根据id获取表单
    getFormId () { 
      this.$store.dispatch('oa/GetFormDetail', {_id: this.flowObj.FormId}).then(
        res => {
          if (res.Code == 200) { 
            this.recordForm = res.Data.formTable
            this.fieldList = res.Data.fieldList
            this.recordForm.TableRemarkH5 = decodeURI(this.recordForm.TableRemarkH5)
          }
        }
      )
    },
    // // 下一步
    // nextStep () {
    //     var inputArr = document.getElementById('h-input').getElementsByTagName('input')
    //     var tableArr = []
    //     for (var i = 0; i < inputArr.length; i++) {
    //         var obj = {fieldChinaName:this.fieldList[i].ShowTitle ,FieldName: i, FieldValue: document.getElementById(inputArr[i].id).value.replace(/\s+/g, ''), RecordType: 'string'}
    //         tableArr.push(obj)
    //     }
    // },
     // 提交申请
        apply () {
            var inputArr = document.getElementById('h-input').getElementsByTagName('input')
            var tableArr = []
            for (var i = 0; i < inputArr.length; i++) {
                if(!document.getElementById(inputArr[i].id).value.replace(/\s+/g, '')){
                  this.$vux.toast.text('输入框不能为空')
                  return
                }
                var obj = {fieldChinaName:this.fieldList[i].ShowTitle ,FieldName: inputArr[i].id, FieldValue: document.getElementById(inputArr[i].id).value.replace(/\s+/g, ''), RecordType: 'string'}
                tableArr.push(obj)
            }
            this.isSub = false
            this.$store.dispatch('media/uploadImg').then(
                () => {
                    var imgArr = []
                    var recordFields = tableArr
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
                                          this.$vux.toast.text('申请成功')
                                          this.$router.go(-1)
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
                }
            )

        }
  }
}
</script>
<style src="./css/public.css" scoped>

</style>
<style lang = "less">
.edit-leave{
  .red{
    color: red;
    margin-right: 0.02rem;
  }
  .trueNum{
    margin-right: 0.1rem;
  }
  .remark{
    margin-left: 0.03rem;
  }
}
#h-input{
  padding: 0.2rem;
  background: #fff;
}
#h-input table{
  width: 100%;
  empty-cells: show;
  border-collapse: collapse;
}
#h-input th,#h-input td,#h-input table{
  border: 0.01rem solid #ccc;
  padding: 0.03rem 0.05rem;
}
#h-input table{
  margin: 0.1rem 0;
  line-height: 1.5;
}
#h-input input{
  border: 0.01rem solid #ccc;
  font-size: 0.28rem;
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
