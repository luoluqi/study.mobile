<template>
  <div class="container">
    
    <div class="help-con">
      <headNav title="账户明细"></headNav>
      <div class="tab">
        <div class="payInfo" :class="{'checked':step==0}" @click="tabChange(0)">支付明细</div>
        <div class="payInfo" :class="{'checked':step==1}" @click="tabChange(1)">充值明细</div>
      </div>
        <!-- 支付明细 -->
        <div v-show="step == 0" class="order_detail">
          <scroller lock-x v-if="step == 0" :scrollbar-x="false" scrollbar-y ref="scrollerBottom" @on-scroll-bottom="loadMore" height="-180">   
            <div>
              <div v-for="item in payList" :key="item.index" class="order_detail_body">
                  <div class="order_detail_name">
                    <div class="order_detail_icon">
                      <div class="order_detail_bg"></div>
                      <span>{{item.businessName}}</span>
                    </div>
                    <div><span>-{{ item.orderAmount/100 }}元</span></div>
                  </div>
                  <div class="order_detail_item">
                    支付时间:<span>{{ item.payTime }}</span>
                  </div>
                  <div class="order_detail_item">
                    订单编号:<span>{{ item.orderCode }}</span>
                  </div>
                  <div class="order_detail_item">
                    商户号:<span>{{ item.businessCode }}</span>
                  </div>
              </div>
                <div class="load-p" v-show="step == 0">
                  <load-more v-if="isMore" :tip="'正在加载'"></load-more>
                    <load-more
                      v-else
                      :show-loading="false"
                      :tip="'没有更多了'"
                      background-color="#fbf9fe"
                    ></load-more>
              </div>
            </div> 
          </scroller>
        </div>
        <!-- 充值明细 -->
        <div v-show="step == 1" class="order_detail">
          <scroller lock-x v-if="step == 1" :scrollbar-x="false" scrollbar-y ref="reScrollerBottom" @on-scroll-bottom="rechargeloadMore" height="-160">
            <div>
              <div v-for="charge in chargeList" :key="charge.index" class="order_detail_body">
                <div class="order_detail_name">
                  <div class="order_detail_icon">
                    <div class="order_detail_rebg"></div>
                    <span>充值</span>
                  </div>
                  <div><span style="color:red">+{{ charge.orderAmount/100 }}元</span></div>
                </div>
                  <div class="order_detail_item">
                    充值时间:<span>{{ charge.payTime }}</span>
                  </div>
                  <div class="order_detail_item">
                    充值编号:<span>{{ charge.orderCode }}</span>
                  </div>
              </div>
              <div class="load-p" v-show="step===1">
                <load-more v-if="rechargeIsMore" :tip="'正在加载'"></load-more>
                <load-more
                  v-else
                  :show-loading="false"
                  :tip="'没有更多了'"
                  background-color="#fbf9fe"
                ></load-more>
            </div>
           </div>
          </scroller>
        </div>
      </div>
        <bottomNav></bottomNav>
    </div>
</template>
<script>
import { ButtonTab, ButtonTabItem, Divider, LoadMore, Tab, TabItem, Scroller } from "vux";
import headNav from "@/components/headNav/headNav";
import infiniteScroll from "@/components/infiniteScroll";
import bottomNav from "@/components/bottomNav/bottomNav";
import cookie from '@/util/cookie'
export default {
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider,
    LoadMore,
    headNav,
    infiniteScroll,
    bottomNav,
    Tab,
    TabItem,
    Scroller
  },
  data() {
    return {
      isMore: true,
      step: 0,
      payList: [],
      pageIndex: 0,
      pageSize: 5,
      chargeList: [],
      chargeIndex: 0,
      chargeSize: 6,
      rechargeIsMore:true,
      isLoad:true,
      isRechargeLoad:true
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    loadMore() {
      if(this.isLoad){
      this.isLoad = false
      this.getList();
      }
    },
    rechargeloadMore() {
       if(this.isRechargeLoad){
          this.isRechargeLoad=false;
          this.getRecharge();
      }
    },
    getList() {
      if (!this.isMore) {
        return;
      }
      this.pageIndex++;
      let studentId = cookie.get("studentId");
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        studentId: studentId
      };
      this.$store
        .dispatch("schoolAccount/PageUserConsumeOrders", params)
        .then(res => {
          if (res.status == 200) {
            if (this.pageSize > res.data.records.length) {
              this.isMore = false;
            }else{
               this.isMore = true;
            }
            
            this.payList = this.payList.concat(res.data.records);
            this.$nextTick(() =>{
              this.isLoad = true
              this.$refs.scrollerBottom.reset()
            })
          } else {
            this.isMore = false;
          }
        });
    },
    getRecharge() {
      if (!this.rechargeIsMore) {
        return;
      }
      this.chargeIndex++;
      let studentId = cookie.get("studentId");
      let params = {
        page: this.chargeIndex,
        limit: this.chargeSize,
        studentId: studentId
      };
      this.$store
        .dispatch("schoolAccount/PageUserRechargeOrders", params)
        .then(res => {
         
          if (res.status == 200) {
            if (res.data.records.length < this.chargeSize) {
              this.rechargeIsMore = false;
            }else{
               this.rechargeIsMore = true;
            }
            this.chargeList = this.chargeList.concat(res.data.records);
             this.$nextTick(() =>{
               this.isRechargeLoad = true;
              this.$refs.reScrollerBottom.reset()
            })
          } else {
            this.rechargeIsMore = false;
          }
        });
    },
    tabChange(index) {
      this.step = index;
      if (index == 1) {
        this.rechargeIsMore = true;
        this.getRecharge();
      }else{
        this.isMore = true;
        this.getList();
      }
    }
  }
};
</script>
<style scoped>
.container{
  width:100%;
  height: 100%;
}
.order_detail {
  padding: 0.3rem;
}
.order_detail_body{
  border-radius: 0.2rem;
  background:#fff;
  margin-bottom:0.1rem;
  padding:0.3rem;
}
.order_detail_name{
  display:flex;
  justify-content: space-between;
  font-size: 0.24rem;
  margin-bottom: 0.2rem;
}
.order_detail_icon{
  display:flex;
  align-items: center;

}
.order_detail_bg{
  width: 0.6rem;
  height: 0.6rem;
  background-image: url(../../assets/img/icon_pay.png);
  background-repeat: no-repeat;
  background-size: 0.6rem 0.6rem;
}
.order_detail_rebg{
  width: 0.6rem;
  height: 0.6rem;
  background-image: url(../../assets/img/icon_recharge.png);
  background-repeat: no-repeat;
  background-size: 0.6rem 0.6rem;
}
.order_detail_item {
  line-height: 0.5rem;
  color: rgb(153, 153, 153);
}
span {
  margin-left: 0.15rem;
}
.tab{
  display:flex;
  align-items:center;
  justify-content: center;
  height: 0.8rem;
  width:100%;
  background:#fff;
}
.payInfo{
  width:50%;
  height: 100%;
  line-height:0.8rem;
  text-align: center;
}
.checked{
  color:#3385ff;
  border-bottom: 0.03rem solid #3385ff;
}
</style>
