<template>
    <div>
        <headNav title="请假"></headNav>
        <group label-width="6.5em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div class="rowStyle">
               <popup-picker title="请假类型" :data="typeList"  v-model="leaveType" placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <datetime @on-change="getBeginTime" v-model="beginTime" format="YYYY-MM-DD HH:mm"  title="开始时间" placeholder="请选择"  :end-date="endDate == 'NaN-NaN-NaN'? '9999-12-31' : endDate"></datetime>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <datetime @on-change="getEndTime" v-model="endTime" format="YYYY-MM-DD HH:mm"  title="结束时间" placeholder="请选择" :start-date="beginDate == 'NaN-NaN-NaN'? '1900-01-01' : beginDate"></datetime>
                <span class="star">*</span>
            </div>
             <div class="rowStyle">
                <x-input title="时长" :show-clear="false" text-align="right" :max=10 v-model="timeLength" placeholder="请输入时长"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <p class="areaLabel"> 
                    <span>请假事由</span>
                </p>
                <textarea :maxlength=200 v-model="leaveReason" placeholder="请输入请假事由"></textarea>
                <span class="areaStar">*</span>
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
import headNav from '@/components/headNav/headNav';
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
import uploadImg from '@/components/uploadImg'
import { Store } from 'vuex';
export default {
    name: 'leave',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            deptList: [],
            dept: [],
            beginTime: '',
            endTime: '',
            timeLength: '',
            leaveReason: '',
            typeList: [['事假','调休','病假','年假','产假','陪产假','婚假','丧假']],
            leaveType: [],
            beginDate: '1900-01-01',
            beginHour: 0,
            endDate: '9999-12-31',
            endHour: 23,
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
            this.beginTime = ''
            this.endTime =  ''
            this.timeLength = ''
            this.leaveReason = ''
            this.leaveType = [],
            this.beginDate = '1900-01-01'
            this.beginHour = 0
            this.endDate = '9999-12-31'
            this.endHour = 23
        }
        this.deptList = []
        this.deptList.push(this.deptArr)
    },
    methods: {
        // 获取 开始时间
        getBeginTime () {
            var month = new Date(this.beginTime).getMonth()+1 < 10 ? '0'+(new Date(this.beginTime).getMonth()+1) :new Date(this.beginTime).getMonth()+1
            var date = new Date(this.beginTime).getDate() < 10 ? '0' + new Date(this.beginTime).getDate() : new Date(this.beginTime).getDate() 
            this.beginDate = new Date(this.beginTime).getFullYear() + '-' + month + '-' + date
            this.beginHour = new Date(this.beginTime).getHours() < 23 ? new Date(this.beginTime).getHours()+1 : new Date(this.beginTime).getHours()
        },
        // 获取 开始时间
        getEndTime () {
            var month = new Date(this.endTime).getMonth()+1 < 10 ? '0'+(new Date(this.endTime).getMonth()+1) :new Date(this.endTime).getMonth()+1
            var date = new Date(this.endTime).getDate() < 10 ? '0' + new Date(this.endTime).getDate() : new Date(this.endTime).getDate() 
            this.endDate = new Date(this.endTime).getFullYear() + '-' + month + '-' + date
            this.endHour = new Date(this.endTime).getHours()-1
        },
        // 下一步
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
                {FieldName: 2, fieldChinaName: '请假类型', FieldValue: this.leaveType[0], RecordType: 'string'},
                {FieldName: 3, fieldChinaName: '开始时间', FieldValue: this.beginTime, RecordType: 'datetime'},
                {FieldName: 4, fieldChinaName: '结束时间', FieldValue: this.endTime, RecordType: 'datetime'},
                {FieldName: 5, fieldChinaName: '请假时长', FieldValue: this.timeLength, RecordType: 'string'},
                {FieldName: 6, fieldChinaName: '请假事由', FieldValue: this.leaveReason, RecordType: 'string'} 
            ]
            return recordFields
        },
        // 表单验证
        check () {
            if (!this.leaveType[0]) {
                this.$vux.toast.text('请选择请假类型')
                return false
            }
            if (!this.beginTime) {
                this.$vux.toast.text('请选择开始时间')
                return false
            }
            if (!this.endTime) {
                this.$vux.toast.text('请选择结束时间 ')
                return false
            }
            if (!this.timeLength) {
                this.$vux.toast.text('请输入请假时长')
                return false
            }
            if (!this.leaveReason) {
                this.$vux.toast.text('请输入请假理由')
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