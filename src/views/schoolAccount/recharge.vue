<template>
  <div class="container">
    <headNav title="充值"></headNav>
    <div class="recharge_body">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1 / 3"
          v-for="(item,index) in list" :key="index"><div class="flex-item" :class="{'checked':currentIndex==index}" @click="clickItem(item,index)">{{item.label}}</div></flexbox-item
        >
      </flexbox>
      <div class="search">
        <span>自定义金额(元)</span>
        <x-input  :is-type="checkNum" :show-clear="false" v-model="customAmount"  @on-focus="focus"></x-input>
      </div>
      <div class="order_recharge">
        <x-button type="primary"  mini @click.native="recharge">充值</x-button>
      </div>
    </div>
    <bottomNav></bottomNav>
  </div>
</template>
<script>
import headNav from "@/components/headNav/headNav";
import { schoolAccount } from '@/config/config'
import { Flexbox, FlexboxItem, Divider, XInput, XButton, ToastPlugin } from "vux";
import cookie from '@/util/cookie'
import bottomNav from "@/components/bottomNav/bottomNav";
export default {
  components: {
    headNav,
    Flexbox,
    FlexboxItem,
    Divider,
    XInput,
    XButton,
    bottomNav
  },
  data() {
    return {
      list: [
        { val: 0.01, label: "充值0.01元" },
        { val: 50, label: "充值50元" },
        { val: 100, label: "充值100元" },
        { val: 200, label: "充值200元" },
        { val: 500, label: "充值500元" },
        { val: 1000, label: "充值1000元" }
      ],
      currentIndex:NaN,
      customAmount:'',
      isDisablad:true,
      money:0,
    };
  },
  methods:{
    // 清除自定义金额
    clearAmount(){
      // alert('123')
      this.customAmount = ''
      this.money = 0
    },
    // 推荐金额选中
    clickItem(item,index){
      if(this.currentIndex === index){
        this.currentIndex = NaN
        this.isDisablad = true
      }else{
        this.currentIndex = index
        this.isDisablad = false
      }      
    },
    focus(){
      this.currentIndex = NaN
      // this.isDisablad = true
    },
    // 提交
    recharge(){
      if(this.currentIndex === this.currentIndex){
        this.money = this.list[this.currentIndex].val
      }else{
        
        // 判断是否选中推荐充值金额
        if(this.customAmount === ''){
          this.$vux.toast.text('请选择充值金额', 'top')
          return
        }
        
        // var reg = /(^[1-9]\d*$)/;     
        // if (!(reg.test(this.customAmount))) {
        //     // alert("数量不是正整数!!!");
        //     this.$vux.toast.text('请输入整数金额', 'top')
        //     return ;
        // }

        if(this.customAmount > 20000){
          this.$vux.toast.text('请输入小于20000的金额', 'top')
          return
        }
        this.money = this.customAmount
      }
      
      this.studentRecharge()
    },
    // 充值 
    studentRecharge(){
      // console.log(cookie.get('studentId'))
      // this.money = parseInt(this.money)*100
      this.money = this.money*100
      let params ={
        openId: cookie.get('OpenId'),
        rechargeAmount: this.money,
        studentId: cookie.get('studentId'),
        payUrl: schoolAccount+'/api/studentRecharge',
      }

      // var payUrl=schoolAccount+'/api/studentRecharge'
      var localUrl =location.href
      // console.log(this.urlEncode(params))
      // this.setCookie('payUrl', payUrl)
      this.setCookie('localUrl', localUrl)
      let urlparams = this.urlEncode(params)
      // this.setCookie('payObj',JSON.stringify(params))
      location.href =  'http://mappv2.xueerqin.net'+'/home/' + 'static/html/pay.html?'+urlparams
     
    },
    urlEncode (param) {  
      let dataStr = ''
      // 数据拼接 username='a' & pwd=123
      Object.keys(param).forEach(key => {
          dataStr += key + '=' + param[key] +'&'
      })
      return dataStr;  
    },
    // 数字校验
    checkNum(value){
      if(value == ''){
        this.isDisablad = true
        return  {valid: true}
      }
      this.isDisablad = false
      return  {valid: true}
    },
    setCookie (name, value, expiresHours) {
        var dateTime = new Date()
        var msTime = 240 * 3600 * 1000
        dateTime.setTime(dateTime.getTime() + msTime)
        var cookieString = name + "=" + value + ";domain=" + "xueerqin.net" + ";path=" + '/'
        if (expiresHours > 0) {
            var date = new Date()
            var ms = expiresHours * 3600 * 1000
            date.setTime(date.getTime() + ms)
            cookieString = cookieString + ";expires=" + date.toGMTString() + ";domain=" + "xueerqin.net"
        }
        document.cookie = cookieString
    }
  }
};
</script>
<style scoped>
.recharge_body {
  padding: 0.5rem 0.5rem;
}
.flex-item {
  text-align: center;
  line-height: 0.8rem;
  border-radius: 0.1rem;
  border: 0.02rem solid #00ccff ;
  background-color: #fff;
  background-clip: padding-box;
  height: 0.8rem;
  margin: 0.2rem 0.2rem;
}
.search {
  display: flex;
  align-items: center;
  padding-left: 0.3rem;
  margin-top: 0.3rem;
}
.weui-cell {
  border: 0.01rem solid rgb(153, 153, 153);
  /* border-radius: 0.1rem; */
  margin-left: 0.3rem;
  background: #fff;
  height: 0.2rem;
  width: 3rem;
}
.order_recharge {
  text-align: center;
  margin-top: 0.55rem;
}
.checked{
  margin: 0.17rem 0.2rem;
  border: 0.05rem solid #3385ff;
}
/deep/ .weui-btn_primary {
  background-color: #3385ff;
  width: 3rem;
}
</style>
