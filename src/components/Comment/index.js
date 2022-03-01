import JuejinComment from './index.vue'

// 以 plugin 的形式制作成全局组件
JuejinComment.install = function (Vue) {
  Vue.component(JuejinComment.name, JuejinComment)
}

if (typeof window !== 'undefined' && window.Vue) {
  JuejinComment.install(window.Vue)
}
// 既可以全局使用也可以局部使用
export default JuejinComment
