<template>
  <div>
    <van-cell
      is-link
      @click="showPopup"
      :value="timeList"
      title="生日"
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '45%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { getEditUser } from "@/api";
import { EditUser } from "@/api";
import moment from "moment";
export default {
  data() {
    return {
      show: false,
      minDate: new Date(1922, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      timeList: "",
    };
  },
  methods: {
    showPopup() {
      this.show = true;
      // this.onConfirm()
      this.currentDate = new Date(this.timeList);
      // console.log(this.currentDate);
    },
    async onConfirm(value) {
      const selTime = moment(value).format("YYYY-MM-DD");
      const res = await EditUser({
        birthday: selTime,
      });
      console.log(res);
      this.currentDate = moment(new Date(selTime)).format("YYYY-MM-DD");
      // console.log(this.currentDate);
      this.timeList = this.currentDate;
      // this.timeList = moment(this.timeList).format("YYYY-MM-DD");
      // console.log(this.timeList);
      // this.currentDate = moment(value).format("YYYY-MM-DD");
      // this.timeList=this.
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    async getEditUser() {
      const { data } = await getEditUser();
      // console.log(data.data.birthday);
      this.timeList = data.data.birthday;
      // console.log(this.timeList);
      this.timeList = moment(this.timeList).format("YYYY-MM-DD");
      // console.log(this.timeList);
      this.currentDate = moment(this.currentDate).format("YYYY-MM-DD");
      this.currentDate = this.timeList;
      // console.log(this.currentDate);
    },
  },
  created() {
    this.getEditUser();
    this.currentDate = new Date(this.timeList);
    // console.log(this.currentDate);
  },
};
</script>

<style></style>
