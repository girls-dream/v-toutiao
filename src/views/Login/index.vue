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
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            format="mm:ss"
            :time="5 * 1000"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          >
            <template #default="timeData">
              <span class="block">{{ timeData.seconds }}秒</span>
            </template>
          </van-count-down>
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login,sendCode } from "@/api/user";
import { mobileRules, codeRules } from "./rules.js";
export default {
  data() {
    return {
      mobile: "",
      code: "",
      codeRules,
      mobileRules,
      isShowCountDown: false,
    };
  },
  methods: {
    backToPrePage() {
      this.$router.back();
    },
    async onSubmit() {
      this.$toast.loading({
        message: "加载中..",
        forbidClick: true,
      });
      try {
        const res = await login(this.mobile, this.code);
        console.log(res);
        //存储token
        this.$store.commit('setUser', res.data.data)
        //跳转页面
        this.$router.push('./profile')
        //提示成功
        this.$toast.success("登录成功");
      } catch (error) {
        const status = error.response.status;
        let message = "登陆错误请刷新";
        if (status === 400) {
          message = error.response.data.message;
        }
        this.$toast.fail(message);
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登陆错误请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登陆错误请刷新')
        //     break
        // }
      }
    },
    async sendCode() {
      try {
        await this.$refs.form.validate("mobile");
        await sendCode(this.mobile);
        this.isShowCountDown = true;
      } catch (error) {
        // console.log(error);
        if (!error.response) {
          this.$toast.fail("手机号格式不正确");
        } else {
          const status = error.response.status
          if (status==404||status==429) {
          this.$toast.fail(error.response.data.message);
          }
        }
      }
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
