<template>
    <div>
        <headNav title="调课报备"></headNav>
        <group label-width="4em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div class="rowStyle">
                <datetime v-model="justDate" format="YYYY-MM-DD HH:mm"  title="调课日期" placeholder="请选择"></datetime>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <popup-picker  title="节次" :data="sectionList" v-model="mySection"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <popup-picker  title="科目" :data="subjectList" v-model="subject"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="对方姓名" :show-clear="false" text-align="right" v-model="partName" placeholder="请输入对方姓名"></x-input>
                <span class="star">*</span>
            </div>
             <div class="rowStyle">
                <datetime v-model="partJustDate" format="YYYY-MM-DD HH:mm"  title="对方日期" placeholder="请选择"></datetime>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <popup-picker  title="对方节次" :data="sectionList" v-model="partSection"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <p class="areaLabel"> 
                    <span>备注</span>
                </p>
                <textarea :maxlength=200 v-model="mark" placeholder="请输入备注"></textarea>
            </div>
        </group>
        <group gutter="0.24rem">
            <div class="rowStyle">
                <popup-picker  title="所在部门" :data="deptList"  v-model="dept"  placeholder="请选择"></popup-picker>
            </div>
        </group>
        <div @click="nextStep" class="nextStep">
            下一步
        </div>
      
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
import uploadImg from '@/components/uploadImg'
export default {
    name: 'classAdjustment',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            partName: '',
            deptList: [],
            dept: [],
            sectionList: [['晨间课程', '上午第一节', '上午第二节', '上午第三节', '上午第四节', '下午第一节', '下午第二节', '下午第三节', '下午第四节', '晚间课程']],
            mySection: [],
            partSection: [],
            subjectList: [],
            subject: [],
            justDate: '',
            partJustDate: '',
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
            this.partName = ''
            this.mySection =  []
            this.partSection = []
            this.subject = []
            this.justDate = ''
            this.partJustDate = ''
            this.mark = ''
        }
        this.deptList = []
        this.deptList.push(this.deptArr)
        this.getSubject()
    },
    methods: {
         // 获取科目
        getSubject () {
            var prams = {
                teacherId:this.$store.getters['user/teacherId']
            }
            this.$store.dispatch('homework2/GetSubjectList',prams).then((data) => {
                var subjectList = []
                var data = JSON.parse(data)
                var subjectData = data.Data.data
                subjectData.forEach(item => {
                    subjectList.push(item.name)
                })
                this.subjectList = [subjectList]
            })
        },
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
                {FieldName: 2, fieldChinaName: '调课日期', FieldValue: this.justDate, RecordType: 'datetime'},
                {FieldName: 3, fieldChinaName: '节次', FieldValue: this.mySection[0], RecordType: 'string'},
                {FieldName: 4, fieldChinaName: '科目', FieldValue: this.subject[0], RecordType: 'string'},
                {FieldName: 5, fieldChinaName: '对方姓名', FieldValue: this.partName, RecordType: 'string'},
                {FieldName: 6, fieldChinaName: '对方日期', FieldValue: this.partJustDate, RecordType: 'datetime'},
                {FieldName: 7, fieldChinaName: '对方节次', FieldValue: this.partSection[0], RecordType: 'string'},
                {FieldName: 8, fieldChinaName: '备注', FieldValue: this.mark, RecordType: 'string'}
                
            ]
            return recordFields
        },
        // 表单验证
        check () {
            if (!this.justDate) {
                this.$vux.toast.text('请选择调课日期')
                return false
            }
            if (!this.mySection[0]) {
                this.$vux.toast.text('请选择节次')
                return false
            }
            if (!this.subject[0]) {
                this.$vux.toast.text('请选择科目')
                return false
            }
            if (!this.partName) {
                this.$vux.toast.text('请输入对方姓名')
                return false
            }
            if (!this.partJustDate) {
                this.$vux.toast.text('请选择对方日期')
                return false
            }
            if (!this.partSection[0]) {
                this.$vux.toast.text('请选择对方节次')
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