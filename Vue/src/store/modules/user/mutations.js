export default {
  update (state, {type, message, user = message}) {
    if (type !== 'userInfo') {
      return
    }
    sessionStorage.setItem('users', JSON.stringify(user))
    state.token = user.token
    delete user.token
    state.info = user
  }
}