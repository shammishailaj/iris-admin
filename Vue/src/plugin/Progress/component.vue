<template lang="pug">
  div#progress
    div(
      :class='name',
      :style=`{
        width: width && width + '%'
      }`
    )
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      name: null,
      progress: null,
      width: null,
      loading: null
    }
  },
  computed: {
    Progress () {
      return this.$store.state.progress.status
    }
  },
  watch: {
    Progress () {
      this.changeName()
    }
  },
  created () {
    this.animationEnd_start.bind(this)
    this.animationEnd_end.bind(this)
  },
  mounted () {
    this.progress = this.$el.querySelector('div')
    this.changeName()
  },
  methods: {
    changeName () {
      this.loading && clearInterval(this.loading)
      this.loading = null
      switch (this.Progress) {
        case 0:
          setTimeout(this.animationStart_start.bind(this))
          break
        case 1:
          setTimeout(this.animationStart_loading.bind(this))
          break
        case 2:
          setTimeout(this.animationStart_loading.bind(this))
          break
        case 3:
          setTimeout(this.animationStart_end.bind(this))
          break
        case 4:
          this.animationBeforeStart_start.call(this)
          break
        default:
          this.name = null
          this.width = null
      }
    },
    animationBeforeStart_start () {
      // this.progress.removeEventListener('transitionend', this.animationEnd_start)
      // this.progress.removeEventListener('transitionend', this.animationEnd_end)
      this.name = ''
      this.$nextTick(() => {
        this.$progress.start()
      })
    },
    animationStart_start () {
      this.name = 'progress-start'
      this.progress.addEventListener('transitionend', this.animationEnd_start)
    },
    animationEnd_start () {
      this.progress.removeEventListener('transitionend', this.animationEnd_start)
      this.width = 20
      this.$progress.loading()
    },
    animationStart_loading () {
      if (0 !==  this.Progress && 1 !==  this.Progress) {
        return
      }
      this.name = 'progress-loading'
      this.loading = setInterval(() => {
        this.width += Math.random() * 1.2
      }, Math.random() * 500)
    },
    animationStart_end () {
      this.width = null
      this.name = 'progress-end'
      this.progress.addEventListener('transitionend', this.animationEnd_end)
    },
    animationEnd_end () {
      this.progress.removeEventListener('transitionend', this.animationEnd_end)
      this.$progress.close()
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
