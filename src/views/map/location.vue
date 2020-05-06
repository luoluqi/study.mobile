<template>
  <div >
     <amap @complete='complete'></amap>
     <div v-show="searchText" @click="cancelSearch" class="cancel-s">取消</div>
    
      <div class="func-p">
        <img @click="back" class="func-img" src="@/assets/img/map/back.png" alt="">
        <div>返回</div>
        <img @click="getLocation" class="func-img" src="@/assets/img/map/my.png" alt="">
        <div  @click="getLocation">我的</div>
        <img @click="refreshGPS" class="func-img" src="@/assets/img/map/track.png" alt="">
        <div  @click="refreshGPS">追踪</div>
        <a v-if="phone" :href="tel" :t='tel'>
          <img  class="func-img" src="@/assets/img/map/phone.png" alt="">
          <div style="color:#333;">电话</div>
        </a>
        <div v-else @click="noPhone">
           <img  class="func-img" src="@/assets/img/map/phone.png" alt="">
          <div >电话</div>
        </div>
      </div>
  </div>
</template>
<script>
import amap from '@/components/map'
import GPS from '@/util/gps'
import {getDevice, refreshGPS} from '@/api/mapApi'
  export default {
    components: {
      amap
    },
    computed:{
      tel(){
        return 'tel:' + this.phone
      },
      searchText () {
        return this.$store.state.map.searchText
      },
       studentId(){
         return this.$store.getters['user/studentId']
        //  return 'e0838d9a5bd54caf8a5a71db8ca2c6f2'
      },
      locationing () {
        return this.$store.state.map.locationing
      }
    },
    data() {
      return {
        phone: '',

      }
    },
   
    methods: {
      back(){
        this.$router.go(-1)
      }, 
       getLocation(){
        this.$store.dispatch('map/getLocation')
      },
      noPhone(){
        this.$vux.toast.text('学生没有电话', 'top')
      },
      complete(){
        console.log('complete...')
        var self = this
        this.$store.state.map.map.on('click', function(ev) {
          var lnglat = ev.lnglat;
          console.log(lnglat)
                                
          // self.$store.dispatch('map/childMarker', {lng: lnglat.lng, lat: lnglat.lat})
         
        })

       
       

        this.$store.dispatch('map/getLastGPS', this.studentId)
      },
      getDevice(){
        getDevice({
          StudentId:this.studentId
        }).then(res => {
          
          console.log(res)
          if(res){
            this.phone = res.phone 
          }
        })
      },
    
      refreshGPS () {
        if (this.locationing) {
          return
        }
        this.$store.dispatch('map/refreshGPS', this.studentId)
      },
      cancelSearch () {
        this.$store.state.map.searchText = ''
        this.$store.state.map.placeSearch.clear()
        document.getElementById('tipinput').value = ''
        if ( this.$store.state.map.childMarker) {
          this.$store.state.map.map.setFitView([this.$store.state.map.childMarker])
          
        }else{
          this.getLocation()
        }
      }
    },
     mounted () { 
       this.getDevice()
      
    },
    destroyed () {
      console.log('destroyed', window.interval)
      clearTimeout( window.interval)
     
    }
  }
</script>
<style scoped>

.func-p{
  position: absolute;
  width: 0.72rem;
  background: #fff;
  left:0.2rem;
  bottom:0.4rem;
  box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
  text-align: center;
  padding:0 0 0.2rem 0;
}
.func-img{
  width: 0.44rem;
  height:0.44rem;
  display: inline-block;
  margin: 0.2rem 0 0 0;
}
.func-text{
  font-size: 0.2rem;
  color:#333;
  display: inline-block;
  margin: 0rem 0 0.12rem 0;
}
  .amap-marker-label{
            border: 0;
            background-color: transparent;
        }
.cancel-s{
  position: absolute;
  z-index: 10;
    top: 0.4rem;
    right: 0.5rem;
    font-size: 0.28rem;
  cursor:pointer;
}

</style>