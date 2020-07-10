<template>
    <div>
        <headNav title="SOS号码查看"></headNav>
        <div class="main">
            <div v-for="(item,index) in phoneList" :key="index" class="oneMan">

                <img v-if="item.type == 1" src="@/assets/img/sos/school1.png" alt="">
                <img v-if="item.type == 2" src="@/assets/img/sos/school2.png" alt="">
                <img v-if="item.type == 3" src="@/assets/img/sos/otherMan.png" alt="">
                <div class="detail">
                    <p v-if="item.type == 1">校方SOS号码1</p>
                    <p v-if="item.type == 2">校方SOS号码2</p>
                    <p v-if="item.type == 3">家庭SOS号码</p>
                    <p>
                        {{item.phone}}
                    </p>
                </div>
                <div class="state">
                    <span v-if="item.state == 0" class="commited">
                        已提交
                    </span>
                    <span v-if="item.state == 1" class="canUse">
                        可用
                    </span>
                    <span v-if="item.state == 2" class="notUse">
                        不可用
                    </span>
                </div>
            </div>
            <p v-if="phoneList.length == 0" style="font-size: 0.32rem;color: #999;">暂无sos号码</p>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
    components: {
        headNav
    },
    data () {
        return {
            phoneList: []
        }
    },
    mounted () {
       this.getDetail()
    },
    methods: {
       getDetail(){
           var params = {
                studentId: this.$store.getters['user/studentId']
                // studentId:'a9e87d89d0814fcf805d82c80ef94e1c'
            }
            this.$store.dispatch('sos/SOSPhonesStateDto', params).then(
                res => {
                    this.phoneList = res.sosPhoneDetails
                }
            )
       }
    }
}
</script>
<style src="./css/public.css" scoped></style>
<style scoped>
    .main{
        padding: 0.24rem 0.32rem;
    }
    .oneMan{
        padding: 0.28rem 0.24rem;
        background: #fff;
        border-radius: 0.15rem;
        overflow: hidden;
        margin-bottom: 0.24rem;
    }
    .oneMan img{
        float: left;
        width: 1.08rem;
        height: 1.08rem;
    }
    .detail{
        margin-left: 0.22rem;
        float: left;
        font-size: 0.32rem;
    }
    .detail>p{
        line-height: 0.56rem;
    }
    .detail>p:first-child{
        color: #333;
    }
    .detail>p:last-child{
        color: #999;
    }
    .addBox{
        padding: 0.28rem;
        background: #fff;
        text-align: center;
        border-radius: 0.15rem;
        font-size: 0.28rem;
        color: #666;
        box-sizing: border-box;
    }
    .addBox img{
        width: 0.8rem;
        height: 0.8rem;
    }
    .state{
        float: right;
        /* margin-right: 1rem;
        margin-top: 0.3rem; */
    }
    .state>span{
        display: inline-block;
        width: 1.08rem;
        height: 0.48rem;
        line-height: 0.48rem;
        text-align: center;
        border-radius:0.08rem;
    }
    .canUse{
        background: #E1FDEE;
        color: #15C463;
    }
    .commited{
        background: #E3F3FF;
        color: #128FEF;
    }
    .notUse{
        background: #FFEAEA;
        color: #FF2F2F;
    }
    .remind{
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        color: #888;
        font-size: 0.24rem;
    }
    /* .settingSos{
        margin-bottom: 20px;
        overflow: hidden; 
    }
    .settingSos span{
        float: right;
        font-size: 0.32rem;
        color: #0a8de5;
    } */
    .submit{
        width:100%;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.28rem auto;
        font-size: 0.32rem;
    }
    .settingSos{
        /* margin-bottom: 20px; */
        overflow: hidden; 
        line-height: 0.6rem;
    }
    .setTit{
       font-size: 0.32rem;
       color: #333333;
    }
    .setSos {
      float: right;
      color: #128FEF;
      font-size: 0.28rem;
    }
    .isImg{
        position: absolute;
        width: 0.94rem;
        height: 0.85rem;
        top: 0;
        right: 0;
    }
</style>