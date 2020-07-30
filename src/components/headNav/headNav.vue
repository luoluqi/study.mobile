<template>
    <div id="head" style="">
        <div class="head-space"></div>
        <div class="nvagter">
            <img v-if="isBack" @click="back" class="arrow_index" src="./img/arrow-ji.png" />
            <span>{{title}}</span>
            <img v-if="isHome"  @click="home"  class="index" src="./img/shou.png" />
            <img v-else  @click="login"  class="index" src="./img/shou.png" />
        </div>
    </div>
</template>
<script>

export default {
   

    components: {
    
  },

  props:{
      title:{
          type:String
      },
    isBack:{
        type:Boolean,
        default:true
    },
    isHome:{
        type:Boolean,
        default:true
    }
  },
  data(){
      return {
         
      }
  },
  methods:{
      
    randomNum(min = 0, max = 100, len = 0) {
        return Number((min + (max - min) * Math.random()).toFixed(len));
    },
    randomStr(){

        let str = '';
        let list = '0123456789abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 8; i++) {
            let index = this.randomNum(0, 35);
            let word = list[index];
            if (isNaN(word) && this.randomNum() < 50) {
            word = word.toUpperCase();
            }
            str += word;
        }
        return str;

    },
    back(){

      

         console.log(this.$router)
        console.log(this.$route)
        if(this.title=="设置"){
            this.$router.push('/menu/index')
        }else if(this.title=="充值"){
            this.$router.replace('/schoolAccount/index')
        }else if (this.title=="套餐中心") {
             this.$router.push('/menu/index')
        }else if (this.title=="校园账户") {
             this.$router.push('/settings/setUp')
        }
        else{
            this.$router.go(-1)
        }

      
        
    },

    home(){
       
        this.$router.push('/menu/index')
    },
    login(){
        location.href="http://mappv2.xueerqin.net/Common/Login.shtml";
    }
  }
 
}
</script>
<style scoped src="./css/head.css">

</style>

