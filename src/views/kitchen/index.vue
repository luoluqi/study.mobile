<template>
  <div>
    <headNav title="明厨亮灶"></headNav>
    <div class="week-day">
      <h3>本周食谱<img src="../../assets/logo.png" alt=""></h3>
      <tab>
        <tab-item v-for="(item, index) in weekData" :key="index" :selected="item.weekId === todayTime" @on-item-click="handlerTab(item)">{{ item.day }}
        </tab-item>
      </tab>
      <div class="week-ul">
        <div style="height: 100px" v-if="!weekCookList.length">暂无数据~</div>
        <ul class="clearfix" v-else>
          <li v-for="(item, index) in weekCookList" :key="index">
            <img :src="item.foodsImgUrl" alt="">
            <p>{{ item.foodsName}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="week-day mt-20" v-show="todayCookList.length" v-if='!isSchoolAdmin'>
      <h3>今日菜品实拍<img src="../../assets/logo.png" alt=""></h3>
      <div class="week-ul">
        <ul class="clearfix">
          <li v-for="(item, index) in todayCookList" :key="index">
            <img :src="item.foodsPicUrl" alt="">
            <!-- <p>红烧肉</p> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="week-day mt-20" v-else>
      <media :showVoice='false' :showVideo="false" :showLink="false" @changeImageSuccess='changeImageSuccess'></media>
      <h3>今日菜品实拍<img src="../../assets/logo.png" alt=""></h3>
      <div class="week-ul">
        <ul class="clearfix">
          <li v-for="(item, index) in todayCookList" :key="index">
            <img :src="item.foodsPicUrl" alt="">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, Toast } from 'vux'
import { mapState, mapGetters } from 'vuex'
import media from '@/components/media'
import headNav from '@/components/headNav/headNav'
export default {
  // name: '',
  components: {
    headNav,
    Tab,
    TabItem,
    Toast,
    media
  },
  computed: {
    ...mapGetters(['schoolId']),
    roleCode () {
      return this.$store.getters['user/roleCode']
    },
    isSchoolAdmin () {
      return this.$store.state.user.isSchoolAdmin
    }
  },
  data () {
    return {
      weekData: [
        { day: '周一', weekId: 1 },
        { day: '周二', weekId: 2 },
        { day: '周三', weekId: 3 },
        { day: '周四', weekId: 4 },
        { day: '周五', weekId: 5 }
      ],
      todayTime: 1,
      weekCookList: [],
      todayCookList: []
    }
  },
  mounted () {
    this.getWeekToday()
    console.log(this.isSchoolAdmin)
  },
  methods: {
    handlerTab (item) {
      // console.log(item)
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
          this.listFoodPicVo(weekId)
        } else {
          this.weekCookList = []
          this.listFoodPicVo(weekId)
          this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    // 获取今日菜品实拍
    listFoodPicVo (weekId) {
      let params = {
        schoolId: this.schoolId,
        weekId
      }
      this.$store.dispatch('kitchen/ListFoodPicVo', params).then(res => {
        console.log(res)
        // todayCookList
        if (res.status === 200) {
          this.todayCookList = res.data
        } else {
          this.todayCookList = []
          this.$vux.toast.text(res.msg, 'middle')
        }
      })
    },
    changeImageSuccess () {
      this.$store.dispatch('media/upload').then(() => {
        debugger
        console.log(this.$store.state.media.imgData)
        var params = {
          files: this.$store.state.media.imgData,

        }

      })
    }
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
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  padding-left: 50px;
  position: relative;
}
.week-day h3 img {
  width: 30px;
  position: absolute;
  top: 12px;
  left: 5px;
}
.week-ul {
  margin-top: 10px;
  padding-bottom: 10px;
}
.week-ul li {
  float: left;
  width: 32%;
  height: 120px;
  margin-right: 7px;
  text-align: center;
  /* border: 1px solid #ccc; */
  box-sizing: border-box;
}
.week-ul li img {
  max-width: 80%;
}
.week-ul li:nth-child(3) {
  margin-right: 0;
}
.mt-20 {
  margin-top: 20px;
}
</style>
