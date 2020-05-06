const getters = {
  mobileToken: state => state.mobileUser.token,
  title: state => state.mobileCommon.title,
  userData: state => state.clock.userData,
  schoolId: state => state.user.schoolId
}
export default getters
