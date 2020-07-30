<template>
  <div class="vip-page">
    
     <headNav title="套餐中心"></headNav>
    <!-- 头部 -->
    <div class="v-top">
			<div class="v-top-c" >
				<h2 v-for="(item,index) in headData" :key="index">{{item.Name}}<span>{{transData(item.ExpirationTime)}}</span>到期</h2>
        <p>(学生卡剩余通话时长{{flowData.minuteSum}}分钟 不限流量)
          <!-- 流量{{flowData.flowSum}}M) -->
        </p>
			</div>
      <div class="vip-name">
        <a class="r-tab">{{realName}}</a>
        <a class="dd-jl" @click="goUrl">套餐记录<i class="vip-sj"></i></a>
      </div>
		</div>
    <!-- 列表 -->
    <div class="vip-wrap">
      <div class="gm" v-for="(item,index) in sectionData" :key="index">
        <h2>{{item.charge.Name}}<a @click="goDetail(item)" v-if="item.charge.OrderType == 1">功能介绍</a></h2>
        <ul :class="{activeUl:index == activeIndexUl}" v-if="item.charge.OrderType == 1">
          <li :class="'0'+(index+1)%4" v-for="(pack,j) in item.packages" :key="j" @click="goBuy(item,index)" > 
            <div class="f-2" @click="chooseItem(pack,j,index)" :class="{activeClass:j == activeIndex}">
              <h3>{{pack.PackageName}}
                <!-- <span>（1个月）</span> -->
              </h3>
              <p>￥{{pack.Amount}}元</p>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li :class="'0'+(index+1)%4" v-for="(pack,j) in item.packages" :key="j" class="fix-width" @click="goBuy(item,index)" > 
            <div class="f-2 f-height" @click="chooseItem(pack,j,index)" :class="{activeClass:j == activeIndex}" style="position:relative;">
                <!-- 内含：<br /> -->
               <p>{{pack.ThePhone}}分钟(限当月使用)</p>
               <p v-show="pack.Traffic!=0">流量{{pack.Traffic}}M</p>
              <label class="item-label">￥{{pack.Money}}元</label>
            </div>
          </li>
        </ul>
        <!-- <a class="g_m g2" @click="goBuy(item,index)" href="javascript:void(0)">充值</a> -->
      </div>
    </div>
    <!-- 支付 -->
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
              <span>套餐内容 </span>
              <p v-if="activeData.Name">{{activeData.Name}} </p>
              <p v-else>{{activeData.PackageName}} </p>
            </li>
						<li>
							<span>学生姓名 </span>
							<p class="b-1">
								<label><input type="radio" name="lgy" checked ><span></span>{{activeData.Studentname}}</label>
							</p>
						</li>
						<li>
              <span style="padding-top:0.05rem;">套餐价格</span>
              <p class="p-1" v-if="activeData.Money">￥{{activeData.Money}}</p>
              <p class="p-1" v-else>￥{{activeData.Amount}}</p>
            </li>
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
    <!-- qrCode -->
    <div class="code-wrap" v-show="qrCode">
      <div class="cover"></div>
      <div id="qrcode" class="qrcode"><img :src="payImg"></div>
      <div class="btn-wrap">
        <button class="pay-btn" @click="getPay">我已支付</button>
        <button class="dis-btn" @click="disPay">取消支付</button>
      </div>
    </div>

     <bottomNav :index="2"></bottomNav>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import {toHanZi,getCookie,getQueryString} from '@/util/tool'
import { clearInterval } from 'timers';
import { isNull } from 'util';
import bottomNav from '@/components/bottomNav/bottomNav';
import headNav from '@/components/headNav/headNav';
import {mappv2Url} from '@/config/config'
export default {
    name: 'Vip',
    components: {
      bottomNav, headNav
    },
    data () {
      return {
        activeIndex: 0,
        activeIndexUl: '',
        isShowPay: false,
        title1: '',
        title2: '',
        title3: '',
        firstData: [],
        secondData: [],
        thirdData: [],
        fourData: [],
        sectionData: [],
        activeData: {},
        qrCode: false,
        chargeId: '',
        type: '',
        orderType: '',
        studentId: '',
        realName: '',
        headData: [],
        flowData: {},
        yIndex: 0,
        xIndex: {x:0,y:0},
        orderId: '',
        payImg: ''
      }
  },
	mounted () {
    var url = location.href
    var urlParams = getQueryString(url)
    var bool = true
    var timer = null
    var payIndex = 0
    if(urlParams == undefined){
      bool = true
    }else if(urlParams&&urlParams.orderId == undefined){
      bool = true
    }else{
      bool = false
    }
    if(bool){
      this.getStudentId()
      this.getChargeAndPackage()
    }else{
      //支付接口轮询
      var self = this
      var payParams = {
        orderId: urlParams.orderId
      }
      self.$vux.loading.show({
        text: '加载中..'
      })
      timer = setInterval(() => {
        payIndex++
        self.$store.dispatch('vip/GetPayStutus',payParams).then(res => {
          var result = JSON.parse(res)
          if (result.Code == '支付成功') {
            self.getStudentId()
            self.getChargeAndPackage()
            self.$vux.loading.hide()
            window.clearInterval(timer)
          }
          if(payIndex==6){
            self.getStudentId()
            self.getChargeAndPackage()
            self.$vux.loading.hide()
            window.clearInterval(timer)
          }
        })
      }, 1000)
    }
  },
	methods: {
    goBack () {
      location.href = 'http://mappv2.xueerqin.net/home/#/index'
    },
    goHome () {
      location.href = 'http://mappv2.xueerqin.net/home/#/index'
    },
		goUrl () {
			this.$router.push("order-list")
    },
    getChargeAndPackage () {
      var  key='package'+getCookie('schoolId')
        var params = {
          type: 1,
          schoolId: getCookie('schoolId')
        }
        this.$vux.loading.show({
          text: '加载中..'
        })
        this.$store.dispatch('menu/GetChargeAndPackage', params).then((res) => {
          this.$vux.loading.hide()
          var result = JSON.parse(res)
          if(result.Code == 200){
            this.sectionData = result.Data
            localStorage.setItem(key,JSON.stringify(this.sectionData))
          }
        })
      
    },
    hidePay () {
      this.isShowPay = false
    },
    goBuy (item,index) {
      console.log(item,index)
      this.yIndex = index
      this.chargeId = item.charge.Id
      this.type =  item.charge.Type
      this.orderType = item.charge.OrderType 
      if(this.xIndex.y == this.yIndex){
        this.activeData = item.packages[this.xIndex.x]
      }else{
        this.activeData = item.packages[0]
      }
      this.activeData.Studentname = localStorage.getItem('childName')
      this.activeData.PaymentType = 1
      if (getCookie('roleCode') == 'Parent') {
        if (localStorage.getItem('itemData') == null) {
          this.activeData.studentId = getCookie('studentId')
        } else {
          var itemData = JSON.parse(localStorage.getItem('itemData'))
          this.activeData.studentId = itemData.SelfId
        }
      }
      if(item.charge.OrderType==2){
        this.activeData.Name = item.charge.Name
      }
      // console.log(this.activeData)
      // console.log(item.charge.OrderType)
      if(item.charge.OrderType ===1){
        this.$router.push({path:'order-item',query:{activeData: JSON.stringify(this.activeData),chargeId:this.chargeId}})
      }else{
        this.isShowPay = true
      }
    },
    chooseItem (item,index,newIndex) {
      this.activeIndex = index
      this.activeData = item
      this.activeIndexUl = newIndex
      this.xIndex = {x:index,y:newIndex}
    },
    payMoney () {
      // console.log(this.activeData)
      var params = {}
      if(this.orderType==2){
          params = {
          // type: this.type,
          type: 1,
          studentId: this.activeData.studentId,
          orderType: this.orderType,
          chargeId: this.chargeId,
          PackageId: this.activeData.PId,
          OperatorId: getCookie('loginUserId')
        }
      }else{
        params = {
          // type: this.type,
          type: 1,
          studentId: this.activeData.studentId,
          orderType: this.orderType,
          chargeId: this.chargeId,
          PackageId: this.activeData.PackageId,
          OperatorId: getCookie('loginUserId')
        }
      }
      var paramsNew = {
        data: JSON.stringify(params)
      }
      this.$vux.loading.show({
        text: '加载中..'
      })
      this.$store.dispatch('menu/AddOrder',paramsNew).then(res => {
        this.$vux.loading.hide()
        var result = JSON.parse(res)
        // console.log(result)
        if(result.Code == 200) {
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
          this.$vux.toast.text(result.Code)
        }
      })
    },
    payWeixinMoney () {
      var params = {}
      if(this.orderType==2){
          params = {
          // type: this.type,
          type: 1,
          studentId: this.activeData.studentId,
          orderType: this.orderType,
          chargeId: this.chargeId,
          PackageId: this.activeData.PId,
          OperatorId: getCookie('loginUserId'),
          payType: 2,
          // openId: 'oTpYmw2L_pi_bvtWTuvhkIKe1dn8',
          openId: getCookie('OpenId')
        }
      }else{
        params = {
          // type: this.type,
          type: 1,
          studentId: this.activeData.studentId,
          orderType: this.orderType,
          chargeId: this.chargeId,
          PackageId: this.activeData.PackageId,
          OperatorId: getCookie('loginUserId'),
          payType: 2,
          // openId: 'oTpYmw2L_pi_bvtWTuvhkIKe1dn8',
          openId: getCookie('OpenId')
        }
      }
      var paramsNew = {
        data: params
      }
      localStorage.setItem('payItem',JSON.stringify(paramsNew))
      localStorage.setItem('pageFrom','index')
      location.href = 'http://m.xueerqin.net/study/static/html/pay.html'
      // location.href = '../../../../../static/html/pay.html'
    },
    getOrderMaturityTime (studentId) {
      var params = {
        StudentId: studentId
      }
      this.$store.dispatch('menu/GetOrderMaturityTime', params).then(res => {
        var result = JSON.parse(res)
        // console.log(result)
        if (result.Code == 200) {
          this.headData = result.Data
        }      
      })
    },
    getResidualFlowAndResidualMinute (studentId) {
      var params = {
        studentId: studentId
      }
      this.$store.dispatch('vip/GetResidualFlowAndResidualMinute', params).then(res => {
        var result = JSON.parse(res)
        if (result.Code == 200) {
          this.flowData = result.Data
        }      
      })
    },
    getStudentId () {
      if (getCookie('roleCode') == 'Parent') {
        if (localStorage.getItem('itemData') == null) {
          this.studentId = getCookie('studentId')
        } else {
          var itemData = JSON.parse(localStorage.getItem('itemData'))
          this.studentId = itemData.SelfId
        }
        this.realName = localStorage.getItem('childName')
        this.getOrderMaturityTime(this.studentId)
        this.getResidualFlowAndResidualMinute(this.studentId)
      }
    },
    transData (dateStr) {
      var data = new Date(dateStr)
      var year = data.getFullYear()
      var month = data.getMonth()+1
      if(month<10){
        month = '0'+month
      }
      var day = data.getDate()
      return year + '年' + month + '月' + day + '日'
    },
    goDetail (item) {
      this.$router.push({path: 'order-detail', query: {id:item.charge.Id}})
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
    }
	}
}
</script>
<style scoped>


    @import url('./css/public.css');
    @import url('./css/vip.css');
    .vip-wrap{
      top: -0.9rem;
      position: relative;

    }
    .vip-sj{
      width: 0.15rem;
      height: 0.2rem;
      background: url('./img/sj.png') no-repeat 0 0;
      display: inline-block;
      background-size: cover;
      margin-left: 3px;
    }
    .vip-name{
      position: relative;
      border-bottom: 1px solid #4eaaeb;
      overflow: hidden;
      margin: 0 0.2rem;
      height: 0.8rem;
      line-height: 0.8rem;
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

    .vip-page{
      padding-bottom: 1.1rem;
      
    }
    .vip-page .header{
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
      z-index: 999;
    }
    .vip-page .header-left{
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: inline-block;
      background: url('./img/head-left.png') no-repeat 0 0;
      top: 0.2rem;
      left:0.2rem;
      background-size: cover;
    }
    .vip-page .header-right{
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: inline-block;
      background: url('./img/head-right.png') no-repeat 0 0;
      top: 0.2rem;
      right: 0.2rem;
      background-size: cover;
    }
    .gm li:nth-child(1) div{
      width:2rem;
      height:1.26rem;
      /* background:url('./img/f-2.png') no-repeat !important; */
      background-size: cover!important;
      display:inline-block;
    }
    .gm .activeUl li > div{
      width:2rem;
      height:1.26rem;
      /* background:url('./img/f-4.png') no-repeat !important; */
      background-size: cover!important;
      display:inline-block;
    }
    .gm .activeUl .activeClass{
      width:2rem;
      height:1.26rem;
      /* background:url('./img/f-2.png') no-repeat !important; */
      background-size: cover!important;
      display:inline-block;
    }
    
    .gm li:nth-child(1) div.f-height{
      width: 3.02rem!important;
      height: 1.42rem!important;
      /* background:url('./img/f-2.png') no-repeat !important; */
      background-size: 3.02rem 1.42rem!important;
      display: inline-block;
    }

    .gm .activeUl li > div.f-height{
      width: 3.02rem!important;
      height: 1.42rem!important;
      background:url('./img/f-2.png') no-repeat !important;
      background-size: 3.02rem 1.42rem!important;
      display: inline-block;
    }

    .gm .activeUl .f-height.activeClass{
      width: 3.02rem!important;
      height: 1.42rem!important;
      background:url('./img/f-2.png') no-repeat !important;
      background-size: 3.02rem 1.42rem!important;
      display: inline-block;
    }

    .f-height p {
      font-size: 0.24rem!important;
      color: #666!important;
      text-align: left!important;
      padding-left: 0.25rem!important;
      padding-top: 0.1rem!important;
      line-height: 0.24rem!important;
    }
    .f-height label {
      font-size: 0.36rem !important;
      color: #0a8de5!important;
      /* float: right!important; */
      margin: 0 0.2rem 0.2rem 0!important;
    }
    .fix-width{
      width: 50% !important;
    }
    .gm{
      height: 2.7rem!important;
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
    .item-label{
      position: absolute;
      left: 0.2rem;
      bottom: 0;
    }
</style>