<template>
    <div class="main">
        <headNav title="考勤查询"></headNav>
        <div class="oneCheck">
            <div class="c-top">
                <div class="c-left">
                    <div class="imgBox">
                        <img src="@/assets/img/nuomiLogo.png" alt="">
                    </div>
                    <div>
                        <p>{{itemData.schoolName}}</p>
                        <p class="time">{{itemData.inOutTime | formatDateTime('YYYY-MM-DD')}}</p>
                    </div>
                </div>
                <div class="c-right">
                    考勤通知
                </div>
            </div>
            <div class="c-content">
                您的孩子
                <span v-if="itemData.attenceDirection == 2">离校</span> 
                <span v-if="itemData.attenceDirection == 1">进校</span> 
                啦！{{itemData.studentName}}于{{itemData.inOutTime | formatDateTime('YYYY-MM-DD HH:mm')}}
                 <span v-if="itemData.attenceDirection == 2">离校</span> 
                <span v-if="itemData.attenceDirection == 1">进校</span> 。
            </div>
            <div class="lookimg">
               <img :src="itemData.snapPhotos" alt="">
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
    data() {
        return {
            itemData:''
        }
    },
    mounted(){
        this.itemData =  this.$store.state.checkingIn2.itemData
    }
}
</script>
<style src="./css/public.css" scoped></style>
<style  scoped>
   .lookimg{
       margin-top: 0.12rem;
       width: 100%;
       text-align: center;
   }
   .lookimg img{
       max-width: 100%;
   }
</style>