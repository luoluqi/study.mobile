<template>
  <div class="order-list">
    
    <headNav title="功能介绍"></headNav>
   
    <div class="orderList">
			<ul>
        <li v-if="orderData.length==0">暂无数据</li>
				<li v-for="(item,index) in orderData" :key="index" v-else>
					<ul class="detail">
						<li>
							<span class="hao">订&nbsp;&nbsp;单&nbsp;&nbsp;号：</span><span>{{item.Id}}</span>
							<label :class="{'dai':item.Static == 2,'bai':item.Static == 0}">{{getStatic(item.Static)}}</label>
						</li>
						<li>
              <span class="hao">套餐内容：</span>
              <p v-if="item.OrderType==1">{{item.PackageName}} </p>
              <p v-else>{{item.ChargeName}} </p>
            </li>
            <li>
              <span class="hao">套餐名称：</span>
              <p>{{item.ChargeName}} </p>
            </li>
						<li><span class="hao">订单时间：</span><span>{{item.CreateTime.replace('T' ,' ')}}</span><label>¥{{item.OrderMoney}}</label></li>
						<li v-if="item.Static == 2"><div class="jixu" @click="showPay(item)">继续支付</div></li>
					</ul>
				</li>
			</ul>
		</div>
		<div style="height: 1.1rem;"></div>
		<div class="zhifu_box" v-show="isShowPay">
			<div class="tan_black"></div>
			<div class="zhifu">
				<h2>
					<span class="xueerqin">骆米</span>
					<span class="quxiao" @click="hidePay">取消</span>
				</h2>
				<div class="bottom_zhi">
					<ul>
						<li>
              <span>购买内容 </span>
              <p v-if="activeData.OrderType==1">{{activeData.PackageName}} </p>
              <p v-else>{{activeData.ChargeName}} </p>
            </li>
						<li>
							<span>学生姓名 </span>
							<p class="b-1">
								<label><input type="radio" name="lgy" checked ><span></span>{{activeData.Studentname}}</label>
							</p>
						</li>
						<li><span style="padding-top:0.05rem;">购买价格</span><p class="p-1">￥{{activeData.OrderMoney}}</p></li>
						<li>
							<span>支付方式</span>
							<p class="b-2">
								<!-- <label><input type="radio" name="fs" v-model="activeData.PaymentType" value="2"><span></span><i class="zfb">支付宝支付</i></label> -->
								<label><input type="radio" name="fs" v-model="activeData.PaymentType" value="1"><span></span><i class="wx">微信支付</i></label>
							</p>
						</li>
						<li><a class="zf" @click="payWeixinMoney">支付</a></li>
					</ul>
				</div>
			</div>
		</div>
    <div class="code-wrap" v-show="qrCode">
      <div class="cover" @click="qrCode = false"></div>
      <div id="qrcode" class="qrcode"><img :src="payImg"></div>
      <div class="btn-wrap">
        <button class="pay-btn" @click="getPay">我已支付</button>
        <button class="dis-btn" @click="disPay">取消支付</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import {getCookie,getQueryString,setCookie} from '@/util/tool'
import {mappv2Url} from '@/config/config'
import headNav from '@/components/headNav/headNav';
export default {
    name: 'orderList',
    components: {
      headNav
    },
    data () {
      return {
        isShowPay: false,
        orderData: [],
        activeData: [],
        studentId: '',
        qrCode: false,
        orderId: '',
        payImg: ''
      }
    },
    created () {
      this.getOrder()
    },
    methods: {
      goBack () {
        this.$router.push('/vip')
      },
      goHome () {
        location.href = 'http://mappv2.xueerqin.net/home/#/index'
      },
      getOrder () {
        if (getCookie('roleCode') == 'Parent') {
          var url = location.href
          var urlParams = getQueryString(url)
          var bool = true
          if(urlParams == undefined){
            bool = true
          }else if(urlParams&&urlParams.studentId == undefined){
            bool = true
          }else{
            bool = false
          }
          if(bool){
            if (localStorage.getItem('itemData') == null) {
              this.studentId = getCookie('studentId')
              this.realName =decodeURI(getCookie('realName'))    
              // console.log(this.realName)
            } else {
              var itemData = JSON.parse(localStorage.getItem('itemData'))
              this.studentId = itemData.SelfId
              this.realName = itemData.RealName
            }
          }else{
            this.studentId = urlParams.studentId
            setCookie('studentId',urlParams.studentId,0)
          }
        } else {
          location.href = 'http://mappv2.xueerqin.net/Common/Choose.shtml'
        }
        var paramsNew = {
				  StudentId: this.studentId
        }
        this.$vux.loading.show({
          text: '加载中..'
        })       
        this.$store.dispatch('vip/GetOrderList', paramsNew).then(res => {
          this.$vux.loading.hide()
          var result = JSON.parse(res)
          // console.log(result)
          if(result.Code == 200){
            var data = result.Data
            this.orderData = data
            // console.log(this.orderData)
          }
        })
      },
      getStatic (val) {
        if (val === 1) {
          return '已经支付'
        }
        if (val === 2) {
          return '待支付'
        }
        if (val === 3) {
          return '支付失败'
        }
        if (val === 4) {
          return '订单异常'
        }
      },
      showPay (item) {
        // console.log(item)
        this.isShowPay = true
        this.activeData = item
        this.activeData.PaymentType = "1"
      },
      hidePay () {
        this.isShowPay = false
      },
      payMoney () {
        var params = {
          type: this.activeData.Type,
          studentId: this.activeData.StudentId,
          orderType: this.activeData.OrderType,
          chargeId: this.activeData.ChargeId,
          PackageId: this.activeData.PackageId,
          OperatorId: this.activeData.OperatorId
        }
        var paramsNew = {
          data: JSON.stringify(params)
        }
        // console.log(paramsNew)
        this.$vux.loading.show({
          text: '加载中..'
        })
        this.$store.dispatch('menu/AddOrder',paramsNew).then(res => {
          this.$vux.loading.hide()
          var result = JSON.parse(res)
          if(result.Code == 200) {
            // console.log(result)
            this.hidePay()
            this.payImg = result.Data.payImage

            // var sign = result.Data.payUrl.Data.data.sign
            // var qrUrl = result.Data.payUrl.Data.data.url
            // document.getElementById("qrcode").innerHTML = "";
            // var qrcode = new QRCode(document.getElementById("qrcode"), {
            //   width : 200,
            //   height : 200
            // }); 
            // qrcode.makeCode(qrUrl);

            this.qrCode = true
            this.orderId = result.Data.orderId
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: result.Code 
            })
          }
        })
      },
      disPay () {
        this.qrCode = false
      },
      getPay () {
        //支付接口轮询
        var self = this
        var payParams = {
          orderId: this.orderId
        }
        self.$store.dispatch('vip/GetPayStutus',payParams).then(res => {
          var result = JSON.parse(res)
          if (result.Code == '支付成功') {
            self.qrCode = false
            self.getStudentId()
          } else {
            this.$vux.toast.text(result.Code)
          }
        })
      },
      payWeixinMoney () {
        var params = {
          orderId: this.activeData.Id,
          payType: 2,
          // openId: 'oTpYmw2L_pi_bvtWTuvhkIKe1dn8'
          openId: getCookie('OpenId')
        }
        var paramsNew = {
          data: params
        }
        localStorage.setItem('payItemList',JSON.stringify(paramsNew))
        localStorage.setItem('pageFrom','orderList')
        location.href = 'http://m.xueerqin.net/study/static/html/pay.html'
        // location.href = '../../../../../static/html/pay.html'
      }
    }
}
</script>
<style scoped>
    @import url('./css/public.css');
    @import url('./css/vip.css');
    .order-list{
    
      padding-bottom: 3.1rem; 
    }
    .order-list .header{
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.3rem;
      color: #fff;
      background: #0a8de5;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }
    .order-list .header-left{
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: inline-block;
      background: url('./img/head-left.png') no-repeat 0 0;
      top: 0.2rem;
      left:0.2rem;
      background-size: cover;
    }
    .order-list .header-right{
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: inline-block;
      background: url('./img/head-right.png') no-repeat 0 0;
      top: 0.2rem;
      right: 0.2rem;
      background-size: cover;
    }
    .qrcode{
      width:146px; 
      height:146px; 
      position:absolute;
      left:50%;
      top:50%;
      margin-left:-73px;
      margin-top:-70px;
      z-index: 666;
    }
    .cover{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.7;
      z-index: 55;
    }
    .btn-wrap{
      width:200px; 
      height:200px; 
      position:absolute;
      left:50%;
      top:50%;
      margin-left:-100px;
      margin-top:100px;
      z-index: 666;
      text-align: center;
    }
    .btn-wrap button{
      height: 35px;
      width: 80px;
      border-radius: 4px;
      line-height: 35px;
      border:none;
      font-size: 14px;
      margin: 0 5px;
      /* background: #1895e9;
      border-radius:4px;
      border:none;
      color:#fff; */
    }
</style>
