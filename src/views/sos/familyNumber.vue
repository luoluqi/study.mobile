<template>
    <div>
        <headNav title="亲情号码"></headNav>
        <div class="main">
            <div class="settingSos">
                <span class="setTit">亲情号码</span>
                <span class="setSos" @click="goFamily">设置SOS号码</span>
            </div>
            <div class="remind">
                最多可添加4个号码，状态“可用”的方可正常使用。
            </div>
            <div v-for="(item,index) in phoneList" :key="index" class="oneMan" @click="editNumber(item)">

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
            </div>
            <div @click="toAdd" v-if="phoneList.length < 4" class="addBox">
                <img src="@/assets/img/sos/add.png" alt="">
               <p>
                   点击添加亲情号码
               </p>
            </div>
            
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
        this.getListenPhoneList()
    },
    methods: {
        toAdd () {
            if (this.phoneList.length == 4) {
                this.$vux.toast.text('最多可添加四个亲情号码')
                return
            }
            // this.$router.push({name:'addFamilyNumber',params:{phoneList: this.phoneList}})
            this.$router.push('addFamilyNumber')
            this.$store.state.sos.phoneList = this.phoneList
        },
        //  获取列表
        getListenPhoneList () {
            var params = {
                studentId: this.$store.getters['user/studentId']
                // studentId: '2bf1def9599144dd964115bbe1243e70'
            }
            this.$store.dispatch('sos/FamilyPhonesState', params).then(
                res => {
                    this.phoneList = res.phoneDetails
                }
            )
        },
        // 编辑亲情号码
        editNumber(item){
            var arr = this.phoneList
            arr.forEach((obj,index) => {
                if(item.phone == obj.phone){
                   arr.splice(index,1)
                }
            })
            this.$router.push({name:'editFamilyNumber',params:{phoneList: arr}})
           this.$store.state.sos.editData = item
           sessionStorage.setItem('editData', JSON.stringify(item))
        },
        goFamily(){
            this.$router.push('setFamily')
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
      width:1.86rem;
     height:0.60rem;
     background:rgba(255,153,0,1);
     border-radius:0.30rem;
      color: #ffffff;
      font-size: 0.24rem;
      line-height: 0.6rem;
      text-align: center;
    }
</style>