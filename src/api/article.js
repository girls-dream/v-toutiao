import request from "@/utils/request";

export const getArticle = (id) => {
  return request({
    url: "/v1_0/articles/" + id,
  });
};
//收藏文章
export const getCollection = (target) => {
  return request({
    url: `/v1_0/article/collections`,
    method: "POST",
    data:{target}
  });
};
//取消收藏文章
export const getOnCollection = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: "DELETE",
  });
};