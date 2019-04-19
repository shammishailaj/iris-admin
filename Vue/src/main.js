import Vue from 'vue'
import ElementUI from 'element-ui'
import imgPreloading from '@/plugin/imgPreloading'
import progress from '@/plugin/Progress'
import navFilter from '@/plugin/navFilter'
import VerificationPower from '@/components/VerificationPower'
import navigation from '@/navigation.config'
import router, {scaffold, createRouter} from './router'
import store from './store'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(progress, {store, router})
Vue.use(imgPreloading())
Vue.component('VerificationPower', VerificationPower)

if (store.state.user.info.authority) {
  const { routes, powerPathCollection } = scaffold(store.state.user.authority)
  const navConfig = navigation()
  navFilter(powerPathCollection, navConfig)
  router.matcher = createRouter(routes).matcher
}

// $progress.start()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
