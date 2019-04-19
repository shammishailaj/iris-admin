<template lang="pug">
  el-dialog#register-dialog(
    title='注册'
    width='30%'
    :visible.sync='dialog'
    :append-to-body	='true'
    :show-close='false'
  )
    div.form
      el-input(
        ref='username'
        :placeholder='username.placeholder'
        :disabled='loading'
        :class=`{
          error: username.error
        }`
        v-model='username.value'
        @focus='Focus'
        @blur='Blur'
      )
      el-input(
        ref='fullname'
        :placeholder='fullname.placeholder'
        :disabled='loading'
        :class=`{
          error: fullname.error
        }`
        v-model='fullname.value'
        @focus='Focus'
        @blur='Blur'
      )
      el-input(
        ref='phone'
        :placeholder='phone.placeholder'
        v-model='phone.value'
        :disabled='loading'
        :class=`{
          error: phone.error
        }`
        type='number'
        @focus='Focus'
        @blur='Blur'
      )
      el-input(
        ref='password'
        :placeholder='password.placeholder'
        :disabled='loading'
        :class=`{
          error: password.error
        }`
        show-password
        v-model='password.value'
        @focus='Focus'
        @blur='Blur'
      )
      el-input(
        ref='repassword'
        :placeholder='repassword.placeholder'
        :disabled='loading'
        :class=`{
          error: repassword.error
        }`
        show-password
        v-model='repassword.value'
        @focus='Focus'
        @blur='Blur'
      )
    div#register-dialog-footer(
      slot='footer'
    )
      el-button.register(
        @click='register'
      ) 注册
      el-button(
        @click='close()'
      ) 关闭
</template>

<script>
import '@/assets/scss/pages/register.scss'
import Axios from '@/plugin/axios'
export default {
  props: {
    open: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      loading: false,
      dialog: this.open,
      error: '',
      focus: false,
      username: {
        placeholder: '用户名',
        value: '',
        error: false
      },
      fullname: {
        placeholder: '姓名',
        value: '',
        error: false
      },
      phone: {
        placeholder: '手机号码',
        value: '',
        error: false
      },
      password: {
        placeholder: '密码',
        value: '',
        error: false
      },
      repassword: {
        placeholder: '确认密码',
        value: '',
        error: false
      }
    }
  },
  watch: {
    open () {
      this.dialog = this.open
    },
    dialog (val) {
      if (val) {
        setTimeout(() => {
          this.$refs.username.focus()
        })
      }
      this.close(val)
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
    focus () {
      if (this.focus) {
        addEventListener('keydown', this.keydown)
      } else {
        removeEventListener('keydown', this.keydown)
      }
    },
    'username.value' () {
      this.username.error = false
    },
    'fullname.value' () {
      this.fullname.error = false
    },
    'phone.value' () {
      this.phone.error = false
    },
    'password.value' () {
      this.password.error = false
    },
    'repassword.value' () {
      this.repassword.error = false
    }
  },
  methods: {
    keydown (e) {
      const code = e.keyCode || e.which || e.charCode
      if (code === 13) {
        this.register()
      }
    },
    close (status) {
      this.$emit('update:open', status ? true : false)
    },
    verification () {
      const {username, fullname, phone, password, repassword} = this
      return new Promise(async (resolve, reject) => {
        if (!username.value) {
          username.error = true
          setTimeout(() => {
            this.$refs.username.focus()
          })
          return reject('用户名不能为空')
        } else if (!fullname.value) {
          fullname.error = true
          setTimeout(() => {
            this.$refs.fullname.focus()
          })
          return reject('姓名不能为空')
        } else if (!phone.value) {
          this.error = '手机号码不能为空'
          phone.error = true
          setTimeout(() => {
            this.$refs.phone.focus()
          })
          return reject()
        } else if (phone.value.length !== 11) {
          phone.error = true
          setTimeout(() => {
            this.$refs.phone.focus()
          })
          return reject('手机号码格式错误')
        } else if (!password.value) {
          password.error = true
          setTimeout(() => {
            this.$refs.password.focus()
          })
          return reject('密码不能为空')
        } else if (!repassword.value) {
          repassword.error = true
          setTimeout(() => {
            this.$refs.repassword.focus()
          })
          return reject('确认密码不能为空')
        } else if (password.value !== repassword.value) {
          password.error = true
          repassword.error = true
          setTimeout(() => {
            this.$refs.password.focus()
          })
          return reject('两次密码不一致')
        }
        const user = username.value
        const fullName = fullname.value
        const pwd = password.value
        const Phone = phone.value
        let User = null
        try {
          User = await Axios({
            method: 'POST',
            url: 'register',
            data: {user, pwd, fullname: fullName, phone: Phone}
          })
          return resolve(User.data)
        } catch (err) {
          return reject(err.response.data.message)
        }
        
      })
    },
    async register () {
      this.username.error = false
      this.fullname.error = false
      this.phone.error = false
      this.password.error = false
      this.repassword.error = false
      try {
        const res = await this.verification()
        this.$message({
          message: res.message,
          type: 'success',
          duration: 3000
        })
        this.$emit('update:open', false)
      } catch (err) {
        this.error = err
      }
    },
    Focus () {
      this.focus = true
    },
    Blur () {
      this.focus = false
    }
  }
}
</script>
