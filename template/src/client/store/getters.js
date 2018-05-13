const getters = {
  getFullName: state => {
    return state.firstName + ' ' + state.lastName
  }
}
export default getters
