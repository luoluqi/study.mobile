<template>
  <div class="order-item">
    
    <headNav title="功能介绍"></headNav>
    <div class="order-body">
      <h3>
        <em>360元/年 </em> 
        <span>中国移动智慧校园套餐</span>
      </h3>
      <p>（全国亲情网畅快互打）</p>
      <p><i>内含300分钟/月语音通话时长，无限流量</i></p>
    </div>
    <div class="order-content">
      <div class="order-menu">
        <ul>
          <li :class="{active:index==activeIndex}" v-for="(item,index) in menus" :key="index" @click="activeItem(index)">{{item}}</li>
        </ul>
      </div>
      <div class="content-wrap" v-if="activeIndex == 0">
        <div class="content-item">
          <p><span>语音</span><em>300分钟/月</em></p>
          <p><i>超出套餐后，暂停语音服务，可单独购买语音包充值</i></p>
        </div>
        <div class="content-item">
          <p><span>流量</span><em>不限</em></p>
          <p><i>套餐内不限流量 </i></p>
        </div>
        <div class="content-item">
          <p><span>功能服务</span></p>
          <div class="section-item">
            <p>1、家校互联服务</p>
            <p>内含通知公告、家庭作业、学生请假、课程表、成绩查询、综合评价等功能。</p>
          </div>
          <div class="section-item">
            <p>2、亲情呵护服务</p>
            <p>内含校园考勤、实时定位、路径追踪、电子围栏、语音监听、SOS、明厨亮灶等功能。</p>
          </div>
          <div class="section-item">
            <p>3、智慧学习服务</p>
            <p>内含错题本、强化练习、课堂录播、课堂练习等功能。</p>
          </div>
        </div>
      </div>
      <div class="content-wrap" v-else>
        <div class="section-item new-detail">
          <p>1.套餐费360元/年，内含无限量国内移动数据流量，国内拨打国内亲情电话300分钟/月。</p>
          <p>2.超出套餐语音时间限制后，需要单独购买语音包方可继续使用通话功能。</p>
          <p>3.套餐费一次性收取，当日生效，内含业务一次性提供。</p>
          <p>4.本套餐自生效当日起有效期一年，我公司将在有效期满前两个月通知提醒。</p>
          <p>5.以上国内不含港澳台地区。</p>
          <p>6.套餐内包含业务服务</p>
          <p>1)家校互联服务</p>
          <p>内含通知公告、家庭作业、学生请假、课程表、成绩查询、综合评价等功能。</p>
          <p>2)亲情呵护服务</p>
          <p>内含校园考勤、实时定位、路径追踪、电子围栏、语音监听、SOS、明厨亮灶等功能。</p>
          <p>3)智慧学习服务</p>
          <p>内含错题本、强化练习、课堂录播、课堂练习等功能。</p>
        </div>
      </div>
    </div>
    <div class="item-buy" @click="goBuy">立即充值</div>
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
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import {toHanZi,getCookie,getQueryString} from '@/util/tool'
import {mappv2Url} from '@/config/config'
import headNav from '@/components/headNav/headNav';
export default {
    name: 'orderList',
    components: {
      headNav
    },
    data () {
      return {
        menus: ['内含', '套餐详情'],
        activeIndex: 0,
        isShowPay: false,
        activeData: {},
        orderType: 1,
        chargeId: ''
      }
    },
    created () {
      this.activeData = JSON.parse(this.$route.query.activeData)
      this.chargeId = this.$route.query.chargeId
      // console.log(this.chargeId)
      // console.log(this.activeData)
    },
    methods: {
      activeItem (index) {
        this.activeIndex = index
      },
      goBack () {
        this.$router.push('/vip')
      },
      goHome () {
        location.href = 'http://mappv2.xueerqin.net/home/#/index'
      },
      hidePay () {
        this.isShowPay = false
      },
      goBuy () {
        this.isShowPay = true
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
      }
    }
}
</script>
<style scoped>

  @import url('./css/public.css');
  @import url('./css/vip.css');
  .order-item{
   
    padding-bottom: 3.1rem; 
  }
  .order-item .header{
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
  .order-item .header-left{
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    display: inline-block;
    background: url('./img/head-left.png') no-repeat 0 0;
    top: 0.2rem;
    left:0.2rem;
    background-size: cover;
  }
  .order-item .header-right{
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    display: inline-block;
    background: url('./img/head-right.png') no-repeat 0 0;
    top: 0.2rem;
    right: 0.2rem;
    background-size: cover;
  }
  .order-item .order-body{
    background: #fff;
    padding: 0.3rem 0.2rem;
    margin-bottom: 0.2rem;
  }
  .order-item .order-body p{
    line-height: 0.4rem;
  }
  .order-item .order-body h3{
    font-size: 0.32rem;
    margin-bottom: 0.05rem;
  }
  .order-item .order-body h3 em{
    float: right;
    font-size: 0.33rem;
    color: #0a8de5;
  }
  .order-item .order-body p i{
    color: #888888;
    font-size: 0.24rem;
    margin-top: 0.1rem;
    display:inline-block;
  }
  .order-item .order-content{
    background: #fff;
    margin-bottom: 0.2rem;
  }
  .order-item .order-menu ul li{
    display: inline-block;
    height: 0.86rem;
    line-height: 0.86rem;
    padding: 0 0.3rem;
  }
  .order-item .order-menu ul{
    margin-left: 0.2rem;
  }
  .order-item .order-menu li{
    font-size: 0.3rem;
  }
  .order-item .order-menu li.active{
    color: #0a8de5;
    border-bottom: 2px solid #0a8de5;
  }
  .order-item .order-menu{
    border-bottom: 1px solid #ccc;
  }
  .order-item .item-buy{
    height: 0.86rem;
    width: 6.12rem;
    background: #0a8de5;
    text-align: center;
    line-height: 0.86rem;
    margin-top: 0.2rem;
    color: #fff;
    border-radius: 4px;
    margin: 0 auto;
    font-size: 0.36rem;
  }
  .order-item .content-item{
    padding: 0.26rem 0.38rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .order-item .content-item span{
    font-size: 0.28rem;
  }
  .order-item .content-item i{
    font-size: 0.24rem;
    color: #888;
    margin-top: 0.15rem;
    display:inline-block;
  }
  .order-item .content-item em{
    font-size: 0.28rem;
    color: #000;
    margin-left: 0.2rem;
  }
  .order-item .section-item {
    font-size: 0.24rem;
    margin-top: 0.36rem;
    margin-bottom: 0.24rem; 
    line-height: 0.35rem;
  }
  .order-item .section-item p{
    line-height: 0.4rem;
  }
  .new-detail{
    padding: 0 0.3rem 0.3rem;
    line-height: 0.45rem;
  }
</style>
