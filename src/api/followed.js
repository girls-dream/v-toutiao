import request from "@/utils/request";
//关注
export const getFollowed = (target) => {
  return request({
    url: "/v1_0/user/followings",
    method: 'POST',
    data:{target}
  });
};
//取消关注
export const getOnFollowed = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE',
  });
};