<template>
  <div >
      <div class='container' id="map"></div>
      <div class="search-p">
          <img class="search-img" src="@/assets/img/map/search.png" alt="" >
          <input id="tipinput" 
          @change="inputChange" class="search-input" type="text" placeholder="请输入要搜索的地址">
      </div>
       <div v-show="locationing" class="track-text">正在追踪({{locationCount}})...</div>
  </div>
</template>
<script>
  export default {
      name: 'amap',
    data() {
      return {
        map: null
      }
    },
    computed: {
      locationing () {
        return this.$store.state.map.locationing
      },
      locationCount () {
        return this.$store.state.map.locationCount
      }
    },
   
    methods: { 
        test(){
             this.$store.state.map.map.destroy()
             this.init()
        },
        init(){
          
            var self = this
            this.map = new AMap.Map('map', {
                zoom:3,//级别
                center: [116.397428, 39.90923],
                zoomEnable:true
                // center: [121.498586, 31.239637]
            
            })
            this.$store.state.map.map = this.map
            this.map.on('complete', function(){
                    // 地图图块加载完成后触发
                self.$emit('complete')
            })
            
            //输入提示
                var autoOptions = {
                    input: "tipinput"
                };
                var auto = new AMap.Autocomplete(autoOptions);
                var placeSearch = new AMap.PlaceSearch({
                    map: this.map
                });
                AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
                function select(e) {
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name);  //关键字查询查询
                }

                this.$store.state.map.placeSearch = placeSearch
        },
        inputChange (e) {
          console.log(e.target.value)
          this.$store.state.map.searchText = e.target.value 
        }
    },
    destroyed(){
      
    },
     mounted: function () {
         console.log('map mounted...', this.$store.state.map.map)
         if(this.$store.state.map.map){
            
                   
             setTimeout(() => {
                  this.$store.state.map.map.destroy()
                   this.init()
             }, 100)
         }else{
              this.init()
         }
         this.$store.state.map.createTime = ''
    }
  }
</script>
<style scoped>
.container{
  position:absolute;
  top:0;
  bottom: 0;
  right:0;
  left:0;
}
.search-p{
  background:#fff;
  width: 6.64rem;
  height:0.7rem;
  position: absolute;
  z-index: 10;
  top:0.2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0.1rem 0 rgba(0,0,0,0.3);
  border-radius: 0.1rem;
  border:1px solid #CDCDCD;
}
.search-input{
   height:100%;
  width:6rem;
  position: absolute;
  top:0rem;
  left:0.6rem;
  font-size: 0.28rem;
}
.search-img{
  width:0.32rem;
  height:0.32rem;
  position: absolute;
  top:0.2rem;
  left:0.16rem;
} 
.track-text{
  position: absolute;
  width: 50%;
  left: 25%;
  top: 2rem;
  background: #fff;
  text-align: center;
  padding: 0.2rem 0;
  box-shadow: 0 0 0.5rem 0 rgba(0,0,0,0.3);
}
</style>