<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        background="#3296fa"
        class="search"
        @focus="vsSearchSuggestion"
      />
    </form>
    <!-- 搜索结果 -->
    <!-- <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult>
    <SearchHistory></SearchHistory> -->
    <component :is="comName" :value="value"></component>
  </div>
</template>

<script>
import SearchSuggestion from "./commponent/SearchSuggestion.vue";
import SearchResult from "./commponent/SearchResult.vue";
import SearchHistory from "./commponent/SearchHistory.vue";
export default {
  data() {
    return {
      value: "",
      // isEnter: false,
    };
  },
  computed: {
    comName() {
      //搜索框没有值或者为空字符串
      if (this.value.trim() == "") {
        return 'SearchHistory'
      }
      //搜索框有无摁下回车
      if (this.isEnter) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory,
  },
  methods: {
    onSearch() {
      this.isEnter=true
      console.log(1);
    },
    backToPrePage() {
      this.$router.go(-1);
    },
    vsSearchSuggestion() {
      this.isEnter = false;
    },
  },
};
</script>

<style scoped lang="less">
.search {
  [role="button"] {
    color: #fff;
  }
}
</style>
