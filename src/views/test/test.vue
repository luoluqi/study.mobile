<template>
    <div>
       sssssss
    <media @chooseImageSuccess="chooseImageSuccess"></media>
    </div>
</template>
<script>
   
import infiniteScroll from '@/components/infiniteScroll'
import selectTeacher from '@/components/selectTeacher'
import media from '@/components/media'
import { Swiper, Slide } from 'vue-swiper-component'
export default {
    components:{
       infiniteScroll,selectTeacher,
       Swiper,
       Slide,
       media

    },
    data(){
        return {
         
        }
    },

    methods:{
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
        comfirm () {
            console.log(this.$store.state.selectTeacher.teacherList)
        },
        
        chooseImageSuccess () {
            
            this.$store.dispatch('media/upload').then(() => {
                
                var a = this.$store.state.media.imgData
                console.log(this.$store.state.media)
            })
        }
    },
    mounted(){
        
      var a = this.getParam()
       
    }
}
</script>
<style scoped>
.aaa{height: 3rem;}
</style>