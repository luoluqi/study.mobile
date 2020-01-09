<template>
    <!--单选-->
   
           
            <div class="tiDetail">
                <h1>题型：单选</h1>
                <div class="ss_s_z-h-d b-1">
                    <h2 v-html="question.questionText"></h2>
                    <ul>
                        <li v-for="(item, index) in question.options[0]" :key="item.questionId" @click.capture="selectOpt($event)">
                            <label >
                                <input :key="question.questionId + index" @change="changeAns($event,item.optionKey)" :id="'opt-' + index"  type="radio" name="bd" ><span></span>
                                
                               
                                <label :for="'opt-' + index" v-html="item.optionKey + '．' +item.optionValue">
                                   
                                </label>
                            </label>
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
            
            this.$store.state.study.answer = [key]
        },
        selectOpt(e){
            console.log(e);
            console.log(e.target);
        }
    }
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>
img{max-width: 100% !important;}
</style>
