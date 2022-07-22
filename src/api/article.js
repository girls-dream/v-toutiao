import request from "@/utils/request";

export const getArticle = (id) => {
  return request({
    url: "/v1_0/articles/"+id,

  });
};