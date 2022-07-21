<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
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
    <component
      @determine="determine"
      @clickFn="onSearch"
      @del="del"
      @delAll="delAll"
      :is="comName"
      :value="value"
      :history="history"
    ></component>
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
      isEnter: "",
      history:JSON.parse(localStorage.getItem("HIS"))|| [],
    };
  },
  computed: {
    comName() {
      //搜索框没有值或者为空字符串
      if (this.value.trim() == "") {
        return "SearchHistory";
      }
      //搜索框有无摁下回车
      if (this.isEnter) {
        return "SearchResult";
      }
      return "SearchSuggestion";
    },
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory,
  },
  methods: {
    onSearch(value) {
      this.isEnter = true;
      this.value = value;
      const index = this.history.indexOf(value);
      console.log(index);
      if (index !== -1) {
        this.history.splice(index, 1);
      }
      this.history.unshift(value);
      console.log(this.history);
      localStorage.setItem("HIS", JSON.stringify(this.history));
    },
    backToPrePage() {
      this.$router.go(-1);
    },
    vsSearchSuggestion() {
      this.isEnter = false;
    },
    delAll() {
      this.history = [];
    },
    del(value) {
      const index = this.history.indexOf(value);
      this.history.splice(index, 1);
    },
    //点击历史跳转结果页面
    determine(value) {
      this.value = value;
      this.onSearch(value);
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
