export const baseUrl = 'https://srv.xueerqin.net/apiV2-stucard'
export const baseUrl2 = 'https://srv.xueerqin.net/public-api'
export const baseUrl3 = 'https://srv.xueerqin.net/api-classroomorder'
export const baseUrl4 = 'https://srv.xueerqin.net/api-notice'
export const baseUrlSet = 'http://srv.xueerqin.net/apiV2-stucard'
export const baseUrlCheking = 'http://srv.xueerqin.net/api-schoolmanage'
export const clockIn = 'http://srv.xueerqin.net/api-attendance'
export const circle = 'http://srv.xueerqin.net/api-classboard-show'
export const giveALike = 'http://srv.xueerqin.net/api-thumbup'
export const sure = 'http://srv.xueerqin.net/api-attendance'
export const commentUrl = 'http://srv.xueerqin.net/api-comment'
export const studentNameUrl = 'http://srv.xueerqin.net/api-attendance'
export const homeWorkUrl = 'http://srv.xueerqin.net/api-homework'
export const publicUrl = 'http://srv.xueerqin.net/public-api'
export const noticeUrl = 'http://srv.xueerqin.net/api-classnotice'
export const partyBuildUrl = 'http://srv.xueerqin.net/api-partybuild'
export const examUrl = 'http://srv.xueerqin.net/api-schoolmanage'
export const fytestUrl = 'http://t-api.fytest.xueerqin.net'

export const payrollUrl = 'http://srv.xueerqin.net/api-oa-salary'
export const oaUrl = 'http://srv.xueerqin.net/api-oa-flow'
export const oaNoticeUrl = 'http://srv.xueerqin.net/api-classnotice'
export const formUrl = 'http://srv.xueerqin.net/api-oa-form'
export const organizationUrl = 'http://srv.xueerqin.net/api-oa-dept'

export const mappv2Url = 'http://mappv2.xueerqin.net'


let a = ''
let b = ''
let c = ''
if (process.env.NODE_ENV == 'production') {
    a = 'https://api.xueerqin.net' // 正式
    b = 'https://app.xueerqin.net' // 正式 
    c = 'https://auth.xueerqin.net' // 正式                  
} else {
    a= 'https://t-api.xueerqin.net'  // 测试
    b = 'https://tapp.xueerqin.net' // 测试
    c = 'https://tauth.xueerqin.net' // 测试 
}
console.log(process.env.NODE_ENV)
console.log(a, b)
export const appUrl = b
export const apiUrl = a
export const authUrl = c



export const kitchenUrl = apiUrl + '/kitchen-center'
export const schoolUrl = appUrl
export const schoolAccount=apiUrl+"/one-card-solution"


