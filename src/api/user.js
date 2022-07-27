import request from "@/utils/request";
import store from "@/store";
/**
 * 登录
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @request Promise
 */
export const login = (mobile, code) => {
  return request({
    url: "/v1_0/authorizations",
    method: "post",
    data: {
      mobile: mobile,
      code: code,
    },
  });
};

/**
 *
 * @param {String} mobile
 * @returns Promise
 */

export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/v1_0/user",
    headers: {
      Authorization: `Bearer ${store.state.user.token}`,
    },
  });
};
//获取用户信息
export const getEditUser = () => {
  return request({
    url: "/v1_0/user/profile",
  });
};
// 编辑用户信息
export const EditUser = (data) => {
  return request({
    url: "/v1_0/user/profile",
    method: 'PATCH',
    data
  });
};
//编辑头像
export const Avatar = (data) => {
  return request({
    url: "/v1_0/user/photo",
    method: 'PATCH',
    data
  });
};