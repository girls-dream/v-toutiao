import request from "@/utils/request";
import store from '@/store'
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
    data: { mobile, code },
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
    url: '/v1_0/user',
    headers: {
      Authorization:`Bearer ${store.state.user.token}`
    }
  });
};
