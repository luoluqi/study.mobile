<template>
    <div id="allquestionTypes" style="background-color: #FFFFFF;padding-bottom: 0.5rem;">
        <headNav title="选择题型"></headNav>
    <div class="allquestionTypes">

     
        <ul>
            <li v-for="(item,index) in channelList" :key="item.channelTypeId"  v-show="index < 3">
                
                           
                <input @change="changeBox($event,item.channelTypeId)" :id="'color-input-bule'+item.channelTypeId" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label :for="'color-input-bule'+item.channelTypeId"></label>
                <label :for="'color-input-bule'+item.channelTypeId" class="la-1">{{item.channelTypeName}}</label>
            </li>
            <!-- <li>
                <input id="color-input-bule1" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule1" class="la-1">多选题</label>
            </li>
            <li>
                <input id="color-input-bule2" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule2" class="la-1">判断题</label>
            </li> 
            <li>
                <input id="color-input-bule3" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule3" class="la-1">填空题</label>
            </li>
            <li>
                <input id="color-input-bule4" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule4" class="la-1">阅读理解</label>
            </li>
            <li>
                <input id="color-input-bule5" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule5" class="la-1">问答题</label>
            </li>
            <li>
                <input id="color-input-bule6" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule6" class="la-1">选词填空（词汇运用）</label>
            </li>
            <li>
                <input id="color-input-bule7" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule7" class="la-1">文言文阅读</label>
            </li>
            <li>
                <input id="color-input-bule8" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule8" class="la-1">连词成句</label>
            </li>
            <li>
                <input id="color-input-bule9" class="ss_color-input-bule_type" type="checkbox" name="color-input-red" value="#f0544d" />
                <label></label>
                <label for="color-input-bule9" class="la-1">单词拼写（词汇运用）</label>
            </li>-->
        </ul>
    </div>
    <div class="bottom-con">
        <div @click="toQuestion" class="start">开始练习</div>
    </div>
    <div class="bottom-space"></div>
</div>
</template>
<script>

import {getAllChannelTypeList} from "@/api/studyApi"
import headNav from '@/components/headNav/headNav'




export default {
     components:{
      
        headNav
       
    },
    data(){
        return {
            value:[],
            channelList:[],
            questionChannelTypes:[]
        }
    },
    methods:{
        toQuestion(){
            
            if( this.questionChannelTypes.length == 0){
                this.$vux.toast.text('至少选择一个题型', 'top')
                return ;
            }
            this.$store.state.study.questionChannelTypes = this.questionChannelTypes;
            this.$router.push("question");
        },
        changeBox(e,id){
           
            var checked = e.target.checked;
            if(checked){
                this.questionChannelTypes.push(id);
            }else{
                for(var i = this.questionChannelTypes.length - 1; i>=0; i--){
                    if(this.questionChannelTypes[i] == id){
                        this.questionChannelTypes.splice(i,1);
                    }
                }
            }

             console.log(this.questionChannelTypes);
        }
    },

    mounted() {
        // getAllChannelTypeList().then((data) => {
        //     console.log(data.data);
        //     this.channelList = data.data;
        // });

         this.channelList = this.$store.state.channelTypeList;
    },
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>
.bottom-con{
    position: absolute;
    width: 100%;
    bottom:0;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
}
.bottom-space{
    height: 1rem;
}
</style>
