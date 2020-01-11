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
    back(){
        
         if(this.title=="设置"){
             location.href="http://mappv2.xueerqin.net/home/#/index";
         }else{
             this.$router.go(-1)
         }
        
    },

    home(){
        location.href="http://mappv2.xueerqin.net/home/#/index";
    },
    login(){
        location.href="http://mappv2.xueerqin.net/Common/Login.shtml";
    }
  }
 
}
</script>
<style scoped src="./css/head.css">

</style>

