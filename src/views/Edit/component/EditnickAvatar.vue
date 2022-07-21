<template>
  <div>
    <!-- <van-cell is-link
      >头像
      <van-uploader v-model="fileList" :after-read="afterRead" />
    </van-cell> -->
    <!-- <input type="file" hidden ref="file" @change="onFileChange"> -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round  />
    </van-cell>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
