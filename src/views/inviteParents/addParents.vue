<template>
    <div class="main">
        <headNav title="添加学生家长"></headNav>
        <div class="bigBox">
            <div class="topBox">
                <p>
                    快速添加孩子，加入班级，无需 再手动添加，一步到位！
                </p>
            </div>
            <div class="stuInfoBox">
                <div class="stuInfo">
                    <img class="headImg" src="./img/bk.png" alt="">
                    <div class="nameBox">
                        <p class="stuName">
                            {{studentName}}
                        </p>
                        <p class="stuSchool">
                            {{studentInfo.schoolName}}  {{studentInfo.gradeName}}{{studentInfo.className}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <div v-if="!isRegistered" class="warningMsg">
                    检测到您<span class="red">尚未注册</span> ，快速完成注册，并自动加入班级！
                </div>
                <div class="infoCol">
                    <span class="labelName">
                        手机号：
                    </span>
                    <span class="callVal">
                        {{inviteObj.phoneNum}}
                    </span>
                </div>
                <!-- <div class="infoCol infoColNa">
                    <span class="labelName">
                        图片验证码：
                    </span>
                    <input type="text" placeholder="请输入验证码" v-model="picCode">
                    <img class="CodeImg" src="./img/bk.png" alt="">
                </div> -->
                <div class="infoCol infoColNa">
                    <span class="labelName">
                        手机验证码：
                    </span>
                    <input type="text" placeholder="请输入验证码" v-model="phoneCode">
                    <span v-if="!isGetCode" @click="getCode" class="getCode">
                        获取验证码
                    </span>
                    <span v-else class="downSecond">
                        {{seconds}}
                    </span>
                </div>
                <div class="infoCol">
                    <span class="labelName">
                        家长姓名：
                    </span>
                   <span class="callVal">
                       {{inviteObj.parentName}}
                   </span>
                   
                </div>
                 <div class="infoCol">
                    <span class="labelName">
                        与孩子的关系：
                    </span>
                    <span class="parentName">
                        {{inviteObj.theParentName}}
                    </span>
                </div>
            </div>
            <div @click="send" class="remind">
                马上加入
            </div>
        </div>
        <div  class="shareModel" ref="shareModel">
            <div class="modelContent">
                <p class="imgBox">
                     <img class="sword" src="./img/sword.png" alt="">
                </p>
                <p class="textRemind">
                    <span class="numCycle">
                        1
                    </span>
                    <span class="remindText">
                        点击右上角...按钮     
                    </span>
                </p>
                <p class="textRemind">
                    <span class="numCycle">
                        2
                    </span>
                    <span class="remindText">
                        选择
                        <img src="./img/shareIcon.png" alt="">  
                        发送给好友  
                    </span>
                </p>
                <p class="deleteBox" @click.stop="closeModel">
                    <img src="./img/deleteIcon.png" alt="">
                </p>
            </div>
        </div>

        <div v-show="isconnect" class="sureModel">
            <div class="box">
                <div class="remindTop">
                    检测到 <span class="red">{{studentName}}</span> 已被其他家长添加您添加的是否同一个人
                </div>
                <div class="boxBottom">
                    <img class="headImg" src="./img/bk.png" alt="">
                    <p class="parentsLine">
                        关联的家长：
                        <span v-for="(item,index) in parentList" :key='index' class="connectParent">
                            {{item.parentName}}
                        </span>
                    </p>
                </div>
                <div class="sureBox">
                    <div class="sureBtn" @click="isconnect = false;registerParent()">
                        是
                    </div>
                    <div class="cancelBtn" @click="isconnect = false">
                        否
                    </div>
                </div>
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
            studentInfo: '',
            studentName: '',
            isconnect: false,
            picCode: '',
            phoneCode: '',
            isRegistered: false,
            isGetCode: false,
            rightPhoneCode: '',
            seconds: 60,
            parentList: []
        }
    },
    computed: {
        inviteObj () {
            return this.$store.state.inviteParents.inviteObj
        }
    },
    mounted () {
        this.studentName = this.$store.state.user.studentName
        this.studentInfo = this.$store.state.user
        var params = {
            id: this.inviteObj.id
        }
        this.$store.dispatch('inviteParents/CheckParent', params).then(
            res => {
                if (res.isRegistered) {
                    this.isRegistered = true
                }
            }
        )
    },
    methods: {
        closeModel () {
            this.$refs.shareModel.style.display = 'none'
        },
        getCode () {
            var params = {
                Phone: this.inviteObj.phoneNum
            }
            this.$store.dispatch('inviteParents/CheckCode', params).then(
                res => {
                    this.rightPhoneCode = res
                    this.isGetCode = true
                    this.downSecond()
                }
            )
        },
        downSecond () {
            var timeDown = setInterval(()=>{
                this.seconds--
                if (this.seconds == 0) {
                    this.isGetCode = false
                    clearTimeout(timeDown)
                    return
                }
            },1000)
        },
        getParentsList () {
            var params = {
                invitationId: this.inviteObj.id
            }
            this.$store.dispatch('inviteParents/GetParentsList', params).then(
                res => {
                    this.parentList = res
                    if (res.length == 0) {
                        this.registerParent()
                    } else {
                        this.isconnect = true
                    }
                }
            )
        },
        check () {
            // if (!this.picCode) {
            //     this.$vux.toast.text('请输入图片验证码')
            //     return false
            // }
            if (!this.phoneCode) {
                this.$vux.toast.text('请输入手机验证码')
                return false
            }
            // if (this.phoneCode != this.rightPhoneCode) {
            //     this.$vux.toast.text('验证码错误')
            //     return false
            // }
            return true
        },
        send () {
            if (!this.check()) return
            this.getParentsList()
            //this.registerParent()
        },
        registerParent () {
            var params = {
                id: this.inviteObj.id,
                code: this.phoneCode
            }
            this.$store.dispatch('inviteParents/RegisterParent', params).then(
                res => {
                    if (!this.isRegistered) {
                        var that = this
                        this.$vux.confirm.show({
                            content: '已为您自动注册，账号是您的手机号码，密码为手机尾号后6位。',
                            title: '提示',
                            showCancelButton: false,
                            onConfirm () {
                                that.$vux.confirm.show({
                                    content: '关联成功，快去登录骆米校园看看吧！',
                                    title: '提示',
                                    showCancelButton: false
                                })
                            }
                        })
                    } else {
                        this.$vux.confirm.show({
                            content: '关联成功，快去登录骆米校园看看吧！',
                            title: '提示',
                            showCancelButton: false
                        })
                    }
                    
                }
            )
        }

    }
}
</script>
<style lang='less' scoped>
    .main{
        background: #fff;
        padding-bottom: 0.2rem;
    }
    .topBox{
        color: #fff;
        font-size: 0.32rem;
        height: 2.67rem;
        background: url('./img/bk.png');
        background-size: 100% 100%;
        >p {
            padding: 0.36rem 1.38rem 0 1.38rem;
        }
    }
    .stuInfoBox{
        margin-top: -1.2rem;
        padding: 0 0.3rem;
        .stuInfo{
            padding: 0.28rem 0.48rem;
            box-shadow:0px 4px 10px 0px rgba(0, 0, 0, 0.15);
            background: #fff;
            border-radius: 0.1rem;
            .nameBox{
                display: inline-block;
                vertical-align: middle;
                margin-left: 0.2rem;
                >p{
                    line-height: 0.52rem;
                }
                .stuName{
                    color: #333;
                    font-size: 0.4rem;
                }
                .stuSchool{
                    font-size: 0.28rem;
                    color: #666;
                }
            }
        }
    }
    .red{
        color: #ff0000;
    }
    .headImg{
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        vertical-align: middle;
    }
    .main-content{
        padding: 0 0.45rem;
        .warningMsg{
            color: #333;
            font-size: 0.24rem;
            padding-left: 0.35rem;
            margin: 0.6rem 0;
        }
        .infoColNa:hover{
            border-bottom: 0.01rem solid #1290EF;
        }
        .infoCol{
            border-bottom: 0.01rem solid #E5E5E5;
            padding: 0.32rem 0;
            .CodeImg{
                width: 1.8rem;
                height: 0.64rem;
                vertical-align: middle;
            }
            .labelName{
                font-size: 0.28rem;
                color: #333;
                vertical-align: middle;
            }
            .callVal{
                font-size: 0.28rem;
                color: #999;
                vertical-align: middle;
            }
            input{
                color: #333;
                font-size: 0.28rem;
                border-radius: 0.08rem;
                padding: 0.16rem 0.1rem;
                width: 2rem;
                vertical-align: middle;
            }
            .getCode{
                padding: 0.16rem 0.2rem;
                font-size: 0.28rem;
                color: #128FEF;
                border: 0.01rem solid #128FEF;
                vertical-align: middle;
                border-radius: 0.08rem;
            }
            .downSecond {
                display: inline-block;
                width: 1.8rem;
                height: 0.64rem;
                line-height: 0.64rem;
                text-align: center;
                font-size: 0.28rem;
                color: #9a9a9a;
                vertical-align: middle;
                border-radius: 0.08rem;
                background: #E7E7E7;
            }
            .parentName{
                display: inline-block;
                padding: 0.18rem 0.5rem;
                background: #E8F5FF;
                color: #128FEF;
                border-radius: 0.05rem;
                font-size: 0.28rem;
                border-radius: 0.08rem;
                vertical-align: middle;
            }
        }
    }
    .remind{
        width:6.40rem;
        height:0.80rem;
        background:rgba(18,143,239,1);
        border-radius:0.08rem;
        line-height: 0.8rem;
        text-align: center;
        color: #ffffff;
        margin: 0.28rem auto;
        font-size: 0.32rem;
    }
    .shareModel{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        .modelContent{
            overflow: hidden;
            .imgBox{
                overflow: hidden;
                .sword{
                    float: right;
                    margin: 0.2rem 0.6rem 0 0;
                    width: 2.06rem;
                    height: 1.72rem;
                }
            }
            .textRemind{
                margin: 0.3rem 0;
                padding-left: 1rem;
                margin-bottom: 1rem;
                .numCycle{
                    display: inline-block;
                    width: 0.64rem;
                    height: 0.64rem;
                    border-radius: 50%;
                    background: #F41601;
                    color: #fff;
                    line-height: 0.64rem;
                    text-align: center;
                    font-size: 0.4rem;
                }
                .remindText{
                    font-size: 0.48rem;
                    color: #fff;
                    img{
                        width: 0.42rem;
                        height: 0.52rem;
                    }
                }
                
            }
            .deleteBox{
                margin-top: 0.8rem;
                text-align: center;
                img{
                    width: 0.6rem;
                    height: 0.6rem;
                }
            }
        }
       
    }
    .sureModel{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
        .box{
            position: relative;
            top: 2rem;
            width: 6.1rem;
            margin: 0 auto;
            background: #fff;
            border-radius: 0.15rem;
            box-sizing: border-box;
            .remindTop{
                padding: 0.32rem 0.72rem;
                font-size: 0.32rem;
                line-height: 0.52rem;
            }
            .boxBottom{
                font-size: 0.28rem;
                text-align: center;
                padding: 0.32rem 0.72rem;
                border-top:  0.01rem solid #DEDEDE;
                .parentsLine{
                    margin: 0.2rem 0;
                    .connectParent{
                        display: inline-block;
                        padding: 0.06rem 0.2rem;
                        background: #FFF4E1;
                        border-radius: 0.24rem;
                        margin: 0 0.24rem 0.24rem 0;
                    }
                }
            }
            .sureBox{
                padding-bottom: 0.42rem;
                text-align: center;
                div{
                    font-size: 0.32rem;
                    display: inline-block;
                    width: 2rem;
                    height: 0.72rem;
                    line-height: 0.72rem;
                    text-align: center;
                    border-radius: 0.36rem;
                }
                .sureBtn{
                    background: #1290EF;
                    color: #fff;
                }
                .cancelBtn{
                    border: 0.01rem solid #1290EF;
                    color: #1290EF;
                    margin-left: 0.42rem;
                }
            }
        }
    }
   
</style>