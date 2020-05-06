<template>
    <div class="container">
        <headNav title="帮助视频"></headNav>
        <div class="help-con">
         <infiniteScroll  @loadMore="loadMore">
        <div @click="toDetail(item)" 
        v-for="(item, index) in list"
        :key="index"
         class="help-item">
            <img :src="item.Img" alt="" class="help-img">
            <div class="help-title">{{item.Title}}</div>
        </div>
          

         <div class="load-p">
			 <load-more v-if="isMore" :tip="'正在加载'"></load-more>
    		<load-more v-else :show-loading="false" :tip="'没有更多了'" background-color="#fbf9fe"></load-more>
		</div>
         </infiniteScroll>
         </div>
    </div>
</template>
<script>
import {getHelpList} from '@/api/helpApi'
import infiniteScroll from '@/components/infiniteScroll'
import { LoadMore} from 'vux'
import headNav from '@/components/headNav/headNav'
export default {
    components: {
        headNav,
        infiniteScroll,
        LoadMore
    },
    computed: {
        roleCode () {
            //Teacher Parent
            return this.$store.getters['user/roleCode']
        },
        schoolId () {
            return this.$store.state.user.schoolId
        },
        isSchoolAdmin () {
            //Teacher Parent
            return this.$store.state.user.isSchoolAdmin
        }
    },
    data(){
        return {
            isMore: true,
            pageSize: 10,
            pageIndex: 0,
            list: []
        }
    },
    methods:{
        toDetail(item){
            this.$store.state.help.help = item
            this.$router.push('detail')
        },
        getList () {
            if (!this.isMore) {
                return
            }
            this.pageIndex ++
            var params = {
                schoolId: this.schoolId,
                pageSize: this.pageSize,
                pageIndex: this.pageIndex
            }
           
            if (this.roleCode == 'Parent') {
                params.type = 1
            } else {
                params.type = 2
            }
            getHelpList(params).then(res => {
                console.log(res)
                var arr = res.Data.List
                this.list = this.list.concat(arr)
                if(arr.length < this.pageSize) {
                    this.isMore = false
                }
            })
        },
        loadMore () {
            this.getList()
        }
    },
    mounted () {
        this.getList()
    }
}
</script>
<style scoped>
.container{background: #fff;}
.help-con{height: calc(100% - 0.88rem);}
.help-item{display: inline-block;vertical-align: top;width: 3.26rem;padding: 0.35rem 0 0 0.2rem;}
.help-img{object-fit:cover;width: 3.26rem;height:2.06rem;}
.help-title{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
text-align: center;
font-size: 0.28rem;color:#333;padding:0.2rem 0 0 0;}
.load-p{
	padding: 1rem 0 0 0;
}
</style>