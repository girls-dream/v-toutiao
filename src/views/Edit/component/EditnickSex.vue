<template>
  <div>
    <van-cell is-link @click="showPopup">性别</van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '45%' }"
      >内容</van-popup
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style></style>
