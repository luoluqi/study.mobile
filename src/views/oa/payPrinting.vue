<template>
    <div>
        <headNav title="付款申请"></headNav>
        <group label-width="4em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div class="rowStyle">
                <p class="areaLabel"> 
                    <span>付款事由</span>
                </p>
                <textarea :maxlength=200 v-model="reason" placeholder="请输入付款事由"></textarea>
                <span class="areaStar">*</span>
            </div>
        </group>
        <group label-width="10em" gutter="0.24rem">
            <div class="rowStyle">
                <x-input title="付款总额(元)" :max="10" type="number" :show-clear="false" text-align="right" v-model="totalPrice" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
           <div class="rowStyle">
                <popup-picker  title="付款方式" :data="payList" v-model="payType"  placeholder="请选择"></popup-picker>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <datetime v-model="date" format="YYYY-MM-DD HH:mm"  title="支付日期" placeholder="请选择"></datetime>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="支付对象" :show-clear="false" text-align="right" v-model="symbol" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="开户行" :show-clear="false" text-align="right" v-model="bank" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="银行账户" :min=8 :max=20 :show-clear="false" type="number" text-align="right" v-model="bankNum" placeholder="请输入"></x-input>
                <span class="star">*</span>
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
    name: 'payPrinting',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            reason: '',
            totalPrice: '',
            payList: [['支票', '贷记', '电汇', '汇票', '现金', '银行卡', '其他']],
            payType: [],
            date: '',
            symbol: '',
            bank: '',
            bankNum: '',
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
            this.reason = ''
            this.totalPrice =  ''
            this.payType = [],
            this.date = ''
            this.symbol = ''
            this.bank = ''
            this.bankNum = ''
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
                {FieldName: 2, fieldChinaName: '付款事由', FieldValue: this.reason, RecordType: 'string'},
                {FieldName: 3, fieldChinaName: '付款总额', FieldValue: this.totalPrice, RecordType: 'string'},
                {FieldName: 4, fieldChinaName: '付款方式', FieldValue: this.payType[0], RecordType: 'string'},
                {FieldName: 5, fieldChinaName: '支付日期', FieldValue: this.date, RecordType: 'datetime'},
                {FieldName: 6, fieldChinaName: '支付对象', FieldValue: this.symbol, RecordType: 'string'},
                {FieldName: 7, fieldChinaName: '开户行', FieldValue: this.bank, RecordType: 'string'},
                {FieldName: 8, fieldChinaName: '银行账户', FieldValue: this.bankNum, RecordType: 'string'}
            ]
            return recordFields
        },
        // 表单验证
        check () {
            // if (!this.sealDept[0]) {
            //     this.$vux.toast.text('请选择用印部门')
            //     return false
            // }
            if (!this.reason) {
                this.$vux.toast.text('请输入付款事由')
                return false
            }
             if (!this.totalPrice) {
                this.$vux.toast.text('请输入付款总额')
                return false
            } else {
                if (this.totalPrice.length>10) {
                    this.$vux.toast.text('付款总额不能大于9999999999')
                    return false
                }
            }
            if (!this.payType[0]) {
                this.$vux.toast.text('请选择付款方式')
                return false
            }
            if (!this.date) {
                this.$vux.toast.text('请选择支付日期')
                return false
            }
            if (!this.symbol) {
                this.$vux.toast.text('请输入支付对象')
                return false
            }
            if (!this.bank) {
                this.$vux.toast.text('请输入开户行')
                return false
            }
            if (!this.bankNum) {
                this.$vux.toast.text('请输入银行账户')
                return false
            } else {
                if (this.bankNum.length<8||this.bankNum.length>28) {
                    this.$vux.toast.text('银行账户不得少于8位或大于20位')
                    return false
                }
            }
            return true
        }
    }
}
</script>
<style src="./css/public.css" scoped>

</style>
<style scoped>
    .addDetail{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.88rem;
    }
    .addDetail img{
        width: 0.3rem;
        height: 0.3rem;
    }
</style>