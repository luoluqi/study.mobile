<template>
    <div id="allquestionTypes" >
		<headNav title="选择章节"></headNav>
	<div class="obj_ss">
		<p>学科：{{$store.state.study.subjectName}}</p>
		<div class="zhangList">
			<ul>
				<li @click="selectEdition(item.examSchoolBookEditionId)" 
				v-for="(item,index) in editionList" 
				:key="index" :class="{ 'zhangactive': editionId == item.examSchoolBookEditionId}">
					{{item.name}}
				</li>
				
				
			</ul>
		</div>
		<div class="zhangList">
			<ul>
				<li @click="selectBook(item.id)" 
					v-for="(item,index) in bookList"
					:key="index"
					:class="{ 'zhangactive': bookId == item.id}"
					>{{item.name}}</li>
				
				
			</ul>
		</div>
		<div class="zhangList">
			<ul>
				<li @click="selectUnit(item.id)"
				v-for="(item,index) in unitList"
				:key="index"
				:class="{ 'zhangactive': unitId == item.id}"
				>{{item.name}}</li>
				
			</ul>
		</div>
		<div class="zhangList">
			<ul>
				<li @click="selectChapter(item.chapterId)"
					v-for="(item,index) in chapterList"
					:key="index"
					:class="{ 'zhangactive': chapterId == item.chapterId}">
					{{item.chapterName}}
				</li>
				
			</ul>
		</div>
	</div>
   
	<div @click="toStudy" class="start">开始练习</div>
    
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

			bookList:[],
			bookId:0,

			unitList:[],
			unitId:0,

			chapterList:[],
			chapterId:0
		}
	},

	methods:{
		selectEdition(editionId){
			
			this.editionId = editionId;

			getBook({
				editionId:editionId,
				subjectId:this.$store.state.study.subjectId,
				gradeId:this.$store.state.user.gradeId
			}).then((data) => {
				console.log(data);
				this.bookList = data.data;
			});
		},

		selectBook(bookId){
			this.bookId = bookId;

			getCourseUnit(bookId).then((data) => {
				console.log(data);
				this.unitList = data.data;
			});

		},

		selectUnit(unitId){
			this.unitId = unitId;
			getChapter({
				schoolBookId:this.bookId,
				courseUnitId:unitId
				
			}).then((data) => {
				console.log(data);
				this.chapterList = data.data;

			});
		},

		selectChapter(chapterId){
			
			this.chapterId = chapterId;

			this.$store.state.study.chapterId = chapterId
		},

		toStudy(){

			this.$router.push("question");
		}
	},
	
	mounted(){
		var schoolId = this.$store.state.user.schoolId;
		getBookEdition(schoolId).then((data) => {
			console.log(data);
			this.editionList = data.data;
		});
	}
}
</script>


<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style>

</style>
