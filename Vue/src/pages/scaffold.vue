<template lang="pug">
  main#page_home
    div.top
      div.logo
        router-link(
          to='/home'
        )
          img(
            src='../assets/images/logo.png'
          )
      Headers
    div#page_left
      el-button.newProject(
        type='primary'
      ) 新建工作任务
        el-icon.playmate.icon-right-circle-fill
      Navigation
    router-view
</template>

<script>
import Headers from '@/components/Header'
import Navigation from '@/components/Navigation'
export default {
  components: {
    Headers,
    Navigation
  }
}
</script>

<style lang="sass">
@import '@/assets/scss/scaffold.scss'
</style>
