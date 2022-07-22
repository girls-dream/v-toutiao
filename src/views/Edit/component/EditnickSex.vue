<template>
  <div>
    <van-cell
      is-link
      @click="showPopup"
      title="性别"
      :value="columns[userInfo.gender]"
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '45%' }">
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columns"
        confirm-button-text="确认"
        @confirm="onConfirm"
        @cancel="onCancel"
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
      showPicker: true,
      columns: ["男", "女"],
      userInfo: {},
    };
  },
  created() {
    console.log(this.sex);
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    async onConfirm(value, index) {
      //编辑用户
      const res = await EditUser({
        gender: value === "男" ? 0 : 1,
      });
      console.log(res);
      this.userInfo.gender = value === "男" ? 0 : 1;
      this.show = false;
    },
    async getEditUser() {
      const { data } = await getEditUser();
      this.userInfo = data.data;
      // console.log(this.userInfo);
      // this.gender = [data.data.gender ? "男" : "女"];
      // console.log(this.gender);
    },
    onCancel() {
      this.show = false;
    }
  },
  created() {
    this.getEditUser();
  },
};
</script>

<style></style>
