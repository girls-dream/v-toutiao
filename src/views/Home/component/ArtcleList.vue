<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      :success-text='success'
    >
      <van-list
        @load="loadNextPage"
        offset="1"
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="isFinished"
        finished-text="没有更多了~~~"
      >
        <ArtcleListItem
          v-for="item,index in articles"
          :key="index"
          :articleInfo="item"
        ></ArtcleListItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArtcleListItem from "./ArtcleListItem.vue";
import { getArtcleList } from "@/api";
export default {
  data() {
    return {
      articles: [],
      pre_timestamp: "",
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false,
      success:'刷新成功'
    };
  },
  components: {
    ArtcleListItem,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    this.getArtcleList();
  },
  methods: {
    async getArtcleList() {
      try {
        const { data } = await getArtcleList(this.id, +new Date());
        console.log(data);
        //保存第一页页码
        this.pre_timestamp = data.data.pre_timestamp;
        this.articles = data.data.results;
      } catch (error) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error(error.response.data.message);
        } else {
          this.$toast.fail("获取文章列表失败，请重新刷新");
        }
      }
    },
    async loadNextPage() {
      try {
        if (Math.random() < 0.3) {
          throw new Error("错误了");
        }
        const { data } = await getArtcleList(this.id, this.pre_timestamp);
        // console.log(data);
        if (!data.data.pre_timestamp) {
          this.isFinished = true;
this.success='暂无更多'
          return;
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results);
        } else {
          this.articles.push(...data.data.results);
        }
        // this.articles.push(...data.data.results);
        this.pre_timestamp = data.data.pre_timestamp;
        // console.log(this.pre_timestamp);
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
        this.refreshLoading = false;
      }
    },
  },
};
</script>

<style></style>
