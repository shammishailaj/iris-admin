import component from './component'

const _progress = {
  init (Vue) {
    Object.defineProperty(Vue.prototype, '$progress', {
      get: () => this.$progress.$
    })
  },
  $progress () {
    return {
      init (store) {
        this.$.beforeStart = this.$.beforeStart(store)
        this.$.start = this.$.start(store)
        this.$.loading = this.$.loading(store)
        this.$.hold = this.$.hold(store)
        this.$.end = this.$.end(store)
        this.$.close = this.$.close(store)
      },
      $: {
        beforeStart: store => function beforeStart () {
          store.commit('update', {
            type: 'progress',
            message: 4
          })
        },
        start: store => function start () {
          store.commit('update', {
            type: 'progress',
            message: 0
          })
        },
        loading: store => function loading () {
          store.commit('update', {
            type: 'progress',
            message: 1
          })
        },
        hold: store => function loading () {
          store.commit('update', {
            type: 'progress',
            message: 2
          })
        },
        end: store => function end () {
          if (store.state.progress.status !== 2) {
            store.commit('update', {
              type: 'progress',
              message: 3
            })
          }
        },
        close: store => function loading () {
          store.commit('update', {
            type: 'progress',
            message: -1
          })
        }
      }
    }
  },
  store: {
    modules: {
      state: {
        status: -1
      },
      mutations: {
        update (state, { type, message }) {
          if (type !== 'progress') {
            return
          }
          state.status = message
        }
      }
    },
    init (store) {
      store.registerModule(['progress'], this.modules, {state: this.modules.state})
    }
  },
  router: {
    init (router, progress) {
      router.beforeEach(this.beforeEach.bind(progress))
      router.afterEach(this.afterEach.bind(progress))
      router.onError(this.error.bind(progress))
    },
    beforeEach (to, from, next) {
      this.beforeStart()
      next()
    },
    afterEach () {
      this.end()
    },
    error () {
      this.end()
    }
  },
  use () {
    return {
      install: (Vue, { store, router }) => {
        Vue.component('Progress', component)
        this.store.init(store)
        this.router.init(router, _progress.$progress.$)
        this.$progress.init(store)
        this.init(Vue)
      }
    }
  }
}

_progress.$progress = _progress.$progress()

export default _progress.use.call(_progress)