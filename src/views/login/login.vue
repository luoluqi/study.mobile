<template>
    <div class="container" style="">
        <div id="login" class="loginBk">
            <div class="logo">
              
                <img src="@/assets/img/login/logo.png" />
            </div>
            <div class="login">
                <ul style="padding: 0;">
                    <li>
                        <img src="@/assets/img/login/rt.png" />
                        <input type="text" v-model="loginName" placeholder="手机号" />
                    </li>
                    <li>
                        <img src="@/assets/img/login/pass.png" />
                        <input type="password"  v-model="loginPwd" placeholder="6-20位数字及字母格式密码" />
                        <!-- <samp class="eye-img" onclick="showPass(event)"></samp> -->
                    </li>
                </ul>
            </div>
            <div class="sub" id="cslogin" v-on:click="login">
                <a>登录</a>
            </div>
            <div class="forgot">
                <a href="http://mpersonal.xueerqin.net/UserCenter/RegainPassword">忘记密码</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            loginName: '',
            loginPwd: '',
            // https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
            authLoginUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8a1dedca1e981275&redirect_uri=&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect',
        }
    },
    methods: {
        login () {
   
        }
    }
}
</script>
<style scoped>
  .login ul li {
            position: relative;
        }
            .login ul li samp {
                position: absolute;
                right: 0.4rem;
                top: 0.45rem;
                display: inline-block;
                width: 0.28rem;
                height: 0.18rem;
                background: url('../../assets/img/login/eye.png') no-repeat 0 0;
                background-size: cover;
            }
         #loginPwd:focus+samp {
                display: inline-block;
            }

.container {
    background-image: url(../../assets/img/login/body.jpg);
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 100% 12.8rem;
    min-height: 10rem;
    height:100%;
}

.logo {
    width: 1.7rem;
    height: 1.79rem;
    margin: 1.2rem auto;
}

    .logo img {
        width: 1.7rem;
        height: 1.79rem;
    }

.login {
    width: 5.68rem;
    margin: 0 auto 0 auto;
    overflow: hidden;
    padding: 1.95rem 0 0 0;
}

    .login li {
        border-bottom: 0.01rem solid #dedede;
        overflow: hidden;
        padding: 0.4rem 0;
        font-size: 0;
    }

    .login img {
        max-width: 0.3rem;
        float: left;
        max-height: 0.36rem;
    }

    .login span {
        font-size: 0.28rem;
        padding: 0 0.25rem;
        float: left;
        line-height: 0.3rem;
        width: 4rem;
        color: #999;
    }

    .login i {
        display: block;
        float: right;
        width: 0.28rem;
        height: 0.14rem;
        background: url(/Images/Common/a-d.png) no-repeat;
        background-size: 0.28rem 0.14rem;
        margin-top: 0.1rem;
        margin-right: 0.2rem;
    }

    .login input {
        float: left;
        border: none;
        width: 4rem;
        padding: 0 0.25rem;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.28rem;
        color: #999;
    }

.sub {
    width: 6.32rem;
    margin: 0.5rem auto 0 auto;
}

    .sub a {
        width: 100%;
        height: 0.84rem;
        line-height: 0.84rem;
        text-align: center;
        display: block;
        border-radius: 0.8rem;
        background: #0e98f2;
        color: #fff;
        font-size: 0.32rem;
    }
.forgot {
    padding: 0.2rem 0.6rem;
    font-size: 0.28rem;
    line-height: 0.28rem;
}

    .forgot a {
        float: right;
        background: url(../../assets/img/login/wj-ico.png) no-repeat left center;
        height: 0.32rem;
        background-size: 0.32rem 0.32rem;
        padding-left: 0.4rem;
        display: block;
        color: #999;
    }
</style>
