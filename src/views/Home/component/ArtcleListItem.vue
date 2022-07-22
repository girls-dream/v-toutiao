<template>
  <div @click="art">
    <van-cell
      :title="articleInfo.title"
      :label="artcleDesc"
      v-if="articleInfo.cover.type === 0"
    />
    <van-cell
      :title="articleInfo.title"
      :label="artcleDesc"
      v-if="articleInfo.cover.type === 1"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <van-cell
      :title="articleInfo.title"
      :label="artcleDesc"
      v-if="articleInfo.cover.type === 3"
    >
      <template #label>
        <div>
          <!-- 图片 -->
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <!-- 描述 -->
        <span>{{ artcleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
// import getArticle from '@/api'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    artcleDesc() {
      const art = this.articleInfo
      const relativeTime=dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime}`
    },
  },
  methods: {
    art() {
      this.$emit('Art')
    },
    
  }
};
</script>

<style></style>
