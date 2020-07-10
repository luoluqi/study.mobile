const getters = {
  mobileToken: state => state.mobileUser.token,
  title: state => state.mobileCommon.title,
  userData: state => state.clock.userData,
  schoolId: state => state.user.schoolId,
  realName: state => state.user.realName
}
export default getters
