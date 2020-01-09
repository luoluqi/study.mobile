<template>
    <div>
        <div v-if="news.newsImg"  @click="toDetail" class="new-item">
            <img class="new-img" :src="news.newsImg | imgUrl" alt="">
            <div class="new-info">
                <div class="new-title">{{news.newsTitle}}</div>
                <div class="new-date">{{news.createDate | formatDateTime('yyyy-MM-dd HH:mm')}}</div>
                <div class="count-item">
                    <img class="eye-img" src="@/assets/img/partyBuild/eye.png" alt="" srcset="">
                    {{news.viewNumber | count}}
                </div>
                <div  class="count-item">
                    <img class="say-img" src="@/assets/img/partyBuild/say.png" alt="" srcset="">
                     {{news.commentCount  | count}}
                </div>
                <div  class="count-item">
                    <img class="zan-img" src="@/assets/img/partyBuild/zan.png" alt="" srcset="">
                   {{news.thumbupCount  | count}}
                </div>
            </div>
        </div>
        <div v-else @click="toDetail" class="new-item">
             <div class="new-title">{{news.newsTitle}}</div>
                <div class="new-date">{{news.createDate | formatDateTime('yyyy-MM-dd HH:mm')}}</div>
                <div class="count-item">
                    <img class="eye-img" src="@/assets/img/partyBuild/eye.png" alt="" srcset="">
                    {{news.viewNumber | count}}
                </div>
                <div  class="count-item">
                    <img class="say-img" src="@/assets/img/partyBuild/say.png" alt="" srcset="">
                    {{news.commentCount  | count}}
                </div>
                <div  class="count-item">
                    <img class="zan-img" src="@/assets/img/partyBuild/zan.png" alt="" srcset="">
                    {{news.thumbupCount  | count}}
                </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        news:{
            type:Object,
            default:{}
        }
    },
    methods:{
        toDetail(){
            this.$store.commit('news/setCurNews',this.news)
            this.$router.push('detail')
        }
    }
}
</script>
<style scoped>
.new-item{
    padding: 0.32rem;
    background: #fff;
    border-bottom: 1px solid #dddddd;
}
.new-img{
    display: inline-block;
    vertical-align: top;
    width: 1.9rem;
    height: 1.58rem;
    object-fit: cover;
}
.new-info{
    display: inline-block;
    vertical-align: top;
    width: 4.48rem;
    padding: 0 0 0 0.1rem;
}
.new-title{
    color: #222222;
    font-size: 0.28rem;
     word-break: break-word;
        white-space: pre-wrap;
     /*! autoprefixer: off */
     display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    /*! autoprefixer: on */
}
.new-date{
    padding: 0.1rem 0;
    color: #b7b7b7;
}
.eye-img{
    display: inline-block;
    width: 0.28rem;
    height: 0.18rem;
}
.say-img{
     display: inline-block;
    width: 0.28rem;
    height: 0.18rem;
}
.zan-img{
    display: inline-block;
    width: 0.21rem;
    height: 0.20rem;
}
.count-item{
    display: inline-block;
    margin: 0 0.2rem 0 0;
    color: #b7b7b7;
        width: 1.2rem;
}

</style>