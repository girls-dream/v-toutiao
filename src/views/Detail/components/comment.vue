<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      ref="child"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
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
            <van-button size="mini" type="default" @click="$emit('clickReply', item)"
              >回复{{ item.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
 
  </div>
</template>

<script>
import { getComments } from "@/api";
export default {
  name: "ArticleComment",
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: '',
      limit:9999,
      error: false,
    };
  },
  created() {
    this.onLoad();
  },
  props: {
    source: {
      type: [Number, Object, String],
      require: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async onLoad() {
      try {
        // console.log(this.source);
        // if (Math.random() < 0.3) {
        //   throw new Error("加载失败");
        // }
        const res = await getComments({
          type: "a",
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        console.log(res);
        const result = res.data.data.results;
        this.list.push(...result);
        this.$emit("total", res.data.data);
        this.loading = false;
        if (result.length) {
          this.offset = res.data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
