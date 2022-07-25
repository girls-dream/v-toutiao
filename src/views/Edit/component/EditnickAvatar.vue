<template>
  <div>
    <input type="file" hidden ref="file" accept=".png,.jpg" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        fit="contain"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      ></van-image>
    </van-cell>
  </div>
</template>

<script>
import { getEditUser } from "@/api";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$refs.file.addEventListener("change", (e) => {
      let file = e.target.files[0];
      console.log(file);
    });
  },
};
</script>

<style scoped lang="less">
/deep/ .van-uploader__wrapper {
  width: 50px;
  height: 70px;
}
/deep/ .van-image__img {
  width: 64px;
  height: 64px;
}
</style>
