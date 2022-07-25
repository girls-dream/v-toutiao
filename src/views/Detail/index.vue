<template>
  <div class="big">
    <div class="article-container">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="黑马头条"
        @click-left="onClickLeft"
      ></van-nav-bar>
      <!-- /导航栏 -->

      <div class="main-wrap">
        <!-- 加载中 -->
        <div class="loading-wrap" v-if="loading">
          <van-loading color="#3296fa" vertical>加载中</van-loading>
        </div>
        <!-- /加载中 -->

        <!-- 加载完成-文章详情 -->
        <div class="article-detail markdown-body" v-else-if="article.title">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{ article.aut_name }}</div>
            <div slot="label" class="publish-date">{{ dayNow() }}</div>
            <van-button
              v-if="article.is_followed"
              class="follow-btn"
              round
              size="small"
              @click="onFollowed"
              >已关注</van-button
            >
            <van-button
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
              @click="onFollowed"
              v-else
              >关注</van-button
            >
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content"
            ref="article-detail"
            v-html="article.content"
          ></div>
          <van-divider id="contentEnd">正文结束</van-divider>
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：404 -->
        <div class="error-wrap" v-else-if="errorState === 404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn" @click="getArticle"
            >点击重试</van-button
          >
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <!-- 文章评论 -->
        <!-- :source="articleId" -->
        <Comment
          :source="article.art_id"
          :list="CommentList"
          @total="totalCount = $event.total_count"
          @clickReply="onReplyShow"
        ></Comment>
        <!-- 文章评论 -->
      </div>

      <!-- 底部区域 -->
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow = true"
          >写评论</van-button
        >
        <!-- article.is_collected=true color: rgb(50, 150, 250) -->
        <van-icon
          name="comment-o"
          :info="totalCount"
          color="#777"
          @click="focusCommentArea"
        />
        <!-- v-if="article.is_collected" -->
        <!-- 点击收藏和取消收藏 -->
        <van-icon
          color="#777"
          :name="article.is_collected ? 'star' : 'star-o'"
          @click="fav"
        />
        <!-- <van-icon v-else color="#777" name="star-o" @click="fav" /> -->
        <van-icon color="#777" name="good-job-o" />
        <van-icon name="share" color="#777777"></van-icon>
      </div>
      <!-- /底部区域 -->

      <!-- 发布评论 -->
      <van-popup v-model="isPostShow" position="bottom">
        <PostComment
          :target="article.art_id"
          @release="onRelease"
        ></PostComment>
      </van-popup>

      <!-- 评论回复 -->
      <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
        <commentReply
          @reply="isPostShow = true"
          @close="close"
          :comment="replycomment"
          :commentSonList="commentSon"
        ></commentReply>
          <!-- @commentFinish="comment" -->
      </van-popup>
      <!-- /评论回复 -->
    </div>
  </div>
</template>

<script>
import {
  getArticle,
  getFollowed,
  getOnFollowed,
  getCollection,
  getOnCollection,
  getComments,
} from "@/api";
import dayjs from "@/utils/dayjs";
import { ImagePreview } from "vant";
import Comment from "@/views/Detail/components/comment.vue";
import PostComment from "@/views/Detail/components/post-comment.vue";
import commentReply from "@/views/Detail/components/commentReply.vue";
export default {
  data() {
    return {
      article: {},
      loading: true,
      errorState: 0, //失败状态码
      // articleId: "",
      totalCount: 0,
      isPostShow: false,
      CommentList: [],
      isReplyShow: false,
      replycomment: {},//当前评论项
      commentSon:[],//评论的评论
    };
  },
  components: {
    Comment,
    PostComment,
    commentReply,
  },
  methods: {
    backPage() {
      this.$router.back();
    },
    //获取文章信息
    async getArticle() {
      this.loading = true;
      try {
        const res = await getArticle(this.$route.params.keyword);
        // if (Math.random() < 0.3) {
        //   return (this.loading = false);
        // }
        this.article = res.data.data;
        // this.article.is_collected = this.article.is_collected;
        console.log(res);
        // this.articleId = res.data.data.art_id;
        // console.log(this.articleId);
        setTimeout(() => {
          // console.log(this.$refs["article-detail"]);
          this.preImg();
        }, 0);
        this.loading = false;
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.errorState = 404;
        }
        console.log(error);
        this.loading = false;
      }
    },
    //获取关注
    async onFollowed() {
      try {
        if (this.article.is_followed) {
          //如果关注 就取消
          const res = await getOnFollowed(this.article.aut_id);
          // console.log(res);
          this.article.is_followed = false;
          this.$toast.success("取消关注");
        } else {
          //如果未关注 就关注
          const res = await getFollowed(this.article.aut_id);
          // console.log(res);
          this.article.is_followed = true;
          this.$toast.success("关注成功");
        }
      } catch (error) {
        console.log(error);
        //  this.onFollowed()
        if (error.response.status == 401) {
          this.$toast.fail("需要登陆");
          this.$router.push("/login");
        }
      }
    },
    dayNow() {
      // console.log(this.article);
      return dayjs(this.article.pubdate).fromNow();
    },
    onClickLeft() {
      this.$router.back();
    },
    //图片预览
    preImg() {
      const artImg = this.$refs["article-detail"];
      const images = artImg.querySelectorAll("img");
      // console.log(images);
      const imgUrl = [];
      images.forEach((img, index) => {
        imgUrl.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images: imgUrl,
            startPosition: index,
          });
        };
      });
    },
    //收藏文章
    async fav() {
      try {
        if (this.article.is_collected) {
          //如果收藏 就取消
          const res = await getOnCollection(this.$route.params.keyword);
          // console.log(res);
          this.article.is_collected = false;
          this.$toast.success("取消收藏");
        } else {
          // this.$route.params.keyword
          //如果未收藏 就收藏
          const res = await getCollection(this.$route.params.keyword);
          // console.log(res);
          this.article.is_collected = true;
          this.$toast.success("收藏成功");
        }
      } catch (error) {
        if (error.response && error.response.status == 404) {
          this.errorState = 404;
        }
        console.log(error);
        this.loading = false;
        if (error.response.status == 401) {
          this.$toast.fail("需要登陆");
        }
      }
    },
    //获取评论
    async getComments() {
      console.log(this.$route.params.keyword);
      const res = await getComments({
        type: "a",
        source: this.$route.params.keyword,
      });
      console.log(res);
      this.totalCount = res.data.data.total_count;
      // this.commentSon=res.data.data.results
      // console.log(this.commentSon);
    },
    // //获取评论的评论
    // async getCommentsSon() {
    //   console.log(this.$route.params.keyword);
    //   const res = await getComments({
    //     type: "C",
    //     source: this.$route.params.keyword,
    //   });
    //   console.log(res);
    // },
    //传评论给子
    onRelease(data) {
      console.log(data);
      this.CommentList.unshift(data.new_obj);
      this.isPostShow = false;
    },
    // 点击底部评论图标跳转到评论区位置
    focusCommentArea() {
      const contentEnd = document.querySelector("#contentEnd");
      if (contentEnd) {
        contentEnd.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    // 点击回复弹出弹出层 并且渲染评论的评论
    async onReplyShow(item) {
      // this.getComments()
      this.isReplyShow = true;
      // console.log(item);
      this.replycomment = item; //当前评论项
      // console.log(this.replycomment);
      // this.getComments()
      //获取评论的评论ID
      const res = await getComments({
        type: "c",
        source: item.com_id,
      });
      // console.log(res);
      this.commentSon = res.data.data.results
      // console.log(this.commentSon);
    },
    close() {
      this.isReplyShow = false;
    },
    // comment(item) {
    //   console.log(item);
    //   this.commentSon.unshift(...item)
    // }
  },
  created() {
    this.getArticle();
    this.getComments();
    // this.onReplyShow(item)
    // this.onRelease();
    // console.log(this.$route);
    // this.fav()
  },
};
</script>

<style scoped lang="less">
/deep/ .van-icon-star-o {
  color: rgb(50, 150, 250);
}
@import "../../assets/news.css";
// .big {
//   /deep/ h1 {
//     font-size: 60px;
//   }
//   /deep/ h2 {
//     font-size: 50px;
//   }
//   /deep/ h3 {
//     font-size: 40px;
//   }
//   /deep/ h4 {
//     font-size: 30px;
//   }
//   /deep/ h5 {
//     font-size: 20px;
//   }
//   /deep/ h6 {
//     font-size: 10px;
//   }
// }
/deep/ .van-nav-bar__content {
  background: #3296fa;
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
    // /deep/ img {
    //   width: 80%;
    //   height: 100%;
    // }
    // /deep/ p,
    // /deep/ pre,
    // /deep/ li,
    // /deep/ code,
    // /deep/ span {
    //   font-size: 12px;
    //   width: 100% !important;
    //   display: block !important;
    //   white-space: pre-wrap;
    //   word-wrap: break-word;
    //   overflow: hidden;
    // }
  }
  /deep/ .van-nav-bar__title {
    color: #fff;
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  /deep/ .van-icon {
    color: #fff;
  }
  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
