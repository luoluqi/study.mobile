<template>
    <div id="allquestionTypes" >
		<headNav title="选择课本"></headNav>
	<div class="obj_ss">
		<p>学科：{{$store.state.study.subjectName}}</p>
		
		<div class="zhangList">
			<ul>
				<li @click="selectBook(item.id,item.name)" 
					v-for="(item,index) in bookList"
					:key="index"
					:class="{ 'zhangactive': bookId == item.id}"
					>{{item.name}}</li>
				
				
			</ul>
			<div v-if="bookList.length == 0" class="no-data">
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
			

			bookList:[],
			bookId:0,

		
		}
	},

	methods:{

        selectBook(bookId,bookName){

            this.$store.state.study.bookId = bookId;
            this.$store.state.study.bookName = bookName;
			
			 this.$router.push("selectUnit");
		},
		

	

		
	},
	
	mounted(){
		getBook({
            editionId:this.$store.state.study.editionId,
            subjectId:this.$store.state.study.subjectId,
            gradeId:this.$store.state.user.gradeId
        }).then((data) => {
            console.log(data);
            this.bookList = data.data;
        });
	}
}
</script>


<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style>

</style>
