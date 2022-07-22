<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="header" title="个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="backPage" />
      </template>
    </van-nav-bar>
    <!-- main -->
    <EditnickAvatar></EditnickAvatar>
    <Editnickname></Editnickname>
    <EditnickSex></EditnickSex>
    <EditnickBirthday></EditnickBirthday>
  </div>
</template>

<script>
import EditnickAvatar from "@/views/Edit/component/EditnickAvatar.vue";
import Editnickname from "@/views/Edit/component/Editnickname.vue";
import EditnickSex from "@/views/Edit/component/EditnickSex.vue";
import EditnickBirthday from "@/views/Edit/component/EditnickBirthday.vue";

export default {
  data() {
    return {
      
    };
  },
  components: {
    EditnickAvatar,
    Editnickname,
    EditnickSex,
    EditnickBirthday,
  },
  methods: {
    backPage() {
      this.$router.back();
    },
    
  },
  
};
</script>

<style scoped lang="less">
.header {
  /deep/ .van-nav-bar__content {
    background: #3296fa;
  }
}
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
</style>
