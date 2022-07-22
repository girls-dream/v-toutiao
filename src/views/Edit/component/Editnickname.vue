<template>
  <div>
    <van-cell
      is-link
      @click="showPopup"
      title="昵称"
      :value="ninckNameList.name"
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        class="nickname"
      ></van-nav-bar>
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="8"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
import { getEditUser } from "@/api";
import { EditUser } from "@/api";

export default {
  data() {
    return {
      show: false,
      message: "",
      ninckNameList: {},
    };
  },
  methods: {
    async showPopup() {
      this.show = true;
    },
    async onClickRight() {
      //编辑用户
      const res = await EditUser({
        name: this.message,
      });
      this.ninckNameList.name = this.message;
      console.log(res);
      this.show = false;
    },
    onClickLeft() {
      this.show = false;
    },
    async getEditUser() {
      const { data } = await getEditUser();
      this.ninckNameList = data.data;
      // console.log(this.ninckNameList);
      this.message = this.ninckNameList.name;
      // console.log(this.ninckNameList);
      // this.gender = [data.data.gender ? "男" : "女"];
      // console.log(this.gender);
    },
  },
  created() {
    this.getEditUser();
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
