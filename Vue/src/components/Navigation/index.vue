<template lang='pug'>
  nav
    NavItem(
      v-for='(item, index) in config'
      :key='`navigation_${item.id}`'
      :id='item.id'
      :to='item.to'
      :selectId.sync='selectId'
      :toId.sync='toId'
      :icon='item.icon'
      :children='item.children'
    )
      | {{item.name}}
    // div.menu.select(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-home
    //       | 首页
    // div.menu.class(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-desktop
    //       | 平台管理
    //     el-icon.playmate.icon-right
    // div.menu(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-apartment
    //       | 组织架构管理
    //     el-icon.playmate.icon-right
    // div.menu.class(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-icon_wechat1
    //       | 小程序
    //     el-icon.playmate.icon-right
    //   div.menuclass
    //     div.menu
    //       p
    //         span
    //           el-icon.playmate.icon-orderedlist
    //           | 测试
    //     div.menu
    //       p
    //         span
    //           el-icon.playmate.icon-orderedlist
    //           | 测试
    //     div.menu
    //       p
    //         span
    //           el-icon.playmate.icon-orderedlist
    //           | 测试
    //     div.menu
    //       p
    //         span
    //           el-icon.playmate.icon-orderedlist
    //           | 测试
    // div.menu(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-team
    //       | 用户管理
    //     el-icon.playmate.icon-right
    // div.menu(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-shop
    //       | 商户管理
    //     el-icon.playmate.icon-right
    // div.menu(
    //   @click='click(this)'
    // )
    //   p
    //     span
    //       el-icon.playmate.icon-icon_task1
    //       | 活动管理







      //   el-icon.playmate.icon-right
      // div.menuclass
      //   div.menu(
      //     @click='click'
      //   )
      //     p
      //       span
      //         el-icon.playmate.icon-home
      //         | 首页
      //   div.menu(
      //     @click='click'
      //   )
      //     p
      //       span
      //         el-icon.playmate.icon-home
      //         | 首页
      //     div.menuclass
      //       div.menu
      //         p
      //           span
      //             el-icon.playmate.icon-home
      //             | 首页
      //   div.menu.select(
      //     @click='click'
      //   )
      //     p
      //       span
      //         el-icon.playmate.icon-home
      //         | 首页
</template>

<script>
import NavItem from './NavItem'
export default {
  components: {
    NavItem
  },
  data () {
    const config = this.$store.state.navigation
    const path = this.$route.path
    let id = ''
    if (path === '/' || path === '/home') {
      id = '0'
    }
    return {
      config,
      selectId: id,
      toId: id
    }
  },
  created () {
    const path = this.$route.path
    if (path !== '/' && path !== '/home'){
      this.isPathSelect(path, this.config)
    }
  },
  methods: {
    isPathSelect (path, config) {
      for (let i = 0; i < config.length; i++) {
        const nav = config[i]
        if (0 === path.indexOf(nav.to + '/') || path === nav.to) {
          this.selectId = this.toId = nav.id
          break
        } else if (nav.children) {
          this.isPathSelect(path, nav.children)
        }
      }
    }
  }
}
</script>
