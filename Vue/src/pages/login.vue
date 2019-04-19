<template lang="pug">
  main#page_login(
    :style=`{
      transition: 'opacity .5s',
      opacity: show ? 1 : 0
    }`
  )
    div.main
      div.exhibition
        img(
          src='../assets/images/login/exhibition.png'
          v-preloading=`{
            allPreloading
          }`
        )
      div.content
        div.logo
          img(
            src="../assets/images/login/logo.png"
            v-preloading
          )
        div.form
          el-input(
            clearable
            ref='username'
            v-model='username.value'
            :autofocus='true'
            :placeholder='username.placeholder'
            :disabled='loading'
            :class=`{
              error: username.error
            }`
            @focus='Focus'
            @blur='Blur'
          )
          el-input(
            show-password
            clearable
            ref='password'
            v-model='password.value'
            :placeholder='password.placeholder'
            :disabled='loading'
            :class=`{
              error: password.error
            }`
            @focus='Focus'
            @blur='Blur'
          )
          p.button
            el-button.login_button(
              :loading='loading'
              @click='submit'
            ) 登录
          p
            router-link(
              to='forgetPassword'
            ) 忘记密码？
          p 新员工？
            a(
              href='javascript: void(0)'
              @click='register'
            ) 马上开通
    Register(
      :open.sync='regDialog'
    )
</template>

<script>
import '@/assets/scss/pages/login.scss'
// import store from '@/store'
import { setTimeout } from 'timers'
import Register from './register'
import Progress from '@/plugin/Progress'
export default {
  components: {
    Register
  },
  data () {
    return {
      focus: false,
      show: false,
      loading: false,
      error: '',
      regDialog: false,
      username: {
        placeholder: '用户名 / 邮箱 / 手机号',
        value: '',
        error: false
      },
      password: {
        placeholder: '密码',
        value: '',
        error: false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // store.commit('pageLoading', 2)
    Progress
    setTimeout(() => {
      next()
    })
  },
  created () {
    this.keydown.bind(this)
  },
  watch: {
    focus () {
      if (this.focus) {
        addEventListener('keydown', this.keydown)
      } else {
        removeEventListener('keydown', this.keydown)
      }
    },
    error (value) {
      if(value){
        this.$message.error({
          message: value,
          duration: 3000,
          onClose: () => {
            this.error = ''
          }
        })
      }
    },
    'username.value' () {
      setTimeout(() => {
        this.username.error = false
      })
    },
    'password.value' () {
      setTimeout(() => {
        this.password.error = false
      })
    }
  },
  methods: {
    keydown (e) {
      const code = e.keyCode || e.which || e.charCode
      if (code === 13) {
        this.submit()
      }
    },
    verification () {
      return new Promise(async (resolve, reject) => {
        if (!this.username.value) {
          this.username.error = true
          setTimeout(() => {
            this.$refs.username.focus()
          })
          return reject('用户名不能为空')
        } else if (!this.password.value) {
          this.password.error = true
          setTimeout(() => {
            this.$refs.password.focus()
          })
          return reject('密码不能为空')
        }
        try {
          const res = await this.post()
          resolve(res)
        } catch (err) {
          this.username.error = true
          this.password.error = true
          setTimeout(() => {
            this.$refs.username.focus()
          })
          reject('用户名或密码无效，请核对后重新输入')
        }
      })
    },
    async post () {
      return this.$store.dispatch('getUser', {user: this.username.value, pwd: this.password.value})
    },
    async submit () {
      this.focus = false
      this.loading = true
      try{
        await this.verification()
      }catch (err) {
        this.error = err
        this.loading = false
      }
    },
    allPreloading () {
      setTimeout(() => {
        this.show = true
        this.$store.commit('pageLoading', 3)
      })
    },
    Focus () {
      this.focus = true
    },
    Blur () {
      this.focus = false
    },
    register () {
      this.regDialog = true
    }
  }
}
</script>
