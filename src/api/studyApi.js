import axios from './axios'

import {baseUrl,baseUrlSet} from '@/config/config'


/*强化练习-查询所有的题型
返回参数 : {
	"status": "",
	"data": [
		{
			"channelTypeId": "题型ID",
			"channelTypeName": "题型名称"
		}
	]
}
*/
export const getAllChannelTypeList = () => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl +'/exam/api/v1.0/intensive/inquireAllChannelTypeList.json',
           
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-根据userId获取学生用户基本详情

请求参数：{userId:根据token返回的uuid   loginuser表的主键ID}

返回参数 : {
	"status": "状态",
	"data": {
		"userId": "用户ID",
		"userName": "用户名称",
		"schoolId": "学校",
		"roleName": "用户角色",
		"schoolClassId": "当前学年班级ID",
		"schoolClassName": "当前学年班级名称",
		"gradeId": "年级ID",
		"gradeName": "年级名称",
		"schoolName": "学校名称"
	}
}
*/
export const getStudentDetail = (studentId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireStudentDetail.json',
           params : {
            studentId : studentId
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-根据学校找科目

请求参数：{schoolId:学校ID}

返回参数 : {
	"status": "返回状态",
	"data": {
		"subjectItemLists": [
			{
				"gradeType": "年纪类型",
				"subjectInfo": [
					{
						"subjectId": "科目ID",
						"subjectName": "科目名称"
					}
				]
			}
		]
	}
}
*/
export const getSubject = (schoolId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireSubjectItemListByGradeTypeTenant.json',
           params : {
            schoolId : schoolId
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-根据选择的题型查询题目-分页

请求参数：{subjectId:科目
        questionChannelTypes:题目类型集合
        gradeId:162f01e041d541db8a5885c2e16e3a9f
        pageNum:分页参数
        pageSize:分页参数 每页条数}

返回参数 : {
	"status": "返回状态",
	"data": {
		"pageNum": "",
		"pageSize": "",
		"size": "",
		"orderBy": "",
		"startRow": "",
		"endRow": "",
		"total": "",
		"pages": "",
		"list": [
			{
				"questionId": "题目ID",
				"gradeType": "题目所属年级",
				"examType": "考试类型1:小升初中题/中考真题/高考真题",
				"questionChannelType": "题型1:单选题 2:多选题 3:判断",
				"questionStatus": "题目状态（发布草稿）",
				"difficultIndex": "难度等级",
				"saveNum": "组卷次数",
				"questionSource": "题目来源",
				"options": "选项",
				"questionText": "大题题目",
				"litterQuestion": "小题题目内容和顺序"
			}
		],
		"firstPage": "",
		"prePage": "",
		"nextPage": "",
		"lastPage": "",
		"isFirstPage": "",
		"isLastPage": "",
		"hasPreviousPage": "",
		"hasNextPage": "",
		"navigatePages": "",
		"navigatepageNums": ""
	}
}
*/
export const getQuestionByType = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireQuestionListByQuestionChannelTypes.json',
           params : {
                subjectId : param.subjectId,
                questionChannelTypes:param.questionChannelTypes,
                gradeId:param.gradeId,
                pageNum:param.pageNum,
                pageSize:param.pageSize

           }
        }).then(res => {
            resolve(res.data)
        })
    });
}


/*强化练习-通过学校ID获取对应的教材版本列表接口

请求参数：{schoolId:学校ID}

返回参数 : {
	"status": "",
	"data": [
		{
			"id": "教材ID",
			"name": "教材名称",
			"code": null,
			"stageid": "学段ID"
		}
	]
}
*/
export const getBookEdition = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireSchoolBookEditionListRPC.json',
           params 
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-获取教材课本列表接口

请求参数：{
    editionId:教材版本ID
    subjectId:学科ID
    gradeId:年级ID
}
返回参数 : {
	"status": "",
	"data": [
		{
			"id": "教材课本ID",
			"name": "教材课本名称",
			"editionid": "教材版本ID",
			"subjectid": "学科ID",
			"schoolbookeditionsubjectmappingid": "教材版本科目对应Id",
			"gradeid": "年级ID",
			"ordernum": "排序字段"
		}
	]
}
*/
export const getBook = (param) => {
	
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireSchoolBookListRPC.json',
           params : {
			editionId : param.editionId,
             subjectId:param.subjectId,
             gradeId:param.gradeId
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}


/*强化练习-通过教材课本ID获取课堂单元接口

请求参数：{
    schoolBookId:教材课本ID
}
返回参数 : {
	"status": "",
	"data": [
		{
			"id": "单元ID",
			"name": "单元名称",
			"schoolbookid": "教材课本ID",
			"subjectid": null,
			"gradeid": null,
			"ordernum": "排序"
		}
	]
}
*/
export const getCourseUnit = (schoolBookId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireCourseUnitListRPC.json',
           params : {
            schoolBookId : schoolBookId,
             
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-根据选择的章节查询题目-分页

请求参数：{
    subjectId:科目
    chapterId:章节ID
    gradeId:162f01e041d541db8a5885c2e16e3a9f
    questionChannelTypes:题型集合
    pageNum:分页参数
    pageSize:分页参数 每页条数
}
返回参数 : {
	"status": "返回状态",
	"data": {
		"pageNum": "",
		"pageSize": "",
		"size": "",
		"orderBy": "",
		"startRow": "",
		"endRow": "",
		"total": "",
		"pages": "",
		"list": [
			{
				"questionId": "题目ID",
				"gradeType": "题目所属年级",
				"examType": "考试类型1:小升初中题/中考真题/高考真题",
				"questionChannelType": "题型1:单选题 2:多选题 3:判断",
				"questionStatus": "题目状态（发布草稿）",
				"difficultIndex": "难度等级",
				"saveNum": "组卷次数",
				"questionSource": "题目来源",
				"options": "选项",
				"questionText": "大题题目",
				"litterQuestion": "小题题目内容和顺序"
			}
		],
		"firstPage": "",
		"prePage": "",
		"nextPage": "",
		"lastPage": "",
		"isFirstPage": "",
		"isLastPage": "",
		"hasPreviousPage": "",
		"hasNextPage": "",
		"navigatePages": "",
		"navigatepageNums": ""
	}
}
*/

export const getQuestionByChapter = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireQuestionListByChapterId.json',
           params : {
            subjectId:param.subjectId,
            chapterId:param.chapterId,
            gradeId:param.gradeId,
            questionChannelTypes:param.questionChannelTypes,
            pageNum:param.pageNum,
            pageSize:param.pageSize
             
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-获取难度级别为困难的题目-分页

请求参数：{
   subjectId:科目
    gradeId:162f01e041d541db8a5885c2e16e3a9f
    questionChannelTypes:题型集合
    pageNum:分页参数
    pageSize:分页参数 每页条数
}
返回参数 : {
	"status": "返回状态",
	"data": {
		"pageNum": "",
		"pageSize": "",
		"size": "",
		"orderBy": "",
		"startRow": "",
		"endRow": "",
		"total": "",
		"pages": "",
		"list": [
			{
				"questionId": "题目ID",
				"gradeType": "题目所属年级",
				"examType": "考试类型1:小升初中题/中考真题/高考真题",
				"questionChannelType": "题型1:单选题 2:多选题 3:判断",
				"questionStatus": "题目状态（发布草稿）",
				"difficultIndex": "难度等级",
				"saveNum": "组卷次数",
				"questionSource": "题目来源",
				"options": "选项",
				"questionText": "大题题目",
				"litterQuestion": "小题题目内容和顺序"
			}
		],
		"firstPage": "",
		"prePage": "",
		"nextPage": "",
		"lastPage": "",
		"isFirstPage": "",
		"isLastPage": "",
		"hasPreviousPage": "",
		"hasNextPage": "",
		"navigatePages": "",
		"navigatepageNums": ""
	}
}
*/
export const getQuestionByDifficult = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireQuestionListByDifficultIndex.json',
           params : {
            subjectId:param.subjectId,
            gradeId:param.gradeId,
            questionChannelTypes:param.questionChannelTypes,
            pageNum:param.pageNum,
            pageSize:param.pageSize
             
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-从题库随机获取题目-分页

请求参数：{
   subjectId:科目
    gradeId:年级ID
    questionChannelTypes:题型集合
    pageNum:分页参数
    pageSize:分页参数 每页条数
}
返回参数 : {
	"status": "返回状态",
	"data": {
		"pageNum": "",
		"pageSize": "",
		"size": "",
		"orderBy": "",
		"startRow": "",
		"endRow": "",
		"total": "",
		"pages": "",
		"list": [
			{
				"questionId": "题目ID",
				"gradeType": "题目所属年级",
				"examType": "考试类型1:小升初中题/中考真题/高考真题",
				"questionChannelType": "题型1:单选题 2:多选题 3:判断",
				"questionStatus": "题目状态（发布草稿）",
				"difficultIndex": "难度等级",
				"saveNum": "组卷次数",
				"questionSource": "题目来源",
				"options": "选项",
				"questionText": "大题题目",
				"litterQuestion": "小题题目内容和顺序"
			}
		],
		"firstPage": "",
		"prePage": "",
		"nextPage": "",
		"lastPage": "",
		"isFirstPage": "",
		"isLastPage": "",
		"hasPreviousPage": "",
		"hasNextPage": "",
		"navigatePages": "",
		"navigatepageNums": ""
	}
}
*/
export const getQuestionByRandom = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireQuestionListByRandom.json',
           params : {
            subjectId:param.subjectId,
            gradeId:param.gradeId,
            questionChannelTypes:param.questionChannelTypes,
            pageNum:param.pageNum,
            pageSize:param.pageSize
             
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}


/*强化练习-根据学生Id获取错题的相同知识点题目-分页 * * 当学生在平台还没有错题行为的情况，点击知识点强化练习，随机出题

请求参数：{
   subjectId:科目
    gradeId:年级ID
    studentId:学生ID
    questionChannelTypes:题型集合
    pageNum:分页参数
    pageSize:分页参数 每页条数
}
返回参数 : {
	"status": "返回状态",
	"data": {
		"pageNum": "",
		"pageSize": "",
		"size": "",
		"orderBy": "",
		"startRow": "",
		"endRow": "",
		"total": "",
		"pages": "",
		"list": [
			{
				"questionId": "题目ID",
				"gradeType": "题目所属年级",
				"examType": "考试类型1:小升初中题/中考真题/高考真题",
				"questionChannelType": "题型1:单选题 2:多选题 3:判断",
				"questionStatus": "题目状态（发布草稿）",
				"difficultIndex": "难度等级",
				"saveNum": "组卷次数",
				"questionSource": "题目来源",
				"options": "选项",
				"questionText": "大题题目",
				"litterQuestion": "小题题目内容和顺序"
			}
		],
		"firstPage": "",
		"prePage": "",
		"nextPage": "",
		"lastPage": "",
		"isFirstPage": "",
		"isLastPage": "",
		"hasPreviousPage": "",
		"hasNextPage": "",
		"navigatePages": "",
		"navigatepageNums": ""
	}
}
*/
export const getQuestionByWrong = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireStudentWrongQuestionList.json',
           params : {
            subjectId:param.subjectId,
            gradeId:param.gradeId,
            studentId:param.studentId,
            questionChannelTypes:param.questionChannelTypes,
            pageNum:param.pageNum,
            pageSize:param.pageSize
             
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

/*强化练习-根据学生Id获取错题的相同知识点题目-分页 * * 当学生在平台还没有错题行为的情况，点击知识点强化练习，随机出题

请求参数：{
   schoolBookId:教材课本ID
    courseUnitId:单元ID
    parentChapterId:父章节ID
}
返回参数 : {
	"status": "",
	"data": [
		{
			"chapterId": "章节ID",
			"parentChapterId": "父章节ID",
			"chapterName": "章节名称"
		}
	]
}
*/
export const getChapter = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl + '/exam/api/v1.0/intensive/inquireSubjectChapterList.json',
           params : {
            schoolBookId:param.schoolBookId,
            courseUnitId:param.courseUnitId,
            parentChapterId:param.parentChapterId
             
               
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

// 设置

export const setUp = (param) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlSet + '/api/MSetting/PersonalSettings',
           params : {
			type:param.type,
			roleCode:param.roleCode,
			schoolId:param.schoolId
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}
export const exit = (param) => {
	console.log(param)
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrlSet + '/api/MOAuth/OpenidDel',
           params : {
			openId:param.openId
           }
        }).then(res => {
            resolve(res.data)
        })
    });
}

