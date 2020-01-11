<template>
    <div ref="scrollDiv" @scroll="handleScroll" class='main-con'>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:{
        // style:{
        //       type:String,
        //     default:''
        // }
    },
    data () {
        return {
            canLoadMore: true,
            scrollTop: 0
        }
    },
    methods: {
        handleScroll (e) {
            if (!this.canLoadMore) {
                return
            }
			var div = e.target
			var scrollHeight = div.scrollHeight
			var scrollTop = div.scrollTop 
			var clientHeight = div.clientHeight 
            // console.log(scrollHeight, clientHeight, scrollTop)
            if(scrollHeight == clientHeight){
                return
            }
            if (scrollHeight - clientHeight - scrollTop < 30) {
                
                this.$emit('loadMore')
                this.canLoadMore = false
                setTimeout(() => {
                    this.canLoadMore = true
                }, 1000)
            }

			this.scrollTop = scrollTop
		}
    },
    activated () {
         this.$refs['scrollDiv'].scrollTop = this.scrollTop
    }    
}
</script>
<style scoped>
.main-con{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}
</style>
