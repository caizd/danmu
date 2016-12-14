<template>
  <div id="app">
    <Danmu></Danmu>
  </div>
</template>

<script>
import Danmu from './components/Danmu'
export default {
  name: 'app',
  components: {
    Danmu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 40px;
}
</style>
