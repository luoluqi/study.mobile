<template>
    <div>
        <div class="content">
            <div>上传图片</div>
            <div class="photoBox">
                <div v-if="this.imgDataSource.length>0" class="workPhotoList">
             
                    <div class="onePhoto" v-for="(item,index) in imgDataSource" :key="index">
                        <img :src="item" alt="">
                        <span class="deleteIcon" @click="delImg(index)">
                            <img src="@/assets/img/oa/delete.png" alt="">
                        </span>
                    </div>
                </div>
                <div v-show="imgDataSource.length < 9" class="upload">
                    <img  @click="chooseImage" src="@/assets/img/oa/addImg.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import COS from '@/util/COS'
import {getLinkInfo} from '@/api/commonApi'
export default {
    computed: {
        imgDataSource () {
            return this.$store.state.media.imgDataSource
        }
    },
    data () {
        return {

        }
    },
    methods: {
        // 图片
        chooseImage(){
            this.$store.dispatch('media/chooseImage')
        },
        // 删除图片
        delImg(index){
           this.$store.commit('media/delImg', index)
        }
    },
    destroyed () {
        console.log('media destroyed...')
    }
}
</script>
<style scoped>
    .content{
       padding: 0.3rem 0.24rem 0 0.24rem;
       background: #fff;
    }
    .photoBox{
        padding-top: 0.3rem;
        overflow: hidden;
    }
    .workPhotoList{
        float: left;
        display: flex;
        margin: 0 -0.32rem;
        /* justify-content: space-between; */
        flex-wrap: wrap;
        width: 5rem;
    }
    .onePhoto{
        position: relative;
        width: 0.84rem;
        height: 0.84rem;
        border-radius: 0.08rem;
        margin-bottom: 0.3rem;
        padding: 0 0.32rem;
    }
    .onePhoto img{
        width: 100%; 
        height: 100%; 
        object-fit: cover;
    }
    .deleteIcon{
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-radius: 50%;
        background: rgba(0,0,0,0.3);
        color: #FFF;
        text-align: center;
        z-index: 101;
    }
    .upload{
        display: inline-block;
        float: right;
        width: 0.84rem;
        height: 0.84rem;
        margin-bottom: 0.3rem;
    }
    .upload img{
        width: 100%;
        height: 100%;
    }
</style>
