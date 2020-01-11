<template>
     <!--判断-->
  
          
            <div class="tiDetail">
                <h1>题型：判断</h1>
                <div class="ss_s_z-h-d b-1">
                    <h2 v-html="question.questionText"></h2>
                    <ul>
                        <li v-for="(item,index) in question.options[0]" :key="item.questionId">
                            <label><input :key="question.questionId + index" @change="changeAns(item.optionValue)" type="radio" name="bd"><span></span>{{item.optionValue}}</label>
                        </li>

                        <!-- <li>
                            <label class=" checkedOn"><input checked="checked" type="radio" name="bd"><span></span>错</label>
                        </li> -->


                       


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
        changeAns(val){
            
            this.$store.state.study.answer = [val]
        }
    }
}
</script>


<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>

</style>
