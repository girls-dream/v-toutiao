<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import request from './utils/request'
export default {
  data() {
    return {}
  },
  created() {
    console.dir(request)
  },
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
