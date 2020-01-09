<template>
     <!--多选-->
  
           
            <div class="tiDetail">
                <h1>题型：多选</h1>
                <div class="ss_s_z-h-d">
                    <h2 v-html="question.questionText"></h2>
                   
                    <ul>

                        


                        <li v-for="(item, index) in question.options[0]" :key="item.questionId">
                            <input :key="question.questionId + index" @change="changeAns($event,item.optionKey)" :id="'color-input-bule' + index" class="ss_color-input-bule" type="checkbox" name="color-input-red" value="#f0544d" />
                            <label></label>
                            <label :for="'color-input-bule' + index" class="la-1"  v-html="item.optionKey + '．' +item.optionValue"></label>
                        </li>
                       
                    </ul>
                </div>
            </div>
            
     
</template>
<script>

import {mapState} from 'vuex'
export default {
     computed: {
        ...mapState({
            question: state => state.study.question
           
        })
    },

    methods:{
        changeAns(e,key){
            var checked = e.target.checked;
            console.log(checked,key);
            var answer = this.$store.state.study.answer;
            
            if(checked){
                answer.push(key);
                answer.sort();
            }else{
                for(var i = answer.length - 1;i>=0;i--){
                    if(answer[i] == key){
                        answer.splice(i,1);
                    }
                }
            }

            this.$store.state.study.answer = answer;
            
        }
    }
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>
img{max-width: 100%;}
</style>
