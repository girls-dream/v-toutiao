<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')" />
      <!-- @click="$emit('close')" -->
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 设置滚动容器-->
    <!-- <div class="scroll-wrap"> -->
    <!-- 当前评论项 -->
    <van-cell :title="comment.aut_name">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636">{{ comment.content }}</p>
        <p>
          <span style="margin-right: 10px">{{ comment.pubdate }}</span>
          <van-button size="mini" type="default"
            >回复{{ comment.reply_count }}</van-button
          >
        </p>
      </div>
      <van-icon slot="right-icon" name="like-o" />
    </van-cell>
    <!-- /当前评论项 -->
    <van-cell title="所有回复" />

    <!-- 回复评论 -->
    <div v-if="commentSonList.length !== 0">
      <van-list>
        <van-cell
          v-for="item in commentSonList"
          :key="item.com_id"
          :title="item.aut_name"
        >
          <van-image
            slot="icon"
            round
            width="30"
            height="30"
            style="margin-right: 10px"
            :src="item.aut_photo"
          />
          <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
          <div slot="label">
            <p style="color: #363636">{{ item.content }}</p>
            <p>
              <span style="margin-right: 10px">{{ item.pubdate }}</span>
              <van-button size="mini" type="default"
                >回复{{ item.reply_count }}</van-button
              >
            </p>
          </div>
          <van-icon slot="right-icon" name="like-o" />
        </van-cell>
      </van-list>
    </div>
    <!-- 回复评论 -->
    <!-- 发布评论-->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="comments"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom" style="height: 20%">
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
      <!-- @click="release" -->
      <button class="van" @click="release">发布</button>
    </van-popup>
  </div>
</template>
<script>
import Comment from "./comment.vue";
import PostComment from "./post-comment.vue";
import { releaseComments } from "@/api";
export default {
  data() {
    return {
      isPostShow: false,
      message: "",
      isFinished: false,
      loading: false,
      offset: "",
      limit: 9999,
      error: false,
    };
  },
  props: {
    comment: {
      //当前评论项
      type: Object,
      required: true,
    },
    commentSonList: {
      //评论的评论
      type: Array,
      required: true,
    },
  },
  components: {
    Comment,
    PostComment,
  },
  methods: {
    //点击写评论去评论评论
    comments() {
      this.isPostShow = true;
      // console.log(this.comment);
    },
    //点击发布评论的评论
    async release() {
      // console.log(this.$route.params.keyword);
      try {
        if (this.message == "") {
          this.$toast.fail("请输入评论内容");
        }
        const res = await releaseComments({
          target: this.comment.com_id,
          content: this.message,
          art_id: this.$route.params.keyword,
        });
        console.log(res);
        this.commentSonList.unshift(res.data.data.new_obj);
        if (this.commentSonList.length == 0) {
          this.finished = true;
        }
        console.log(this.commentSonList);
        // this.$emit('commentFinish',this.commentSonList)
      } catch (error) {
        if (error.response.status == 401) {
          this.$toast("没有登陆，请登录");
        } else {
          this.$toast("发布失败");
        }
      }
    },
  },
  created() {
    // this.release();
  },
};
</script>
<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
/deep/ .van-nav-bar__content {
  background: #fff;
  color: black;
}
/deep/ .article-container .van-nav-bar__title {
  color: black;
}
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
  top: 0.86667rem;
  font-size: 30px;
}
.van-popup .van-popup--bottom {
  display: flex;
}
</style>
