<template>
    <div>
        <headNav title="设置SOS号码"></headNav>
        <div class="main">
            <!-- <div class="settingSos">
                <span class="setTit">亲情号码</span>
                <span class="setSos" @click="onCancel">取消</span>
            </div> -->
            <div class="remind">
               设置可用状态亲情号码为家庭SOS号码，最多可设置1个
            </div>
            <div @click="chooseMan(item,index)" v-for="(item,index) in phoneList" :key="index" class="oneMan">

                <img v-if="item.nickName == '爸爸'" src="@/assets/img/sos/dad.png" alt="">
                <img v-else-if="item.nickName == '妈妈'" src="@/assets/img/sos/mom.png" alt="">
                <img v-else-if="item.nickName == '爷爷'" src="@/assets/img/sos/grandpa.png" alt="">
                <img v-else-if="item.nickName == '奶奶'" src="@/assets/img/sos/grandmom.png" alt="">
                <img v-else-if="item.nickName == '外公'" src="@/assets/img/sos/waigong.png" alt="">
                <img v-else-if="item.nickName == '外婆'" src="@/assets/img/sos/waipo.png" alt="">
                <img v-else-if="item.nickName == '叔叔'" src="@/assets/img/sos/uncle.png" alt="">
                <img v-else-if="item.nickName == '婶婶'" src="@/assets/img/sos/unty.png" alt="">
                <img v-else src="@/assets/img/sos/otherMan.png" alt="">
                <div class="detail">
                    <p>
                        {{item.nickName}}
                        <span v-if="item.isSetSOS" class="isSos">（当前SOS号码）</span>
                    </p>
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
                <img class="isImg" v-if="current == index" src="@/assets/img/sos/isImg.png" alt="">
            </div>
            <div class="submit" @click="setSubmit" v-if="phoneCount != 0">
                保存家庭SOS号码
            </div>
            <!-- <div class="remind">
                设置可用状态亲情号码为家庭SOS号码，最多可设置1个
            </div> -->
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
            // phoneList: [
            //     {phone: "15800000001", nickName: '叔叔', state: 2},
            //     {phone: "15800000003", nickName: '', state: 1},
            //     {phone: "15800000002", nickName: '爸爸', state: 2},
            //     {phone: "15800000003", nickName: '外婆', state: 1}],
            phoneCount: 0,
            phoneList: [],   
            current: -1,
            telephone:''
        }
    },
    mounted () {
       this.getPhoneList()
    },
    methods: {
        // 选择号码
        chooseMan (item,index) {
            if(item.state == 0 || item.state == 2){
               return
            }else{
                this.current = index
                this.telephone = item
            }
        },
        // 获取列表
        getPhoneList () {
            var params = {
                studentId: this.$store.getters['user/studentId']
                // studentId:'e0838d9a5bd54caf8a5a71db8ca2c6f2'
            }
            this.$store.dispatch('sos/ListenPhoneList', params).then(
                res => {
                    this.phoneList = res.phoneDetails
                    this.phoneCount = res.count
                }
            )
        },
        // SetOrUpdateSOSPhones 设置sos家庭号码
         setSubmit(){
             if(!this.telephone){
                  this.$vux.toast.text('请选择可用的号码')
                  return
             }
            console.log(this.telephone)
            let sosPhones = []
            sosPhones.push({phone:this.telephone.phone})
            var params = {
                studentId: this.$store.getters['user/studentId'],
                // studentId:'e0838d9a5bd54caf8a5a71db8ca2c6f2',
                sosPhones:sosPhones
            }
            this.$store.dispatch('sos/SetOrUpdateSOSPhones', params).then(res => {
                this.$vux.toast.text('设置成功')
                this.current = -1
                this.getPhoneList()
            }).catch(res=>{
               this.$vux.toast.text(res)
            })
        },
        onCancel(){
            this.$router.push('familyNumber')
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
        margin-right: 1rem;
        margin-top: 0.3rem;
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
        /* margin-top: 0.2rem; */
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
    .isSos{
        font-size: 0.24rem;
        font-weight: normal;
        color: #FF2F2F;
    }
</style>