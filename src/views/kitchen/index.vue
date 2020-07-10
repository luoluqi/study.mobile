<template>
  <div>
    <headNav title="明厨亮灶"></headNav>
    <div class="week-day">
      <h3>本周食谱<img src="@/assets/img/kitchen/icon-1.png" alt=""></h3>
      <tab :line-width="5" active-color="#409EFF">
        <!-- v-if="weekData.length" -->
        <tab-item v-for="(item, index) in weekData" :key="index" :selected="item.weekId == todayTime" @on-item-click="handlerTab(item)">
          {{ item.calendarName }}
        </tab-item>
      </tab>
      <div class="week-ul">
        <div style="height: 2rem; font-size: 0.28rem" v-if="!weekCookList.length">暂无数据~</div>
        <scroller lock-y ref="scroller" :scrollbar-x=false>
          <div class="scroller-div" :style="{width: scrollerWidth + 'rem'}" ref="scrollerBox">
            <div class="item" v-for="(item, index) in weekCookList" :key="index">
              <div class="img-box">
                <img :src="item.foodsImgUrl" alt="">
              </div>
              <p>{{ item.foodsName}}</p>
            </div>
          </div>
        </scroller>
      </div>
    </div>
    <div class="week-day mt-20" v-show="todayCookList.length" v-if='!isSchoolAdmin'>
      <h3>今日菜品实拍<img src="@/assets/img/kitchen/icon-2.png" alt=""></h3>
      <div class="week-ul">
        <div>
          <previewImgDiv :list="todayCookList"></previewImgDiv>
        </div>
      </div>
    </div>
    <div class="week-day mt-20" v-else>
      <div class="media-box">
        <h3>今日菜品实拍<img src="@/assets/img/kitchen/icon-2.png" alt=""></h3>
        <img @click="handleUpload" src="../../assets/img/kitchen/kitchen-pic.png" alt="" v-if="todayCookList.length < 9">
        <media style="display:none;" ref='media' :showVoice='false' :showVideo="false" :showLink="false" @chooseImageSuccess='chooseImageSuccess'></media>
      </div>
      <div class="week-ul">
        <div v-if="todayCookList.length">
          <previewImgDiv :list="todayCookList"></previewImgDiv>
        </div>
        <div class="nopic-box" v-else>
          <p>暂无今日实拍照片</p>
          <p>点击右上角拍照或者上传相机照片</p>
        </div>
      </div>
    </div>
    <div class="week-day mt-20">
      <h3>厨房监控<img src="@/assets/img/kitchen/icon-3.png" alt=""></h3>
      <div class="week-ul">
        <ul class="clearfix">
          <li v-for="(item, index) in monitorList" :key="index" @click="handleRouter(item)">
            <img :src="item.kitchenImgUrl" alt="">
            <p>{{ item.kitchenName }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, Toast, Scroller } from 'vux'
import { mapState, mapGetters } from 'vuex'
import media from '@/components/media'
import headNav from '@/components/headNav/headNav'
import previewImgDiv from '@/components/preview'
export default {
  // name: 'Index',
  components: {
    headNav,
    Tab,
    TabItem,
    Toast,
    media,
    previewImgDiv,
    Scroller
  },
  computed: {
    ...mapGetters(['schoolId', 'realName']),
    roleCode () {
      return this.$store.getters['user/roleCode']
    },
    loginUserId () {
      return this.$store.getters['user/loginUserId']
    },
    isSchoolAdmin () {
      return this.$store.state.user.isSchoolAdmin
    },
    maxPicPage () {
      return 9 - this.todayCookList.length
    }
  },
  data () {
    return {
      weekData: [
        { calendarName: '周一', weekId: 1 },
        { calendarName: '周二', weekId: 2 }
      ],
      todayTime: '',
      weekCookList: [],
      todayCookList: [],
      scrollerWidth: '',
      monitorList: []
    }
  },
  mounted () {
    this.getWeekToday()
    this.getWeekList()
    this.listKitchen()
    // console.log(this.isSchoolAdmin)
  },
  methods: {
    // 获取周数据
    getWeekList () {
      this.$store.dispatch('kitchen/GetWeekList', '').then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.weekData = res.data
        }
      })
    },
    handlerTab (item) {
      // console.log(item)
      this.todayTime = item.weekId
      this.listTodayFoodsMenuVos(item.weekId)
    },
    // 获取当日时间
    getWeekToday () {
      this.$store.dispatch('kitchen/GetWeekToday', '').then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.todayTime = res.data.weekId
          this.listTodayFoodsMenuVos(res.data.weekId)
        }
      })
    },
    // 获取本周某日食谱
    listTodayFoodsMenuVos (weekId) {
      let params = {
        schoolId: this.schoolId,
        weekId
      }
      this.$store.dispatch('kitchen/ListTodayFoodsMenuVos', params).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.weekCookList = res.data
          this.scrollerWidth = this.weekCookList.length * (2.2 + 0.16)
          this.listFoodPicVo(weekId)
          this.$nextTick(() => {
            this.$refs.scroller.reset({
              left: 0
            })
          })
        } else {
          this.weekCookList = []
          this.listFoodPicVo(weekId)
          // this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    // 获取今日菜品实拍
    listFoodPicVo (weekId) {
      let params = {
        schoolId: this.schoolId
        // weekId
      }
      this.$store.dispatch('kitchen/ListFoodPicVo', params).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.todayCookList = res.data.map(v => v.foodsPicUrl)
          this.todayCookList = this.setImgArr(this.todayCookList)
        } else {
          this.todayCookList = []
          // this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    handleUpload () {
      this.$refs.media.chooseImage(this.maxPicPage)
    },
    // 上传照片
    chooseImageSuccess () {
      this.$store.dispatch('media/upload').then(() => {
        // console.log(this.$store.state.media.imgData)
        var params = {
          files: this.$store.state.media.imgData,
          updateUserId: this.loginUserId,
          updateUserName: this.realName,
          schoolId: this.schoolId
        }
        this.$store.dispatch('kitchen/UploadFoodsPic', params).then(res => {
          // console.log(res)
          if (res.status === 200) {
            this.$vux.toast.text(res.msg, 'middle')
            this.$store.commit('media/clear')
            this.$store.state.media.imgData = []
            this.listFoodPicVo(this.todayTime)
          } else {
            this.$vux.toast.text(res.msg, 'middle')
            this.$store.commit('media/clear')
            this.$store.state.media.imgData = []
          }
        })

      })
    },
    // 获取厨房列表
    listKitchen () {
      let params = {
        schoolId: this.schoolId
      }
      this.$store.dispatch('kitchen/ListKitchen', params).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.monitorList = res.data
        } else {
          this.monitorList = []
          // this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    // 跳转厨房监控
    handleRouter (item) {
      // console.log(item)
      this.$router.push({ name: 'kitchenMonitor', query: { kitchenId: item.kitchenId, detailId: item.detailId, schoolId: this.schoolId } })
    },
  }
}
</script>
<style scoped>
.fl {
  float: left;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
.week-day {
  background-color: #fff;
}
.week-day h3 {
  height: 0.88rem;
  line-height: 0.88rem;
  font-size: 0.32rem;
  padding-left: 0.9rem;
  position: relative;
}
.week-day h3 img {
  width: 0.5rem;
  position: absolute;
  top: 0.14rem;
  left: 0.16rem;
}
.scroller-div {
  position: relative;
  /* width: 900px; */
}
.scroller-div .item {
  float: left;
  width: 2.2rem;
  height: 2.4rem;
  margin-right: 0.16rem;
  text-align: center;
}
.scroller-div .item:last-child {
  margin-right: 0;
}
.scroller-div .item p {
  line-height: 0.5rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scroller-div .item .img-box {
  width: 100%;
  height: 70%;
}
.scroller-div .item .img-box img {
  width: 100%;
  height: 100%;
}
.week-ul {
  min-height: 2rem;
  margin-top: 0.3rem;
  padding-bottom: 0.2rem;
}
.week-ul ul {
  width: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
.week-ul li {
  float: left;
  width: 3.24rem;
  height: 2.98rem;
  margin-right: 0.32rem;
  text-align: center;
  box-sizing: border-box;
}
.week-ul li:nth-child(2n) {
  margin-right: 0;
}
.week-ul li p {
  line-height: 0.68rem;
  font-size: 0.28rem;
}
.week-ul li img {
  width: 100%;
  height: 2.3rem;
}
.media-box {
  position: relative;
}
.media-box img {
  position: absolute;
  right: 0.18rem;
  top: 0.18rem;
}
.nopic-box {
  text-align: center;
}
.nopic-box p:first-child {
  font-size: 0.32rem;
  line-height: 0.56rem;
}
.nopic-box p:last-child {
  color: rgb(165, 164, 164);
}
.mt-20 {
  margin-top: 20px;
}
</style>
<style>
.week-ul .previewer-demo-img {
  width: 2.2rem !important;
}
.vux-tab-wrap {
  padding-top: 0.88rem !important;
}
.vux-tab-container {
  height: 0.88rem !important;
  z-index: 3;
}
.vux-tab {
  height: 0.88rem !important;
}
.vux-tab .vux-tab-item {
  font-size: 0.28rem !important;
  line-height: 0.88rem !important;
  flex: 0 0 20% !important;
}
</style>
