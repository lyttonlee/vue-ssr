const actions = {
  updateNum ({commit}, data) {
    setTimeout(() => {
      commit('increment', data.num)
    }, data.time)
  }
}
export default actions
