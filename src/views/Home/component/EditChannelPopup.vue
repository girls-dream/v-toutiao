<template>
  <div>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '95%' }"
      closeable
      close-icon-position="top-left"
    >
      <div class="popupMain">
        <!-- 我的频道 -->
        <div class="my-channel">
          <van-cell title="我的频道">
            <van-button
              size="small"
              round
              class="edit-btn"
              @click="isEdit = !isEdit"
              >{{ isEdit ? "完成" : "编辑" }}</van-button
            >
          </van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              v-for="(item, index) in myChannerls"
              :key="item.id"
              :class="{ 'active-channel': item.name === '推荐' }"
              @click="onClickMyChannel(item, index)"
            >
              <template #icon>
                <van-icon
                  v-show="isEdit && item.name !== '推荐'"
                  name="cross"
                  class="cha"
                />
              </template>
            </van-grid-item>
          </van-grid>
        </div>
        <!-- 我的频道标题 -->
        <div class="recommend-channel">
          <van-cell title="推荐频道"> </van-cell>
          <!-- 推荐频道 -->
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              icon="plus"
              :text="item.name"
              v-for="item in recommendChannels"
              :key="item.id"
              @click="addChannel(item)"
            />
          </van-grid>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from "@/api";
export default {
  data() {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false,
    };
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels();
      // console.log(data);
      this.allChannels = data.data.channels;
    },
    onClickMyChannel(channel, index) {
      if (this.isEdit && channel.name !== "推荐") {
        return this.$emit("delChannel", channel.id);
      }
      if (!this.isEdit) {
        this.isShow = false;
        this.$emit("changeActive", index);
      }
    },
    addChannel(mychannel) {
      this.$emit("addChannels", { ...mychannel });
    },
  },
  props: {
    myChannerls: {
      type: Array,
      require: true,
    },
  },
  computed: {
    recommendChannels() {
      // console.log(this);
      return this.allChannels.filter((item) => {
        // const result = this.myChannerls.find((i) => i.id === item.id);
        // if (result) {
        //   return false;
        // } else {
        //   return true;
        // }
        return !this.myChannerls.find((i) => i.id === item.id);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.popupMain {
  .active-channel {
    :deep(.van-grid-item__text) {
      color: red;
    }
  }
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
}
//我的频道
.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #000;
        border-radius: 50%;
        text-align: center;
        line-height: 0.32rem;
      }
    }
  }
}
.cha {
  font-size: 1px;
}
//推荐频道
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
