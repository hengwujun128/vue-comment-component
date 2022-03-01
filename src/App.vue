<template>
  <div id="app">
    <div ref="header" class="change-role">
      <div class="change" @click="changeUser">
        切换角色
      </div>
      <div class="current-role">
        <img :src="currentUser.avatar" />
        <span>{{
          currentUser.name + (currentUser.author ? '（作者）' : '（游客）')
        }}</span>
      </div>
    </div>
    <div ref="comment" :style="wrapStyle" class="comment-wrap">
      <Comment
        v-model="data"
        :user="currentUser"
        :before-submit="submit"
        :before-like="like"
        :before-delete="deleteComment"
        :upload-img="uploadImg"
        :props="props"
      />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import { EXAMPLE_DATA } from './data'

export default {
  name: 'App',
  components: {
    Comment,
  },
  data() {
    const users = [
      {
        name: 'Up&Up',
        avatar: require('./assets/image/avatar1.jpg'),
        author: true,
      },
      {
        name: '我叫白云',
        avatar: require('./assets/image/comment.png'),
      },
      {
        name: '我叫黑土',
        avatar: require('./assets/image/avatar3.jpg'),
      },
      {
        name: 'NARUTO',
        avatar: require('./assets/image/avatar2.jpg'),
      },
    ]
    return {
      data: [],
      // 单条评论模型, 可以用于修改模型中的字段
      props: {
        id: '_id', // 唯一 id，必需
        content: 'content', // 评论内容，必需
        imgSrc: 'imgSrc', // 评论中的图片地址，非必需
        children: 'childrenComments', // 子评论（回复），非必需
        likes: 'likes', // 点赞数，非必需
        liked: 'liked', // 是否已点赞，非必需
        reply: 'reply', // 子评论（回复）人信息，非必需
        createAt: 'createAt', // 评论时间，必需
        user: 'visitor',  // 评论人信息，必需 ,可以是个 object
      },
      currentUser: users[0], // 当前用户
      users,
      wrapStyle: '',
    }
  },
  created() {
    this.addData(1)
  },
  mounted() {
    // 控制组件中的容器大小
    const header = this.$refs.header
    this.wrapStyle = `height: calc(100vh - ${header.clientHeight + 20}px)`
  },
  methods: {
    async submit(newComment, parent, add) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ newComment, parent })
        }, 300)
      })

      add(Object.assign(res.newComment, { _id: new Date().getTime() }))

      console.log('addComment: ', res)
    },

    async like(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment)
        }, 0)
      })

      console.log('likeComment: ', res)
    },

    /**
    上传图片的回调函数,通过 porps 传递给子组件
     */
    async uploadImg({ file, callback }) {
      const res = await new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
          resolve(reader.result)
        }

        reader.onerror = () => {
          reject(reader.error)
        }
      })

      callback(res)
      console.log('uploadImg： ', res)
    },

    async deleteComment(comment, parent) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ comment, parent })
        }, 300)
      })

      console.log('deleteComment: ', res)
    },

    changeUser() {
      const users = this.users
      const index = users.findIndex((c) => c.name === this.currentUser.name)

      this.currentUser = users[index === users.length - 1 ? 0 : index + 1]
      this.$refs.comment.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    },

    addData(times) {
      setTimeout(() => {
        //todo算法: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
        this.data = new Array(times).fill(EXAMPLE_DATA).flat(Infinity)
        console.log(this.data)
      }, 0)
    },
  },
}
</script>

<style lang="scss">
@mixin scroll-style(
  $thumb: rgba(255, 255, 255, 0.6),
  $track: rgba(255, 255, 255, 0)
) {
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    border: none;
    box-shadow: none;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: $thumb;
  }
  &::-webkit-scrollbar-track {
    background: $track;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 14px;
}

html,
body,
#app {
  height: 100%;
}

@media screen and (min-width: 320px) {
  html {
    font-size: calc(14px + 4 * ((100vw - 320px) / (1200 - 320)));
  }
}

@media screen and (min-width: 1200px) {
  html {
    font-size: 18px;
  }
}

.change-role {
  background: #1c2433;
  color: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  .change {
    cursor: pointer;
    padding: 0.4rem;
    margin-right: 2rem;
    font-size: 0.9rem;
    border: 1px solid #e99210;
    border-radius: 5px;
    user-select: none;
    &:hover {
      opacity: 0.9;
    }
  }
  .current-role {
    min-width: 15rem;
    color: #e99210;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e99210;
    padding: 0 1rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

.comment-wrap {
  overflow: auto;
  @include scroll-style(#db8f1c, #b9b9b9);
}

@media screen and (min-width: 760px) {
  body {
    margin: 0 10%;
    border: 1px dashed #eee;
  }
}

@media screen and (max-width: 500px) {
  .change-role .current-role {
    min-width: 5rem;
    padding: 0 0.5rem;
  }
}
</style>
