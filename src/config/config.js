


let a = ''
let b = ''
let c = ''
let srv = ''
if (process.env.NODE_ENV == 'production') {
    a = 'https://api.xueerqin.net' // 正式
    b = 'https://app.xueerqin.net' // 正式 
    c = 'https://auth.xueerqin.net' // 正式  
    srv = 'http://srv.xueerqin.net'                
} else {
    a= 'https://t-api.xueerqin.net'  // 测试
    b = 'https://tapp.xueerqin.net' // 测试
    c = 'https://tauth.xueerqin.net' // 测试 
    srv = 'https://tsrv.xueerqin.net'
}
console.log(process.env.NODE_ENV)
console.log(a, b)
export const appUrl = b
export const apiUrl = a
export const authUrl = c



export const kitchenUrl = apiUrl + '/kitchen-center'
export const schoolUrl = appUrl
export const schoolAccount=apiUrl+"/one-card-solution"


export const baseUrl = srv + '/apiV2-stucard'
export const baseUrl2 = srv + '/public-api'
export const baseUrl3 = srv + '/api-classroomorder'
export const baseUrl4 = srv + '/api-notice'
export const baseUrlSet = srv + '/apiV2-stucard'
export const baseUrlCheking = srv + '/api-schoolmanage'
export const clockIn = srv + '/api-attendance'
export const circle = srv + '/api-classboard-show'
export const giveALike = srv + '/api-thumbup'
export const sure = srv + '/api-attendance'
export const commentUrl = srv + '/api-comment'
export const studentNameUrl = srv + '/api-attendance'
export const homeWorkUrl = srv + '/api-homework'
export const publicUrl = srv + '/public-api'
export const noticeUrl = srv + '/api-classnotice'
export const partyBuildUrl = srv + '/api-partybuild'
export const examUrl = srv + '/api-schoolmanage'
export const fytestUrl = 'http://t-api.fytest.xueerqin.net'

export const payrollUrl = srv + '/api-oa-salary'
export const oaUrl = srv + '/api-oa-flow'
export const oaNoticeUrl = srv + '/api-classnotice'
export const formUrl = srv + '/api-oa-form'
export const organizationUrl = srv + '/api-oa-dept'

export const mappv2Url = 'http://mappv2.xueerqin.net'


