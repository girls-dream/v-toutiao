<template>
  <div id="app">
    <router-view />
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-shipin"></i>
    </div>
    <div class="box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background: pink;
}
</style>
