export default {
  props: {
    sub: {
      type: Boolean,
      default: false,
    },
  },
  render(h) {
    // 就是一个容器,判断是评论列表:comment-list还是子评论列表sub-comment-list
    const className = this.sub ? 'sub-comment-list' : 'comment-list'
    return h('div', { class: className }, this.$slots.default)
  },
}
