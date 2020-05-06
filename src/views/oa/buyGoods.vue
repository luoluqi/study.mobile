<template>
    <div>
        <headNav title="物品申购"></headNav>
        <group label-width="6.5em" gutter="0.24rem" label-margin-right="2em" label-align="left">
             <div class="rowStyle">
                <x-input title="申请事由" :show-clear="false" text-align="right" v-model="buyReason" placeholder="请输入采购事由"></x-input>
                <span class="star">*</span>
            </div>
        </group>
        <div v-for="(item,index) in goodsList" :key='index' style="position:relative">
            <div v-if="index!=0" @click="delDetail(index)" class="delete">
                删除
            </div>
           <group class="group"  :title="'采购明细('+(index+1)+')'">
            
            <div class="rowStyle">
                <x-input title="物品名称" :show-clear="false" text-align="right" v-model="item.name" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="规格型号" :show-clear="false" text-align="right" v-model="item.model" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="数量" :show-clear="false" @input="input" :max="6" text-align="right" type="number" v-model="item.num" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input title="单价(元)" :show-clear="false" @input="input" :max="6" text-align="right" type="number" v-model="item.onePrice" placeholder="请输入"></x-input>
                <span class="star">*</span>
            </div>
            <div class="rowStyle">
                <x-input readonly title="合计" :show-clear="false" text-align="right" type="number" :value="item.num*item.onePrice?item.num*item.onePrice:''" placeholder="自动计算数值"></x-input>
            </div>
           
        </group>
        </div>
        
        <group title="如需采购多种产品，请点击“增加明细”">
            <div @click="addDetail" class="addDetail">
                <img src="@/assets/img/wj.png" alt=""> 
                增加明细
            </div>
        </group>
         <group gutter="0.24rem">
             <div class="rowStyle">
                <x-input readonly title="总数量" text-align="right"  type="number" v-model="totalNum" placeholder="自动计算数值"></x-input>
            </div>
             <div class="rowStyle">
                <x-input readonly title="总金额(元)" text-align="right" type="number" v-model="totalPrice" placeholder="自动计算数值"></x-input>
            </div>
        </group>
        <group gutter="0.24rem">
            <div class="rowStyle">
                <popup-picker  title="支付方式" :data="payList" v-model="payType"  placeholder="请选择"></popup-picker>
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
    name: 'buyGoods',
    components: {
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, uploadImg, headNav
    },
    data () {
        return{
            buyReason: '',
            payList: [['学校采购','自行采购']],
            payType: [],
            totalNum: '',
            totalPrice: '',
            deptList: [],
            dept: [],
            onegood: {name: '', model: '', num: '', onePrice: ''},
            goodsList:[{name: '', model: '', num: '', onePrice: ''}] 
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
            this.buyReason = ''
            this.totalNum =  ''
            this.totalPrice =  ''
            this.payType = []
            this.goodsList = [{name: '', model: '', num: '', onePrice: ''}] 
        }
        if (this.deptArr.length != 0) {
            this.deptList = []
            this.deptList.push(this.deptArr)
        } 
    },
    methods: {
        input () {
            this.countTotal()
        },
        // 计算总金额 
        countTotal () {
            this.totalNum = 0
            this.totalPrice = 0
            this.goodsList.forEach(
                (item, index) => {
                   this.totalNum += parseInt(item.num)
                   this.totalPrice += parseInt(item.onePrice)*parseInt(item.num)
                }
            )
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
        // 添加明细
        addDetail () {
            this.onegood = {name: '', model: '', num: '', onePrice: ''}
            this.goodsList.push(this.onegood)
        },
        // 删除明细
        delDetail (index) {
            this.goodsList.splice(index, 1)
            this.countTotal()
        },
        // 获取表单值
        setRecordFields () {
            var recordFields = [
                    {FieldName: 1, fieldChinaName: '所在部门', FieldValue: this.dept[0] ? this.dept[0] : '无部门', RecordType: 'string'},
                    {FieldName: 2, fieldChinaName: '申请事由', FieldValue: this.buyReason, RecordType: 'string'}
                ]
                this.goodsList.forEach((item,index) => {
                    var arr = [
                        {FieldName: recordFields.length + 1, fieldChinaName: '采购明细'+(index+1), FieldValue: 'buyGood', RecordType: 'string'},
                        {FieldName: recordFields.length + 2, fieldChinaName: '物品名称', FieldValue: item.name, RecordType: 'string'},
                        {FieldName: recordFields.length + 3, fieldChinaName: '规格型号', FieldValue: item.model, RecordType: 'string'},
                        {FieldName: recordFields.length + 4, fieldChinaName: '数量', FieldValue: item.num, RecordType: 'int'},
                        {FieldName: recordFields.length + 5, fieldChinaName: '单价(元)', FieldValue: item.onePrice, RecordType: 'float'},
                        {FieldName: recordFields.length + 6, fieldChinaName: '合计', FieldValue: item.num*item.onePrice, RecordType: 'string'}
                    ]
                    recordFields = recordFields.concat(arr)
                })
                var arr = [
                    {FieldName: recordFields.length + 1, fieldChinaName: '', FieldValue: 'line', RecordType: 'string'},
                    {FieldName: recordFields.length + 2, fieldChinaName: '总数量', FieldValue: this.totalNum, RecordType: 'int'},
                    {FieldName: recordFields.length + 3, fieldChinaName: '总金额(元)', FieldValue: this.totalPrice, RecordType: 'string'},
                    {FieldName: recordFields.length + 4, fieldChinaName: '支付方式', FieldValue: this.payType[0], RecordType: 'string'}
                ]
                recordFields = recordFields.concat(arr)
            return recordFields
        },
        check () {
            if (!this.buyReason) {
                this.$vux.toast.text('申请事由不能为空')
                return false
            }
            for (var item of this.goodsList){
                if (!item.name) {
                    this.$vux.toast.text('物品名称不能为空')
                    return false
                    
                }
                if (!item.model) {
                    this.$vux.toast.text('规格型号不能为空')
                    return false
                    
                }
                if (!item.num) {
                    this.$vux.toast.text('数量不能为空')
                    return false
                    
                }
                if (item.num>999999) {
                    this.$vux.toast.text('数量不能大于999999')
                    return false
                    
                }
                if (!item.onePrice) {
                    this.$vux.toast.text('单价不能为空')
                    return false
                    
                }
                if (item.onePrice>999999) {
                    this.$vux.toast.text('单价不能大于999999')
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
    .group{
        position: relative;
    }
    .delete{
        color: #ff0000;
        text-align: left;
        position: absolute;
        right: 0.5rem;
        font-size: 0.28rem;
        z-index: 100;
    }
    .weui-cells{
        overflow: auto;
    } 
</style>