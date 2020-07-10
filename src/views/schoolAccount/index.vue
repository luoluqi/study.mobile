<template>
  <div class="container">
    <headNav title="校园账户"></headNav>
    <div class="help-con">
      <div class="order-info" @click="clickInfo">账户明细</div>
      <div class="order-body">
        <div class="order-item">
          <div class="order-title">
            <div class="order-name"></div>
            <div class="order-context">{{ student.studentName }}</div>
          </div>
        </div>
        <div class="order-item">
          消费卡卡号:<span>{{ student.cardNo }}</span>
        </div>
        <div class="order-item">
          余额:<span>{{ student.accountBalance / 100 }}</span>
        </div>
      </div>
      <div class="order_recharge">
        <x-button type="primary" mini @click.native="recharge">充值</x-button>
      </div>
    </div>
    <bottomNav></bottomNav>
  </div>
</template>
<script>
import { getHelpList } from "@/api/helpApi";
import infiniteScroll from "@/components/infiniteScroll";
import { LoadMore } from "vux";
import headNav from "@/components/headNav/headNav";
import bottomNav from "@/components/bottomNav/bottomNav";
import { XButton } from "vux";
import cookie from "@/util/cookie";
export default {
  components: {
    headNav,
    infiniteScroll,
    LoadMore,
    bottomNav,
    XButton
  },
  data() {
    return {
      student: {
        studentName: "",
        cardNo: "",
        accountBalance: 0
      }
    };
  },
  mounted() {
    let studentId = cookie.get("studentId");
    this.$store
      .dispatch("schoolAccount/GetAccountByUserLoginId", {
        studentId: studentId
      })
      .then(res => {
        if (res.status == 200) {
          this.student = { ...res.data };
        }
      });
  },
  methods: {
    clickInfo() {
      this.$router.push("orderInfo");
    },
    recharge() {
      this.$router.push("recharge");
    }
  }
};
</script>
<style scoped>

.help-con {
  padding: 0.6rem 0.2rem;
}
.order-info {
  text-align: right;
  color: #0a8de5;
  padding-right: 0.3rem;
  font-size: 0.3rem;
}
.order-body {
  color: #fff;
  border-radius: 4px;
  margin: 0.2rem 0rem;
  padding: 0.2rem 0.3rem;
  background-image: url(../../assets/img/account.png);
  background-repeat: no-repeat;
  background-size: 7.02rem 2.5rem;
  font-size: 0.25rem;
}
.order-item {
  line-height: 0.6rem;
  display: flex;
}
.order-name {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(../../assets/img/account_title.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
}
.order-context {
  color: #fff;
  font-size: 0.3rem;
  margin-left: 0.15rem;
}
.order-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.order_recharge {
  text-align: center;
  margin-top: 0.55rem;
  padding: 0px 0.2rem;
}
span {
  margin-left: 0.15rem;
}
/deep/ .weui-btn_primary {
  background-color: #128fef;
  width: 100%;
  height: 0.8rem;
}
</style>
