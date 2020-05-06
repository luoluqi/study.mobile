<template>
  <div style="font-size:0">
    <img class="previewer-demo-img" v-for="(item, index) in list" :key="index" :src="item.src" width="100" @click="show(index)">
    <div v-transfer-dom>
      <previewer  @on-close="imgClose" :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
  </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  methods: {
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$store.commit('media/changeModel', false)
      this.$refs.previewer.show(index)
    },
    imgClose () {
      this.$store.commit('media/changeModel', true)
    }
  },
  props:{
       list:{
            type:Array,
            default: () => []
        }
  },
  data () {
    return {
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  }
}
</script>
<style scoped>
.previewer-demo-img{
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 0;
    margin:0 0.16rem 0.16rem 0;
    object-fit: cover;
}
</style>>
  