<template>
    <div>
        <headNav title="电教报修"></headNav>
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
                <textarea :maxlength=200 v-model="content" placeholder="请输入报修的具体内容"></textarea>
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
    name: 'eduInsurance',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            repairList: [['电脑故障', '平板电脑故障', '网络故障', '投影仪故障', '其他']],
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
                {FieldName: 1, fieldChinaName: '所在部门', FieldValue: this.dept[0] ? this.dept[0]: '无部门', RecordType: 'string'},
                {FieldName: 2, fieldChinaName: '报修主题', FieldValue: this.repair[0], RecordType: 'string'},
                {FieldName: 3, fieldChinaName: '报修地点', FieldValue: this.place, RecordType: 'string'},
                {FieldName: 4, fieldChinaName: '报修内容', FieldValue: this.content, RecordType: 'string'}
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