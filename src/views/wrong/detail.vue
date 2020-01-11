<template>
    <div>
		<headNav title="题目详情"></headNav>
        <div class="obj_ss">
		<div class="s_z-h-d">
			<h2 v-html="question.questionText"></h2>
			<ul>
				<li v-for="(value,key) in question.options" :key="key">
					<input v-if="question.questionChannelType == 1" :id="key + question.questionId" class="color-input-bule" type="radio" name="color-input-red" value="#f0544d" />
					<input v-if="question.questionChannelType == 2" :id="key + question.questionId" class="color-input-bule" type="checkbox" name="color-input-red" value="#f0544d" />
					<input v-if="question.questionChannelType == 3" :id="key + question.questionId" class="color-input-bule" type="radio" name="color-input-red" value="#f0544d" />
					
					<label></label >
					<label :for="key + question.questionId" class="la-1" v-html="key+'．' + value"></label>	
				</li>


				
			</ul>
		</div>
		<div class="f-10">
			<div class="analysis">
				<ul>
					<li>
						<span class="correct">【正确答案】</span>
						<p>{{question.answer}}</p>
					</li>
					<li>
						<span class="kaodian">【考点】</span>
						<p><img :src="$store.state.imgSrc + question.knowledge" alt=""></p>
					</li>
					<li>
						<span class="jiexi">【解析】</span>
						<p><img :src="$store.state.imgSrc + question.explanation" alt=""></p>
					</li>
					
				</ul>
			</div>
		</div>
		<div class="analysis yl-119">
			<ul>
				<li>
					<span class="zhishi">题型：</span>
					<p>{{question.questionChannelType | channelType}}</p>
				</li>
				<li>
					<span class="zhishi">难易度：</span>
				
					<!-- 1：容易 2：较易  3：普通  4：较难 5：困难 -->
					<p v-show="question.difficultIndex == 1">容易</p>
					<p v-show="question.difficultIndex == 2">较易</p>
					<p v-show="question.difficultIndex == 3">普通</p>
					<p v-show="question.difficultIndex == 4">较难</p>
					<p v-show="question.difficultIndex == 5">困难</p>
					
				</li>
				<!-- <li>
					<span class="zhishi">学历：</span>
					<p>北师大语文三年级下册2018版</p>
				</li> -->
				<li>
					<span class="zhishi">年级：</span>
					<p>{{question.gradeName}}</p>
				</li>
				<li>
					<span class="zhishi">科目：</span>
					<p>{{$store.state.study.subjectName}}</p>
				</li>
				<li>
					<span class="zhishi" style="line-height:0.57rem;">知识点：</span>
					<p class="zhiList">
						<span v-for="(item,index) in question.pointNames" :key="index">{{item}}</span>
						
						</p>
					</li>
					<li>
						<span class="zhishi">试题来源</span>
						<p>{{question.questionSource}}</p>
					</li>
			</ul>
		</div>
	</div>
	<!-- <script>
		$(function(){
			$(".sc").click(function(){
				$(".t-c").show();
			})
		})
	</script> -->
    </div>
</template>
<script>
import headNav from '@/components/headNav/headNav'
export default {
	components:{
      
        headNav
    },
	data(){
		return {
			question:{}
		}
	},
	mounted(){
		this.question = this.$store.state.study.question;
		console.log(this.question)
	
	}
}
</script>

<style scoped src="@/assets/css/new-yl119.css"></style>
<style scoped>

</style>