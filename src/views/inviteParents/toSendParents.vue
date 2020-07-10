<template>
    <div class="main">
        <headNav :isBack="loginUserId ? true : false" :isHome="loginUserId ? true : false" title="添加学生家长"></headNav>
        <div class="bigBox">
            <div class="topBox">
                <p>
                    快速添加孩子，加入班级，无需再手动添加，一步到位！
                </p>
            </div>
            <div class="stuInfoBox">
                <div class="stuInfo">
                    <img v-if="studentInfo.imgHead" class="headImg" :src="studentInfo.imgHead" alt="">
                    <img v-else class="headImg" src="./img/default_head.png" alt="">
                    <div class="nameBox">
                        <p class="stuName">
                            {{studentInfo.studentName}}
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
                <div v-else class="warningMsg">
                    检测到您已注册<span class="red"> 请完成短信验证</span> ，一步加入班级！
                </div>
                <div class="infoCol">
                    <span class="labelName">
                        手机号：
                    </span>
                    <span class="callVal">
                        {{inviteObj.phoneNum}}
                    </span>
                </div>
                <div class="infoCol infoColNa">
                    <span class="labelName">
                        图片验证码：
                    </span>
                    <input type="text" maxlength="4" placeholder="请输入验证码" v-model="picCode">
                    <img @click="getCodeImg" class="CodeImg" :src="'data:image/png;base64,' + codeImg" alt="图形码">
                </div>
                <div class="infoCol infoColNa">
                    <span class="labelName">
                        手机验证码：
                    </span>
                    <input type="text" @blur="inputBlur" placeholder="请输入验证码" v-model="phoneCode">
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
                        {{inviteObj.relationShipName}}
                    </span>
                </div>
            </div>
            <div v-if="!joined" @click="send" class="remind">
                马上加入
            </div>
            <div v-else class="reminded">
                已加入
            </div>
        </div>
        <div v-if="loginUserId"  class="shareModel" ref="shareModel">
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

        <div v-if="isconnect"  class="sureModel">
            <div class="box">
                <div class="remindTop">
                    检测到 <span class="red">{{studentInfo.studentName}}</span> 已被其他家长添加您添加的是否同一个人
                </div>
                <div class="boxBottom">
                    <img v-if="studentInfo.imgHead" class="headImg" :src="studentInfo.imgHead" alt="">
                    <img v-else class="headImg" src="./img/default_head.png" alt="">
                    <p class="parentsLine">
                        关联的家长：
                        <span v-for="(item,index) in parentList" :key='index' class="connectParent">
                           {{item.parentName}}
                        </span>
                    </p>
                </div>
                <div class="sureBox">
                    <div class="sureBtn" @click="isconnect = false;conectParent()">
                        是
                    </div>
                    <div class="cancelBtn" @click="cancel">
                        否
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
import {GetConfig} from "@/api/commonApi"
export default {
    components: {
        headNav
    },
    computed: {
        realName () {
            return this.$store.getters['user/realName']
        }
    },
    data () {
        return {
            joined: false,
            loginUserId: false,
            studentInfo: '',
            inviteObj: '',
            studentName: '',
            isconnect: false,
            picCode: '',
            phoneCode: '',
            isRegistered: true,
            isGetCode: false,
            rightPhoneCode: '',
            seconds: 60,
            parentList: [],
            isLogin: false,
            onlyCode: '',
            codeImg: ''
        }
    },
    mounted () {
        this.onlyCode = localStorage.onlyCode ? localStorage.onlyCode : this.get_uuid()
        this.getCodeImg()
        var param = this.getParam()
        if (localStorage.isMine) {
            this.loginUserId = true
        } else {
            this.loginUserId = false
        }
        localStorage.isMine = ''
        if (this.$store.getters['user/schoolId']) {
            if (this.$store.getters['user/loginName'] == param.phoneNum) {
                this.isLogin = true
            } 
        }
        this.inviteObj = {
            id: param.id
        }
        this.checkIsReg().then(() => {
             this.getConfig()
        })

      
    },
    methods: {
        getCodeImg () {
            var params = {
                DeviceUniqueNumber: this.onlyCode
            }
            this.$store.dispatch('inviteParents/GetCodeImg', params).then(
                res => {
                    this.codeImg = res
                }
            )
        },
        get_uuid () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
        
            var uuid = s.join("");
            localStorage.onlyCode = uuid
            return uuid;
        },
        getConfig () {
            var self = this
             GetConfig().then((data) => {
                //  alert(data)
                var data =JSON.parse(data);
                console.log(data) 
                if(data.Code==200){
                //   alert(data)
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.Data.appId, // 必填，公众号的唯一标识
                        timestamp:data.Data.timestamp , // 必填，生成签名的时间戳
                        nonceStr: data.Data.nonceStr, // 必填，生成签名的随机串
                        signature: data.Data.signature,// 必填，签名
                        jsApiList: [ // 必填，需要使用的JS接口列表
                        'chooseImage','uploadImage','getLocalImgData','getLocation','previewImage','startRecord',
                        'stopRecord','onVoiceRecordEnd','playVoice','uploadVoice','stopVoice', 'chooseWXPay',
                        'updateAppMessageShareData'
                        ] 
                    })

                  
                    wx.ready(function(res){
                        self.$vux.loading.hide()
                    
                         wx.updateAppMessageShareData({ 
                            title: '邀请家长', // 分享标题
                            desc: '[' + self.realName + ' ]正在邀请您成为[ ' + self.studentInfo.studentName +' ]的家长', // 分享描述
                            link: 'http://m.xueerqin.net/study/static/inviteParent.html?id=' + self.inviteObj.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'http://m.xueerqin.net/study/static/img/logo.png?a=1', // 分享图标
                            success: function () {
                                // 设置成功
                            }
                        })
                    });
                    wx.error(function(res){
                    
                        self.$vux.loading.hide()
                        alert(JSON.stringify(res))
                    });
                }   
            
            });
        },
        // 获取学生信息
        getStudentInfo () {
            var params = {
                id: this.getParam().studentId
            }
            this.$store.dispatch('inviteParents/GetStudentInfo', params).then(
                res => {
                    this.studentInfo  = res
                }
            )
        },
        checkIsReg () {
            return new Promise((resolve, reject) => {
                 var params = {
                    id: this.inviteObj.id
                }
                this.$store.dispatch('inviteParents/CheckParent', params).then(
                    res => {
                        if (res.isBind) {
                            var that = this
                            this.$vux.confirm.show({
                                content: '您已经绑定过该孩子，请勿重复绑定',
                                title: '提示',
                                showCancelButton: false,
                                onConfirm () {
                                    if (that.isLogin) {
                                        location.href="http://mappv2.xueerqin.net/home/#/index"
                                    } else {
                                        location.href="http://mappv2.xueerqin.net/Common/Login.shtml"
                                    }
                                }
                            })
                        }
                        this.inviteObj.relationShipName = res.relationShipName
                        this.inviteObj.className = res.className
                        this.inviteObj.schoolName = res.schoolName
                        this.inviteObj.phoneNum = res.phone
                        this.inviteObj.parentName = res.parentName
                        this.studentInfo = res
                        this.isRegistered = res.isRegistered
                        resolve()
                    }
                )
            })
        },
        // 获取参数
        getParam(){
            var search = location.search
            search = search.substring(1)
            var arr = search.split('&')
            var param = {}
            for(var item of arr){
                var list = item.split('=')
                param[list[0]] = list[1]
            }
            return param
        },
        closeModel () {
            this.$refs.shareModel.style.display = 'none'
        },
        getCode () {
            if (!this.picCode) {
                this.$vux.toast.text('请输入图片验证码')
                return
            }
            var params = {
                Phone: this.inviteObj.phoneNum,
                DynamicCode: this.picCode,
                DeviceUniqueNumber: this.onlyCode
            }
            this.$store.dispatch('inviteParents/CheckCode', params).then(
                res => {
                    debugger
                    this.rightPhoneCode = res
                    this.isGetCode = true
                    this.downSecond()
                }
            )
        },
        downSecond () {
            this.seconds = 60
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
                        this.conectParent()
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
            if (!this.isRegistered) {
                this.regParent()
            } else {
               this.getParentsList() 
            }
            //this.conectParent()
        },
        regParent () {
            var params = {
                id: this.inviteObj.id,
                code: this.phoneCode
            }
            this.$store.dispatch('inviteParents/RegisterParent', params).then(
                res => {
                    var that = this
                    this.$vux.confirm.show({
                        content: '已为您自动注册，账号是您的手机号码，密码为手机尾号后6位。',
                        title: '提示',
                        showCancelButton: false,
                        onConfirm () {
                            that.getParentsList()
                        }
                    })
                }
            )
        },
        conectParent () {
            var params = {
                id: this.inviteObj.id,
                code: this.phoneCode
            }
            this.$store.dispatch('inviteParents/ConnectParent', params).then(
                res => {
                    this.joined = true
                    var that = this
                    this.$vux.confirm.show({
                        content: '关联成功，快去登录骆米校园看看吧！',
                        title: '提示',
                        showCancelButton: false,
                        onConfirm () {
                           // location.href="http://mappv2.xueerqin.net/Common/Login.shtml"
                            if (that.isLogin) {
                                location.href="http://mappv2.xueerqin.net/home/#/index"
                            } else {
                                location.href="http://mappv2.xueerqin.net/Common/Login.shtml"
                            }
                        }
                            
                    })
                }
            )
        },
        cancel () {
            this.isconnect = false
            // location.href="http://mappv2.xueerqin.net/Common/Login.shtml"
            if (this.isLogin) {
                location.href="http://mappv2.xueerqin.net/home/#/index"
            } else {
                location.href="http://mappv2.xueerqin.net/Common/Login.shtml"
            }
        },
        inputBlur () {
            window.scrollTo(0, 0)
        },
        destroyed () {
            localStorage.isMine = false
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
    .reminded{
        width:6.40rem;
        height:0.80rem;
        background: #999;
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
        overflow: auto;
        .box{
            position: relative;
            top: 2rem;
            width: 6.1rem;
            margin: 0 auto;
            background: #fff;
            border-radius: 0.15rem;
            box-sizing: border-box;
            z-index: 1200;
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
                    max-height: 3rem;
                    overflow: auto;
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