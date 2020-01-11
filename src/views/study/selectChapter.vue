<template>
    <div id="allquestionTypes" >
		<headNav title="选择章节"></headNav>
	<div class="obj_ss">
		<p>学科：{{$store.state.study.subjectName}}</p>
		
		
		<div class="zhangList">
			<ul>
				<li @click="selectChapter(item.chapterId)"
					v-for="(item,index) in chapterList"
					:key="index"
					:class="{ 'zhangactive': chapterId == item.chapterId}">
					{{item.chapterName}}
				</li>
				
			</ul>

			<div v-if="chapterList.length == 0" class="no-data">
				<img class="no-data-img" src="@/assets/img/n_date.png" alt="">
			</div>
		</div>
	</div>
	<div class="start-space"></div>
    <div class="start-p">
		<div @click="toStudy" class="start">开始练习</div>
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
			

			chapterList:[],
			chapterId:0
		}
	},

	methods:{
		

	

		selectChapter(chapterId){
			
			this.chapterId = chapterId;

			this.$store.state.study.chapterId = chapterId
		},

		toStudy(){
			if(this.chapterId){
				this.$router.push("question");
			}else{
				this.$vux.toast.text('请选择章节', 'top')
			}
			
		}
	},
	
	mounted(){
		var param = {};
		param.schoolBookId = this.$store.state.study.bookId
		if(this.$store.state.study.unitId){
			param.courseUnitId = this.$store.state.study.unitId
		}

		this.chapterId = null;
		this.$store.state.study.chapterId = null;


		getChapter(param).then((data) => {
            console.log(data);
            this.chapterList = data.data;

        });
	}
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style>

</style>
