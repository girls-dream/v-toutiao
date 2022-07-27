/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import store from "@/store";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net", // 基础路径
  timeout: 3000,
});
//拦截器
// - 请求拦截器
//  - 每一次请求都会执行的函数
// - 相应拦截器
//  - 每一个请求响应回来时，都会执行的函数
request.interceptors.request.use(
  (config) => {
    // console.log(config);
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return console.log(Promise.reject(error));;
  }
);

export default request;
