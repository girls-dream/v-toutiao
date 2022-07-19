<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search">搜索</van-icon>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannerls" :key="item.id" :title="item.name">
        <ArtcleList :id="item.id"></ArtcleList>
      </van-tab>
      <!-- //更多按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹框 -->
    <EditChannelPopup
      ref="popup"
      @delChannel="del"
      :myChannerls="myChannerls"
      @changeActive="changeActive"
      @addChannels="addMy"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannerls,
  getMyChannelsByLocal,
  setMyChannelsToLocal,
  delChannels,
  addChannels,
} from "@/api";
import ArtcleList from "./component/ArtcleList.vue";
import EditChannelPopup from "./component/EditChannelPopup.vue";

export default {
  data() {
    return {
      active: 0,
      myChannerls: [],
      isShow: false,
    };
  },
  created() {
    this.getMyChannerls();
  },
  methods: {
    async getMyChannerls() {
      try {
        // const { data } = await getMyChannerls();
        // console.log(data);
        // this.myChannerls = data.data.channels;
        if (!this.isLogin) {
          const myChannels = getMyChannelsByLocal();

          if (!!myChannels) {
            this.myChannerls = myChannels;
          } else {
            const { data } = await getMyChannerls();
            this.myChannerls = data.data.channels;
          }
        } else {
          const { data } = await getMyChannerls();
          this.myChannerls = data.data.channels;
        }
      } catch (error) {
        this.$toast.fail("请重新获取频道列表");
      }
    },
    showPopup() {
      // this.isShow=true
      this.$refs.popup.isShow = true;
    },
    async del(id) {
      //删除我的频道
      // console.log(id);
      this.myChannerls = this.myChannerls.filter((item) => item.id !== id);
      if (!this.isLogin) {
        setMyChannelsToLocal(this.myChannerls);
        console.log(this.myChannerls);
      } else {
        try {
          const res = await delChannels(id);
          console.log(res);
        } catch (error) {
          return this.$toast.fail("删除用户频道失败");
        }
      }
      this.$toast.success("删除用户频道成功");
    },
    changeActive(active) {
      this.active = active;
    },
    async addMy(channel) {
      this.myChannerls.push(channel);
      if (!this.isLogin) {
        setMyChannelsToLocal(this.myChannerls);
      } else {
        try {
          await addChannels(channel.id, this.myChannerls.length);
        } catch (error) {
          this.$toast.fail("添加用户频道失败");
        }
      }
      this.$toast.success("添加用户频道成功");
    },
  },
  components: { ArtcleList, EditChannelPopup },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token;
    },
  },
};
</script>

<style lang="less" scoped>
//头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url("@/assets/gradient-gray-line.png");
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
