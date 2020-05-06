<template>
    <div>
        <headNav title="总务报修"></headNav>
        <group label-width="6.5em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div class="rowStyle">
                <popup-picker  title="报修主题" :data="repairList" v-model="repair"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
        </group>
        <group gutter="0.24rem">
            <div class="rowStyle">
                <x-input title="报修地点" :show-clear="false" text-align="right" v-model="place" placeholder="请输入报修物品的地点"></x-input>
                <span class="star">*</span>
            </div>
        </group>
        <group gutter="0.24rem">
            <div class="rowStyle">
                <p class="areaLabel"> 
                    <span>具体内容</span>
                </p>
                <textarea :maxlength=200 v-model="content" placeholder="请输入具体内容"></textarea>
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
import headNav from '@/components/headNav/headNav'
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
import uploadImg from '@/components/uploadImg'
export default {
    name: 'affairsRepair',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            repairList: [['电器设备', '教学器具', '开关、插座类', '门窗、玻璃类', '跳闸、停电类']],
            repair: [],
            place: '',
            content: '',
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
            this.place = ''
            this.content =  ''
            this.repair = []
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
                {FieldName: 1, FieldValue: this.dept[0] ? this.dept[0] : '无部门', RecordType: 'string', fieldChinaName: '所在部门'},
                {FieldName: 2, FieldValue: this.repair[0], RecordType: 'string', fieldChinaName: '报修主题'},
                {FieldName: 3, FieldValue: this.place, RecordType: 'string', fieldChinaName: '报修地点'},
                {FieldName: 4, FieldValue: this.content, RecordType: 'string', fieldChinaName: '具体内容'}
            ]
            return recordFields
        },
        // 表单验证
        check () {
            if (!this.repair[0]) {
                this.$vux.toast.text('请选择报修主题')
                return false
            }
            if (!this.place) {
                this.$vux.toast.text('请输入报修地点')
                return false
            }
            if (!this.content) {
                this.$vux.toast.text('请输入报修的具体内容 ')
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