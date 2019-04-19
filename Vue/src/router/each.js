import store from '../store'

export const beforeEach = function () {
  return (to, from, next) => {
    if (from.path !== 'login') {
      store.commit('update', {
        type: 'beforePath',
        message: from.path
      })
    }
    if (to.path === '/login') {
      if (store.state.user.token) {
        return next(store.state.beforePath)
      } else {
        return next()
      }
    } else {
      if (!store.state.user.token) {
        return next('/login')
      } else {
        return next()
      }
    }
  }
}

export const beforeResolve = function () {
  return (to, from, next) => {
    next()
  }
}

export const afterEach = function () {
  return () => {
  }
}