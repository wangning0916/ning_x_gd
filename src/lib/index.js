import commonGd from '@/lib/gd.vue'

let t3Gd = {}

t3Gd.install = function (Vue, options) {
  Vue.prototype.$msg = 'Hello I am test'

  Vue.prototype.$myMethod = function (arr) {
    if (arr.lengh < 0) {
      return false
    } else {
      arr = arr.join('-')
      return arr
    }
  }

  Vue.component(commonGd.name, commonGd)
}

export default t3Gd
