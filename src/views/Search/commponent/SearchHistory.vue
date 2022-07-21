<template>
  <div>
    <!-- 历史记录 -->
    <van-cell title="历史记录">
      <div v-if="isShow">
        <span @click="delAll">全部删除 </span>
        <span @click="isShow = !isShow"> 完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isShow = !isShow" />
    </van-cell>
    <van-cell
      v-for="(item, index) in history"
      :key="item"
      :title="item"
      @click="determine(index)"
    >
      <div class="x" @click="del">
        <van-icon name="close" v-if="isShow"></van-icon>
      </div>
    </van-cell>
    <!-- /历史记录 -->
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    delAll() {
      this.$emit("delAll");
    },
    del() {
      this.$emit("del");
    },
    //点击历史跳转结果页面
    determine(index) {
      // console.log(this.history[index]);
      this.$emit("determine", this.history[index]);
    },
  },
  created() {
    // localStorage.getItem("HIS");
  },
};
</script>

<style scoped lang="less">
.x {
  width: 20px;
  height: 20px;
  position: relative;
  left: 300px;
  top: 0;
}
</style>
