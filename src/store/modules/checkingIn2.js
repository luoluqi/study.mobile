import {
    reportList,
    studentList,
    records,
    corrent,
    pageRecords,
    classStudentStatus,
    perMonthClassAttendanceData,
    classAllStudent,
    studentInOutSchoolData,
    classMonthSummaryData,
    studentAttendanceDetail,
    studentAttendanceSummaryData,
    classRolls,
    studentAttendance
    } from '@/api/checkingApi2'
const checkingIn2 = {
    namespaced: true,
    state: {
        toDay: localStorage.yueDate ? localStorage.yueDate : '',
        itemStudent: localStorage.itemStudent ? JSON.parse(localStorage.itemStudent) : '',
        statusChange:{}
    },
    getters: {
    },
    mutations: {
      
    },
    actions: {
        ReportList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                reportList(params).then(res => {
                    resolve(res)
                })
            })
          },
          StudentList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentList(params).then(res => {
                    resolve(res)
                })
            })
          },
          Records ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                records(params).then(res => {
                    resolve(res)
                })
            })
          },
          Corrent ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                corrent(params).then(res => {
                    resolve(res)
                })
            })
          },
          PageRecords ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                pageRecords(params).then(res => {
                    resolve(res)
                })
            })
          },
        //   改==========================================
          ClassStudentStatus ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                classStudentStatus(params).then(res => {
                    resolve(res)
                })
            })
          },
          ClassAllStudent ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                classAllStudent(params).then(res => {
                    resolve(res)
                })
            })
          },
          PerMonthClassAttendanceData ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                perMonthClassAttendanceData(params).then(res => {
                    resolve(res)
                })
            })
          },
          StudentInOutSchoolData ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentInOutSchoolData(params).then(res => {
                    resolve(res)
                })
            })
          },
          ClassMonthSummaryData ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                classMonthSummaryData(params).then(res => {
                    resolve(res)
                })
            })
          },
          StudentAttendanceDetail ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentAttendanceDetail(params).then(res => {
                    resolve(res)
                })
            })
          },
          StudentAttendanceSummaryData ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentAttendanceSummaryData(params).then(res => {
                    resolve(res)
                })
            })
          },
          ClassRolls ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                classRolls(params).then(res => {
                    resolve(res)
                }).catch(res => {
                    reject(res)
                })
            })
          },
          StudentAttendance ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                studentAttendance(params).then(res => {
                    resolve(res)
                }).catch(res => {
                    reject(res)
                })
            })
          }
    }
}
export default checkingIn2