import request from "@/utils/request";
//获取评论
export const getComments = (params) => {
  return request({
    url: "/v1_0/comments",
    params,
  });
};
//发布评论
export const releaseComments = (data) => {
  return request({
    url: "/v1_0/comments",
    method: "POST",
    data
  });
};
