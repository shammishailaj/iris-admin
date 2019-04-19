<template lang="pug">
  div.menu(
      :class=`{
        class: children.length,
        select: selects,
        open: children.length && open,
        to: id === toIds
      }`
    )
      p(
        @click='openClass'
      )
        span
          el-icon(
            v-if='icon'
            :class='icon'
          )
          slot
        el-icon.playmate.icon-right(
          v-if='children.length'
        )
      div.menuclass(
        v-if='children.length'
      )
        div.menuclassMain
          Items(
            v-if='children.length'
            v-for='(item, index) in children'
            :key='`navigation_${item.id}`'
            :id='item.id'
            :to='item.to'
            :selectId.sync='selectIds'
            :toId.sync='toIds'
            :icon='item.icon'
            :children='item.children'
          )
            | {{item.name}}
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'Items',
  props: {
    id: {
      type: String,
      required: true
    },
    icon: {
      type: [String, Array],
      default: undefined
    },
    children: {
      type: Array,
      default () {
        return []
      }
    },
    to: {
      type: String,
      default: undefined
    },
    toId: {
      type: String,
      default: undefined
    },
    selectId: {
      type: String
    },
    power: {
      default: undefined
    }
  },
  data () {
    return {
      select: false,
      open: false,
      height: 0
    }
  },
  computed: {
    selectIds: {
      get () {
        return this.selectId
      },
      set (value) {
        this.$emit('update:selectId', value)
      }
    },
    toIds: {
      get () {
        return this.toId
      },
      set (value) {
        this.$emit('update:toId', value)
      }
    },
    selects () {
      return this.select || this.toIds === this.id || this.toIds.indexOf(`${this.id}-`) !== -1 ? true : false
    }
  },
  watch: {
    '$route.path' () {
      if (this.$route.path === this.to || this.$route.path.indexOf(`${this.to}/`) === 0) {
        this.openClass()
      }
    },
    selectIds (value) {
      if (value.indexOf(`${this.id}-`) !== -1 || value === this.id) {
        this.select = true
      } else if(this.id.indexOf(`${value}-`) === -1) {
        this.select = false
        if (this.children.length) {
          this.$nextTick(() => {
            this.open = false
          })
        }
      }
    },
    open (val) {
      if (val) {
        const height = this.$el.querySelector('.menuclassMain').offsetHeight;
        this.$el.querySelector('.menuclass').style.height = `${height}px`
        setTimeout(() => {
          this.$el.querySelector('.menuclass').setAttribute('style', '')
        }, 300)
      } else {
        const height = this.$el.querySelector('.menuclassMain').offsetHeight;
        this.$el.querySelector('.menuclass').style.height = `${height}px`
        setTimeout(() => {
          this.$el.querySelector('.menuclass').style.height = 0
          setTimeout(() => {
            this.$el.querySelector('.menuclass').setAttribute('style', '')
          }, 300)
        })
      }
    }
  },
  created () {
    if (this.selectIds.indexOf(`${this.id}-`) !== -1 || this.selectIds === this.id) {
      this.select = true
      if (this.children.length) {
        this.$nextTick(() => {
          this.open = true
        })
      }
    }
  },
  methods: {
    openClass () {
      if(this.to){
        // if (this.$store.state.pageLoading !== -1) {
        //   return
        // }
        this.toIds = this.id
        this.$router.push(this.to)
      }
      if (this.children.length) {
        this.$nextTick(() => {
          this.open = !this.open
        })
      }
      this.selectIds = this.id
    }
  }
}
</script>
