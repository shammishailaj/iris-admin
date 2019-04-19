import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {beforeEach, beforeResolve, afterEach} from './each'
import _scaffold from './scaffold'


Vue.use(Router)

const _createRouter = newRoutes => {
  const route = Object.assign([], routes)
  if(newRoutes){
    route.push(newRoutes)
  }
  return new Router({
    routes: route
  })
}

let router = _createRouter()

router.beforeEach(beforeEach.call(router))
router.beforeResolve(beforeResolve.call(router))
router.afterEach(afterEach.call(router))

export const createRouter = routes => _createRouter(routes)
export const scaffold = _scaffold

export default router