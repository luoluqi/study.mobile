<template>
    <div id="allquestionTypes" >
		<headNav title="选择单元"></headNav>
	<div class="obj_ss">
		<p>学科：{{$store.state.study.subjectName}}</p>
		
		
		<div class="zhangList">
			<ul>
				<li @click="selectUnit(item.id,item.name)"
				v-for="(item,index) in unitList"
				:key="index"
				:class="{ 'zhangactive': unitId == item.id}"
				>{{item.name}}</li>
				
			</ul>

			<div v-if="unitList.length == 0" class="no-data">
				<img class="no-data-img" src="@/assets/img/n_date.png" alt="">
			</div>
		</div>
		
	</div>
   <div class="start-space"></div>
    <div class="start-p">
	<div @click="spring" class="start">无单元跳过</div>
    </div>
</div>
</template>
<script>


import headNav from '@/components/headNav/headNav'

import {getBookEdition,getBook,getCourseUnit,getChapter} from "@/api/studyApi"
export default {
	 components:{
      
        headNav
    },
	data(){
		return {
		

			unitList:[],
			unitId:0,

			
		}
	},

	methods:{
		

		

		selectUnit(unitId,unitName){
            this.$store.state.study.unitId = unitId;
            this.$store.state.study.unitName = unitName;

            this.$router.push("selectChapter");
		},

		spring(){
			 this.$store.state.study.unitId = "";
            this.$store.state.study.unitName = "";

            this.$router.push("selectChapter");
		}

	
	},
	
	mounted(){
        var bookId = this.$store.state.study.bookId;
		getCourseUnit(bookId).then((data) => {
            console.log(data);
            this.unitList = data.data;
        });
	}
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style>

</style>
