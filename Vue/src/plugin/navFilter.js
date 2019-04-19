import store from '@/store'

const navFilter = (filter, config) => {
  return config.filter(item => {
    let auth = true
    for (let i = 0; i < filter.length; i++) {
      const url = filter[i]
      if (url === item.to || url.indexOf(`${item.to}/`) === 0) {
        auth = false
      }
    }
    if (auth && item.children && item.children.length) {
      item.children = navFilter(filter, item.children)
    }
    if (!item.to && item.children && !item.children.length) {
      auth = false
      delete item.children
    }
    return auth
  })
}

export default (filter, config) => {
  const navConfig = navFilter(filter, config)
  store.commit('update', {
    type: 'navigation',
    message: navConfig
  })
  return navConfig
}