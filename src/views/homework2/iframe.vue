<template>
    <div>
         <headNav title="链接详情"></headNav>
         <div class="iframeBox">
             <iframe  name = "child" id = "child" :src="iframeUrl" frameborder="0" > </iframe>
         </div>
        

    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav';
export default {
    components:{
       headNav
    },
    data(){
        return {
           iframeUrl:''
        }
    },
    mounted(){
       this.iframeUrl = this.$store.state.homework2.iframeUrl
    }
}
</script>
<style scoped>
.iframeBox{
    height: calc(100% - 0.88rem);
}
.iframeBox iframe{
   height: 100%;
   width: 100%;
   overflow: auto;
}
</style>