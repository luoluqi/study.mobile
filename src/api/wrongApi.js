import axios from './axios'

import {baseUrl} from '@/config/config'




/**
 * 根据学生id获取错题统计
 * @param {*} studentId 
 * 
 * @return {
	"status": "",
	"data": {
		"allWrongCount": "学生错题总数",
		"maxWrongSubject": "学生错题最多的学科",
		"maxWrongQuestionChannelType": "学生错题最多的题型"
	}
}
 */
export const getCount = (studentId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl +'/exam/api/v1.0/wrongQuestion/inquireStudentWrongCount.json',
            params : {
                studentId : studentId
            }
           
        }).then(res => {
            resolve(res.data)
        })
    });
}

/**
 * 根据学生ID获取科目错题列表（包含错题统计）
 * @param {*} studentId 
 * 
 * @return {
	"status": "",
	"data": [
		{
			"subjectId": "学科ID",
			"subjectName": "学科名称",
			"wrongAllCount": "错题数",
			"channelTypeWrongCounts": [
				{
					"questionChannelType": "题型",
					"wrongCount": "错题数"
				}
			]
		}
	]
}
 */
export const getSubjectCount = (studentId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl +'/exam/api/v1.0/wrongQuestion/inquireStudentSubjectWrongList.json',
            params : {
                studentId : studentId
            }
           
        }).then(res => {
            resolve(res.data)
        })
    });
}

/**根据学生ID,学科ID，选择的题型获取错题列表-分页
 * 
 * @param 
 * {studentId:学生ID
subjectId:学科ID
questionChannelTypes:题型ID集合
pageNum:
pageSize:} 

@return

 */
export const getWrongList = (params) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl +'/exam/api/v1.0/wrongQuestion/inquireQuestionWrongList.json',
            params
           
        }).then(res => {
            resolve(res.data)
        })
    });
}


/**从错题本中移除
 * 
 * @param {*} questionWrongId 
 * 
 * @return {
	"status": "",
	"msg": ""
}
 */
export const delWrong = (questionWrongId) => {
    return new Promise((resolve,reject) => {
        axios({
            url: baseUrl +'/exam/api/v1.0/wrongQuestion/deleteQuestionWrongAccount.json',
            params : {
                questionWrongId:questionWrongId,
              
            }
           
        }).then(res => {
            resolve(res.data)
        })
    });
}


