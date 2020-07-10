<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {GetConfig} from "@/api/commonApi"
export default {
  name: 'App',

  mounted(){
    // if (location.href.indexOf('&from=singlemessage') != -1) {
    //   var url = location.href.replace('&from=singlemessage', '')
    //   location.href = url
    //   return
    // }

    this.$vux.loading.show({
        text: '加载中'
    })
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
                this.$vux.loading.hide()
              
                

               
            });
            wx.error(function(res){
              
                this.$vux.loading.hide()
                alert(JSON.stringify(res))
            });
        }   
       
    });
  }
}
</script>

<style>
/* @import url('./style/reset.css'); */
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body{ font-size: 0.24rem;}
#app{
  width: 100%;
  height: 100%;
     
}
::-webkit-scrollbar  {  
  width: 0;   /* 滚动条宽度 */
  height: 0;  /* 滚动条高度 */
}
::-webkit-input-placeholder { /* WebKit browsers */
    color:#999;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#999;
}
.amap-logo{display: none !important;}
.amap-copyright{display: none !important;}
</style>
