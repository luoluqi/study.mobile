<template>
    <div style="background-color: #fff;">
        <div class="navBox">
            <div class="nav" :class="{'active': active == 0}" @click="jump('learningDetail')">
                学情分析
            </div>
            <span class="line">
                
            </span>
            <div class="nav" :class="{'active': active == 1}" @click="jump('learningTotal')">
                考情分析
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"examList",
    props: {
        active: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
        
        }
    },
    mounted () {
        
    },
    computed: {
      
    },
    methods:{
        jump (path) {
            this.$router.replace(path)
        }
    }
}
</script>
<style lang='less' scoped>
    .navBox{
        box-shadow:0px 2px 6px 0px rgba(13,45,62,0.1);
        .nav{
            position: relative;
            display: inline-block;
            height: 0.88rem;
            line-height: 0.88rem;
            color: #999;
            font-size: 0.26rem;
            text-align: center;
            width: 3.5rem;
        }
        .active{
             color: #128FEF;
            font-weight: bold;
        }
        .active::after{
            position: absolute;
            z-index: 1;
            left: 43%;
            bottom: 0;
            display: inline-block;
            height: 0.03rem;
            width: 0.5rem;
            background-color: #128FEF;
            content: "";
        }
        .line{
            display: inline-block;
            background: #ccc;
            border-radius: 0.01rem;
            width: 0.02rem;
            height: 0.5rem;
            padding: 0;
            position: relative;
            top: 0.18rem;
        }
    }

</style>