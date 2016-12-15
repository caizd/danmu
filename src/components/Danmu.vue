<template>
  <div class="hello">
    <div v-for="msgObj in CHAT.msgArr">
      <div v-if="!msgObj.login&&!msgObj.logout">
        <marquee direction="left" behavior="slide" v-if="msgObj.userid!=CHAT.userid" >{{ msgObj.msg }}</marquee>
        <marquee direction="left" behavior="slide" style="color: red;" v-if="msgObj.userid==CHAT.userid" >{{ msgObj.msg }}</marquee>
      </div>
    </div>
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
        CHAT
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
      window.localStorage.setItem('color', '333')
      window.localStorage.setItem('weichat', 'weichatthis')
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
