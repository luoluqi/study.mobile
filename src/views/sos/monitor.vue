<template>
    <div> 
        <headNav title="监听"></headNav>
        <div v-if="phoneCount != 0" class="main">
            <div class="remind">
                请选择一个亲情号码作为监听孩子设备的渠道
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
                <!-- <img src="@/assets/img/sos/dad.png" alt=""> -->
                <div class="detail">
                    <p>
                        {{item.nickName}}
                    </p>
                    <p>
                        {{item.phone}}
                    </p>
                </div>
                <img v-if="current == index" class="isImg" src="@/assets/img/sos/isImg.png" alt="">
            </div>
            <div v-if="isListen == 1" @click="toMonitor" class="submit">
                开始监听
            </div>
            <div v-if="isListen == 2" class="submit" style="background: rgb(159, 165, 169);">
                正在监听...
            </div>
            <div v-if="isListen == 3" class="submit" style="background: rgb(159, 165, 169);">
                不可用
            </div>
            <div class="remark">提示：仅可用状态的亲情号码可发起监听</div>
        </div>
        <div v-else class="noMember">
            <img class="phone" src="@/assets/img/sos/phone.png" alt="">
            <p class="noRemind">
                您还未添加亲情号码！
            </p>
            <div @click="toAdd()" class="addBtn">
                去添加
            </div>
        </div>
        <!-- {{devicePhone}} -->
        <a :href="'tel://'+devicePhone" ref="tel"></a>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
    components: {headNav},
    data () {
        return {
            current: -1,
            phoneList: [],
            phoneCount: 0,
            telephone: '',
            isListen:1,
            deviceType:'',
            devicePhone:'',
            deviceMonitorId:'',
            count:0,
             timer: '',
        }
    },
    mounted () {
        this.getPhoneList()
        this.getDeviceType()
    },
    methods: {
        // to添加 
        toAdd () {
            this.$router.push('addFamilyNumber')
        },
        // 开始监听
        toMonitor () {
            if(!this.telephone){
                 this.$vux.toast.text('请选择监听人')
                 return
            }
            this.isListen = 2
            var params = {
                studentId: this.$store.getters['user/studentId'],
                // studentId:'e0838d9a5bd54caf8a5a71db8ca2c6f2',
                telephone: this.telephone
            }
            this.$store.dispatch('sos/SendListen', params).then(
                res => {
                    this.deviceMonitorId = res
                     this.monitorState()
                }
            ).catch(res=>{
                this.isListen = 1
            })
        },
        // 获取监听列表
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
        // 判断是什么设备
        getDeviceType(){
             var params = {
                studentId: this.$store.getters['user/studentId']
                // studentId:'e0838d9a5bd54caf8a5a71db8ca2c6f2'
            }
            this.$store.dispatch('sos/StudentDevice', params).then(
                res => {
                    this.deviceType = res.deviceType
                    this.devicePhone = res.phone
                }
            )
        },
        monitorState(){
            this.count++
            var params = {
                deviceMonitorId:this.deviceMonitorId 
            }
            this.$store.dispatch('sos/MonitorState', params).then(
                res => {
                        if(res == 0){
                            this.timer = setTimeout(() => {
                                this.monitorState()
                            }, 2000)
                            if(this.count == 3){
                                this.count = 0 
                                clearTimeout(this.timer)
                                this.showConfirm()
                           } 
                        }
                        if(res == 1){
                           this.count = 0
                            clearTimeout(this.timer)
                           this.showConfirm()
                        }
                        if(res == 2){
                            this.count = 0
                             clearTimeout(this.timer)
                           this.$vux.toast.text('开启监听失败') 
                           this.isListen = 1
                        }
                }
            )
        },
        showConfirm(){
            //  if (res) {
                       var _this = this
                        if(_this.deviceType == '1'){
                            var content = '开启监听成功，请等待学生设备呼入，请勿重复开启监听'
                        }
                        if(_this.deviceType == '3'){
                            var content = '开启监听成功，请在3分钟内拨打学生号码，请勿重复开启监听'
                        }
                    // } else {
                    //     var content = '开启监听失败'
                    // }
                    this.$vux.confirm.show({
                        //  组件除show外的属性
                        content: content,
                        onConfirm () {
                            if(_this.deviceType == '1'){
                                _this.isListen = 1
                               return
                            }
                            if(_this.deviceType == '3'){
                                _this.isListen = 1
                                _this.$refs.tel.click()
                            }
                        },
                        onCancel () {
                            _this.isListen = 1
                        },
                    })
        },
        // 选择号码
        chooseMan (item,index) {
            if(item.state == 0 || item.state == 2){
               this.isListen = 3
            }else{
                this.isListen = 1
            }
            this.current = index
            this.telephone = item.phone
        }
    }
}
</script>
<style src="./css/public.css" scoped></style>
<style scoped>
    .remind{
        text-align: center;
        font-size: 0.28rem;
        color: #333;
        margin: 0.06rem 0 0.3rem 0; 
    }
    .isImg{
        position: absolute;
        width: 0.94rem;
        height: 0.85rem;
        top: 0;
        right: 0;
    }
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
    .noMember{
        margin-top: 1.2rem;
        text-align: center;
    }
    .phone{
        width: 3.92rem;
        height: 3.32rem;
    }
    .noRemind{
        margin: 0.63rem 0 1.5rem 0;
        font-size: 0.32rem;
        color: #888;
    }
    .addBtn{
        margin: 0 auto;
        width: 3.68rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background:rgba(18,143,239,1);
        border-radius: 0.1rem;
        text-align: center;
        color: #fff;
        font-size: 0.32rem;
    }
    .remark{
         font-size: 0.24rem;
         color: #999;
    }
</style>