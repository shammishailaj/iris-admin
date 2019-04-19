<template>
  <div id='app'>
    <Progress></Progress>
    <router-view></router-view>
  </div>
</template>

<script>
// import Progress from '@/components/Progress'
import navFilter from '@/plugin/navFilter'
import navigation from '@/navigation.config'
import router, { createRouter, scaffold } from '@/router'
export default {
  name: 'app',
  // components: {
  //   Progress
  // },
  watch: {
    '$store.state.user': {
      handler () {
        if (this.$store.state.user.token) {
          this.createRouter()
          this.$router.push(this.$store.state.beforePath)
        } else {
          this.$router.push('/login')
        }
      },
      deep: true
    }
  },
  methods: {
    createRouter () {
      const { routes, powerPathCollection } = scaffold(this.$store.state.user.authority)
      const navConfig = navigation()
      navFilter(powerPathCollection, navConfig)
      router.matcher = createRouter(routes).matcher
    }
  }
}
</script>
