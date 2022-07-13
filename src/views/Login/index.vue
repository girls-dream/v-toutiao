<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="登录"
      left-arrow
      @click-left="backToPrePage"
    >
      <template #left> <van-icon name="cross" /></template>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="用户名"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号'}]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="密码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  data() {
    return {
      mobile: "",
      code: "",
    };
  },
  methods: {
    backToPrePage() {
      this.$router.back()
    },
    async onSubmit() {
      const res = await login(this.mobile, this.code)
      console.log(res);
    },
  },
};
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
:deep(.van-field__label) {
  flex: 1;
}
:deep(.van-cell__value) {
  flex: 20;
}
.toutiao {
  font-size: 0.47rem;
}
.code-btn {
  background-color: #eee;
  color: #666;
  padding: 0 8px 0;
}
</style>
