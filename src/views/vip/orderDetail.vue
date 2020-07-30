<template>
  <div class="order-detail">
    
    <headNav title="功能介绍"></headNav>
    <div class="orderList">
      <ul>
         <li>{{orderDetail}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
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
        orderDetail: ''
      }
    },
    created () {
      var params = {
        Id: this.$route.query.id
      }
      this.$store.dispatch('vip/GetChaegeMessage',params).then(res => {
        var result = JSON.parse(res)
        if(result.Code){
          this.orderDetail = result.Code
        }
      })
    },
    methods: {
      goBack () {
        this.$router.push('/vip')
      },
      goHome () {
        location.href = 'http://mappv2.xueerqin.net/home/#/index'
      },
    }
}
</script>
<style scoped>


    @import url('./css/public.css');
    @import url('./css/vip.css');
    .order-detail{
      font-size: 15px;
    }
    .order-detail{
     
      padding-bottom: 3.1rem; 
    }
    .order-detail .header{
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
    .order-detail .header-left{
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: inline-block;
      background: url('./img/head-left.png') no-repeat 0 0;
      top: 0.2rem;
      left:0.2rem;
      background-size: cover;
    }
    .order-detail .header-right{
      position: absolute;
      width: 0.4rem;
      height: 0.4rem;
      display: inline-block;
      background: url('./img/head-right.png') no-repeat 0 0;
      top: 0.2rem;
      right: 0.2rem;
      background-size: cover;
    }
</style>
