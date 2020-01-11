<template>
   
        <div class="process-p">
                <div class="proccess" :style="{width:percent*100+'%'}"></div>
            </div>
   
</template>
<script>
export default {
    props:{
        percent:{
            type:Number,
            default:0
        }
    }
}
</script>
<style scoped>
.process-p{display: inline-block;vertical-align: middle;width:3.46rem;height: 0.12rem;overflow: hidden;border-radius: 0.2rem;background: #e5e5e3;}
.proccess{background: #ffaf36;width: 0;height: 100%;}
</style>