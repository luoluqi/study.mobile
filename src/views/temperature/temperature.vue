<template>
  <div @focusout="inputBlur" @focusin="inputFocus" style=" background: #fff; " >
    <headNav title="体温监测"></headNav>
    <div class="bigClass" >
      <span>时间：</span>
      <span style="color: #666666;" >{{newTime}}</span>
    </div>
    <div class="bigClass" >
      <span>身份&emsp;</span>
      <input type="text" value="访客" disabled class="inputBox"  />
    </div>
    <div class="bigClass" >
      <span>姓名&emsp;</span>
      <input type="text" v-model="inputName" placeholder="请输入来访者姓名" @change="nameInputChange" class="inputBox"  />
    </div>
    <div class="bigClass" >
      <span>温度&emsp;</span>
      <input type="number" v-model="inputVal" placeholder="请输入来访者温度" @change="inputChange" class="inputBox"  />
    </div>
    <div class="bigClass" style="justify-content: center; margin-top: 0.4rem; " >
      <button type="default" class="buttonCss" @click="yes" >确定</button>
      <button type="default" class="buttonCss" @click="cancel" style="background: #a1a1a1; margin-left: 0.8rem; "  >取消</button>
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
      newTime: '',
      inputName: '',
      inputVal: '',
      timer: null
    }
  },
  computed: {
    ...mapState({
      schoolId: state => state.user.schoolId,   // 用户信息
      loginUserId: state => state.user.loginUserId,   // 登录身份
    })
  },
  methods: {
    ...mapActions({
       addTemperatureApi: 'temperature/addTemperatureApi',
     }),
    // 温度输入框值改变时触发的事件
    inputChange() {
      // if (this.inputVal.length > 5 || this.inputVal < 0) {
      //   this.inputVal = ''
      //   this.$vux.toast.text('温度格式有误请重新输入', 'middle')
      // }else {
      //   this.inputVal = this.inputVal
      // }
    },
    // 姓名输入框值改变时触发的事件
    nameInputChange() {
      // let regular = /^[a-zA-Z\u4e00-\u9fa5]+$/

      // if (this.inputName.length > 21 || !regular.test(this.inputName) ) {
      //   this.inputName = ''
      //   this.$vux.toast.text('名称格式有误请重新输入', 'middle')
      // }else {
      //   this.inputName = this.inputName
      // }
    },
    // 确定按钮触发事件
    yes () {
      if (this.inputVal.length > 5 || this.inputVal < 0) {
        this.inputVal = ''
        this.$vux.toast.text('温度格式有误请重新输入', 'middle')
        return
      }else {
        this.inputVal = this.inputVal
      }
      let regular = /^[a-zA-Z\u4e00-\u9fa5]+$/

      if (this.inputName.length > 21 || !regular.test(this.inputName) ) {
        this.inputName = ''
        this.$vux.toast.text('名称格式有误请重新输入', 'middle')
        return
      }else {
        this.inputName = this.inputName
      }

      let Time = new Date().toLocaleString('chinese',{hour12:false}).split(' ')
      let handle = Time[0].split('/')
      handle[1].length <= 1 ? handle[1] = "0" + handle[1] : handle[1] = handle[1]
      handle[2].length <= 1 ? handle[2] = "0" + handle[2] : handle[2] = handle[2]
      let handTime = handle.join('-') + ' ' + Time[1]

      if (this.inputVal && this.inputName) {
        // this.schoolId    '16cb8a3f91e54457a30fe78147ae4862'
        let params = {
            checkTime: handTime,
            realTemperature: parseFloat(this.inputVal),
            schoolId: this.schoolId,
            userName: this.inputName,
            userType: 0
          }
          this.addTemperatureApi(params).then(res => {
            this.$vux.toast.text(res.data.msg, 'middle')
            Object.assign(this.$data, this.$options.data())
            let myDate = new Date()
            this.newTime = myDate.toLocaleString()
          })
      }else {
        this.$vux.toast.text('请完整填写录入信息', 'middle')
      }
    },
    // 取消按钮触发事件
    cancel() {
      Object.assign(this.$data, this.$options.data())
      let myDate = new Date()
      this.newTime = myDate.toLocaleString()
    },
    // 软键盘收缩不会回弹问题解决
    inputBlur(e) {
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input') {
        this.timer = setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    },
    inputFocus(e) {
      if (e && e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'input') {
        clearTimeout(this.timer);
      }
    }
  },
  mounted() {
    let myDate = new Date()
    this.newTime = myDate.toLocaleString()
  },
}
</script>

<style scoped >
.bigClass {
  width: 90%;
  height: 0.8rem;
  font-size: 0.28rem;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  padding: 0 0 0 .6rem;
}

.inputBox {
  width: 4.8rem;
  height: 0.6rem;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
  padding-left: 0.3rem;
  font-size: 0.28rem;
}

.buttonCss {
  background: #0085DE;
  color: #FFF;
  width: 2.4rem;
  height: 0.76rem;
  border-radius: 8px;
  border: 0px;
  margin-left: -20px;
  font-size: 0.32rem
}

</style>
