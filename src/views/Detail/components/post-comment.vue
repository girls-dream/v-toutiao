<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <button class="van" @click="release">发布</button>
  </div>
</template>

<script>
import { releaseComments } from "@/api";
export default {
  name: "PostComment",
  components: {},
  props: {
    target: {//传文章id
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.release();
  },
  mounted() {},
  methods: {
    async release() {
      this.$toast.loading({
        message: "发布中..",
        forbidClick: true,
      });
      try {
        const { data } = await releaseComments({
          target: this.target,
          content: this.message,
          art_id: null,
        });
        console.log(data);
        this.$emit("release", data.data);
        this.message = "";
        this.$toast.success('发布成功')
      } catch (error) {
        if (error.response.status == 400) {
          this.$toast("请输入内容");
        } else if(error.response.status == 401){
          this.$toast("没有登陆，请登录");
        } else {
          this.$toast("发布失败");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
/deep/ .van {
  background-color: transparent;
  color: #6ba3d8;
  border: 1px solid #fff;
  height: 150px;
  position: relative;
  left: 0;
  top: -10px;
  font-size: 30px;
}
</style>
