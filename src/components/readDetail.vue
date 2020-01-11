<template>
   <div class="tanDetail" >
            <div class="win"></div>
            <div class="modal">
                <div class="topTitle">查看详情</div>
                <div class="scollList">
                     <div class="pDetail">
                        <p class="weiRen"><span>未读</span><label>（{{unreadList.length}}人）</label></p>
                        <div class="nameList">
                            <ul>
                                <li v-for="(item,index) in unreadList" :key="index"><span>{{item.ParentName}}</span><label for="">（{{item.StudentNames}}）</label></li>
                            </ul>
                        </div>
                    </div>
                    <div class="pDetail">
                        <p class="weiRen"><span>已读</span><label style="color: #0a8de5;">（{{readList.length}}人）</label></p>
                        <div class="nameList">
                            <ul>
                                <li v-for="(item,index) in readList" :key="index"><span>{{item.ParentName}}</span><label for="">（{{item.StudentNames}}）</label></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chacha" @click="hide"><img src="@/assets/img/homeWork/bai-cha.png"/></div>
        </div>
</template>
<script>
export default {
    props:{
        unreadList:{
            type:Array,
            default:[]
        },
        readList:{
            type:Array,
            default:[]
        }
    },
    methods:{
        hide(){
            this.$emit('hide')
        }
    }
}
</script>
<style scoped>


.win{
    position:absolute;left:0px;top:0px;
    background:rgba(0, 0, 0, 0.4);
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:100%;
    filter:alpha(opacity=60);  /*设置透明度为60%*/
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    /* display:none;  */
    z-Index:999;  
}
.modal{ 
    position:absolute;
    width:6.46rem;
    height:8.95rem;
    top:1rem;
    left:50%;
    margin-left: -3.23rem;
    background-color:#fff;
    /* display:none; */
    cursor:pointer;
    z-Index:9999;  
    border-radius: 0.1rem;
}
.chacha{
    width: 0.56rem;
    height: 0.56rem;
    position: absolute;
    z-index: 9999;
    top: 10.5rem;
    left: 50%;
    margin-left: -0.28rem;
}
.chacha img{
    width: 0.56rem;
    height: 0.56rem;
    display: inline-block;
}
.topTitle{
    background: url(../assets/img/homeWork/tanTop.png) no-repeat;
    width: 100%;
    height: 0.8rem;
    background-size: 6.46rem 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    text-align: center;
    font-size: 0.32rem;
}
.weiRen{
    font-size: 0.32rem;
    padding: 0 0.24rem;
    line-height: 0.8rem;
}
.weiRen span{
    color: #333333;
}
.weiRen label{
    color: #f70000;
}
.nameList{
    padding: 0 0.24rem;
    line-height: 0.5rem;
    overflow: hidden;
}
.nameList li{
    float: left;
    width: 50%;
    font-size: 0.28rem;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
.nameList li span{
    color: #333333;
}
.nameList li label{
    color: #666666;
}
.scollList{
    overflow: auto;
    height: 7.6rem;
}
</style>