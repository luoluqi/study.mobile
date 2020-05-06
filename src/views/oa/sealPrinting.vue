<template>
    <div>
        <headNav title="用印申请"></headNav>
        <group label-width="6.5em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div class="rowStyle">
                <popup-picker  title="用印部门" :data="deptList" v-model="sealDept"  placeholder="请选择"></popup-picker>
            </div>
            <div class="rowStyle">
                <x-input title="经办人" :show-clear="false" text-align="right" v-model="operator" placeholder="请填写经办人"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <datetime v-model="date" format="YYYY-MM-DD HH:mm"  title="日期" placeholder="请选择"></datetime>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="用印文件名称" :show-clear="false" text-align="right" v-model="fileName" placeholder="请填写用印文件名称"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="文件份数" :show-clear="false" :max=10 text-align="right" v-model="fileNum" type="number" placeholder="请填写文件份数"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <popup-picker  title="文件类别" :data="typeList" v-model="fileType"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <popup-picker  title="加盖何种印章" :data="sealList" v-model="seal"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="备注" :show-clear="false" text-align="right" v-model="mark" placeholder="请填写备注"></x-input>
            </div>
        </group>
        <group gutter="0.24rem">
            <div class="rowStyle">
                <popup-picker  title="所在部门" :data="deptList" v-model="dept"  placeholder="请选择"></popup-picker>
            </div>
        </group>
        <div @click="nextStep" class="nextStep">
            下一步
        </div>
      
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
import { Group, XInput, Selector, PopupPicker,Datetime  } from 'vux'
export default {
    name: 'sealPrinting',
    components: {
        Group, XInput, Selector, PopupPicker, Datetime, headNav
    },
    data () {
        return{
            operator: '',
            date: '',
            fileName: '',
            fileNum: '',
            typeList: [['公告类', '规章制度类', '合同类']],
            fileType: [],
            sealList: [['公章', '合同章', '法人章']],
            seal: [],
            deptList: [],
            dept: [],
            sealDept: [],
            mark: ''
        }
    },
    computed: {
        deptArr () {
            return this.$store.state.oa.deptArr
        }
    },
    activated () {
        if (this.$store.state.oa.isIndexTo) {
            this.dept = []
            this.operator = ''
            this.date =  ''
            this.fileName = ''
            this.fileNum = ''
            this.fileType = []
            this.seal = []
            this.sealDept = []
            this.mark = ''
        }
        if (this.deptArr.length != 0) {
            this.deptList = []
            this.deptList.push(this.deptArr)
        } 
    },
    methods: {
        nextStep () {
            if (!this.check()) {
                return
            }
            this.$store.commit('oa/setRecordFields', this.setRecordFields())
            this.$store.state.oa.isIndexTo = false
            this.$router.push('flowSet')
        },
        // 获取表单值
        setRecordFields () {
            var recordFields= [
                {FieldName: 1, fieldChinaName: '所在部门', FieldValue: this.dept[0] ? this.dept[0] : '无部门', RecordType: 'string'},
                {FieldName: 2, fieldChinaName: '用印部门', FieldValue: this.sealDept[0] ? this.sealDept[0] : '无部门', RecordType: 'string'},
                {FieldName: 3, fieldChinaName: '经办人', FieldValue: this.operator, RecordType: 'string'},
                {FieldName: 4, fieldChinaName: '日期', FieldValue: this.date, RecordType: 'datetime'},
                {FieldName: 5, fieldChinaName: '用印文件名称', FieldValue: this.fileName, RecordType: 'string'},
                {FieldName: 6, fieldChinaName: '文件份数', FieldValue: this.fileNum, RecordType: 'string'},
                {FieldName: 7, fieldChinaName: '文件类别', FieldValue: this.fileType[0], RecordType: 'string'},
                {FieldName: 8, fieldChinaName: '加盖何种印章', FieldValue: this.seal[0], RecordType: 'string'},
                {FieldName: 9, fieldChinaName: '备注', FieldValue: this.mark, RecordType: 'string'}
            ]
            return recordFields
        },
        // 表单验证
        check () {
            // if (!this.sealDept[0]) {
            //     this.$vux.toast.text('请选择用印部门')
            //     return false
            // }
            if (!this.operator) {
                this.$vux.toast.text('请输入经办人')
                return false
            }
            if (!this.date) {
                this.$vux.toast.text('请选择日期')
                return false
            }
            if (!this.fileName) {
                this.$vux.toast.text('请输入用印文件名称')
                return false
            }
            if (!this.fileNum) {
                this.$vux.toast.text('请输入文件份数')
                return false
            } else {
                if (this.fileNum.length>10) {
                    this.$vux.toast.text('文件份数不得超过9999999999')
                    return false
                }
            }
            if (!this.fileType[0]) {
                this.$vux.toast.text('请输入文件类别')
                return false
            }
            if (!this.seal[0]) {
                this.$vux.toast.text('请选择加盖何种印章')
                return false
            }
            return true
        }
    }
}
</script>
<style src="./css/public.css" scoped>

</style>
<style scoped>
    
</style>