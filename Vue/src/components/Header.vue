<template lang="pug">
  header
    section.workBox
      ul
        li.select
          el-icon.playmate.icon-flag-fill
          | 工作任务
    section.userMenuBox
      ul.message
        li
          el-badge(
            value='99+'
          )
            el-icon.playmate.icon-message-fill
            // el-icon.playmate.icon-comment
        li
          el-badge(
            value='99+'
          )
            el-icon.playmate.icon-wechat-fill(
              style='font-size: 28px;'
            )
      el-dropdown(
        @command='userMenu'
      )
        // | trigger="click"
        div(
          class="el-dropdown-link"
        )
          | 你好，{{user.fullname}}！
          | &nbsp;
          img(
            src="../assets/images/defaultHeader.png"
          )
          | &nbsp;&nbsp;
          el-icon.playmate.icon-down
        el-dropdown-menu.userMenu(
          slot="dropdown"
        )
          div 22
          ul.userMenuList
            li
              el-icon.playmate.icon-icon_setting
              p 设置
            li
              el-icon.playmate.icon-icon_wechat
              p 小程序
            li
              el-icon.playmate.icon-icon_sms
              p 通知
          el-dropdown-item(
            divided
          ) 修改密码
          el-dropdown-item(
            command='outLogin'
          ) 登出
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user.info
    }
  },
  methods: {
    userMenu (command) {
      command && this[command]()
    },
    outLogin () {
      this.$store.commit('update', {
        type: 'userInfo',
        message: {}
      })
    }
  }
}
</script>
