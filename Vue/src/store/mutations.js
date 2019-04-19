import { state } from './state'
const defaultState = Object.keys(state)
const match = (type) => {
  if(defaultState.indexOf(type) !== -1){
    return type
  }
}
export default {
  pageLoading (state, value) {
    state.pageLoading = value
  },
  update (state, { type, message }) {
    switch (type) {
      case match(type):
        return state[type] = message
    }
  }
}