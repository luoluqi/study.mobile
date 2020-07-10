<template>
  <div class="monitor-box">
    <headNav title="明厨亮灶"></headNav>
    <ul class="clearfix" v-if="kitchenMonitorData.length">
      <li v-for="(item, index) in kitchenMonitorData" :key="index" @click="handleVideo(item)">
        <img src="@/assets/img/kitchen/icon-viedeo.png" alt="">
        <p>{{ '摄像头' + (index+1) }}</p>
      </li>
    </ul>
    <p class="no-msg" v-else>暂无数据~</p>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import headNav from '@/components/headNav/headNav'
export default {
  // name: 'kitchenMonitor',
  components: {
    headNav
  },
  data () {
    return {
      kitchenMonitorData: []
    }
  },
  mounted () {
    this.watchKitchenMonitor()
  },
  methods: {
    watchKitchenMonitor () {
      let params = {
        detailId: this.$route.query.detailId,
        kitchenId: this.$route.query.kitchenId,
        schoolId: this.$route.query.schoolId
      }
      this.$store.dispatch('kitchen/WatchKitchenMonitor', params).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.kitchenMonitorData = res.data
        } else {
          this.kitchenMonitorData = []
          // this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    // 跳转路由查看视频
    handleVideo (item) {
      this.$router.push({ name: 'watchMonitor', query: { monitorUrl: item.monitorUrl, deviceSerialnum: item.deviceSerialnum } })
    }
  }
}
</script>
<style scoped>
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.no-msg {
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.6rem;
  background-color: #fff;
  padding: 0.2rem 0;
}
.monitor-box ul {
  background-color: #fff;
  width: 100%;
  padding: 0 0.2rem;
  padding-top: 0.26rem;
  box-sizing: border-box;
}
.monitor-box ul li {
  float: left;
  width: 3.24rem;
  height: 2.98rem;
  margin-right: 0.32rem;
  text-align: center;
}
.monitor-box ul li:nth-child(2n) {
  margin-right: 0;
}
.monitor-box ul li p {
  line-height: 0.68rem;
  font-size: 0.28rem;
}
.monitor-box ul li img {
  width: 100%;
  height: 2.3rem;
}
</style>
