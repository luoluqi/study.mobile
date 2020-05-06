<template>
    <div>
        <headNav title='帮助详情'></headNav>
        <video class="video" :src="help.Video"  width="320" height="240" 
        controls="controls"
        controlslist='nodownload nofullscreen'
        ref='vidd'>
        Your browser does not support the video tag.
        </video>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
    components: {
        headNav
    },
    computed: {
        help () {
            return this.$store.state.help.help
        }
    },
    mounted () {
        this.$refs.vidd['disablePictureInPicture'] = true
    }
}
</script>
<style scoped>
.video{display: block;width: 100%;background: #000;margin: 50% 0 0 0;transform: translateY(-50%);}
</style>