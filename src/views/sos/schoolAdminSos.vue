<template>
  <div>
    <headNav title="校方SOS号码设置"></headNav>
    <div class="columnBigDiv" v-for="(val, item) in numberArr" :key="item" >
      <span v-if="val.type == 1" >校方SOS号码1</span>
      <span v-if="val.type == 2" >校方SOS号码2</span>
      <span v-if="val.type == 3" >家庭SOS号码</span>
      <input type="text" class="inputCss" value="" v-show="val.type != 3" v-model="val.phone"  placeholder="固话格式为区号+号码"  :disabled="val.disabled"  />
      <!-- <span>固话格式为区号+号码</span> -->
      <input type="text" class="inputCss" value="" disabled="true"  v-show="val.type == 3"  />
      <span v-show="item != 0" @click="moveClick(1, item)"  >上移</span>
      <span v-show="item == 0" @click="moveClick(2, item)" >下移</span>
    </div>
    <div class="remindText" >
      <span>校方SOS号码仅允许设置一次，请谨慎设置</span>
    </div>
    <div class="buttonDivCss" >
      <button class="buttonCss" type="default" @click="preservationSos" >保存</button>
      <button class="buttonCss" style="background: #FFFFFF; color: #128FEF ; " type="default" @click="cancel()" >取消</button>
    </div>
  </div>
</template>

<script>
import headNav from '@/components/headNav/headNav.vue'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    headNav
  },
  data () {
    return {
      setOrNot: false,
      numberArr: [
        {type:1, phone: ''},
        {type:2, phone: ''},
        {type:3, phone: ''},
      ]
    }
  },
  computed: {
    ...mapState({
      schoolId: state => state.user.schoolId,
      loginUserId: state => state.user.loginUserId,
    })
  },
  mounted() {
    this.getNumber()
    console.log(this.schoolId)
    console.log(this.loginUserId)
  },
  methods: {
    ...mapActions({
       getSosInformation: 'schoolAdminSos/getSosInformation',
       saveSosNumber: 'schoolAdminSos/saveSosNumber'
     }),
    // 上移下移触发事件
    moveClick(e, item) {
      if(e==1) {
        let arr = this.numberArr[item-1]
        this.numberArr.splice(item-1, 1)
        this.numberArr.splice(item, 0, arr)
      }else {
        let arrVice = this.numberArr[item+1]
        this.numberArr.splice(item+1, 1)
        this.numberArr.splice(item, 0, arrVice)
      }

    },
    // 取消按钮触发事件
    cancel() {
      location.href="http://mappv2.xueerqin.net/home/#/index"
    },
    // 保存按钮触发事件
    preservationSos () {
      this.$vux.confirm.show({
          title: '提示',
          content: '校方SOS号码仅允许保存一次，确定要保存设置吗？',

          onConfirm : () => {
            let number1, number2
            let empty = true
            for (let i=0; i<this.numberArr.length; i++) {
              if (this.numberArr[i].phone == '' ) {
                empty = false
              }else{
                empty = true
                break
              }
            }
            if(empty == false) {
              this.$vux.toast.text('至少设置一个紧急联系号码', 'middle')
              return
            }

            var integer1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/
            var integer2 = /^(0[0-9]{2,3})([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
            for (let i=0; i<this.numberArr.length; i++) {
              if(this.numberArr[i].type == 1) {
                number1 = this.numberArr[i].phone
              }
              if(this.numberArr[i].type == 2) {
                number2 = this.numberArr[i].phone
              }
              if ( this.numberArr[i].type == 1 || this.numberArr[i].type == 2 ) {
                if (this.numberArr[i].phone != '' && this.numberArr[i].phone != 110 && this.numberArr[i].phone != 120 && this.numberArr[i].phone != 112 && this.numberArr[i].phone != 122 && this.numberArr[i].phone != 119 ) {
                  // !(/^([0-9]{3,4})?[0-9]{7,8}$/.test(this.numberArr[i].phone))
                  if(!integer1.test(this.numberArr[i].phone) &&  !integer2.test(this.numberArr[i].phone) ){
                    empty = false
                    break
                  }
                }
              }
            }
            if(empty == false) {
              this.$vux.toast.text('输入的号码格式有误，请重新输入', 'middle')
              return
            }
            if (number1 == number2) {
              this.$vux.toast.text('紧急号码不允许相同', 'middle')
              return
            }

            let params = {
              loginUserId: this.loginUserId,
              schoolId: this.schoolId,
              schoolSOSInfos: this.numberArr
            }
            this.saveSosNumber(params).then(res => {
              this.$vux.toast.text('设置成功', 'middle')
              this.getNumber()
            })
          }
      })

    },
    // 获取设置号码封装
    getNumber() {
      this.getSosInformation(this.schoolId).then(res => {
        if(res.schoolSOSConfigInfos.length != 0) {
          this.numberArr = res.schoolSOSConfigInfos
        }
        for(let i=0; i<this.numberArr.length; i++){
         if (this.numberArr[i].phone != '' || this.numberArr[i].type == 3 ) {
           this.$set(this.numberArr[i], 'disabled', true)
         }
        }
        console.log(this.numberArr)
      })
    }
  }
}
</script>

<style scoped lang="less" >
.columnBigDiv {
  width: 100%;
  height: 1.3rem;
  background: #ffffff;
  margin: 0 0 0.325rem 0;
  font-size: 0.25rem;
  .flexCss;
  .inputCss {
    width: 4.45rem;
    height: 0.675rem;
    font-size: 13px;
    border: 1px solid #C1C1C1;
    margin: 0 0.112rem 0 0.1125rem;
    border-radius: 5px;
    padding: 0 0 0 8px;
  }
}

.remindText {
  width: 100%;
  height: 0.5rem;
  color: red;
  font-size: 16px;
  .flexCss;
}

.buttonDivCss {
  width: 100%;
  height: 1rem;
  margin: 0.2rem 0 0 0;
  .flexCss;
  .buttonCss{
    width: 1.8rem;
    height: 0.6rem;
    font-size: 15px;
    background: #128FEF;
    color: #FFFFFF;
    border: 1px solid #128FEF;
    border-radius: 10px;
    margin: 0 0.2rem 0 0.2rem;
    .flexCss;
  }
}

.flexCss {
  display: flex;
  justify-content: center;
  align-items: center;
}

input::-webkit-input-placeholder {
   /* placeholder字体大小  */
   font-size: 10px;
}
</style>
