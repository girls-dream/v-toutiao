<template>
  <div id="app">
    <router-view />
    <h1>黑马头条</h1>
    <div>
      <i class="toutiao toutiao-dianzan"></i>
    </div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.box {
  width: 750px;
  height: 2.5rem;
  background: pink;
}
</style>
