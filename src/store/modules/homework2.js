import {getHomeWorkList,getSubjectList,addHomeWork,remind,setRead,getReadList,addLike,addReview,getHomeWorkListByParent,submit,getCommitList, getHomeWork, getHomeWorkById, getHomeWorkByTeacher} from '@/api/homework2Api'
const homework2 = {
    namespaced: true,
    state: {
        showModel: true,
        summitHomeId: '',
        homeWorkId: localStorage.homeWorkId ? localStorage.homeWorkId: '',
        stuId: localStorage.stuId ? localStorage.stuId: '',
        homeWorkDetail: localStorage.homeWorkDetail ? JSON.parse(localStorage.homeWorkDetail) : '',
        parentSubmit: localStorage.homeWorkDetail ? JSON.parse(localStorage.homeWorkDetail).homeworksubmit: '',
        teacherSubmit: localStorage.homeWorkDetail ? JSON.parse(localStorage.homeWorkDetail).homeworkreview: '',
    },
    getters: {
    },
    mutations: {
        sethomeWorkId (state, homeWorkId) {
            state.homeWorkId = homeWorkId
            localStorage.homeWorkId = homeWorkId
        },
        stuId (state, stuId) {
            state.stuId = stuId
            localStorage.stuId = stuId
        },
        sethomeWorkDetail (state, homeWorkDetail) {
            state.homeWorkDetail = homeWorkDetail
            localStorage.homeWorkDetail = JSON.stringify(homeWorkDetail)
        },
        changeModel (state, flag) {
            state.showModel = flag
        },
        setSummitHomeId (state, flag) {
            state.summitHomeId = flag
        }
    },
    actions: {
        GetHomeWorkList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getHomeWorkList(params).then(res => {
                resolve(res)
            })
        })
      },
      GetSubjectList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getSubjectList(params).then(res => {
                resolve(res)
            })
        })
      },
      AddHomeWork ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            addHomeWork(params).then(res => {
                resolve(res)
            })
        })
      },
      Remind ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            remind(params).then(res => {
                resolve(res)
            })
        })
      },
      SetRead ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            setRead(params).then(res => {
                resolve(res)
            })
        })
      },
      GetReadList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getReadList(params).then(res => {
                resolve(res)
            })
        })
      },
      AddLike ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            addLike(params).then(res => {
                resolve(res)
            })
        })
      },
      AddReview ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            addReview(params).then(res => {
                resolve(res)
            })
        })
      },
      GetHomeWork ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getHomeWork(params).then(res => {
                resolve(res)
            })
        })
      },
      GetHomeWorkListByParent ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getHomeWorkListByParent(params).then(res => {
                resolve(res)
            })
        })
      },
      Submit ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            submit(params).then(res => {
                resolve(res)
            })
        })
      },
      GetCommitList ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getCommitList(params).then(res => {
                resolve(res)
            })
        })
      },//getHomeWorkByTeacher
      GetHomeWorkById ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getHomeWorkById(params).then(res => {
                resolve(res)
            })
        })
      },
      GetHomeWorkByTeacher ({state, commit, dispatch}, params) {
        return new Promise((resolve, reject) => {
            getHomeWorkByTeacher(params).then(res => {
                resolve(res)
            })
        })
      }
    }
}
export default homework2