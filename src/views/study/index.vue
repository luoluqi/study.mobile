<template>
   <div id="allObj" style="background-color: #FFFFFF;">
	    <headNav title="选择科目"></headNav>
	    <div class="objList">
	        <ul>
	           <li v-if="gradeType == 1" v-for="(item,index) in subjectList" :key="index" @click="toType(item.subjectId,item.subjectName)">
	                <img v-if="item.subjectId == 1" src="@/assets/img/ssyw.png" />
					<img v-if="item.subjectId == 2" src="@/assets/img/sssx.png" />
					<img v-if="item.subjectId == 3" src="@/assets/img/ssyy.png" />
					<img v-if="item.subjectId == 4" src="@/assets/img/sskx.png" />
					 <img v-if="item.subjectId == 5" src="@/assets/img/sszzsp.png" />
					<img v-if="item.subjectId == 6" src="@/assets/img/sswl.png" />
					<img v-if="item.subjectId == 7" src="@/assets/img/sshx.png" />
					<img v-if="item.subjectId == 8" src="@/assets/img/ssls.png" />
					 <img v-if="item.subjectId == 9" src="@/assets/img/ssdl.png" />
					<img v-if="item.subjectId == 10" src="@/assets/img/sssw.png" />
					<img v-if="item.subjectId == 11" src="@/assets/img/sslsysh.png" />
					
	                <p>{{item.subjectName}}</p>
	            </li>

				<li v-if="gradeType == 2" v-for="(item,index) in subjectList" :key="index" @click="toType(item.subjectId,item.subjectName)">
	                <img v-if="item.subjectId == 6" src="@/assets/img/ssyw.png" />
					<img v-if="item.subjectId == 7" src="@/assets/img/sssx.png" />
					<img v-if="item.subjectId == 8" src="@/assets/img/ssyy.png" />
					<img v-if="item.subjectId == 9" src="@/assets/img/sskx.png" />
					 <img v-if="item.subjectId == 10" src="@/assets/img/sszzsp.png" />
					<img v-if="item.subjectId == 11" src="@/assets/img/sswl.png" />
					<img v-if="item.subjectId == 12" src="@/assets/img/sshx.png" />
					<img v-if="item.subjectId == 13" src="@/assets/img/ssls.png" />
					 <img v-if="item.subjectId == 14" src="@/assets/img/ssdl.png" />
					<img v-if="item.subjectId == 15" src="@/assets/img/sssw.png" />
					<img v-if="item.subjectId == 16" src="@/assets/img/sslsysh.png" />
					
	                <p>{{item.subjectName}}</p>
	            </li>

				<li v-if="gradeType == 3" v-for="(item,index) in subjectList" :key="index" @click="toType(item.subjectId,item.subjectName)">
	                <img v-if="item.subjectId == 18" src="@/assets/img/ssyw.png" />
					<img v-if="item.subjectId == 19" src="@/assets/img/sssx.png" />
					<img v-if="item.subjectId == 20" src="@/assets/img/ssyy.png" />
					<img v-if="item.subjectId == 21" src="@/assets/img/sswl.png" />
					 <img v-if="item.subjectId == 22" src="@/assets/img/sshx.png" />
					<img v-if="item.subjectId == 23" src="@/assets/img/ssls.png" />
					<img v-if="item.subjectId == 24" src="@/assets/img/sszzsp.png" />
					<img v-if="item.subjectId == 25" src="@/assets/img/ssdl.png" />
					
	                <p>{{item.subjectName}}</p>
	            </li>
 <!--
	            <li @click="toType(1,'语文')">
	                <img src="@/assets/img/ssyw.png" />
	                <p>语文</p>
	            </li>
	            <li @click="toType(2,'数学')">
	                <img src="@/assets/img/sssx.png" />
	                <p>数学</p>
	            </li>
	            <li @click="toType(3,'英语')">
	                <img src="@/assets/img/ssyy.png" />
	                <p>英语</p>
	            </li>
				 <li @click="toType(4,'科学')">
	                <img src="@/assets/img/sskx.png" />
	                <p>科学</p>
	            </li>
	            <li @click="toType(5,'政治思品')">
	                <img src="@/assets/img/sszzsp.png" />
	                <p>政治思品</p>
	            </li>
	            <li @click="toType">
	                <img src="@/assets/img/sswl.png" />
	                <p>物理</p>
	            </li>
	            <li @click="toType">
	                <img src="@/assets/img/sshx.png" />
	                <p>化学</p>
	            </li>
	            <li @click="toType">
	                <img src="@/assets/img/ssls.png" />
	                <p>历史</p>
	            </li>
	            <li @click="toType">
	                <img src="@/assets/img/ssdl.png" />
	                <p>地理</p>
	            </li>
	            <li @click="toType">
	                <img src="@/assets/img/sssw.png" />
	                <p>生物</p>
	            </li>
	           
	            <li @click="toType">
	                <img src="@/assets/img/sslsysh.png" />
	                <p>历史与社会</p>
	            </li> -->
	        </ul>
	    </div>


	

	</div>
</template>
<script>
import {login} from '@/api/loginApi'
import {getAllChannelTypeList,getStudentDetail,getSubject} from "@/api/studyApi"
import headNav from '@/components/headNav/headNav'
import   cookie from '@/util/cookie'
export default {
	components:{
		headNav
	},
    data:function(){
        return {
			subjectList:[],
			gradeType:0
		
        }
    },

    methods:{
        toType:function(subjectId,subjectName){
			this.$store.state.study.subjectId = subjectId;
			this.$store.state.study.subjectName = subjectName;
            this.$router.push("type");
        }
	},
	
	mounted(){
		// var realName = cookie.get("realName")
		// cookie.set("realName",encodeURI(realName));
		getAllChannelTypeList().then((data) => {
   
			this.$store.state.channelTypeList = data.data;
		});

	
		
	

		var studentId =  cookie.get("studentId")
		if(!studentId){
			//studentId = "311fb81e85624b3cb791a4a4947318b6"
			studentId = "c2d76f626f804cf18f86438124e491f5"
		}
		

		getStudentDetail(studentId).then((data) => {
					
			
			var user = data.data;

			this.$store.state.user = Object.assign(this.$store.state.user,user);
			var schoolId = this.$store.state.user.schoolId;
			return getSubject(schoolId);
		}).then((data) => {
			
			this.subjectList = data.data.subjectItemLists[0].subjectInfo
			this.gradeType = data.data.subjectItemLists[0].gradeType
		});

	


	
		// cookie.set('name', 'luoluqi', { expires: 7, path: '' })
		//var name  = cookie.get("Token");
	
	}
}


</script>

<style scoped src="@/assets/css/StrengthenPracticeV2.css"></style>

<style >
  
</style>