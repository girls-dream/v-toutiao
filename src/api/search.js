import request from "@/utils/request";

//搜索建议
export const getSearchSuggestion = (q) => {
  return request({
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};
//搜索结果
export const getSearch = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
};
