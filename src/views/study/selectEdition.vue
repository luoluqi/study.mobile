<template>
    <div id="allquestionTypes" >
		<headNav title="选择教材"></headNav>
	<div class="obj_ss">
		<p>学科：{{$store.state.study.subjectName}}</p>
		<div class="zhangList">
			<ul>
				<li @click="selectEdition(item.examSchoolBookEditionId,item.name)" 
				v-for="(item,index) in editionList" 
				:key="index" :class="{ 'zhangactive': editionId == item.examSchoolBookEditionId}">
					{{item.name}}
				</li>
				
				
			</ul>
			<div v-if="editionList.length == 0" class="no-data">
				<img class="no-data-img" src="@/assets/img/n_date.png" alt="">
			</div>
		</div>
		
		
		
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
			editionList:[],
			editionId:0,

			
		}
	},

	methods:{
		selectEdition(editionId,editionName){
			
            this.editionId = editionId;
            
            this.$store.state.study.editionId = editionId;
            this.$store.state.study.editionName = editionName;

            this.$router.push("selectBook");
			
		},

		

		

	
	
	},
	
	mounted(){
		var schoolId = this.$store.state.user.schoolId;
		var subjectId =  this.$store.state.study.subjectId
		getBookEdition({
			schoolId,subjectId
		}).then((data) => {
			console.log(data);
			this.editionList = data.data;
		});
	}
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>

</style>
