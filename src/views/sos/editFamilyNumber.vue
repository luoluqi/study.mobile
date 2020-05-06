<template>
    <div>
        <headNav title="编辑亲情号码"></headNav>
        <div class="top">
            <!-- <p>
                添加哪位家人为亲情号码
            </p> -->
            <div class="chooseWho">
                <span :class="{'active': current == index}" @click="chooseMan(item,index)" v-for="(item,index) in familyMembers" :key="index">
                    {{item}}
                </span>
            </div>
        </div>
        <group  label-width="6.5em" gutter="0.24rem" label-margin-right="2em" label-align="left">
            <div v-if="isOtner" class="rowStyle">
                <x-input type="text" :show-clear='false' title="家人关系：" :min=1 :max=10 text-align="left" v-model.trim="familyRelation" placeholder="请输入家人关系"></x-input>
            </div>
            <div class="rowStyle">
                <x-input type="text" :show-clear='false' :min=11 :max=11 title="亲情号码：" text-align="left" v-model.trim="familyNum" placeholder="请输入亲情号码"></x-input>
            </div>
        </group>
        <div @click="setOrUpdateFamilyPhones(1)" class="remind">
            确认提交
        </div>
        <div @click="setOrUpdateFamilyPhones(0)" class="remind" style="background-color: #cc0707;">
            删除
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import { Group, XInput, XTextarea, Selector, PopupPicker, Datetime  } from 'vux'
export default {
    components:{
        Group, XInput, XTextarea, Selector, PopupPicker, Datetime, headNav
    },
    data () {
        return {
            familyMembers: ['爸爸', '妈妈', '爷爷', '奶奶', '外公', '外婆', '叔叔', '阿姨', '其他'], 
            familyNum: '',
            familyRelation: '',
            current: -1,
            nickName: '',
            isOtner: false,
            editData:''
        }
    },
    mounted(){
          this.editData = this.$store.state.sos.editData
          if(!this.$store.state.sos.editData){
                this.editData = JSON.parse(sessionStorage.getItem('editData'))
          }
          for(var i = 0;i < this.familyMembers.length;i++){
              if(this.familyMembers[i] == this.editData.nickName){
                  this.current = i
                   this.familyNum = this.editData.phone
                  this.nickName = this.editData.nickName
                  return
              }else{
                  this.current = 8
                  this.isOtner = true
                  this.familyNum = this.editData.phone
                  this.familyRelation = this.editData.nickName
                  this.nickName = this.editData.nickName
                }
          }
         
          console.log(this.editData)
    },
    methods: {
        // 设置亲情号码
        setOrUpdateFamilyPhones (type) {
            if(type == 1){
                if(!this.nickName){
                    this.$vux.toast.text('请选择身份')
                    return
                }
                 if(this.isOtner && !this.familyRelation){
                    this.$vux.toast.text('请输入亲情关系')
                    return
                }
                var phone = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/
                if(this.familyNum.length == 0){
                    this.$vux.toast.text('请输入电话号码')
                    return
                }
                if(this.familyNum.length > 0){//手机号码
                    if(!phone.test(this.familyNum)) {
                        this.$vux.toast.text('请输入正确的电话号码')
                        return
                    }
                }
                 
                if (this.isOtner) {
                    var oneNum = {
                        phone: this.familyNum,
                        nickName: this.familyRelation
                    }
                } else {
                    var oneNum = {
                        phone: this.familyNum,
                        nickName: this.nickName
                    }
                }
                var familyPhones = this.$route.params.phoneList ? this.$route.params.phoneList : []
                familyPhones.push(oneNum)
            }else{
                var familyPhones = this.$route.params.phoneList ? this.$route.params.phoneList : []
            }
            var params = {
                studentId: this.$store.getters['user/studentId'],
                // studentId: '2bf1def9599144dd964115bbe1243e70',
                familyPhones: familyPhones
            }
            this.$store.dispatch('sos/SetOrUpdateFamilyPhones', params).then(
                res => {
                    if (res) {
                        this.$vux.toast.text('操作成功')
                        this.$router.go(-1)
                    } else {
                        this.$vux.toast.text('该学生证不在线，请在学生证在线时设置')
                    }
                }
            ).catch(res => {
                this.$vux.toast.text(res)
                this.$route.params.phoneList.splice(this.$route.params.phoneList.length-1,1)
            })
        },
        // 选择人
        chooseMan (item,index) {
            this.current = index
            if (item == '其他') {
                this.isOtner = true
                this.nickName = item
            } else {
                this.isOtner = false
                this.nickName = item
            }
        }
    }
}
</script>
<style scoped>
    .top{
        background: #fff;
        padding: 0.3rem 0.12rem 0 0.12rem;
    }
    .top>p{
        font-size: 0.28rem;
        color: #333333;
        padding: 0 0.12rem;
    }
    .chooseWho{
        padding: 0.38rem 0 0.14rem 0;
    }
    .chooseWho>span{
        display: inline-block;
        margin: 0 0.12rem 0.24rem 0.12rem;
        color: #666;
        font-size: 0.28rem;
        background: #F8F8F8;
        border-radius: 0.08rem;
        width: 1.5rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
    }
    .chooseWho>.active{
        background: #E8F5FF;
        color: #128FEF;
    }
    .rowStyle{
        position: relative;
        padding: 0.2rem 0;
        border-bottom: 0.01rem solid #e5e5e5;
    }
    .remind{
        width:6.40rem;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.28rem auto;
        font-size: 0.32rem;
    }
</style>