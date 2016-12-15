<template>
  <div class="hello">
    <input v-model="msg" />
    <button @click="send">发送</button>
  </div>
</template>

<script>
  import CHAT from '../api/Chat'

  export default {
    name: 'Danmu',
    data () {
      return {
        CHAT,
        msg: ''
      }
    },
    created () {
      if (window.localStorage) {
        console.log('浏览支持localStorage')
      } else {
        console.log('浏览暂不支持localStorage')
      }
      // if (window.localStorage) {
      window.localStorage.setItem('name', CHAT.genUid())
      window.localStorage.setItem('color', CHAT.randomColor())
      window.localStorage.setItem('photo', CHAT.randomPhoto())
      window.localStorage.setItem('userid', CHAT.genUid())
      // }
      CHAT.init('name')
    },
    methods: {
      send: function () {
        CHAT.submit(this.msg)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
