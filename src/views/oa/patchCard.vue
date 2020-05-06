<template>
    <div>
        <headNav title="补考勤申请"></headNav>
        <group label-width="6.5em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div class="rowStyle">
                <datetime v-model="patchTime" format="YYYY-MM-DD HH:mm"  title="补考勤时间" placeholder="请选择"></datetime>
                <span class="star">*</span>
            </div>
        </group>
        <group gutter="0.24rem">
            <div class="rowStyle">
                <p class="areaLabel"> 
                    <span>考勤理由</span>
                </p>
                <textarea :maxlength=200 v-model="reason" placeholder="请输入补考勤理由"></textarea>
                <span class="areaStar">*</span>
            </div>
        </group>
         <group gutter="0.24rem">
            <uploadImg></uploadImg>
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
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
import uploadImg from '@/components/uploadImg'
export default {
    name: 'patchCard',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            patchTime: '',
            reason: '',
            deptList: [],
            dept: []
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
            this.patchTime = ''
            this.reason =  ''
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
                {FieldName: 2, fieldChinaName: '补卡时间', FieldValue: this.patchTime, RecordType: 'datetime'},
                {FieldName: 3, fieldChinaName: '补卡理由', FieldValue: this.reason, RecordType: 'string'}
            ]
            return recordFields
        },
        // 表单验证
        check () {
            if (!this.patchTime) {
                this.$vux.toast.text('请选择补考勤时间')
                return false
            }
            if (!this.reason) {
                this.$vux.toast.text('请输入补考勤理由')
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