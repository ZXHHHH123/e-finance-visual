import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    platformBaseData: {},
    platformFilterPids: [],
    mainFramHistory: [],
    platformLevelClassic: {total: 0, data: {}},
    platformProvinceClassic: {total: 0, data: {}},
    platformTypeClassic: {total: 0, data: {}}
  },
  mutations: {
    setPlatformBaseData (state, data) {
      state.platformBaseData = data
    },
    setPlatformFilterPids (state, pids) {
      state.platformFilterPids = pids
    },
    pushMainFramHistory (state, history) {
      if (history['type'] === 'showSection' &&
        (state.mainFramHistory.length !== 0 && state.mainFramHistory[state.mainFramHistory.length - 1]['type'] === 'showSection')) {
        return
      }
      state.mainFramHistory.push(history)
    },
    popMainFramHistory (state) {
      state.mainFramHistory.pop()
    },
    setPlatformLevelClassic (state, data) {
      console.log(data)
      state.platformLevelClassic.total = data[0]
      state.platformLevelClassic.data = data[1]
    },
    setPlatformProvinceClassic (state, data) {
      console.log(data)
      state.platformProvinceClassic.total = data[0]
      state.platformProvinceClassic.data = data[1]
    },
    setPlatformTypeClassic (state, data) {
      console.log(data)
      state.platformTypeClassic.total = data[0]
      state.platformTypeClassic.data = data[1]
    }
  }
})
export default store
