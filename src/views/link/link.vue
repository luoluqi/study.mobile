<template>
    <div>
        <!-- <headNav title="链接详情"></headNav> -->
        <iframe frameborder='0' height='100%' width="100%" :src="src"></iframe>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
    components: {
        headNav
    },
    computed:{
        src(){
            return this.$store.state.link.src
        }
    }
}
</script>
<style scoped>

</style>
