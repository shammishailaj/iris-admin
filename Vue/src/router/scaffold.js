import router from './routes/scaffold'

let powerPathCollection = []

const powerFilter = (path, auth, router) => {
  const _path = router.path[0] !== '/' ? `${path}/${router.path}` : path
  if (!router.power) {
    if (router.children && router.children.length) {
      const children = []
      for (let i = 0; i < router.children.length; i++) {
        const routers = powerFilter(_path, auth, router.children[i])
        if (routers) {
          children.push(routers)
        }
      }
      router.children = children
    }
    return router
  } else {
    let power = false
    for (let i of auth) {
      if (router.power.indexOf(i) !== -1) {
        power = true
        break
      }
    }
    if (power) {
      
      if (router.children && router.children.length) {
        const children = []
        for (let i = 0; i < router.children.length; i++) {
          const routers = powerFilter(_path, auth, router.children[i])
          if (routers) {
            children.push(routers)
          }
        }
        router.children = children
      }

      return router
    } else {
      powerPathCollection.push(_path)
    }
  }
}

export default (auth) => {
  powerPathCollection = []
  if (auth === -1) {
    const routes = Object.assign({}, router)
    return {
      routes,
      powerPathCollection
    }
  } else {
    powerPathCollection = []
    const routes = powerFilter('', auth, Object.assign({}, router))
    return {
      routes,
      powerPathCollection
    }
  }
}