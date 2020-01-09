<template>
    <div id="questionTypes">
		<headNav title="选择模式"></headNav>
	<div class="questionTypes">
		<div @click="toQueType" class="qiang1 qiangti">
			<p style="color: #10a9dc;">题型强化练习</p>
			<h2>可选择指定题型进行针对练习</h2>
		</div>
		<div  @click="toChapter" class="qiang2 qiangti">
			<p style="color: #1ecca8;">章节强化练习</p>
			<h2>可选择指定章节进行针对练习</h2>
		</div>
		<div  @click="toKnow" class="qiang3 qiangti">
			<p style="color: #508af4;">知识点强化练习</p>
			<h2>针对学生错题集中只是点推送同类习题</h2>
		</div>
		<div  @click="toDiffuct" class="qiang4 qiangti">
			<p style="color: #847ff7;">难题强化练习</p>
			<h2>学生所在年级学科难题针对练习</h2>
		</div>
		<div  @click="toRandom" class="qiang5 qiangti">
			<p style="color: #fba540;">随机强化练习</p>
			<h2>从题库中随机调取试题进行训练</h2>
		</div>
	</div>
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
	 components:{
      
        headNav
    },
    methods:{
        toQueType(){
			this.$store.state.study.type = "queType";

            this.$router.push("queType");
		},
		toChapter(){
			this.$store.state.study.type = "chapter";

			this.$router.push("selectEdition");
		},
		toKnow(){
			this.$store.state.study.type = "know";

			this.$router.push("question");
		},
		toDiffuct(){
			this.$store.state.study.type = "diffuct";

			this.$router.push("question");
		},
		toRandom(){
			this.$store.state.study.type = "random";
			this.$router.push("question");
		}
    }
}
</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>
<style scoped>

</style>
