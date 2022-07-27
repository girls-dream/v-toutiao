<template>
  <div>
    <van-overlay :show="show" @click="show = false">
      <img :src="img" alt="" ref="img" v-if="show" style="display: none" />
      <div class="footer">
        <div class="cancel" @click="cancel">取消</div>
        <div class="confirm" @click="confirm">完成</div>
      </div>
    </van-overlay>
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,.jpg"
      @change="onchange"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        fit="contain"
        :src="photo"
      ></van-image>
    </van-cell>
  </div>
</template>

<script>
import { Avatar,getEditUser } from "@/api";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  data() {
    return {
      show: false,
      img: "",
      cropper: null,
      photo: "",
    };
  },
  mounted() {},
  methods: {
    onchange(e) {
      let file = this.$refs.file.files[0];
      console.log(file);
      this.img = window.URL.createObjectURL(file); //获取bolb数据
      this.show = true; //弹层出来
      //file-input如果选了同一个文件不会再次触发
      this.$nextTick(() => {
        const image = this.$refs.img;
        console.log(image);
        this.cropper = new Cropper(image, {
          viewMode: 1, // 只能在裁剪的图片范围内移动
          dragMode: "move", // 画布和图片都可以移动
          aspectRatio: 1, // 裁剪区默认正方形
          autoCropArea: 1, // 自动调整裁剪图片
          cropBoxMovable: false, // 禁止裁剪区移动
          cropBoxResizable: false, // 禁止裁剪区缩放
          background: false, // 关闭默认背景
        });
        e.target.value = ""; //解决办法把input的value清空
      });
    },
    cancel() {
      this.show = false;
    },
    confirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      // console.log(this.cropper.getData());
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const fm = new FormData();
        fm.append("photo", blob);
        const res = await Avatar(fm);
        console.log(res);
        this.photo = res.data.data.photo;
        this.$toast("更新成功");
      });
    },
    async getEditUser() {
      const { data } = await getEditUser()
      console.log(data);
      this.photo=data.data.photo
    }
  },
  computed: {
    isLogin() {
      // console.log(this.$store.state.user);
      return !!this.$store.state.user.token;
    },
  }, created() {
    // this.photo=this.$store.state.photo
    this.getEditUser()
  }
};
</script>

<style scoped lang="less">
/deep/ .van-uploader__wrapper {
  width: 50px;
  height: 70px;
}
/deep/ .van-image__img {
  width: 64px;
  height: 64px;
}
.van-overlay {
  background: #000;
}
img {
  max-width: 100%;
  display: block;
}
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  .cancel,
  .confirm {
    width: 100px;
    height: 100px;
    font-size: 30px;
    line-height: 100px;
    text-align: center;
    color: #fff;
  }
}
</style>
