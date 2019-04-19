class ImgPreloading {
  constructor () {
    let all = 0
    let success = 0
    ImgPreloading.Example = this
    this.allPreloading = []
    this.body = document.querySelector('body')
    this.box = document.createElement('div')
    this.box.style = 'position: fixed; z-index: -1; opacity: 0'
    Object.defineProperty(this, 'all', {
      get: () => all,
      set: value => {
        if(!all && value){
          this.createdBox()
        }
        all = value
      }
    })
    Object.defineProperty(this, 'success', {
      get: () => success,
      set: value => {
        if(all === value){
          all = 0
          success = 0
          this.allPreloading.map(preloading => {
            if (typeof preloading === 'function') {
              preloading()
            }
          })
          return this.removeBox()
        }
        success = value
      }
    })
  }
  install (Vue) {
    Vue.directive('preloading', this.bind)
  }
  createdBox () {
    const {body, box} = this
    body.insertBefore(box, body.children[0])
  }
  removeBox () {
    const {body, box} = this
    box.innerHTML = ''
    body.removeChild(box)
  }
  bind = (el, binding, vnode) => {
    const {value} = binding
    const {preloading, allPreloading} = value || {}
    const {box} = this
    const src = vnode.data.attrs.src
    if (!src || el.onLoadSuccess) {
      return
    }
    this.allPreloading.push(allPreloading)
    const img = new Image()
    img.src = src
    this.all += 1
    if(img.complete){
      el.onLoadSuccess = true
      this.success += 1
      return
    }
    img.onload = (e) => {
      el.onLoadSuccess = true
      this.preloading(e, preloading)
    }
    img.onerror = (e) => {
      this.preloading(e, preloading)
    }
    box.insertBefore(img, box.children[0])
  }
  preloading (e, preloading) {
    typeof preloading === 'function' && preloading(e)
    this.success += 1
  }
}

export default () => ImgPreloading.Example || new ImgPreloading()