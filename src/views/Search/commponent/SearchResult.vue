<template>
  <div>
    <van-list
      v-model="loading"
      @load="getSearch"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="(item, index) in resultList" :key="index">
        <!-- 改变搜索建议包含输入的样式 -->
        {{ item.title }}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      resultList: [],
      page: 1,
      perPage: 20,
      loading: false,
      finished: false,
      error:false
    };
  },
  created() {
    this.getSearch();
  },
  methods: {
    //获取搜索建议，并处理数据
    async getSearch() {
      try {
        if (Math.random() < 0.5) {
          throw new Error("错误了");
        }
        const res = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.value, // 搜索关键字
        });
        // console.log(res.data.data.results);
        // 2. 将数据添加到列表中
        const { results } = res.data.data;
        this.resultList.push(...results);
        // 3. 设置加载状态结束
        this.loading = false;
        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++; // 更新获取下一页数据的页码
        } else {
          this.finished = true; // 没有数据了，将加载状态设置结束，不再 onLoad
        }
        if (res.data.data.results.length === 0) {
          this.$toast.fail("已经到底啦");
        }
      } catch (error) {
        // console.log(error);
        this.error = true;
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
