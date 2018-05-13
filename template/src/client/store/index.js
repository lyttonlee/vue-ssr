import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions
  })
}
