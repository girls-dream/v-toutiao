<template>
  <div>
    <van-cell is-link @click="showPopup">昵称</van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        class="nickname"
      ></van-nav-bar>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message:''
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.nickname {
  background: #fff;
  /deep/ .van-nav-bar__title {
    color: #323233;
  }
}
</style>
